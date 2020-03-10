//
//  TokenSceneView.m
//  iosgl
//
//  Created by zhao on 21/2/2020.
//  Copyright © 2020 zhao. All rights reserved.
//
#import "AppWorldHeader.h"
#import "TokenSceneView.h"
#import "SceneView.h"
#import "GroupDataManager.h"
#import "SceneDisplay3DSprite.h"
#import "ObjDataManager.h"
#import "GroupItem.h"
#import "CombineParticle.h"
#import "ParticleManager.h"
#import "Display3DSprite.h"
#import "LineDisplaySprite.h"
#import "GridLineSprite.h"
#import "DisplayBaseTriSprite.h"
#import "LoadManager.h"
#import "UIImageView+WebCache.h"

@interface TokenSceneView ()
@property (nonatomic, strong) SceneView *sceneView;

@property (nonatomic,strong) NSURLSession *session;
@end

@implementation TokenSceneView

- (void)viewDidLoad {
    [super viewDidLoad];
    
    self.sceneView=[[SceneView alloc]init];
    self.sceneView.frame=CGRectMake(5, 100, 360, 360);
    [self.view addSubview:  self.sceneView];
    [self addLisienEvent];
 
    
    NSLog(@"%@",AppName);
    
}
-(void)addLisienEvent{
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(loadSceneEvent:) name:@"loadScneInfo" object:nil];
    
}
-(void)loadSceneEvent:(NSNotification *)notification{
    NSLog(@"here");
}

- (IBAction)scene_but_1_clik:(id)sender {
    NSMutableDictionary *mDict = [[NSMutableDictionary alloc]init];
    [mDict setObject:@"cctv"  forKey:@"data"];
    [[NSNotificationCenter defaultCenter]postNotificationName:@"loadScneInfo" object:mDict];
    
     [self.sceneView loadSeceneByUrl:@"5555_base"];
}

- (IBAction)scene_but_2_clik:(id)sender {
     //[self.sceneView loadSeceneByUrl:@"1001_base"];
    [self.sceneView makeEemptyScene];
    
  
     // [self.scene3D addDisplay:tempDis];
}

- (IBAction)zoom_max_clik:(id)sender {
    
    /*
    [UIView beginAnimations:nil context:nil];
    [UIView setAnimationDuration:0.5];
    [UIView setAnimationDelegate:self];
    self.sceneView.frame =CGRectMake(20, 120, 300, 500);
    [UIView commitAnimations];
    */
    
 
       [self.sceneView makeEemptyScene];
    [[GroupDataManager default]getGroupData:@"baoxiang001_base" Block:^(GroupRes *groupRes) {
  
        for(int i=0;i<groupRes.dataAry.count;i++){
            GroupItem *groupItem= groupRes.dataAry[i];
            NSMutableDictionary *infodic=[[NSMutableDictionary alloc]init];
            [infodic setValue:  groupItem.objUrl forKey:@"objsurl"];
            [infodic setValue:@"1" forKey:@"scaleX"];
            [infodic setValue:@"1" forKey:@"scaleY"];
            [infodic setValue:@"1" forKey:@"scaleZ"];
            SceneDisplay3DSprite *tempDis=[[SceneDisplay3DSprite alloc]init];
            [tempDis setInof:infodic];
            [self.sceneView.scene3D addDisplay:tempDis];
        }
    }];
 
}

- (IBAction)zoom_min_clik:(id)sender {
    /*
    [UIView beginAnimations:nil context:nil];
    [UIView setAnimationDuration:0.5];
    self.sceneView.frame =CGRectMake(20, 120, 300, 300);
    [UIView commitAnimations];
    */
//    #import "Display3DSprite.h"
//    #import "LineDisplaySprite.h"
//    #import "DisplayBaseTriSprite.h"
    //GridLineSprite
     [self.sceneView makeEemptyScene];
    [self.sceneView.scene3D addDisplay:[[GridLineSprite alloc]init]];
    
//    [[LoadManager default]load:@"fff" type:1 fun:^(int value) {
//
//    } info:nil progressFun:nil];
    
 
 
    ParticleManager* particleManager=  self.sceneView.scene3D.particleManager;
    [[GroupDataManager default] getGroupData:@"levelup_base" Block:^(GroupRes *groupRes) {
        for (int i = 0; i < groupRes.dataAry.count; i++) {
            GroupItem *item = groupRes.dataAry[i];
            if (item.types ==SCENE_PARTICLE_TYPE) {
                CombineParticle*  particle =  [[ParticleManager default] getParticleByte: item.particleUrl];
                [particleManager addParticle:particle];
            } else {
                NSLog(@"播放的不是单纯特效");
            }
        }
        
    }];
  
}

- (NSURLSession *)session
{
    if (!_session) {
        _session = [NSURLSession sessionWithConfiguration:[NSURLSessionConfiguration defaultSessionConfiguration] delegate:self delegateQueue:[NSOperationQueue mainQueue]];
    }
    return _session;
}
- (void)downLoad:(NSString*)value;
{
    
    //   NSURL *urlaaa = [NSURL URLWithString:@"http://jilioss.oss-cn-hongkong.aliyuncs.com/rb_ios/%08zhao/RedbagApp/assetfile/256.jpg"];
    NSURL *urlbbb = [NSURL URLWithString:@"http://pic1.win4000.com/pic/b/03/21691230681.jpg"];
    TokenSceneView* thatView=self;
 //   NSURL *url = [NSURL URLWithString:@"http://localhost:8080/MJServer/resources/images/minion_01.png"];
    NSURLRequest *request = [NSURLRequest requestWithURL:urlbbb];
    NSURLSessionDownloadTask *downloadTask = [self.session downloadTaskWithRequest:request completionHandler:^(NSURL * _Nullable location, NSURLResponse * _Nullable response, NSError * _Nullable error) {

        NSString *fullPath = [[NSSearchPathForDirectoriesInDomains(NSCachesDirectory, NSUserDomainMask, YES) lastObject] stringByAppendingPathComponent:response.suggestedFilename];

        [[NSFileManager defaultManager] moveItemAtURL:location toURL:[NSURL fileURLWithPath:fullPath] error:nil];
        
        NSLog(@"%@",location);
        NSLog(@"%@",fullPath);
        NSLog(@"%@",response.suggestedFilename);
        NSLog(@"%@",urlbbb.lastPathComponent);
        
    }];
    
    
    [downloadTask resume];
    
    
}
// 使用代理的方式来下载数据
- (void)delegateDownload
{
    //1. 确定请求路径
    NSURL *url =  [NSURL URLWithString:@"http://pic1.win4000.com/pic/b/03/21691230681.jpg"];
    //2. 创建请求
    NSURLRequest *request = [NSURLRequest requestWithURL:url];
    //3. 创建会话对象
    //4. 创建downloadTask
    NSURLSessionDownloadTask *downloadTask = [self.session downloadTaskWithRequest:request];
    //5. 执行task
    [downloadTask resume];
}
/**
 当恢复下载的时候调用该方法
 
 @param fileOffset 从什么地方下载
 @param expectedTotalBytes 文件总大小
 */
- (void)URLSession:(NSURLSession *)session downloadTask:(NSURLSessionDownloadTask *)downloadTask didResumeAtOffset:(int64_t)fileOffset expectedTotalBytes:(int64_t)expectedTotalBytes
{
    NSLog(@"%s, line = %d", __FUNCTION__, __LINE__);
}
 
/**
 当下载完成的时候调用
 
 @param location 文件的临时存储路径
 */
- (void)URLSession:(NSURLSession *)session downloadTask:(NSURLSessionDownloadTask *)downloadTask didFinishDownloadingToURL:(NSURL *)location
{
    NSLog(@"%@",location);
    //1. 拼接cache路径
    NSString *fullPath = [[NSSearchPathForDirectoriesInDomains(NSCachesDirectory, NSUserDomainMask, YES) lastObject] stringByAppendingPathComponent:downloadTask.response.suggestedFilename];
    //2. 剪切到指定位置
    [[NSFileManager defaultManager] moveItemAtURL:location toURL:[NSURL fileURLWithPath:fullPath] error:nil];
    NSLog(@"%@",fullPath);
}
 
/**
 请求结束时调用
 */
- (void)URLSession:(NSURLSession *)session task:(NSURLSessionTask *)task didCompleteWithError:(NSError *)error
{
    NSLog(@"didCompleteWithError");
}
 
 
-(void)loadFinishEnd:(NSString*)value;
{
 UIImageView* uiImgView=[[UIImageView alloc]init];
  uiImgView.frame=CGRectMake(100, 0, 200, 200);
  [self.view addSubview:uiImgView];
  [uiImgView setImage:[UIImage imageNamed: value]];
}
/*
 for (var i: number = 0; i < groupRes.dataAry.length; i++) {
     var item: Pan3d.GroupItem = groupRes.dataAry[i];
     if (item.types == Pan3d.BaseRes.SCENE_PARTICLE_TYPE) {
         var $particle: Pan3d.CombineParticle = $scene.particleManager.getParticleByte(Pan3d.Scene_data.fileRoot + item.particleUrl);
         $particle.x = $pos.x;
         $particle.y = $pos.y;
         $particle.z = $pos.z;
         $particle.scaleX = 3;
         $particle.scaleY = 3;
         $particle.scaleZ = 3;
         $particle.rotationY = $r;
         $scene.particleManager.addParticle($particle);
         $particle.addEventListener(Pan3d.BaseEvent.COMPLETE, this.onPlayCom, this);
     } else {
         console.log("播放的不是单纯特效");
     }
 }
 */
@end
