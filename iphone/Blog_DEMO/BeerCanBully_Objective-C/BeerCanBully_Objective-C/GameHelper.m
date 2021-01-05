//
//  GameHelper.m
//  BeerCanBully_Objective-C
//
//  Created by roctian on 2016/10/24.
//  Copyright © 2016年 roctian. All rights reserved.
//

#import "GameHelper.h"

NSString  *kHighscoreKey = @"highscore";
NSString  * const gameEndActionKey = @"game_end";
NSString  * const ballCanCollisionAudioKey = @"ball_hit_can";
NSString  * const ballFloorCollisionAudioKey = @"ball_hit_floor";

@implementation GameHelper

+(instancetype)shareHelper{
    static GameHelper *sharedInstance = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        sharedInstance = [[GameHelper alloc] init];
        [sharedInstance initData];
    });
    return sharedInstance;
}
-(void)initData{

    _maxBallNodes = 5;
    _currentLevel = 0;
    _levels = [NSMutableArray new];
    _state = tapToPlay;
    _ballNodes = [NSMutableArray new];
    _canNodes = [NSMutableArray new];
    
    [self loadAudio];
    [self createHud];
    [self refreshLabel];
}
#pragma mark public API
-(void)refreshLabel{

    _labelNode.text = [NSString stringWithFormat:@"⚾️: %d | 🍺: %d",_maxBallNodes-(int)_ballNodes.count,_score];
}
-(void)createHud{
    CGSize screen = [UIScreen mainScreen].bounds.size;
    
    // Create a HUD label node in SpriteKit
    SKScene *skScene = [[SKScene alloc] initWithSize:CGSizeMake(screen.width, 100)];
    skScene.backgroundColor = [UIColor colorWithWhite:0.0 alpha:0.0];
    
    _labelNode = [[SKLabelNode alloc] initWithFontNamed:@"Menlo-Bold"];
    _labelNode.fontSize = 35;
    _labelNode.position = CGPointMake(screen.width / 2, 50);
    
    [skScene addChild:_labelNode];
    
    // Add the SKScene to a plane node
    SCNPlane *plane = [SCNPlane planeWithWidth:5 height:1];
    SCNMaterial *material = [SCNMaterial new];
    material.lightingModelName = SCNLightingModelConstant;
    material.doubleSided = true;
    material.diffuse.contents = skScene;
    plane.materials = @[material];
    
    // Add the hud to the level
    _hudNode = [SCNNode nodeWithGeometry:plane];
    _hudNode.name = @"hud";
    _hudNode.position = SCNVector3Make(0.0,6.0,-4.5);
    _hudNode.rotation = SCNVector4Make(1,0, 0,M_PI);
}

-(void)loadAudio{
    NSArray *sources = @[
                   self.whooshAudioSource,
                   self.ballCanAudioSource,
                   self.ballFloorAudioSource,
                   self.canFloorAudioSource
                   ];
    
    for (SCNAudioSource *source in sources) {
        [source load];
    }
}
#pragma mark setter
-(void)setHighScore:(int)highScore{

  NSUserDefaults *userDefaults = [NSUserDefaults standardUserDefaults];
  [userDefaults setObject:@(highScore) forKey:kHighscoreKey];
  [userDefaults synchronize];
}
-(void)setScore:(int)score{

    _score = score;
    
    if(score > self.highScore){
        self.highScore = score;
    }
    
    [self refreshLabel];
}
#pragma mark getter

-(int)highScore{
    
    return [[[NSUserDefaults standardUserDefaults] valueForKey:kHighscoreKey] intValue];
}
-(SCNMaterial *)menuHUDMaterial{

    if(!_menuHUDMaterial){
    
        // Create a HUD label node in SpriteKit
        CGSize sceneSize = CGSizeMake(300, 200);
        
        SKScene *skScene = [[SKScene alloc] initWithSize:sceneSize];
        skScene.backgroundColor = [UIColor colorWithWhite:0 alpha:0];
        
        SKLabelNode *instructionLabel = [[SKLabelNode alloc] initWithFontNamed:@"Menlo-Bold"];
        instructionLabel.fontSize = 35;
        instructionLabel.text = @"Tap To Play";
        instructionLabel.position = CGPointMake(sceneSize.width / 2, 115);
        [skScene addChild:instructionLabel];
        
        _menuLabelNode = [[SKLabelNode alloc] initWithFontNamed:@"Menlo-Bold"];
        _menuLabelNode.fontSize = 24;
        
        _menuLabelNode.position = CGPointMake(sceneSize.width / 2,60);
        [skScene addChild:_menuLabelNode];
        
        SCNMaterial *material = [SCNMaterial new];
        material.lightingModelName = SCNLightingModelConstant;
        material.doubleSided = true;
        material.diffuse.contents = skScene;
        
        _menuHUDMaterial = material;
    }
    return _menuHUDMaterial;
}
-(SCNAudioSource *)whooshAudioSource{

    if(!_whooshAudioSource){
    
        _whooshAudioSource = [[SCNAudioSource alloc] initWithFileNamed:@"sounds/whoosh.aiff"];
        
        _whooshAudioSource.positional = false;
        _whooshAudioSource.volume = 0.15;
    }
    return _whooshAudioSource;
}
-(SCNAudioSource *)ballCanAudioSource{
    
    if(!_ballCanAudioSource){
        
        _ballCanAudioSource = [[SCNAudioSource alloc] initWithFileNamed:@"sounds/ball_can.aiff"];
        
        _ballCanAudioSource.positional = true;
        _ballCanAudioSource.volume = 0.6;
    }
    return _ballCanAudioSource;
}
-(SCNAudioSource *)ballFloorAudioSource{
    
    if(!_ballFloorAudioSource){
       
        _ballFloorAudioSource = [[SCNAudioSource alloc] initWithFileNamed:@"sounds/ball_floor.aiff"];
        
        _ballFloorAudioSource.positional = true;
        _ballFloorAudioSource.volume = 0.6;
    }
    return _ballFloorAudioSource;
}
-(SCNAudioSource *)canFloorAudioSource{
    
    if(!_canFloorAudioSource){
        
        _canFloorAudioSource = [[SCNAudioSource alloc] initWithFileNamed:@"sounds/can_floor.aiff"];
        
        _canFloorAudioSource.positional = true;
        _canFloorAudioSource.volume = 0.6;
    }
    return _canFloorAudioSource;
}
@end
