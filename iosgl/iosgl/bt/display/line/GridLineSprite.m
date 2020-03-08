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
    [[ProgrmaManager default] registe:GridLineShader.shaderStr shader3d: [[GridLineShader alloc]init]];
    self.shader3d=  [[ProgrmaManager default] getProgram:GridLineShader.shaderStr];
 
}
-(void)setVc;
{
    Context3D *ctx=self.scene3d.context3D;
    
    [self.scene3d.camera3D upFrame];
     
    [ctx setVcMatrix4fv:self.shader3d name:"viewMatrix" data:self.scene3d.camera3D.viewMatrix.m];
    [ctx setVcMatrix4fv:self.shader3d name:"camMatrix" data:self.scene3d.camera3D.camMatrix3D.m];
    
    
    /*
    Matrix3D *tempviewMatrix=[[Matrix3D alloc]init];
    Matrix3D *tempcamMatrix=[[Matrix3D alloc]init];

    [tempviewMatrix inputStrData:@"1.6533515453338623,0,0,0,0,2.9392917156219482,0,0,0,0,1.0526316165924072,1,0,0,-52.6315803527832,0"];
      [tempcamMatrix inputStrData:@"0.7071067690849304,-0.4911976754665375,-0.5086500644683838,0,0,0.7193397879600525,-0.6946583986282349,0,0.7071067690849304,0.4911976754665375,0.5086500644683838,0,0,0,562,1"];
  
    [ctx setVcMatrix4fv:self.shader3d name:"viewMatrix" data:tempviewMatrix.m];
    [ctx setVcMatrix4fv:self.shader3d name:"posMatrix" data:tempcamMatrix.m];
    
    */
      
}
 
@end
