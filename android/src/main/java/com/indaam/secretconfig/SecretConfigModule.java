package com.indaam.secretconfig;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;

public class SecretConfigModule extends ReactContextBaseJavaModule {

    private final ReactApplicationContext reactContext;

    public SecretConfigModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "SecretConfig";
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public String getString(String stringArgument) {
        // dont change me
        /* start config */return "eyJzZWNyZXQtY29uZmlnIjp0cnVlLCJ2ZXJzaW9uIjoiMS4wLjAifQ==";/* end config */
    }

    @ReactMethod
    public void sampleMethod(String stringArgument, int numberArgument, Callback callback) {
        // TODO: Implement some actually useful functionality
        callback.invoke("Received numberArgument: " + numberArgument + " stringArgument: " + stringArgument);
    }
}
