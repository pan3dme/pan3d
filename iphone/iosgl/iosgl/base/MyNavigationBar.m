//
//  MyNavigationBar.m
//  iosgl
//
//  Created by zhao on 2/12/2019.
//  Copyright © 2019 zhao. All rights reserved.
//

#import "MyNavigationBar.h"
#import <UIKit/UIKit.h>
#define NavigationBar_H 40
@implementation MyNavigationBar

- (void)layoutSubviews {
    [super layoutSubviews];
    
    CGRect selfFrame = self.frame;
    selfFrame.origin.y = 0;
    self.frame = selfFrame;
    
    CGRect mFrame = CGRectZero;
    
    for (UIView *aView in self.subviews) {
        NSString*aString = NSStringFromClass([aView class]);
        if ([@[@"_UIBarBackground"] containsObject:aString]) {
            CGRect frame = aView.frame;
            frame.size.height = NavigationBar_H;
            frame.origin.y = 0;
            aView.frame = frame;
            NSLog(@"aView.frame,%f",frame.origin.y);
            mFrame = frame;
            aView.backgroundColor =[UIColor whiteColor];
            for (UIView*bView in aView.subviews) {
                NSString*bString = NSStringFromClass([bView class]);
                if ([@"UIVisualEffectView" containsString:bString]) {
                    bView.hidden = YES;
                }
                if([bView isKindOfClass:UIImageView.class]&&bView.bounds.size.height <= 1.0){
                    bView.hidden = YES;
                }
            }
        }
        
        if ([@[@"_UINavigationBarContentView"] containsObject:aString]) {
            aView.frame = mFrame;
        } }
}


@end
