import { pool } from '../config/db.js';

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
  musteri_adi?: string;
  siparis_tarihi?: string;
  platform?: string;
  siparis_no?: string;
  urun_resmi_url?: string;
  urun_resmi_dosya?: string;
}

export class UrunModel {
  static async findAll(): Promise<Urun[]> {
    const result = await pool.query('SELECT * FROM urunler ORDER BY created_at DESC');
    return result.rows;
  }

  static async findById(id: string): Promise<Urun | null> {
    const result = await pool.query('SELECT * FROM urunler WHERE id = $1', [id]);
    return result.rows[0] || null;
  }

  static async create(data: UrunCreate): Promise<Urun> {
    const result = await pool.query(
      `INSERT INTO urunler (urun_adi, urun_kodu, altin_ayari, musteri_adi, siparis_tarihi, platform, siparis_no, urun_resmi_url, urun_resmi_dosya)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING *`,
      [
        data.urun_adi,
        data.urun_kodu || null,
        data.altin_ayari,
        data.musteri_adi || null,
        data.siparis_tarihi || null,
        data.platform || null,
        data.siparis_no || null,
        data.urun_resmi_url || null,
        data.urun_resmi_dosya || null,
      ]
    );
    return result.rows[0];
  }

  static async update(id: string, data: Partial<UrunCreate>): Promise<Urun | null> {
    const fields: string[] = [];
    const values: any[] = [];
    let paramIndex = 1;

    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined) {
        fields.push(`${key} = $${paramIndex}`);
        values.push(value);
        paramIndex++;
      }
    });

    if (fields.length === 0) {
      return await this.findById(id);
    }

    fields.push(`updated_at = CURRENT_TIMESTAMP`);
    values.push(id);

    const result = await pool.query(
      `UPDATE urunler SET ${fields.join(', ')} WHERE id = $${paramIndex} RETURNING *`,
      values
    );
    return result.rows[0] || null;
  }

  static async delete(id: string): Promise<boolean> {
    const result = await pool.query('DELETE FROM urunler WHERE id = $1', [id]);
    return result.rowCount !== null && result.rowCount > 0;
  }
}
