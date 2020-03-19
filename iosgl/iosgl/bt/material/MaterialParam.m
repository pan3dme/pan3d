//
//  MaterialParam.m
//  iosgl
//
//  Created by zhao on 9/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "MaterialParam.h"
#import "DynamicTexItem.h"
#import "ParamDataVo.h"

@implementation MaterialParam
-(void)SetMaterial:(Material*)materialTree;
{
    self.material=materialTree;
    self.materialUrl=materialTree.url;
    self.dynamicTexList=[[NSMutableArray alloc]init];
    self.dynamicConstList=[[NSMutableArray alloc]init];
    [self setTexList];
    
 
}
-(void)setTexList;
{
    NSArray<TexItem*>* texList = self.material.texList;
    for(int i=0;i<texList.count;i++){
        DynamicTexItem*    dyTex = [[DynamicTexItem alloc]init];
        dyTex.target = texList[i];
        dyTex.paramName = texList[i].paramName;
        if (texList[i].isParticleColor) {
            [dyTex initCurve:4];
            dyTex.isParticleColor = YES;
        }
        [self.dynamicTexList addObject:dyTex];
        
    }
    
    /*
     
     if (texList[i].isParticleColor) {
         dyTex = new DynamicTexItem;
         dyTex.target = texList[i];
         dyTex.paramName = texList[i].paramName;
         dyTex.initCurve(4);
         this.dynamicTexList.push(dyTex);
         dyTex.isParticleColor = true;
     } else if (texList[i].isDynamic) {
         dyTex = new DynamicTexItem;
         dyTex.target = texList[i];
         dyTex.paramName = texList[i].paramName;
         this.dynamicTexList.push(dyTex);
     }
     */
    
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
    /*
     for (var i: number=0; i < ary.length; i++) {
            var obj: any = ary[i];
            for (var j: number = 0; j < this.dynamicTexList.length; j++) {
                if (this.dynamicTexList[j].paramName == obj.paramName) {
                    if (this.dynamicTexList[j].isParticleColor) {
                        this.dynamicTexList[j].curve.setData(obj.curve);
                    } else {
                        this.dynamicTexList[j].url = obj.url;
                    }
                    break;
                }
            }
        }
     */
}
-(void)setConstObj:(NSMutableArray *)ary
{
    for (int i=0; i < ary.count; i++) {
             NSDictionary* obj = ary[i];
            for (int j = 0; j < self.dynamicConstList.count; j++) {
                 
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
