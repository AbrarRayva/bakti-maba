
const express = require('express');
const router = express.Router();
const PDFDocument = require('pdfkit');
const db = require('../models'); // asumsi pakai Sequelize

router.get('/report/download', async (req, res) => {
  try {
    const data = await db.Absensi.findAll(); // ambil data absensi

    const doc = new PDFDocument();
    res.setHeader('Content-disposition', 'attachment; filename=report-absensi.pdf');
    res.setHeader('Content-type', 'application/pdf');
    doc.pipe(res);

    doc.fontSize(18).text('Laporan Absensi - Admin', { align: 'center' });
    doc.moveDown();

    data.forEach((item, index) => {
      doc.fontSize(12).text(
        `${index + 1}. NIM: ${item.nim}, Nama: ${item.nama}, Status: ${item.status}, Tanggal: ${item.tanggal}, Waktu: ${item.waktu}`
      );
    });

    doc.end();
  } catch (err) {
    res.status(500).send('Gagal generate PDF');
  }
});

router.post('/report/admin/pdf', async (req, res) => {
  const db = require('../models'); // sesuaikan dengan folder kamu
  const data = await db.Absensi.findAll(); // atau query sesuai kebutuhan

  const doc = new PDFDocument({ margin: 30, size: 'A4' });
  res.setHeader('Content-Disposition', 'attachment; filename=report-absensi.pdf');
  res.setHeader('Content-Type', 'application/pdf');
  doc.pipe(res);

  doc.fontSize(16).text('Laporan Absensi - Admin', { align: 'center' });
  doc.moveDown();

  data.forEach((item, i) => {
    doc.fontSize(12).text(
      `${i + 1}. ${item.nim} - ${item.nama} - ${item.status} - ${item.tanggal} - ${item.waktu}`
    );
  });

  doc.end();
});
