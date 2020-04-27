import { NativeModules } from 'react-native';
import FN from './src/utils/fn';
import base64 from './src/utils/base64.js';

const { SecretConfig } = NativeModules;

const generateConfig = () => {
  if(SecretConfig && SecretConfig.getString){
    const SecretConfigStr = SecretConfig.getString('');
    const json = FN.toJson(SecretConfigStr);
    if (json) {
      // Normal
      return json;
    }

    // Hash
    const decodeStr = base64.atob(SecretConfigStr);
    return FN.toJson(decodeStr);
  }
  return {
    error : 1,
    msg : "need to setup"
  }
};

const finalConfig = generateConfig();

export default finalConfig;
