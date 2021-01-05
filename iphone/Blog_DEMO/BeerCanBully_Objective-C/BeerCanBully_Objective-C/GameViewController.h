//
//  GameViewController.h
//  BeerCanBully_Objective-C
//
//  Created by roctian on 2016/10/24.
//  Copyright © 2016年 roctian. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <SceneKit/SceneKit.h>
#import <Foundation/Foundation.h>
#import "GameHelper.h"

@interface GameViewController : UIViewController<SCNPhysicsContactDelegate>
 
@property(nonatomic,strong) SCNScene * menuScene;
@property(nonatomic,strong) SCNScene * levelScene;

@property(nonatomic,strong) SCNNode * cameraNode;
@property(nonatomic,strong) SCNNode * shelfNode;
@property(nonatomic,strong) SCNNode * baseCanNode;
@property(nonatomic,strong) SCNNode * currentBallNode;

@property(nonatomic) NSTimeInterval startTouchTime;
@property(nonatomic) NSTimeInterval endTouchTime;
@property(nonatomic,strong)  UITouch * startTouch;
@property(nonatomic,strong)  UITouch * endTouch;
@property(nonatomic,strong)  NSMutableArray <NSString *>*bashedCanNames;
@property(nonatomic,strong)  SCNNode *touchCatchingPlaneNode;
@property(nonatomic,strong)  SCNView * scnView;

@property(nonatomic,strong)  GameHelper *helper;

@end
