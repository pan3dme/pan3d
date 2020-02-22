//
//  ParticleBallData.m
//  iosgl
//
//  Created by zhao on 23/2/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "ParticleBallData.h"
#import "ByteArray.h"
#import "Vector3D.h"

@implementation ParticleBallData

- (instancetype)init
{
    self = [super init];
    if (self) {
        self._round=[[Vector3D alloc]init];
        self._shootAngly=[[Vector3D alloc]init];
    }
    return self;
}
- (void)setAllByteInfo:(ByteArray *)byte
{
    ParticleBallData *this=self;
    this._totalNum =  [byte readFloat];
    this._acceleration = [byte readFloat];
    this._toscale =  [byte readFloat];
    this._shootSpeed =  [byte readFloat];
    this._isRandom =  [byte readBoolean];
    this._isSendRandom =  [byte readBoolean];
    this._round.x = [byte readFloat];
    this._round.y = [byte readFloat];
    this._round.z = [byte readFloat];
    this._round.w =  [byte readFloat];
    this._is3Dlizi =  [byte readBoolean];
    this._halfCircle = [byte readBoolean];
    this._shootAngly.x =  [byte readFloat];
    this._shootAngly.y =  [byte readFloat];
    this._shootAngly.z = [byte readFloat];
    this._shootAngly.w =  [byte readFloat];
    
    [super setAllByteInfo:byte];
}
@end
