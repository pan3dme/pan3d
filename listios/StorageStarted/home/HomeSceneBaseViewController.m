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
            SceneChar* sc=[[SceneChar alloc]init: self.scene3D];
            [self setParamInfo:sc vo:vo];
            [sc setRoleUrl:vo.text];
            [self.scene3D addMovieDisplay:sc];
            
            
            
            if(vo.info!=nil)
            {
                NSString* addPart=   [vo.info valueForKey:@"addPart"];
                if(addPart!=nil){
                    NSString* bindSocket=   [vo.info valueForKey:@"bindSocket"];
                    NSString* model=   [vo.info valueForKey:@"model"];
                    [sc addPart:addPart bindSocket:bindSocket url:getModelUrl(model)];
                }
                NSString* mount=   [vo.info valueForKey:@"mount"];
                if(mount!=nil){
                    [sc setMountById:mount];
                }
                NSString* action=   [vo.info valueForKey:@"action"];
                if(action!=nil){
                    [sc play:action];
                }
            
            
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
//设置对象参数
-(void)setParamInfo:(Display3D*)dis vo:(SceneInfoVo*)vo;
{
    NSDictionary* param =[vo.data valueForKey:@"param"];
    if(param!=nil){
 
        if([[param allKeys]containsObject:@"x"]){
            dis.x=[[param valueForKey:@"x"]floatValue];
        }
        if([[param allKeys]containsObject:@"y"]){
            dis.y=[[param valueForKey:@"y"]floatValue];
        }
        if([[param allKeys]containsObject:@"z"]){
            dis.z=[[param valueForKey:@"z"]floatValue];
        }
        if([[param allKeys]containsObject:@"rotationY"]){
            dis.rotationY=[[param valueForKey:@"rotationY"]floatValue];
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
