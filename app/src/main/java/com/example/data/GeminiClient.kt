package com.example.data

import com.example.BuildConfig
import com.squareup.moshi.JsonClass
import okhttp3.OkHttpClient
import retrofit2.Retrofit
import retrofit2.converter.moshi.MoshiConverterFactory
import retrofit2.http.Body
import retrofit2.http.POST
import retrofit2.http.Query
import java.util.concurrent.TimeUnit
import android.util.Log

@JsonClass(generateAdapter = true)
data class Part(
    val text: String? = null
)

@JsonClass(generateAdapter = true)
data class Content(
    val parts: List<Part>
)

@JsonClass(generateAdapter = true)
data class GenerateContentRequest(
    val contents: List<Content>,
    val systemInstruction: Content? = null
)

@JsonClass(generateAdapter = true)
data class Candidate(
    val content: Content? = null
)

@JsonClass(generateAdapter = true)
data class GenerateContentResponse(
    val candidates: List<Candidate>? = null
)

interface GeminiApiService {
    @POST("v1beta/models/gemini-3.5-flash:generateContent")
    suspend fun generateContent(
        @Query("key") apiKey: String,
        @Body request: GenerateContentRequest
    ): GenerateContentResponse
}

object GeminiClient {
    private const val BASE_URL = "https://generativelanguage.googleapis.com/"
    
    private val okHttpClient = OkHttpClient.Builder()
        .connectTimeout(60, TimeUnit.SECONDS)
        .readTimeout(60, TimeUnit.SECONDS)
        .writeTimeout(60, TimeUnit.SECONDS)
        .build()

    private val retrofit = Retrofit.Builder()
        .baseUrl(BASE_URL)
        .client(okHttpClient)
        .addConverterFactory(MoshiConverterFactory.create())
        .build()

    val service: GeminiApiService by lazy {
        retrofit.create(GeminiApiService::class.java)
    }

    /**
     * Calls Gemini-3.5-flash API return a clean answer string.
     */
    suspend fun getCalgaryAdvice(prompt: String, userGroup: String, languageCode: String): String {
        val apiKey = BuildConfig.GEMINI_API_KEY
        if (apiKey.isEmpty() || apiKey == "MY_GEMINI_API_KEY" || apiKey == "GEMINI_API_KEY") {
            Log.e("GeminiClient", "API Key is missing or default placeholder")
            return getFallbackAdviceShared(userGroup, languageCode)
        }

        // Configure system instruction to behave as WilGlobo Calgary Ambassador
        val systemMessage = """
            You are "Calgary Bridge AI Advisor", an official digital assistant powered by WilGlobo Inc.
            Your purpose is to help residents navigate Calgary's unique challenges, focusing on $userGroup.
            The user resides or lives in Calgary, Canada. 
            
            Strict instructions:
            1. You MUST respond FULLY in the selected language: "$languageCode" (e.g., if "fr", write in French; if "tl", Tagalog; if "uk", Ukrainian; if "ti", Tigrinya; if "ar", Arabic).
            2. Provide clear, solution-oriented answers citing Calgary-specific resources, agencies, transit pass types, or grants.
            3. Address extreme winter safety, housing vacancy rates, or City of Calgary 311 service if relevant.
            4. Keep responses readable with bullet points and friendly tone. Do not write extremely long text.
        """.trimIndent()

        val request = GenerateContentRequest(
            contents = listOf(Content(parts = listOf(Part(text = prompt)))),
            systemInstruction = Content(parts = listOf(Part(text = systemMessage)))
        )

        return try {
            val response = service.generateContent(apiKey, request)
            response.candidates?.firstOrNull()?.content?.parts?.firstOrNull()?.text 
                ?: "Empty response from Calgary AI Advisor. Please try again."
        } catch (e: Exception) {
            Log.e("GeminiClient", "Gemini API failed", e)
            getFallbackAdviceShared(userGroup, languageCode) + "\n\n(Note: AI is operating in local fallback offline mode due to: ${e.localizedMessage})"
        }
    }

    /**
     * Local Offline Fallback advisory generator based on demographic context and chosen language.
     * Ensures Calgary Connect works absolutely, and beautifully even with no internet!
     */
    private fun getFallbackAdviceShared(group: String, lang: String): String {
        return when (group.lowercase()) {
            "newcomer" -> {
                when (lang) {
                    "fr" -> """
                        🏠 **Plan d'établissement à Calgary par WilGlobo Inc.**:
                        • **Logement**: Le taux d'inoccupation à Calgary est inférieur à 1 %. Cherchez sur RentFaster.ca et préparez vos références.
                        • **Services d'établissement**: Visitez Immigrant Services Calgary pour obtenir un plan d'établissement gratuit et faire évaluer votre niveau de langue.
                        • **Santé**: Rendez-vous à un bureau d'enregistrement pour demander l'assurance-maladie provinciale (AHCIP).
                        • **Transports**: Appliquez pour le laissez-passer de transport à faible revenu de Calgary Transit via les services sociaux de la Ville (composez le 311).
                    """.trimIndent()
                    "tl" -> """
                        🏠 **Calgary Settlement Plan mula sa WilGlobo Inc.**:
                        • **Pabahay**: Napakababa ng vacancy rate sa Calgary (kulang sa 1%). Gumamit ng RentFaster.ca at ihanda ang mga credit check references.
                        • **Unang Hakbang**: Bumisita sa Immigrant Services Calgary upang suriin ang iyong kasanayan sa Ingles at gumawa ng plano.
                        • **Kalusugan**: Iparehistro ang buong pamilya sa Alberta Health Care Insurance Plan (AHCIP).
                        • **Bus at Tren**: Mag-apply para sa Low-Income Transit Pass mula sa City of Calgary sa pamamagitan ng pagtawag sa 311.
                    """.trimIndent()
                    "uk" -> """
                        🏠 **План адаптації в Калгарі від WilGlobo Inc.**:
                        • **Житло**: Рівень вільних квартир становить менше 1%. Шукайте на RentFaster.ca та підготуйте рекомендаційні листи.
                        • **Послуги адаптації**: Зверніться в Immigrant Services Calgary для оцінки знання мови та складання плану поселення.
                        • **Медицина**: Зареєструйтеся в Alberta Health Care Insurance Plan (AHCIP).
                        • **Громадський транспорт**: Клієнти з низьким доходом можуть отримати пільговий проїзний квиток через гарячу лінію 311.
                    """.trimIndent()
                    "es" -> """
                        🏠 **Guía de Asentamiento en Calgary por WilGlobo Inc.**:
                        • **Vivienda**: La disponibilidad en Calgary es muy baja (menor al 1%). Busque activamente en RentFaster.ca.
                        • **Servicios Legales y de Idioma**: Inscríbase en Immigrant Services Calgary para evaluación de inglés.
                        • **Salud**: Obtenga de inmediato su tarjeta provincial de salud (AHCIP).
                        • **Movilidad**: Solicite su tarjeta de transporte público para bajos ingresos llamando al 311.
                    """.trimIndent()
                    "ar" -> """
                        🏠 **خطة الاستقرار للوافدين الجدد من WilGlobo Inc.**:
                        • **السكن**: نسبة الشواغر السكنية في كالغاري أقل من %1. ابحث في RentFaster.ca وجهز أوراقك المالية مسبقاً.
                        • **خدمات الاستقرار**: تواصل مع Immigrant Services Calgary للحصول على تقييم لغوي ومراجعة الأوراق الثبوتية.
                        • **الرعاية الصحية**: سجل للحصول على بطاقة ألبرتا الصحية (AHCIP) في أقرب مكتب خدمة.
                        • **المواصلات**: تقدم بطلب الحصول على تذاكر باص مخفضة لمحدودي الدخل بالاتصال بالرقم 311 ببلدية المدينة.
                    """.trimIndent()
                    "ti" -> """
                        🏠 **ናይ ምንባር ውጥን ካልጋሪ ብWilGlobo Inc.**:
                        • **መኖሪ ገዛ**: ኣብ ካልጋሪ ናይ ገዛ ሕር產業 ካብ %1 ትሕቲ እዩ። ኣብ RentFaster.ca ድለዩ።
                        • **ምንባር ሓገዝ**: Immigrant Services Calgary ብምብጻሕ ናይ ቋንቋ ፈተናን ውጥንን ውሰዱ።
                        • **ጥዕና**: Alberta Health Care Insurance (AHCIP) ወግዓዊ ካርድ ውሰዱ።
                        • **መጓዓዝያ**: ትሑት ኣታዊ ዘለዎም ሰዊት ንምርካብ ናብ 311 ደውሉ።
                    """.trimIndent()
                    else -> """
                        🏠 **Calgary Settlement Plan by WilGlobo Inc.**:
                        • **Housing**: Calgary's rental vacancy rate is below 1%. Use RentFaster.ca and have reference letters and credit checks ready.
                        • **Settlement Services**: Head to Immigrant Services Calgary for a customized settlement plan and English competency test.
                        • **Health Card**: Apply for Alberta Health Care Insurance Plan (AHCIP) to cover basic clinical and emergency fees.
                        • **Transit**: Call 311 to apply for the Low-Income Transit Pass to commute during cold winters.
                    """.trimIndent()
                }
            }
            "senior" -> {
                when (lang) {
                    "fr" -> """
                        👵 **Soutien aux Aînés de Calgary par WilGlobo Inc.**:
                        • **Isolement et épicerie**: Appelez la Calgary Seniors' Resource Society pour obtenir un bénévole d'accompagnement.
                        • **Santé et Soutien**: Kerby Centre fournit des conseils de logement social et des cliniques de bien-être.
                        • **Transport**: Obtenez le laissez-passer annuel à prix spécial à Calgary Transit pour seniors de 65 ans et plus.
                        • **Repas**: Utilisez Meals on Wheels Calgary pour des déjeuners et dîners chauds à domicile.
                    """.trimIndent()
                    "tl" -> """
                        👵 **Seniors Care Plan ng WilGlobo Inc.**:
                        • **Grocery at Hatid**: Tawagan ang Calgary Seniors' Resource Society upang kumuha ng boluntaryong kasama sa clinic at palengke.
                        • **Aktibidad at Tulong**: Ang Kerby Centre ay may computer classes at indoor winter walking programs.
                        • **Murang Sakay**: Kumuha ng Senior Citizens Transit Pass mula sa Calgary Transit kung ikaw ay 65+ taong gulang.
                        • **Nutrisyon**: I-order ang nutritious meals mula sa Meals on Wheels kung mahirap lumabas sa cold weather.
                    """.trimIndent()
                    "uk" -> """
                        👵 **Підтримка літніх людей у Калгарі від WilGlobo Inc.**:
                        • **Допомога по дому**: Зверніться до Calgary Seniors' Resource Society для пошуку волонтера для закупівлі продуктів чи супроводу.
                        • **Активність і Спільнота**: Kerby Centre пропонує комп'ютерні курси та прогулянки для здоров'я взимку.
                        • **Транспорт**: Отримайте річний пенсійний проїзний Calgary Transit для тих, кому понад 65 років.
                        • **Харчування**: Замовте гарячу їжу додому в Meals on Wheels Калгарі.
                    """.trimIndent()
                    "es" -> """
                        👵 **Plan de Apoyo a la Edad de Oro en Calgary**:
                        • **Compañía e Insumos**: Contacte a Calgary Seniors' Resource Society para transporte médico y compras de alimentos.
                        • **Espacios**: El Kerby Centre ofrece talleres activos, asesoramiento y comidas de bajo costo.
                        • **Transporte**: Saque su pase anual de tarifa especial para mayores de 65 años con Calgary Transit.
                        • **Calidez**: Use Meals on Wheels para recibir comidas calientes en su hogar en los días más fríos.
                    """.trimIndent()
                    "ar" -> """
                        👵 **خطة رعاية كبار السن من WilGlobo Inc.**:
                        • **البقالة والاحتياجات**: تواصل مع جمعية مصادر كبار السن للحصول على رفيق تطوعي للتسوق والتوصيل للعيادات.
                        • **الأنشطة والارتباط المجتمعي**: يقدم مركز كيربي دروس كمبيوتر، وجولات مشي شتوي دافئة بالداخل، ونصائح السكن.
                        • **المواصلات والتنقل**: تقدم بطلب الحصول على بطاقة خطوط باصات كبار السن المخفضة بمجرد بلوغ 65 سنة.
                        • **وجبات دافئة**: استخدم Meals on Wheels لتوصيل الغذاء المتوازن مباشرة لبيتك تلافياً للبرد الشتوي.
                    """.trimIndent()
                    "ti" -> """
                        👵 **ናይ ኣረጋውያን ክንክን ውጥን ብWilGlobo Inc.**:
                        • **ናይ ዕደጋን ክሊኒክ ምክብባርን**: Calgary Seniors' Resource Society ብምድዋል መዛዛሚ ወለንተኛታት ርኸቡ።
                        • **ንጥፈታት**: Kerby Centre ማእከል ንነበርቲ ዕድመ ኮምፒተር ትምህርቲ ይህብ።
                        • **መጎዓዝያ**: ዕድመኹም 65 ምስ በጽሐ ዓመታዊ ናይ መጓዓዝያ ፓስ ብሕሱር ዋጋ ይግዙ።
                        • **ምግቢ**: Meals on Wheels ብምጥቃም ምቹእ ብዓቕሚ ምግቢ የብጽሑ።
                    """.trimIndent()
                    else -> """
                        👵 **Seniors Care Plan by WilGlobo Inc.**:
                        • **Companion & Shopping**: Call Calgary Seniors' Resource Society to match with volunteers for medical escorts and grocery shopping.
                        • **Active Living & Community**: Kerby Centre offers elder social circles, indoor winter walks, computer and tech advice.
                        • **Cheap Local Transit**: Fetch the Calgary Transit Seniors Annual Pass if you are 65+ for very low cost.
                        • **Hot Nutrition**: Order nutritious meal trays from Calgary Meals on Wheels to avoid ice slips and cold winds.
                    """.trimIndent()
                }
            }
            "business" -> {
                when (lang) {
                    "fr" -> """
                        💼 **Accompagnement Entreprise Calgary par WilGlobo Inc.**:
                        • **Enregistrement et licences de la Ville**: Vérifiez le zonage résidentiel ou commercial auprès de la Ville avant de signer un bail commercial. Utilisez le portail de licence 311.
                        • **Conseilsgratuits**: Business Link Alberta propose des études de marché gratuites et une aide au choix de structure juridique.
                        • **Réseautage**: Rejoignez la Chambre de commerce de Calgary pour des événements d'affaires et promotions de solopreneurs.
                    """.trimIndent()
                    "tl" -> """
                        💼 **Gabay sa Negosyo ng WilGlobo Inc.**:
                        • **Lisensya sa Lungsod**: I-verify ang commercial o home-based zoning bago kumuha ng pwesto. Gamitin ang portal ng City.
                        • **Libreng Market Research**: Kontakin ang Business Link Alberta para sa diretsong payo sa business plan.
                        • **Koneksyon**: Sumali sa Calgary Chamber of Commerce para sa mga networking at pakikipag-ugnayan sa iba.
                    """.trimIndent()
                    "uk" -> """
                        💼 **Бізнес-супровід у Калгарі від WilGlobo Inc.**:
                        • **Реєстрація та ліцензії**: Перевірте вимоги до зонування у міськраді для домашнього чи комерційного бізнесу.
                        • **Безкоштовний аналіз ринку**: Отримайте допомогу в Business Link Alberta щодо розкрутки та бізнес-планування.
                        • **Зв'язки**: Приєднайтеся до Торгово-промислової палати Калгарі для пошуку корпоративних партнерів.
                    """.trimIndent()
                    "es" -> """
                        💼 **Plan Emprendedor de Calgary por WilGlobo Inc.**:
                        • **Zonificación y Licencias**: Revise el ordenamiento de uso de suelo en la Municipalidad antes de alquilar locales comerciales.
                        • **Asesoría Profesional de Base**: Use Business Link Alberta para estudios comerciales y soporte legal de inicio gratis.
                        • **Vínculos Comerciales**: Forme parte de la Cámara de Comercio de Calgary para visibilidad local.
                    """.trimIndent()
                    "ar" -> """
                        💼 **الدعم المالي والتجاري للمشاريع من WilGlobo Inc.**:
                        • **التراخيص البلدية والامتثال**: تحقق من شروط تقسيم المناطق (Zoning) السكنية أو التجارية قبل توقيع عقود الإيجار.
                        • **المشورة المجانية والأبحاث**: استعن بجهة Business Link Alberta لتقييم دراسات الجدوى واختيار الكيان القانوني للشركة.
                        • **بناء الشراكات والشبكة**: انضم لغرفة تجارة كالغاري لترويج علامتك التجارية وحضور الملتقيات الاستثمارية.
                    """.trimIndent()
                    "ti" -> """
                        💼 **ናይ ንግዲ ምኽሪ ውጥን ብWilGlobo Inc.**:
                        • **ፍቓድ ከተማ**: ቅድሚ ዝኾነ ውዕል ምፍራም ናይ ዞባ ምምሕዳር ንግዲ ፍቓድ ኣብ ከተማ ይመርምሩ።
                        • **ነጻ ምኽሪ ንግዲ**: Business Link Alberta ብምጥቃም ናይ ዕዳጋ መጽናዕትን ምኽርን ርኸቡ።
                        • **ምትእስሳር**: ምስ ቤት ምኽሪ ንግዲ ካልጋሪ ብምትእስሳር ምስ መሻርኽቲ ይራኸቡ።
                    """.trimIndent()
                    else -> """
                        💼 **Business & Startup Advisory by WilGlobo Inc.**:
                        • **City Licensing**: Double-check residential or commercial zoning (bylaws) directly with the City of Calgary before leasing a location.
                        • **Free Business Planning**: Reach out to Business Link Alberta for free 1-on-1 business plans, market studies, and province-wide startups guide.
                        • **B2B Networking**: Join the Calgary Chamber of Commerce to access business insurance perks and key regional networking panels.
                    """.trimIndent()
                }
            }
            "ngo" -> {
                when (lang) {
                    "fr" -> """
                        🤝 **Soutien pour les ONG de Calgary**:
                        • **Gouvernance et administration**: Federation of Calgary Communities propose des ateliers sur les lignes directrices et audits.
                        • **Subventions**: Le Calgary Foundation offre des opportunités de financement pour les causes communautaires.
                        • **Ressources de bénévolat**: Utilisez Propellus pour publier des offres de bénévolat et trouver de l'aide.
                    """.trimIndent()
                    "tl" -> """
                        🤝 **NGO & Non-Profit Guide**:
                        • **Pamamahala**: Ang Federation of Calgary Communities ay may mga audit at training sa board directives.
                        • **Gawad at Abuloy**: Gamitin ang Calgary Foundation upang makakuha ng pondo para sa inyong proyektong panlipunan.
                        • **Banal at Volunteer**: Mag-post sa Propellus para sa libreng pagkuha ng mga aktibong lokal na boluntaryo.
                    """.trimIndent()
                    "uk" -> """
                        🤝 **Порадник для громадських організацій**:
                        • **Рада директорів**: Федерація громад Калгарі проводить воркшопи з фінансів, аудиту та управління організацією.
                        • **Фінансування**: Орієнтуйтеся на гранти від Calgary Foundation для екологічних або інтеграційних проєктів.
                        • **Кадри**: Шукайте та залучайте мотивованих волонтерів за допомогою порталу Propellus.
                    """.trimIndent()
                    "es" -> """
                        🤝 **Guía para ONG de Calgary**:
                        • **Pautas Administrativas**: La Federación de Comunidades de Calgary imparte talleres financieros y de seguros.
                        • **Fondos de Desarrollo**: Postule a convocatorias de subvenciones con la Fundación de Calgary.
                        • **Voluntariado Local**: Registre su asociación en Propellus para captar apoyo diario gratuito en tareas clave.
                    """.trimIndent()
                    "ar" -> """
                        🤝 **حلول المنظمات والجهات الخيرية**:
                        • **إدارة وتوجيه مجالس الإدارة**: يوفر اتحاد مجتمعات كالغاري ورش عمل مالية وتدقيق القوانين الداخلية للجمعيات.
                        • **المنح والتمويل**: تقدم للحصول على رأس المال التشغيلي والميداني من مؤسسة كالغاري الخيرية للمنح.
                        • **العمل التطوعي والسند العملي**: أعلن عن احتياجك من القوى العاملة واللوجستية عبر منصة بروبيلوس للتطوع.
                    """.trimIndent()
                    "ti" -> """
                        🤝 **መምርሒ ዘይመንግስታዊ ማሕበራት**:
                        • **ናይ ምሕደራ ስያሜታት**: Federation of Calgary Communities ህሳቦትን ናይ ሳጥን ደገፍን ይህብ።
                        • **ሓገዝ**: Calgary Foundation ብምጥቃም ናይ ማሕበረሰብ ሓገዛት ንምርካብ ይመዝገቡ።
                        • **ወለንተኛታት**: Propellus ብምጥቃም ንማሕበርኩም ዝሕግዙ ዝረድኡ ወለንተኛታት ርኸቡ።
                    """.trimIndent()
                    else -> """
                        🤝 **NGO & Non-Profit Guide by WilGlobo Inc.**:
                        • **Governance Support**: Engage with the Federation of Calgary Communities for audits, customized corporate registry advice, and liability insurance.
                        • **Community Funding**: Consult the Calgary Foundation for seasonal project grants tailored to support inclusion, immigrant integration, and poverty relief.
                        • **Operations & Recruitment**: Post board openings and operation shifts on Propellus (Volunteer Calgary) to recruit skilled local talent.
                    """.trimIndent()
                }
            }
            "creator" -> {
                when (lang) {
                    "fr" -> """
                        🎨 **Espace Créateurs Calgary par WilGlobo Inc.**:
                        • **Financement**: CADA (Calgary Arts Development) offre régulièrement des micro-subventions et budgets artistiques.
                        • **Studio et ateliers**: Réservez un studio d'exposition, d'écriture ou d'art visuel à cSPACE Marda Loop.
                        • **Exposition locale**: Collaborez avec The New Gallery pour vos expositions communautaires.
                    """.trimIndent()
                    "tl" -> """
                        🎨 **Gabay sa Manlilikha sa Calgary**:
                        • **Pondo**: Mag-apply para sa project-based micro-grants mula sa Calgary Arts Development (CADA).
                        • **Workspace at Studio**: Rentahan ang magagandang pasilidad sa cSPACE Marda Loop para sa inyong sining.
                        • **Pagpapakita**: Makipag-ugnayan sa The New Gallery para sa lokal na art exhibition at media workshops.
                    """.trimIndent()
                    "uk" -> """
                        🎨 **Простір митців у Калгарі від WilGlobo Inc.**:
                        • **Фінансова підтримка**: Отримайте гранти для митців або мікрофінансування проектів через Calgary Arts Development (CADA).
                        • **Студія**: Орендуйте кімнати чи студії для малювання, письма або фотографії в cSPACE Marda Loop.
                        • **Виставки**: Організуйте показ своїх робіт або відвідайте воркшопи через некомерційну галерею The New Gallery.
                    """.trimIndent()
                    "es" -> """
                        🎨 **Portal de Creadores y Artistas de Calgary**:
                        • **Subsidios Creativos**: Postule al fondo de fomento artístico y micro-subvenciones individuales mediante CADA.
                        • **Talleres de Trabajo**: Alquile estudios artísticos renovados de nivel mundial para fotografía, escritura en cSPACE Marda Loop.
                        • **Galerías**: Presente su obra experimental o participe de talleres sociales colaborativos en The New Gallery.
                    """.trimIndent()
                    "ar" -> """
                        🎨 **دليل الفنان والمبدع في كالغاري**:
                        • **المنح الصغيرة وتمويل المشاريع**: تقدم بطلب الحصول على دعم مالي لأعمالك الفنية الفردية أو الجماعية من هيئة CADA.
                        • **مساحات العمل والاستوديوهات**: استأجر غرف تصوير، كتابة، أو فنون بصرية داخل مبنى سي سبيس ماردا لوب الإبداعي.
                        • **صالات العرض والمحافل**: اعرض تجاربك الفنية المتجددة وزد خبرتك الفنية بالتفاعل مع معرض ذا نيو غاليري.
                    """.trimIndent()
                    "ti" -> """
                        🎨 **መምርሒ ፈጠራን ስነ-ጥበብን ብWilGlobo Inc.**:
                        • **መምርሒ ሓገዛት**: CADA (ልምዓት ስነ-ጥበብ ካልጋሪ) ዝተፈላለዩ ናይ ስነ-ጥበብ ሓገዛት ይህብ።
                        • **ስቱድዮ**: cSPACE ማርዳ ሉፕ ብምጥቃም ናይ ስእሊ፡ ጽሕፈት ስቱድዮታት ብቑዕ ክራይ ርኸቡ።
                        • **ብቕዓት**: ምስ The New Gallery ብምስራሕ ዓመታዊ ምርኢት ስነ-ጥበብ የቕርቡ።
                    """.trimIndent()
                    else -> """
                        🎨 **Creator & Artist Roadmap by WilGlobo Inc.**:
                        • **Project Grants**: Apply for individual grants and artist-in-residence project budgets via Calgary Arts Development (CADA).
                        • **Creative Workspaces**: Rent affordable painting, pottery, darkroom, or digital creative rooms at cSPACE Marda Loop.
                        • **Community Showcases**: Pitch experimental displays or host technical and creative workshops through The New Gallery (TNG).
                    """.trimIndent()
                }
            }
            else -> "Resource Roadmap summary not available."
        }
    }
}
