import { SertifikaAyarlari } from '../types';

export const varsayilanAyarlar: SertifikaAyarlari = {
  fotoğrafKonumu: 'sol-ust',
  fotoğrafGenislik: '5',
  fotoğrafYukseklik: '5',
  solBölümHizalama: 'sol',
  solBölümPadding: '0',
  ürünAdıFontBoyutu: '9',
  ürünKoduFontBoyutu: '9',
  altınAyarıFontBoyutu: '9',
  sagBölümHizalama: 'sol',
  sagBölümPadding: '0',
  müşteriBilgisiFontBoyutu: '9',
  bilgiSatırAraligi: '0.4',
  sayfaGenislik: '15',
  sayfaYukseklik: '11',
  genelPadding: '0',
  fotoğrafX: '1.6',
  fotoğrafY: '1.2',
  ürünAdıX: '3.1',
  ürünAdıY: '5.4',
  ürünKoduX: '3.1',
  ürünKoduY: '6.1',
  altınAyarıX: '3.1',
  altınAyarıY: '6.7',
  müşteriAdıX: '11.5',
  müşteriAdıY: '2.4',
  siparişTarihiX: '11.5',
  siparişTarihiY: '3.1',
  platformX: '11.5',
  platformY: '3.8',
  siparişNoX: '11.5',
  siparişNoY: '4.5',
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
