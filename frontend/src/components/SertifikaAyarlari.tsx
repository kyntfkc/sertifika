import { useState, useEffect } from 'react';
import { Save, RotateCcw } from 'lucide-react';
import { SertifikaAyarlari as SertifikaAyarlariType } from '../types';
import { getSertifikaAyarlari, saveSertifikaAyarlari, varsayilanAyarlar } from '../utils/sertifikaAyarlari';

function SertifikaAyarlari() {
  const [ayarlar, setAyarlar] = useState<SertifikaAyarlariType>(varsayilanAyarlar);
  const [kaydedildi, setKaydedildi] = useState(false);

  useEffect(() => {
    setAyarlar(getSertifikaAyarlari());
  }, []);

  const handleAyarlarDegistir = (key: keyof SertifikaAyarlariType, value: string) => {
    setAyarlar(prev => ({ ...prev, [key]: value }));
    setKaydedildi(false);
  };

  const handleKaydet = () => {
    saveSertifikaAyarlari(ayarlar);
    setKaydedildi(true);
    setTimeout(() => setKaydedildi(false), 2000);
  };

  const handleSifirla = () => {
    setAyarlar(varsayilanAyarlar);
    localStorage.removeItem('sertifikaAyarlari');
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-xl border border-slate-200/60 p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-slate-800">Sertifika Ayarları</h2>
        <div className="flex gap-2">
          <button
            onClick={handleSifirla}
            className="flex items-center px-3 py-2 bg-gradient-to-r from-slate-600 to-slate-700 text-white rounded-lg hover:shadow-lg transition-all font-medium text-sm"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Varsayılana Dön
          </button>
          <button
            onClick={handleKaydet}
            className="flex items-center px-3 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all font-medium text-sm"
          >
            <Save className="w-4 h-4 mr-2" />
            Kaydet
          </button>
        </div>
      </div>

      {kaydedildi && (
        <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 text-green-700 rounded-xl shadow-sm">
          ✅ Ayarlar başarıyla kaydedildi!
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Sayfa Ayarları */}
        <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-slate-200/60">
          <h3 className="text-base font-semibold mb-3 text-slate-800">Sayfa</h3>
          <div className="space-y-2.5">
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Genişlik (cm)</label>
              <input
                type="number"
                step="0.1"
                value={ayarlar.sayfaGenislik}
                onChange={(e) => handleAyarlarDegistir('sayfaGenislik', e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Yükseklik (cm)</label>
              <input
                type="number"
                step="0.1"
                value={ayarlar.sayfaYukseklik}
                onChange={(e) => handleAyarlarDegistir('sayfaYukseklik', e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Padding (cm)</label>
              <input
                type="number"
                step="0.1"
                value={ayarlar.genelPadding}
                onChange={(e) => handleAyarlarDegistir('genelPadding', e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Fotoğraf Ayarları */}
        <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-slate-200/60">
          <h3 className="text-base font-semibold mb-3 text-slate-800">Fotoğraf</h3>
          <div className="space-y-2.5">
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Konum</label>
              <select
                value={ayarlar.fotoğrafKonumu}
                onChange={(e) => handleAyarlarDegistir('fotoğrafKonumu', e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="sol-ust">Sol Üst</option>
                <option value="sol-alt">Sol Alt</option>
                <option value="sag-ust">Sağ Üst</option>
                <option value="sag-alt">Sağ Alt</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Genişlik (cm)</label>
              <input
                type="number"
                step="0.1"
                value={ayarlar.fotoğrafGenislik}
                onChange={(e) => handleAyarlarDegistir('fotoğrafGenislik', e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Yükseklik (cm)</label>
              <input
                type="number"
                step="0.1"
                value={ayarlar.fotoğrafYukseklik}
                onChange={(e) => handleAyarlarDegistir('fotoğrafYukseklik', e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Sol Bölüm Ayarları */}
        <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-slate-200/60">
          <h3 className="text-base font-semibold mb-3 text-slate-800">Sol Bölüm</h3>
          <div className="space-y-2.5">
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Hizalama</label>
              <select
                value={ayarlar.solBölümHizalama}
                onChange={(e) => handleAyarlarDegistir('solBölümHizalama', e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="sol">Sol</option>
                <option value="orta">Orta</option>
                <option value="sag">Sağ</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Padding (cm)</label>
              <input
                type="number"
                step="0.1"
                value={ayarlar.solBölümPadding}
                onChange={(e) => handleAyarlarDegistir('solBölümPadding', e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Ürün Adı Font (pt)</label>
              <input
                type="number"
                step="0.5"
                value={ayarlar.ürünAdıFontBoyutu}
                onChange={(e) => handleAyarlarDegistir('ürünAdıFontBoyutu', e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Kodu Font (pt)</label>
              <input
                type="number"
                step="0.5"
                value={ayarlar.ürünKoduFontBoyutu}
                onChange={(e) => handleAyarlarDegistir('ürünKoduFontBoyutu', e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Altın Font (pt)</label>
              <input
                type="number"
                step="0.5"
                value={ayarlar.altınAyarıFontBoyutu}
                onChange={(e) => handleAyarlarDegistir('altınAyarıFontBoyutu', e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Sağ Bölüm Ayarları */}
        <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-slate-200/60">
          <h3 className="text-base font-semibold mb-3 text-slate-800">Sağ Bölüm</h3>
          <div className="space-y-2.5">
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Hizalama</label>
              <select
                value={ayarlar.sagBölümHizalama}
                onChange={(e) => handleAyarlarDegistir('sagBölümHizalama', e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="sol">Sol</option>
                <option value="orta">Orta</option>
                <option value="sag">Sağ</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Padding (cm)</label>
              <input
                type="number"
                step="0.1"
                value={ayarlar.sagBölümPadding}
                onChange={(e) => handleAyarlarDegistir('sagBölümPadding', e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Müşteri Font (pt)</label>
              <input
                type="number"
                step="0.5"
                value={ayarlar.müşteriBilgisiFontBoyutu}
                onChange={(e) => handleAyarlarDegistir('müşteriBilgisiFontBoyutu', e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Satır Aralığı (cm)</label>
              <input
                type="number"
                step="0.1"
                value={ayarlar.bilgiSatırAraligi}
                onChange={(e) => handleAyarlarDegistir('bilgiSatırAraligi', e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Pozisyon Ayarları */}
      <div className="mt-6 bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-slate-200/60">
        <h3 className="text-base font-semibold mb-2 text-slate-800">Pozisyon Ayarları (cm)</h3>
        <p className="text-xs text-slate-600 mb-4">Her elementin pozisyonunu cm cinsinden ayarlayın. Sol üst köşe (0,0).</p>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
          {/* Fotoğraf */}
          <div className="bg-slate-50 p-3 rounded border border-slate-200">
            <h4 className="text-xs font-semibold text-slate-700 mb-2">Fotoğraf</h4>
            <div className="space-y-2">
              <div>
                <label className="block text-xs text-slate-600 mb-1">Yatay (cm)</label>
                <input type="number" step="0.1" value={ayarlar.fotoğrafX || ''} onChange={(e) => handleAyarlarDegistir('fotoğrafX', e.target.value)} className="w-full px-2 py-1.5 text-xs border border-slate-300 rounded" />
              </div>
              <div>
                <label className="block text-xs text-slate-600 mb-1">Dikey (cm)</label>
                <input type="number" step="0.1" value={ayarlar.fotoğrafY || ''} onChange={(e) => handleAyarlarDegistir('fotoğrafY', e.target.value)} className="w-full px-2 py-1.5 text-xs border border-slate-300 rounded" />
              </div>
            </div>
          </div>
          {/* Ürün Adı */}
          <div className="bg-slate-50 p-3 rounded border border-slate-200">
            <h4 className="text-xs font-semibold text-slate-700 mb-2">Ürün Adı</h4>
            <div className="space-y-2">
              <div>
                <label className="block text-xs text-slate-600 mb-1">Yatay (cm)</label>
                <input type="number" step="0.1" value={ayarlar.ürünAdıX || ''} onChange={(e) => handleAyarlarDegistir('ürünAdıX', e.target.value)} className="w-full px-2 py-1.5 text-xs border border-slate-300 rounded" />
              </div>
              <div>
                <label className="block text-xs text-slate-600 mb-1">Dikey (cm)</label>
                <input type="number" step="0.1" value={ayarlar.ürünAdıY || ''} onChange={(e) => handleAyarlarDegistir('ürünAdıY', e.target.value)} className="w-full px-2 py-1.5 text-xs border border-slate-300 rounded" />
              </div>
            </div>
          </div>
          {/* Model Kodu */}
          <div className="bg-slate-50 p-3 rounded border border-slate-200">
            <h4 className="text-xs font-semibold text-slate-700 mb-2">Model Kodu</h4>
            <div className="space-y-2">
              <div>
                <label className="block text-xs text-slate-600 mb-1">Yatay (cm)</label>
                <input type="number" step="0.1" value={ayarlar.ürünKoduX || ''} onChange={(e) => handleAyarlarDegistir('ürünKoduX', e.target.value)} className="w-full px-2 py-1.5 text-xs border border-slate-300 rounded" />
              </div>
              <div>
                <label className="block text-xs text-slate-600 mb-1">Dikey (cm)</label>
                <input type="number" step="0.1" value={ayarlar.ürünKoduY || ''} onChange={(e) => handleAyarlarDegistir('ürünKoduY', e.target.value)} className="w-full px-2 py-1.5 text-xs border border-slate-300 rounded" />
              </div>
            </div>
          </div>
          {/* Altın */}
          <div className="bg-slate-50 p-3 rounded border border-slate-200">
            <h4 className="text-xs font-semibold text-slate-700 mb-2">Altın</h4>
            <div className="space-y-2">
              <div>
                <label className="block text-xs text-slate-600 mb-1">Yatay (cm)</label>
                <input type="number" step="0.1" value={ayarlar.altınAyarıX || ''} onChange={(e) => handleAyarlarDegistir('altınAyarıX', e.target.value)} className="w-full px-2 py-1.5 text-xs border border-slate-300 rounded" />
              </div>
              <div>
                <label className="block text-xs text-slate-600 mb-1">Dikey (cm)</label>
                <input type="number" step="0.1" value={ayarlar.altınAyarıY || ''} onChange={(e) => handleAyarlarDegistir('altınAyarıY', e.target.value)} className="w-full px-2 py-1.5 text-xs border border-slate-300 rounded" />
              </div>
            </div>
          </div>
          {/* Alıcı */}
          <div className="bg-slate-50 p-3 rounded border border-slate-200">
            <h4 className="text-xs font-semibold text-slate-700 mb-2">Alıcı</h4>
            <div className="space-y-2">
              <div>
                <label className="block text-xs text-slate-600 mb-1">Yatay (cm)</label>
                <input type="number" step="0.1" value={ayarlar.müşteriAdıX || ''} onChange={(e) => handleAyarlarDegistir('müşteriAdıX', e.target.value)} className="w-full px-2 py-1.5 text-xs border border-slate-300 rounded" />
              </div>
              <div>
                <label className="block text-xs text-slate-600 mb-1">Dikey (cm)</label>
                <input type="number" step="0.1" value={ayarlar.müşteriAdıY || ''} onChange={(e) => handleAyarlarDegistir('müşteriAdıY', e.target.value)} className="w-full px-2 py-1.5 text-xs border border-slate-300 rounded" />
              </div>
            </div>
          </div>
          {/* Tarih */}
          <div className="bg-slate-50 p-3 rounded border border-slate-200">
            <h4 className="text-xs font-semibold text-slate-700 mb-2">Tarih</h4>
            <div className="space-y-2">
              <div>
                <label className="block text-xs text-slate-600 mb-1">Yatay (cm)</label>
                <input type="number" step="0.1" value={ayarlar.siparişTarihiX || ''} onChange={(e) => handleAyarlarDegistir('siparişTarihiX', e.target.value)} className="w-full px-2 py-1.5 text-xs border border-slate-300 rounded" />
              </div>
              <div>
                <label className="block text-xs text-slate-600 mb-1">Dikey (cm)</label>
                <input type="number" step="0.1" value={ayarlar.siparişTarihiY || ''} onChange={(e) => handleAyarlarDegistir('siparişTarihiY', e.target.value)} className="w-full px-2 py-1.5 text-xs border border-slate-300 rounded" />
              </div>
            </div>
          </div>
          {/* Platform */}
          <div className="bg-slate-50 p-3 rounded border border-slate-200">
            <h4 className="text-xs font-semibold text-slate-700 mb-2">Platform</h4>
            <div className="space-y-2">
              <div>
                <label className="block text-xs text-slate-600 mb-1">Yatay (cm)</label>
                <input type="number" step="0.1" value={ayarlar.platformX || ''} onChange={(e) => handleAyarlarDegistir('platformX', e.target.value)} className="w-full px-2 py-1.5 text-xs border border-slate-300 rounded" />
              </div>
              <div>
                <label className="block text-xs text-slate-600 mb-1">Dikey (cm)</label>
                <input type="number" step="0.1" value={ayarlar.platformY || ''} onChange={(e) => handleAyarlarDegistir('platformY', e.target.value)} className="w-full px-2 py-1.5 text-xs border border-slate-300 rounded" />
              </div>
            </div>
          </div>
          {/* Sipariş No */}
          <div className="bg-slate-50 p-3 rounded border border-slate-200">
            <h4 className="text-xs font-semibold text-slate-700 mb-2">Sipariş No</h4>
            <div className="space-y-2">
              <div>
                <label className="block text-xs text-slate-600 mb-1">Yatay (cm)</label>
                <input type="number" step="0.1" value={ayarlar.siparişNoX || ''} onChange={(e) => handleAyarlarDegistir('siparişNoX', e.target.value)} className="w-full px-2 py-1.5 text-xs border border-slate-300 rounded" />
              </div>
              <div>
                <label className="block text-xs text-slate-600 mb-1">Dikey (cm)</label>
                <input type="number" step="0.1" value={ayarlar.siparişNoY || ''} onChange={(e) => handleAyarlarDegistir('siparişNoY', e.target.value)} className="w-full px-2 py-1.5 text-xs border border-slate-300 rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SertifikaAyarlari;
