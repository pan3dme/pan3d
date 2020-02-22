//
//  ParticleBallData.h
//  iosgl
//
//  Created by zhao on 23/2/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "ParticleData.h"
#import "Vector3D.h"
#import "Matrix3D.h"

NS_ASSUME_NONNULL_BEGIN

@interface ParticleBallData : ParticleData
 
@property (nonatomic, assign)  int  _totalNum ;
@property (nonatomic, assign)  float  _acceleration ;
@property (nonatomic, assign)  float  _toscale ;
@property (nonatomic, strong)  Vector3D*  _shootAngly;
@property (nonatomic, assign)  float  _shootSpeed;
@property (nonatomic, assign)  int  _isRandom;
@property (nonatomic, assign)  BOOL  _isSendRandom;
@property (nonatomic, assign)  BOOL  _isSendAngleRandom;
@property (nonatomic, assign)  float  _paticleMaxScale;
@property (nonatomic, assign)  float  _paticleMinScale;
@property (nonatomic, strong)  Vector3D*  _addforce;
@property (nonatomic, strong)  Vector3D*  _lixinForce;
@property (nonatomic, strong)  Vector3D*  _waveform;
@property (nonatomic, strong)  Vector3D*  _round;
@property (nonatomic, assign)  BOOL  _is3Dlizi;
@property (nonatomic, assign)  float  _speed;
@property (nonatomic, assign)  int  _isLoop;
@property (nonatomic, assign)  BOOL  _closeSurface;
@property (nonatomic, assign)  BOOL  _halfCircle;
@property (nonatomic, assign)  BOOL  _isEven;
@property (nonatomic, assign)  Vector3D*  _basePositon;
@property (nonatomic, assign)  float  _baseRandomAngle;
@property (nonatomic, assign)  int  _shapeType;
@property (nonatomic, assign)  int  _lockX;
@property (nonatomic, assign)  int  _lockY;
@property (nonatomic, assign)  NSMutableDictionary*  _textureRandomColorInfo;
@property (nonatomic, assign)  BOOL  _islixinAngly;
@property (nonatomic, assign)  Vector3D*  _particleRandomScale;
@property (nonatomic, assign)  float  _playSpeed;
@property (nonatomic, assign)  float  _beginScale;
@property (nonatomic, assign)  int  facez;
@property (nonatomic, assign)  BOOL  _needSelfRotation;
@property (nonatomic, assign)  BOOL  _needRandomColor;
@property (nonatomic, assign)  BOOL  _needScale;
@property (nonatomic, assign)  BOOL  _needAddSpeed;
@property (nonatomic, assign)  int  _uvType;
@property (nonatomic, assign)  NSMutableArray*  _timeVec;
@property (nonatomic, assign)  NSMutableArray*  _addSpeedVec;
@property (nonatomic, assign)  NSMutableArray*  _wordPosVec;
@property (nonatomic, assign)  NSMutableArray*  _caramPosVec;
@property (nonatomic, assign)  NSMutableArray*  _scaleVec;
@property (nonatomic, assign)  NSMutableArray*  _scaleCtrlVec;
@property (nonatomic, assign)  NSMutableArray*  _animCtrlVec;
@property (nonatomic, assign)  NSMutableArray*  _uvCtrlVec;
@property (nonatomic, assign)  Matrix3D*  _allRotationMatrix;
 
@end

NS_ASSUME_NONNULL_END
