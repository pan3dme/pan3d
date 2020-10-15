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
-(BOOL)play:(NSString*)action completeState:(int)completeState needFollow:(BOOL)needFollow;
{
    BOOL temp= [super play:action completeState:completeState needFollow:needFollow];
    [self changeMountAction];
    return  temp;
}
-(void)changeMountAction;
{
    SceneChar* this=self;
    NSString* action=this.curentAction;
    if(self.mountChar){
        action=action?action:this.defaultAction;
        if([action isEqualToString:CharAction_stand]||[action isEqualToString:CharAction_stand_mount_01]){
            this.curentAction=CharAction_stand_mount_01;
            self.mountChar.curentAction=CharAction_stand;
        }
        else if([action isEqualToString:CharAction_walk]||[action isEqualToString:CharAction_walk_mount_01]){
            this.curentAction=CharAction_walk_mount_01;
            self.mountChar.curentAction=CharAction_walk;
        }else{
            self.mountChar.curentAction=CharAction_stand;
        }
    }
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
    [self changeMountAction];
    [self refrishmountPos];
 
}
/*
 刷新坐骑位置
 */
- (void)refrishmountPos;
{
    SceneChar* this=self;
    if(this.mountChar){
        this.mountChar.x=this.x;
        this.mountChar.y=this.y;
        this.mountChar.z=this.y;
        this.mountChar.rotationY=this.rotationY;
    }
}
-(void)setX:(float)value; {
    [super setX:value];
    [self refrishmountPos];
}
-(void)setY:(float)value;{
    [super setY:value];
    [self refrishmountPos];
}
-(void)setZ:(float)value;{
    [super setZ:value];
    [self refrishmountPos];
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
