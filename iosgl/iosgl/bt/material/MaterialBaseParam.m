//
//  MaterialBaseParam.m
//  iosgl
//
//  Created by zhao on 9/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "MaterialBaseParam.h"
#import "ConstItem.h"
#import "TexItem.h"

@implementation MaterialBaseParam
-(void)setData:(Material*)material ary:(NSArray<NSDictionary*>*)ary;
{
    MaterialBaseParam* this=self;
    this.material = material;
    this.dynamicConstList =  [NSMutableArray alloc];
    this.dynamicTexList = [NSMutableArray alloc];

           NSMutableArray<ConstItem*>* constList  = material.constList;
           NSMutableArray<TexItem*>* texList  = material.texList;

           for (int i = 0; i < ary.count; i++) {
               NSDictionary* obj = ary[i];
               if (obj[@"type"] == 0) {
                   DynamicBaseTexItem* texItem   = [[DynamicBaseTexItem alloc]init];
                   texItem.paramName = obj[@"name"];


                   for (int j = 0; j < texList.count; j++) {
                       if (texItem.paramName == texList[j].paramName) {
                           texItem.target = texList[j];
                           break;
                       }
                   }
                   int mipmap = 0;
                   if (texItem.target) {
                       mipmap = texItem.target.mipmap;
                   }
                   mipmap = 0;

                   /*
                   TextureManager.getInstance().getTexture(Scene_data.fileRoot + obj.url, ($textres: TextureRes) => {
                       texItem.textureRes = $textres;
                   }, 0, null, 0, mipmap);
                   [this.dynamicTexList addObject:texItem];

*/

               } else {
                   /*
                   var targetName:string = obj.name;
                   
                   var target:ConstItem = null;
                   for (var j: number = 0; j < constList.length; j++) {

                       if (targetName == constList[j].paramName0
                           || targetName == constList[j].paramName1
                           || targetName == constList[j].paramName2
                           || targetName == constList[j].paramName3) {

                           target = constList[j];

                           break;

                       }

                   }
                   var constItem: DynamicBaseConstItem = new DynamicBaseConstItem();
                   constItem.setTargetInfo(target,targetName,obj.type);

                   if (obj.type == 1) {
                       constItem.setCurrentVal(obj.x);
                   } else if (obj.type == 2) {
                       constItem.setCurrentVal(obj.x,obj.y);
                   } else {
                       constItem.setCurrentVal(obj.x,obj.y,obj.z);
                   }

                   this.dynamicConstList.push(constItem);
*/
               }
           }

}
@end
