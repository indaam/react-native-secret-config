/*
Name : SecretConfig
Description : A CLI
Author : indaam@gmail.com || indaam
*/

const fs = require('fs');
const FN = require('../utils/fn.js');
const base64 = require('../utils/base64');
const createVars = require('../utils/vars');

const variable = createVars(process/* is global variable in node */);

class SecretConfig {
  constructor(variable) {
    this.regex = /\/\*\sstart\sconfig\s\*\/(.|\n)+(\/\*\send\sconfig\s\*\/)/gi;
    this.vars = variable;
    this.FN = FN;
    this.base64 = base64;
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
      console.log(error && error.message);
      return null;
    }
  }

  createSecretConfigStr(str, config) {
    const { base64 } = this;
    if (config.useBase64) {
      return base64.btoa(JSON.stringify(str));
    }
    return JSON.stringify(str).replace(/\"/g, '\\"');
  }

  writeConfig(config, os) {
    const { regex } = this;
    const { nativeFile, directory } = this.vars;

    try {

      const secretConfig = this.getSecretConfig(config);
      const secretConfigStr = this.createSecretConfigStr(secretConfig, config);

      const fileLocation = os === 'ios' ? nativeFile.ios : nativeFile.android;
      const extraContent = os === 'ios' ? '@' : '';

      const file = `${directory.module}/${fileLocation}`;
      let fileContent = fs.readFileSync(file, 'utf8');

      fileContent = fileContent.replace(regex, function(res) {
        return `/* start config */return ${extraContent}"${secretConfigStr}";/* end config */`;
      });

      fs.writeFileSync(file, fileContent, 'utf8');
      return console.log('Succress write to', os);

    } catch (error) {
      throw error
    }

  }

  getSecretConfig(config) {
    const { nativeFile, directory } = this.vars;

    const secretConfigPath = `${directory.root}/${config.configFileName}`;
    const secretConfigContent = this.getFileContent(secretConfigPath);

    const envPath = `${directory.root}/${config.envFileName}`;
    const envContent = this.getFileContent(envPath);

    const secretConfigObj = JSON.parse(secretConfigContent);
    const envObj = (config && config.includeEnv && this.envToObject(envContent)) || {};

    return { ...secretConfigObj, ...envObj };
  }

  getConfig() {
    const { FN } = this;
    const { base } = this.vars;
    const args = FN.getOptionParam(process && process.argv);
    if(args && args.includeEnv){
      args["envFileName"] = args.includeEnv;
      args["includeEnv"] = !!args.includeEnv;
    }
    return { ...base, ...args };
  }

  init() {
    const config = this.getConfig();
    this.writeConfig(config, 'ios');
    this.writeConfig(config, 'android');
  }
}

const appConfig = new SecretConfig(variable);
appConfig.init();
