# HTTP Video Streaming using NodeJS
Create a **data** folder in the root directory with a **sample.mp4** file to stream.

## Using nodejs streams

1. **Get file path and size using the *fs* module**
```
const filepath = 'data/sample.mp4';
const filesize = fs.statSync('data/sample.mp4').size;
```

2. **Set chunk size (1MiB), start and end bytes**
```
const CHUNK_SIZE = 10 ** 6;
const start = +(range.replace(/\D/g, ''));
const end = Math.min(start + CHUNK_SIZE, filesize - 1);
```

3. **Set and attach response headers with status 206 (partial content)**
```
const headers = {
    "Content-Range": `bytes ${start}-${end}/${filesize}`,
    "Accept-Ranges": 'bytes',
    "Content-Length": end - start + 1,
    "Content-Type": 'video/mp4'
};

res.writeHead(206, headers);
```

4. **Create file read stream and pipe it to response**
```
const filestream = fs.createReadStream(filepath, { start, end });
filestream.pipe(res);
```

---

### scripts

- `npm start` : *start server*
- `npm run dev` : *start server with nodemon*

### dotenv content

```
NODE_ENV=dev
HOST=127.0.0.1
PORT=3000
```