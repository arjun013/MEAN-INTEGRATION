const express = require("express");
const cors = require("cors");
const addProductRouter = require("./src/routes/addProduct");
const authRouter = require("./src/routes/authRouter");

const app = new express();

app.use(cors())
app.use(express.json());
app.use('/insert',addProductRouter);
app.use('/auth',authRouter);

const port = 8000;
app.listen(port,() => console.log(`Listening on ${port}`));
