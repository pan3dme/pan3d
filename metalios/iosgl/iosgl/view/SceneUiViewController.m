//
//  SceneUiViewController.m
//  iosgl
//
//  Created by pan3dme on 2021/3/1.
//  Copyright © 2021 zhao. All rights reserved.
//

#import "SceneUiViewController.h"
#import "Scene3D.h"
#import "MtkBaseLine.h"

@interface SceneUiViewController ()
 

@end

@implementation SceneUiViewController

 
- (void)viewDidLoad {
    [super viewDidLoad];
//    [self.scene3D loadSceneByUrl:@"2014"];
}
-(void)addMenuList;
{
    self.butItems=[[NSMutableArray alloc]init];
    NSMutableArray* arr=[[NSMutableArray alloc]init];
    [arr addObject:@"10002"];
    [arr addObject:@"10005"];
    [arr addObject:@"2014"];
    [arr addObject:@"1003"];
 
    [self addButsByArr:arr  ];
    
    [self viewDidLayoutSubviews];
  
}

- (BOOL) addMenuListClikEvent:(UIButton *) btn;
{
   BOOL isCanNext= [super addMenuListClikEvent:btn];
    if(isCanNext){
        NSString* titleStr=btn.titleLabel.text;
        [self.scene3D loadSceneByUrl:titleStr];
    }
    return true;
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
