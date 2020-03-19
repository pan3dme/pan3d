//
//  DynamicTexItem.h
//  iosgl
//
//  Created by zhao on 9/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "DynamicBaseTexItem.h"
#import "TexItem.h"
#import "Curve.h"

NS_ASSUME_NONNULL_BEGIN
@class TexItem;
@interface DynamicTexItem : DynamicBaseTexItem
/*
 public url: string;
  //public target: TexItem;
  //public paramName: string;
  private _textureDynamic: WebGLTexture;
  //public textureRes:TextureRes;
  public isParticleColor: boolean;
  public curve: Curve;
  private _life: number;
 */

@property (nonatomic, strong)  NSString*  url;
@property(nonatomic,strong) TexItem* target;
@property(nonatomic,assign) BOOL  isParticleColor;
@property(nonatomic,strong)   Curve* curve ;
@property(nonatomic,assign)  float life;

-(void)initCurve:(int)type;

@end

NS_ASSUME_NONNULL_END
