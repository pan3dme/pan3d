//
//  SceneChar.m
//  iosgl
//
//  Created by zhao on 18/4/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "SceneChar.h"
#import "Skill.h"
#import "Scene3D.h"
#import "SkillManager.h"
@interface SceneChar()
 
@property(nonatomic,strong)Skill* skillVo;
@end
@implementation SceneChar
+(NSString*)WEAPON_PART;
{
    return @"weapon";
}
+(NSString*)WEAPON_DEFAULT_SLOT;
{
    return @"w_01";
}
+(NSString*)MOUNT_SLOT;
{
    return @"mount_01";
}
+(NSString*)WING_SLOT;
{
    return @"wing_01";
}
+(NSString*)SEL_PART;
{
    return @"select";
}
+(NSString*)NONE_SLOT;
{
    return @"none";
}

-(void)playSkill:(Skill*)skill;
{
    [self.scene3d.skillManager  playSkill:skill];

    self.skillVo=skill;
 
}
-(void)setWeaponByAvatar:(int)avatar;
{
    
}
//public setWeaponByAvatar(avatar: number,$suffix:string =""): void {
//    var so: tb.TB_item_slot = tb.TB_item_slot.getTempVo(avatar)
//    if (so) {
//        this.addPart(SceneChar.WEAPON_PART, so.slot, this.getSceneCharWeaponUrl(avatar,$suffix));
//    } else {
//        this.addPart(SceneChar.WEAPON_PART, SceneChar.WEAPON_DEFAULT_SLOT, this.getSceneCharWeaponUrl(avatar,$suffix));
//    }
//}
- (void)upFrame;
{
     [super upFrame];
}
@end

