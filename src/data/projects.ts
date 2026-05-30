export type CaseStudy = {
  title: string;
  area: string;
  problem: string;
  approach: string;
  outcome: string;
  learnings: string;
  stack: string[];
  github: string;
};

export type ProjectEntry = {
  slug: string;
  tr: CaseStudy;
  en: CaseStudy;
};

export const projectsData: ProjectEntry[] = [
  {
    slug: "brain-mri",
    tr: {
      title: "Beyin MRI Tümör Sınıflandırma Sistemi",
      area: "Derin Öğrenme · Tıbbi Görüntü Analizi",
      problem:
        "Beyin tümörü teşhisi radyolog deneyimine ve manuel incelemeye dayanıyor. Bu süreç zaman alıcı ve insan hatasına açık. Otomatik bir sınıflandırma sistemi teşhis sürecini hızlandırabilir ve destekleyici bir araç sunabilir.",
      approach:
        "CNN mimarisi tasarlandı ve MRI görüntü veri seti üzerinde eğitildi. Veri augmentasyonu (rotation, flip, zoom) ile model genelleme kapasitesi artırıldı. Precision, recall ve F1-score metrikleriyle kapsamlı model değerlendirmesi yapıldı. Overfitting önlemek için dropout katmanları eklendi.",
      outcome:
        "Model tümörlü ve tümörsüz MRI görüntülerini yüksek doğrulukla ayırt edebildi. Confusion matrix analizi ile sınıf bazlı performans değerlendirildi. Tıbbi görüntü işleme pipeline'ı uçtan uca kuruldu.",
      learnings:
        "CNN mimarisi tasarımı, tıbbi veri setlerinde class imbalance problemi, augmentasyon stratejileri ve model yorumlanabilirliği konularında derinlemesine deneyim kazanıldı.",
      stack: ["Python", "TensorFlow", "Keras", "CNN", "NumPy", "OpenCV", "matplotlib"],
      github: "https://github.com/BertugTas/Brain-MRI-Classification",
    },
    en: {
      title: "Brain MRI Tumor Classification System",
      area: "Deep Learning · Medical Image Analysis",
      problem:
        "Brain tumor diagnosis relies on radiologist expertise and manual review — a time-consuming process prone to human error. An automated classification system can accelerate diagnosis and serve as a decision-support tool.",
      approach:
        "A CNN architecture was designed and trained on an MRI image dataset. Data augmentation (rotation, flip, zoom) increased generalization capacity. Comprehensive model evaluation was performed using precision, recall, and F1-score metrics. Dropout layers were added to prevent overfitting.",
      outcome:
        "The model accurately distinguished between tumorous and non-tumorous MRI images. Class-level performance was evaluated via confusion matrix analysis. An end-to-end medical image processing pipeline was established.",
      learnings:
        "Gained deep experience in CNN architecture design, class imbalance in medical datasets, augmentation strategies, and model interpretability.",
      stack: ["Python", "TensorFlow", "Keras", "CNN", "NumPy", "OpenCV", "matplotlib"],
      github: "https://github.com/BertugTas/Brain-MRI-Classification",
    },
  },
  {
    slug: "cancer-diagnosis",
    tr: {
      title: "Kanser Teşhis Modeli — Çok Algoritma Analizi",
      area: "Makine Öğrenmesi · Sağlık Analitiği",
      problem:
        "Meme kanseri teşhisinde hangi makine öğrenmesi algoritmasının en iyi performansı verdiği belirsiz. Farklı algoritmaların güçlü ve zayıf yönlerini karşılaştıran sistematik bir analiz gerekiyor.",
      approach:
        "Logistic Regression, Random Forest, SVM ve KNN algoritmaları aynı veri seti üzerinde eğitildi ve karşılaştırıldı. ROC eğrileri ve AUC değerleri hesaplandı. Confusion matrix ile her modelin hata tipleri (FP/FN) analiz edildi. Cross-validation ile model güvenilirliği test edildi.",
      outcome:
        "Algoritmalar arasında anlamlı performans farkları tespit edildi. ROC-AUC karşılaştırması hangi modelin klinik ortamda daha uygun olduğunu gösterdi. Tüm modeller için kapsamlı metrik raporu oluşturuldu.",
      learnings:
        "Model seçim kriterleri, sağlık verisinde precision-recall dengesi, ROC analizi ve cross-validation metodolojisi konularında pratik deneyim kazanıldı.",
      stack: ["Python", "scikit-learn", "pandas", "NumPy", "matplotlib", "seaborn"],
      github: "https://github.com/BertugTas/ML-BreastCancer-Classification",
    },
    en: {
      title: "Cancer Diagnosis Model — Multi-Algorithm Analysis",
      area: "Machine Learning · Health Analytics",
      problem:
        "It is unclear which ML algorithm performs best for breast cancer diagnosis. A systematic comparison of algorithm strengths and weaknesses is needed.",
      approach:
        "Logistic Regression, Random Forest, SVM, and KNN were trained and compared on the same dataset. ROC curves and AUC values were computed. Confusion matrix analysis revealed each model's error types (FP/FN). Cross-validation tested model reliability.",
      outcome:
        "Significant performance differences were found between algorithms. ROC-AUC comparison revealed which model is most suitable for clinical use. A comprehensive metric report was generated for all models.",
      learnings:
        "Gained practical experience in model selection criteria, precision-recall tradeoffs in health data, ROC analysis, and cross-validation methodology.",
      stack: ["Python", "scikit-learn", "pandas", "NumPy", "matplotlib", "seaborn"],
      github: "https://github.com/BertugTas/ML-BreastCancer-Classification",
    },
  },
  {
    slug: "bi-dashboard",
    tr: {
      title: "Kurumsal İş Zekası Dashboard",
      area: "Veri Mühendisliği · İş Zekası",
      problem:
        "Kurumsal eğitim verisi dağınık kaynaklarda tutuluyordu. Yöneticiler KPI takibi ve dönemsel karşılaştırma için manuel raporlara bağımlıydı. Gerçek zamanlı ve interaktif bir BI çözümüne ihtiyaç vardı.",
      approach:
        "MS SQL Server ve PostgreSQL üzerinde star-schema veri modeli tasarlandı. DAX ölçümleri ve hesaplanmış sütunlarla veri dönüşümleri yapıldı. Power BI'da KPI kartları, trend grafikleri ve dönemsel karşılaştırma görselleri oluşturuldu. Dilimleyicilerle interaktif filtreleme eklendi.",
      outcome:
        "Yöneticiler tek bir dashboard üzerinden tüm eğitim metriklerini takip edebildi. Manuel raporlama ihtiyacı ortadan kalktı. Dönemsel trendler ve KPI sapmaları anlık olarak görünür hale geldi.",
      learnings:
        "Star-schema modelleme, DAX hesaplama mantığı, Power BI görselleştirme best practice'leri ve kurumsal veri yönetimi konularında yetkinlik kazanıldı.",
      stack: ["Power BI", "DAX", "MS SQL Server", "PostgreSQL", "T-SQL"],
      github: "https://github.com/BertugTas",
    },
    en: {
      title: "Enterprise Business Intelligence Dashboard",
      area: "Data Engineering · Business Intelligence",
      problem:
        "Corporate training data was scattered across multiple sources. Managers depended on manual reports for KPI tracking. A real-time, interactive BI solution was needed.",
      approach:
        "A star-schema data model was designed on MS SQL Server and PostgreSQL. DAX measures and calculated columns handled data transformations. Power BI visuals included KPI cards, trend charts, and period comparisons with slicer-based filtering.",
      outcome:
        "Managers could track all training metrics from a single dashboard. Manual reporting was eliminated. Periodic trends and KPI deviations became instantly visible.",
      learnings:
        "Gained expertise in star-schema modeling, DAX calculation logic, Power BI visualization best practices, and enterprise data management.",
      stack: ["Power BI", "DAX", "MS SQL Server", "PostgreSQL", "T-SQL"],
      github: "https://github.com/BertugTas",
    },
  },
  {
    slug: "automation-bot",
    tr: {
      title: "Otomatik Veri Toplama & Uyarı Sistemi",
      area: "Otomasyon · Veri Pipeline",
      problem:
        "Kariyer platformlarındaki ilanları manuel takip etmek zaman alıcı ve verimsiz. Yeni ilanlar geç fark edildiğinde fırsat kaçıyor. Otomatik bir izleme ve anlık bildirim sistemi gerekiyor.",
      approach:
        "Playwright ile hedef platformlar zamanlanmış aralıklarla tarandı. Belirlenen filtrelerle (konum, pozisyon, şirket) eşleşen yeni ilanlar tespit edildi. Twilio API entegrasyonu ile SMS bildirimleri gönderildi. Python scheduler ile süreç tamamen otomatize edildi.",
      outcome:
        "Yeni ilanlar saniyeler içinde tespit edilerek SMS ile bildirim gönderildi. Manuel takip tamamen ortadan kalktı. Sistem 7/24 arka planda çalışabilir hale getirildi.",
      learnings:
        "Playwright ile web otomasyon, API entegrasyonu, zamanlayıcı yapılandırması ve hata yönetimi konularında pratik deneyim kazanıldı.",
      stack: ["Python", "Playwright", "Twilio API", "Scheduler"],
      github: "https://github.com/BertugTas/Kariyer-ilan-Botu",
    },
    en: {
      title: "Automated Data Collection & Alert System",
      area: "Automation · Data Pipeline",
      problem:
        "Manually tracking job listings on career platforms is time-consuming and inefficient. Late detection means missed opportunities. An automated monitoring and instant notification system is needed.",
      approach:
        "Target platforms were scanned at scheduled intervals using Playwright. New listings matching defined filters (location, position, company) were detected. SMS notifications were sent via Twilio API integration. Python scheduler fully automated the process.",
      outcome:
        "New listings were detected within seconds and SMS alerts were sent instantly. Manual tracking was completely eliminated. The system runs 24/7 in the background.",
      learnings:
        "Gained practical experience in Playwright web automation, API integration, scheduler configuration, and error handling.",
      stack: ["Python", "Playwright", "Twilio API", "Scheduler"],
      github: "https://github.com/BertugTas/Kariyer-ilan-Botu",
    },
  },
  {
    slug: "predictiveops-platform",
    tr: {
      title: "PredictiveOps Platform — Full-Stack ML Platformu",
      area: "MLOps · Full-Stack AI Mühendisliği",
      problem:
        "Makine öğrenmesi modellerini production ortamına taşımak; eğitim, değerlendirme ve tahmin adımlarını yönetmek için entegre bir araç seti gerektiriyor. Ayrı bileşenlerin koordinasyonu, izleme ve deployment süreci karmaşık ve hata prone.",
      approach:
        "FastAPI ile RESTful API katmanı (train/evaluate/predict endpoint'leri) oluşturuldu. Baseline ML pipeline (veri alımı, doğrulama, eğitim, değerlendirme) modüler biçimde tasarlandı. SQLite ile tahmin geçmişi kalıcı hale getirildi. Next.js dashboard ile ML workflow'u görsel olarak yönetildi. Docker Compose ile tüm servisler tek komutla ayağa kaldırılacak şekilde yapılandırıldı. GitHub Actions CI pipeline'ı ile backend, ML modülü ve frontend build süreçleri otomatize edildi.",
      outcome:
        "Tek bir platform üzerinden model eğitimi, değerlendirmesi ve tahmin işlemleri yönetilebilir hale geldi. CI/CD pipeline sayesinde kod kalitesi otomatik olarak kontrol edildi. Docker ile local ve cloud ortamlarında tutarlı deployment sağlandı.",
      learnings:
        "MLOps pipeline tasarımı, FastAPI ile REST API geliştirme, Docker multi-service orchestration, GitHub Actions CI entegrasyonu ve Next.js dashboard geliştirme konularında kapsamlı deneyim kazanıldı.",
      stack: ["Python", "FastAPI", "Next.js", "SQLite", "Docker", "scikit-learn", "GitHub Actions"],
      github: "https://github.com/BertugTas/predictiveops-platform",
    },
    en: {
      title: "PredictiveOps Platform — Full-Stack ML Platform",
      area: "MLOps · Full-Stack AI Engineering",
      problem:
        "Moving ML models to production requires an integrated toolkit for managing training, evaluation, and prediction steps. Coordinating separate components, monitoring, and the deployment process is complex and error-prone.",
      approach:
        "A RESTful API layer (train/evaluate/predict endpoints) was built with FastAPI. A baseline ML pipeline (data ingestion, validation, training, evaluation) was designed modularly. SQLite was used to persist prediction history. A Next.js dashboard was built for visual ML workflow management. Docker Compose was configured to bring up all services with a single command. GitHub Actions CI pipeline automated backend, ML module, and frontend build processes.",
      outcome:
        "Model training, evaluation, and prediction became manageable from a single platform. CI/CD pipeline automatically enforced code quality. Docker ensured consistent deployment across local and cloud environments.",
      learnings:
        "Gained comprehensive experience in MLOps pipeline design, REST API development with FastAPI, Docker multi-service orchestration, GitHub Actions CI integration, and Next.js dashboard development.",
      stack: ["Python", "FastAPI", "Next.js", "SQLite", "Docker", "scikit-learn", "GitHub Actions"],
      github: "https://github.com/BertugTas/predictiveops-platform",
    },
  },
  {
    slug: "database-ui",
    tr: {
      title: "Kurumsal Veritabanı Yönetim Sistemi",
      area: "Yazılım Geliştirme · Veritabanı",
      problem:
        "Küçük ölçekli işletmelerde fatura, stok ve kullanıcı yönetimi Excel tablolarıyla yapılıyordu. Bu yaklaşım hata prone, ölçeksiz ve yönetimi zordu. Merkezi, rol tabanlı bir yönetim uygulaması gerekiyordu.",
      approach:
        "C# ile OOP prensiplerine uygun katmanlı mimari tasarlandı. MS SQL Server backend ile CRUD operasyonları implement edildi. Rol tabanlı yetkilendirme sistemi kuruldu. Windows Forms ile kullanıcı dostu arayüz geliştirildi. T-SQL ile raporlama sorguları yazıldı.",
      outcome:
        "Fatura, stok ve kullanıcı yönetimi tek bir uygulama üzerinden yapılabilir hale geldi. Rol tabanlı erişim kontrolü veri güvenliğini artırdı. Raporlama modülü manuel hesaplamaları ortadan kaldırdı.",
      learnings:
        "OOP mimari tasarımı, katmanlı uygulama geliştirme, veritabanı CRUD operasyonları, rol tabanlı güvenlik ve Windows Forms geliştirme konularında deneyim kazanıldı.",
      stack: ["C#", "OOP", "MS SQL Server", "T-SQL", "Windows Forms"],
      github: "https://github.com/BertugTas/DataBaseUI",
    },
    en: {
      title: "Enterprise Database Management System",
      area: "Software Development · Database",
      problem:
        "Small businesses managed invoices, inventory, and users via Excel spreadsheets — error-prone, unscalable, and difficult to maintain. A centralized, role-based management application was needed.",
      approach:
        "A layered architecture following OOP principles was designed in C#. CRUD operations were implemented with MS SQL Server backend. A role-based authorization system was established. A user-friendly interface was built with Windows Forms. Reporting queries were written in T-SQL.",
      outcome:
        "Invoice, inventory, and user management became accessible from a single application. Role-based access control improved data security. The reporting module eliminated manual calculations.",
      learnings:
        "Gained experience in OOP architecture design, layered application development, database CRUD operations, role-based security, and Windows Forms development.",
      stack: ["C#", "OOP", "MS SQL Server", "T-SQL", "Windows Forms"],
      github: "https://github.com/BertugTas/DataBaseUI",
    },
  },
];

export const slugMap: Record<string, string> = {
  "Brain MRI Tumor Classification System":            "brain-mri",
  "Beyin MRI Tümör Sınıflandırma Sistemi":            "brain-mri",
  "Cancer Diagnosis Model — Multi-Algorithm Analysis": "cancer-diagnosis",
  "Kanser Teşhis Modeli — Çok Algoritma Analizi":     "cancer-diagnosis",
  "Enterprise BI Dashboard":                           "bi-dashboard",
  "Kurumsal İş Zekası Dashboard":                     "bi-dashboard",
  "Automated Data Collection & Alerting System":       "automation-bot",
  "Otomatik Veri Toplama & Uyarı Sistemi":            "automation-bot",
  "Enterprise Database Management System":             "database-ui",
  "Kurumsal Veritabanı Yönetim Sistemi":              "database-ui",
  "PredictiveOps Platform — Full-Stack ML Platform":  "predictiveops-platform",
  "PredictiveOps Platform — Full-Stack ML Platformu": "predictiveops-platform",
};

// ── Project card list — single source of truth for the main page ────────

export type ProjectMetric = {
  val: string;
  labelEn: string;
  labelTr: string;
  color: string;
};

export type ProjectMetaKV = {
  keyEn: string;
  keyTr: string;
  val: string;
  color?: string;
};

export type ProjectCard = {
  id: string;
  featured: boolean;
  slug?: string;
  href: string;
  pypiUrl?: string;
  stack: string[];
  badges: { en: string; tr: string }[];
  metrics: ProjectMetric[];
  meta: ProjectMetaKV[];
  en: { title: string; area: string; description: string };
  tr: { title: string; area: string; description: string };
};

export const projectsList: ProjectCard[] = [
  // ── 1. bt-flow (featured) ──────────────────────────────────────────────
  {
    id: "bt-flow",
    featured: true,
    href: "https://github.com/BertugTas/bt-flow",
    pypiUrl: "https://pypi.org/project/bt-flow/",
    stack: ["Python", "FastAPI", "Pydantic", "scikit-learn", "Typer", "PyPI"],
    badges: [
      { en: "Open Source", tr: "Açık Kaynak" },
      { en: "PyPI Published", tr: "PyPI'da Yayında" },
      { en: "1-Line Deploy", tr: "Tek Satır Deploy" },
    ],
    metrics: [
      { val: "PyPI", labelEn: "Published",  labelTr: "Yayında",    color: "var(--cyan)"   },
      { val: "REST", labelEn: "API Layer",  labelTr: "API Katmanı", color: "var(--green)"  },
      { val: "MIT",  labelEn: "License",    labelTr: "Lisans",      color: "var(--orange)" },
    ],
    meta: [
      { keyEn: "Status",  keyTr: "Durum", val: "Live on PyPI",        color: "var(--green)"  },
      { keyEn: "Type",    keyTr: "Tür",   val: "Open Source Library"                         },
      { keyEn: "License", keyTr: "Lisans",val: "MIT"                                         },
    ],
    en: {
      title: "bt-flow — Zero-Boilerplate ML Deployment",
      area: "Open Source · MLOps · Python Library",
      description:
        "Open-source Python library published on PyPI. Wraps trained scikit-learn models into production-ready FastAPI REST APIs in a single line — automated route generation, dynamic Pydantic schema inference, and a CLI designed for zero-friction ML deployment workflows.",
    },
    tr: {
      title: "bt-flow — Tek Satırda ML Deployment",
      area: "Açık Kaynak · MLOps · Python Kütüphanesi",
      description:
        "PyPI üzerinde yayınlanan açık kaynaklı Python kütüphanesi. Eğitilmiş scikit-learn modellerini tek satırda production-ready FastAPI REST API'lerine dönüştürür — otomatik route üretimi, dinamik Pydantic şema çıkarımı ve sıfır sürtünmeli ML deployment için CLI.",
    },
  },

  // ── 2. Teknofest Health AI ─────────────────────────────────────────────
  {
    id: "teknofest-health",
    featured: false,
    href: "https://github.com/BertugTas",
    stack: ["Python", "PyTorch", "CNN", "OpenCV", "DICOM", "NumPy"],
    badges: [
      { en: "Score: 88/100", tr: "Puan: 88/100" },
      { en: "Oncology AI",   tr: "Onkoloji AI"  },
      { en: "Medical Imaging", tr: "Tıbbi Görüntüleme" },
    ],
    metrics: [],
    meta: [
      { keyEn: "Score",  keyTr: "Puan",  val: "88 / 100",      color: "var(--cyan)"   },
      { keyEn: "Type",   keyTr: "Tür",   val: "Competition",    color: "var(--orange)" },
      { keyEn: "Domain", keyTr: "Alan",  val: "Medical AI"                             },
    ],
    en: {
      title: "Medical AI Platform — Teknofest Health Technologies",
      area: "Medical AI · Computer Vision · Teknofest",
      description:
        "Comprehensive medical AI system developed for the Teknofest Health Technologies competition. Focuses on oncology data analysis and deep learning-based medical imaging classification using CNN architectures. Achieved an 88/100 evaluation score in competitive judging.",
    },
    tr: {
      title: "Tıbbi Yapay Zeka Platformu — Teknofest Sağlık Teknolojileri",
      area: "Tıbbi Yapay Zeka · Bilgisayarlı Görü · Teknofest",
      description:
        "Teknofest Sağlık Teknolojileri yarışması için geliştirilen kapsamlı tıbbi yapay zeka sistemi. CNN mimarileri kullanılarak onkoloji veri analizi ve derin öğrenme tabanlı tıbbi görüntü sınıflandırmasına odaklanır. Rekabetçi değerlendirmede 88/100 puan elde edildi.",
    },
  },

  // ── 3. SAVTEK GCS Drone Tracker ────────────────────────────────────────
  {
    id: "savtek-gcs",
    featured: false,
    href: "https://github.com/BertugTas",
    stack: ["Python", "ONNX", "OpenCV", "NumPy", "Embedded Systems"],
    badges: [
      { en: "Real-Time",    tr: "Gerçek Zamanlı" },
      { en: "ROI Detection",tr: "ROI Tespiti"    },
      { en: "ONNX Runtime", tr: "ONNX Runtime"   },
    ],
    metrics: [],
    meta: [
      { keyEn: "Status",    keyTr: "Durum",  val: "Competition",     color: "var(--orange)" },
      { keyEn: "Type",      keyTr: "Tür",    val: "Defense Tech"                            },
      { keyEn: "Inference", keyTr: "Çıkarım",val: "ONNX Optimized"                         },
    ],
    en: {
      title: "SAVTEK GCS — Real-Time Drone Tracking System",
      area: "Computer Vision · Embedded Systems · SAVTEK",
      description:
        "Real-time drone-based object tracking and ground control station (GCS) application. Integrates Region of Interest (ROI) detection with ONNX-optimized model inference for low-latency aerial surveillance and target acquisition under competition conditions.",
    },
    tr: {
      title: "SAVTEK GCS — Gerçek Zamanlı İHA Takip Sistemi",
      area: "Bilgisayarlı Görü · Gömülü Sistemler · SAVTEK",
      description:
        "Gerçek zamanlı İHA tabanlı nesne takibi ve yer kontrol istasyonu (GCS) uygulaması. Yarışma koşullarında düşük gecikmeli havadan gözetleme ve hedef tespiti için ROI algılama ile ONNX optimize model çıkarımını entegre eder.",
    },
  },

  // ── 4. TÜBİTAK Research Platform ──────────────────────────────────────
  {
    id: "tubitak-research",
    featured: false,
    href: "https://github.com/BertugTas",
    stack: ["Python", "R", "Statistics", "pandas", "scikit-learn"],
    badges: [
      { en: "2209-A Funded",       tr: "2209-A Destekli"      },
      { en: "1002-A Funded",       tr: "1002-A Destekli"      },
      { en: "Predictive Modeling", tr: "Tahminsel Modelleme"  },
    ],
    metrics: [],
    meta: [
      { keyEn: "Grant",  keyTr: "Hibe",  val: "2209-A · 1002-A",   color: "var(--orange)" },
      { keyEn: "Status", keyTr: "Durum", val: "Active Research",    color: "var(--green)"  },
      { keyEn: "Type",   keyTr: "Tür",   val: "Academic Research"                          },
    ],
    en: {
      title: "TÜBİTAK 2209-A & 1002-A — Research Data Platform",
      area: "Academic Research · Data Science · Statistics",
      description:
        "Academic and regional research data analysis platform developed under TÜBİTAK 2209-A (undergraduate research support) and 1002-A grants. Applies statistical modeling, machine learning, and data visualization to derive actionable insights from domain-specific research datasets.",
    },
    tr: {
      title: "TÜBİTAK 2209-A & 1002-A — Araştırma Veri Platformu",
      area: "Akademik Araştırma · Veri Bilimi · İstatistik",
      description:
        "TÜBİTAK 2209-A (lisans araştırma desteği) ve 1002-A hibeleri kapsamında geliştirilen akademik ve bölgesel araştırma veri analizi platformu. Alan spesifik araştırma veri setlerinden uygulanabilir içgörüler türetmek için istatistiksel modelleme, makine öğrenmesi ve veri görselleştirme kullanır.",
    },
  },
];
