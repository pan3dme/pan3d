//
//  HomeSceneBaseViewController.m
//  iosgl
//
//  Created by pan3dme on 2021/3/25.
//  Copyright © 2021 zhao. All rights reserved.
//

#import "HomeSceneBaseViewController.h"
#import "SceneInfoVo.h"

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
  
        
    }
    
}
 
 

@end
