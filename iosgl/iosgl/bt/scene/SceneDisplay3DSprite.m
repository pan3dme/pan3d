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
    
    NSString *objsurl=[ value objectForKey:@"objsurl"];
    
    self.scaleX=[[ value objectForKey:@"scaleX"]floatValue];
    self.scaleY=[[ value objectForKey:@"scaleY"]floatValue]*1.0f;
    self.scaleZ=[[ value objectForKey:@"scaleZ"]floatValue];
    
    self.x=[[ value objectForKey:@"x"]floatValue];
    self.y=[[ value objectForKey:@"y"]floatValue];
    self.z=[[ value objectForKey:@"z"]floatValue];
    
    self.rotationX=[[ value objectForKey:@"rotationX"]floatValue];
    self.rotationY=[[ value objectForKey:@"rotationY"]floatValue];
    self.rotationZ=[[ value objectForKey:@"rotationZ"]floatValue];
    
    
    [self loadShaderByUrl:@"shadertwo"];
    
    [self loadTextureResByUrl:@"tu001.jpg"];
    [self loadObjDataByUrl:objsurl];
}
@end
