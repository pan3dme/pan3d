//
//  DisplayTestSprite.m
//  iosgl
//
//  Created by zhao on 16/4/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "DisplayTestSprite.h"
#import "Display3DShader.h"
#import "ProgrmaManager.h"

@implementation DisplayTestSprite
-(void)registetProgame;
{
    [[ProgrmaManager default] registe:Display3DShader.shaderStr shader3d: [[Display3DShader alloc]init]];
     self.shader3d=  [[ProgrmaManager default] getProgram:Display3DShader.shaderStr];
}
@end
