//
//  OnePageView.m
//  iosgl
//
//  Created by zhao on 2/12/2019.
//  Copyright © 2019 zhao. All rights reserved.
//

#import "OnePageView.h"
#import "MathCore.h"
#import "CtxUIView.h"
#import "GLSpriteView.h"
#import "SceneView.h"
#import "Matrix3D.h"
@interface OnePageView ()

@end

@implementation OnePageView

- (void)viewDidLoad {
    [super viewDidLoad];
     self.title=@"one";
}
- (void)initFWUI NS_REQUIRES_SUPER;
{
    [super initFWUI];
   
    SceneView *abc=[[SceneView alloc]init];
    abc.frame=CGRectMake(10, 100, 300, 500);
   [self.view addSubview:abc];
    
 
    

}

 
 

@end
