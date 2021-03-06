`use strict`;

const http = require(`http`);
const pug = require(`pug`);
const server = http.createServer((req, res) => {
    const now = new Date();
    console.info(`[${now}] Requested by ${req.connection.remoteAddress}`)
    res.writeHead(200, {
        'Content-Type': `text/html; charset=utf-8`
    });
    switch (req.method) {
        case `GET`:
            if (req.url === `/enquetes/yaki-shabu`) {
                res.write(pug.renderFile('./form.pug', {
                    path: req.url,
                    firstItem: `焼き肉`,
                    secondItem: `しゃぶしゃぶ`
                }));
                res.end();
            }
            if (req.url === `/enquetes/rice-bread`) {
                res.write(pug.renderFile('./form.pug', {
                    path: req.url,
                    firstItem: `ごはん`,
                    secondItem: `パン`
                }));
                res.end();
            }
            break;
        case `POST`:
            let rawData = ``;
            req.on(`data`, (chunk) => {
                rawData = rawData + chunk;
            }).on(`end`, () => {
                const decoded = decodeURIComponent(rawData);
                console.info(`[${now}] 投稿: ${decoded}`);
                res.write(`<!DOCTYPE html>
                <html lang="ja">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>アンケート</title>
                </head>
                <body>
                <h1>${decoded}が投稿されました</h1>
                </body>`);
                res.end();
            });
            break;
        case `PUT`:
            res.write(`PUT ${req.url}`)
            break;
        case `DELETE`:
            res.write(`DELETE ${req.url}`)
            break;
        default:
    }
}).on(`error`, (e) => {
    console.error(`[${new Date()}] Server Error`, e);
}).on(`clientError`, (e) => {
    console.error(`[${new Date()}] Client Error`, e);
});

const port = 8000;
server.listen(port, () => {
    console.info(`[${new Date()}] Listening on ${port}`);
});
