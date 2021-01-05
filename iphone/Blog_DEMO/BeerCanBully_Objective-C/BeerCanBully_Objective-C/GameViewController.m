//
//  GameViewController.m
//  BeerCanBully_Objective-C
//
//  Created by roctian on 2016/10/24.
//  Copyright © 2016年 roctian. All rights reserved.
//

#import "GameViewController.h"
#import <GameplayKit/GameplayKit.h>

@implementation GameViewController
@synthesize helper;
- (void)viewDidLoad
{
    [super viewDidLoad];

    self.bashedCanNames = [NSMutableArray new];
    helper = [GameHelper shareHelper];

    // Scene properties
    self.menuScene = [SCNScene sceneNamed:@"resources.scnassets/Menu.scn"];
    self.levelScene = [SCNScene sceneNamed:@"resources.scnassets/Level.scn"];
    
    [self presentMenu];
    [self createScene];
}
// MARK: - Helpers
-(void)presentMenu{
    
    SCNNode *hudNode =  [self.menuScene.rootNode childNodeWithName:@"hud" recursively:YES];
    hudNode.geometry.materials = @[helper.menuHUDMaterial];
    hudNode.rotation = SCNVector4Make(1, 0, 0, M_PI);
    
    helper.state = tapToPlay;
    helper.menuLabelNode.text = [NSString stringWithFormat:@"Highscore:%d",helper.highScore];
    
    SKTransition *transition = [SKTransition crossFadeWithDuration:1.0];
    [self.scnView presentScene:self.menuScene withTransition:transition incomingPointOfView:nil completionHandler:^{
        
    }];
}
-(void)presentLevel{
    [self resetLevel];
    [self setupNextLevel];
    helper.state = playing;
    
    SKTransition *transition = [SKTransition crossFadeWithDuration:1.0];
    [self.scnView presentScene:self.levelScene withTransition:transition incomingPointOfView:nil completionHandler:^{
        
    }];
}
-(void)resetLevel{
    
    if(self.currentBallNode)
        [self.currentBallNode removeFromParentNode];
    
    [self.bashedCanNames removeAllObjects];
    
    for(SCNNode *canNode in helper.canNodes){
        [canNode removeFromParentNode];
    }
    [helper.canNodes removeAllObjects];
    
    for (SCNNode *ballNode in helper.ballNodes){
        [ballNode removeFromParentNode];
    }
}
-(void)setupNextLevel{
    if (helper.ballNodes.count > 0){
        [helper.ballNodes removeLastObject];
    }
    
    GameLevel *level = helper.levels[helper.currentLevel];
    for (int idx =0;idx<level.canPositions.count;idx++){
        SCNNode *canNode = [self.baseCanNode clone];
        canNode.geometry = [self.baseCanNode.geometry copy];
        canNode.geometry.firstMaterial = [self.baseCanNode.geometry.firstMaterial copy];
        
        BOOL shouldCreateBaseVariation = [[GKRandomSource sharedRandom] nextInt] % 2 == 0;
        
        canNode.eulerAngles = SCNVector3Make(0,shouldCreateBaseVariation ? -110 : 55, 0);
        canNode.name = [NSString stringWithFormat:@"Can#%d",idx];
        
        NSArray *materials = canNode.geometry.materials;
        
            for(SCNMaterial *material in materials) {
                
                if(material.multiply.contents != nil){
                
                    if (shouldCreateBaseVariation){
                        material.multiply.contents = @"resources.scnassets/Can_Diffuse-2.png";
                    } else {
                        material.multiply.contents = @"resources.scnassets/Can_Diffuse-1.png";
                    }
                }
            }
        
        SCNPhysicsShape *canPhysicsBodyShape = [SCNPhysicsShape shapeWithGeometry:[SCNCylinder cylinderWithRadius:0.33 height:1.125] options:nil];
        SCNPhysicsBody *canPhysicsBody = [SCNPhysicsBody bodyWithType:SCNPhysicsBodyTypeDynamic shape:canPhysicsBodyShape];
  
        canPhysicsBody.mass = 0.75;
        canPhysicsBody.contactTestBitMask = 1;
        canNode.physicsBody = canPhysicsBody;
        CanPosition *position = level.canPositions[idx];
        canNode.position = SCNVector3Make(position.x, position.y, position.z);
        
        [self.levelScene.rootNode addChildNode:canNode];
        [helper.canNodes addObject:canNode];
    }
    
    SCNAction *waitAction = [SCNAction waitForDuration:1.0];
    SCNAction *blockAction = [SCNAction runBlock:^(SCNNode * _Nonnull node) {
        [self dispenseNewBall];
    }];
   
    SCNAction *sequenceAction = [SCNAction sequence:@[waitAction,blockAction]];
    [self.levelScene.rootNode runAction:sequenceAction];
}
-(void)createLevelsFrom:(SCNNode *)baseNode {
    // Level 1
   CanPosition *levelOneCanOne = [CanPosition new];

   levelOneCanOne.x = baseNode.position.x - 0.5;
   levelOneCanOne.y = baseNode.position.y + 0.62;
   levelOneCanOne.z = baseNode.position.z;
  
    CanPosition *levelOneCanTwo = [CanPosition new];
    levelOneCanTwo.x = baseNode.position.x + 0.5;
    levelOneCanTwo.y = baseNode.position.y + 0.62;
    levelOneCanTwo.z = baseNode.position.z;
    
    CanPosition *levelOneCanThree = [CanPosition new];
    levelOneCanThree.x = baseNode.position.x;
    levelOneCanThree.y = baseNode.position.y + 1.75;
    levelOneCanThree.z = baseNode.position.z;

    GameLevel *levelOne = [GameLevel new];
    levelOne.canPositions = [@[levelOneCanOne,levelOneCanTwo,levelOneCanThree] mutableCopy];
    
    
    // Level 2
    CanPosition *levelTwoCanOne = [CanPosition new];
    levelTwoCanOne.x = baseNode.position.x - 0.65;
    levelTwoCanOne.y = baseNode.position.y + 0.62;
    levelTwoCanOne.z = baseNode.position.z;
    
    CanPosition *levelTwoCanTwo = [CanPosition new];
    levelTwoCanTwo.x = baseNode.position.x - 0.65;
    levelTwoCanTwo.y = baseNode.position.y + 1.75;
    levelTwoCanTwo.z = baseNode.position.z;
    
    CanPosition *levelTwoCanThree = [CanPosition new];
    levelTwoCanThree.x = baseNode.position.x + 0.65;
    levelTwoCanThree.y = baseNode.position.y + 0.62;
    levelTwoCanThree.z = baseNode.position.z;
    
    CanPosition *levelTwoCanFour = [CanPosition new];
    levelTwoCanFour.x = baseNode.position.x + 0.65;
    levelTwoCanFour.y = baseNode.position.y + 1.75;
    levelTwoCanFour.z = baseNode.position.z;
    
    GameLevel *levelTwo = [GameLevel new];
    levelTwo.canPositions = [@[levelTwoCanOne,levelTwoCanTwo,levelTwoCanThree,levelTwoCanFour] mutableCopy];
    
    helper.levels = [@[levelOne, levelTwo] mutableCopy];
}
-(void)dispenseNewBall{
    SCNScene *ballScene = [SCNScene sceneNamed:@"resources.scnassets/Ball.scn"];
    
    SCNNode *ballNode = [ballScene.rootNode childNodeWithName:@"sphere" recursively:YES];
    ballNode.name = @"ball";
    SCNPhysicsBody *ballPhysicsBody = [SCNPhysicsBody bodyWithType:SCNPhysicsBodyTypeDynamic shape:[SCNPhysicsShape shapeWithGeometry:[SCNSphere sphereWithRadius:0.35] options:nil]];
    
    ballPhysicsBody.mass = 3;
    ballPhysicsBody.friction = 2;
    ballPhysicsBody.contactTestBitMask = 1;
    ballNode.physicsBody = ballPhysicsBody;
    ballNode.position = SCNVector3Make(-1.75,1.75,8.0);
    [ballNode.physicsBody applyForce:SCNVector3Make(0.825,0,0) impulse:true];
    
    _currentBallNode = ballNode;
    [self.levelScene.rootNode addChildNode:ballNode];
}
-(void)throwBall{
    
    if (!self.currentBallNode) {
        return;
    }
    if (!self.endTouch) {
        return;
    }
    
    SCNNode *ballNode = self.currentBallNode;
    
    NSArray <SCNHitTestResult *>*hitTestResults = [self.scnView hitTest:[self.endTouch locationInView:self.scnView] options:nil];
    if(hitTestResults.count>0){
    
        SCNHitTestResult *firstTouchResult;
        for(SCNHitTestResult *touchResult in hitTestResults){
        
            if(firstTouchResult.node != self.touchCatchingPlaneNode){
            
                firstTouchResult = touchResult;
                break;
            }
        }
      
        if(!firstTouchResult)
            return;
    
        SCNAction *playAudioAction = [SCNAction playAudioSource:helper.whooshAudioSource waitForCompletion:false];
        [self.levelScene.rootNode runAction:playAudioAction];
    
        NSTimeInterval timeDifference = self.endTouchTime - self.startTouchTime;
        float velocityComponent = fmin(fmax(1 - timeDifference, 0.1), 1.0);
    
        SCNVector3 impulseVector = SCNVector3Make(firstTouchResult.localCoordinates.x,firstTouchResult.localCoordinates.y * velocityComponent * 3,self.shelfNode.position.z * velocityComponent * 15);
    
        [ballNode.physicsBody applyForce:impulseVector impulse:YES];
        [helper.ballNodes addObject:ballNode];
    
        self.currentBallNode = nil;
        self.startTouchTime = 0;
        self.endTouchTime = 0;
        self.startTouch = nil;
        self.endTouch = nil;
    
    if ((int)helper.ballNodes.count == helper.maxBallNodes) {
        SCNAction *waitAction = [SCNAction waitForDuration:3.0f];
        SCNAction *blockAction = [SCNAction runBlock:^(SCNNode * _Nonnull node) {
            
            [self resetLevel];
            [self.helper.ballNodes removeAllObjects];
            self.helper.currentLevel = 0;
            self.helper.score = 0;
            [self presentMenu];
        }];
        SCNAction *sequenceAction = [SCNAction sequence:@[waitAction, blockAction]];
        [self.levelScene.rootNode runAction:sequenceAction forKey:gameEndActionKey];
    } else {
        SCNAction *waitAction = [SCNAction waitForDuration:0.5f];
        SCNAction *blockAction = [SCNAction runBlock:^(SCNNode * _Nonnull node) {
            [self dispenseNewBall];
        }];
        SCNAction *sequenceAction = [SCNAction sequence:@[waitAction, blockAction]];
        [self.levelScene.rootNode runAction:sequenceAction];
    }
    }
}

// MARK: - Creation
-(void)createScene{
    self.levelScene.physicsWorld.contactDelegate = self;
    
    self.cameraNode = [self.levelScene.rootNode childNodeWithName:@"camera" recursively:YES];
    self.shelfNode = [self.levelScene.rootNode childNodeWithName:@"shelf" recursively:YES];
    
    SCNScene *canScene = [SCNScene sceneNamed:@"resources.scnassets/Can.scn"];
    if(!canScene)
        return;
    
    self.baseCanNode = [canScene.rootNode childNodeWithName:@"can" recursively:YES];
    
    SCNPhysicsBody *shelfPhysicsBody = [SCNPhysicsBody bodyWithType:SCNPhysicsBodyTypeStatic shape:[SCNPhysicsShape shapeWithGeometry:self.shelfNode.geometry options:nil]];

    shelfPhysicsBody.affectedByGravity = false;
    self.shelfNode.physicsBody = shelfPhysicsBody;
    
    [self.levelScene.rootNode addChildNode:self.touchCatchingPlaneNode];
    self.touchCatchingPlaneNode.position = SCNVector3Make(0, 0,self.shelfNode.position.z);
    self.touchCatchingPlaneNode.eulerAngles = self.cameraNode.eulerAngles;
    
    [self createLevelsFrom:self.shelfNode];
    [self.levelScene.rootNode addChildNode:helper.hudNode];
}
-(void)touchesBegan:(NSSet<UITouch *> *)touches withEvent:(UIEvent *)event{

    [super touchesBegan:touches withEvent:event];
    
    if (helper.state == tapToPlay){
        [self presentLevel];
    } else {
        
        UITouch *firstTouch = [touches anyObject];
        if(!firstTouch)
            return;
        
        CGPoint point = [firstTouch locationInView:self.scnView];
        NSArray *hitResults = [self.scnView hitTest:point options:nil];
    
        if(hitResults.count==0)
            return;
        
        SCNHitTestResult *firstNode = hitResults[0];
        
        if (firstNode.node == self.currentBallNode){
            self.startTouch = firstTouch;
            self.startTouchTime = [[NSDate date] timeIntervalSince1970];
        }
    }
}
-(void)touchesEnded:(NSSet<UITouch *> *)touches withEvent:(UIEvent *)event{

    [super touchesEnded:touches withEvent:event];
    
    if(self.startTouch == nil)
        return;
    
    self.endTouch = [touches anyObject];
    self.endTouchTime = [[NSDate date] timeIntervalSince1970];
    [self throwBall];
}
- (BOOL)shouldAutorotate
{
    return YES;
}

- (BOOL)prefersStatusBarHidden {
    return YES;
}

- (UIInterfaceOrientationMask)supportedInterfaceOrientations
{
    if ([[UIDevice currentDevice] userInterfaceIdiom] == UIUserInterfaceIdiomPhone) {
        return UIInterfaceOrientationMaskAllButUpsideDown;
    } else {
        return UIInterfaceOrientationMaskAll;
    }
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Release any cached data, images, etc that aren't in use.
}
#pragma mark SCNPhysicsContactDelegate
-(void)physicsWorld:(SCNPhysicsWorld *)world didBeginContact:(SCNPhysicsContact *)contact{

    NSString *nodeNameA = contact.nodeA.name;
    NSString *nodeNameB = contact.nodeB.name;
    
    SCNNode *ballFloorContactNode;
    if ([nodeNameA isEqualToString:@"ball"] && [nodeNameB isEqualToString:@"floor"]){
        ballFloorContactNode = contact.nodeA;
    } else if([nodeNameB isEqualToString:@"ball"] && [nodeNameA isEqualToString:@"floor" ]){
        ballFloorContactNode = contact.nodeB;
    }
    
    SCNNode *ballNode = ballFloorContactNode;
    if(ballNode){
        
        SCNAction *tempAction = [ballNode actionForKey:ballFloorCollisionAudioKey];
        
        if(!tempAction)
            [ballNode runAction:[SCNAction playAudioSource:helper.ballFloorAudioSource waitForCompletion:true] forKey:ballFloorCollisionAudioKey];
        return;
    }
    
    SCNNode *ballCanContactNode;
    if([nodeNameA containsString:@"Can"] && [nodeNameB isEqualToString:@"ball"]){
        ballCanContactNode = contact.nodeA;
    } else if([nodeNameB containsString:@"Can"] && [nodeNameA isEqualToString:@"ball"]){
        ballCanContactNode = contact.nodeB;
    }
    
    if (ballCanContactNode){
        
        SCNAction *tempAction = [ballNode actionForKey:ballCanCollisionAudioKey];

        if(!tempAction)
            [ballNode runAction:[SCNAction playAudioSource:helper.ballCanAudioSource waitForCompletion:true] forKey:ballCanCollisionAudioKey];
        return;
        
    }
    
    if([self.bashedCanNames containsObject:nodeNameA] || [self.bashedCanNames containsObject:nodeNameB]) { return; }
    
    SCNNode *canNodeWithContact;
    if([nodeNameA containsString:@"Can"] && [nodeNameB isEqualToString:@"floor"]){
        canNodeWithContact = contact.nodeA;
    } else if([nodeNameB containsString:@"Can"] && [nodeNameA isEqualToString:@"floor"]){
        canNodeWithContact = contact.nodeB;
    }
    
    SCNNode *bashedCan = canNodeWithContact;
    if (bashedCan){
        [bashedCan runAction:[SCNAction playAudioSource:helper.canFloorAudioSource waitForCompletion:false]];
        [self.bashedCanNames addObject:bashedCan.name];
        helper.score += 1;
    }
    
    if (self.bashedCanNames.count == helper.canNodes.count) {
        
        if([self.levelScene.rootNode actionForKey:@"gameEndActionKey"]){
        
            [self.levelScene.rootNode removeActionForKey:gameEndActionKey];
        }
        
        int maxLevelIndex = (int)helper.levels.count - 1;
        
        if(helper.currentLevel == maxLevelIndex) {
            helper.currentLevel = 0;
        } else {
            helper.currentLevel += 1;
        }
        
        SCNAction *waitAction = [SCNAction waitForDuration:1.0f];
        SCNAction *blockAction = [SCNAction runBlock:^(SCNNode * _Nonnull node) {
            [self resetLevel];
            [self setupNextLevel];
        }];
        SCNAction *sequenceAction = [SCNAction sequence:@[waitAction, blockAction]];
        [self.levelScene.rootNode runAction:sequenceAction];
    }
}
#pragma mark getter
-(SCNNode *)touchCatchingPlaneNode{

    if(!_touchCatchingPlaneNode){
        
        _touchCatchingPlaneNode = [SCNNode nodeWithGeometry:[SCNPlane planeWithWidth:40.0f height:40.0f]];
        _touchCatchingPlaneNode.opacity = 0.001;
        _touchCatchingPlaneNode.castsShadow = false;
    }
    return _touchCatchingPlaneNode;
}
-(SCNView *)scnView{

    if (!_scnView) {
        _scnView = (SCNView *)self.view;
        _scnView.backgroundColor = [UIColor blackColor];
    }
    return _scnView;
}
@end
