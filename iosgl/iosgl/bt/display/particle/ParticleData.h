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
//@property (nonatomic, assign)  BOOL  vcmatData: Float32Array;
/*
 public version: number;
         public _beginTime: number;
         public _delayedTime: number = 0;
         public _width: number = 100;//宽度
         public _height: number = 100;//高度
         public _widthFixed: boolean;//宽度比例不变
         public _heightFixed: boolean;//高度比例不变
         public _tileMode: boolean;//高度比例不变
         public _originWidthScale: number = 0.5;//原点宽度比例
         public _originHeightScale: number = 0.5;//原点高度比例
         public _eyeDistance: number = 0;//距离视点距离
         public _alphaMode: number;//alpha混合模式
         public _uSpeed: number;//u坐标平移速度
         public _vSpeed: number;//v坐标平移速度
         public _animLine: number;//动画行数
         public _animRow: number;//动画列数
         public _animInterval: number;//动画时间间隔
         public _renderPriority: number;//渲染优先级
         public _distortion: boolean;//是否扭曲
         public _isUV: boolean;
         public _isU: boolean;
         public _isV: boolean;
         public _life: number;//时间长度
         public _watchEye: boolean = false  //是否面向视点
         public _ziZhuanAngly: Vector3D;
         public _isZiZhuan: boolean = false;
         public _center: Vector3D;//中心点
         public overAllScale: number = 1;
         public _materialUrl: string;
 
         public materialParam: MaterialParam;
         public materialParamData: any;
 
         public objData: ObjData;
 
         public timelineData: TimeLineData;
 
         public rotationV3d: Vector3D;
         public center: Vector3D;
 
         public vcmatData: Float32Array;
 */


-(void)setAllByteInfo:(ByteArray*)byte;
 
@end

NS_ASSUME_NONNULL_END
