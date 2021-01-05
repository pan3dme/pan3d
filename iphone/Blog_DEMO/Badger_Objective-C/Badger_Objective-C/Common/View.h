//
//  View.h
//  Badger_Objective-C
//
//  Created by roctian on 2016/10/27.
//  Copyright © 2016年 roctian. All rights reserved.
//

#import <SceneKit/SceneKit.h>

@interface View : SCNView

@property(nonatomic,strong) SKNode * overlayNode;
@property(nonatomic,strong) SKNode * scaleNode;
@property(nonatomic,strong) SKLabelNode * collectedItemsCountLabel;
@property(nonatomic) int collectedItemsCount;

-(void)setup2DOverlay;
-(void)didCollectItem;
-(void)didCollectBigItem;

@end
