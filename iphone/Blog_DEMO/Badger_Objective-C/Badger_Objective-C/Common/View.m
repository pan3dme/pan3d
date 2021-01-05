//
//  View.m
//  Badger_Objective-C
//
//  Created by roctian on 2016/10/27.
//  Copyright © 2016年 roctian. All rights reserved.
//

#import "View.h"

@implementation View
-(id)initWithFrame:(CGRect)frame{

    self = [super initWithFrame:frame];
    if(self){
    
        _overlayNode = [SKNode new];
        _scaleNode = [SKNode new];
        _collectedItemsCountLabel = [SKLabelNode labelNodeWithFontNamed:@"Superclarendon"];
    }
    return self;
}
/*
// Only override drawRect: if you perform custom drawing.
// An empty implementation adversely affects performance during animation.
- (void)drawRect:(CGRect)rect {
    // Drawing code
}
*/
-(void)layoutSubviews{

    [super layoutSubviews];
    [self update2DOverlays];
}
-(void)update2DOverlays{

    _overlayNode.position = CGPointMake(0.0, self.bounds.size.height);

}
-(void)setup2DOverlay{
    int w = self.bounds.size.width;
    int h = self.bounds.size.height;
    
    // Setup the game overlays using SpriteKit.
    SKScene *skScene= [SKScene sceneWithSize:CGSizeMake(w, h)];
    skScene.scaleMode = SKSceneScaleModeResizeFill;
    
    [skScene addChild:self.scaleNode];
    [self.scaleNode addChild:self.overlayNode];
    self.overlayNode.position = CGPointMake(0.0,h);
    
    // The Bob icon.
    SKSpriteNode *bobSprite = [SKSpriteNode spriteNodeWithImageNamed:@"BobHUD.png"];
    bobSprite.position = CGPointMake(70,-50);
    bobSprite.xScale = 0.5;
    bobSprite.yScale = 0.5;
    [self.overlayNode addChild:bobSprite];
    
    self.collectedItemsCountLabel.text = @"x0";
    self.collectedItemsCountLabel.horizontalAlignmentMode = SKLabelHorizontalAlignmentModeLeft;
    self.collectedItemsCountLabel.position = CGPointMake(135,-63);
    [self.overlayNode addChild:self.collectedItemsCountLabel];
    
    // Assign the SpriteKit overlay to the SceneKit view.
    self.overlaySKScene = skScene;
    skScene.userInteractionEnabled = false;
}
-(void)setCollectedItemsCount:(int)collectedItemsCount{

    _collectedItemsCount = collectedItemsCount;
    _collectedItemsCountLabel.text = [NSString stringWithFormat:@"x%d",_collectedItemsCount];
}
-(void)didCollectItem{
    self.collectedItemsCount = _collectedItemsCount + 1;
}

-(void)didCollectBigItem{
    self.collectedItemsCount = _collectedItemsCount + 10;
}
@end
