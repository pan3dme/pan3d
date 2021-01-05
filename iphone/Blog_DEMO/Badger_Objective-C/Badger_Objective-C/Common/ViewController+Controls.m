//
//  ViewController+Controls.m
//  Badger_Objective-C
//
//  Created by tianpengfei on 16/10/29.
//  Copyright © 2016年 roctian. All rights reserved.
//

#import "ViewController+Controls.h"

@implementation ViewController (Controls)

// MARK: Game Controller Events

-(void)setupGameControllers{
    
    NSArray *directions = @[    @(UISwipeGestureRecognizerDirectionRight),
                                @(UISwipeGestureRecognizerDirectionLeft),
                                @(UISwipeGestureRecognizerDirectionUp),
                                @(UISwipeGestureRecognizerDirectionDown)
                                ];
    for(id direction in directions){
        
        UISwipeGestureRecognizer *swipeGestureRecognizer = [[UISwipeGestureRecognizer alloc] initWithTarget:self action:@selector(didSwipe:)];
        swipeGestureRecognizer.direction = (UISwipeGestureRecognizerDirection)direction;
        [self.sceneView addGestureRecognizer:swipeGestureRecognizer];
    }
    
}
-(void)didSwipe:(UISwipeGestureRecognizer *)sender{
    if ([self startGameIfNeeded]){
        return;
    }
    
    switch(sender.direction){
        case UISwipeGestureRecognizerDirectionUp:{
            [self jump];
            break;
        }
        case UISwipeGestureRecognizerDirectionDown: {
         
            [self squat];
            break;
        }
        case UISwipeGestureRecognizerDirectionLeft: {
         
            [self leanLeft];
            break;
        }
        case UISwipeGestureRecognizerDirectionRight:{
            
            [self leanRight];
            break;
        }
        default: break;
    }
}

@end
