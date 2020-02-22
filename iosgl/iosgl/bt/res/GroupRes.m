//
//  GroupRes.m
//  iosgl
//
//  Created by zhao on 22/2/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "GroupRes.h"
#import "GroupItem.h"
typedef void (^SuccessBlock)(int code);
@interface GroupRes ()
@property (nonatomic, assign)  SuccessBlock    bfun;
@end
@implementation GroupRes
-(void)load:(NSString*)url Block:(void (^)(int))block;
{
    NSString *path=  [[NSBundle mainBundle]pathForResource:url ofType:@"txt"];
    NSData *reader = [[NSData alloc] initWithContentsOfFile:path];
    NSLog(@"-----length----%lu",   reader.length);
    
    self.bfun = block;
    self.byte=[[ByteArray alloc]init:reader];
    
    
    [self loadComplete:self.byte];
    
    self.bfun(1);
    
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
        /*
              item.x = this._byte.readFloat();
              item.y = this._byte.readFloat();
              item.z = this._byte.readFloat();
              item.scaleX = this._byte.readFloat();
              item.scaleY = this._byte.readFloat();
              item.scaleZ = this._byte.readFloat();
              item.rotationX = this._byte.readFloat();
              item.rotationY = this._byte.readFloat();
              item.rotationZ = this._byte.readFloat();
              */
    }
    if (types ==   PREFAB_TYPE) {
         groupItem.objUrl = [self.byte readUTF];
         groupItem.materialUrl =[self.byte readUTF];
    
        
    }
    
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
