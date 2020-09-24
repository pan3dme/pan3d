//
//  SuperLiveKit.h
//  Pods-Runner
//
//

#import <Foundation/Foundation.h>
#import <Flutter/Flutter.h>
#import "SVGAPlayer.h"

NS_ASSUME_NONNULL_BEGIN

@interface FlutterSvga : NSObject <FlutterPlatformView, SVGAPlayerDelegate>
{
    BOOL            _appIsInterrupt;
}

- (id)initWithFrame:(CGRect)frame viewId:(NSString *)viewId args:(id)args binaryMessager:(NSObject<FlutterBinaryMessenger>*)messager;

@end

NS_ASSUME_NONNULL_END
