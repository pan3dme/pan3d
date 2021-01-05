//
//  GameLevel.h
//  BeerCanBully_Objective-C
//
//  Created by roctian on 2016/10/24.
//  Copyright © 2016年 roctian. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <SceneKit/SceneKit.h>
#import "CanPosition.h"

@interface GameLevel : NSObject

@property(nonatomic,strong) NSMutableArray <CanPosition *>*canPositions;

@end
