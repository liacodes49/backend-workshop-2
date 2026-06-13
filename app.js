const express = require('express');
const app = express();
const db = require('./config/db');
const userRoutes = require('./routes/user');

app.use(express.json());

app.use('/user', userRoutes);
app.get('/', (req, res) => {
    res.send("Hello World");
});

app.listen(3000, () => {
    console.log("Server started on port 3000");
});