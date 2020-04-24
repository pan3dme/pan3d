//
//  BuildDisplay3DSprite.m
//  iosgl
//
//  Created by zhao on 24/4/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "BuildDisplay3DSprite.h"
#import "BuildSceneVo.h"
#import "ObjDataManager.h"

@interface BuildDisplay3DSprite ()
 @property(nonatomic,strong)BuildSceneVo* buildSceneVo;
@end
@implementation BuildDisplay3DSprite
-(void) setInfo:(NSDictionary*)value;
{
    /*
     [0]    (null)    @"id" : (long)277
     [1]    (null)    @"objsurl" : @"content/finalscens/mapscene/m1001/model/ef/m1001_sky_blue_0.xml"
     [2]    (null)    @"rotationY" : (long)0
     [3]    (null)    @"x" : (double)-317.318
     [4]    (null)    @"y" : (double)167.996
     [5]    (null)    @"rotationZ" : (long)0
     [6]    (null)    @"type" : (long)1
     [7]    (null)    @"z" : (double)25.9462
     [8]    (null)    @"scaleZ" : (double)0.585893
     [9]    (null)    @"materialurl" : @"content/materialinstance/changjingbuhongpei/standard_no.txt"
     [10]    (null)    @"scaleY" : (double)0.585893
     [11]    (null)    @"isPerspective" : NO
     [12]    (null)    @"rotationX" : (long)0
     [13]    (null)    @"scaleX" : (double)0.585893
     [14]    (null)    @"materialInfoArr" : @"1 element"
     */
    
    self.buildSceneVo=[[BuildSceneVo alloc]init];
    [self.buildSceneVo preshValue:value];
    self.x=self.buildSceneVo.x;
    self.y=self.buildSceneVo.y;
    self.z=self.buildSceneVo.z;
    self.scaleX=self.buildSceneVo.scaleX;
    self.scaleY=self.buildSceneVo.scaleY;
    self.scaleZ=self.buildSceneVo.scaleZ;
    self.rotationX=self.buildSceneVo.rotationX;
    self.rotationY=self.buildSceneVo.rotationY;
    self.rotationZ=self.buildSceneVo.rotationZ;
    
    [self setObjUrl:self.buildSceneVo.objsurl];
    [self setMaterialUrl:self.buildSceneVo.materialurl paramData:self.buildSceneVo.materialInfoArr];
 
}
 
@end
