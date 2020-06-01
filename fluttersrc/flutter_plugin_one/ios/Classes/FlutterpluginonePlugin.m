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
    result([@"iOS " stringByAppendingString:[[UIDevice currentDevice] systemVersion]]);
  }else if ([@"getNative" isEqualToString:call.method]){
        result(@"Ios getNative");
  }  else {
    result(FlutterMethodNotImplemented);
  }
    
    //
}

@end
