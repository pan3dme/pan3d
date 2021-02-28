//
//  GridLineSprite.m
//  iosgl
//
//  Created by zhao on 6/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "GridLineSprite.h"
#import "GridLineShader.h"
#import "ProgrmaManager.h"
#import "Context3D.h"
#import "Scene3D.h"

@implementation GridLineSprite

- (void)onCreated
{
    [super onCreated];
    [self clearLine];
    float w=100;
    float n=10;
    float skeep=w/n;
    Vector3D* a;
    Vector3D* b;
    
    a=[[Vector3D alloc]x:0 y:0 z:+w];
    b=[[Vector3D alloc]x:0 y:0 z:-w];
    self.colorV3d = [[Vector3D alloc]x:0 y:0 z:1];
    [self addLineA2B:a b:b];
    a=[[Vector3D alloc]x:+w y:0 z:0];
    b=[[Vector3D alloc]x:-w y:0 z:0];
    self.colorV3d = [[Vector3D alloc]x:1 y:0 z:0];
    [self addLineA2B:a b:b];
    
    self.colorV3d = [[Vector3D alloc]x:128.0f / 255.0f y:128.0f / 255.0f z:128.0f / 255.0f];
    for (int i = 1; i <= n; i++) {
        
        a=[[Vector3D alloc]x:+i * skeep y:0 z:+w];
        b=[[Vector3D alloc]x:+i * skeep y:0 z:-w];
        [self addLineA2B:a b:b];
        a=[[Vector3D alloc]x:-i * skeep y:0 z:+w];
        b=[[Vector3D alloc]x:-i * skeep y:0 z:-w];
        [self addLineA2B:a b:b];
        
        a=[[Vector3D alloc]x:+w y:0 z:+i * skeep];
        b=[[Vector3D alloc]x:-w y:0 z:+i * skeep];
        [self addLineA2B:a b:b];
        a=[[Vector3D alloc]x:+w y:0 z:-i * skeep];
        b=[[Vector3D alloc]x:-w y:0 z:-i * skeep];
        [self addLineA2B:a b:b];
    }
 
 
}
-(void)registetProgame;
{
    [ self.scene3D.progrmaManager registe:GridLineShader.shaderStr shader3d: [[GridLineShader alloc]init]];
     self.shader3d=  [ self.scene3D.progrmaManager getProgram:GridLineShader.shaderStr];
}
-(void)setVc;
{
    Context3D *ctx=self.scene3D.context3D;
   
    [ctx setVcMatrix4fv:self.shader3d name:"viewMatrix" data:self.scene3D.camera3D.viewMatrix.m];
    [ctx setVcMatrix4fv:self.shader3d name:"camMatrix" data:self.scene3D.camera3D.camMatrix3D.m];
 
}
 
@end
