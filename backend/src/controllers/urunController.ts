import { Request, Response } from 'express';
import { UrunModel, UrunCreate } from '../models/Urun.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const getAllUrunler = async (req: Request, res: Response) => {
  try {
    const urunler = await UrunModel.findAll();
    res.json(urunler);
  } catch (error) {
    console.error('Error fetching urunler:', error);
    res.status(500).json({ error: 'Ürünler getirilemedi' });
  }
};

export const getUrunById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const urun = await UrunModel.findById(id);
    if (!urun) {
      return res.status(404).json({ error: 'Ürün bulunamadı' });
    }
    res.json(urun);
  } catch (error) {
    console.error('Error fetching urun:', error);
    res.status(500).json({ error: 'Ürün getirilemedi' });
  }
};

export const createUrun = async (req: Request, res: Response) => {
  try {
    const data: UrunCreate = {
      urun_adi: req.body.urun_adi,
      urun_kodu: req.body.urun_kodu,
      altin_ayari: req.body.altin_ayari,
      musteri_adi: req.body.musteri_adi,
      siparis_tarihi: req.body.siparis_tarihi,
      platform: req.body.platform,
      siparis_no: req.body.siparis_no,
      urun_resmi_url: req.body.urun_resmi_url,
    };

    if (req.file) {
      data.urun_resmi_dosya = req.file.filename;
    }

    const urun = await UrunModel.create(data);
    res.status(201).json(urun);
  } catch (error) {
    console.error('Error creating urun:', error);
    res.status(500).json({ error: 'Ürün oluşturulamadı' });
  }
};

export const updateUrun = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data: Partial<UrunCreate> = {};

    if (req.body.urun_adi) data.urun_adi = req.body.urun_adi;
    if (req.body.urun_kodu !== undefined) data.urun_kodu = req.body.urun_kodu;
    if (req.body.altin_ayari) data.altin_ayari = req.body.altin_ayari;
    if (req.body.musteri_adi) data.musteri_adi = req.body.musteri_adi;
    if (req.body.siparis_tarihi) data.siparis_tarihi = req.body.siparis_tarihi;
    if (req.body.platform) data.platform = req.body.platform;
    if (req.body.siparis_no) data.siparis_no = req.body.siparis_no;
    if (req.body.urun_resmi_url !== undefined) data.urun_resmi_url = req.body.urun_resmi_url;

    if (req.file) {
      // Eski dosyayı sil
      const urun = await UrunModel.findById(id);
      if (urun?.urun_resmi_dosya) {
        const oldFilePath = path.join(__dirname, '../../uploads', urun.urun_resmi_dosya);
        if (fs.existsSync(oldFilePath)) {
          fs.unlinkSync(oldFilePath);
        }
      }
      data.urun_resmi_dosya = req.file.filename;
    }

    const urun = await UrunModel.update(id, data);
    if (!urun) {
      return res.status(404).json({ error: 'Ürün bulunamadı' });
    }
    res.json(urun);
  } catch (error) {
    console.error('Error updating urun:', error);
    res.status(500).json({ error: 'Ürün güncellenemedi' });
  }
};

export const deleteUrun = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    // Dosyayı sil
    const urun = await UrunModel.findById(id);
    if (urun?.urun_resmi_dosya) {
      const filePath = path.join(__dirname, '../../uploads', urun.urun_resmi_dosya);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    const deleted = await UrunModel.delete(id);
    if (!deleted) {
      return res.status(404).json({ error: 'Ürün bulunamadı' });
    }
    res.json({ message: 'Ürün silindi' });
  } catch (error) {
    console.error('Error deleting urun:', error);
    res.status(500).json({ error: 'Ürün silinemedi' });
  }
};

export const getUrunResim = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const urun = await UrunModel.findById(id);
    
    if (!urun) {
      return res.status(404).json({ error: 'Ürün bulunamadı' });
    }

    if (urun.urun_resmi_dosya) {
      const filePath = path.join(__dirname, '../../uploads', urun.urun_resmi_dosya);
      if (fs.existsSync(filePath)) {
        return res.sendFile(filePath);
      }
    }

    res.status(404).json({ error: 'Görsel bulunamadı' });
  } catch (error) {
    console.error('Error fetching image:', error);
    res.status(500).json({ error: 'Görsel getirilemedi' });
  }
};
