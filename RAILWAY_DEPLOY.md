# Railway Backend Deploy Kılavuzu

Backend'i Railway'e deploy etmek için şu adımları izleyin:

## 1. Railway Web UI'dan Yeni Service Oluştur

1. https://railway.app adresine gidin
2. "sertifika-yazdirma" projesini açın
3. Sağ üstteki **"+ New"** butonuna tıklayın
4. **"Empty Service"** seçin
5. Service adını **"backend"** yapın

## 2. GitHub Repository Bağla

1. Yeni oluşturulan "backend" service'ine tıklayın
2. **"Settings"** sekmesine gidin
3. **"Source"** bölümünde **"Connect Repo"** butonuna tıklayın
4. GitHub repository'nizi seçin: `kyntfkc/sertifika`
5. **"Root Directory"** olarak `backend` yazın
6. Kaydedin

## 3. PostgreSQL Addon Ekle

1. Proje sayfasında **"+ New"** butonuna tıklayın
2. **"Database"** → **"Add PostgreSQL"** seçin
3. PostgreSQL addon otomatik olarak `DATABASE_URL` environment variable'ını ekleyecek

## 4. Environment Variables Ayarla

1. "backend" service'ine gidin
2. **"Variables"** sekmesine gidin
3. Şu variable'ları ekleyin:

```
CORS_ORIGIN=https://sertifika-yazdirma-production.up.railway.app
NODE_ENV=production
```

**Not:** `DATABASE_URL` PostgreSQL addon tarafından otomatik eklenir.

## 5. Deploy

1. Railway otomatik olarak deploy başlatacak
2. Deploy tamamlandığında backend URL'ini alın (örn: `https://backend-production.up.railway.app`)

## 6. Migration Çalıştır

Backend deploy olduktan sonra migration çalıştırın:

```bash
cd backend
railway link  # Backend service'ini link et
railway run npm run migrate
```

## 7. Frontend'i Güncelle

1. Frontend service'ine gidin
2. **"Variables"** sekmesine gidin
3. Şu variable'ı ekleyin:

```
VITE_API_URL=https://backend-production.up.railway.app
```

(Backend URL'inizi kullanın)

4. Frontend'i yeniden deploy edin (otomatik olabilir)

## 8. Test

1. Frontend URL'ine gidin: https://sertifika-yazdirma-production.up.railway.app
2. "Ürünler" sekmesine tıklayın
3. Yeni ürün eklemeyi deneyin
4. Backend API çalışıyorsa ürün kaydedilecektir

## Sorun Giderme

### Backend deploy olmuyor
- Root directory'nin `backend` olduğundan emin olun
- Build loglarını kontrol edin
- `package.json` ve `nixpacks.toml` dosyalarının backend klasöründe olduğundan emin olun

### Database connection hatası
- PostgreSQL addon'un eklendiğinden emin olun
- `DATABASE_URL` variable'ının otomatik eklendiğini kontrol edin
- Migration'ın çalıştırıldığından emin olun

### CORS hatası
- `CORS_ORIGIN` variable'ının frontend URL'i ile eşleştiğinden emin olun
- Frontend ve backend'in aynı Railway projesinde olduğundan emin olun
