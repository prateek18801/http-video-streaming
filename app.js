const express = require('express');
const fs = require('fs');
const app = express();

app.get('/', (req, res) => {
    return res.status(200).sendFile(__dirname + '/index.html');
});

app.get('/video', (req, res) => {
    
    // range of content is required
    const range = req.headers.range;
    if (!range) {
        return res.status(400).send('request required range header');
    }

    const filepath = 'data/sample.mp4';
    const filesize = fs.statSync('data/sample.mp4').size;

    // parse range (Example: "bytes=82733-")
    // create 1MiB chunks
    const CHUNK_SIZE = 10 ** 6;
    const start = +(range.replace(/\D/g, ''));
    const end = Math.min(start + CHUNK_SIZE, filesize - 1);

    const headers = {
        "Content-Range": `bytes ${start}-${end}/${filesize}`,
        "Accept-Ranges": 'bytes',
        "Content-Length": end - start + 1,
        "Content-Type": 'video/mp4'
    };

    res.writeHead(206, headers);

    // create video stream and pipe to response
    const filestream = fs.createReadStream(filepath, { start, end });
    filestream.pipe(res);
});

app.listen(process.env.PORT, process.env.HOST, () => {
    console.log(`server running on ${process.env.HOST}:${process.env.PORT}`);
});