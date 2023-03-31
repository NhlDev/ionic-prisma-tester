const express = require('express');
const app = express();
const port = process.env.PORT || 8100

app.use('/', express.static('./www'));
app.listen(port, () => console.log('servidor express iniciado, puerto: ' + port));
