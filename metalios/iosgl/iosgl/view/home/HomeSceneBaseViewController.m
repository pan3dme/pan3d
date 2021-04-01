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
#import "Frame3dSprite.h"
#import "Md5MoveSprite.h"
#import "SceneChar.h"

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
            [self.scene3D loadSceneByUrl:vo.text];
        }
        if(vo.type==2){//特效
            [self.scene3D playLyfByUrl: vo.text];
        }
        if(vo.type==3){//角色
            Display3dMovie* sc=[[Display3dMovie alloc]init: self.scene3D];
            [sc setRoleUrl:vo.text];
            [ self.scene3D addMovieDisplay:sc];
            
            if(vo.info!=nil)
            {
                NSString* addPart=   [vo.info valueForKey:@"addPart"];
                NSString* bindSocket=   [vo.info valueForKey:@"bindSocket"];
                NSString* model=   [vo.info valueForKey:@"model"];
             
//                [sc addPart:@"weapon" bindSocket:@"w_01" url:getModelUrl(@"weapon1")];
                [sc addPart:addPart bindSocket:bindSocket url:getModelUrl(model)];
            }
 
     
            
         
        }
        if(vo.type==4){//动画
            [self.scene3D addDisplay:[[Frame3dSprite alloc]init:self.scene3D]];
        }
        
        if(vo.type==5){//md5
            Md5MoveSprite* sc=[[Md5MoveSprite alloc]init:self.scene3D];
            [sc setMd5url:@"pan/expmd5/2/body.md5mesh"  animurl:@"pan/expmd5/2/body.md5mesh"  picurl:@"pan/expmd5/shuangdaonv.jpg"  ];
            [self.scene3D addDisplay:sc];
        }


    }
    
 
    
}
 
-(void)addMenuList;
{
    self.butItems=[[NSMutableArray alloc]init];
    [self addButsByArr:[[NSMutableArray alloc]init] ];
    [self viewDidLayoutSubviews];
  
}
 
 

@end
