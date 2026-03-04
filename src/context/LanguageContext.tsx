"use client";

import { createContext, useContext, useState } from "react";

export type Lang = "tr" | "en";

interface LangCtx {
  lang: Lang;
  toggle: () => void;
}

export const LanguageContext = createContext<LangCtx>({ lang: "tr", toggle: () => {} });
export const useLanguage = () => useContext(LanguageContext);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("tr");
  const toggle = () => setLang((l) => (l === "tr" ? "en" : "tr"));
  return (
    <LanguageContext.Provider value={{ lang, toggle }}>
      {children}
    </LanguageContext.Provider>
  );
}

/* ─── translations ─────────────────────────────────────────────── */
export const T = {
  tr: {
    nav: {
      about: "hakkımda", skills: "uzmanlık", projects: "çalışmalar", contact: "iletişim",
      status: "İzmir, TR — aktif",
    },
    hero: {
      eyebrow: "Veri Bilimi · Veri Mühendisi",
      ml: "Makine Öğrenmesi", dl: "Derin Öğrenme", bi: "Veri Mühendisliği",
      cta_work: "Çalışmaları Gör →", cta_contact: "İletişim", scroll: "Kaydır",
    },
    about: {
      num: "// 01", title: "Hakkımda",
      p1: ["Dokuz Eylül Üniversitesi", " Bilgisayar Bilimi bölümünde öğrenciyim. İzmir merkezli olarak çalışıyor, veri bilimi ve makine öğrenmesi alanında teorik birikimimi gerçek projelere dönüştürüyorum."],
      p2a: "makine öğrenmesi modeli geliştirme", p2b: "derin öğrenme",
      p2rest: ". Sınıflandırma problemlerinden CNN mimarisine kadar geniş bir alanda çalışıyorum; özellikle ", p2c: "tıbbi görüntü analizi",
      p2end: " ve teşhis sistemleri üzerine aktif projelerim var.",
      p3a: "SQL ve PostgreSQL", p3b: " ile veritabanı tasarımı ve sorgu optimizasyonu yapıyorum. ",
      p3c: "Power BI ve DAX",
      p3end: " konularında yetkinim; kurumsal veriyi anlamlı iş kararlarına dönüştürecek analitik yapılar kuruyorum.",
      p2intro: "Temel odağım ", p3intro: "Veri mühendisliği tarafında ",
      details: [
        ["Üniversite", "Dokuz Eylül Üniversitesi"],
        ["Bölüm",      "Bilgisayar Bilimi"],
        ["Konum",      "İzmir, TR"],
        ["Uzmanlık",   "Veri Bilimi & ML"],
        ["Durum",      "● Müsait", "green"],
        ["Hedef Rol",  "Veri Mühendisi"],
      ],
    },
    skills: {
      num: "// 02", title: "Uzmanlık Alanları",
      groups: [
        {
          icon: "◈", title: "Makine Öğrenmesi",
          sub: "Sınıflandırma, regresyon ve ensemble yöntemleriyle model geliştirme, değerlendirme ve optimizasyon.",
          bars: [
            { name: "Model Tasarımı & Eğitimi",         pct: 92 },
            { name: "Veri Analizi & Keşifsel Analiz",   pct: 90 },
            { name: "Model Değerlendirme & Yorumlama",  pct: 88 },
          ],
          tags: ["Logistic Reg.", "Random Forest", "SVM", "KNN", "Ensemble"],
          focus: null,
        },
        {
          icon: "◉", title: "Derin Öğrenme",
          sub: "CNN mimarileri ile model tasarımı, eğitimi ve fine-tuning. Gerçek veri setleri üzerinde kapsamlı değerlendirme.",
          bars: [
            { name: "CNN Mimarisi & Tasarımı",        pct: 82 },
            { name: "Model Eğitimi & Fine-tuning",    pct: 80 },
            { name: "Model Değerlendirme & Analiz",   pct: 78 },
          ],
          tags: ["CNN", "TensorFlow", "Keras", "NumPy", "scikit-learn"],
          focus: null,
        },
        {
          icon: "◎", title: "Görüntü İşleme",
          sub: "Tıbbi görüntü analizi ve sınıflandırması. OpenCV ile ön işleme, segmentasyon ve özellik çıkarımı.",
          bars: [
            { name: "Tıbbi Görüntü Sınıflandırması", pct: 85 },
            { name: "Görüntü Ön İşleme & Augment.",  pct: 83 },
            { name: "OpenCV & Özellik Çıkarımı",     pct: 80 },
          ],
          tags: ["OpenCV", "CNN", "PIL", "Scikit-Image", "NumPy"],
          focus: null,
        },
      ],
    },
    projects: {
      num: "// 03", title: "Çalışmalar",
      items: [
        {
          featured: true,
          title: "Beyin MRI Tümör Sınıflandırma Sistemi",
          area: "Derin Öğrenme · Tıbbi Görüntü Analizi",
          description: "CNN mimarisi kullanılarak beyin MRI görüntülerinden tümör tespiti ve sınıflandırması. Veri augmentasyonu ile model genelleştirme kapasitesi artırıldı; precision, recall ve F1 metrikleriyle kapsamlı model değerlendirmesi yapıldı.",
          href: "https://github.com/BertugTas/Brain-MRI-Classification",
        },
        {
          featured: false,
          title: "Kanser Teşhis Modeli — Çok Algoritma Analizi",
          area: "Makine Öğrenmesi · Sağlık Analitiği",
          description: "Meme kanseri teşhisinde Logistic Regression, Random Forest, SVM ve KNN algoritmalarının karşılaştırmalı analizi. ROC eğrileri ve confusion matrix ile model seçim süreci yürütüldü.",
          href: "https://github.com/BertugTas/ML-BreastCancer-Classification",
        },
        {
          featured: false,
          title: "Kurumsal İş Zekası Dashboard",
          area: "Veri Mühendisliği · İş Zekası",
          description: "Kurumsal eğitim verilerini DAX hesaplamaları ve star-schema modeliyle yapılandıran iş zekası raporu. KPI takibi, dönemsel karşılaştırma ve trend analizini interaktif görseller ile sunar.",
          href: "https://github.com/BertugTas",
        },
        {
          featured: false,
          title: "Otomatik Veri Toplama & Uyarı Sistemi",
          area: "Otomasyon · Veri Pipeline",
          description: "Hedef platformları zamanlanmış aralıklarla tarayan, belirlenen kriterlere uyan kayıtları tespit eden ve Twilio API üzerinden anlık bildirim ileten veri toplama pipeline'ı.",
          href: "https://github.com/BertugTas/Kariyer-ilan-Botu",
        },
        {
          featured: false,
          title: "Kurumsal Veritabanı Yönetim Sistemi",
          area: "Yazılım Geliştirme · Veritabanı",
          description: "OOP prensipleriyle C# üzerinde geliştirilen fatura, stok ve kullanıcı yönetimi uygulaması. MS SQL Server backend ile rol tabanlı yetkilendirme, CRUD operasyonları ve raporlama modülü.",
          href: "https://github.com/BertugTas/DataBaseUI",
        },
        {
          featured: false,
          title: "PredictiveOps Platform — Full-Stack ML Platformu",
          area: "MLOps · Full-Stack AI Mühendisliği",
          description: "FastAPI backend, Next.js dashboard ve modüler ML pipeline'ından oluşan production-style makine öğrenmesi platformu. Docker Compose ile tek komutta ayağa kalkan tam stack deployment; GitHub Actions CI ile otomatik kalite kontrol.",
          href: "https://github.com/BertugTas/predictiveops-platform",
        },
      ],
    },
    contact: {
      num: "// 04", title: "İletişim",
      heading1: "Birlikte", heading2: "çalışalım.",
      body: "Veri bilimi projeleri, iş zekası çözümleri veya yazılım geliştirme konularında iş birliği için ulaşabilirsiniz.",
      cta: "Mail Gönder →",
    },
    footer: { location: "İzmir, Türkiye" },
  },

  en: {
    nav: {
      about: "about", skills: "expertise", projects: "work", contact: "contact",
      status: "Izmir, TR — active",
    },
    hero: {
      eyebrow: "Data Science · Data Engineer",
      ml: "Machine Learning", dl: "Deep Learning", bi: "Data Engineering",
      cta_work: "View Work →", cta_contact: "Contact", scroll: "Scroll",
    },
    about: {
      num: "// 01", title: "About",
      p1: ["Dokuz Eylül University", " — Computer Science student. Based in Izmir, I translate my theoretical knowledge in data science and machine learning into real-world projects."],
      p2a: "machine learning model development", p2b: "deep learning",
      p2rest: ". I work across a wide range from classification problems to CNN architectures; I have active projects in ", p2c: "medical image analysis",
      p2end: " and diagnostic systems.",
      p3a: "SQL & PostgreSQL", p3b: " for database design and query optimization. ",
      p3c: "Power BI & DAX",
      p3end: " — proficient; building analytical structures that turn corporate data into meaningful business decisions.",
      p2intro: "My primary focus is ", p3intro: "On the data engineering side, I use ",
      details: [
        ["University", "Dokuz Eylül University"],
        ["Department", "Computer Science"],
        ["Location",   "Izmir, TR"],
        ["Expertise",  "Data Science & ML"],
        ["Status",     "● Available", "green"],
        ["Target Role","Data Engineer"],
      ],
    },
    skills: {
      num: "// 02", title: "Areas of Expertise",
      groups: [
        {
          icon: "◈", title: "Machine Learning",
          sub: "Model development, evaluation, and optimization using classification, regression, and ensemble methods.",
          bars: [
            { name: "Model Design & Training",          pct: 92 },
            { name: "Data Analysis & Exploration",      pct: 90 },
            { name: "Model Evaluation & Interpretation",pct: 88 },
          ],
          tags: ["Logistic Reg.", "Random Forest", "SVM", "KNN", "Ensemble"],
          focus: null,
        },
        {
          icon: "◉", title: "Deep Learning",
          sub: "CNN architecture design, training, and fine-tuning. Comprehensive evaluation on real-world datasets.",
          bars: [
            { name: "CNN Architecture & Design",       pct: 82 },
            { name: "Model Training & Fine-tuning",    pct: 80 },
            { name: "Model Evaluation & Analysis",     pct: 78 },
          ],
          tags: ["CNN", "TensorFlow", "Keras", "NumPy", "scikit-learn"],
          focus: null,
        },
        {
          icon: "◎", title: "Computer Vision",
          sub: "Medical image analysis and classification. Preprocessing, segmentation, and feature extraction with OpenCV.",
          bars: [
            { name: "Medical Image Classification",  pct: 85 },
            { name: "Image Preprocessing & Augment.",pct: 83 },
            { name: "OpenCV & Feature Extraction",   pct: 80 },
          ],
          tags: ["OpenCV", "CNN", "PIL", "Scikit-Image", "NumPy"],
          focus: null,
        },
      ],
    },
    projects: {
      num: "// 03", title: "Work",
      items: [
        {
          featured: true,
          title: "Brain MRI Tumor Classification System",
          area: "Deep Learning · Medical Image Analysis",
          description: "Automated tumor detection and classification from brain MRI images using CNN architecture. Data augmentation enhanced model generalization; comprehensive evaluation with precision, recall, and F1 metrics.",
          href: "https://github.com/BertugTas/Brain-MRI-Classification",
        },
        {
          featured: false,
          title: "Cancer Diagnosis Model — Multi-Algorithm Analysis",
          area: "Machine Learning · Healthcare Analytics",
          description: "Comparative analysis of Logistic Regression, Random Forest, SVM, and KNN algorithms for breast cancer diagnosis. Model selection conducted via ROC curves and confusion matrix.",
          href: "https://github.com/BertugTas/ML-BreastCancer-Classification",
        },
        {
          featured: false,
          title: "Enterprise BI Dashboard",
          area: "Data Engineering · Business Intelligence",
          description: "Business intelligence report structuring corporate training data with DAX calculations and star-schema modeling. Presents KPI tracking, periodic comparison, and trend analysis through interactive visuals.",
          href: "https://github.com/BertugTas",
        },
        {
          featured: false,
          title: "Automated Data Collection & Alerting System",
          area: "Automation · Data Pipeline",
          description: "Data collection pipeline that scans target platforms at scheduled intervals, detects records meeting defined criteria, and delivers instant notifications via the Twilio API.",
          href: "https://github.com/BertugTas/Kariyer-ilan-Botu",
        },
        {
          featured: false,
          title: "Enterprise Database Management System",
          area: "Software Development · Database",
          description: "Invoice, inventory, and user management application built in C# with OOP principles. MS SQL Server backend with role-based authorization, CRUD operations, and reporting module.",
          href: "https://github.com/BertugTas/DataBaseUI",
        },
        {
          featured: false,
          title: "PredictiveOps Platform — Full-Stack ML Platform",
          area: "MLOps · Full-Stack AI Engineering",
          description: "Production-style ML platform with FastAPI backend, Next.js dashboard, and modular ML pipeline. Full-stack deployment with Docker Compose in a single command; automated quality checks via GitHub Actions CI.",
          href: "https://github.com/BertugTas/predictiveops-platform",
        },
      ],
    },
    contact: {
      num: "// 04", title: "Contact",
      heading1: "Let's", heading2: "work together.",
      body: "Available for collaboration on data science projects, business intelligence solutions, or software development.",
      cta: "Send Email →",
    },
    footer: { location: "Izmir, Turkey" },
  },
} as const;
