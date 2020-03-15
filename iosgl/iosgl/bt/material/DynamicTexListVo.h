//
//  DynamicTexListVo.h
//  iosgl
//
//  Created by zhao on 16/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "Curve.h"

NS_ASSUME_NONNULL_BEGIN

@interface DynamicTexListVo : NSObject

@property (nonatomic,strong)NSString* paramName;
@property (nonatomic,strong)NSString* texture;
@property (nonatomic,assign)float life;
@property (nonatomic,strong)NSObject* target;
@property (nonatomic,strong)Curve* curve;
@property (nonatomic,strong)NSString* url;
@property (nonatomic,assign)BOOL isParticleColor;

//texture: (...)
//life: (...)
//target: TexItem {_id: 1, name: "fs1", url: "null", isDynamic: true, paramName: "ParticleColor", …}
//paramName: "ParticleColor"
//curve: Curve {valueV3d: Array(4), type: 4}
//isParticleColor: true
//_life: 78

@end

NS_ASSUME_NONNULL_END
