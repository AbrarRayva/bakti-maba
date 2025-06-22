const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Server is working!');
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Test server running at http://localhost:${PORT}`);
}); 