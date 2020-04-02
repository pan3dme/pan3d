//
//  AddVideoView.m
//  动态
//
//  Created by zhao on 2/4/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "AddVideoView.h"
#import <AVFoundation/AVFoundation.h>

@interface AddVideoView()

@end
@implementation AddVideoView

- (instancetype)init
{
    self = [super init];
    if (self) {
        [self initConfig];
        self.backgroundColor=[UIColor clearColor];
        
    }
    return self;
}
-(void)initConfig;
{
    self.player=[[AVPlayer alloc]init];
    self.uiAVPlayerLayer= [[AVPlayerLayer alloc]init];
    self.uiAVPlayerLayer.player=self.player;
    self.uiAVPlayerLayer.videoGravity = AVLayerVideoGravityResizeAspect;
 
    [self.layer addSublayer:  self.uiAVPlayerLayer];
}
 
-(void)resetUrl:(NSString*)url;
{
 //url    __NSCFString *    @"http://34.87.12.20:20080//static/upload/dt/20200402/eaa2447757928a3a28eceae7f8e5ad6a.mov"    0x000000028197db90
    if(url&&url.length){
        NSArray *array = [url componentsSeparatedByString:@"?"];
        url=array[0];
        if( [url isEqualToString:self.lastplayUrl]){
            NSLog(@"一样的不需要重置");
             [self.player play];
         }else{
             self.lastplayUrl=url;
             NSURL*playUrl = [NSURL fileURLWithPath:url];
             self.playerItem= [AVPlayerItem playerItemWithURL:playUrl]; // create item
             [self.player replaceCurrentItemWithPlayerItem:_playerItem]; // replaceCurrentItem
             self.player.muted=YES;
             [self.player play];
             [self.playerItem addObserver:self forKeyPath:@"status" options:NSKeyValueObservingOptionNew context:nil];
         }
    }
 
   
}
- (void)observeValueForKeyPath:(NSString *)keyPath ofObject:(id)object change:(NSDictionary *)change context:(void *)context{
    
    if ([keyPath isEqualToString:@"status"]) {
        //取出status的新值
        AVPlayerItemStatus status = [change[NSKeyValueChangeNewKey]intValue];
        
        switch (status) {
            case AVPlayerItemStatusFailed:
                NSLog(@"视频资源有误，加载失败");
                break;
            case AVPlayerItemStatusReadyToPlay:
                NSLog(@"视频资源加载成功，准备好播放了");
                break;
            case AVPlayerItemStatusUnknown:
                NSLog(@"视频资源出现未知错误");
                break;
            default:
                break;
        }
    }
    
}
- (void)setHidden:(BOOL)hidden
{
    [super setHidden:hidden];
    if(hidden){
        [self.player pause];
    }
}
- (void)layoutSubviews;
{
    self.uiAVPlayerLayer.frame=self.bounds;
}
@end
