//
//  MaterialBaseParam.m
//  iosgl
//
//  Created by zhao on 9/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "MaterialBaseParam.h"
#import "DynamicBaseConstItem.h"
#import "ConstItem.h"
#import "TexItem.h"
#import "Scene_data.h"
#import "TextureManager.h"

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
        int obj_type=[obj[@"type"]intValue];
        NSString* obj_name=(NSString*)obj[@"name"] ;
        if (obj_type == 0) {
            DynamicBaseTexItem* texItem   = [[DynamicBaseTexItem alloc]init];
            texItem.paramName = obj_name;
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
            
            [[ TextureManager default]getTexture:[[Scene_data default]getWorkUrlByFilePath:obj[@"url"]] fun:^(NSObject * _Nonnull any) {
                texItem.textureRes=(TextureRes*)any;
            } wrapType:0 info:nil filteType:0 mipmapType:0];
            
            // [this.dynamicTexList addObject:texItem];
            
            
        } else {
            NSString* targetName = obj_name;
            ConstItem* target = nil;
            for (int j = 0; j < constList.count; j++) {
                if (targetName == constList[j].paramName0
                    || targetName == constList[j].paramName1
                    || targetName == constList[j].paramName2
                    || targetName == constList[j].paramName3) {
                    target = constList[j];
                    break;
                }
            }
            DynamicBaseConstItem* constItem = [[DynamicBaseConstItem alloc]init];
            [constItem setTargetInfo:target paramName:targetName type: obj_type ];
            if (obj_type== 1) {
                [constItem setCurrentVal:obj[@"x"]];
            } else if (obj_type== 2) {
                [constItem setCurrentVal:obj[@"x"] y:obj[@"y"]];
            } else {
                [constItem setCurrentVal:obj[@"x" ] y:obj[@"y"] z:obj[@"z"]];
            }
            [this.dynamicConstList addObject:constItem];
            
            
        }
    }
    
}
@end
