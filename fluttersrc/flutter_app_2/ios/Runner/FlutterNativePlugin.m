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
    
        [self fetchUrlScheme];
        NSString* urlScheme =@"ccav";
        NSString* payInfo= @"alipay_sdk=alipay-sdk-php-20161101&app_id=2021001134646627&biz_content=%7B%22out_trade_no%22%3A%2220200604004524281%22%2C%22total_amount%22%3A300%2C%22product_code%22%3A%22QUICK_MSECURITY_PAY%22%2C%22subject%22%3A%22%E5%85%85%E5%80%BC300%E5%85%83%22%7D&charset=utf-8&format=json&method=alipay.trade.app.pay&notify_url=https%3A%2F%2Fyilian.youshangmp.com%2FPay_Aliapp_notifyurl.html&sign_type=RSA2&timestamp=2020-06-04+00%3A45%3A24&version=1.0&sign=jWK5ceMMGu5nr%2BNRrpn9TH6dsrK%2Fb59qDuVuDKgJXHhl6KBx96n%2BP038m2g6z7JV0pBe8aWhVBoerMelwfxadD8phH1qClO7oQFLoPeDP1qBy3voi3p%2Fv0KqwbTKz%2Bvl4pkjw1Bn1jInQ9GboFHzUpAqEZXByVDJnn4m0cd5pPKoLzghcMr5mzw5ifFZ2mmX1ys74m%2F1oR0kmAJLbmN7443RicCSXp8eJIIbPs0ncL4jsLKaMEdOyMBuJC9RWwHN8Hhf%2BKkoyRg1TnXpV3xt2FWP5LeT85FcORbwL7a0JDQA3WPa5mAKQBRmNYQKeiEUjoy6j50yDGpVIfbpKHxu0g%3D%3D" ;
        
        [[AlipaySDK defaultService] payOrder:payInfo fromScheme:urlScheme callback:^(NSDictionary *resultDic) {
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
