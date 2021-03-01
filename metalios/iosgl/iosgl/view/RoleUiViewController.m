//
//  RoleUiViewController.m
//  iosgl
//
//  Created by pan3dme on 2021/3/1.
//  Copyright © 2021 zhao. All rights reserved.
//

#import "RoleUiViewController.h"
#import "Scene3D.h"
#import "Display3dMovie.h"
#import "MtkBaseLine.h"

@interface RoleUiViewController ()
@property (nonatomic, strong)Scene3D* scene3D;
@end

@implementation RoleUiViewController


- (void)viewDidLoad {
    [super viewDidLoad];
    
    self.scene3D=[[Scene3D alloc]init:self.view];
    [self.scene3D addDisplay: [[MtkBaseLine alloc]init:self.scene3D]];
    [ self.scene3D addMovieDisplay:[[Display3dMovie alloc]init: self.scene3D]];
}
- (void)touchesMoved:(NSSet *)touches withEvent:(UIEvent *)event {
    
    if(self.scene3D){
        UITouch *touch = [touches anyObject];
        CGPoint currentPoint = [touch locationInView:self.view];
        CGPoint prePoint = [touch previousLocationInView:self.view];
        CGFloat offsetX = currentPoint.x - prePoint.x;
        CGFloat offsetY = currentPoint.y - prePoint.y;
        self.scene3D.camera3D.rotationX +=offsetY*0.1;
        self.scene3D.camera3D.rotationY -=offsetX;
        [self.scene3D.camera3D upFrame];
        
    
    }
}



@end
