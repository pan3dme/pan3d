//
//  ProgrmaManager.h
//  iosgl
//
//  Created by zhao on 7/12/2019.
//  Copyright © 2019 zhao. All rights reserved.
//

#import "ResGC.h"
#import "Material.h"
#import "Shader3D.h"

NS_ASSUME_NONNULL_BEGIN
 
@interface ProgrmaManager : ResGC

 
 
+ (instancetype)default;
-(Shader3D*) getProgram:(NSString*)value ;
-(void)registe:(NSString*)keystr shader3d:(Shader3D*)shader3d;
-(Shader3D*)getMaterialProgram:(NSString*)key shaderCls:(Shader3D*)shaderCls   material:(Material*)material paramAry:(NSArray<NSNumber*>*)paramAry parmaByFragmet:(BOOL)parmaByFragmet ;
   
@end

NS_ASSUME_NONNULL_END
