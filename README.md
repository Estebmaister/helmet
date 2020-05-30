# Free Code Camp - Applied InfoSec Challenges

=============================================

![GitHub package.json version][gh-pack-json-v] ![GitHub package.json dependency version express][gh-pack-json-dep-v-express] ![GitHub package.json dependency version helmet][gh-pack-json-dep-v-helmet] ![Last commit][last-commit-bdg] [![Website][website-bdg]][website] [![MIT License][license-bdg]][license] [![Twitter Follow][twitter-bdg]][twitter]
[![Workflow badge][workflow-bdg]][glitch-workflow] [![PRs Welcome][prs-bdg]][prs-site]

Created from the [FCC](https://freecodecamp.com) repository, to compile the lessons about node, express and helmet.

[![ko-fi](https://www.ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/F1F31OD9K)

Start with an empty repository and making the git init as follows:

```git
git init
git clone https://github.com/Estebmaister/helmet.git
```

Adding the files from the original repo in FCC and start to coding.

## Scripts

To install all the dependencies :

```npm
npm install
```

To run the server

```node
node server.js
```

## Challenges

### Table of Contents

1. [Install and Require Helmet](#1-install-and-require-helmet)
1. [Hide Potentially Dangerous Information Using helmet.hidePoweredBy()](#2-hide-potentially-dangerous-information-using-helmethidepoweredby)
1. [Mitigate the Risk of Clickjacking with helmet.frameguard()](#3-mitigate-the-risk-of-clickjacking-with-helmetframeguard)
1. [Mitigate the Risk of Cross Site Scripting (XSS) Attacks with helmet.xssFilter()](#4-mitigate-the-risk-of-cross-site-scripting-xss-attacks-with-helmetxssfilter)
1. [Avoid Inferring the Response MIME Type with helmet.noSniff()](#5-avoid-inferring-the-response-mime-type-with-helmetnosniff)
1. [Prevent IE from Opening Untrusted HTML with helmet.ieNoOpen()](#6-prevent-ie-from-opening-untrusted-html-with-helmetienoopen)
1. [Ask Browsers to Access Your Site via HTTPS Only with helmet.hsts()](#7-ask-browsers-to-access-your-site-via-https-only-with-helmethsts)
1. [Disable DNS Prefetching with helmet.dnsPrefetchControl()](#8-disable-dns-prefetching-with-helmetdnsprefetchcontrol)
1. [Disable Client-Side Caching with helmet.noCache()](#9-disable-client-side-caching-with-helmetnocache)
1. [Get Query Parameter Input from the Client](#10-get-query-parameter-input-from-the-client)
1. [Use body-parser to Parse POST Requests](#11-use-body-parser-to-parse-post-requests)
1. [Get Data from POST Requests](#12-get-data-from-post-requests)

### 1. Install and Require Helmet

Helmet helps you secure your Express apps by setting various HTTP headers.

Install the Helmet package, then require it.

- Added `helmet` dependency to package.json.
- Added `const helmet = require("helmet");` to myApp.js.

**[⬆ back to top](#table-of-contents)**

### 2. Hide Potentially Dangerous Information Using helmet.hidePoweredBy()

Hackers can exploit known vulnerabilities in Express/Node if they see that your site is powered by Express. X-Powered-By: Express is sent in every request coming from Express by default. The `helmet.hidePoweredBy()` middleware will remove the X-Powered-By header. You can also explicitly set the header to something else, to throw people off. e.g. `app.use(helmet.hidePoweredBy({ setTo: 'PHP 4.2.0' }))`

**[⬆ back to top](#table-of-contents)**

### 3. Mitigate the Risk of Clickjacking with helmet.frameguard()

Your page could be put in a `<frame>` or `<iframe>` without your consent. This can result in clickjacking attacks, among other things. Clickjacking is a technique of tricking a user into interacting with a page different from what the user thinks it is. This can be obtained executing your page in a malicious context, by mean of iframing. In that context a hacker can put a hidden layer over your page. Hidden buttons can be used to run bad scripts. This middleware sets the X-Frame-Options header. It restricts who can put your site in a frame. It has three modes: DENY, SAMEORIGIN, and ALLOW-FROM.

We don’t need our app to be framed.

Use `helmet.frameguard()` passing with the configuration object `{action: 'deny'}`.

**[⬆ back to top](#table-of-contents)**

### 4. Mitigate the Risk of Cross Site Scripting (XSS) Attacks with helmet.xssFilter()

Cross-site scripting (XSS) is a frequent type of attack where malicious scripts are injected into vulnerable pages, with the purpose of stealing sensitive data like session cookies, or passwords.

The basic rule to lower the risk of an XSS attack is simple: “Never trust user’s input”. As a developer you should always sanitize all the input coming from the outside. This includes data coming from forms, GET query urls, and even from POST bodies. Sanitizing means that you should find and encode the characters that may be dangerous e.g. <, >.

Modern browsers can help mitigating the risk by adopting better software strategies. Often these are configurable via http headers.

The X-XSS-Protection HTTP header is a basic protection. The browser detects a potential injected script using a heuristic filter. If the header is enabled, the browser changes the script code, neutralizing it.

It still has limited support.

**[⬆ back to top](#table-of-contents)**

### 5. Avoid Inferring the Response MIME Type with helmet.noSniff()

Browsers can use content or MIME sniffing to adapt to different datatypes coming from a response. They override the Content-Type headers to guess and process the data. While this can be convenient in some scenarios, it can also lead to some dangerous attacks. This middleware sets the X-Content-Type-Options header to nosniff. This instructs the browser to not bypass the provided Content-Type.

**[⬆ back to top](#table-of-contents)**

### 6. Prevent IE from Opening Untrusted HTML with helmet.ieNoOpen()

Some web applications will serve untrusted HTML for download. Some versions of Internet Explorer by default open those HTML files in the context of your site. This means that an untrusted HTML page could start doing bad things in the context of your pages. This middleware sets the X-Download-Options header to noopen. This will prevent IE users from executing downloads in the trusted site’s context.

**[⬆ back to top](#table-of-contents)**

### 7. Ask Browsers to Access Your Site via HTTPS Only with helmet.hsts()

HTTP Strict Transport Security (HSTS) is a web security policy which helps to protect websites against protocol downgrade attacks and cookie hijacking. If your website can be accessed via HTTPS you can ask user’s browsers to avoid using insecure HTTP. By setting the header Strict-Transport-Security, you tell the browsers to use HTTPS for the future requests in a specified amount of time. This will work for the requests coming after the initial request.

Configure `helmet.hsts()` to use HTTPS for the next 90 days. Pass the config object `{maxAge: timeInSeconds, force: true}`. Glitch already has hsts enabled. To override its settings you need to set the field "force" to true in the config object. We will intercept and restore the Glitch header, after inspecting it for testing.

Note: Configuring HTTPS on a custom website requires the acquisition of a domain, and a SSL/TSL Certificate.

**[⬆ back to top](#table-of-contents)**

### 8. Disable DNS Prefetching with helmet.dnsPrefetchControl()

To improve performance, most browsers prefetch DNS records for the links in a page. In that way the destination ip is already known when the user clicks on a link. This may lead to over-use of the DNS service (if you own a big website, visited by millions people…), privacy issues (one eavesdropper could infer that you are on a certain page), or page statistics alteration (some links may appear visited even if they are not). If you have high security needs you can disable DNS prefetching, at the cost of a performance penalty.

Use `helmet.dnsPrefetchControl()`

**[⬆ back to top](#table-of-contents)**

### 9. Disable Client-Side Caching with helmet.noCache()

If you are releasing an update for your website, and you want the users to always download the newer version, you can (try to) disable caching on client’s browser. It can be useful in development too. Caching has performance benefits, which you will lose, so only use this option when there is a real need.

Use `helmet.noCache()`

**[⬆ back to top](#table-of-contents)**

### 10. Get Query Parameter Input from the Client

Another common way to get input from the client is by encoding the data after the route path, using a query string. The query string is delimited by a question mark (?), and includes field=value couples. Each couple is separated by an ampersand (&). Express can parse the data from the query string, and populate the object req.query. Some characters, like the percent (%), cannot be in URLs and have to be encoded in a different format before you can send them. If you use the API from JavaScript, you can use specific methods to encode/decode these characters.

```node
route_path: '/library'
actual_request_URL: '/library?userId=546&bookId=6754'
req.query: {userId: '546', bookId: '6754'}
```

- Added to myApp.js:

```node
app
  .route("/name")
  .get((req, res) => res.json({ name: `${req.query.first} ${req.query.last}` }))
  .post();
```

**[⬆ back to top](#table-of-contents)**

### 11. Use body-parser to Parse POST Requests

Besides GET, there is another common HTTP verb, it is POST. POST is the default method used to send client data with HTML forms. In REST convention, POST is used to send data to create new items in the database (a new user, or a new blog post). You don’t have a database in this project, but you are going to learn how to handle POST requests anyway.

In these kind of requests, the data doesn’t appear in the URL, it is hidden in the request body. This is a part of the HTML request, also called payload. Since HTML is text-based, even if you don’t see the data, it doesn’t mean that it is secret. The raw content of an HTTP POST request is shown below:

```http
POST /path/subpath HTTP/1.0
From: john@example.com
User-Agent: someBrowser/1.0
Content-Type: application/x-www-form-urlencoded
Content-Length: 20
name=John+Doe&age=25
```

As you can see, the body is encoded like the query string. This is the default format used by HTML forms. With Ajax, you can also use JSON to handle data having a more complex structure. There is also another type of encoding: multipart/form-data. This one is used to upload binary files. In this exercise, you will use a urlencoded body. To parse the data coming from POST requests, you have to install the `body-parser` package. This package allows you to use a series of middleware, which can decode data in different formats.

- Installed `body-parser` module in `package.json`.
- Added `const bodyParser = require("body-parser")` to the top of myApp.js file.
- Added the following code to myApp.js: `app.use(bodyParser.urlencoded({ extended: false }));`

**[⬆ back to top](#table-of-contents)**

### 12. Get Data from POST Requests

Mount a POST handler at the path `/name`. It’s the same path as before. We have prepared a form in the html frontpage. It will submit the same data of exercise 10 (Query string). If the body-parser is configured correctly, you should find the parameters in the object `req.body`. Have a look at the usual library example:

```node
route: POST '/library'
urlencoded_body: userId=546&bookId=6754
req.body: {userId: '546', bookId: '6754'}
```

Respond with the same JSON object as before: `{name: 'firstname lastname'}`. Test if your endpoint works using the html form we provided in the app frontpage.

Tip: There are several other http methods other than GET and POST. And by convention there is a correspondence between the http verb, and the operation you are going to execute on the server. The conventional mapping is:

POST (sometimes PUT) - Create a new resource using the information sent with the request,

GET - Read an existing resource without modifying it,

PUT or PATCH (sometimes POST) - Update a resource using the data sent,

DELETE => Delete a resource.

There are also a couple of other methods which are used to negotiate a connection with the server. Except from GET, all the other methods listed above can have a payload (i.e. the data into the request body). The body-parser middleware works with these methods as well.

**[⬆ back to top](#table-of-contents)**

<!-- General links -->

[changelog]: ./CHANGELOG.md
[version-bdg]: https://img.shields.io/badge/version-1.0.0-blue.svg?style=plastic
[license]: ./LICENSE
[prs-bdg]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat
[prs-site]: (https://egghead.io/courses/how-to-contribute-to-an-open-source-project-on-github)
[twitter]: https://twitter.com/estebmaister
[twitter-bdg]: https://img.shields.io/twitter/follow/estebmaister?label=Follow&style=social

<!-- Repo badges links -->

[license-bdg]: https://img.shields.io/github/license/estebmaister/helmet?style=plastic
[last-commit-bdg]: https://img.shields.io/github/last-commit/estebmaister/helmet?style=plastic&logo=git&logoColor=white
[language-count-bdg]: https://img.shields.io/github/languages/count/estebmaister/helmet?style=plastic&logo=visual-studio-code
[top-language-bdg]: https://img.shields.io/github/languages/top/estebmaister/helmet?style=plastic&logo=freecodecamp
[repo-size-bdg]: https://img.shields.io/github/repo-size/estebmaister/helmet?style=plastic
[code-size-bdg]: https://img.shields.io/github/languages/code-size/estebmaister/helmet?style=plastic
[gh-pack-json-v]: https://img.shields.io/github/package-json/v/estebmaister/helmet?color=blue&style=plastic&logo=github
[gh-pack-json-dep-v-express]: https://img.shields.io/github/package-json/dependency-version/estebmaister/helmet/express?style=plastic&logo=express
[gh-pack-json-dep-v-helmet]: https://img.shields.io/github/package-json/dependency-version/estebmaister/helmet/helmet?style=plastic&logo=helmet

<!-- Glitch web and workflow -->

[website]: https://node-esteb.glitch.me
[website-bdg]: https://img.shields.io/website?down_color=violet&down_message=sleeping&label=servidor&logo=glitch&logoColor=white&style=plastic&up_color=green&up_message=online&url=https%3A%2F%2Fnode-esteb.glitch.me
[workflow-bdg]: https://github.com/estebmaister/helmet/workflows/Glitch%20Sync/badge.svg
[glitch-workflow]: https://github.com/Estebmaister/helmet/blob/master/.github/workflows/main.yml
