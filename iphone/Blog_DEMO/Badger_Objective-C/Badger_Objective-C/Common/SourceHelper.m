//
//  SourceHelper.m
//  Badger_Objective-C
//
//  Created by roctian on 2016/10/28.
//  Copyright © 2016年 roctian. All rights reserved.
//

#import "SourceHelper.h"

//let hitSound             = Assets.sound(named: "hit.mp3")
//let railHighSpeedSound   = Assets.sound(named: "rail_highspeed_loop.mp3")
//let railMediumSpeedSound = Assets.sound(named: "rail_normalspeed_loop.mp3")
//let railLowSpeedSound    = Assets.sound(named: "rail_slowspeed_loop.mp3")
//let railWoodSound        = Assets.sound(named: "rail_wood_loop.mp3")
//let railSqueakSound      = Assets.sound(named: "cart_turn_squeak.mp3")
//let cartHide             = Assets.sound(named: "cart_hide.mp3")
//let cartJump             = Assets.sound(named: "cart_jump.mp3")
//let cartTurnLeft         = Assets.sound(named: "cart_turn_left.mp3")
//let cartTurnRight        = Assets.sound(named: "cart_turn_right.mp3")
//let cartBoost            = Assets.sound(named: "cart_boost.mp3")

@implementation SourceHelper

-(SCNAudioSource *)sound:(NSString *)name{
    
    SCNAudioSource *source = [SCNAudioSource audioSourceNamed:[NSString stringWithFormat:@"badger.scnassets/sounds/%@",name]];
    if(!source){
        NSAssert(true,@"Failed to load audio source \(name).");
    }
    return source;
}
#pragma mark getter
-(SCNAudioSource *)hitSound{

    if(!_hitSound){
    
        _hitSound = [self sound:@"hit.mp3"];
    }
    return _hitSound;
}
-(SCNAudioSource *)railHighSpeedSound{
    
    if(!_railHighSpeedSound){
        _railHighSpeedSound = [self sound:@"rail_highspeed_loop.mp3"];
    }
    return _railHighSpeedSound;
}
-(SCNAudioSource *)railMediumSpeedSound{
    
    if(!_railMediumSpeedSound){
         _railMediumSpeedSound = [self sound:@"rail_normalspeed_loop.mp3"];
    }
    return _railMediumSpeedSound;
}
-(SCNAudioSource *)railLowSpeedSound{
    
    if(!_railLowSpeedSound){
         _railLowSpeedSound = [self sound:@"rail_slowspeed_loop.mp3"];
    }
    return _railLowSpeedSound;
}
-(SCNAudioSource *)railWoodSound{
    
    if(!_railWoodSound){
         _railWoodSound = [self sound:@"rail_wood_loop.mp3"];
    }
    return _railWoodSound;
}
-(SCNAudioSource *)railSqueakSound{
    
    if(!_railSqueakSound){
        _railSqueakSound = [self sound:@"cart_turn_squeak.mp3"];
    }
    return _railSqueakSound;
}
-(SCNAudioSource *)cartHide{
    
    if(!_cartHide){
        _cartHide = [self sound:@"cart_hide.mp3"];
    }
    return _cartHide;
}
-(SCNAudioSource *)cartJump{
    
    if(!_cartJump){
        _cartJump = [self sound:@"cart_jump.mp3"];
    }
    return _cartJump;
}
-(SCNAudioSource *)cartTurnLeft{
    
    if(!_cartTurnLeft){
       _cartTurnLeft = [self sound:@"cart_turn_left.mp3"];
    }
    return _cartTurnLeft;
}
-(SCNAudioSource *)cartTurnRight{
    
    if(!_cartTurnRight){
        _cartTurnRight = [self sound:@"cart_turn_right.mp3"];
    }
    return _cartTurnRight;
}
-(SCNAudioSource *)cartBoost{
    
    if(!_cartBoost){
         _cartBoost = [self sound:@"cart_boost.mp3"];
    }
    return _cartBoost;
}
-(SCNAudioSource *)collectSound{
    
    if(!_collectSound){
        _collectSound = [self sound:@"collect1.mp3"];
    }
    return _collectSound;
}
-(SCNAudioSource *)collectSound2{
    
    if(!_collectSound2){
        _collectSound2 = [self sound:@"collect2.mp3"];
    }
    return _collectSound2;
}
@end
