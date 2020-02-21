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
    
    self.sceneView=[[SceneView alloc]init];
    self.sceneView.frame=CGRectMake(10, 100, 300, 300);
    [self.view addSubview:  self.sceneView];
    [self addLisienEvent];
    
}
-(void)addLisienEvent{
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(loadSceneEvent:) name:@"loadScneInfo" object:nil];
    
}
-(void)loadSceneEvent:(NSNotification *)notification{
    NSLog(@"here");
}

- (IBAction)scene_but_1_clik:(id)sender {
    NSMutableDictionary *mDict = [[NSMutableDictionary alloc]init];
    [mDict setObject:@"cctv"  forKey:@"data"];
    [[NSNotificationCenter defaultCenter]postNotificationName:@"loadScneInfo" object:mDict];
    
    
     [self.sceneView loadSeceneByUrl:@"5555_base"];
}

- (IBAction)scene_but_2_clik:(id)sender {
    
    
     [self.sceneView loadSeceneByUrl:@"1001_base"];
}
@end
