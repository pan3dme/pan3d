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
#import "SceneChar.h"
 

@interface RoleUiViewController ()

@property (nonatomic, strong)Display3dMovie* mainChar;
@end

@implementation RoleUiViewController


- (void)viewDidLoad {
    [super viewDidLoad];
//    [ self.scene3D addMovieDisplay:[[Display3dMovie alloc]init: self.scene3D]];
    
    self.mainChar=[[Display3dMovie alloc]init: self.scene3D];
    [self.mainChar setRoleUrl:getRoleUrl(@"50011")];
    [ self.scene3D addMovieDisplay:self.mainChar];
    [self.mainChar addPart:SceneChar.WEAPON_PART bindSocket:SceneChar.WEAPON_DEFAULT_SLOT url:getModelUrl(@"weapon1")];
    
 
    
   
 
}
-(void)addMenuList;
{
    self.butItems=[[NSMutableArray alloc]init];
    NSMutableArray* arr=[[NSMutableArray alloc]init];
    [arr addObject:@"50011"];
    [arr addObject:@"wuqi"];
    [arr addObject:@"2052"];
    [arr addObject:@"yezhuz"];
    [arr addObject:@"stand"];
    [arr addObject:@"walk"];
    [arr addObject:@"death"];
    [self addButsByArr:arr ];
    
    
    [self viewDidLayoutSubviews];
  
}
- (BOOL) addMenuListClikEvent:(UIButton *) btn;
{
    BOOL isCanNext= [super addMenuListClikEvent:btn];
    if(!isCanNext){
        return isCanNext;
    }
    NSString* titleStr=btn.titleLabel.text;
    if([titleStr isEqualToString:@"wuqi"]){
        [self.mainChar addPart:SceneChar.WEAPON_PART bindSocket:SceneChar.WEAPON_DEFAULT_SLOT url:getModelUrl(@"weapon1")];
    }else if([titleStr isEqualToString:@"stand"]||[titleStr isEqualToString:@"walk"]||[titleStr isEqualToString:@"death"]){
        if( self.mainChar){
            [self.mainChar play:titleStr];
        }
        return  false;
    }else{
        self.mainChar=[[Display3dMovie alloc]init: self.scene3D];
        [self.mainChar setRoleUrl:getRoleUrl(titleStr)];
        [ self.scene3D addMovieDisplay:self.mainChar];
        
       
    }
    
    
    return true;
}



@end
