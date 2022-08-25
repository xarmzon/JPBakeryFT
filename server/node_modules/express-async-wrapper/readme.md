# express-async-wrapper

> Wrap async express routes so exceptions can be caught by middleware.

If you're using the awesome ES7/ES2017 `async`/`await` features in your express routes, you'll notice that when a route throws an exception it times out. This wrapper allows express to properly catch exceptions and pass them to the appropriate error handler instead.

This code was borrowed from the [StrongLoop blog post](https://strongloop.com/strongblog/async-error-handling-expressjs-es7-promises-generators/#usinges7asyncawait) on handling `async`/`await` routes in express, I take no credit for coming up with this solution, I just wanted an npm module to use in my apps.


## Install

```bash
# With npm
npm install  --save express-async-wrapper

# With yarn
yarn add express-async-wrapper
```


## Usage

If you have a `async` express route file, like so:

```js
const wrap = require('express-async-wrapper')

module.exports = wrap(async (req, res) => {
  const msg = await someSlowNetworkThingy()
  res.send('Hello', msg)
})
```

Now your route properly returns a promise object for express that will catch any throw exceptions.


## Changelog

### v0.1.0

- Initial release! 🎉 🍾


## Credits

Licensed under an MIT license by [Dana Woodman](http://danawoodman.com).

Original source code by StrongLoop (see [here](https://strongloop.com/strongblog/async-error-handling-expressjs-es7-promises-generators/#usinges7asyncawait))

Pull requests welcome!
