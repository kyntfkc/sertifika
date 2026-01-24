const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://sertifika-production.up.railway.app';

export interface Urun {
  id: string;
  urun_adi: string;
  urun_kodu: string;
  altin_ayari: string;
  musteri_adi?: string;
  siparis_tarihi?: string;
  platform?: string;
  siparis_no?: string;
  urun_resmi_url?: string;
  urun_resmi_dosya?: string;
  created_at: string;
  updated_at: string;
}

export interface UrunCreate {
  urun_adi: string;
  urun_kodu: string;
  altin_ayari: string;
  urun_resmi_url?: string;
}

export async function getAllUrunler(): Promise<Urun[]> {
  const response = await fetch(`${API_BASE_URL}/api/urunler`);
  if (!response.ok) {
    throw new Error('Ürünler getirilemedi');
  }
  return response.json();
}

export async function getUrunById(id: string): Promise<Urun> {
  const response = await fetch(`${API_BASE_URL}/api/urunler/${id}`);
  if (!response.ok) {
    throw new Error('Ürün getirilemedi');
  }
  return response.json();
}

export async function createUrun(data: UrunCreate, file?: File): Promise<Urun> {
  const formData = new FormData();
  
  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      formData.append(key, value);
    }
  });

  if (file) {
    formData.append('urun_resmi', file);
  }

  const response = await fetch(`${API_BASE_URL}/api/urunler`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Ürün oluşturulamadı');
  }

  return response.json();
}

export async function updateUrun(id: string, data: Partial<UrunCreate>, file?: File): Promise<Urun> {
  const formData = new FormData();
  
  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      formData.append(key, value);
    }
  });

  if (file) {
    formData.append('urun_resmi', file);
  }

  const response = await fetch(`${API_BASE_URL}/api/urunler/${id}`, {
    method: 'PUT',
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Ürün güncellenemedi');
  }

  return response.json();
}

export async function deleteUrun(id: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/api/urunler/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Ürün silinemedi');
  }
}

export function getUrunResimUrl(urun: Urun): string | null {
  if (urun.urun_resmi_url) {
    return urun.urun_resmi_url;
  }
  if (urun.urun_resmi_dosya) {
    return `${API_BASE_URL}/uploads/${urun.urun_resmi_dosya}`;
  }
  return null;
}
