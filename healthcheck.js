const http = require('http');

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/',
  method: 'GET'
};

const req = http.request(options, res => {
  if (res.statusCode === 200) {
    console.log('App is healthy');
    process.exit(0);
  } else {
    console.error('App is unhealthy');
    process.exit(1);
  }
});

req.on('error', error => {
  console.error('Error reaching the app:', error);
  process.exit(1);
});

req.end();
