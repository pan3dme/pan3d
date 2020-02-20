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
#import "Matrix4x4.h"

 
@interface OnePageView ()
@property (nonatomic, strong) SceneView *sceneView;
@end

@implementation OnePageView

- (void)viewDidLoad {
    [super viewDidLoad];
     self.title=@"one";
}
- (void)initFWUI NS_REQUIRES_SUPER;
{
    [super initFWUI];
   
     self.sceneView=[[SceneView alloc]init];
      self.sceneView.frame=CGRectMake(10, 100, 300, 300);
      [self.view addSubview:  self.sceneView];
    
 
    
    Matrix4x4 modelview = Matrix4x4Ortho(1,2,3,4,5,6) ;
    
     modelview=  Matrix4x4Rotate(modelview,1,1,1,1);
  
    
     

}


 
 

@end
