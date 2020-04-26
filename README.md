# react-native-secret-config

## Backround
By default, when your build react native, you can find bundle file on `assets/index.android.bundle` then you can find all config on the bundle file, hmmm.
This module, move config to native.

## Getting started
`$ yarn add react-native-secret-config`

## Setup
On your root project, create file `secret-config.json`, then create your json file, exsample like this
```json
{

  "api" : "https://api.api",
  "key" : "key",
  "secret-config": true,
  "version" : "1.0.0"
}
```

Then on root project, `$ node node_modules/react-native-secret-config/src/cli/index.js`

## Usage
```javascript
import CONFIG from 'react-native-secret-config';
console.log(CONFIG);
```


## Credit
* https://www.npmjs.com/package/create-react-native-module
