# Sertifika Yazdırma Sistemi - Kullanım Kılavuzu

## Kurulum

### 1. Backend Kurulumu

```bash
# Backend klasörüne git
cd backend

# Bağımlılıkları yükle
npm install

# .env dosyası oluştur
# Windows PowerShell:
New-Item -Path .env -ItemType File

# .env dosyasına şunları ekle:
# PORT=3001
# DATABASE_URL=postgresql://user:password@localhost:5432/sertifika_db
# CORS_ORIGIN=http://localhost:5173
# NODE_ENV=development
```

**Not:** PostgreSQL veritabanınızın çalıştığından ve `DATABASE_URL`'in doğru olduğundan emin olun.

### 2. Veritabanı Migration

```bash
# Backend klasöründeyken
npm run migrate
```

Bu komut `urunler` tablosunu oluşturur.

### 3. Frontend Kurulumu

```bash
# Ana klasöre dön
cd ..

# Frontend klasörüne git
cd frontend

# Bağımlılıkları yükle
npm install
```

## Çalıştırma

### 1. Backend'i Başlat

```bash
# Backend klasöründeyken
cd backend
npm run dev
```

Backend `http://localhost:3001` adresinde çalışacak.

### 2. Frontend'i Başlat (Yeni Terminal)

```bash
# Frontend klasöründeyken
cd frontend
npm run dev
```

Frontend `http://localhost:5173` (veya başka bir port) adresinde çalışacak.

## Kullanım

### 1. Sertifika Yazdırma

1. Tarayıcıda `http://localhost:5173` adresine git
2. "Sertifika Yazdır" sekmesine tıkla
3. Formu doldur:
   - Ürün bilgileri (ürün adı, kodu, altın ayarı)
   - Müşteri bilgileri (müşteri adı, sipariş tarihi, platform, sipariş no)
   - Ürün fotoğrafı URL'si (opsiyonel)
4. "Sertifikayı Yazdır" butonuna tıkla
5. Yazdırma penceresi açılacak

### 2. Ürün Kaydetme ve Yönetimi

1. "Ürünler" sekmesine tıkla
2. **Yeni Ürün Ekle:**
   - "Yeni Ürün" butonuna tıkla
   - Formu doldur
   - Görsel yükleme:
     - **URL ile:** URL kutusuna görsel linkini yapıştır
     - **Dosya ile:** "Dosya Seç" butonuna tıklayıp bilgisayarından görsel seç (JPEG, PNG, WebP, max 5MB)
   - "Kaydet" butonuna tıkla

3. **Ürün Listesi:**
   - Tüm kaydedilen ürünler kart görünümünde listelenir
   - Arama kutusuna yazarak ürün, müşteri, sipariş no veya platform ile arama yapabilirsiniz

4. **Ürün Düzenleme:**
   - Ürün kartındaki "Düzenle" (kalem) ikonuna tıkla
   - Formu düzenle
   - "Kaydet" butonuna tıkla

5. **Ürün Silme:**
   - Ürün kartındaki "Sil" (çöp kutusu) ikonuna tıkla
   - Onay ver

6. **Kaydedilen Ürünlerden Sertifika Yazdırma:**
   - Ürün kartındaki "Yazdır" (yazıcı) ikonuna tıkla
   - Sertifika yazdırma penceresi açılacak

### 3. Ayarlar

1. "Ayarlar" sekmesine tıkla
2. Sertifika tasarım ayarlarını düzenle:
   - Sayfa boyutları
   - Font boyutları
   - Element pozisyonları (cm cinsinden)
3. "Kaydet" butonuna tıkla
4. Ayarlar LocalStorage'da saklanır

## Özellikler

- ✅ Ürün bilgilerini kaydetme
- ✅ Görsel yükleme (URL veya dosya)
- ✅ Ürün listesi ve arama
- ✅ Ürün düzenleme ve silme
- ✅ Kaydedilen ürünlerden sertifika yazdırma
- ✅ Sertifika tasarım ayarları
- ✅ PostgreSQL veritabanında veri saklama

## Sorun Giderme

### Backend başlamıyor
- PostgreSQL'in çalıştığından emin olun
- `.env` dosyasındaki `DATABASE_URL`'in doğru olduğundan emin olun
- Port 3001'in kullanılabilir olduğundan emin olun

### Frontend API'ye bağlanamıyor
- Backend'in çalıştığından emin olun
- Frontend'de `.env` dosyası oluşturup `VITE_API_URL=http://localhost:3001` ekleyin

### Görsel yüklenmiyor
- Dosya formatının JPEG, PNG veya WebP olduğundan emin olun
- Dosya boyutunun 5MB'dan küçük olduğundan emin olun
- Backend'in `uploads/` klasörüne yazma izni olduğundan emin olun
