import { pool } from './db.js';

async function migrate() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS urunler (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        urun_adi VARCHAR(255) NOT NULL,
        urun_kodu VARCHAR(100),
        altin_ayari VARCHAR(50) NOT NULL,
        musteri_adi VARCHAR(255) NOT NULL,
        siparis_tarihi DATE NOT NULL,
        platform VARCHAR(100) NOT NULL,
        siparis_no VARCHAR(100) NOT NULL,
        urun_resmi_url VARCHAR(500),
        urun_resmi_dosya VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_siparis_no ON urunler(siparis_no);
    `);

    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_musteri_adi ON urunler(musteri_adi);
    `);

    console.log('Migration completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Migration error:', error);
    process.exit(1);
  }
}

migrate();
