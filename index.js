import { NativeModules } from 'react-native';
import FN from './src/utils/fn';
import base64 from './src/utils/base64.js';

const { SecretConfig } = NativeModules;
const SecretConfigStr = SecretConfig.getString('');

const generateConfig = SecretConfigStr => {
  const json = FN.toJson(SecretConfigStr);
  if (json) {
    // Normal
    return json;
  }

  // Hash
  const decodeStr = base64.atob(SecretConfigStr);
  return FN.toJson(decodeStr);
};

const finalConfig = generateConfig(SecretConfigStr);

export default finalConfig;
