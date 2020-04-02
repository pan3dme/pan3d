//
//  AddVideoView.h
//  动态
//
//  Created by zhao on 2/4/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <AVFoundation/AVFoundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface Dt_AddVideoView : UIView
-(void)resetUrl:(NSString*)url;

@property (nonatomic, strong) UIView *topview;
@property (nonatomic, strong)  AVPlayer *player;
@property (nonatomic, strong)  AVPlayerLayer *uiAVPlayerLayer;
@property (nonatomic, strong)  AVPlayerItem * playerItem;
@property (nonatomic, strong)  NSString * lastplayUrl;

@end

NS_ASSUME_NONNULL_END
