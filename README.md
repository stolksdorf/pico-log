# pico-log
An incredibly tiny javascript logging library.

[![NPM](https://nodei.co/npm/pico-log.png)](https://nodei.co/npm/pico-log/)

`pico-log` was inspired by the lovely package [`loglevel`](https://www.npmjs.com/package/loglevel). However `loglevel` lacks one key feature, the ability to set your own logging functions. `pico-log` implements the best parts of `loglevel`, with this feature added.


## install

```
npm install --save pico-log
```

## features

- **32 lines of code**
- Log on 5 different levels, `trace`, `debug`, `info`, `warn`, `error`
- Doesn't use wrappers so it maintains stack trace integrity
- Able to overwrite the logging function at each level
- Attempts to use the most appropriate `console` function, falls back onto `console.log`
- Defaults to `warn` level, so if you forget to set a level your production enviroment won't explode with logs



## documentation

### usage

```javascript
const log = require('pico-log');
log.setLevel('info');

log.debug('Fancy message', false, 6, { nifty : true})
```

### logging

- `log.trace(arg1, arg2,...)`
- `log.debug(arg1, arg2,...)`
- `log.info(arg1, arg2,...)`
- `log.warn(arg1, arg2,...)`
- `log.error(arg1, arg2,...)`

### `log.setLevel(level)`

Disable logging below the specified level. `level` can be the following:

- Internal log level, eg. `log.levels.SILENT`
- Case-insenstive string, eg. 'error'
- Numerical index from 0 (trace) to 5 (silent)


### `log.getLevel()`

Returns the current log level as a number, 0 (trace) to 5 (silent).


### `log.levels`

Access to `pico-log`s internal log level list, eg. `log.levels.WARN == 3`



### overwriting log methods

To overwrite a log method, simply assign the function you want to run into the library, eg.

```javascript
log.debug = (...args)=>{
    console.log('DEBUG', ...args);
}

log.debug('test');
```

**Note:** After you overwrite a method, it will log regardless of the level set until `log.setLevel()` is called. `pico-log` caches the logging methods when you set the level and then switches the available methods based on the log level.

If you care about your stacktraces, try not to use wrapper functions when overwriting log methods as best as you can. They will clutter up your stacktraces.
