//
//  Frame3dRes.m
//  iosgl
//
//  Created by pan3dme on 2020/11/16.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "Frame3dRes.h"
#import "Scene_data.h"
#import "ByteArray.h"
#import "FrameNodeVo.h"
#import "LoadManager.h"
@interface Frame3dRes()
@property(nonatomic,strong)SuccessBlock completeFun;
@end
@implementation Frame3dRes

-(void)load:(NSString*)url  fun:(SuccessBlock)fun;
{
    self.completeFun=fun;
    NSString* netUrl =[[Scene_data default]getWorkUrlByFilePath:url];
//    netUrl=@"https://webpan.oss-cn-shanghai.aliyuncs.com/res/pan/expmd5/txtdata/bodymd5mesh.txt";
    [[LoadManager default] loadUrl:netUrl type:LoadManager.BYTE_TYPE fun:^(NSString* value) {
        NSDictionary* dic=(NSDictionary*)value;
        NSData* netNsData = [[NSData alloc] initWithContentsOfFile:dic[@"data"]];
        [self loadComplete:[[ByteArray alloc]init:netNsData]];
    
    }];
}
-(void)loadComplete:(ByteArray*)val;
{
    Frame3dRes* this=self;
    
    
    this.byte =  val;
    this.version = [this.byte readInt];
    NSString* str  = [this.byte readUTF];
    NSArray<NSString*>* itemstr = [str componentsSeparatedByString:@"/"];
    this.frameSpeedNum = [this.byte readInt];
    NSLog(@"版本->%d  %d",this.version,this.version,this.frameSpeedNum);
    [this readSceneInfo];
    [this read:^(NSString *localPath) {
        [self readNext];
    }];
    
 
  
}
-(void)readNext;
{
    [self read];
    [self read];
    [self read];
    [self readFrame3dScene];
    
}
-(void)readFrame3dScene
{
    Frame3dRes* this=self;
    this.frameItem =[[NSMutableArray alloc] init];
    int size = [this.byte readInt];
    NSString *jsonStr= [self.byte readUTFBytes:size];
    NSData *data=[jsonStr dataUsingEncoding:NSUTF8StringEncoding];
    NSDictionary* scene = [NSJSONSerialization JSONObjectWithData:data options:NSJSONReadingMutableContainers error:nil];
    
    for (id key in scene)
    {
        FrameNodeVo* frameNodeVo = [[FrameNodeVo alloc] init];
        [frameNodeVo writeObject:key];
        [this.frameItem addObject:frameNodeVo];
        this.maxTime=MAX(frameNodeVo.maxTime,this.maxTime) ;
    }
   
    this.completeFun(@"true");
    this.isReady=true;
}
-(void)readSceneInfo;
{
    Frame3dRes* this=self;
    int size = [this.byte readInt];
    NSString *jsonStr= [self.byte readUTFBytes:size];
    NSData *data=[jsonStr dataUsingEncoding:NSUTF8StringEncoding];
    NSDictionary* obj = [NSJSONSerialization JSONObjectWithData:data options:NSJSONReadingMutableContainers error:nil];
    
    
}
@end
