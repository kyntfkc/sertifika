export interface SertifikaData {
  urunAdi: string;
  urunKodu?: string;
  altinAyari: string;
  musteriAdi: string;
  siparisTarihi: string;
  platform: string;
  siparisNo: string;
  urunResmi?: string;
}

export interface Urun {
  id: string;
  urun_adi: string;
  urun_kodu: string;
  altin_ayari: string;
  musteri_adi?: string;
  siparis_tarihi?: string;
  platform?: string;
  siparis_no?: string;
  urun_resmi_url?: string;
  urun_resmi_dosya?: string;
  urun_resmi_base64?: string;
  created_at: string;
  updated_at: string;
}

export interface UrunFormData {
  urun_adi: string;
  urun_kodu: string;
  altin_ayari: string;
  urun_resmi_url?: string;
  urun_resmi_file?: File | null;
}

export interface SertifikaAyarlari {
  fotoğrafKonumu: 'sol-ust' | 'sol-alt' | 'sag-ust' | 'sag-alt';
  fotoğrafGenislik: string;
  fotoğrafYukseklik: string;
  solBölümHizalama: 'sol' | 'orta' | 'sag';
  solBölümPadding: string;
  ürünAdıFontBoyutu: string;
  ürünKoduFontBoyutu: string;
  altınAyarıFontBoyutu: string;
  sagBölümHizalama: 'sol' | 'orta' | 'sag';
  sagBölümPadding: string;
  müşteriBilgisiFontBoyutu: string;
  bilgiSatırAraligi: string;
  sayfaGenislik: string;
  sayfaYukseklik: string;
  genelPadding: string;
  fotoğrafX?: string;
  fotoğrafY?: string;
  ürünAdıX?: string;
  ürünAdıY?: string;
  ürünKoduX?: string;
  ürünKoduY?: string;
  altınAyarıX?: string;
  altınAyarıY?: string;
  müşteriAdıX?: string;
  müşteriAdıY?: string;
  siparişTarihiX?: string;
  siparişTarihiY?: string;
  platformX?: string;
  platformY?: string;
  siparişNoX?: string;
  siparişNoY?: string;
}
