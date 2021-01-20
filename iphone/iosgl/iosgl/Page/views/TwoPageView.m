//
//  TwoPageView.m
//  iosgl
//
//  Created by zhao on 2/12/2019.
//  Copyright © 2019 zhao. All rights reserved.
//

#import "TwoPageView.h"
#import "MathCore.h"
#import <UIKit/UIKit.h>
#import <GLKit/GLKit.h>
#import "Base3dView.h"
#import "GlkView.h"
#import "SceneChar.h"
#import "Scene_data.h"
#import "SceneView.h"
#import "GroupItem.h"
#import "GroupDataManager.h"
#import "GridLineSprite.h"


@interface TwoPageView ()

@property (nonatomic, strong) SceneView *sceneView;
@property (nonatomic, assign) int lyfPlayIdx;
@property (nonatomic,strong) NSURLSession *session;
@property (nonatomic,strong) SceneChar* mainChar;



@end

@implementation TwoPageView


- (void)viewDidLoad {
    [super viewDidLoad];
     
}

@end
