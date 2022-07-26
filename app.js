const express = require('express');
const fs = require('fs');
const app = express();

app.listen(process.env.PORT, process.env.HOST, () => {
    console.log(`server running on ${process.env.HOST}:${process.env.PORT}`);
});