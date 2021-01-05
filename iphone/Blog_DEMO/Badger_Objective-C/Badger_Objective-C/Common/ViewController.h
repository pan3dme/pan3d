//
//  ViewController.h
//  Badger_Objective-C
//
//  Created by roctian on 2016/10/27.
//  Copyright © 2016年 roctian. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "View.h"

static NSString *basePath = @"badger.scnassets/";
static NSString *soundsPath = @"badger.scnassets/sounds/";

typedef enum : NSUInteger {
    notCollected = 0,
    beingCollected = 2
} CollectableState;

typedef enum : NSUInteger {
    notStarted = 0,
    started = 1
} GameState;

@interface ViewController : UIViewController

@property(nonatomic) BOOL isUsingLocalSun;
/// Determines if the level uses local sun.

@property(nonatomic) BOOL isSoundEnabled;
/// Determines if audio should be enabled.

@property(nonatomic) float speedFactor;

// MARK: Scene Properties
@property(nonatomic,strong) View * sceneView;

@property(nonatomic,strong) SCNScene * scene;

// MARK: Animation Properties
@property(nonatomic,strong) SCNNode * character;
@property(nonatomic,strong) SCNNode * idleAnimationOwner;
@property(nonatomic,strong) NSString * cartAnimationName;

@property(nonatomic,strong) CAAnimation * jumpAnimation;
@property(nonatomic,strong) CAAnimation * squatAnimation;
@property(nonatomic,strong) CAAnimation * leanLeftAnimation;
@property(nonatomic,strong) CAAnimation * leanRightAnimation;
@property(nonatomic,strong) CAAnimation * slapAnimation;

@property(nonatomic,strong) SCNNode *leftHand;
@property(nonatomic,strong) SCNNode *rightHand;

@property(nonatomic) SCNVector3 sunTargetRelativeToCamera;
@property(nonatomic) SCNVector3 sunDirection;
@property(nonatomic,strong) SCNNode *sun;

// Sparkles effect
@property(nonatomic,strong) SCNParticleSystem * sparkles;
@property(nonatomic,strong) SCNParticleSystem * stars;
@property(nonatomic,strong) SCNNode *leftWheelEmitter;
@property(nonatomic,strong) SCNNode *rightWheelEmitter;
@property(nonatomic,strong) SCNNode *wheels;

// Collect particles
@property(nonatomic,strong) SCNParticleSystem * collectParticleSystem;

// State
@property(nonatomic) int squatCounter;
@property(nonatomic) BOOL isOverWood;

// MARK: Sound Properties
@property(nonatomic) int railSoundSpeed;

// MARK: Collectable Properties
@property(nonatomic,strong) SCNNode * collectables;
@property(nonatomic,strong) SCNNode * speedItems;

// MARK: Triggers

/// Triggers are configured in `configureScene()`.

//var triggers = [Trigger]()
@property(nonatomic,strong) NSMutableArray * triggers;
@property(nonatomic) int activeTriggerIndex;

// MARK: Game controls

//var controllerDPad: GCControllerDirectionPad?

/// Game state
@property(nonatomic) GameState gameState;

@property(nonatomic) float boostSpeedFactor;
@property(nonatomic) float characterSpeed;

-(BOOL)startGameIfNeeded;
-(void)squat;
-(void)jump;
-(void)leanLeft;
-(void)leanRight;
@end
