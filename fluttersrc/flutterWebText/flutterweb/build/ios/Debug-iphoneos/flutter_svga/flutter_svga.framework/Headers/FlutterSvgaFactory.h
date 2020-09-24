//
//  SuperLiveKitFactory.h
//  Pods-Runner
//
//

#import <Foundation/Foundation.h>
#import <Flutter/Flutter.h>

NS_ASSUME_NONNULL_BEGIN

@interface FlutterSvgaFactory : NSObject <FlutterPlatformViewFactory>
- (instancetype)initWithMessager:(NSObject<FlutterBinaryMessenger>*)messager;
@end

NS_ASSUME_NONNULL_END
