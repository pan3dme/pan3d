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
 
@end

@implementation RoleUiViewController


- (void)viewDidLoad {
    [super viewDidLoad];
//    [ self.scene3D addMovieDisplay:[[Display3dMovie alloc]init: self.scene3D]];
 
}
-(void)addMenuList;
{
    self.butItems=[[NSMutableArray alloc]init];
    NSMutableArray* arr=[[NSMutableArray alloc]init];
    [arr addObject:@"50011"];
    [arr addObject:@"2052"];
    [arr addObject:@"yezhuz"];
    [self addButsByArr:arr ];
    
    
    [self viewDidLayoutSubviews];
  
}
- (BOOL) addMenuListClikEvent:(UIButton *) btn;
{
   BOOL isCanNext= [super addMenuListClikEvent:btn];
    if(isCanNext){
        NSString* titleStr=btn.titleLabel.text;
        Display3dMovie *role=[[Display3dMovie alloc]init: self.scene3D];
        [role setRoleUrl:getRoleUrl(titleStr)];
        [ self.scene3D addMovieDisplay:role];
 
    }
    return true;
}
 


@end
