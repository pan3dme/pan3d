//
//  SceneDisplay3DSprite.m
//  iosgl
//
//  Created by zhao on 28/12/2019.
//  Copyright © 2019 zhao. All rights reserved.
//

#import "SceneDisplay3DSprite.h"
@interface SceneDisplay3DSprite()

@end
@implementation SceneDisplay3DSprite
-(void) setInof:(NSDictionary*)value;
{
    /*
     [0]    (null)    @"id" : (long)61
     [1]    (null)    @"objsurl" : @"wudiqiuqiu/changjing/guankajibenmoxing/014/014_0.xml"
     [2]    (null)    @"rotationY" : (long)0
     [3]    (null)    @"x" : (double)255.942
     [4]    (null)    @"y" : (long)0
     [5]    (null)    @"rotationZ" : (long)0
     [6]    (null)    @"type" : (long)1
     [7]    (null)    @"z" : (double)0.108519
     [8]    (null)    @"scaleZ" : (long)1
     [9]    (null)    @"materialurl" : @"wudiqiuqiu/changjing/texture/wuditexture.txt"
     [10]    (null)    @"scaleY" : (long)1
     [11]    (null)    @"isPerspective" : NO
     [12]    (null)    @"rotationX" : (long)0
     [13]    (null)    @"scaleX" : (long)1
     [14]    (null)    @"name" : @"014_0"
     [15]    (null)    @"materialInfoArr" : @"1 element"
     */
     NSString *objsurl=[ value objectForKey:@"objsurl"];
    
//     self.x=[[ value objectForKey:@"x"]floatValue];
//     self.y=[[ value objectForKey:@"y"]floatValue];
//     self.z=[[ value objectForKey:@"z"]floatValue];
    
     self.scaleX=[[ value objectForKey:@"scaleX"]floatValue];
     self.scaleY=[[ value objectForKey:@"scaleX"]floatValue];
     self.scaleZ=[[ value objectForKey:@"scaleX"]floatValue];
    
//    self.rotationX=[[ value objectForKey:@"rotationX"]floatValue];
//    self.rotationY=[[ value objectForKey:@"rotationY"]floatValue];
//    self.rotationZ=[[ value objectForKey:@"rotationZ"]floatValue];
  
    
    
    [self loadShaderByUrl:@"shadertwo"];
    [self loadTextureResByUrl:@"xinshoupic.png"];
    [self loadObjDataByUrl:objsurl];
}
@end
