import { SertifikaData } from '../types';
import { getSertifikaAyarlari } from './sertifikaAyarlari';

export function yazdirSertifika(data: SertifikaData): void {
  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    alert('Pop-up engelleyici açık olabilir. Lütfen izin verin.');
    return;
  }

  const ayarlar = getSertifikaAyarlari();

  // Tarihi Türkçe formata çevir (YYYY-MM-DD -> GG.AA.YYYY)
  let formattedTarih = data.siparisTarihi;
  if (data.siparisTarihi && data.siparisTarihi.includes('-')) {
    const [year, month, day] = data.siparisTarihi.split('-');
    formattedTarih = `${day}.${month}.${year}`;
  }

  // Ürün adını temizle
  let temizUrunAdi = data.urunAdi
    .replace(/,\s*one\s*size/gi, '')
    .replace(/,\s*[A-Z]{2,}[0-9]+/gi, '')
    .replace(/\s+[A-Z]{2,}[0-9]+(?:\s|,|$)/gi, ' ')
    .replace(/[A-Z]{2,}[0-9]+\s*,\s*/gi, '')
    .replace(/\s+/g, ' ')
    .trim();

  const modelKoduRegex = /\b([A-Z]{2,}[0-9]+)\b/gi;
  if (modelKoduRegex.test(temizUrunAdi)) {
    temizUrunAdi = temizUrunAdi.replace(modelKoduRegex, '').replace(/\s+/g, ' ').trim();
  }

  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Sertifika - ${data.siparisNo}</title>
        <style>
          @page {
            size: ${ayarlar.sayfaGenislik}cm ${ayarlar.sayfaYukseklik}cm;
            margin: 0;
            padding: 0;
          }
          @media print {
            body {
              margin: 0;
              padding: 0;
            }
          }
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          body {
            font-family: Arial, sans-serif;
            width: ${ayarlar.sayfaGenislik}cm;
            height: ${ayarlar.sayfaYukseklik}cm;
            background-color: #ffffff;
            position: relative;
            overflow: hidden;
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          .container {
            display: flex;
            height: 100%;
            padding: ${ayarlar.genelPadding}cm;
          }
          .left-section {
            width: 50%;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: flex-start;
            padding: ${ayarlar.solBölümPadding}cm;
          }
          .product-image {
            width: ${ayarlar.fotoğrafGenislik}cm;
            height: ${ayarlar.fotoğrafYukseklik}cm;
            object-fit: contain;
            margin-bottom: 0.5cm;
            background: transparent;
          }
          .product-info {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            text-align: left;
          }
          .product-name {
            font-size: ${ayarlar.ürünAdıFontBoyutu}pt;
            color: #000;
            margin-bottom: 0.3cm;
            line-height: 1.3;
            font-weight: normal;
          }
          .product-code {
            font-size: ${ayarlar.ürünKoduFontBoyutu}pt;
            color: #000;
            margin-bottom: 0.3cm;
            font-weight: normal;
          }
          .gold-info {
            font-size: ${ayarlar.altınAyarıFontBoyutu}pt;
            color: #000;
            font-weight: normal;
          }
          .right-section {
            width: 50%;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: flex-start;
            padding: ${ayarlar.sagBölümPadding}cm;
          }
          .customer-info {
            display: flex;
            flex-direction: column;
            gap: 0.4cm;
            text-align: left;
          }
          .info-line {
            font-size: ${ayarlar.müşteriBilgisiFontBoyutu}pt;
            color: #000;
            line-height: 1.4;
            font-weight: normal;
          }
          @media print {
            @page {
              size: ${ayarlar.sayfaGenislik}cm ${ayarlar.sayfaYukseklik}cm;
              margin: 0;
              padding: 0;
            }
            body {
              width: ${ayarlar.sayfaGenislik}cm;
              height: ${ayarlar.sayfaYukseklik}cm;
              margin: 0;
              padding: 0;
              overflow: hidden;
            }
            .container {
              page-break-inside: avoid;
              width: 100%;
              height: 100%;
            }
            * {
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="left-section">
            ${data.urunResmi 
              ? `<img src="${data.urunResmi}" alt="Ürün" class="product-image" onerror="this.style.display='none'" style="position: ${ayarlar.fotoğrafX || ayarlar.fotoğrafY ? 'absolute' : 'relative'}; ${ayarlar.fotoğrafX ? `left: ${ayarlar.fotoğrafX}cm;` : ''} ${ayarlar.fotoğrafY ? `top: ${ayarlar.fotoğrafY}cm;` : ''}">` 
              : `<div class="product-image" style="position: ${ayarlar.fotoğrafX || ayarlar.fotoğrafY ? 'absolute' : 'relative'}; ${ayarlar.fotoğrafX ? `left: ${ayarlar.fotoğrafX}cm;` : ''} ${ayarlar.fotoğrafY ? `top: ${ayarlar.fotoğrafY}cm;` : ''}"></div>`
            }
            <div class="product-info">
              <div class="product-name" style="position: ${ayarlar.ürünAdıX || ayarlar.ürünAdıY ? 'absolute' : 'relative'}; ${ayarlar.ürünAdıX ? `left: ${ayarlar.ürünAdıX}cm;` : ''} ${ayarlar.ürünAdıY ? `top: ${ayarlar.ürünAdıY}cm;` : ''}">${temizUrunAdi}</div>
              ${data.urunKodu ? `<div class="product-code" style="position: ${ayarlar.ürünKoduX || ayarlar.ürünKoduY ? 'absolute' : 'relative'}; ${ayarlar.ürünKoduX ? `left: ${ayarlar.ürünKoduX}cm;` : ''} ${ayarlar.ürünKoduY ? `top: ${ayarlar.ürünKoduY}cm;` : ''}">${data.urunKodu}</div>` : ''}
              <div class="gold-info" style="position: ${ayarlar.altınAyarıX || ayarlar.altınAyarıY ? 'absolute' : 'relative'}; ${ayarlar.altınAyarıX ? `left: ${ayarlar.altınAyarıX}cm;` : ''} ${ayarlar.altınAyarıY ? `top: ${ayarlar.altınAyarıY}cm;` : ''}">${data.altinAyari}</div>
            </div>
          </div>
          <div class="right-section">
            <div class="customer-info">
              <div class="info-line" style="position: ${ayarlar.müşteriAdıX || ayarlar.müşteriAdıY ? 'absolute' : 'relative'}; ${ayarlar.müşteriAdıX ? `left: ${ayarlar.müşteriAdıX}cm;` : ''} ${ayarlar.müşteriAdıY ? `top: ${ayarlar.müşteriAdıY}cm;` : ''}">${data.musteriAdi}</div>
              <div class="info-line" style="position: ${ayarlar.siparişTarihiX || ayarlar.siparişTarihiY ? 'absolute' : 'relative'}; ${ayarlar.siparişTarihiX ? `left: ${ayarlar.siparişTarihiX}cm;` : ''} ${ayarlar.siparişTarihiY ? `top: ${ayarlar.siparişTarihiY}cm;` : ''}">${formattedTarih}</div>
              <div class="info-line" style="position: ${ayarlar.platformX || ayarlar.platformY ? 'absolute' : 'relative'}; ${ayarlar.platformX ? `left: ${ayarlar.platformX}cm;` : ''} ${ayarlar.platformY ? `top: ${ayarlar.platformY}cm;` : ''}">${data.platform}</div>
              <div class="info-line" style="position: ${ayarlar.siparişNoX || ayarlar.siparişNoY ? 'absolute' : 'relative'}; ${ayarlar.siparişNoX ? `left: ${ayarlar.siparişNoX}cm;` : ''} ${ayarlar.siparişNoY ? `top: ${ayarlar.siparişNoY}cm;` : ''}">${data.siparisNo}</div>
            </div>
          </div>
        </div>
      </body>
    </html>
  `);

  printWindow.document.close();
  
  setTimeout(() => {
    printWindow.print();
  }, 500);
}
