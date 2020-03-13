//
//  MaterialParam.m
//  iosgl
//
//  Created by zhao on 9/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "MaterialParam.h"
#import "DynamicTexItem.h"

@implementation MaterialParam
-(void)setMaterial:(Material*)materialTree;
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
        DynamicTexItem* dyTex;
        if (texList[i].isParticleColor) {
            
            dyTex = [[DynamicTexItem alloc]init];
                         dyTex.target = texList[i];
                         dyTex.paramName = texList[i].paramName;
//                         dyTex.initCurve(4);
//                         this.dynamicTexList.push(dyTex);
//                         dyTex.isParticleColor = true;
            
        } else if (texList[i].isDynamic) {
            
        }
        
    }
    
}
/*
 public setTexList(): void {
       var texList: Array<TexItem> = this.material.texList;
       for (var i: number = 0; i < texList.length; i++) {
           var dyTex: DynamicTexItem;
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

       }
   }
 */
-(void)setLife:(float)life;
{
    
}
@end
