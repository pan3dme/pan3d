//
//  Display3DLocusShader.h
//  iosgl
//
//  Created by zhao on 25/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "Shader3D.h"

NS_ASSUME_NONNULL_BEGIN

@interface Display3DLocusShader : Shader3D<ShaderBind>
+(NSString*)shaderStr;
@end

NS_ASSUME_NONNULL_END
