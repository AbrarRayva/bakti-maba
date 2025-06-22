// controllers/chatbotController.js
let messages = []; // Awalnya kosong

exports.showChat = (req, res) => {
  res.render('chatbot', { messages });
};

exports.sendMessage = (req, res) => {
  const userMessage = req.body.message;
  const now = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  messages.push({ from: 'user', text: userMessage, time: `Today, ${now}` });

  const keyword = userMessage.toLowerCase();
  let botReply = 'Terima kasih atas pesan Anda!';

  if (
    keyword.includes('orientasi') ||
    keyword.includes('maba') ||
    keyword.includes('mahasiswa baru') ||
    keyword.includes('kegiatan') ||
    keyword.includes('jadwal') ||
    keyword.includes('tanggal orientasi')
  ) {
    botReply = `📢 *Pengumuman Orientasi Mahasiswa Baru:*
- 🗓️ Tanggal: *24 Juni 2025*
- 🏛️ Tempat: *Aula Gedung B*
- ⏰ Waktu: *08.00 WIB*

Pastikan Anda hadir tepat waktu!`;

  } else if (
    keyword.includes('dresscode') ||
    keyword.includes('pakaian') ||
    keyword.includes('seragam') ||
    keyword.includes('baju')
  ) {
    botReply = `👕 *Dresscode Orientasi:*
- Pria: *Kemeja putih* dan *celana hitam*
- Wanita: *Kemeja putih* dan *rok hitam panjang*`;

  } else if (
    keyword.includes('upload') ||
    keyword.includes('unggah') ||
    keyword.includes('berkas') ||
    keyword.includes('file') ||
    keyword.includes('panduan') ||
    keyword.includes('cara mengupload')
  ) {
    botReply = `🗂️ *Panduan Upload Berkas:*
1. Login ke sistem orientasi
2. Masuk ke menu *Upload Berkas*
3. Unggah file dalam format PDF (maksimal 2MB)

📎 Pastikan file sudah diberi nama sesuai format yang ditentukan.`;

  } else if (
    keyword.includes('forum') ||
    keyword.includes('diskusi') ||
    keyword.includes('aturan forum')
  ) {
    botReply = `📌 *Aturan Forum Diskusi Mahasiswa Baru:*
1. Gunakan bahasa yang sopan dan jelas
2. Dilarang menyebarkan hoax/informasi palsu
3. Hindari spam dan topik tidak relevan
4. Hormati pendapat orang lain
5. Dilarang unggah konten SARA/pornografi/kekerasan
6. Gunakan forum sesuai kebutuhan orientasi

🚨 *Sanksi:*
- ⚠️ Teguran langsung
- 🔇 Pemblokiran sementara
- ❌ Diskualifikasi poin keaktifan

📝 *Tips:*
- Baca post sebelumnya sebelum bertanya
- Gunakan judul post yang jelas dan informatif`;
  }

  messages.push({ from: 'bot', text: botReply, time: `Today, ${now}` });
  res.redirect('/chatbot');
};
