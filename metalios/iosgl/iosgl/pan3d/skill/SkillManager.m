//
//  SkillManager.m
//  iosgl
//
//  Created by zhao on 17/4/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "SkillManager.h"
#import "Skill.h"
#import "TimeUtil.h"
#import "SkillRes.h"
#import "Scene_data.h"
#import "SkillLoadInfo.h"
#import "ResManager.h"

@implementation SkillManager
static SkillManager *instance = nil;
 
+ (instancetype)default{
    if (instance == nil) {
        instance = [[SkillManager alloc] init];
    }
    return instance;
}
- (instancetype)init
{
    self = [super init];
    if (self) {
        self._skillDic=[[NSMutableDictionary alloc]init];
        self._loadDic=[[NSMutableDictionary alloc]init];
        self._preLoadDic=[[NSMutableDictionary alloc]init];
        self._skillAry=[[NSMutableArray alloc]init];
        self._time=0;
        
    }
    return self;
}
-(void)update;
{
    SkillManager* this=self;
    double _tempTime = [[TimeUtil default]getTimer];
    double t  = _tempTime - this._time;
    for (int i = 0; i < this._skillAry.count; i++) {
        [this._skillAry[i] update :t];
    }
    this._time=_tempTime;
    
}
/*
 public update(): void {
      var _tempTime: number = TimeUtil.getTimer();
      var t: number = _tempTime - this._time;
      for (var i: number = 0; i < this._skillAry.length; i++) {
          this._skillAry[i].update(t);
      }
      this._time = _tempTime;
  }
 */
-(void)preLoadSkill:(NSString*)url;
{
    SkillManager* this=self;
    if (this.dic[url] || this._preLoadDic[url]){
        return;
    }
    
    [self.scene3D.resManager loadSkillRes:[[Scene_data default]getWorkUrlByFilePath:url]  fun:^(SkillRes * _Nonnull skillRes) {
        SkillData* skillData=[[SkillData alloc]init:self.scene3D];
        skillData.data=skillRes.data;
        this.dic[url] = skillData;
    }];
}
-(void)removeSkill:(Skill*)skill;
{
    
    NSInteger indexs=  [self._skillAry indexOfObject:skill];
    if(indexs!=-1){
        [self._skillAry removeObjectAtIndex:indexs];
    }
 
}
-(void)playSkill:(Skill*)skill
{
    [self._skillAry addObject:skill];
    [skill play];
 
}
-(Skill*)getSkill:(NSString*)url name:(NSString*)name;
{
    SkillManager* this=self;
    Skill* skill;
    NSString* key= [url stringByAppendingString:name];
 
    
    NSMutableArray<Skill*>* ary = this._skillDic[key];
    if(ary){
        for (int i = 0; i < ary.count; i++){
            skill = ary[i];
            if (skill.isDeath && skill.useNum ==0){
                [skill reset];
                skill.isDeath = false;
                return skill;
            }
        }
    }
    skill = [[Skill alloc]init:self.scene3D];
    skill.name = name;
    skill.isDeath = NO;
    if (!this._skillDic[key]) {
        this._skillDic[key] =[[NSMutableArray alloc]init];
    }
    [this._skillDic[key] addObject:skill];
    if (this.dic[url]) {
        SkillData* skillData=(SkillData*)this.dic[url];
        [skill setData:skillData.data[skill.name] skillData:skillData];
        skillData.useNum++;
        return skill;
    }
    
    if (this._loadDic[url]) {
//        var obj: any = new Object;
//        obj.name = $name;
//        obj.skill = skill;
//        this._loadDic[$url].push(obj);
        return skill;
    }
    
    this._loadDic[url] =[[NSMutableArray alloc]init];
    SkillLoadInfo* obj = [[SkillLoadInfo alloc]init];
    obj.name = name;
    obj.skill= skill;

    [this._loadDic[url] addObject:obj];
    [self.scene3D.resManager loadSkillRes:[[Scene_data default]getWorkUrlByFilePath:url]  fun:^(SkillRes * _Nonnull skillRes) {
        [self loadSkillCom:url skillRes:skillRes];
    }];
     
    return skill;
}
 
-(void)loadSkillCom:(NSString*)url  skillRes:(SkillRes*)skillRes;
{
    SkillManager* this=self;
    SkillData* skillData=[[SkillData alloc]init:self.scene3D];
    skillData.data=skillRes.data;
    NSMutableArray* urlArr=  (NSMutableArray*)this._loadDic[url];
    for (int i = 0; i < urlArr.count; i++) {
        SkillLoadInfo* obj = urlArr[i];
            Skill* vo= obj.skill;
            [vo setData:skillData.data[obj.name] skillData:skillData];
            skillData.useNum++;
    }
    [this._loadDic removeObjectForKey: url];
     this.dic[url] = skillData;
  
    
  
}
 
@end


