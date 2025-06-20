// Simpanan data dummy
const assignments = [
  {
    id: 1,
    title: "Tugas 1 - 24 Juli 2026",
    file: "Instruksi Tugas.docx",
    detail: "Peserta diminta untuk mengerjakan tugas sesuai perintah berikut:\n1. A\n2. B\n3. C\n4. D\n5. E",
    deadline: "2026-07-24"
  }
];

// Data file tugas yang diunggah mahasiswa
const submissions = [];

// Tampilkan semua tugas
exports.getAllAssignments = (req, res) => {
  res.render('assignment/index', { assignments });
};

// Tampilkan form tambah tugas untuk panitia
exports.getAddAssignmentForm = (req, res) => {
  res.render('assignment/add');
};

// Proses tambah tugas dari panitia
exports.addAssignment = (req, res) => {
  const { title, file, detail, deadline } = req.body;
  const newId = assignments.length + 1;
  assignments.push({
    id: newId,
    title,
    file,
    detail,
    deadline
  });
  res.redirect('/assignment');
};

// Tampilkan detail tugas dan form upload
exports.getAssignmentDetail = (req, res) => {
  const tugas = assignments.find(t => t.id == req.params.id);
  if (!tugas) {
    return res.status(404).send('Tugas tidak ditemukan.');
  }
  res.render('assignment/submit', { tugas });
};

// Proses upload tugas oleh mahasiswa
exports.submitAssignment = (req, res) => {
  const { id } = req.params;
  const file = req.file;
  if (file) {
    submissions.push({
      tugasId: parseInt(id),
      filename: file.filename,
      uploadedAt: new Date()
    });
    console.log('Tugas berhasil diunggah:', file.filename);
  }
  res.redirect('/assignment');
};
