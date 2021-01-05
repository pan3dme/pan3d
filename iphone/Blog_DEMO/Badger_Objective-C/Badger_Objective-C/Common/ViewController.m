//
//  ViewController.m
//  Badger_Objective-C
//
//  Created by roctian on 2016/10/27.
//  Copyright © 2016年 roctian. All rights reserved.
//

#import "ViewController.h"
#import "CAAnimation+SceneName.h"
#import "SourceHelper.h"
#import "TriggerModel.h"
#import "GameHelper.h"

@interface ViewController ()<SCNSceneRendererDelegate>

@property(nonatomic,strong)SourceHelper *sourceHelper;

@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
    
    [self initData];
    
    // Configure scene post init.
    [self configureScene];
    
    /// Set the scene and make sure all shaders and textures are pre-loaded.
    self.sceneView.scene = self.scene;
    
    // At every round regenerate collectables.
    CAAnimation *cartAnimation = [self.scene.rootNode animationForKey:self.cartAnimationName];
    cartAnimation.animationEvents = @[[SCNAnimationEvent animationEventWithKeyTime:0.9 block:^(CAAnimation * _Nonnull animation, id  _Nonnull animatedObject, BOOL playingBackward) {
        
//        [self respawnCollectables];
    }]];
 
    [self.scene.rootNode addAnimation:cartAnimation forKey:self.cartAnimationName];
    
    [self.sceneView prepareObject:self.scene shouldAbortBlock:nil];
 
    self.sceneView.delegate = self;
    self.sceneView.pointOfView = [self.sceneView.scene.rootNode childNodeWithName:@"camera_depart" recursively:YES];
    
    // Play wind sound at launch.
    SCNAudioSource *sound = [self sound:@"wind.m4a"];
    sound.loops = true;
    sound.positional = false;
    sound.shouldStream = true;
    sound.volume = 8.0;
    [self.sceneView.scene.rootNode addAudioPlayer:[SCNAudioPlayer audioPlayerWithSource:sound]];
    
    self.sceneView.contentScaleFactor = 1.3;

    
    // Start at speed 0.
    self.characterSpeed = 0.0;
    
//    [self setupGameControllers];
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}
-(void)initData{

    self.sourceHelper = [SourceHelper new];
    
    _isUsingLocalSun = true;
    _isSoundEnabled = true;
    _speedFactor = 1.5;
    
    _boostSpeedFactor = 1.0f;
    _characterSpeed = 1.0f;
   
    _sceneView = (SCNView *)self.view;
    _scene = [self sceneNamed:@"scene.scn"];
    
    // MARK: Animation Properties
    
    _character = [SCNNode new];
    _idleAnimationOwner = [SCNNode new];
    
    // Retrieve the character and its animations.
    
    // The character node "Bob_root" initially is a placeholder.
    // We will load the models from one of the animation scenes and add them to the empty node.
    _character = [self.scene.rootNode childNodeWithName:@"Bob_root" recursively:YES];
    
    SCNScene *idleScene = [self sceneNamed:@"animation-idle.scn"];
    SCNNode *characterHierarchy = [idleScene.rootNode childNodeWithName:@"Bob_root" recursively:YES];
    
    for (SCNNode *node in characterHierarchy.childNodes){
        [self.character addChildNode:node];
    }
    
    SCNNode *idleAnimationOwner = [characterHierarchy childNodeWithName:@"Dummy_kart_root" recursively:YES];
    
    // The animation for the cart is always running. The name of the animation is retrieved
    // so that we can change its speed as the cart accelerates or decelerates.
    NSString *cartAnimationName = [[self.scene.rootNode animationKeys] firstObject];
    
    // Play character idle animation.
    CAAnimation *idleAnimation = [self animationNamed:@"animation-start-idle.scn"];
    idleAnimation.repeatCount = MAXFLOAT;
    [self.character addAnimation:idleAnimation forKey:@"start"];
    
    // Load sparkles.
    SCNScene *sparkleScene = [self sceneNamed:@"sparkles.scn"];
    SCNNode *sparkleNode = [sparkleScene.rootNode childNodeWithName:@"sparkles" recursively:YES];
    _sparkles = sparkleNode.particleSystems[0];
    _sparkles.loops = false;
    
    SCNNode *starsNode = [sparkleScene.rootNode childNodeWithName:@"slap" recursively:YES];
    _stars = starsNode.particleSystems[0];
    _stars.loops = false;
    
    // Collect particles.
    _collectParticleSystem = [SCNParticleSystem particleSystemNamed:@"collect.scnp" inDirectory:@"badger.scnassets"];
    _collectParticleSystem.loops = false;
    
    _leftHand = [self.character childNodeWithName:@"Bip001_L_Finger0Nub" recursively:YES];
    _rightHand = [self.character childNodeWithName:@"Bip001_R_Finger0Nub" recursively:YES];
    
    _leftWheelEmitter = [self.character childNodeWithName:@"Dummy_rightWheel_sparks" recursively:YES];
    _rightWheelEmitter = [self.character childNodeWithName:@"Dummy_leftWheel_sparks" recursively:YES];
    _wheels = [self.character childNodeWithName:@"wheels_front" recursively:YES];
    
    CABasicAnimation *wheelAnimation = [CABasicAnimation animationWithKeyPath:@"eulerAngles.x"];
    wheelAnimation.byValue = @10.0;
    wheelAnimation.duration = 1.0;
    wheelAnimation.repeatCount = MAXFLOAT;
    wheelAnimation.cumulative = true;
    [_wheels addAnimation:wheelAnimation forKey:@"wheel"];
    
    // Make sure the slap animation plays right away (no fading)
    self.slapAnimation.fadeInDuration = 0.0;
    
    /// Similarly collectables are grouped under a common parent node.
    /// In addition, load a sound file that will be played when the user collects an item.
    _collectables = [self.scene.rootNode childNodeWithName:@"Collectables" recursively:false];
    _speedItems = [self.scene.rootNode childNodeWithName:@"SpeedItems" recursively:false];
    
    // Load sounds.
    self.sourceHelper.collectSound.volume = 5.0;
    self.sourceHelper.collectSound2.volume = 5.0;
    
    // Configure sounds.
    NSArray *sounds = @[
                  self.sourceHelper.railSqueakSound,self.sourceHelper.collectSound,self.sourceHelper.collectSound2,
                  self.sourceHelper.hitSound, self.sourceHelper.railHighSpeedSound, self.sourceHelper.railMediumSpeedSound,
                  self.sourceHelper.railLowSpeedSound, self.sourceHelper.railWoodSound, self.sourceHelper.railSqueakSound,
                  self.sourceHelper.cartHide, self.sourceHelper.cartJump, self.sourceHelper.cartTurnLeft,
                  self.sourceHelper.cartTurnRight
                       ];
    
    for(SCNAudioSource *sound in sounds){
        sound.positional = false;
        [sound load];
    }
    
    self.sourceHelper.railSqueakSound.loops = true;
    
    // Configure the scene to use a local sun.
    if (_isUsingLocalSun){
        _sun = [self.scene.rootNode childNodeWithName:@"Direct001" recursively:NO];
        _sun.light.shadowMapSize = CGSizeMake(2048,2048);
        _sun.light.orthographicScale = 10;
        
        _sunTargetRelativeToCamera = SCNVector3Make(0,0,-10);
        _sun.position = SCNVector3Zero;
        _sunDirection = [_sun convertPosition:SCNVector3Make(0,0,-1) toNode:nil];
    }
    else {
        _sun = [SCNNode new];
        _sunTargetRelativeToCamera = SCNVector3Zero;
        _sunDirection = SCNVector3Zero;
    }
    

}
-(void)configureScene{
    // Add sparkles.
    
    SCNAnimationEvent *leftEvent1 = [SCNAnimationEvent animationEventWithKeyTime:0.15 block:^(CAAnimation * _Nonnull animation, id  _Nonnull animatedObject, BOOL playingBackward) {
        
        [self.leftWheelEmitter addParticleSystem:self.sparkles];
    }];
    
    
    SCNAnimationEvent *leftEvent2 = [SCNAnimationEvent animationEventWithKeyTime:0.9 block:^(CAAnimation * _Nonnull animation, id  _Nonnull animatedObject, BOOL playingBackward) {
        
        [self.rightWheelEmitter addParticleSystem:self.sparkles];
    }];

    SCNAnimationEvent *rightEvent1 = [SCNAnimationEvent animationEventWithKeyTime:0.9 block:^(CAAnimation * _Nonnull animation, id  _Nonnull animatedObject, BOOL playingBackward) {
        
        [self.leftWheelEmitter addParticleSystem:self.sparkles];
    }];
    
    self.leanLeftAnimation.animationEvents = @[leftEvent1, leftEvent2];
    self.leanRightAnimation.animationEvents = @[rightEvent1];
    
    self.sceneView.antialiasingMode = SCNAntialiasingModeNone;
    
    // Configure triggers and collectables
    
    /// Special nodes ("triggers") are placed in the scene under a common parent node.
    /// Their names indicate what event should occur as they are hit by the cart.
    SCNNode *triggerGroup = [self.scene.rootNode childNodeWithName:@"triggers" recursively:false];
    
    _triggers = [NSMutableArray new];
    
    [triggerGroup.childNodes enumerateObjectsUsingBlock:^(SCNNode * _Nonnull node, NSUInteger idx, BOOL * _Nonnull stop) {
        
        NSString *triggerName = node.name;
        
        TriggerModel *triggerModel = [TriggerModel new];
        triggerModel.position = node.position;
        
        if([triggerName hasPrefix:@"Trigger_speed"]){
        
            NSString *speedConstant = @"Trigger_speed";
            int speedValueOffset = (int)speedConstant.length;
            NSString *speedValue = [triggerName substringFromIndex:speedValueOffset];
            speedValue = [speedValue stringByReplacingOccurrencesOfString:@"_" withString:@"."];
            
            if(speedValue){
        
                triggerModel.action = [NSString stringWithFormat:@"trigger:%@",speedValue];
                [_triggers addObject:triggerModel];
            }
        }
        
        if ([triggerName hasPrefix:@"Trigger_obstacle"]){
       
                triggerModel.action = [NSString stringWithFormat:@"triggerCollision"];
                [_triggers addObject:triggerModel];
        }
        
        if ([triggerName hasPrefix:@"Trigger_reverb" ] && [triggerName hasSuffix:@"start"] ){
            
            triggerModel.action = [NSString stringWithFormat:@"startReverb"];
            [_triggers addObject:triggerModel];
        }
        
        if ([triggerName hasPrefix:@"Trigger_reverb"] && [triggerName hasSuffix:@"stop"]) {
            
            triggerModel.action = [NSString stringWithFormat:@"stopReverb"];
            [_triggers addObject:triggerModel];
        }
        
        if ([triggerName hasPrefix:@"Trigger_turn_start"]) {
            
            triggerModel.action = [NSString stringWithFormat:@"startTurn"];
            [_triggers addObject:triggerModel];
        }
        
        if ([triggerName hasPrefix:@"Trigger_turn_stop"]) {
           
            triggerModel.action = [NSString stringWithFormat:@"stopTurn"];
            [_triggers addObject:triggerModel];
        }
        
        if ([triggerName hasPrefix:@"Trigger_wood_start"]) {
         
            triggerModel.action = [NSString stringWithFormat:@"startWood"];
            [_triggers addObject:triggerModel];
        }
        
        if ([triggerName hasPrefix:@"Trigger_wood_stop"]) {
          
            triggerModel.action = [NSString stringWithFormat:@"stopWood"];
            [_triggers addObject:triggerModel];
        }
        
        if ([triggerName hasPrefix:@"Trigger_highSpeed"]) {
            
            triggerModel.action = [NSString stringWithFormat:@"changeSpeedSound:3"];
            [_triggers addObject:triggerModel];
        }
        
        if ([triggerName hasPrefix:@"Trigger_normalSpeed"]) {
           
            triggerModel.action = [NSString stringWithFormat:@"changeSpeedSound:2"];
            [_triggers addObject:triggerModel];
        }
        
        if ([triggerName hasPrefix:@"Trigger_slowSpeed"]) {
      
            triggerModel.action = [NSString stringWithFormat:@"changeSpeedSound:1"];
            [_triggers addObject:triggerModel];
        }
    }];
}
#pragma mark SCNSceneRendererDelegate
-(void)renderer:(id<SCNSceneRenderer>)renderer updateAtTime:(NSTimeInterval)time{

    [self activateTriggers];
    [self collectItems];
    
    // Update sun position
    if(self.isUsingLocalSun){
        SCNVector3 target = [renderer.pointOfView.presentationNode convertPosition:self.sunTargetRelativeToCamera toNode:nil];
        self.sun.position = SCNVector3FromFloat3(SCNVector3ToFloat3(target)-SCNVector3ToFloat3(self.sunDirection)*10.0);
    }
}
-(void)trigger:(float)speed {
    [SCNTransaction begin];
    SCNTransaction.animationDuration = 2.0;
    self.characterSpeed = speed;
    [SCNTransaction commit];
}

-(void)triggerCollision{
    
    if(_squatCounter <= 0)
        return;
    
    // Play sound and animate.
    [self.character runAction:[SCNAction playAudioSource:self.sourceHelper.hitSound waitForCompletion:false]];
    [self.character addAnimation:self.slapAnimation forKey:nil];
    
    // Add stars.
    SCNNode *emitter = [self.character childNodeWithName:@"Bip001_Head" recursively:YES];
    [emitter addParticleSystem:self.stars];
}
-(void)activateTriggers{
    
    SCNVector3 characterPosition = [self.character.presentationNode convertPosition:SCNVector3Zero toNode:nil];
    
    int index = 0;
    BOOL didTrigger = false;
    
    for(TriggerModel *trigger in self.triggers){
        if([GameHelper TwoPositionDistance:characterPosition two:trigger.position] < 0.05){
            if(self.activeTriggerIndex != index) {
                self.activeTriggerIndex = index;
//                trigger.action(self)
            }
            didTrigger = true;
            break;
        }
        
        index = index + 1;
    }
    
    if (didTrigger == false){
        self.activeTriggerIndex = -1;
    }
}
-(void)collectItems{
    
    SCNVector3 leftHandPosition = [self.leftHand.presentationNode convertPosition:SCNVector3Zero toNode:nil];
    SCNVector3 rightHandPosition = [self.rightHand.presentationNode convertPosition:SCNVector3Zero toNode:nil];
    
    for(SCNNode *collectable in self.collectables.childNodes){
        
        if(collectable.categoryBitMask == beingCollected)
            continue;
        
        SCNVector3 collectablePosition = collectable.position;
        if([GameHelper TwoPositionDistance:leftHandPosition two:collectablePosition] < 0.05 || [GameHelper TwoPositionDistance:rightHandPosition two:collectablePosition] < 0.05){
            collectable.categoryBitMask = beingCollected;
            
            [SCNTransaction begin];
            SCNTransaction.animationDuration = 0.25;
            
            collectable.scale = SCNVector3Zero;

            [self.scene addParticleSystem:self.collectParticleSystem withTransform:collectable.presentationNode.worldTransform];
            
            if([collectable.name hasPrefix:@"big"]){
                [self.sceneView didCollectBigItem];
                [collectable runAction:[SCNAction playAudioSource:_sourceHelper.collectSound2 waitForCompletion:false]];
            }
            else {
                [self.sceneView didCollectItem];
                 [collectable runAction:[SCNAction playAudioSource:_sourceHelper.collectSound waitForCompletion:false]];
            }
            
            [SCNTransaction commit];
            
            break;
        }
    }
    
    for(SCNNode *collectable in self.speedItems.childNodes){
        
        if(collectable.categoryBitMask == beingCollected)
            continue;
        
        SCNVector3 collectablePosition = collectable.position;
        if([GameHelper TwoPositionDistance:rightHandPosition two:collectablePosition] < 0.05){
            collectable.categoryBitMask = beingCollected;
            
            [SCNTransaction begin];
            SCNTransaction.animationDuration = 0.25;
            
            collectable.scale = SCNVector3Zero;
            [collectable runAction:[SCNAction playAudioSource:_sourceHelper.collectSound2 waitForCompletion:false]];
            
            [self.scene addParticleSystem:self.collectParticleSystem withTransform:collectable.presentationNode.worldTransform];
  
            [SCNTransaction commit];
            
            // Speed boost!
            [SCNTransaction begin];
            SCNTransaction.animationDuration = 1.0;
            
            SCNNode *pov = self.sceneView.pointOfView;
            if(pov.camera){
                pov.camera.xFov = 100.0;
                pov.camera.motionBlurIntensity = 1.0;
            }

            SCNAction *adjustCamera = [SCNAction runBlock:^(SCNNode * _Nonnull node) {
                
                [SCNTransaction begin];
                SCNTransaction.animationDuration = 1.0;
                
                if(pov.camera){
                    pov.camera.xFov = 70;
                    pov.camera.motionBlurIntensity = 0.0;
                }
                
                [SCNTransaction commit];

            }];

            [pov runAction:[SCNAction sequence:@[[SCNAction waitForDuration:2.0],adjustCamera]]];
            [self.character runAction:[SCNAction playAudioSource:_sourceHelper.cartBoost waitForCompletion:false]];
            
            [SCNTransaction commit];
            
            break;
        }
    }
}

// MARK: Collectables

-(void)respawnCollectables{
    for(SCNNode *collectable in self.collectables.childNodes){
        collectable.categoryBitMask = 0;
        collectable.scale = SCNVector3Make(1,1,1);
    }
    
    for (SCNNode *collectable in self.speedItems.childNodes){
        collectable.categoryBitMask = 0;
        collectable.scale = SCNVector3Make(1,1,1);
    }
}
// MARK: Controlling the Character

-(void)changeSpeedSound:(int)speed {
    self.railSoundSpeed = speed;
    [self updateCartSound];
}

-(void)updateCartSound{
    if(!self.isSoundEnabled)
        return;

    [self.wheels removeAllAudioPlayers];
    
    if(self.isOverWood)
        [self.wheels addAudioPlayer:[SCNAudioPlayer audioPlayerWithSource:self.sourceHelper.railWoodSound]];
    
    switch(self.railSoundSpeed){
        
    case 1:
        [self.wheels addAudioPlayer:[SCNAudioPlayer audioPlayerWithSource:self.sourceHelper.railLowSpeedSound]];
        
    case 3:
        [self.wheels addAudioPlayer:[SCNAudioPlayer audioPlayerWithSource:self.sourceHelper.railHighSpeedSound]];
        
    case 2:
         [self.wheels addAudioPlayer:[SCNAudioPlayer audioPlayerWithSource:self.sourceHelper.railMediumSpeedSound]];
        
        default: break;
    }
}
-(void)updateSpeed{
    float speed = _boostSpeedFactor * _characterSpeed;
    float effectiveSpeed = _speedFactor * speed;
    [self.scene.rootNode setSpeed:effectiveSpeed forAnimationKey:self.cartAnimationName];
    [self.wheels setSpeed:effectiveSpeed forAnimationKey:@"wheel"];
    [self.idleAnimationOwner setSpeed:effectiveSpeed forAnimationKey:@"bob_idle-1"];
    
    // Update sound.
    [self updateCartSound];
}

-(void)squat{
    [SCNTransaction begin];
    [SCNTransaction setCompletionBlock:^{
        
        self.squatCounter -= 1;
    }];

    self.squatCounter += 1;
    
    [self.character addAnimation:self.squatAnimation forKey:nil];
    [self.character runAction:[SCNAction playAudioSource:self.sourceHelper.cartHide waitForCompletion:false]];
    
    [SCNTransaction commit];
}

-(void)jump{
    [self.character addAnimation:self.jumpAnimation forKey:nil];
    [self.character runAction:[SCNAction playAudioSource:self.sourceHelper.cartJump waitForCompletion:false]];
}

-(void)leanLeft{
    [self.character addAnimation:self.leanLeftAnimation forKey:nil];
    [self.character runAction:[SCNAction playAudioSource:self.sourceHelper.cartTurnLeft waitForCompletion:false]];
}

-(void)leanRight{
    [self.character addAnimation:self.leanRightAnimation forKey:nil];
    [self.character runAction:[SCNAction playAudioSource:self.sourceHelper.cartTurnRight waitForCompletion:false]];
}
-(void)startMusic{

    if(!self.isSoundEnabled)
    return;
    
    SCNAudioSource *musicIntroSource = [self sound:@"music_intro.mp3"];
    SCNAudioSource *musicLoopSource =  [self sound:@"music_loop.mp3"];
    
    musicLoopSource.loops = true;
    musicIntroSource.positional = false;
    musicLoopSource.positional = false;
    
    // `shouldStream` must be false to wait for completion.
    musicIntroSource.shouldStream = false;
    musicLoopSource.shouldStream = true;
    
    [self.sceneView.scene.rootNode runAction:[SCNAction playAudioSource:musicIntroSource waitForCompletion:true] completionHandler:^{
        [self.sceneView.scene.rootNode addAudioPlayer:[SCNAudioPlayer audioPlayerWithSource:musicLoopSource]];
    }];
}
-(BOOL)startGameIfNeeded{
    
    if(self.gameState != notStarted)
        return false;
   
    [self.sceneView setup2DOverlay];
    
    // Stop wind.
    [self.sceneView.scene.rootNode removeAllAudioPlayers];
    
    // Play some music.
    [self startMusic];
    
    self.gameState = started;
    
    [SCNTransaction begin];
    SCNTransaction.animationDuration = 2.0;
    [SCNTransaction setCompletionBlock:^{
        [self jump];
    }];
    
    CAAnimation *idleAnimation = [self animationNamed:@"animation-start.scn"];
    [self.character addAnimation:idleAnimation forKey:nil];
    [self.character removeAnimationForKey:@"start" fadeOutDuration:0.3];
    
    self.sceneView.pointOfView = [self.sceneView.scene.rootNode childNodeWithName:@"Camera" recursively:true];
    
    [SCNTransaction commit];
    
    [SCNTransaction begin];
    SCNTransaction.animationDuration = 5.0;
    
    self.characterSpeed = 1.0;
    self.railSoundSpeed = 1;
    
    [SCNTransaction commit];
    
    return true;
}
#pragma mark private method
-(SCNAudioSource *)sound:(NSString *)name{
    
    SCNAudioSource *source = [SCNAudioSource audioSourceNamed:[NSString stringWithFormat:@"%@%@",soundsPath,name]];
     if(!source){
         NSAssert(true,@"Failed to load audio source \(name).");
    }
    return source;
}

-(CAAnimation *)animationNamed:(NSString *)name{
    return [CAAnimation animationWithSceneName:[NSString stringWithFormat:@"%@%@",basePath,name]];
}

-(SCNScene *)sceneNamed:(NSString *)name{
    NSString *scenePath = [NSString stringWithFormat:@"%@%@",basePath,name];
    SCNScene *scene = [SCNScene sceneNamed:scenePath];
    if(!scene){
        NSAssert(true,@"Failed to load audio source \(name).");
    }
    return scene;
}

/*
#pragma mark - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
}
*/
#pragma mark setter
-(void)setCharacterSpeed:(float)characterSpeed{

    _characterSpeed = characterSpeed;
    [self updateSpeed];
}
-(void)setBoostSpeedFactor:(float)boostSpeedFactor{

    _boostSpeedFactor = boostSpeedFactor;
        [self updateSpeed];
}
#pragma mark getter
-(CAAnimation *)jumpAnimation{

    if(!_jumpAnimation){
    
        _jumpAnimation = [self animationNamed:@"animation-jump.scn"];
    }
    return _jumpAnimation;
}
-(CAAnimation *)squatAnimation{
    
    if(!_squatAnimation){
        
        _squatAnimation = [self animationNamed:@"animation-squat.scn"];
    }
    return _squatAnimation;
}
-(CAAnimation *)leanLeftAnimation{
    
    if(!_leanLeftAnimation){
        
        _leanLeftAnimation = [self animationNamed:@"animation-lean-left.scn"];
    }
    return _leanLeftAnimation;
}
-(CAAnimation *)leanRightAnimation{
    
    if(!_leanRightAnimation){
        
        _leanRightAnimation = [self animationNamed:@"animation-lean-right.scn"];
    }
    return _leanRightAnimation;
}
-(CAAnimation *)slapAnimation{
    
    if(!_slapAnimation){
        
        _slapAnimation = [self animationNamed:@"animation-slap.scn"];
    }
    return _slapAnimation;
}
@end
