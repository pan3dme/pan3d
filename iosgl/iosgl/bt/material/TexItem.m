//
//  TexItem.m
//  iosgl
//
//  Created by zhao on 9/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "TexItem.h"
@interface TexItem()
@property (nonatomic, assign)  int  id;
@end
@implementation TexItem
- (instancetype)init
{
    self = [super init];
    if (self) {
         
    }
    return self;
}
-(void)setId:(int)id;
{
    _id=id;
    self.name =[NSString stringWithFormat:@"fs%d",id];
}
@end
