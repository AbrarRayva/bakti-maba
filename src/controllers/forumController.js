let messages = {}; // Simpan pesan berdasarkan ID forum
let pinnedMessages = {}; 

// Untuk User Umum: Tampilkan forum per ID
exports.showForumChat = (req, res) => {
  const forumId = req.params.id;
  const forumMessages = messages[forumId] || [];
  res.render('forum', { forumId, messages: forumMessages });
};

// Untuk User Umum: Kirim pesan ke forum
exports.sendMessage = (req, res) => {
  const { id } = req.params;
  const message = req.body.message;

  if (!messages[id]) {
    messages[id] = [];
  }

  messages[id].push({ text: message, time: new Date().toLocaleTimeString() });

  console.log(`Pesan ke forum ${id}: ${message}`);
  res.redirect(`/forum/chat/${id}`);
};

// Untuk Admin: Tampilkan halaman forum admin (tanpa ID khusus)
exports.showForumAdmin = (req, res) => {
  const forumId = 'admin'; // default ID admin
  const forumMessages = messages[forumId] || [];
  res.render('forumAdmin', { forumId, messages: forumMessages });
};

//  Untuk Admin: Kirim pesan ke forum admin
exports.sendAdminMessage = (req, res) => {
  const forumId = 'admin';
  const message = req.body.message;

  if (!messages[forumId]) {
    messages[forumId] = [];
  }

  messages[forumId].push({ text: message, time: new Date().toLocaleTimeString() });

  console.log(`Admin mengirim pesan: ${message}`);
  res.redirect('/admin/forum');
};

exports.replyMessage = (req, res) => {
  const forumId = req.params.id;
  const index = parseInt(req.params.index);
  const replyText = req.body.reply;

  if (messages[forumId] && messages[forumId][index]) {
    messages[forumId][index].replies.push({
      text: replyText,
      time: new Date().toLocaleTimeString(),
    });
  }

  res.redirect('/forum/admin');
};

exports.reactMessage = (req, res) => {
  const forumId = req.params.id;
  const index = parseInt(req.params.index);
  const emoji = req.body.emoji;

  if (!messages[forumId][index].reactions[emoji]) {
    messages[forumId][index].reactions[emoji] = 1;
  } else {
    messages[forumId][index].reactions[emoji]++;
  }

  res.redirect('/forum/admin');
};

exports.deleteMessage = (req, res) => {
  const forumId = req.params.id;
  const index = parseInt(req.params.index);

  if (!messages[forumId] || !messages[forumId][index]) {
    return res.status(404).send('Pesan tidak ditemukan');
  }

  messages[forumId].splice(index, 1); // Hapus pesan berdasarkan index

  res.redirect('/forum/admin');
};

exports.pinMessage = (req, res) => {
  const forumId = req.params.id;
  const index = parseInt(req.params.index);

  if (!messages[forumId] || !messages[forumId][index]) {
    return res.status(404).send('Message not found');
  }

  if (!pinnedMessages[forumId]) {
    pinnedMessages[forumId] = [];
  }

  const msg = messages[forumId][index];
  pinnedMessages[forumId].push(msg);

  res.redirect('/forum/admin');
};
