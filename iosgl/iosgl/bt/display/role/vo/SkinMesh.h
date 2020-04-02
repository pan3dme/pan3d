//
//  SkinMesh.h
//  iosgl
//
//  Created by zhao on 2/4/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "ResCount.h"
#import "Vector2D.h"

NS_ASSUME_NONNULL_BEGIN

@interface SkinMesh : ResCount
@property(nonatomic,strong)Vector2D* hitBox;
@property(nonatomic,assign)float fileScale;
@property(nonatomic,assign)float tittleHeight;

-(void)makeHitBoxItem;
@end
typedef void (^SkinMeshBfun)(SkinMesh* skinMesh);
NS_ASSUME_NONNULL_END
