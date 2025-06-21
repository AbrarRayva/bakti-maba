const path = require('path');
const fs = require('fs');

const assignments = []; // Array untuk menyimpan tugas yang dibuat admin

exports.assignments = assignments; // Export assignments agar bisa diakses oleh assignmentController

exports.listAssignments = (req, res) => {
  res.render('admin/assignment/index', { assignments }); // Menggunakan path views/admin/assignment/index.ejs
};

exports.showForm = (req, res) => {
  res.render('admin/assignment/form'); // Menggunakan path views/admin/assignment/form.ejs
};

exports.addAssignment = (req, res) => {
  const { title, description, link } = req.body; // Ambil link juga dari body
  let file = null;

  if (req.file) {
    file = `/uploads/${req.file.filename}`; // Path file yang diupload (disimpan di public/uploads)
  } else if (link) { // Jika ada link yang diisi
    file = link; // Gunakan link sebagai "file"
  }

  const newAssignment = {
    id: Date.now().toString(),
    title,
    description,
    file, // Bisa berupa path file atau link
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Tenggat waktu 7 hari dari sekarang
  };
  assignments.push(newAssignment);
  res.redirect('/admin/assignment'); // Redirect kembali ke daftar tugas admin
};

exports.deleteAssignment = (req, res) => {
  const { id } = req.params;
  const index = assignments.findIndex(a => a.id === id);
  if (index !== -1) {
    const filePath = assignments[index].file;
    // Jika file adalah upload lokal, hapus dari sistem file
    if (filePath && filePath.startsWith('/uploads/')) {
      fs.unlink(path.join(__dirname, '../../public', filePath), err => {
        if (err) console.error('Gagal hapus file:', err);
      });
    }
    assignments.splice(index, 1); // Hapus tugas dari array
  }
  res.redirect('/admin/assignment'); // Redirect kembali ke daftar tugas admin
};