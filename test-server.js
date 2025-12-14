const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Test server is running!\n');
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`✅ Test server running on http://localhost:${PORT}`);
  console.log('Server is staying alive...');
});

// Keep alive
setInterval(() => {
  console.log(`Server alive at ${new Date().toLocaleTimeString()}`);
}, 5000);
