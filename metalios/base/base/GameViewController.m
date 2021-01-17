//
//  ViewController.m
//  LearnMetal
//
//  Created by loyinglin on 2018/6/21.
//  Copyright © 2018年 loyinglin. All rights reserved.
//
@import MetalKit;
@import GLKit;
 
#import "GameViewController.h"
#import "Scene3D.h"

@interface GameViewController ()

@property (nonatomic, strong)Scene3D* _scene3d;

@end

@implementation GameViewController

- (void)viewDidLoad {
    [super viewDidLoad];
 
    self._scene3d=[[Scene3D alloc]init:self.view];
 
}

 

@end
