const express = require('express');
const ProductRouter = require ('./router/router.products.js');
const CartRouter = require ('./router/router.carts.js');


const app = express();

app.use(express.urlencoded({extended: true}));

app.use('/products', ProductRouter);
app.use('/carts', CartRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`SERVER LISTENING ${PORT}`);
});
