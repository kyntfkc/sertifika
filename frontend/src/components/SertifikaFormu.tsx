import { useState } from 'react';
import { Printer } from 'lucide-react';
import { SertifikaData } from '../types';
import { yazdirSertifika } from '../utils/sertifikaYazdir';

function SertifikaFormu() {
  const [formData, setFormData] = useState<SertifikaData>({
    urunAdi: '',
    urunKodu: '',
    altinAyari: '14 Ayar Altın',
    musteriAdi: '',
    siparisTarihi: new Date().toLocaleDateString('tr-TR'),
    platform: 'Trendyol',
    siparisNo: '',
    urunResmi: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    yazdirSertifika(formData);
  };

  const handleChange = (field: keyof SertifikaData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-xl border border-slate-200/60 p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Sol Kolon */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Ürün Bilgileri</h3>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Ürün Adı *
              </label>
              <input
                type="text"
                required
                value={formData.urunAdi}
                onChange={(e) => handleChange('urunAdi', e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Örn: Küpe, Yüzük"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Ürün Kodu
              </label>
              <input
                type="text"
                value={formData.urunKodu}
                onChange={(e) => handleChange('urunKodu', e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Opsiyonel"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Altın Ayarı *
              </label>
              <select
                required
                value={formData.altinAyari}
                onChange={(e) => handleChange('altinAyari', e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="14 Ayar Altın">14 Ayar Altın</option>
                <option value="18 Ayar Altın">18 Ayar Altın</option>
                <option value="22 Ayar Altın">22 Ayar Altın</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Ürün Fotoğrafı URL
              </label>
              <input
                type="url"
                value={formData.urunResmi}
                onChange={(e) => handleChange('urunResmi', e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="https://..."
              />
            </div>
          </div>

          {/* Sağ Kolon */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Müşteri Bilgileri</h3>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Müşteri Adı *
              </label>
              <input
                type="text"
                required
                value={formData.musteriAdi}
                onChange={(e) => handleChange('musteriAdi', e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Müşteri adı soyadı"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Sipariş Tarihi *
              </label>
              <input
                type="text"
                required
                value={formData.siparisTarihi}
                onChange={(e) => handleChange('siparisTarihi', e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="GG.AA.YYYY"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Platform *
              </label>
              <select
                required
                value={formData.platform}
                onChange={(e) => handleChange('platform', e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="Trendyol">Trendyol</option>
                <option value="indigotaki.com">indigotaki.com</option>
                <option value="Diğer">Diğer</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Sipariş No *
              </label>
              <input
                type="text"
                required
                value={formData.siparisNo}
                onChange={(e) => handleChange('siparisNo', e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Sipariş numarası"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-slate-200">
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:shadow-lg hover:scale-105 active:scale-95 transition-all font-semibold"
          >
            <Printer className="w-5 h-5" />
            Sertifikayı Yazdır
          </button>
        </div>
      </form>
    </div>
  );
}

export default SertifikaFormu;
