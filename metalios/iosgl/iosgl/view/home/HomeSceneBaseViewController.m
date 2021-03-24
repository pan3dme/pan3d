//
//  HomeSceneBaseViewController.m
//  iosgl
//
//  Created by pan3dme on 2021/3/25.
//  Copyright © 2021 zhao. All rights reserved.
//

#import "HomeSceneBaseViewController.h"

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
    // Do any additional setup after loading the view.
    
 
    [self.scene3D loadSceneByUrl:@"10005"];
    
}
 

/*
#pragma mark - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
}
*/

@end
