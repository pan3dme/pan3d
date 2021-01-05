//
//  GameHelper.h
//  BeerCanBully_Objective-C
//
//  Created by roctian on 2016/10/24.
//  Copyright © 2016年 roctian. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <SceneKit/SceneKit.h>
#import <SpriteKit/SpriteKit.h>
#import "GameLevel.h"

typedef enum : NSUInteger {
    tapToPlay,
    playing
} GameStateType;

// Maximum number of ball attempts
extern NSString  * const gameEndActionKey;
extern NSString  * const ballCanCollisionAudioKey;
extern NSString  * const ballFloorCollisionAudioKey;

@interface GameHelper : NSObject

+(instancetype)shareHelper;

@property(nonatomic,strong) SCNNode * hudNode;
@property(nonatomic,strong) SKLabelNode * labelNode;
@property(nonatomic,strong) NSMutableArray <SCNNode *>* canNodes;
@property(nonatomic,strong) NSMutableArray <SCNNode *>* ballNodes;

@property(nonatomic) int highScore;
@property(nonatomic) int score;

@property(nonatomic,strong) SKLabelNode * menuLabelNode;
@property(nonatomic,strong) SCNMaterial * menuHUDMaterial;

@property(nonatomic) GameStateType state;

@property(nonatomic,strong) SCNAudioSource *whooshAudioSource;
@property(nonatomic,strong) SCNAudioSource *ballCanAudioSource;
@property(nonatomic,strong) SCNAudioSource *ballFloorAudioSource;
@property(nonatomic,strong) SCNAudioSource *canFloorAudioSource;

@property(nonatomic) int currentLevel;
@property(nonatomic,strong) NSMutableArray <GameLevel *>*levels;

@property(nonatomic) int maxBallNodes;
@end
