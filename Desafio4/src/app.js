const express = require('express');
const router = require('./router/router.products'); 

const PORT = process.env.PORT || 3001;

const app = express()
app.use(express.json());

app.use(router);

app.listen(PORT, () => {
    console.log(`SERVER LISTENING ${PORT}`);
});