/*
Generate variable
*/

const createVars = (process) =>{

    const base = {
      configFileName: 'secret-config.json',
      useBase64: false,
      envFileName: '.env',
      includeEnv: true,
    };

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

    const nativeFile = {
      ios: 'ios/SecretConfig.m',
      android:
        'android/src/main/java/com/indaam/secretconfig/SecretConfigModule.java'
    };

    return {
      base : base,
      nativeFile : nativeFile,
      directory : dir(process),
      process : process
    }
  }


  module.exports = createVars
