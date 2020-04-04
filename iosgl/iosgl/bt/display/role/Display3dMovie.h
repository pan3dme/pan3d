//
//  Display3dMovie.h
//  iosgl
//
//  Created by zhao on 2/4/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "Display3DSprite.h"
#import "SkinMesh.h"

NS_ASSUME_NONNULL_BEGIN

@interface Display3dMovie : Display3DSprite
@property(nonatomic,strong)SkinMesh*  skinMesh;
@property(nonatomic,strong)NSMutableDictionary*  animDic;
-(void)setRoleUrl:(NSString*)value;
- (void)updateFrame:(float)t;
@end

NS_ASSUME_NONNULL_END
