//
//  SceneChar.h
//  iosgl
//
//  Created by zhao on 18/4/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "Display3dMovie.h"
#import "Skill.h"
#import "MountChar.h"

NS_ASSUME_NONNULL_BEGIN


@interface SceneChar : Display3dMovie


+(NSString*)WEAPON_PART;
+(NSString*)WEAPON_DEFAULT_SLOT;
+(NSString*)MOUNT_SLOT;
+(NSString*)WING_SLOT;
+(NSString*)SEL_PART;
+(NSString*)NONE_SLOT;

@property(nonatomic,strong)MountChar* mountChar;

-(void)playSkill:(Skill*)skill;
-(void)setMountById:(NSString*)mountName;

@end

NS_ASSUME_NONNULL_END
