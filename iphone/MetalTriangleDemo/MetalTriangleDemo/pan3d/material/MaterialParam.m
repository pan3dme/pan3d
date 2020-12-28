//
//  MaterialParam.m
//  iosgl
//
//  Created by zhao on 9/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "MaterialParam.h"
#import "DynamicTexItem.h"
#import "DynamicConstItem.h"
#import "ParamDataVo.h"

@implementation MaterialParam
-(void)SetMaterial:(Material*)materialTree;
{
    self.material=materialTree;
    self.materialUrl=materialTree.url;
    self.dynamicTexList=[[NSMutableArray alloc]init];
    self.dynamicConstList=[[NSMutableArray alloc]init];
    [self setTexList];
    [self setConstList];
    
 
}
-(void)setTexList;
{
      MaterialParam* this=self;
    NSArray<TexItem*>* texList = this.material.texList;
    for(int i=0;i<texList.count;i++){
        DynamicTexItem*    dyTex = [[DynamicTexItem alloc]init];
        dyTex.target = texList[i];
        dyTex.paramName = texList[i].paramName;
        if (texList[i].isParticleColor) {
            [dyTex initCurve:4];
            dyTex.isParticleColor = YES;
        }
        [this.dynamicTexList addObject:dyTex];
         
    }
     
     
}
-(void)setConstList;
{
    MaterialParam* this=self;
    NSMutableArray<ConstItem*>* constList  = this.material.constList;
    for (int i=0; i < constList.count; i++) {
        ConstItem* constItem  = constList[i];
        DynamicConstItem* dyCon = [[DynamicConstItem alloc]init];
        if (constItem.param0Type != 0) {
            [dyCon setTargetInfo:constItem paramName:constItem.paramName0 type:constItem.param0Type];
        }
        if (constItem.param1Type != 0) {
            [dyCon setTargetInfo:constItem paramName:constItem.paramName1 type:constItem.param1Type];
        }
        if (constItem.param2Type != 0) {
            [dyCon setTargetInfo:constItem paramName:constItem.paramName2 type:constItem.param2Type];
        }
        if (constItem.param3Type != 0) {
            [dyCon setTargetInfo:constItem paramName:constItem.paramName3 type:constItem.param3Type];
        }
        [this.dynamicConstList  addObject:dyCon];
    }
}
 
-(void)SetLife:(float)life;
{
    
     for (int i=0; i<self.dynamicTexList.count; i++) {
         DynamicTexItem* dynamicTexItem= self.dynamicTexList[i];
         if(dynamicTexItem.isParticleColor){
             dynamicTexItem.life = life;
         }
         
     }
   
}

-(void)setTextObj:(NSMutableArray *)ary
{
    //[0]    ParamDataVo *    0x283655890    0x0000000283655890
     for (int i=0; i < ary.count; i++) {
          ParamDataVo* paramDataVo = ary[i];
         for (int j = 0; j < self.dynamicTexList.count; j++) {
             if ([self.dynamicTexList[j].paramName isEqualToString: paramDataVo.paramName]) {
                 if (self.dynamicTexList[j].isParticleColor) {
                     
                     [self.dynamicTexList[j].curve setData:paramDataVo.curve] ;
                 } else {
                     self.dynamicTexList[j].url =paramDataVo.url;
                 }
             }
         }
     }
 
}
-(void)setConstObj:(NSMutableArray *)ary
{
 
    for (int i=0; i < ary.count; i++) {
             NSDictionary* obj = ary[i];
            for (int j = 0; j < self.dynamicConstList.count; j++) {
                DynamicConstItem* dynamicConstItem=self.dynamicConstList[j];
                 if ([dynamicConstItem.paramName isEqualToString: obj[@"paramName"]]) {
                      [dynamicConstItem.curve setData:obj[@"curve"]] ;
                 }
            }
        }
  
    
    /*
     for (var i: number = 0; i < ary.length; i++) {
           var obj: any = ary[i];
           for (var j: number = 0; j < this.dynamicConstList.length; j++) {
               if (this.dynamicConstList[j].paramName == obj.paramName) {
                   this.dynamicConstList[j].curve.setData(obj.curve)
                   break;
               }
           }
       }
     */
}

 
@end
