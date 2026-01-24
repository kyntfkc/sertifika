import { useState, useEffect } from 'react';
import { Save, X, Upload } from 'lucide-react';
import { createUrun, updateUrun, getUrunResimUrl, type Urun } from '../services/api';
import { UrunFormData } from '../types';

interface UrunFormuProps {
  urun?: Urun | null;
  onSave: () => void;
  onCancel: () => void;
}

function UrunFormu({ urun, onSave, onCancel }: UrunFormuProps) {
  const [formData, setFormData] = useState<UrunFormData>({
    urun_adi: '',
    urun_kodu: '',
    altin_ayari: '14 Ayar Altın',
    urun_resmi_url: '',
    urun_resmi_file: null,
  });

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (urun) {
      setFormData({
        urun_adi: urun.urun_adi,
        urun_kodu: urun.urun_kodu || '',
        altin_ayari: urun.altin_ayari,
        urun_resmi_url: urun.urun_resmi_url || '',
        urun_resmi_file: null,
      });
      const resimUrl = getUrunResimUrl(urun);
      if (resimUrl) {
        setPreviewUrl(resimUrl);
      }
    }
  }, [urun]);

  const handleChange = (field: keyof UrunFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Dosya tipi kontrolü
      if (!file.type.match(/^image\/(jpeg|jpg|png|webp)$/)) {
        setError('Sadece JPEG, PNG ve WebP formatları desteklenir');
        return;
      }
      // Dosya boyutu kontrolü (5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('Dosya boyutu 5MB\'dan küçük olmalıdır');
        return;
      }
      setFormData((prev) => ({ ...prev, urun_resmi_file: file }));
      setFormData((prev) => ({ ...prev, urun_resmi_url: '' })); // URL'i temizle
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
      setError(null);
    }
  };

  const handleUrlChange = (url: string) => {
    setFormData((prev) => ({ ...prev, urun_resmi_url: url, urun_resmi_file: null }));
    setPreviewUrl(url || null);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const data = {
        urun_adi: formData.urun_adi,
        urun_kodu: formData.urun_kodu || undefined,
        altin_ayari: formData.altin_ayari,
        urun_resmi_url: formData.urun_resmi_url || undefined,
      };

      if (urun) {
        await updateUrun(urun.id, data, formData.urun_resmi_file || undefined);
      } else {
        await createUrun(data, formData.urun_resmi_file || undefined);
      }

      onSave();
    } catch (err: any) {
      setError(err.message || 'Bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-xl border border-slate-200/60 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-800">
          {urun ? 'Ürün Düzenle' : 'Yeni Ürün Ekle'}
        </h2>
        <button
          onClick={onCancel}
          className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Ürün Adı *
            </label>
            <input
              type="text"
              required
              value={formData.urun_adi}
              onChange={(e) => handleChange('urun_adi', e.target.value)}
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
              value={formData.urun_kodu}
              onChange={(e) => handleChange('urun_kodu', e.target.value)}
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
              value={formData.altin_ayari}
              onChange={(e) => handleChange('altin_ayari', e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="14 Ayar Altın">14 Ayar Altın</option>
              <option value="18 Ayar Altın">18 Ayar Altın</option>
              <option value="22 Ayar Altın">22 Ayar Altın</option>
            </select>
          </div>

          {/* Görsel Yükleme */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Ürün Fotoğrafı
            </label>
            <div className="space-y-3">
              {/* URL Input */}
              <div>
                <input
                  type="url"
                  value={formData.urun_resmi_url}
                  onChange={(e) => handleUrlChange(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Veya URL girin: https://..."
                />
              </div>
              {/* Dosya Yükleme */}
              <div>
                <label className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors">
                  <Upload className="w-4 h-4 text-slate-600" />
                  <span className="text-sm text-slate-700">
                    {formData.urun_resmi_file ? formData.urun_resmi_file.name : 'Dosya Seç'}
                  </span>
                  <input
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/webp"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              </div>
              {/* Önizleme */}
              {previewUrl && (
                <div className="mt-2">
                  <img
                    src={previewUrl}
                    alt="Önizleme"
                    className="w-full h-48 object-contain rounded-lg bg-slate-50 border border-slate-200"
                    onError={() => setPreviewUrl(null)}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors font-semibold"
          >
            İptal
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:shadow-lg hover:scale-105 active:scale-95 transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Kaydediliyor...
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                Kaydet
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default UrunFormu;
