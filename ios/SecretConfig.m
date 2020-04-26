#import "SecretConfig.h"


@implementation SecretConfig

RCT_EXPORT_MODULE()

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(
  getString:(NSString *)string
) {
    // dont change me
    /* start config */return @"eyJzZWNyZXQtY29uZmlnIjp0cnVlLCJ2ZXJzaW9uIjoiMS4wLjAifQ==";/* end config */
}

RCT_EXPORT_METHOD(sampleMethod:(NSString *)stringArgument numberParameter:(nonnull NSNumber *)numberArgument callback:(RCTResponseSenderBlock)callback)
{
    // TODO: Implement some actually useful functionality
    callback(@[[NSString stringWithFormat: @"numberArgument: %@ stringArgument: %@", numberArgument, stringArgument]]);
}

@end
