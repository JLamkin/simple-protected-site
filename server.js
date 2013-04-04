var connect = require('connect');

var port = 8080;
if (process.env.PORT) port = parseInt(process.env.PORT);

var username = process.env.SPS_USERNAME || 'guest';
var password = process.env.SPS_PASSWORD || 'letmein';

// custom middleware

var _passThrough = function(req, res, next) { next(); };
var _forceSSL = function(req, res, next) {
  if ('https' == req.req.headers['x-forwarded-proto']) {
    next();
  } else {
    var url = "https://" + req.headers['host'] + req.url;
    res.statusCode = 301;
    res.setHeader('Location', url);
    res.end('Redirecting to ' + url);
  }
};

// use the _forceSSL middleware if the FORCE_SSL environment variable is true-ish
var forceSSL = (process.env.SPS_FORCE_SSL)
             ? _forceSSL
             : _passThrough;

// configure the app with its middleware
var app = connect()
  .use(connect.logger('default'))
  .use(forceSSL)
  .use(connect.basicAuth(username, password))
  .use(connect.static('public'))
  .use(function(req, res) {
    console.log("No file found");
    response.writeHead(404);
    response.end('Not Found');
  });

// start listening on the port
console.log("Listening on port", port);
app.listen(port);
