#import "FlutterNativePlugin.h"
#import <Flutter/Flutter.h>

 #import <AlipaySDK/AlipaySDK.h>

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
        
        
        NSString* urlScheme =@"org.zoomdev.flutter.alipay";
        NSDictionary *arguments = [call arguments];
 
        
        [[AlipaySDK defaultService] payOrder:arguments fromScheme:urlScheme callback:^(NSDictionary *resultDic) {
                //NSLog(@"%@",resultDic);
               result(@"ios Yes--333");
            }];
     
        

    } else {
        result(@"ios No");
    }
}


-(NSString*)fetchUrlScheme{
    NSDictionary *infoDic = [[NSBundle mainBundle] infoDictionary];
    NSArray* types = [infoDic objectForKey:@"CFBundleURLTypes"];
    for(NSDictionary* dic in types){
        if([@"alipay" isEqualToString: [dic objectForKey:@"CFBundleURLName"]]){
            return [dic objectForKey:@"CFBundleURLSchemes"][0];
        }
    }
    return nil;
}
 

-(void)pay:(NSString*)payInfo urlScheme:(NSString*)urlScheme{
    //获取到CFBundleURLSchemes
    
}




-(void)onGetResult:(NSDictionary*)resultDic{
 
   
}
@end
