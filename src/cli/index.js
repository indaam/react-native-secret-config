/*
Name : SecretConfig
Description : A CLI
Author : indaam@gmail.com || indaam
*/

const fs = require('fs');
const FN = require('../utils/fn.js');
const base64 = require('../utils/base64');

const dir = () => {
  const root = String(process.cwd()).replace(/\s/g, '// ');
  const current = String(__dirname).replace(/\s/g, '// ');
  const module = root + '/node_modules/react-native-secret-config';
  return {
    root,
    current,
    module
  };
};

const DIR = dir();

const FILE = {
  iosFile: 'ios/SecretConfig.m',
  androidFile:
    'android/src/main/java/com/indaam/secretconfig/SecretConfigModule.java'
};

const config = {
  configFile: 'secret-config.json',
  envFile: '.env',
  hash: true,
  env: false
};

class SecretConfig {
  constructor() {
    this.regex = /\/\*\sstart\sconfig\s\*\/(.|\n)+(\/\*\send\sconfig\s\*\/)/gi;
  }

  envToObject(data) {
    if (data) {
      const temp = {};
      const dataArr = data.replace(/\n/g, '__@__').split('__@__');
      for (let index = 0; index < dataArr.length; index++) {
        const el = dataArr[index];
        const val = el.split('=');
        temp[val[0]] = val[1];
      }
      return temp;
    }
    return null;
  }

  getFileContent(path) {
    try {
      return fs.readFileSync(path, 'utf8');
    } catch (error) {
      return null;
    }
  }

  createSecretConfigStr(str, config) {
    if (config.hash) {
      return base64.btoa(JSON.stringify(str));
    }
    return JSON.stringify(str).replace(/\"/g, '\\"');
  }

  writeConfig(config, os) {
    const { regex } = this;

    const secretConfig = this.getSecretConfig(config);
    const secretConfigStr = this.createSecretConfigStr(secretConfig, config);

    const fileLocation = os === 'ios' ? FILE.iosFile : FILE.androidFile;
    const extraContent = os === 'ios' ? '@' : '';

    const file = `${DIR.module}/${fileLocation}`;
    let fileContent = fs.readFileSync(file, 'utf8');

    fileContent = fileContent.replace(regex, function(res) {
      return `/* start config */return ${extraContent}"${secretConfigStr}";/* end config */`;
    });

    fs.writeFileSync(file, fileContent, 'utf8');
    return console.log('Succress write to', os);
  }

  getSecretConfig(config) {
    const secretConfigPath = `${DIR.root}/${config.configFile}`;
    const secretConfigContent = this.getFileContent(secretConfigPath);

    const envPath = `${DIR.root}/${config.envFile}`;
    const envContent = this.getFileContent(envPath);

    const secretConfigObj = JSON.parse(secretConfigContent);
    const envObj = (config && config.env && this.envToObject(envContent)) || {};

    return { ...secretConfigObj, ...envObj };
  }

  getConfig() {
    const args = FN.getOptionParam(process.argv);
    return { ...config, ...args };
  }

  init() {
    const config = this.getConfig();
    this.writeConfig(config, 'ios');
    this.writeConfig(config, 'android');
  }
}

const appConfig = new SecretConfig();
appConfig.init();
