//
//  SourceHelper.h
//  Badger_Objective-C
//
//  Created by roctian on 2016/10/28.
//  Copyright © 2016年 roctian. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface SourceHelper : NSObject

@property(nonatomic,strong) SCNAudioSource * hitSound;
@property(nonatomic,strong) SCNAudioSource * railHighSpeedSound;
@property(nonatomic,strong) SCNAudioSource * railMediumSpeedSound;
@property(nonatomic,strong) SCNAudioSource * railLowSpeedSound;
@property(nonatomic,strong) SCNAudioSource * railWoodSound;
@property(nonatomic,strong) SCNAudioSource * railSqueakSound;
@property(nonatomic,strong) SCNAudioSource * cartHide;
@property(nonatomic,strong) SCNAudioSource * cartJump;
@property(nonatomic,strong) SCNAudioSource * cartTurnLeft;
@property(nonatomic,strong) SCNAudioSource * cartTurnRight;
@property(nonatomic,strong) SCNAudioSource * cartBoost;

@property(nonatomic,strong) SCNAudioSource * collectSound;
@property(nonatomic,strong) SCNAudioSource * collectSound2;
@end
