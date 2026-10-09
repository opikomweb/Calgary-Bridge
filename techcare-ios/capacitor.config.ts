import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.wilglobo.techcare',
  appName: 'TechCare',
  webDir: 'www',
  server: {
    url: 'https://techcares.ca',
    cleartext: false
  },
  ios: {
    contentInset: 'automatic',
    backgroundColor: '#102240'
  }
};

export default config;
