package com.example.data

object Localization {

    data class Language(val code: String, val name: String, val flag: String)

    val ListOfLanguages = listOf(
        Language("en", "English", "🇨🇦"),
        Language("fr", "Français", "🇫🇷"),
        Language("tl", "Tagalog", "🇵🇭"),
        Language("es", "Español", "🇪🇸"),
        Language("uk", "Українська", "🇺🇦"),
        Language("ar", "العربية", "🇸🇦"),
        Language("ti", "ትግርኛ", "🇪🇷")
    )

    // Key UI String Translations
    val Translations: Map<String, Map<String, String>> = mapOf(
        "app_title" to mapOf(
            "en" to "Calgary Bridge",
            "fr" to "Pont de Calgary",
            "tl" to "Calgary Bridge (Tulay)",
            "es" to "Puente de Calgary",
            "uk" to "Міст Калгарі",
            "ar" to "جسر كالغاري",
            "ti" to "የካልጋሪ ድልድይ"
        ),
        "sponsor" to mapOf(
            "en" to "By WilGlobo Inc.",
            "fr" to "Par WilGlobo Inc.",
            "tl" to "Mula sa WilGlobo Inc.",
            "es" to "Por WilGlobo Inc.",
            "uk" to "Від WilGlobo Inc.",
            "ar" to "بواسطة WilGlobo Inc.",
            "ti" to "ብWilGlobo Inc."
        ),
        "welcome_statement" to mapOf(
            "en" to "Connecting Calgary residents, seniors, newcomers, solopreneurs, and creators to municipal & community solutions.",
            "fr" to "Connecter les résidents de Calgary, les aînés, les nouveaux arrivants, les solopreneurs et les créateurs.",
            "tl" to "Ikonekta ang mga residente ng Calgary, mga nakatatanda, mga bago, solopreneur, at mga manlilikha sa mga solusyong munisipyo at komunidad.",
            "es" to "Conectando a los residentes, personas mayores, recién llegados, solopreneurs y creadores con soluciones municipales y comunitarias.",
            "uk" to "Об'єднуємо жителів Калгарі, літніх людей, новоприбулих, підприємців та творців для вирішення муніципальних і громадських питань.",
            "ar" to "ربط سكان كالغاري، وكبار السن، والوافدين الجدد، والرواد، والمبدعين بالحلول البلدية والمجتمعية.",
            "ti" to "ንነበርቲ ካልጋሪ፡ ነበርቲ ዕድመ፡ ሓደሽቲ መጻእቲ፡ በይኖም ዝሰርሑን ፈጠርትን ምስ ማሕበረሰብን ምምሕዳርን ዘራኽብ መሳርሒ።"
        ),
        "search_label" to mapOf(
            "en" to "Search resources by name...",
            "fr" to "Rechercher des ressources par nom...",
            "tl" to "Maghanap ng mga mapagkukunan sa pangalan...",
            "es" to "Buscar recursos por nombre...",
            "uk" to "Шукати ресурси за назвою...",
            "ar" to "البحث عن الموارد بالاسم...",
            "ti" to "ብሽም ጸጋታት ይድለ..."
        ),
        "nav_explore" to mapOf(
            "en" to "Resources",
            "fr" to "Ressources",
            "tl" to "Mga Resors",
            "es" to "Recursos",
            "uk" to "Ресурси",
            "ar" to "الموارد",
            "ti" to "ጸጋታት"
        ),
        "nav_ai" to mapOf(
            "en" to "AI Calgary Advisor",
            "fr" to "Conseiller IA Calgary",
            "tl" to "AI Calgary Advisor",
            "es" to "Asesor de IA Calgary",
            "uk" to "ШІ-Калгарі Радник",
            "ar" to "مستشار الذكاء الاصطناعي",
            "ti" to "የቃሊጋሪ ኣማኻሪ AI"
        ),
        "nav_bookmarks" to mapOf(
            "en" to "My Shortlist",
            "fr" to "Mes Favoris",
            "tl" to "Aking Checklist",
            "es" to "Mis Favoritos",
            "uk" to "Мій список",
            "ar" to "مفضلتي",
            "ti" to "ምርጫይ"
        ),
        "select_group" to mapOf(
            "en" to "Select Community Group",
            "fr" to "Sélectionnez le groupe",
            "tl" to "Piliin ang Pangkat",
            "es" to "Seleccionar Grupo",
            "uk" to "Оберіть групу",
            "ar" to "اختر الفئة المجتمعية",
            "ti" to "ጉጅለ ማሕበረሰብ ይምረጡ"
        ),
        "group_newcomer" to mapOf(
            "en" to "Newcomer",
            "fr" to "Nouveau",
            "tl" to "Bagong Salta",
            "es" to "Recién Llegado",
            "uk" to "Новоприбулий",
            "ar" to "الوافدون الجدد",
            "ti" to "ሓድሽ መጻኢ"
        ),
        "group_senior" to mapOf(
            "en" to "Senior",
            "fr" to "Aîné",
            "tl" to "Elder / Senior",
            "es" to "Adulto Mayor",
            "uk" to "Пенсіонер",
            "ar" to "كبار السن",
            "ti" to "ነባሪ ዕድመ"
        ),
        "group_business" to mapOf(
            "en" to "Business / Solo",
            "fr" to "Entreprise / Solo",
            "tl" to "Negosyante / Solo",
            "es" to "Negocio / Solo",
            "uk" to "Бізнес / Соло",
            "ar" to "أعمال / حر",
            "ti" to "ንግዲ / በይኖም"
        ),
        "group_ngo" to mapOf(
            "en" to "NGO / Non-Profit",
            "fr" to "ONG / SANS BUT LUCRATIF",
            "tl" to "Nongovernmental Org",
            "es" to "ONG / Sin Fines",
            "uk" to "Громадські орг.",
            "ar" to "منظمة غير ربحية",
            "ti" to "ዘይመንግስታዊ ማሕበር"
        ),
        "group_creator" to mapOf(
            "en" to "Creator / Artist",
            "fr" to "Créateur / Artiste",
            "tl" to "Manunulat / Artista",
            "es" to "Creador / Artista",
            "uk" to "Творець / Митець",
            "ar" to "المبدعون والفنانون",
            "ti" to "ፈጣሪ / ስነ-ጥበባዊ"
        ),
        "add_note_placeholder" to mapOf(
            "en" to "Add your personal notes/tasks here...",
            "fr" to "Ajoutez vos notes/tâches personnelles...",
            "tl" to "Idagdag ang iyong tala...",
            "es" to "Añadir notas/tareas personales...",
            "uk" to "Додайте свої особисті нотатки/завдання...",
            "ar" to "أضف ملاحظاتك أو مهامك الخاصة هنا...",
            "ti" to "ናይ ውልቂ ማስታወሻ ወይ ስራሕ የብርቱ..."
        ),
        "saved_notes_title" to mapOf(
            "en" to "Personal Plan Notes",
            "fr" to "Notes du plan personnel",
            "tl" to "Mga Tala sa Plano",
            "es" to "Notas del Plan Personal",
            "uk" to "Особистий план і нотатки",
            "ar" to "ملاحظات الخطة الشخصية",
            "ti" to "ውልቃዊ ውጥን ማስታወሻታት"
        ),
        "ai_intro" to mapOf(
            "en" to "Ask our Calgary Assistant any questions about bylaws, transport, grants, licensing, housing, or settling down in Calgary. Powered by WilGlobo Inc.'s AI.",
            "fr" to "Posez vos questions à notre Assistant Calgary sur les règlements, le transport, les subventions, etc.",
            "tl" to "Magtanong tungkol sa mga ordinansa, transportasyon, gawad, o lisenya ng lungsod.",
            "es" to "Pregunte sobre regulaciones, transporte, subsidios, licencias en Calgary.",
            "uk" to "Запитуйте нашого асистента про правила, транспорт, гранти, житло чи адаптацію у Калгарі.",
            "ar" to "اسأل مستشار كالغاري عن اللوائح، النقل، المنح، التراخيص، إلخ.",
            "ti" to "ንናይ ካልጋሪ ሓጋዚና ብዛዕባ ውሳነታት ምምሕዳር፡ መጓዓዝያ፡ ሓገዝ፡ ፍቓድ ወይ ምንባር ሕቶታት ይሕተቱ።"
        ),
        "ai_prompt_hint" to mapOf(
            "en" to "Describe your situation (e.g., 'I am a newcomer looking for child care' or 'I need a home business permit')...",
            "fr" to "Décrivez votre situation...",
            "tl" to "Ilarawan ang iyong sitwasyon...",
            "es" to "Describa su situación...",
            "uk" to "Опишіть свою ситуацію...",
            "ar" to "اشرح ظرفك الحالي هنا...",
            "ti" to "ኩነታትኩም ይግለጹ (ንኣብነት፡ 'ኣነ ሓድሽ መጻኢ እየ ቆልዓ ዘዕቢ ዝደሊ')..."
        ),
        "send_button" to mapOf(
            "en" to "Get AI Advice",
            "fr" to "Obtenir de l'aide",
            "tl" to "Humingi ng Payo ng AI",
            "es" to "Pedir Consejo de IA",
            "uk" to "Отримати допомогу ШІ",
            "ar" to "احصل على استشارة الذكاء الاصطناعي",
            "ti" to "ምኽሪ AI ርኸቡ"
        ),
        "bookmark_btn" to mapOf(
            "en" to "In Shortlist",
            "fr" to "Ajouté",
            "tl" to "Nasa Checklist",
            "es" to "Agregado",
            "uk" to "У списку",
            "ar" to "مضاف للمفضلة",
            "ti" to "ተዓቂቡ"
        ),
        "add_bookmark_btn" to mapOf(
            "en" to "Add to Plan",
            "fr" to "Ajouter au Plan",
            "tl" to "Idagdag sa Plano",
            "es" to "Añadir al Plan",
            "uk" to "Додати до плану",
            "ar" to "أضف إلى خطتي",
            "ti" to "ናብ ውጥን ወስኽ"
        ),
        "call_btn" to mapOf(
            "en" to "Call Now",
            "fr" to "Appeler",
            "tl" to "Tawagan",
            "es" to "Llamar",
            "uk" to "Подзвонити",
            "ar" to "اتصل الآن",
            "ti" to "ደውል"
        ),
        "no_bookmarks_yet" to mapOf(
            "en" to "Your Shortlist is empty of resources or tasks. Switch to 'Resources' tab to add services to your personalized Calgary plan!",
            "fr" to "Votre liste est vide. Visitez l'onglet 'Ressources' pour ajouter.",
            "tl" to "Walang laman ang iyong Checklist. Pumunta sa Resources.",
            "es" to "Su lista está vacía. Visite la pestaña 'Recursos' para añadir.",
            "uk" to "Ваш список порожній. Перейдіть до вкладки 'Ресурси', щоб додати послуги до вашого плану.",
            "ar" to "مفضلاتك فارغة حاليا. انتقل إلى تبويب الموارد لإضافتها.",
            "ti" to "ምርጫኻ ጸጋታት ወይ ስራሓት ባዶ እዩ። ናብ 'ጸጋታት' ብምኻድ ዝምጥነካ ውጥን ወስኽ!"
        ),
        "error_no_api_key" to mapOf(
            "en" to "Gemini API key is not configured in the Secrets Panel. Showing local advice model.",
            "fr" to "Clé API Gemini manquante.",
            "tl" to "Walang Gemini API key.",
            "es" to "Clave API Gemini no configurada.",
            "uk" to "Ключ API Gemini не налаштований.",
            "ar" to "مفتاح Gemini API غير مجهز.",
            "ti" to "መፍትሕ Gemini API ኣይተዳለወን።"
        ),
        "ai_advisor_header" to mapOf(
            "en" to "Custom Calgary Plan",
            "fr" to "Plan personnalisé Calgary",
            "tl" to "Badyet at Plano",
            "es" to "Plan de Calgary Personalizado",
            "uk" to "Ваш персональний план адаптації",
            "ar" to "خطة كالغاري المخصصة",
            "ti" to "ፍሉይ ናይ ካልጋሪ ውጥን"
        ),
        "clear_notes" to mapOf(
            "en" to "Clear Note",
            "fr" to "Effacer",
            "tl" to "Burahin",
            "es" to "Borrar",
            "uk" to "Очистити",
            "ar" to "مسح الملاحظة",
            "ti" to "ማስታወሻ ኣጥፍእ"
        ),
        "saving_notes" to mapOf(
            "en" to "Auto-saving...",
            "fr" to "Auto-enregistrement...",
            "tl" to "Awtomatikong sinisave...",
            "es" to "Guardado automático...",
            "uk" to "Автозбереження...",
            "ar" to "حفظ تلقائي...",
            "ti" to "ብባዕሉ ይዕቅብ ኣሎ..."
        )
    )

    fun getString(key: String, lang: String): String {
        val stringsMap = Translations[key] ?: return "[$key]"
        return stringsMap[lang] ?: stringsMap["en"] ?: "[$key]"
    }

    data class CalgaryResource(
        val id: String,
        val category: String, // "newcomer", "senior", "business", "ngo", "creator"
        val webUrl: String,
        val phone: String,
        val titles: Map<String, String>,
        val descriptions: Map<String, String>
    )

    val ResourcesList = listOf(
        // NEWCOMERS
        CalgaryResource(
            id = "new_isc",
            category = "newcomer",
            webUrl = "https://www.immigrantservicescalgary.ca",
            phone = "+1 (403) 265-1120",
            titles = mapOf(
                "en" to "Immigrant Services Calgary (ISC)",
                "fr" to "Services aux immigrants de Calgary (ISC)",
                "tl" to "Mga Serbisyo sa Imigrante ng Calgary (ISC)",
                "es" to "Servicios de Inmigración de Calgary (ISC)",
                "uk" to "Служба Іммігрантів Калгарі (ISC)",
                "ar" to "خدمات المهاجرين في كالغاري (ISC)",
                "ti" to "ኣገልግሎት ስደተኛታት ካልጋሪ (ISC)"
            ),
            descriptions = mapOf(
                "en" to "Your doorway to Calgary. Provides settlement plans, translation verification, language tests, and employment mentoring.",
                "fr" to "Votre porte d'entrée à Calgary. Fournit des plans d'établissement, des tests linguistiques et du mentorat d'emploi.",
                "tl" to "Ang iyong pinto sa Calgary. Nagbibigay ng planong settlement, pagsusuring lingguwistika, at paggabay sa trabaho.",
                "es" to "Tu puerta de entrada a Calgary. Ofrece planes de asentamiento, exámenes de idiomas y mentoría de empleo.",
                "uk" to "Ваші двері в Калгарі. Надає плани адаптації, мовні тести та професійне наставництво.",
                "ar" to "بوابتك إلى كالغاري. توفر خطط تسوية الملفات، اختبارات اللغة، والإرشاد الوظيفي.",
                "ti" to "ናብ ካልጋሪ መእተዊ ማዕጾ። ናይ ምንባር ውጥን፡ ፈተና ቋንቋታት፡ ከምኡውን ናይ ስራሕ ምኽሪ ይህብ።"
            )
        ),
        CalgaryResource(
            id = "new_ccis",
            category = "newcomer",
            webUrl = "https://www.ccisab.ca",
            phone = "+1 (403) 262-2006",
            titles = mapOf(
                "en" to "Calgary Catholic Immigration Society (CCIS)",
                "fr" to "Société catholique de l'immigration (CCIS)",
                "tl" to "Calgary Catholic Immigration Society (CCIS)",
                "es" to "Sociedad Católica de Inmigración (CCIS)",
                "uk" to "Католицьке імміграційне товариство (CCIS)",
                "ar" to "الجمعية الكاثوليكية للهجرة في كالغاري (CCIS)",
                "ti" to "ማሕበር ካቶሊካውያን ስደተኛታት ካልጋሪ (CCIS)"
            ),
            descriptions = mapOf(
                "en" to "Provides non-denominational settlement assistance, temporary accent housings, and custom job trainings for professional newcomers.",
                "fr" to "Fournit une aide à l'établissement non confessionnelle, du logement temporaire et des formations professionnelles.",
                "tl" to "Nagbibigay ng tulong sa settlement na walang kinikilingang relihiyon, pansamantalang pabahay, at pagsasanay sa trabaho.",
                "es" to "Brinda asistencia de asentamiento laica, alojamiento temporal y capacitaciones laborales personalizadas.",
                "uk" to "Надає світську допомогу в адаптації, тимчасове житло та спеціалізоване професійне навчання.",
                "ar" to "تقدم مساعدات تسوية غير طائفية، ومساكن مؤقتة، وتدريبات مهنية تناسب تخصصات الوافدين الجدد.",
                "ti" to "ናይ ሃይማኖት ገደብ ዘይብሉ ናይ ምንባር ሓገዝ፡ ግዝያዊ መሕደሪ ገዛ፡ ከምኡውን ናይ ስራሕ ስልጠና ይህብ።"
            )
        ),
        CalgaryResource(
            id = "new_transit",
            category = "newcomer",
            webUrl = "https://www.calgary.ca/social-services/low-income/transit-pass.html",
            phone = "311",
            titles = mapOf(
                "en" to "Calgary Transit Low-Income Pass",
                "fr" to "Passe Calgary Transit à faible revenu",
                "tl" to "Calgary Transit Low-Income Pass",
                "es" to "Pase de Tránsito de Bajos Ingresos",
                "uk" to "Пільговий проїзний Calgary Transit",
                "ar" to "بطاقة مواصلات كالغاري لمحدودي الدخل",
                "ti" to "ትሑት ኣታዊ ዘለዎም ናይ መጓዓዝያ ፓስ"
            ),
            descriptions = mapOf(
                "en" to "Highly discounted bus & C-Train passes based on household income. Very crucial for winter commuting without high cost.",
                "fr" to "Passes de bus et de C-train très abordables basés sur les revenus. Essentiel pour de longs trajets en hiver.",
                "tl" to "Mababang halaga ng bus at C-Train pass batay sa kita ng pamilya. Mahalaga sa taglamig.",
                "es" to "Pases de autobús y tren ligero ultra con descuento basados en ingresos. Muy importante para el invierno.",
                "uk" to "Проїзні на автобуси та C-Train зі значними знижками за умови низького доходу. Вкрай необхідно під час зимових холодів.",
                "ar" to "تذاكر مخفضة للغاية للحافلات والقطارات تعتمد على دخل الأسرة. ضرورية للغاية للتنقل شتاء بأقل تكلفة.",
                "ti" to "ትሑት ኣተዋ ዘለዎም ሰላት ብጣዕሚ ዝተማሕረ ናይ ኣውቶቡስን ባቡርን ፓስ። ንኽረምቲ ወሳኒ መጓዓዝያ እዩ።"
            )
        ),
        CalgaryResource(
            id = "new_ahcip",
            category = "newcomer",
            webUrl = "https://www.alberta.ca/ahcip.aspx",
            phone = "+1 (780) 427-1432",
            titles = mapOf(
                "en" to "Alberta Health Care Office (AHCIP)",
                "fr" to "Assurance maladie de l'Alberta (AHCIP)",
                "tl" to "Alberta Health Care Insurance (AHCIP)",
                "es" to "Seguro de Salud de Alberta (AHCIP)",
                "uk" to "Державне страхування здоров'я (AHCIP)",
                "ar" to "مكتب التأمينات الصحية في البرتا (AHCIP)",
                "ti" to "ቤት ጽሕፈት ክንክን ጥዕና ኣልበርታ (AHCIP)"
            ),
            descriptions = mapOf(
                "en" to "Register here to get your official Alberta Health personal card. Covers standard doctor visits and emergency medical services.",
                "fr" to "Inscrivez-vous pour obtenir votre carte d'assurance-maladie provinciale gratuite. Couvre les cliniques et urgences.",
                "tl" to "Magrehistro dito para sa iyong opisyal na Alberta Health card. Sumasaklaw sa konsultasyon ng doktor.",
                "es" to "Regístrese aquí para obtener su tarjeta oficial de salud de Alberta. Cubre visitas médicas y emergencias.",
                "uk" to "Зареєструйтеся тут, щоб отримати державну медичну картку Альберти. Покриває візити до лікарів та невідкладну допомогу.",
                "ar" to "سجل هنا للحصول على بطاقة الرعاية الصحية الرسمية لمقاطعة ألبرتا والتي تغطي زيارات طبيب الأسرة والطوارئ.",
                "ti" to "ናይ ኣልበርታ ወግዓዊ ጥዕና ካርድ ንምርካብ ኣብዚ ይመዝገቡ። ናይ ሓኪም ምብጻሕን ናይ ህጹጽ ሓገዝን ይሽፍን።"
            )
        ),

        // SENIORS
        CalgaryResource(
            id = "sen_csr",
            category = "senior",
            webUrl = "https://www.calgaryseniors.org",
            phone = "+1 (403) 266-6200",
            titles = mapOf(
                "en" to "Calgary Seniors' Resource Society",
                "fr" to "Société de ressources pour aînés de Calgary",
                "tl" to "Calgary Seniors' Resource Society",
                "es" to "Sociedad de Recursos para Mayores de Calgary",
                "uk" to "Товариство допомоги літнім людям Калгарі",
                "ar" to "جمعية مصادر كبار السن في كالغاري",
                "ti" to "ማሕበር ጸጋታት ነበርቲ ዕድመ ካልጋሪ"
            ),
            descriptions = mapOf(
                "en" to "Matches seniors with friendly volunteers who provide grocery shopping, telephone checks, and escorted rides to clinic appointments.",
                "fr" to "Met en relation des aînés avec des bénévoles pour les courses d'épicerie, les visites et rendez-vous médicaux.",
                "tl" to "Nagtutugma sa mga senior at mga boluntaryo na nag-aayos ng grocery, tawag, at hatid sa klinika.",
                "es" to "Asocia a adultos mayores con voluntarios amigables para compras de alimentos, llamadas de control y transporte médico.",
                "uk" to "Порівнює літніх людей з волонтерами, які допомагають із покупками, дзвонять підбадьорити та супроводжують до лікаря.",
                "ar" to "تربط كبار السن بمتطوعين ودودين لتسهيل تسوق البقالة والاطمئنان الهاتفي والتوصيل للمواعيد الطبية.",
                "ti" to "ነበርቲ ዕድመ ምስ ዝረድኡ ወለንተኛታት ብምትእስሳር ናይ ድኳን ዕደጋ፡ ናይ ተሌፎን ምቁጽጻርን ናብ ክሊኒክ ምክብባርን ይህቡ።"
            )
        ),
        CalgaryResource(
            id = "sen_kerby",
            category = "senior",
            webUrl = "https://www.kerbycentre.com",
            phone = "+1 (403) 265-0661",
            titles = mapOf(
                "en" to "The Kerby Centre (Active Aging)",
                "fr" to "Le Centre Kerby - Vieillissement Actif",
                "tl" to "The Kerby Centre",
                "es" to "El Centro Kerby (Envejecimiento Activo)",
                "uk" to "Центр Кербі (Спільнота літніх людей)",
                "ar" to "مركز كيربي لكبار السن الأنشطاء",
                "ti" to "ማእከል ከርቢ (ንጡፍ ዕድመ)"
            ),
            descriptions = mapOf(
                "en" to "Vibrant center for older adults. Offers computer lessons, indoor winter walks, food sustainability projects, and housing advice.",
                "fr" to "Centre dynamique pour les adultes actifs. Offre des cours d'informatique, des conseils de logement social et des repas.",
                "tl" to "Masiglang center para sa mga nakatatanda. Nag-aalok ng computer lessons, palaruan sa taglamig, at payo sa pabahay.",
                "es" to "Centro dinámico para adultos mayores. Ofrece clases de informática, caminatas invernales de interior y asesoría de vivienda.",
                "uk" to "Енергійний осередок для людей похилого віку. Пропонує комп'ютерні курси, прогулянки взимку в приміщенні, обіди та порадник з житла.",
                "ar" to "مركز نابض بالحياة لكبار السن. يوفر تعليم الحاسوب، جولات داخلية شتاء، مشاريع الدعم الغذائي، وتأجير المساكن.",
                "ti" to "ንነበርቲ ዕድመ ንጡፍ ማእከል። ናይ ኮምፒተር ትምህርቲ፡ ናይ ውሽጢ ገዛ ናይ ክረምቲ መዛወሪ፡ ምግቢ ውሕስነት ፕሮጀክትን ናይ ገዛ ምኽርን ይህብ።"
            )
        ),
        CalgaryResource(
            id = "sen_mow",
            category = "senior",
            webUrl = "https://www.mealsonwheels.com",
            phone = "+1 (403) 243-2834",
            titles = mapOf(
                "en" to "Calgary Meals on Wheels",
                "fr" to "Repas sur roues Calgary",
                "tl" to "Calgary Meals on Wheels",
                "es" to "Meals on Wheels Calgary (Comidas a Domicilio)",
                "uk" to "Доставка їжі Meals on Wheels Калгарі",
                "ar" to "منظمة الوجبات المتحركة في كالغاري",
                "ti" to "ምግቢ ኣብ ጎማታት ካልጋሪ (Meals on Wheels)"
            ),
            descriptions = mapOf(
                "en" to "Delivers nutritious, affordable meals directly to seniors' doors, assisting with winter cold and physical mobility barriers.",
                "fr" to "Livre des repas nutritifs et abordables directement à l'adresse des aînés, réduisant le besoin de sortir dans le froid.",
                "tl" to "Nagpapadala ng masusustansya at murang pagkain sa pintuan ng senior. Nakakatulong sa taglamig at hirap maglakad.",
                "es" to "Entrega comidas nutritivas y asequibles directamente a la puerta, ideal ante el frío del invierno y dificultades de movilidad.",
                "uk" to "Доставляє поживні та доступні обіди прямо до дверей пенсіонерів, допомагаючи уникнути виходу на мороз.",
                "ar" to "توصيل وجبات غذائية متكاملة وبأسعار معقولة مباشرة إلى بيوت كبار السن، مما يسهل معاناتهم مع البرد ومشاكل الحركة.",
                "ti" to "ብዓቕሚ ምግቢ ምስ ተዓደለ ናብ ኣብ ግምባር ዕድመ ዘለዎም ገዛ ብቐጥታ ምግቢ የብጽሕ ይሕግዞም።"
            )
        ),

        // BUSINESS/SOLOPRENEURS
        CalgaryResource(
            id = "bus_licensing",
            category = "business",
            webUrl = "https://www.calgary.ca/doing-business/licenses.html",
            phone = "311",
            titles = mapOf(
                "en" to "City of Calgary Business Permits & Licensing",
                "fr" to "Permis et licences d'affaires de la Ville de Calgary",
                "tl" to "City of Calgary Business Licensing",
                "es" to "Permisos y Licencias de Negocios de Calgary",
                "uk" to "Дозволи та ліцензування бізнесу міста Калгарі",
                "ar" to "تراخيص وبتصاريح الشركات في بلدية كالغاري",
                "ti" to "ከተማ ካልጋሪ ንግዲ ፈቓድን ፍቓድን"
            ),
            descriptions = mapOf(
                "en" to "Official City portal to check zoning, secure home business permission, or renew commercial storefront business licenses.",
                "fr" to "Portail officiel de la ville pour vérifier le zonage, obtenir la permission de commerce à domicile et renouveler vos licences.",
                "tl" to "Opisyal na portal upang tingnan ang zoning, kumuha ng pahintulot sa home business, o mag-renew ng lisensya.",
                "es" to "Portal oficial de la Ciudad para verificar zonificación, asegurar permisos para negocios en el hogar y renovar licencias.",
                "uk" to "Офіційний портал міста для перевірки зонування, отримання дозволів на домашній бізнес та продовження ліцензій.",
                "ar" to "البوابة الرسمية للمدينة للتحقق من تقسيم المناطق (Zoning)، وتراخيص الأعمال المنزلية، أو تجديد التراخيص التجارية للمحلات.",
                "ti" to "ከተማ ወግዓዊ ፖርታል ዞባዊ ምምሕዳር ንምፍታሽ፡ ናይ ገዛ ንግዲ ፍቓድ ውሕስነት ንምርካብ ወይ ንግዳዊ ፍቓድ ንምሕዳስ።"
            )
        ),
        CalgaryResource(
            id = "bus_link",
            category = "business",
            webUrl = "https://businesslink.ca",
            phone = "+1 (800) 272-9675",
            titles = mapOf(
                "en" to "Business Link Alberta",
                "fr" to "Business Link Alberta (Conseils Gratuits)",
                "tl" to "Business Link Alberta",
                "es" to "Business Link Alberta",
                "uk" to "Бізнес-зв'язок Альберти (Business Link)",
                "ar" to "بيزنس لينك ألبرتا لمساعدة الرواد",
                "ti" to "ንግዲ ሊንክ ኣልበርታ (Business Link)"
            ),
            descriptions = mapOf(
                "en" to "A non-profit providing free 1-on-1 business advice, market research intelligence, and step-by-step guides for Alberta startups.",
                "fr" to "Soutien gratuit 1-sur-1, études de marché et guides complets pour l'enregistrement légal d'entreprises.",
                "tl" to "Libreng payo sa negosyo, pananaliksik sa merkado, at hakbang-hakbang na gabay para sa pagsisimula ng negosyo.",
                "es" to "Organización que ofrece asesoría de negocios gratuita, estudios de mercado y guías paso a paso para emprendedores.",
                "uk" to "Некомерційна організація, що надає безкоштовні індивідуальні консультації, маркетингові дослідження та покрокові інструкції.",
                "ar" to "جهة غير ربحية توفر استشارات عمل مجانية، دراسات عن الأسواق، وإرشادات تدريجية للشركات الناشئة في ألبرتا.",
                "ti" to "ዘይመንግስታዊ ማሕበር ብነጻ ውልቃዊ ምኽሪ ንግዲ፡ ናይ ዕዳጋ መጽናዕትን ንጀመርቲ ዝኸውን መምርሒታትን ይህብ።"
            )
        ),
        CalgaryResource(
            id = "bus_chamber",
            category = "business",
            webUrl = "https://www.calgarychamber.com",
            phone = "+1 (403) 750-0400",
            titles = mapOf(
                "en" to "Calgary Chamber of Commerce",
                "fr" to "Chambre de commerce de Calgary",
                "tl" to "Calgary Chamber of Commerce",
                "es" to "Cámara de Comercio de Calgary",
                "uk" to "Торгово-промислова палата Калгарі",
                "ar" to "غرفة تجارة كالغاري",
                "ti" to "ቤት ምኽሪ ንግዲ ካልጋሪ"
            ),
            descriptions = mapOf(
                "en" to "Builds connection networks, sponsors local solopreneurs, and advocates for small businesses to provincial policymakers.",
                "fr" to "Crée des réseaux, soutient les solopreneurs locaux et défend les petites entreprises auprès du gouvernement.",
                "tl" to "Bumubuo ng network ng koneksyon, sumusuporta sa mga lokal na solopreneur, at nagtatanggol sa maliliit na negosyo.",
                "es" to "Construye redes de contacto, patrocina a solopreneurs locales y aboga por las pymes ante legisladores.",
                "uk" to "Створює контакти для нетворкінгу, підтримує місцевих соло-підприємців та лобіює інтереси малого бізнесу в уряді.",
                "ar" to "تبني شبكة علاقات وتدعم رواد الأعمال والمشاريع الحرة وتطالب بحقوق الشركات الصغيرة أمام صناع القرار بالمقاطعة.",
                "ti" to "ናይ ርክብ መርበባትን ምኽርን ይህብ፡ ንበይኖም ዝሰርሑ ይድግፍ፡ ንኣናእሽቱ ንግዳት ከኣ ፖሊሲታት ይጣበቕ።"
            )
        ),

        // NGOs / NON-PROFITS
        CalgaryResource(
            id = "ngo_federation",
            category = "ngo",
            webUrl = "https://calgarycommunities.com",
            phone = "+1 (403) 244-4111",
            titles = mapOf(
                "en" to "Federation of Calgary Communities",
                "fr" to "Fédération des communautés de Calgary",
                "tl" to "Federation of Calgary Communities",
                "es" to "Federación de Comunidades de Calgary",
                "uk" to "Федерація громад Калгарі",
                "ar" to "اتحاد المجتمعات المحلية في كالغاري",
                "ti" to "ፈደረሽን ማሕበረሰባት ካልጋሪ"
            ),
            descriptions = mapOf(
                "en" to "Huge resource coordinator for 150+ non-profit community boards. Offers custom board governance courses, audits, and insurance help.",
                "fr" to "Soutient plus de 150 conseils communautaires sans but lucratif. Offre des audits, formations d'administration et assurances.",
                "tl" to "Tagapag-ugnay para sa 150+ na komunidad ng mga non-profit. Nag-aalok ng pagsasanay sa pamamahala at tulong sa insurance.",
                "es" to "Coordinador de recursos para más de 150 juntas comunitarias sin fines de lucro. Ofrece cursos de gobernanza y auditorías.",
                "uk" to "Величезний координатор ресурсів для понад 150 некомерційних громадських рад. Надає навчальні курси, аудити та допомогу зі страхуванням.",
                "ar" to "منسق الموارد الضخم لأكثر من 150 مجلسا أهليا غير ربحي. يقدم دورات حوكمة المجالس، مراجعات الحسابات، والمساعدة بالتأمين.",
                "ti" to "ንልዕሊ 150 ዘይመንግስታውያን ማሕበራት ጸጋታት ዘተሓባብር ዓቢ ውድብ። ናይ ምሕደራ ስልጠና፡ ኦዲትን መድሕንን ሓገዝ ይህብ።"
            )
        ),
        CalgaryResource(
            id = "ngo_foundation",
            category = "ngo",
            webUrl = "https://calgaryfoundation.org",
            phone = "+1 (403) 802-7700",
            titles = mapOf(
                "en" to "Calgary Foundation (Community Grants)",
                "fr" to "Fondation de Calgary - Subventions",
                "tl" to "Calgary Foundation",
                "es" to "Fundación de Calgary (Subsidios Comunitarios)",
                "uk" to "Фундація Калгарі (Громадські гранти)",
                "ar" to "مؤسسة كالغاري الخيرية للمنح المجتمعية",
                "ti" to "ፋውንደሽን ካልጋሪ (ማሕበረሰብ ሓገዛት)"
            ),
            descriptions = mapOf(
                "en" to "Major foundation facilitating millions in community grants for local charities, grassroots climate programs, and newcomer projects.",
                "fr" to "Distribue des millions en subventions pour les organismes locaux, projets écologiques et intégration sociale.",
                "tl" to "Pangunahing pundasyon na nagbibigay ng milyon-milyong abuloy para sa lokal na kawanggawa at proyekto para sa bago.",
                "es" to "Facilita millones en subsidios comunitarios a organizaciones benéficas, programas climáticos locales de base y proyectos de inmigrantes.",
                "uk" to "Велика благодійна організація, що виділяє мільйони на гранти для місцевих ініціатив, екологічних програм та адаптаційних проєктів.",
                "ar" to "مؤسسة مانحة رئيسية توفر ملايين الدولارات لدعم الجمعيات الخيرية والمشاريع البيئية وخطط دمج الوافدين الجدد.",
                "ti" to "ንነበርቲ ሓልዮት፡ ምቅያር ክሊማን ሓደሽቲ ፕሮጀክታትን ዝኸውን ሚልዮናት ናይ ማሕበረሰብ ሓገዛት ዘዳሉ ፋውንደሽን።"
            )
        ),
        CalgaryResource(
            id = "ngo_propellus",
            category = "ngo",
            webUrl = "https://www.propellus.org",
            phone = "+1 (403) 265-5633",
            titles = mapOf(
                "en" to "Propellus (Volunteer Calgary Portal)",
                "fr" to "Propellus (Portail de bénévolat de Calgary)",
                "tl" to "Propellus (Volunteer Calgary)",
                "es" to "Propellus (Portal de Voluntarios de Calgary)",
                "uk" to "Propellus (Портал волонтерів Калгарі)",
                "ar" to "بروبيلوس (بوابة التطوع الرسمية في كالغاري)",
                "ti" to "ፕሮፐለስ (ናይ ወለንታውያን ፖርታል ካልጋሪ)"
            ),
            descriptions = mapOf(
                "en" to "Connects charity boards with active local volunteers. Crucial tool for NGOs struggling to recruit operations support.",
                "fr" to "Met en relation les comités d'ONG avec de vrais bénévoles. Idéal pour trouver du personnel pour vos opérations.",
                "tl" to "Ikonekta ang mga charity board sa mga boluntaryo. Mahalaga sa NGOs na naghahanap ng suporta.",
                "es" to "Conecta juntas de organizaciones benéficas con voluntarios locales activos. Herramienta vital para buscar soporte operativo.",
                "uk" to "З'єднує ради благодійних організацій з активними місцевими волонтерами. Важливий інструмент для НУО, що шукають підтримку.",
                "ar" to "تصل الجمعيات الخيرية بالمتطوعين النشطين في المدينة. أداة أساسية للمنظمات لدعم عمليتها التشغيلية بالكوادر.",
                "ti" to "ንወለንተኛታትን ዝምጥን ዘይመንግስታውያን ማሕበራትን የራኽብ። ወሳኒ መሳርሒ ስራሕ ንምፍላጥ።"
            )
        ),

        // CREATORS & ARTISTS
        CalgaryResource(
            id = "cre_cada",
            category = "creator",
            webUrl = "https://calgaryartsdevelopment.com",
            phone = "+1 (403) 264-5330",
            titles = mapOf(
                "en" to "Calgary Arts Development (CADA)",
                "fr" to "Développement des arts de Calgary (CADA)",
                "tl" to "Calgary Arts Development (CADA)",
                "es" to "Desarrollo de las Artes de Calgary (CADA)",
                "uk" to "Розвиток мистецтв Калгарі (CADA)",
                "ar" to "هيئة تطوير الفنون في كالغاري (CADA)",
                "ti" to "ልምዓት ስነ-ጥበብ ካልጋሪ (CADA)"
            ),
            descriptions = mapOf(
                "en" to "Civic arts partner distributing project funding, micro-grants for diverse creators, and resources for public art displays in Calgary.",
                "fr" to "Partenaire artistique civique distribuant des fonds de projet et des micro-subventions aux créateurs locaux.",
                "tl" to "Katuwang na nagbibigay ng pondo, micro-grants para sa iba't ibang manlilikha, at sining sa publiko.",
                "es" to "Socio cívico que distribuye financiamiento de proyectos, micro-subsidios para creadores diversos y exhibición de arte público.",
                "uk" to "Муніципальний партнер, що виділяє фінансування проєктів, мікрогранти для митців різного спрямування та підтримку публічного мистецтва.",
                "ar" to "الشريك المدني للفنون الداعم لتوزيع تمويل المشاريع، المنح الصغيرة للمبدعين المتنوعين، وعروض الفن العام بكالغاري.",
                "ti" to "ናይ ከተማ ስነ-ጥበብ መሓዛ፡ ናይ ፕሮጀክት ሓገዝ፡ ንፈጠርትን ስነ-ጥበባውያንን ዝኸውን ሚክሮ-ሓገዛት ይህብ።"
            )
        ),
        CalgaryResource(
            id = "cre_cspace",
            category = "creator",
            webUrl = "https://cspaceprojects.com",
            phone = "+1 (403) 476-2027",
            titles = mapOf(
                "en" to "cSPACE Marda Loop (Creative Coworking)",
                "fr" to "cSPACE Marda Loop - Espaces créatifs",
                "tl" to "cSPACE Marda Loop",
                "es" to "cSPACE Marda Loop (Coworking Creativo)",
                "uk" to "Креативний коворкінг cSPACE Marda Loop",
                "ar" to "سي سبيس ماردا لوب لمساحات العمل الفني",
                "ti" to "cSPACE ማርዳ ሉፕ (ፈጠራዊ ስራሕ ቦታ)"
            ),
            descriptions = mapOf(
                "en" to "A beautiful redeveloped sandstone school turned community arts hub. Great for renting painting, writing, and photography studio spaces.",
                "fr" to "Une ancienne école en grès transformée en pôle artistique communautaire. Studio de peinture, écriture, photographie ou théâtre.",
                "tl" to "Magandang lumang paaralan na naging creative arts hub. Mahusay para sa studio, pagsusulat, at painting.",
                "es" to "Antiguo colegio de arenisca convertido en centro artístico. Ideal para alquilar estudios de pintura, escritura o fotografía.",
                "uk" to "Красива перебудована історична пісковикова школа, перетворена на мистецький хаб. Чудово підходить для оренди художніх, літературних та фотостудій.",
                "ar" to "مدرسة حجرية تراثية تم تحويلها لخلية إبداع فني. ممتازة لاستئجار استوديوهات الرسم والكتابة والتصوير الفوتوغرافي.",
                "ti" to "ጽቡቕ ዝተሓደሰ ቤት ትምህርቲ ናብ ናይ ስነ-ጥበብ ማእከል ዝተቐየረ። ንስእሊ፡ ጽሕፈትን ፎቶግራፍን ስቱድዮ ንምክራይ ጽቡቕ ቦታ።"
            )
        )
    )
}
