//
//  SkillKeyVo.m
//  iosgl
//
//  Created by zhao on 17/4/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "SkillKeyVo.h"

@implementation SkillKeyVo
-(void)setData:(DataObjTempVo*)data;
{
    self.frame =data.frame ;
    self.url = data.url;
}
@end
