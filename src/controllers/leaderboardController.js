exports.showLeaderboard = (req, res) => {
  const username = req.user?.username || 'User1';

  const leaderboard = [
    { username: "User1", points: 1000 },
    { username: "User2", points: 950 },
    { username: "User3", points: 900 },
  ];

  const userPoints = leaderboard.find(u => u.username === username)?.points || 0;

  res.render('leaderboard', {
    username,
    userPoints,
    leaderboard
  });
};
