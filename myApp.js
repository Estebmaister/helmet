/** - Challenges - *
 ********************/

/** 1) Install and require `helmet` */

const express = require("express"); // Do Not Edit
const app = express(); // Do Not Edit
const path = require("path");
const helmet = require("helmet");
const noCache = require("nocache");

/** 2) Hide potentially dangerous information - `helmet.hidePoweredBy()` */

// app.use(helmet.hidePoweredBy({ setTo: "PHP 4.2.0" }));

/** 3) Mitigate the risk of clickjacking - `helmet.frameguard()` */

// app.use(helmet.frameguard({ action: "deny" }));

/** 4) Mitigate the risk of XSS - `helmet.xssFilter()` */

// app.use(helmet.xssFilter());

/** 5) Avoid inferring the response MIME type - `helmet.noSniff()` */

// app.use(helmet.noSniff());

/** 6) Prevent IE from opening *untrusted* HTML - `helmet.ieNoOpen()` */

// app.use(helmet.ieNoOpen());

/**  7) Ask browsers to access your site via HTTPS only - `helmet.hsts()` */

// const ninetyDaysInSeconds = 90 * 24 * 60 * 60;

// app.use(helmet.hsts({ maxAge: ninetyDaysInSeconds, force: true }));

/** 8) Disable DNS Prefetching - `helmet.dnsPrefetchControl()` */

// app.use(helmet.dnsPrefetchControl());

/** 9) Disable Client-Side Caching - `helmet.noCache()` */

// app.use(helmet.noCache());

/** 10) Content Security Policy - `helmet.contentSecurityPolicy()` */

// app.use(
//   helmet.contentSecurityPolicy({
//     directives: {
//       defaultSrc: ["'self'"],
//       scriptSrc: ["'self'", "trusted-cdn.com"],
//     },
//   })
// );

/** TIP: */

// 10) `app.use(helmet())` will automatically include all the middleware
// presented above, except `noCache()`, and `contentSecurityPolicy()`,
// but these can be enabled if necessary. You can also disable or
// set any other middleware individually, using a configuration object.

app.use(noCache());

const ninetyDaysInSeconds = 90 * 24 * 60 * 60;

app.use(
  helmet({
    hidePoweredBy: {
      // configure
      setTo: "PHP 4.2.0",
    },
    frameguard: {
      // configure
      action: "deny",
    },
    contentSecurityPolicy: {
      // enable and configure
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "style.com"],
        scriptSrc: ["'self'", "trusted-cdn.com"],
        fontSrc: ["'self'", "data:"],
        imgSrc: ["'self'", "data:"],
      },
    },
    dnsPrefetchControl: false, // disable
    // noCache: true, // deprecated and will be removed in helmet@4
    hsts: { maxAge: ninetyDaysInSeconds, force: true },
  })
);

// We introduced each middleware separately, for teaching purpose, and for
// ease of testing. Using the 'parent' `helmet()` middleware is easiest, and
// cleaner, for a real project.

app.get("/", (request, response) =>
  response.sendFile(path.join(__dirname, "views", "index.html"))
);

app.use(express.static(path.join(__dirname, "public")));

app.get("/ip", (req, res) => {
  console.log(req.ip);
  let ip = req.ip.split(":");
  let ip_details = req.socket.address();
  console.log(ip_details); // { address: '::ffff:127.0.0.1', family: 'IPv6', port: 3000
  ip[3] ? res.json({ ip: ip[3] }) : res.json({ ip: ip[0] });
});

const listener = app.listen(process.env.PORT || 3000, "localhost", () =>
  console.log(
    `Your app is listening at http://${listener.address().address}:${
      listener.address().port
    }`
  )
);

// ---- DO NOT EDIT BELOW THIS LINE ---------------------------------------

module.exports = app;
const api = require("./server.js");
app.disable("strict-transport-security");
app.use("/_api", api);
