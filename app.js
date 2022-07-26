const express = require('express');
const fs = require('fs');
const app = express();

app.get('/', (req, res) => {
    return res.status(200).sendFile(__dirname + '/index.html');
});

app.listen(process.env.PORT, process.env.HOST, () => {
    console.log(`server running on ${process.env.HOST}:${process.env.PORT}`);
});