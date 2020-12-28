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
 

-(void)SetMaterial:(Material*)materialTree;
-(void)SetLife:(float)life;
-(void)setTextObj:(NSMutableArray *)ary;
-(void)setConstObj:(NSMutableArray *)ary;
 
@end

NS_ASSUME_NONNULL_END
