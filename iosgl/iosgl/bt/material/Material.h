//
//  Material.h
//  iosgl
//
//  Created by zhao on 9/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "ByteArray.h"
#import "ResCount.h"
#import "Shader3D.h"
#import "TexItem.h"
#import "ConstItem.h"
NS_ASSUME_NONNULL_BEGIN
 


@interface Material : ResCount

@property (nonatomic, strong)  NSString*  url;
@property (nonatomic, assign)  NSString*  shaderStr;
@property (nonatomic, strong)  NSMutableArray<TexItem*>*  texList ;
@property (nonatomic, assign)  NSMutableArray<ConstItem*>*  constList ;
@property (nonatomic, assign)  BOOL  hasTime;
@property (nonatomic, assign)  float  timeSpeed;
@property (nonatomic, assign)  int  blendMode;
@property (nonatomic, assign)  BOOL  backCull;
@property (nonatomic, assign)  float  killNum;
@property (nonatomic, assign)  BOOL hasVertexColor;
@property (nonatomic, assign)  BOOL  usePbr;
@property (nonatomic, assign)  BOOL  useNormal;
@property (nonatomic, assign)  float  roughness;
@property (nonatomic, assign)  GLuint   program;
@property (nonatomic, assign)  Shader3D*  shader;
@property (nonatomic, assign)  BOOL  writeZbuffer;
@property (nonatomic, assign)  BOOL  hasFresnel;
@property (nonatomic, assign)  BOOL  useDynamicIBL;
@property (nonatomic, assign)  float  normalScale;
@property (nonatomic, assign)  BOOL  lightProbe;
@property (nonatomic, assign)  BOOL  useKill;
@property (nonatomic, assign)  BOOL  directLight;
@property (nonatomic, assign)  BOOL  noLight;
@property (nonatomic, assign)  BOOL  scaleLightMap;
@property (nonatomic, assign)  float  fogMode;
@property (nonatomic, assign)  int  fcNum;
@property (nonatomic, strong)  NSMutableArray*  fcIDAry ;
//  public fcIDAry:Array<number>;
@property (nonatomic, assign)  BOOL  hasParticleColor;
@property (nonatomic, assign)  NSMutableDictionary*  locationDic;
@property (nonatomic, assign)  GLfloat*   fcData;
@property (nonatomic, assign)  float  sceneNumId;

-(void)setByteData:(ByteArray*)byte;
@end

NS_ASSUME_NONNULL_END
