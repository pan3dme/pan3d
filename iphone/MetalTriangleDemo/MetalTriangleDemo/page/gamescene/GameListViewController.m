//
//  GameListViewController.m
//  iphonePan3d
//
//  Created by pan3dme on 2020/12/28.
//
#import "GL_Header.h"
#import "GameListViewController.h"
#import "SceneView.h"
#import "SceneChar.h"
#import "GroupItem.h"
#import "Scene_data.h"
#import "SceneRes.h"
#import "GroupDataManager.h"
#import "GridLineSprite.h"

@interface GameListViewController ()
@property (nonatomic, strong) SceneView *sceneView;
@property (nonatomic, strong) SceneChar *mainChar;
@end

@implementation GameListViewController

- (void)viewDidLoad {
    [super viewDidLoad];
 
    self.view.backgroundColor=[UIColor whiteColor];
  
    self.sceneView=[[SceneView alloc]init];
    self.sceneView.frame=CGRectMake(5, 100, 360, 360);
    [self.view addSubview:  self.sceneView];
    [self.sceneView makeEemptyScene];
    [self.sceneView.scene3D addDisplay:[[GridLineSprite alloc]init]];
    
    [self addRoleToScene:@"yezhuz" pos:[[Vector3D alloc]x:-20 y:0 z:0]];
}
-(void)addRoleToScene:(NSString*)rolename pos:(Vector3D*)pos ;
{
    SceneChar* sc=[[SceneChar alloc]init];
    [self.sceneView.scene3D addMovieDisplay:sc] ;
    [sc setRoleUrl: getRoleUrl(rolename)];
    sc.x=pos.x;
    sc.y=pos.y;
    sc.z=pos.z;
}
 

@end
