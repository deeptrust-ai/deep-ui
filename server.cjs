const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.env.PORT || 3000;
const ROOT = path.join(__dirname, 'storybook-static');

const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.js': 'text/javascript',
  '.mjs': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.eot': 'application/vnd.ms-fontobject',
  '.map': 'application/json',
  '.webp': 'image/webp',
  '.txt': 'text/plain',
  '.xml': 'application/xml',
};

function serveFile(filePath, res) {
  const ext = path.extname(filePath);
  const mime = MIME_TYPES[ext] || 'application/octet-stream';
  const headers = { 'Content-Type': mime };

  // Prevent caching of HTML files to avoid stale redirect caches
  if (ext === '.html') {
    headers['Cache-Control'] = 'no-cache, no-store, must-revalidate';
  } else {
    headers['Cache-Control'] = 'public, max-age=31536000, immutable';
  }

  const stream = fs.createReadStream(filePath);
  stream.on('error', () => {
    if (!res.headersSent) {
      res.writeHead(500);
    }
    res.end('Internal Server Error');
  });
  stream.on('open', () => {
    res.writeHead(200, headers);
    stream.pipe(res);
  });
}

const server = http.createServer((req, res) => {
  const parsed = url.parse(req.url);
  let pathname;
  try {
    pathname = decodeURIComponent(parsed.pathname);
  } catch {
    res.writeHead(400);
    res.end('Bad Request');
    return;
  }

  // Resolve file path (no URL rewriting, no clean URLs)
  let filePath = path.join(ROOT, pathname);

  // Prevent directory traversal
  if (!filePath.startsWith(ROOT + path.sep) && filePath !== ROOT) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  // Serve root as index.html
  if (pathname === '/') {
    filePath = path.join(ROOT, 'index.html');
  }

  fs.stat(filePath, (err, stats) => {
    if (!err && stats.isFile()) {
      serveFile(filePath, res);
      return;
    }

    // If directory, try index.html inside it
    if (!err && stats.isDirectory()) {
      const indexPath = path.join(filePath, 'index.html');
      fs.stat(indexPath, (err2, stats2) => {
        if (!err2 && stats2.isFile()) {
          serveFile(indexPath, res);
        } else {
          res.writeHead(404);
          res.end('Not Found');
        }
      });
      return;
    }

    // Fallback: try appending .html (handles cached 301 redirects from
    // previous serve deployment that stripped .html extensions)
    const htmlPath = filePath + '.html';
    fs.stat(htmlPath, (err2, stats2) => {
      if (!err2 && stats2.isFile()) {
        serveFile(htmlPath, res);
      } else {
        res.writeHead(404);
        res.end('Not Found');
      }
    });
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Storybook static server running on port ${PORT}`);
});
