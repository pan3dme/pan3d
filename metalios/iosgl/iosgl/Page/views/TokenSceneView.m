//
//  TokenSceneView.m
//  iosgl
//
//  Created by zhao on 21/2/2020.
//  Copyright © 2020 zhao. All rights reserved.
//
#import "GL_Header.h"
 
#import "TokenSceneView.h"
#import "MtkScene3D.h"
 

@interface TokenSceneView ()
@property (nonatomic, strong)MtkScene3D* _mtkScene3D;
@end

@implementation TokenSceneView

- (void)viewDidLoad {
    [super viewDidLoad];
    
    self._mtkScene3D=[[MtkScene3D alloc]init:self.view];
    
    
}
 

@end