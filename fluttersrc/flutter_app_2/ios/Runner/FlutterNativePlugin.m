#import "FlutterNativePlugin.h"
#import <Flutter/Flutter.h>
 

@implementation FlutterNativePlugin

+ (void)registerWithRegistrar:(NSObject<FlutterPluginRegistrar>*)registrar {
    FlutterMethodChannel* channel =
    [FlutterMethodChannel methodChannelWithName:@"com.test/name"
                                binaryMessenger:[registrar messenger]];
    FlutterNativePlugin* instance = [[FlutterNativePlugin alloc] init];
    [registrar addMethodCallDelegate:instance channel:channel];
    
}

- (void)handleMethodCall:(FlutterMethodCall*)call result:(FlutterResult)result {
    if ([@"isEuropeUser" isEqualToString:call.method]) {
        result([NSNumber numberWithBool:YES]);
    } else {
        result(FlutterMethodNotImplemented);
    }
}
@end
