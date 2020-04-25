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

/*
[0]    (null)    @"attack_03" : (no summary)
[1]    (null)    @"stand" : (no summary)
[2]    (null)    @"walk" : (no summary)
[3]    (null)    @"stand_mount_01" : (no summary)
[4]    (null)    @"attack_01" : (no summary)
[5]    (null)    @"jump" : (no summary)
[6]    (null)    @"death" : (no summary)
[7]    (null)    @"injured" : (no summary)
[8]    (null)    @"attack_010" : (no summary)
[9]    (null)    @"attack_02" : (no summary)
[10]    (null)    @"m_attack_01" : (no summary)
[11]    (null)    @"m_attack_02" : (no summary)
[12]    (null)    @"walk_mount_01" : (no summary)
[13]    (null)    @"m_attack_03" : (no summary)
[14]    (null)    @"attack_020" : (no summary)
[15]    (null)    @"m_attack_04" : (no summary)
*/

@property(nonatomic,strong)MountChar* mountChar;

-(void)playSkill:(Skill*)skill;
-(void)setMountById:(NSString*)mountName;

@end

NS_ASSUME_NONNULL_END
