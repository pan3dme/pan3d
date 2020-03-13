//
//  MaterialParam.h
//  iosgl
//
//  Created by zhao on 9/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "Material.h"
#import "Shader3D.h"
#import "MaterialBaseParam.h"

NS_ASSUME_NONNULL_BEGIN
 
@interface MaterialParam : MaterialBaseParam

@property (nonatomic, strong)  NSString*  materialUrl;
@property (nonatomic, strong)  Shader3D*  shader;
 

-(void)setMaterial:(Material*)materialTree;
-(void)setLife:(float)life;
 
@end

NS_ASSUME_NONNULL_END
