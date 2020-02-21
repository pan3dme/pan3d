//
//  TokenSceneView.m
//  iosgl
//
//  Created by zhao on 21/2/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "TokenSceneView.h"
#import "SceneView.h"
@interface TokenSceneView ()
@property (nonatomic, strong) SceneView *sceneView;
@end
 
@implementation TokenSceneView

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view from its nib.
    
       self.sceneView=[[SceneView alloc]init];
       self.sceneView.frame=CGRectMake(10, 100, 300, 300);
       [self.view addSubview:  self.sceneView];
     
}

/*
#pragma mark - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
}
*/

- (IBAction)scene_but_1_clik:(id)sender {
    
    
}

- (IBAction)scene_but_2_clik:(id)sender {
}
@end
