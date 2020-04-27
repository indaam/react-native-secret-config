# react-native-secret-config

## Backround
By default, when your build react native, you can find bundle file on `assets/index.android.bundle` then you can find all config on the bundle file, hmmm.
This module, move config to native.

## Getting started
```shell
yarn add react-native-secret-config
```

## Install
If your using RN >= 0.60, this is automatic linking
on ios, `cd ios && pod install`

## Manual Install Android
- in `android/settings.gradle`:
```diff
...
include ':app'
+ include ':react-native-secret-config'
+ project(':react-native-secret-config').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-secret-config/android')
```


- in `android/app/build.gradle`:

```diff
dependencies {
    ...
    implementation "com.facebook.react:react-native:+"  // From node_modules
+   implementation project(':react-native-secret-config')
}
```

- in `MainApplication.java`:

```diff
    import java.util.List;
+   import com.indaam.secretconfig.SecretConfigPackage;
    ...
    // packages.add(new MyReactNativePackage());
+   packages.add(new SecretConfigPackage());
    return packages;

```

## Manual Install ios via CocoaPods
- In `ios/Podfile`
```diff
    pod 'Folly', :podspec => '../node_modules/react-native/third-party-podspecs/Folly.podspec'
+   pod 'react-native-secret-config', :path => '../node_modules/react-native-secret-config'

```
Then `pod install` on ios directory

## Setup
On your root project, create file `secret-config.json`, then create your json file, example like this
```json
{
  "api" : "https://api.api",
  "key" : "key",
  "secret-config": true,
  "version" : "1.0.0"
}
```

Then on root project, `node node_modules/react-native-secret-config/src/cli/index.js`
or
on `package.json` add this shorcut
```diff
  "scripts": {
    "android": "react-native run-android",
+   "config" : "node node_modules/react-native-secret-config/src/cli/index.js"
....
```
Then, `yarn config`
After init config, rerun your project `react-native run-android` or `react-native run-ios`

## Usage
```javascript
import CONFIG from 'react-native-secret-config';
console.log(CONFIG);
```

## Advance CLI
By default, when your run scripts `node node_modules/react-native-secret-config/src/cli/index.js`
The script will generate config to native from `secret-config.json`, this is option CLI

| Option | Type | Default | Note |
|---|---|---|---|
| `useBase64` | `boolean` | `false` | If true, will convert to base64
| `includeEnv` | `any` | `.env` | If env exist will merge with config
| `configFileName` | `string` | `secret-config.json` | Define config file name

#### CLI Example
* Include env
```shell
node node_modules/react-native-secret-config/src/cli/index.js includeEnv=".env.stag"
```
* Use Base64
```shell
node node_modules/react-native-secret-config/src/cli/index.js useBase64=true
```
* Custom File Name
```shell
node node_modules/react-native-secret-config/src/cli/index.js configFileName="my-file.json"
```
**!IMPORTANT**
The config file must be json format

## Credit
* https://www.npmjs.com/package/create-react-native-module
