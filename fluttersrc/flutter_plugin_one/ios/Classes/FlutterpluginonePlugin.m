#import "FlutterpluginonePlugin.h"
 

@implementation FlutterpluginonePlugin
+ (void)registerWithRegistrar:(NSObject<FlutterPluginRegistrar>*)registrar {
  FlutterMethodChannel* channel = [FlutterMethodChannel
      methodChannelWithName:@"flutterpluginone"
            binaryMessenger:[registrar messenger]];
  FlutterpluginonePlugin* instance = [[FlutterpluginonePlugin alloc] init];
  [registrar addMethodCallDelegate:instance channel:channel];
}
 

- (void)handleMethodCall:(FlutterMethodCall*)call result:(FlutterResult)result {
  if ([@"getPlatformVersion" isEqualToString:call.method]) {
    result([@"iOS002 " stringByAppendingString:[[UIDevice currentDevice] systemVersion]]);
  } else {
    result(FlutterMethodNotImplemented);
  }
}

@end
