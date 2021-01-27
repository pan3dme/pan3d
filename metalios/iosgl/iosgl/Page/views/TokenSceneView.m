//
//  TokenSceneView.m
//  iosgl
//
//  Created by zhao on 21/2/2020.
//  Copyright © 2020 zhao. All rights reserved.
//
#import "GL_Header.h"
 
#import "TokenSceneView.h"
#import "Scene3D.h"
 

@interface TokenSceneView ()
@property (nonatomic, strong)Scene3D* scene3D;
@end

@implementation TokenSceneView

- (void)viewDidLoad {
    [super viewDidLoad];
    
    self.scene3D=[[Scene3D alloc]init:self.view];
    
    
}
 

@end
