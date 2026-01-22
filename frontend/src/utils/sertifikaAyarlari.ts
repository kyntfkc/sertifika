import { SertifikaAyarlari } from '../types';

export const varsayilanAyarlar: SertifikaAyarlari = {
  fotoğrafKonumu: 'sol-ust',
  fotoğrafGenislik: '3.5',
  fotoğrafYukseklik: '3.5',
  solBölümHizalama: 'orta',
  solBölümPadding: '0.3',
  ürünAdıFontBoyutu: '9',
  ürünKoduFontBoyutu: '9',
  altınAyarıFontBoyutu: '9',
  sagBölümHizalama: 'sol',
  sagBölümPadding: '0.3',
  müşteriBilgisiFontBoyutu: '9',
  bilgiSatırAraligi: '0.4',
  sayfaGenislik: '15',
  sayfaYukseklik: '11',
  genelPadding: '0.5',
  fotoğrafX: '0.8',
  fotoğrafY: '0.5',
  ürünAdıX: '0.8',
  ürünAdıY: '4.5',
  ürünKoduX: '0.8',
  ürünKoduY: '5.2',
  altınAyarıX: '0.8',
  altınAyarıY: '5.9',
  müşteriAdıX: '8.3',
  müşteriAdıY: '0.8',
  siparişTarihiX: '8.3',
  siparişTarihiY: '1.6',
  platformX: '8.3',
  platformY: '2.4',
  siparişNoX: '8.3',
  siparişNoY: '3.2',
};

export function getSertifikaAyarlari(): SertifikaAyarlari {
  const kaydedilmisAyarlar = localStorage.getItem('sertifikaAyarlari');
  if (kaydedilmisAyarlar) {
    try {
      const parsed = JSON.parse(kaydedilmisAyarlar);
      return { ...varsayilanAyarlar, ...parsed };
    } catch (error) {
      console.error('Ayarlar yüklenemedi:', error);
    }
  }
  return varsayilanAyarlar;
}

export function saveSertifikaAyarlari(ayarlar: SertifikaAyarlari): void {
  localStorage.setItem('sertifikaAyarlari', JSON.stringify(ayarlar));
}
