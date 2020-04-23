//
//  RoleSceneViewController.m
//  iosgl
//
//  Created by zhao on 24/4/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "RoleSceneViewController.h"
#import "SceneView.h"
#import "SceneChar.h"
#import "GridLineSprite.h"


@interface RoleSceneViewController ()

@property (nonatomic, strong) SceneView *sceneView;
@property (nonatomic, strong) NSMutableArray<UIButton*>* butItems;


@end

@implementation RoleSceneViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    self.view.backgroundColor=[UIColor whiteColor];
    
    self.sceneView=[[SceneView alloc]init];
    self.sceneView.frame=CGRectMake(5, 100, 360, 360);
    [self.view addSubview:  self.sceneView];
    [self.sceneView makeEemptyScene];
    [self.sceneView.scene3D addDisplay:[[GridLineSprite alloc]init]];
    
    
    
    [self addMenuList];
}
-(void)addMenuList;
{
    self.butItems=[[NSMutableArray alloc]init];
    [self addEventButBy:@"角色"];
    [self addEventButBy:@"特效"];
    [self addEventButBy:@"技能"];
 
}

-(void)addEventButBy:(NSString*)tittle;
{
    UIButton* oneBut=[self makeButtion];
    [oneBut setTitle:tittle forState:UIControlStateNormal];
    [oneBut addTarget:self action:@selector(oneButClikEvent:) forControlEvents:UIControlEventTouchUpInside] ;
    [self.butItems addObject:oneBut];
}
- (void)viewDidLayoutSubviews
{
    for (int i=0; i< self.butItems.count; i++) {
        self.butItems[i].frame=CGRectMake(i*55+15, self.view.bounds.size.height-200, 50, 30);
    }
}


- (void) oneButClikEvent:(UIButton *) btn
{
 
    NSString* titleStr=btn.titleLabel.text;
    if([titleStr isEqualToString:@"角色"]){
        [self makeRollAndMount];
        [self addRoleToScene:@"50003" pos:[[Vector3D alloc]x:-20 y:0 z:0]];
        [self addRoleToScene:@"50004" pos:[[Vector3D alloc]x:-40 y:0 z:0]];
        [self addRoleToScene:@"50005" pos:[[Vector3D alloc]x:-60 y:0 z:0]];
        [self addRoleToScene:@"50006" pos:[[Vector3D alloc]x:-80 y:0 z:0]];
    }
    
}
/*
 武器，角色，坐骑
 */
-(void)makeRollAndMount;
{
    SceneChar* sc=[[SceneChar alloc]init];
    [self.sceneView.scene3D addMovieDisplay:sc] ;
    [sc setRoleUrl: getRoleUrl(@"50002")];
    [sc setMountById:@"5104"];
    [sc play:@"walk" completeState:0 needFollow:NO];
    [sc addPart:SceneChar.WEAPON_PART bindSocket:SceneChar.WEAPON_DEFAULT_SLOT url:getModelUrl(@"50011")];
    sc.x=50;
    
    
}
/*
 角色
 */
-(void)addRoleToScene:(NSString*)rolename pos:(Vector3D*)pos ;
{
    SceneChar* sc=[[SceneChar alloc]init];
    [self.sceneView.scene3D addMovieDisplay:sc] ;
    [sc setRoleUrl: getRoleUrl(rolename)];
    sc.x=pos.x;
    sc.y=pos.y;
    sc.z=pos.z;
}
/*
 创建按钮
 */
-(UIButton*)makeButtion;
{
    UIButton* but=[[UIButton alloc]initWithFrame:CGRectMake(0, 0, 50, 30)];
    [but setTitle:@"1" forState:UIControlStateNormal];
    but.backgroundColor=[UIColor redColor];
    but.layer.cornerRadius = 15; // 圆角的弧度
    but.layer.masksToBounds = YES;
    [self.view addSubview:but];
    
    return but;
}

-(void)MakeUiViewShadow:(UIView *)value size:(CGFloat )size  color:(UIColor *)color   {
    UIView *myView= value;
    myView.layer.shadowColor = color.CGColor;
    myView.layer.shadowOffset = CGSizeMake(5,5);; //[水平偏移, 垂直偏移]
    myView.layer.shadowOpacity = 0.2f; // 0.0 ~ 1.0 的值
    myView.layer.shadowRadius = size; // 阴影发散的程度
    myView.layer.masksToBounds = NO;
}

@end
