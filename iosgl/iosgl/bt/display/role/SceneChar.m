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
-(void)setMountById:(NSString*)mountName;
{
    SceneChar* this=self;
    if(!this.mountChar){
        this.mountChar=[[MountChar alloc]init];
        [this.scene3d addMovieDisplay:this.mountChar];
        [this setBind:this.mountChar bindSocket:SceneChar.MOUNT_SLOT];
    }
    [this.mountChar setRoleUrl: getRoleUrl(mountName)];
 
}
 
/*
public setMountById($mountId: string): void {
          if (!this.mountChar) {
              this.mountChar = new MountChar();
          }
          this.mountChar.setRoleUrl(getRoleUrl($mountId));
          this.setBind(this.mountChar, SceneChar.MOUNT_SLOT);
          SceneManager.getInstance().addMovieDisplay(this.mountChar);

          this.isMount = true
      }
*/
- (void)upFrame;
{
     [super upFrame];
}
@end

