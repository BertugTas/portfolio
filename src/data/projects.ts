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
};
