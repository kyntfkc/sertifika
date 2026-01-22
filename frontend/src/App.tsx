import { useState } from 'react';
import SertifikaFormu from './components/SertifikaFormu';
import SertifikaAyarlari from './components/SertifikaAyarlari';
import UrunListesi from './components/UrunListesi';
import UrunFormu from './components/UrunFormu';
import { Settings, Printer, Package } from 'lucide-react';
import { Urun } from './services/api';

function App() {
  const [activeTab, setActiveTab] = useState<'form' | 'ayarlar' | 'urunler'>('form');
  const [urunFormMode, setUrunFormMode] = useState<'list' | 'add' | 'edit'>('list');
  const [selectedUrun, setSelectedUrun] = useState<Urun | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
            Sertifika Yazdırma Sistemi
          </h1>
          <p className="text-slate-600">Altın sertifikalarınızı kolayca yazdırın</p>
        </div>

        {/* Tab Navigation */}
        <div className="mb-6 border-b border-slate-200">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('form')}
              className={`px-6 py-3 text-sm font-medium transition-all duration-200 border-b-2 flex items-center gap-2 ${
                activeTab === 'form'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <Printer className="w-4 h-4" />
              <span>Sertifika Yazdır</span>
            </button>
            <button
              onClick={() => {
                setActiveTab('urunler');
                setUrunFormMode('list');
              }}
              className={`px-6 py-3 text-sm font-medium transition-all duration-200 border-b-2 flex items-center gap-2 ${
                activeTab === 'urunler'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <Package className="w-4 h-4" />
              <span>Ürünler</span>
            </button>
            <button
              onClick={() => setActiveTab('ayarlar')}
              className={`px-6 py-3 text-sm font-medium transition-all duration-200 border-b-2 flex items-center gap-2 ${
                activeTab === 'ayarlar'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Ayarlar</span>
            </button>
          </div>
        </div>

        {/* Content */}
        {activeTab === 'form' && <SertifikaFormu />}
        {activeTab === 'ayarlar' && <SertifikaAyarlari />}
        {activeTab === 'urunler' && (
          <>
            {urunFormMode === 'list' && (
              <UrunListesi
                onEdit={(urun) => {
                  setSelectedUrun(urun);
                  setUrunFormMode('edit');
                }}
                onAdd={() => {
                  setSelectedUrun(null);
                  setUrunFormMode('add');
                }}
              />
            )}
            {(urunFormMode === 'add' || urunFormMode === 'edit') && (
              <UrunFormu
                urun={selectedUrun}
                onSave={() => {
                  setUrunFormMode('list');
                  setSelectedUrun(null);
                }}
                onCancel={() => {
                  setUrunFormMode('list');
                  setSelectedUrun(null);
                }}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
