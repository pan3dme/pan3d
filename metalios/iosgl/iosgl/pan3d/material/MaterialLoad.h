//
//  MaterialLoad.h
//  iosgl
//
//  Created by zhao on 9/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "Shader3D.h"
#import "Material.h"
#import "GL_Header.h"

NS_ASSUME_NONNULL_BEGIN


@interface MaterialLoad : NSObject
 
@property (nonatomic, strong) SuccessMaterial  fun;
@property (nonatomic, strong) NSDictionary*  info;
@property (nonatomic, strong) NSString*  url;
@property (nonatomic, assign) BOOL  autoReg;
@property (nonatomic, strong) NSString*  regName;
@property (nonatomic, strong) Shader3D*  shader3D;
- (instancetype)init:(SuccessMaterial)fun info:(NSDictionary*)info url:(NSString*)url autoReg:(BOOL)autoReg regName:(NSString*)regName shader:(Shader3D*)shader;
@end

NS_ASSUME_NONNULL_END
