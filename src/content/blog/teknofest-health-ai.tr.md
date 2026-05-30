---
title: "Teknofest İçin Tıbbi Yapay Zeka: 88/100"
slug: "teknofest-health-ai"
category: "experiences"
date: "2026-04-18"
excerpt: "Teknofest Sağlık Teknolojileri yarışması için CNN tabanlı bir onkoloji sınıflandırıcısını nasıl tasarladık ve 88/100 puanı gerçek dünya tıbbi yapay zeka değerlendirmesi hakkında bize neler öğretti."
tags: ["Tıbbi YZ", "PyTorch", "CNN", "Teknofest", "Yarışma"]
featured: true
---

## Yarışmanın özeti

Teknofest Sağlık Teknolojileri, takımlardan sadece bir not defterinde benchmark elde etmesini değil, gerçekten dağıtılabilir tıbbi yapay zeka sistemleri kurmasını istiyor — bir klinisyenin gerçekten bakabileceği bir şey. Takımımız histopatoloji slaytlarından onkoloji sınıflandırmasını seçti. Kulağa cazip geliyor; ta ki veri setinin, çoğu kayıp eğrisini ağlatacak kadar dengesiz sınıflara sahip gigabaytlarca WSI parçası halinde geldiğini fark edene kadar.

Altı haftamız vardı.

## Sonunda kullandığımız CNN

Bariz olanla başladık: ImageNet üzerinde önceden eğitilmiş bir ResNet50, ilk iki epoch için donduruldu, sonra düşük öğrenme oranıyla çözüldü. Doğrulama dilimi üzerinde iyi çalıştı. Tutulan test seti üzerinde pek iyi çalışmadı.

Gerçekten iğneyi hareket ettiren şey:

1. **Augmentasyondan önce boyama normalizasyonu.** H&E slaytları laboratuvardan laboratuvara değişir ve augmentasyon hattı bu varyansı iptal etmek yerine artırıyordu.
2. **Sınıf ağırlıklı alpha ile özel focal loss.** Malign sınıf eğitim verisinin %11'iydi. Standart cross-entropy sonsuza kadar "benign" tahmin etmekten mutluydu.
3. **Çıkarımda test-time augmentation.** Dört rotasyon + yatay flip, ortalama alındı. Bize yaklaşık 1.8 puan F1 kazandırdı.

```python
# Sınıf ağırlıklı özel focal loss
class WeightedFocalLoss(nn.Module):
    def __init__(self, alpha=0.75, gamma=2.0):
        super().__init__()
        self.alpha = alpha
        self.gamma = gamma

    def forward(self, logits, targets):
        ce = F.cross_entropy(logits, targets, reduction="none")
        pt = torch.exp(-ce)
        focal = self.alpha * (1 - pt) ** self.gamma * ce
        return focal.mean()
```

## 88/100 ne anlama gelir

Jüri dört boyutta puan verdi: tutulan set üzerinde doğruluk, çıkarım gecikmesi, model kartı tamlığı ve yazmamız gereken klinik akıl yürütme rubriği.

Klinik akıl yürütme bölümünde puan kaybettik — ve haklı olarak. SHAP açıklamalarımız teknik olarak doğru görünüyordu ama paneldeki patoloğa anlamsız geliyordu. Sunumdan iki hafta önce Grad-CAM'e geçmiştik ve görselleştirmeleri ground-truth annotasyonlarına karşı doğrulamak için zamanımız kalmamıştı.

Doğruluk puanı güçlüydü. Klinik anlatı değildi. 88/100'ün gerçekten ölçtüğü boşluk bu.

## Farklı yapacağım şey

Klinik yorumlanabilirlik katmanını **önce** kur, sonra değil. Model kolay kısım. Bir doktorun güveneceği eser zor kısım — ve son sprintte üzerine yapıştıramazsın.
