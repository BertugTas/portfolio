---
title: "Dijital Medya İş Akışları İçin LLM Araştırması"
slug: "llm-digital-media-research"
category: "research"
date: "2026-05-22"
excerpt: "Mevcut TÜBİTAK araştırmamın arkasındaki teknik motivasyonlara ve bu çalışmayı başlatmaya iten açık sorulara bir bakış."
tags: ["LLM", "Araştırma", "TÜBİTAK", "Dijital Medya", "NLP"]
---

## Aslında ne araştırıyorum

TÜBİTAK 2209-A hibesi lisans araştırmalarını finanse ediyor ve benimki dijital medya iş akışları için LLM tabanlı içerik hatları üzerine. Kısa versiyon: çoğu haber odası ve medya üretim hattı metni hâlâ opak olarak ele alır, insanlar tarafından dönüştürülür ve aşağıya teslim edilir. Editöryal kaliteyi düşürmeden hat ortasındaki LLM ajanlarının belirli insan adımlarını değiştirip değiştiremeyeceğini test ediyoruz.

Hedeflediğimiz üç adım:

1. **Kaynak kümeleme** — gelen basın bültenleri akışında, bir insan editör görmeden önce altta yatan hikayeye göre gruplamak.
2. **Başlık varyant üretimi** — her makale için farklı dağıtım kanalları (RSS, sosyal, push) için optimize edilmiş 5-8 başlık adayı üretmek.
3. **Diller arası özet hizalama** — aynı hikaye TR ve EN'de yayınlandığında, özetlerin sadece yapısal olarak değil olgusal olarak da eşleştiğini doğrulamak.

## Neden bu sadece "GPT-4'e yaptırmak" değil

Genel LLM API'leri her üç görevde de tek başına yetkindir. İlginç araştırma sorusu, ajan adımları arasındaki **sınırda** ne olduğudur — özellikle her adım deterministik olmadığında yukarı akış hatalarının nasıl yayıldığı.

Kaynak kümeleme iki ilgisiz hikayeyi aynı gruba koyarsa, aşağıdaki her eser bu hatayı miras alır ve büyütür. Standart değerlendirme metrikleri (BLEU, ROUGE, semantik benzerlik) her adımı bağımsız olarak ölçer ve bileşik başarısızlık modunu kaçırır.

Peşinde olduğum araştırma yönü: hattı uçtan uca ground-truth editöryal sonuca karşı puanlayan **hata koşullu değerlendirme paketleri** kurabilir miyiz, adım başına token benzerliğine karşı değil?

## Bugün neredeyim

İlk prototipi yerel olarak çalışan küçük bir 7B açık ağırlık modeliyle kurdum. Üç adımlı zincirdeki bileşik hata oranı şu anda %14 — yani yedi makale partisinden yaklaşık birinde, bir insan editörün yakalayacağı en az bir sınır hatası var.

Bunu kullanışlı diyebilmem için %3'ün altına düşmesi gerekiyor. Kalan hatanın çoğu adım 1'den (kümeleme) geliyor gibi görünüyor, adım 2 veya 3'ten değil; bu da kendi başına yararlı bir bulgu.

## Sırada ne var

Aynı hata koşullu değerlendirme paketi ile üç model boyutu (7B / 13B / 70B) arasında daha büyük karşılaştırmalı bir çalıştırma. Bileşik hata oranının model boyutu ile doğrusal olarak ölçeklenip ölçeklenmediğini veya bir yerde faz geçişi olup olmadığını bilmek istiyorum.
