//
//  HomeSceneBaseViewController.m
//  iosgl
//
//  Created by pan3dme on 2021/3/25.
//  Copyright © 2021 zhao. All rights reserved.
//

#import "HomeSceneBaseViewController.h"
#import "SceneInfoVo.h"
#import "Display3dMovie.h"

@interface HomeSceneBaseViewController ()
@property (nonatomic, strong) NSArray *sceneItemArr;
@end

@implementation HomeSceneBaseViewController

- (instancetype)init:(NSArray*)val
{
    self = [super init];
    if (self) {
        self.sceneItemArr=val;
    }
    return self;
}
- (void)viewDidLoad {
    [super viewDidLoad];
 
//    [self.scene3D loadSceneByUrl:@"10005"];
   
    for (NSUInteger i=0; i<self.sceneItemArr.count; i++) {
 
        SceneInfoVo* vo=[[SceneInfoVo alloc] init:[self.sceneItemArr objectAtIndex:i]];
        
        if(vo.type==1){ //场景
//            [self.scene3D loadSceneByUrl:vo.text];
        }
        if(vo.type==2){//特效
            [self.scene3D playLyfByUrl: vo.text];
        }
        if(vo.type==3){//角色
//            Display3dMovie* sc=[[Display3dMovie alloc]init: self.scene3D];
//            [sc setRoleUrl:vo.text];
//            [ self.scene3D addMovieDisplay:sc];
        }
  
        
    }
    
}
 
 

@end
