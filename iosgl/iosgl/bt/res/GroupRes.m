//
//  GroupRes.m
//  iosgl
//
//  Created by zhao on 22/2/2020.
//  Copyright © 2020 zhao. All rights reserved.
//
#import "Scene_data.h"
#import "LoadManager.h"
#import "GL_Header.h"
#import "GroupRes.h"
#import "GroupItem.h"
 
@interface GroupRes ()
@property (nonatomic, copy)  SuccessBlock    bfun;
@end
@implementation GroupRes

- (instancetype)init
{
    self = [super init];
    if (self) {
        self.dataAry=[[NSMutableArray alloc]init];
    }
    return self;
}
-(void)load:(NSString*)url Block:(SuccessBlock)block;
{
    //本地文件
    /*
    NSString *path=  [[NSBundle mainBundle]pathForResource:@"levelup_base" ofType:@"txt"];
    NSData *reader = [[NSData alloc] initWithContentsOfFile:path];
    NSLog(@"-----length----%lu",   reader.length);
 */
 //url    __NSCFString *    @"http://jilioss.oss-cn-hongkong.aliyuncs.com/rb_ios/a/res/model/10018_lyf.txt"    0x00000002818a0360
    self.bfun=block;
    
    [[LoadManager default] loadUrl:url type:LoadManager.BYTE_TYPE fun:^(NSObject* value) {
        
        NSDictionary* dic=(NSDictionary*)value;
         NSData* netNsData = [[NSData alloc] initWithContentsOfFile:dic[@"data"]];
         self.byte=[[ByteArray alloc]init:netNsData];
         [self loadComplete:self.byte];
          self.bfun(@"");
    }];
}
-(void)loadComplete:(ByteArray *)byte;
{
    self.version = [self.byte readInt];
    NSLog(@"version-->%d", self.version);
    [self read]; //img
    [self read]; //obj
    [self read]; //material
    [self read]; //particle
    BOOL isGroup = [self.byte readBoolean];
    if (isGroup) {
        int len = [self.byte readInt];
        for (int i = 0; i < len; i++) {
            [self readItem:YES];
        }
    } else {
        [self readItem:NO];
    }
}
-(void)readItem:(BOOL)isG
{
    int types  =  [self.byte readInt];
    GroupItem *groupItem=[[GroupItem alloc]init];
    groupItem.isGroup=isG;
    groupItem.types=types;
    if(isG){
         groupItem.x = [self.byte  readFloat];
         groupItem.y =[self.byte  readFloat];
         groupItem.z = [self.byte  readFloat];
         groupItem.scaleX =[self.byte  readFloat];
         groupItem.scaleY = [self.byte  readFloat];
         groupItem.scaleZ =[self.byte  readFloat];
         groupItem.rotationX = [self.byte  readFloat];
         groupItem.rotationY =[self.byte  readFloat];
         groupItem.rotationZ = [self.byte  readFloat];
    }
    if (types ==   PREFAB_TYPE) {
        groupItem.objUrl = [self.byte readUTF];
        groupItem.materialUrl =[self.byte readUTF];
        groupItem.materialInfoArr = [self readMaterialInfo];
    }
    else if (types ==  SCENE_PARTICLE_TYPE ) {
        groupItem.particleUrl = [self.byte readUTF];
        groupItem.types = SCENE_PARTICLE_TYPE;
    }
    [self.dataAry  addObject:groupItem];
}
/*
 private readItem(isG: boolean): void {
 var types: number = this._byte.readInt();
 var item: GroupItem = new GroupItem();
 item.isGroup = isG;
 
 if (isG) {
 item.x = this._byte.readFloat();
 item.y = this._byte.readFloat();
 item.z = this._byte.readFloat();
 item.scaleX = this._byte.readFloat();
 item.scaleY = this._byte.readFloat();
 item.scaleZ = this._byte.readFloat();
 item.rotationX = this._byte.readFloat();
 item.rotationY = this._byte.readFloat();
 item.rotationZ = this._byte.readFloat();
 }
 
 if (types == BaseRes.PREFAB_TYPE) {
 item.objUrl = this._byte.readUTF();
 item.materialUrl = this._byte.readUTF();
 
 if (this.version >= 4) {
 item.materialInfoArr = this.readMaterialInfo();
 }
 item.types = BaseRes.PREFAB_TYPE;
 
 } else if (types == BaseRes.SCENE_PARTICLE_TYPE) {
 item.particleUrl = this._byte.readUTF();
 item.types = BaseRes.SCENE_PARTICLE_TYPE;
 }
 
 this.dataAry.push(item);
 }
 */

@end

