//
//  DisplayTestSprite.m
//  iosgl
//
//  Created by zhao on 16/4/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "DisplayTestSprite.h"
#import "DisplayTestShader.h"
#import "ProgrmaManager.h"

@implementation DisplayTestSprite
-(void)registetProgame;
{
    [[ProgrmaManager default] registe:DisplayTestShader.shaderStr shader3d: [[DisplayTestShader alloc]init]];
     self.shader3d=  [[ProgrmaManager default] getProgram:DisplayTestShader.shaderStr];
}
@end
