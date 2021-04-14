//
//  ObjectWeight.m
//  iosgl
//
//  Created by pan3dme on 2020/11/12.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "ObjectWeight.h"

@implementation ObjectWeight

-(ObjectWeight*)clone{
    ObjectWeight* this=self;
    ObjectWeight* obj=[[ObjectWeight alloc]init];
    obj.x = this.x;
    obj.y = this.y;
    obj.z = this.z;
    obj.w = this.w;
    obj.weight = this.weight;
    obj.boneId = this.boneId;
    obj.id = this.id;
    return obj;
}
 
@end
