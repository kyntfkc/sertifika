import { useState } from 'react';
import SertifikaFormu from './components/SertifikaFormu';
import SertifikaAyarlari from './components/SertifikaAyarlari';
import { Settings, Printer } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState<'form' | 'ayarlar'>('form');

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
      </div>
    </div>
  );
}

export default App;
