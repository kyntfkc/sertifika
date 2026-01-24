import { useState, useEffect } from 'react';
import { Search, Plus, Edit, Trash2, Printer, Image as ImageIcon } from 'lucide-react';
import { getAllUrunler, deleteUrun, getUrunResimUrl, type Urun } from '../services/api';
import { yazdirSertifika } from '../utils/sertifikaYazdir';
import { SertifikaData } from '../types';

interface UrunListesiProps {
  onEdit: (urun: Urun) => void;
  onAdd: () => void;
}

function UrunListesi({ onEdit, onAdd }: UrunListesiProps) {
  const [urunler, setUrunler] = useState<Urun[]>([]);
  const [filteredUrunler, setFilteredUrunler] = useState<Urun[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadUrunler();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredUrunler(urunler);
    } else {
      const filtered = urunler.filter(
        (urun) =>
          urun.urun_adi.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (urun.urun_kodu && urun.urun_kodu.toLowerCase().includes(searchTerm.toLowerCase())) ||
          urun.altin_ayari.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUrunler(filtered);
    }
  }, [searchTerm, urunler]);

  const loadUrunler = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAllUrunler();
      setUrunler(data);
      setFilteredUrunler(data);
    } catch (err) {
      setError('Ürünler yüklenemedi');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Bu ürünü silmek istediğinize emin misiniz?')) {
      return;
    }

    try {
      await deleteUrun(id);
      await loadUrunler();
    } catch (err) {
      alert('Ürün silinemedi');
      console.error(err);
    }
  };

  const handlePrint = (urun: Urun) => {
    const sertifikaData: SertifikaData = {
      urunAdi: urun.urun_adi,
      urunKodu: urun.urun_kodu,
      altinAyari: urun.altin_ayari,
      musteriAdi: urun.musteri_adi || '',
      siparisTarihi: urun.siparis_tarihi || '',
      platform: urun.platform || '',
      siparisNo: urun.siparis_no || '',
      urunResmi: getUrunResimUrl(urun) || undefined,
    };
    yazdirSertifika(sertifikaData);
  };

  if (loading) {
    return (
      <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-xl border border-slate-200/60 p-6">
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-slate-600">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-xl border border-slate-200/60 p-6">
        <div className="text-center py-8">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={loadUrunler}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Tekrar Dene
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-xl border border-slate-200/60 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-800">Ürünler</h2>
        <button
          onClick={onAdd}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Yeni Ürün
        </button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Ürün adı, kodu veya altın ayarı ile ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {filteredUrunler.length === 0 ? (
        <div className="text-center py-8 text-slate-500">
          {searchTerm ? 'Arama sonucu bulunamadı' : 'Henüz ürün eklenmemiş'}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredUrunler.map((urun) => {
            const resimUrl = getUrunResimUrl(urun);
            return (
              <div
                key={urun.id}
                className="border border-slate-200 rounded-lg p-4 hover:shadow-lg transition-shadow bg-white"
              >
                <div className="mb-3">
                  {resimUrl ? (
                    <img
                      src={resimUrl}
                      alt={urun.urun_adi}
                      className="w-full h-48 object-contain rounded-lg bg-slate-50"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  ) : (
                    <div className="w-full h-48 bg-slate-100 rounded-lg flex items-center justify-center">
                      <ImageIcon className="w-12 h-12 text-slate-400" />
                    </div>
                  )}
                </div>
                <h3 className="font-semibold text-slate-800 mb-1 truncate">{urun.urun_adi}</h3>
                <p className="text-sm text-slate-600 mb-1">Kod: {urun.urun_kodu}</p>
                <p className="text-sm text-slate-500 mb-3">{urun.altin_ayari}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handlePrint(urun)}
                    className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                    title="Yazdır"
                  >
                    <Printer className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onEdit(urun)}
                    className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-slate-600 text-white rounded hover:bg-slate-700 text-sm"
                    title="Düzenle"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(urun.id)}
                    className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
                    title="Sil"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default UrunListesi;
