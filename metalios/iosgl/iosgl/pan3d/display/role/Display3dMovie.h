//
//  Display3dMovie.h
//  iosgl
//
//  Created by zhao on 2/4/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "Display3DSprite.h"
#import "SkinMesh.h"
#import "IBind.h"

NS_ASSUME_NONNULL_BEGIN

@interface Display3dMovie : Display3DSprite <IBind>
@property(nonatomic,strong)NSString*  defaultAction ;
@property(nonatomic,strong)SkinMesh*  skinMesh;
@property(nonatomic,strong)NSMutableDictionary*  animDic;
@property(nonatomic,assign)NSString*  curentAction;

-(void)setRoleUrl:(NSString*)value;
- (void)updateFrame:(float)t;
-(BOOL)play:(NSString*)action;
-(BOOL)play:(NSString*)action completeState:(int)completeState needFollow:(BOOL)needFollow;
-(void)addPart:(NSString*)key bindSocket:(NSString*)bindSocket url:(NSString*)url;
-(void)playSkill:(Skill*)skill;
@end

NS_ASSUME_NONNULL_END
