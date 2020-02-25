//
//  ParticleData.h
//  iosgl
//
//  Created by zhao on 23/2/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "ByteArray.h"
#import "Vector3D.h"
#import "ObjData.h"
#import "TimeLineData.h"
#import "Display3DParticle.h"
NS_ASSUME_NONNULL_BEGIN

@interface ParticleData : NSObject
@property (nonatomic, assign)  int version;
@property (nonatomic, assign)  float _beginTime;
@property (nonatomic, assign)  float _delayedTime;
@property (nonatomic, assign)  float _width;
@property (nonatomic, assign)  float _height;
@property (nonatomic, assign)  BOOL _widthFixed;
@property (nonatomic, assign)  BOOL _heightFixed;
@property (nonatomic, assign)  BOOL  _tileMode ;//高度比例不变
@property (nonatomic, assign)  float  _originWidthScale ;//原点宽度比例
@property (nonatomic, assign)  float  _originHeightScale ;//原点高度比例
@property (nonatomic, assign)  float  _eyeDistance ;//距离视点距离
@property (nonatomic, assign)  float  _alphaMode ;//alpha混合模式
@property (nonatomic, assign)  float  _uSpeed  ;//u坐标平移速度
@property (nonatomic, assign)  float  _vSpeed ;//v坐标平移速度
@property (nonatomic, assign)  float  _animLine ;//动画行数
@property (nonatomic, assign)  float  _animRow ;//动画列数
@property (nonatomic, assign)  float  _animInterval ;//动画时间间隔
@property (nonatomic, assign)  float  _renderPriority; //渲染优先级
@property (nonatomic, assign)  BOOL  _distortion; //是否扭曲
@property (nonatomic, assign)  BOOL  _isUV ;
@property (nonatomic, assign)  BOOL  _isU ;
@property (nonatomic, assign)  BOOL  _isV ;
@property (nonatomic, assign)  float  _life ;//时间长度
@property (nonatomic, assign)  BOOL  _watchEye;   //是否面向视点
@property (nonatomic, strong)  Vector3D*  _ziZhuanAngly;
@property (nonatomic, assign)  BOOL  _isZiZhuan ;
@property (nonatomic, assign)  Vector3D*  _center;//中心点
@property (nonatomic, assign)  float  overAllScale ;
@property (nonatomic, assign)  NSString*  _materialUrl;
//@property (nonatomic, assign)  BOOL  materialParam: MaterialParam;
@property (nonatomic, strong)  NSMutableDictionary*  materialParamData;
@property (nonatomic, assign)  ObjData*  objData;
@property (nonatomic, strong)  TimeLineData*  timelineData;
@property (nonatomic, strong)  Vector3D*  rotationV3d;
@property (nonatomic, strong)  Vector3D*  center;
 

-(void)setAllByteInfo:(ByteArray*)byte;
-(Display3DParticle*)creatPartilce;
-(Display3DParticle*)getParticle;
 
@end

NS_ASSUME_NONNULL_END
