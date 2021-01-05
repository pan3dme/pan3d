//
//  CAAnimation+CAAnimation_SceneName.m
//  Badger_Objective-C
//
//  Created by roctian on 2016/10/27.
//  Copyright © 2016年 roctian. All rights reserved.
//

#import "CAAnimation+SceneName.h"

@implementation CAAnimation (SceneName)

+(CAAnimation *)animationWithSceneName:(NSString *)name{

    SCNScene *scene = [SCNScene sceneNamed:name];
    if(!scene){
    
        NSAssert(true, @"Failed to find scene with name \(name).");
    }
    
    __block CAAnimation *animation;
    [scene.rootNode enumerateChildNodesUsingBlock:^(SCNNode * _Nonnull child, BOOL * _Nonnull stop) {
        
        NSString *firstKey = [child.animationKeys firstObject];
        if(!firstKey)
            return ;
        animation = [child animationForKey:firstKey];
        stop = YES;
    }];
    
    if(!animation){
       NSString *info = [NSString stringWithFormat:@"Failed to find animation named %@.",name];
        NSAssert(true,info);
    }
    
    animation.fadeInDuration = 0.3;
    animation.fadeOutDuration = 0.3;
    animation.repeatCount = 1;
    
    return animation;
}

@end
