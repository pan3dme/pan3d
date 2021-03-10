//
//  Frame3dViewController.m
//  iosgl
//
//  Created by pan3dme on 2021/3/10.
//  Copyright © 2021 zhao. All rights reserved.
//

#import "Frame3dViewController.h"
#import "Frame3dSprite.h"

@interface Frame3dViewController ()

@end

@implementation Frame3dViewController


- (void)viewDidLoad {
    [super viewDidLoad];
    
    Frame3dSprite* temp=[[Frame3dSprite alloc]init:self.scene3D];
    
    [self.scene3D addDisplay:temp];
    
 
}
-(void)addMenuList;
{
    self.butItems=[[NSMutableArray alloc]init];
    NSMutableArray* arr=[[NSMutableArray alloc]init];
    [arr addObject:@"动态场景"];
 
 
    [self addButsByArr:arr ];
    
    
    [self viewDidLayoutSubviews];
  
}
- (BOOL) addMenuListClikEvent:(UIButton *) btn;
{
    BOOL isCanNext= [super addMenuListClikEvent:btn];
    if(!isCanNext){
        return isCanNext;
    }
//    NSString* titleStr=btn.titleLabel.text;
   
    
    
    return true;
}



@end
