# SearXNG Hosting Runbook

Askonnect (the AI chat guide) falls back to a live web search **only** when the curated resource catalog has zero matches for a question. That live search is powered by a self-hosted [SearXNG](https://github.com/searxng/searxng) instance — this is a manual, one-time infrastructure step that has to happen outside of this app. The code (`lib/searxng.ts`, wired into `app/api/chat/route.ts`) already runs in a graceful-degraded mode until this is done: with no instance configured, Askonnect just says it doesn't have a verified answer and points to the closest resource category or 211, instead of erroring or hanging.

## 1. Provision a small VM

Any $5-6/mo VM works. Cheapest common options:

- DigitalOcean Droplet — Basic, 1 GB RAM / 1 vCPU (~$6/mo)
- Hetzner Cloud CX22 (~€4/mo)
- Linode Nanode 1GB (~$5/mo)

Pick a region close to Calgary (a US-West or Central Canada region) to keep latency low. Ubuntu 22.04 LTS is a safe default image.

## 2. Install Docker

SSH into the new VM and run:

```bash
curl -fsSL https://get.docker.com | sh
sudo systemctl enable --now docker
```

## 3. Clone and configure searxng-docker

```bash
git clone https://github.com/searxng/searxng-docker.git
cd searxng-docker
```

Edit `.env` in that directory:
- Set `SEARXNG_HOSTNAME` to the domain or IP you'll use (e.g. `search.yourdomain.com` or just the VM's public IP for now).
- Set `SEARXNG_TLS` per whether you're putting a domain + Let's Encrypt in front of it (recommended) or running plain HTTP behind Vercel's own TLS termination isn't relevant here since this is a direct server-to-server call — HTTPS is still strongly recommended so results aren't sent in plaintext, but a self-signed cert used only from the Next.js backend is fine too.

Edit `searxng/settings.yml` and ensure JSON output is enabled — this is the part that's easy to miss and will otherwise make every Askonnect fallback request fail silently:

```yaml
search:
  formats:
    - html
    - json
```

Then start it:

```bash
docker compose up -d
```

Confirm it's serving JSON before moving on:

```bash
curl "http://localhost:8080/search?q=test&format=json"
```

You should get back a JSON blob with a `results` array. If you get an error about the `json` format not being allowed, double check the `search.formats` edit above and restart with `docker compose restart`.

## 4. Put a domain + HTTPS in front of it (recommended)

If you already have a domain, point an A record at the VM's IP and use Caddy or the built-in Let's Encrypt support in `searxng-docker`'s Compose file (it can automatically provision a cert if `SEARXNG_HOSTNAME` and `LETSENCRYPT_EMAIL` are set in `.env`). If you skip this step, `SEARXNG_INSTANCE_URL` can just be `http://<vm-ip>:8080` — it'll work, just without encryption in transit.

## 5. Set the environment variable in this project

Once you have a working URL (e.g. `https://search.yourdomain.com` or `http://203.0.113.10:8080`), set:

```
SEARXNG_INSTANCE_URL=https://search.yourdomain.com
```

as a **Production + Preview** environment variable in this project (not marked Sensitive — it's just a URL, not a secret). Once set, the very next Askonnect question that has zero catalog matches will automatically start using it — no redeploy of app code is required beyond adding the env var.

## 6. Verify end-to-end

Ask Askonnect something clearly outside the curated catalog — e.g. "what's the weather like in Banff this weekend" — and confirm:
- A response appears with a clearly-labeled **"Live web result — not verified by Calgary Konnect"** section, distinct from any curated resource cards.
- If you temporarily unset the env var or point it at a bad URL, the same question should instead get a short, honest "I don't have a verified answer for that" reply with no broken UI or hanging spinner.

## Notes

- Only one query is issued per Askonnect message, and only when the curated catalog returned nothing — this instance will see very light traffic, no need to over-provision.
- SearXNG is a metasearch engine (it queries Google/Bing/DuckDuckGo/etc. on your behalf) — very occasionally an upstream engine may temporarily rate-limit the instance if traffic spikes hard. This fails the same graceful way (`searchSearXNG` returns `null` on any error), so it never breaks the chat.
