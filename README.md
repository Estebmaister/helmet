# Applied InfoSec Challenges for FCC project

=============================================

![GitHub package.json version][gh-pack-json-v] ![GitHub package.json dependency version express][gh-pack-json-dep-v-express] ![GitHub package.json dependency version helmet][gh-pack-json-dep-v-helmet] ![Last commit][last-commit-bdg] [![Website][website-bdg]][website] [![MIT License][license-bdg]][license] [![Twitter Follow][twitter-bdg]][twitter]
[![Workflow badge][workflow-bdg]][glitch-workflow] [![PRs Welcome][prs-bdg]][prs-site]

Created from the [FCC](https://freecodecamp.com) repository, to compile the lessons about node, express and helmet.

[![ko-fi](https://www.ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/F1F31OD9K)

Start with an empty repository and making the git init as follows:

```shell
git init
git clone https://github.com/Estebmaister/helmet.git
```

Adding the files from the original repo in FCC and start to coding.

## Scripts

To install all the dependencies :

```shell
npm install
```

To run the server

```shell
npm start
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
1. [Information Security with HelmetJS - Set a Content Security Policy with helmet.contentSecurityPolicy()](#10-information-security-with-helmetjs---set-a-content-security-policy-with-helmetcontentsecuritypolicy)
1. [Configure Helmet Using the 'parent' helmet() Middleware](#11-configure-helmet-using-the-parent-helmet-middleware)
1. [Get Data from POST Requests](#12-get-data-from-post-requests)

### 1. Install and Require Helmet

[Helmet](https://github.com/helmetjs/helmet) helps you secure your Express apps by setting various HTTP headers.

Install the Helmet package, then require it.

```shell
npm install helmet --save
```

- Added `helmet` dependency to package.json.
- Added `const helmet = require("helmet");` to myApp.js.

**[⬆ back to top](#table-of-contents)**

### 2. Hide Potentially Dangerous Information Using helmet.hidePoweredBy()

Hackers can exploit known vulnerabilities in Express/Node if they see that your site is powered by Express. X-Powered-By: Express is sent in every request coming from Express by default. The `helmet.hidePoweredBy()` middleware will remove the X-Powered-By header. You can also explicitly set the header to something else, to throw people off. e.g. `app.use(helmet.hidePoweredBy({ setTo: 'PHP 4.2.0' }))`

- Added to myApp.js `app.use(hidePoweredBy({ setTo: "PHP 4.2.0" }));`

**[⬆ back to top](#table-of-contents)**

### 3. Mitigate the Risk of Clickjacking with helmet.frameguard()

Your page could be put in a `<frame>` or `<iframe>` without your consent. This can result in [clickjacking attacks](https://en.wikipedia.org/wiki/Clickjacking), among other things. Clickjacking is a technique of tricking a user into interacting with a page different from what the user thinks it is. This can be obtained executing your page in a malicious context, by mean of iframing. In that context a hacker can put a hidden layer over your page. Hidden buttons can be used to run bad scripts. This middleware sets the X-Frame-Options header. It restricts who can put your site in a frame. It has three modes: DENY, SAMEORIGIN, and ALLOW-FROM.

We don’t need our app to be framed.

Use `helmet.frameguard()` passing with the configuration object `{action: 'deny'}`.

- Added to myApp.js `app.use(frameguard({ action: "deny" }));`

**[⬆ back to top](#table-of-contents)**

### 4. Mitigate the Risk of Cross Site Scripting (XSS) Attacks with helmet.xssFilter()

Cross-site scripting (XSS) is a frequent type of attack where malicious scripts are injected into vulnerable pages, with the purpose of stealing sensitive data like session cookies, or passwords.

The basic rule to lower the risk of an XSS attack is simple: “Never trust user’s input”. As a developer you should always sanitize all the input coming from the outside. This includes data coming from forms, GET query urls, and even from POST bodies. Sanitizing means that you should find and encode the characters that may be dangerous e.g. <, >.
More Info [here](<https://www.owasp.org/index.php/XSS_(Cross_Site_Scripting)_Prevention_Cheat_Sheet>).

Modern browsers can help mitigating the risk by adopting better software strategies. Often these are configurable via http headers.

The X-XSS-Protection HTTP header is a basic protection. The browser detects a potential injected script using a heuristic filter. If the header is enabled, the browser changes the script code, neutralizing it.

It still has limited support.

- Added to myApp.js `app.use(helmet.xssFilter());`

**[⬆ back to top](#table-of-contents)**

### 5. Avoid Inferring the Response MIME Type with helmet.noSniff()

Browsers can use content or MIME sniffing to adapt to different datatypes coming from a response. They override the Content-Type headers to guess and process the data. While this can be convenient in some scenarios, it can also lead to some dangerous attacks. This middleware sets the X-Content-Type-Options header to nosniff. This instructs the browser to not bypass the provided Content-Type.

- Added to myApp.js `app.use(helmet.noSniff());`

**[⬆ back to top](#table-of-contents)**

### 6. Prevent IE from Opening Untrusted HTML with helmet.ieNoOpen()

Some web applications will serve untrusted HTML for download. Some versions of Internet Explorer by default open those HTML files in the context of your site. This means that an untrusted HTML page could start doing bad things in the context of your pages. This middleware sets the X-Download-Options header to noopen. This will prevent IE users from executing downloads in the trusted site’s context.

- Added to myApp.js `app.use(helmet.ieNoOpen());`

**[⬆ back to top](#table-of-contents)**

### 7. Ask Browsers to Access Your Site via HTTPS Only with helmet.hsts()

HTTP Strict Transport Security (HSTS) is a web security policy which helps to protect websites against protocol downgrade attacks and cookie hijacking. If your website can be accessed via HTTPS you can ask user’s browsers to avoid using insecure HTTP. By setting the header Strict-Transport-Security, you tell the browsers to use HTTPS for the future requests in a specified amount of time. This will work for the requests coming after the initial request.

Configure `helmet.hsts()` to use HTTPS for the next 90 days. Pass the config object `{maxAge: timeInSeconds, force: true}`. Glitch already has hsts enabled. To override its settings you need to set the field "force" to true in the config object. We will intercept and restore the Glitch header, after inspecting it for testing.

- Added to myApp.js:

```node
const ninetyDaysInSeconds = 90 * 24 * 60 * 60;

app.use(helmet.hsts({ maxAge: ninetyDaysInSeconds, force: true }));
```

Note: Configuring HTTPS on a custom website requires the acquisition of a domain, and a SSL/TSL Certificate.

**[⬆ back to top](#table-of-contents)**

### 8. Disable DNS Prefetching with helmet.dnsPrefetchControl()

To improve performance, most browsers prefetch DNS records for the links in a page. In that way the destination ip is already known when the user clicks on a link. This may lead to over-use of the DNS service (if you own a big website, visited by millions people…), privacy issues (one eavesdropper could infer that you are on a certain page), or page statistics alteration (some links may appear visited even if they are not). If you have high security needs you can disable DNS prefetching, at the cost of a performance penalty.

- Added to myApp.js `app.use(helmet.dnsPrefetchControl());`

**[⬆ back to top](#table-of-contents)**

### 9. Disable Client-Side Caching with helmet.noCache()

If you are releasing an update for your website, and you want the users to always download the newer version, you can (try to) disable caching on client’s browser. It can be useful in development too. Caching has performance benefits, which you will lose, so only use this option when there is a real need.

- Added to myApp.js `app.use(helmet.noCache());` // Deprecated

- Cache-Control is a header that has many directives. For example, Cache-Control: max-age=864000 will tell browsers to cache the response for 10 days. In those 10 days, browsers will pull from their caches. Setting this header to Cache-Control: no-store, no-cache, must-revalidate, proxy-revalidate will obliterate caching, as far as this header is concerned.
- Surrogate-Control is another header that CDNs respect. You can use it to tell intermediate caches to eschew caching.
- Pragma is a legacy HTTP header. Setting Pragma: no-cache will tell supported browsers to stop caching the response. It has fewer features than Cache-Control but it can better support old browsers.
- Expires specifies when the content should be considered out of date, or expired. Setting this to 0 will tell browsers the content expires immediately. In other words, they shouldn’t cache it.

nocache is a relatively simple middleware that will set the four HTTP headers noted above: Cache-Control, Surrogate-Control, Pragma, and Expires.

```js
// Make sure you run "npm install nocache" to get the nocache package.
const noCache = require("nocache");

app.use(noCache());
```

This header is not included in the default Helmet bundle, and will be removed in future versions of Helmet.

**[⬆ back to top](#table-of-contents)**

### 10. Information Security with HelmetJS - Set a Content Security Policy with helmet.contentSecurityPolicy()

This challenge highlights one promising new defense that can significantly reduce the risk and impact of many type of attacks in modern browsers. By setting and configuring a Content Security Policy you can prevent the injection of anything unintended into your page. This will protect your app from XSS vulnerabilities, undesired tracking, malicious frames, and much more. CSP works by defining a whitelist of content sources which are trusted. You can configure them for each kind of resource a web page may need (scripts, stylesheets, fonts, frames, media, and so on…). There are multiple directives available, so a website owner can have a granular control. See [HTML 5 Rocks](http://www.html5rocks.com/en/tutorials/security/content-security-policy/), [KeyCDN](https://www.keycdn.com/support/content-security-policy/) for more details. Unfortunately CSP is unsupported by older browser.

By default, directives are wide open, so it’s important to set the defaultSrc directive as a fallback. Helmet supports both defaultSrc and default-src naming styles. The fallback applies for most of the unspecified directives.

In this exercise, use `helmet.contentSecurityPolicy()`, and configure it setting the `defaultSrc directive` to `["'self'"]` (the list of allowed sources must be in an array), in order to trust only your website address by default. Set also the `scriptSrc` directive so that you will allow scripts to be downloaded from your website, and from the domain 'trusted-cdn.com'.

Hint: in the `self` keyword, the single quotes are part of the keyword itself, so it needs to be enclosed in double quotes to be working.

- Added to myApp.js:

```node
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "trusted-cdn.com"],
    },
  })
);
```

**[⬆ back to top](#table-of-contents)**

### 11. Configure Helmet Using the 'parent' helmet() Middleware

`app.use(helmet())` will automatically include all the middleware introduced above, except `noCache()`, and `contentSecurityPolicy()`, but these can be enabled if necessary. You can also disable or configure any other middleware individually, using a configuration object.

#### Example:

```node
app.use(
  helmet({
    frameguard: {
      // configure
      action: "deny",
    },
    contentSecurityPolicy: {
      // enable and configure
      directives: {
        defaultSrc: ["self"],
        styleSrc: ["style.com"],
      },
    },
    dnsPrefetchControl: false, // disable
  })
);
```

We introduced each middleware separately for teaching purposes and for ease of testing. Using the ‘parent’ `helmet()` middleware is easy to implement in a real project.

Helmet is a collection of 12 smaller middleware functions that set HTTP response headers. Running app.use(helmet()) will not include all of these middleware functions by default.

<table>
<thead>
<tr>
<th>Module</th>
<th>Default?</th>
</tr>
</thead>
<tbody>
<tr>
<td><a href="https://helmetjs.github.io/docs/csp/" rel="nofollow">contentSecurityPolicy</a> for setting Content Security Policy</td>
<td></td>
</tr>
<tr>
<td><a href="https://helmetjs.github.io/docs/crossdomain/" rel="nofollow">crossdomain</a> for handling Adobe products' crossdomain requests</td>
<td></td>
</tr>
<tr>
<td><a href="https://helmetjs.github.io/docs/dns-prefetch-control" rel="nofollow">dnsPrefetchControl</a> controls browser DNS prefetching</td>
<td>✓</td>
</tr>
<tr>
<td><a href="https://helmetjs.github.io/docs/expect-ct/" rel="nofollow">expectCt</a> for handling Certificate Transparency</td>
<td></td>
</tr>
<tr>
<td><a href="https://helmetjs.github.io/docs/feature-policy/" rel="nofollow">featurePolicy</a> to limit your site's features</td>
<td></td>
</tr>
<tr>
<td><a href="https://helmetjs.github.io/docs/frameguard/" rel="nofollow">frameguard</a> to prevent clickjacking</td>
<td>✓</td>
</tr>
<tr>
<td><a href="https://helmetjs.github.io/docs/hide-powered-by" rel="nofollow">hidePoweredBy</a> to remove the X-Powered-By header</td>
<td>✓</td>
</tr>
<tr>
<td><a href="https://helmetjs.github.io/docs/hsts/" rel="nofollow">hsts</a> for HTTP Strict Transport Security</td>
<td>✓</td>
</tr>
<tr>
<td><a href="https://helmetjs.github.io/docs/ienoopen" rel="nofollow">ieNoOpen</a> sets X-Download-Options for IE8+</td>
<td>✓</td>
</tr>
<tr>
<td><a href="https://helmetjs.github.io/docs/dont-sniff-mimetype" rel="nofollow">noSniff</a> to keep clients from sniffing the MIME type</td>
<td>✓</td>
</tr>
<tr>
<td><a href="https://helmetjs.github.io/docs/referrer-policy" rel="nofollow">referrerPolicy</a> to hide the Referer header</td>
<td></td>
</tr>
<tr>
<td><a href="https://helmetjs.github.io/docs/xss-filter" rel="nofollow">xssFilter</a> adds some small XSS protections</td>
<td>✓</td>
</tr>
</tbody>
</table>

You can see more in <a href="https://helmetjs.github.io/docs/" rel="nofollow">the documentation</a>.

**[⬆ back to top](#table-of-contents)**

### 12. Understand BCrypt Hashes

For the following challenges, you will be working with a new starter project that is different from the previous one. You can find the new starter project on Glitch, or clone it from GitHub.

BCrypt hashes are very secure. A hash is basically a fingerprint of the original data- always unique. This is accomplished by feeding the original data into an algorithm and returning a fixed length result. To further complicate this process and make it more secure, you can also salt your hash. Salting your hash involves adding random data to the original data before the hashing process which makes it even harder to crack the hash.

BCrypt hashes will always looks like `$2a$13$ZyprE5MRw2Q3WpNOGZWGbeG7ADUre1Q8QO.uUUtcbqloU0yvzavOm` which does have a structure. The first small bit of data `$2a` is defining what kind of hash algorithm was used. The next portion `$13` defines the cost. Cost is about how much power it takes to compute the hash. It is on a logarithmic scale of 2^cost and determines how many times the data is put through the hashing algorithm. For example, at a cost of 10 you are able to hash 10 passwords a second on an average computer, however at a cost of 15 it takes 3 seconds per hash... and to take it further, at a cost of 31 it would takes multiple days to complete a hash. A cost of 12 is considered very secure at this time. The last portion of your hash `$ZyprE5MRw2Q3WpNOGZWGbeG7ADUre1Q8QO.uUUtcbqloU0yvzavOm`, looks like one large string of numbers, periods, and letters but it is actually two separate pieces of information. The first 22 characters is the salt in plain text, and the rest is the hashed password!

To begin using BCrypt, add it as a dependency in your project and require it as 'bcrypt' in your server.

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

[website]: https://helmet-esteb.glitch.me
[website-bdg]: https://img.shields.io/website?down_color=violet&down_message=sleeping&label=servidor&logo=glitch&logoColor=white&style=plastic&up_color=green&up_message=online&url=https%3A%2F%2Fhelmet-esteb.glitch.me
[workflow-bdg]: https://github.com/estebmaister/helmet/workflows/Glitch%20Sync/badge.svg
[glitch-workflow]: https://github.com/Estebmaister/helmet/blob/master/.github/workflows/main.yml
