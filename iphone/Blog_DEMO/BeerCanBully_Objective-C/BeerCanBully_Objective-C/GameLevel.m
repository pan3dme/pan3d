//
//  GameLevel.m
//  BeerCanBully_Objective-C
//
//  Created by roctian on 2016/10/24.
//  Copyright © 2016年 roctian. All rights reserved.
//

#import "GameLevel.h"

@implementation GameLevel
-(id)init{

    self = [super init];
    if(self){
    
        _canPositions = [NSMutableArray new];
    }
    return self;
}
@end
