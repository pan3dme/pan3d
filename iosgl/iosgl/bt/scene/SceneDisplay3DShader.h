//
//  SceneDisplay3DShader.h
//  iosgl
//
//  Created by zhao on 10/1/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "Shader3D.h"

//static NSString * const SceneDisplay3DShader_str                      = @"SceneDisplay3DShader_str";

NS_ASSUME_NONNULL_BEGIN

@interface SceneDisplay3DShader : Shader3D
+(NSString*)shaderStr;
@end

NS_ASSUME_NONNULL_END
