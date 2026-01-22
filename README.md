# Sertifika Yazdırma Sistemi

Bağımsız sertifika yazdırma uygulaması. Altın sertifikalarınızı kolayca oluşturup yazdırabilirsiniz.

## 📍 Konum

Bu uygulama bağımsız bir projedir ve `D:\cursor\sertifika-yazdirma` klasöründe bulunmaktadır.

## Özellikler

- 📝 Sertifika formu ile kolay veri girişi
- 🎨 Özelleştirilebilir sertifika ayarları
- 📄 Hassas pozisyon ayarları (cm cinsinden)
- 🖨️ Doğrudan yazdırma desteği
- 💾 LocalStorage ile ayar kaydetme

## Kurulum

### Gereksinimler

- Node.js 18+ 
- npm veya yarn

### Adımlar

1. Proje klasörüne gidin:
```bash
cd D:\cursor\sertifika-yazdirma\frontend
```

2. Bağımlılıkları yükleyin:
```bash
npm install
```

3. Geliştirme sunucusunu başlatın:
```bash
npm run dev
```

Uygulama http://localhost:5174 adresinde çalışacak.

### Production Build

```bash
npm run build
```

Build edilmiş dosyalar `dist` klasöründe oluşturulacak.

## Kullanım

1. **Sertifika Yazdır** sekmesinden:
   - Ürün bilgilerini girin
   - Müşteri bilgilerini girin
   - "Sertifikayı Yazdır" butonuna tıklayın

2. **Ayarlar** sekmesinden:
   - Sayfa boyutlarını ayarlayın
   - Font boyutlarını düzenleyin
   - Element pozisyonlarını cm cinsinden ayarlayın
   - "Kaydet" butonuna tıklayın

## Teknolojiler

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Lucide React (İkonlar)
