export type ResearchItem = {
  id: string;
  sponsor: string;
  featured: boolean;
  statusColor: "green" | "cyan" | "orange";
  tr: { title: string; area: string; methodology: string; outcome: string };
  en: { title: string; area: string; methodology: string; outcome: string };
  stack: string[];
  meta: { key: string; val: string; color?: string }[];
};

export const researchData: ResearchItem[] = [
  {
    id: "tubitak-2209a",
    sponsor: "TÜBİTAK 2209-A",
    featured: true,
    statusColor: "green",
    tr: {
      title: "Tıbbi Görüntü Sınıflandırması",
      area: "Derin Öğrenme · Tıbbi Görüntü Analizi",
      methodology:
        "CNN mimarileri kullanarak beyin MRI görüntülerinde tümör tespiti. Veri augmentasyonu ve dropout katmanları ile model genelleme kapasitesi artırıldı. Precision, recall ve F1-score ile kapsamlı değerlendirme.",
      outcome:
        "Yüksek doğrulukla tümörlü / tümörsüz MRI sınıflandırması. Uçtan uca tıbbi görüntü işleme pipeline'ı kuruldu.",
    },
    en: {
      title: "Medical Image Classification",
      area: "Deep Learning · Medical Image Analysis",
      methodology:
        "Brain MRI tumor detection using CNN architectures. Data augmentation and dropout layers increased generalization capacity. Evaluated via precision, recall, and F1-score.",
      outcome:
        "High-accuracy tumor / non-tumor MRI classification. End-to-end medical imaging pipeline established.",
    },
    stack: ["Python", "TensorFlow", "Keras", "OpenCV", "CNN", "NumPy"],
    meta: [
      { key: "Grant",  val: "2209-A",    color: "var(--orange)" },
      { key: "Domain", val: "Medical AI"                        },
      { key: "Status", val: "Active",    color: "var(--green)"  },
    ],
  },
  {
    id: "teknofest",
    sponsor: "Teknofest Sağlık Teknolojileri",
    featured: false,
    statusColor: "cyan",
    tr: {
      title: "Onkoloji Görüntü Analizi",
      area: "Bilgisayarlı Görü · Sağlık Teknolojileri",
      methodology:
        "PyTorch ve CNN mimarileriyle derin öğrenme tabanlı onkoloji veri analizi. DICOM formatında tıbbi görüntü işleme ve özellik çıkarımı.",
      outcome:
        "Yarışma değerlendirmesinde 88/100 puan. Sınıflandırma ve özellik çıkarımında yüksek başarım.",
    },
    en: {
      title: "Oncology Image Analysis",
      area: "Computer Vision · Health Technologies",
      methodology:
        "Deep learning-based oncology data analysis using PyTorch and CNN architectures. Medical image processing in DICOM format with feature extraction.",
      outcome:
        "Scored 88/100 in competitive evaluation. High performance in classification and feature extraction.",
    },
    stack: ["Python", "PyTorch", "DICOM", "OpenCV", "NumPy"],
    meta: [
      { key: "Score",  val: "88/100",     color: "var(--cyan)"   },
      { key: "Domain", val: "Oncology"                           },
      { key: "Type",   val: "Competition", color: "var(--orange)" },
    ],
  },
];
