//
//  SkillManager.m
//  iosgl
//
//  Created by zhao on 17/4/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "SkillManager.h"
#import "Skill.h"
#import "SkillRes.h"
#import "Scene_data.h"
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
    skill = [[Skill alloc]init];
    skill.name = name;
    skill.isDeath = NO;
    if (!this._skillDic[key]) {
        this._skillDic[key] =[[NSMutableArray alloc]init];
    }
    [this._skillDic[key] addObject:skill];
    
    if (this.dic[url]) {
        [skill setData:this.dic[url] skillData:this.dic[url]];
        //this._dic[url].useNum++;
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
    NSMutableDictionary* obj = [[NSMutableDictionary alloc]init];
    obj[@"name"] = name;
    obj[@"skill"] = skill;
    [this._loadDic[url] addObject:obj];
    
    
      [[ResManager default]loadSkillRes:[[Scene_data default]getWorkUrlByFilePath:url]  fun:^(SkillRes * _Nonnull skillRes) {
          
        //  [self roleResCom:roleRes fun:^(NSString *localPath) {
              
          }];
    
//    ResManager.getInstance().loadSkillRes(Scene_data.fileRoot + $url, ($skillRes: SkillRes) => {
//
//            this.loadSkillCom($url, $skillRes);
//
//        });
    return skill;
}
/*
 public getSkill($url:string,$name:string): Skill {
        var skill: Skill;
        var key: string = $url + $name;

        var ary: Array<Skill> = this._skillDic[key];
        if (ary){
            for (var i: number = 0; i < ary.length; i++){
                skill = ary[i];
                if (skill.isDeath && skill.useNum ==0){
                    skill.reset();
                    skill.isDeath = false;
                    return skill;
                }
            }
        }

        skill = new Skill();
        skill.name = $name;
        skill.isDeath = false;

        if (!this._skillDic[key]) {
            this._skillDic[key] = new Array;
        }
        this._skillDic[key].push(skill);

        if (this._dic[$url]) {
            skill.setData(this._dic[$url].data[skill.name], this._dic[$url]);
            this._dic[$url].useNum++;
            return skill;
        }

        if (this._loadDic[$url]) {
            var obj: any = new Object;
            obj.name = $name;
            obj.skill = skill;
            this._loadDic[$url].push(obj);
            return skill;
        }

        this._loadDic[$url] = new Array;
        var obj: any = new Object;
        obj.name = $name;
        obj.skill = skill;
        this._loadDic[$url].push(obj);


        ResManager.getInstance().loadSkillRes(Scene_data.fileRoot + $url, ($skillRes: SkillRes) => {

            this.loadSkillCom($url, $skillRes);

        });
        return skill;
    }
 */
@end


