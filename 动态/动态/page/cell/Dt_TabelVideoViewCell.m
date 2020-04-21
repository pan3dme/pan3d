//
//  TabelVideoViewCell.m
//  动态
//
//  Created by zhao on 17/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "Dt_TabelVideoViewCell.h"
 #import <AVKit/AVKit.h>

 #import <AssetsLibrary/ALAsset.h>
 #import <AssetsLibrary/ALAssetsLibrary.h>
 #import <AssetsLibrary/ALAssetsGroup.h>
 #import <AssetsLibrary/ALAssetRepresentation.h>
 #import <Photos/Photos.h>
 #import <MediaPlayer/MediaPlayer.h>
 
#import "YBImageBrowser.h"
#import "UIImageView+WebCache.h"
#import "UIView+XBZKeyBoard.h"
#import "Header.h"
 
 #import <MediaPlayer/MediaPlayer.h>

@interface Dt_TabelVideoViewCell()

@property(nonatomic,strong)Dt_UIImageViewLock * videoport;
 @property(nonatomic,strong)UIImageView * plicIcon;

 @property (nonatomic, strong) NSString *videoUrl;
 @property (nonatomic, strong)AVPlayerViewController *playerVC;
 
 

@end
@implementation Dt_TabelVideoViewCell
+(NSString*)CELL_STR;
{
    return @"TabelVideoViewCell";
}
- (void)awakeFromNib {
    [super awakeFromNib];
    // Initialization code
}
-(void)initBaseUi;
{
    [super initBaseUi];
    self.videoport=[self makeImageLockView];
 
    self.plicIcon=[self makeImageView];
    self.plicIcon.image=[UIImage imageNamed:@"play_48px"];
    [self.plicIcon addGestureRecognizer:[[UITapGestureRecognizer alloc]initWithTarget:self action:@selector(actionTap:)]];
      
   
}

-(void)actionTap:(UITapGestureRecognizer *)sender;
{
    if( [self showAlertLock]){
        return;
    }
   
   NSString *str = self.datavo.videourl;
 
 
    /*
     NSURL *url = [NSURL URLWithString:str];
     AVPlayer *player = [AVPlayer playerWithURL:url];
    AVPlayerLayer *playerLayer = [AVPlayerLayer playerLayerWithPlayer:player];
     playerLayer.masksToBounds= YES;
    playerLayer.frame = CGRectMake(0, 0,kScreenW , kScreenH);
     [player play];
    [[[UIApplication sharedApplication] keyWindow].layer addSublayer:playerLayer];
  
    */
        UIWindow* keyWin=[ [UIApplication sharedApplication] keyWindow];
        UIView* tempUi=[[UIView alloc]initWithFrame:keyWin.bounds ];
       [ keyWin addSubview:tempUi];
        tempUi.autoresizingMask = UIViewAutoresizingFlexibleHeight | UIViewAutoresizingFlexibleWidth;

  
       

   self.videoUrl = @"http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4";
      /*
       因为是 http 的链接，所以要去 info.plist里面设置
       App Transport Security Settings
       Allow Arbitrary Loads  = YES
       */
    self.playerVC = [[AVPlayerViewController alloc] init];
    self.playerVC.player = [AVPlayer playerWithURL:[self.videoUrl hasPrefix:@"http"] ? [NSURL URLWithString:self.videoUrl]:[NSURL fileURLWithPath:self.videoUrl]];
    self.playerVC.view.frame = tempUi.bounds;
    self.playerVC.view.frame = CGRectMake(0, 0, 300, 180);
    self.playerVC.modalPresentationStyle = UIModalPresentationOverFullScreen;
    self.playerVC.showsPlaybackControls = YES;
    self.playerVC.entersFullScreenWhenPlaybackBegins = YES;//开启这个播放的时候支持（全屏）横竖屏哦
    
    [tempUi addSubview:self.playerVC.view];
    [self.playerVC.player play];
    

//    [[UIApplication sharedApplication] presentViewController:self.playerVC animated:YES completion:nil];
      
     
 
 
}
- (void)setCellData:(Dt_DynamicBaseVo *)value
{
  
    [super setCellData:value];
    
    if( self.datavo.tabelVo.is_lock){
        [self imgLockLoadByUrl:self.datavo.video_post  imgView:self.videoport blurum:3];
        self.videoport.lock=YES;
  
    }else{
        [self imgLockLoadByUrl:self.datavo.video_post  imgView:self.videoport blurum:-1];
        self.videoport.lock=NO;
 
    }
 
}
 
- (void)setSelected:(BOOL)selected animated:(BOOL)animated {
    [super setSelected:selected animated:animated];
 
}

- (void)layoutSubviews;
{
    [super layoutSubviews];
     self.videoport.frame=CGRectMake(0, 0,   self.datavo.videoSize.x, self.datavo.videoSize.y);
     self.plicIcon.frame=CGRectMake( (self.datavo.videoSize.x-48)/2, (self.datavo.videoSize.y-48)/2,   48,48);

}

+(Dt_TabelVideoViewCell *)makeViewCell:(UITableView*)tableView    dataVo:(Dt_DynamicBaseVo*)dataVo;
{
    Dt_TabelVideoViewCell *cell=[tableView dequeueReusableCellWithIdentifier:Dt_TabelVideoViewCell.CELL_STR];
    if(cell==nil){
        cell=[[Dt_TabelVideoViewCell alloc]initWithStyle:UITableViewCellStyleSubtitle reuseIdentifier:Dt_TabelVideoViewCell.CELL_STR];
    }
   [cell setCellData:dataVo];
    return cell;
}
@end
