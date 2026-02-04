import { useState, useEffect, useRef } from 'react';
import { Printer, Search } from 'lucide-react';
import { SertifikaData } from '../types';
import { yazdirSertifika } from '../utils/sertifikaYazdir';
import { getAllUrunler, getUrunResimUrl, type Urun } from '../services/api';

function SertifikaFormu() {
  const [formData, setFormData] = useState<SertifikaData>({
    urunAdi: '',
    urunKodu: '',
    altinAyari: '14 Ayar Altın',
    musteriAdi: '',
    siparisTarihi: new Date().toISOString().split('T')[0], // YYYY-MM-DD format for date input
    platform: 'Trendyol',
    siparisNo: '',
    urunResmi: '',
  });

  // Arama için state'ler
  const [allUrunler, setAllUrunler] = useState<Urun[]>([]);
  const [filteredUrunler, setFilteredUrunler] = useState<Urun[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeField, setActiveField] = useState<'urunAdi' | 'urunKodu' | null>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Ürünleri yükle
  useEffect(() => {
    const loadUrunler = async () => {
      try {
        const data = await getAllUrunler();
        setAllUrunler(data);
      } catch (err) {
        console.error('Ürünler yüklenemedi:', err);
      }
    };
    loadUrunler();
  }, []);

  // Dışarı tıklandığında dropdown'ı kapat
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Arama ve filtreleme
  const handleSearchChange = (field: 'urunAdi' | 'urunKodu', value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setActiveField(field);

    if (value.trim().length > 0) {
      const filtered = allUrunler.filter((u) => {
        if (field === 'urunAdi') {
          return u.urun_adi.toLowerCase().includes(value.toLowerCase());
        } else {
          return u.urun_kodu.toLowerCase().includes(value.toLowerCase());
        }
      });
      setFilteredUrunler(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setFilteredUrunler([]);
      setShowSuggestions(false);
    }
  };

  // Ürün seçildiğinde formu doldur
  const handleSelectUrun = (selectedUrun: Urun) => {
    const resimUrl = getUrunResimUrl(selectedUrun);
    setFormData({
      urunAdi: selectedUrun.urun_adi,
      urunKodu: selectedUrun.urun_kodu || '',
      altinAyari: selectedUrun.altin_ayari,
      musteriAdi: formData.musteriAdi, // Müşteri bilgilerini koru
      siparisTarihi: formData.siparisTarihi,
      platform: formData.platform,
      siparisNo: formData.siparisNo,
      urunResmi: resimUrl || '',
    });
    setShowSuggestions(false);
  };

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
            
            {/* Ürün Adı - Arama özellikli */}
            <div className="relative" ref={activeField === 'urunAdi' ? suggestionsRef : null}>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Ürün Adı * <span className="text-xs text-slate-500 font-normal">(Kayıtlı ürünlerden arayın)</span>
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  required
                  value={formData.urunAdi}
                  onChange={(e) => handleSearchChange('urunAdi', e.target.value)}
                  onFocus={() => {
                    if (formData.urunAdi.trim().length > 0) {
                      handleSearchChange('urunAdi', formData.urunAdi);
                    }
                  }}
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Ürün adı yazın veya arayın..."
                />
              </div>
              {/* Öneri listesi */}
              {showSuggestions && activeField === 'urunAdi' && filteredUrunler.length > 0 && (
                <div className="absolute z-50 w-full mt-1 bg-white border border-slate-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                  {filteredUrunler.map((u) => (
                    <button
                      key={u.id}
                      type="button"
                      onClick={() => handleSelectUrun(u)}
                      className="w-full px-4 py-3 text-left hover:bg-blue-50 flex items-center gap-3 border-b border-slate-100 last:border-b-0"
                    >
                      {getUrunResimUrl(u) ? (
                        <img src={getUrunResimUrl(u)!} alt="" className="w-10 h-10 object-cover rounded" />
                      ) : (
                        <div className="w-10 h-10 bg-slate-100 rounded flex items-center justify-center text-slate-400 text-xs">Resim</div>
                      )}
                      <div>
                        <div className="font-medium text-slate-800">{u.urun_adi}</div>
                        <div className="text-sm text-slate-500">Kod: {u.urun_kodu} • {u.altin_ayari}</div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Ürün Kodu - Arama özellikli */}
            <div className="relative" ref={activeField === 'urunKodu' ? suggestionsRef : null}>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Ürün Kodu * <span className="text-xs text-slate-500 font-normal">(Kayıtlı ürünlerden arayın)</span>
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  required
                  value={formData.urunKodu}
                  onChange={(e) => handleSearchChange('urunKodu', e.target.value)}
                  onFocus={() => {
                    if (formData.urunKodu && formData.urunKodu.trim().length > 0) {
                      handleSearchChange('urunKodu', formData.urunKodu);
                    }
                  }}
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Ürün kodu yazın veya arayın..."
                />
              </div>
              {/* Öneri listesi */}
              {showSuggestions && activeField === 'urunKodu' && filteredUrunler.length > 0 && (
                <div className="absolute z-50 w-full mt-1 bg-white border border-slate-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                  {filteredUrunler.map((u) => (
                    <button
                      key={u.id}
                      type="button"
                      onClick={() => handleSelectUrun(u)}
                      className="w-full px-4 py-3 text-left hover:bg-blue-50 flex items-center gap-3 border-b border-slate-100 last:border-b-0"
                    >
                      {getUrunResimUrl(u) ? (
                        <img src={getUrunResimUrl(u)!} alt="" className="w-10 h-10 object-cover rounded" />
                      ) : (
                        <div className="w-10 h-10 bg-slate-100 rounded flex items-center justify-center text-slate-400 text-xs">Resim</div>
                      )}
                      <div>
                        <div className="font-medium text-slate-800">{u.urun_kodu}</div>
                        <div className="text-sm text-slate-500">{u.urun_adi} • {u.altin_ayari}</div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
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
                <option value="925 Ayar Gümüş">925 Ayar Gümüş</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Ürün Fotoğrafı
              </label>
              {formData.urunResmi && formData.urunResmi.startsWith('data:') ? (
                // Base64 görsel varsa önizleme göster
                <div className="flex items-center gap-3 p-3 border border-green-300 bg-green-50 rounded-lg">
                  <img 
                    src={formData.urunResmi} 
                    alt="Ürün" 
                    className="w-16 h-16 object-contain rounded border border-slate-200 bg-white"
                  />
                  <div className="flex-1">
                    <p className="text-sm text-green-700 font-medium">Kayıtlı görsel yüklendi</p>
                    <button
                      type="button"
                      onClick={() => handleChange('urunResmi', '')}
                      className="text-xs text-red-600 hover:text-red-700"
                    >
                      Görseli kaldır
                    </button>
                  </div>
                </div>
              ) : (
                // URL girişi
                <div className="space-y-2">
                  <input
                    type="url"
                    value={formData.urunResmi}
                    onChange={(e) => handleChange('urunResmi', e.target.value)}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="https://..."
                  />
                  {formData.urunResmi && (
                    <img 
                      src={formData.urunResmi} 
                      alt="Önizleme" 
                      className="w-16 h-16 object-contain rounded border border-slate-200"
                      onError={(e) => (e.target as HTMLImageElement).style.display = 'none'}
                    />
                  )}
                </div>
              )}
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
                type="date"
                required
                value={formData.siparisTarihi}
                onChange={(e) => handleChange('siparisTarihi', e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                <option value="Hepsiburada">Hepsiburada</option>
                <option value="Çiçeksepeti">Çiçeksepeti</option>
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
