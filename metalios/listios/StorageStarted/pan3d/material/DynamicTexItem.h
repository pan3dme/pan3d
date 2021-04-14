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
 
@property(nonatomic,assign) GLuint textureDynamic;
@property(nonatomic,strong) id<MTLTexture>  mtlTextureDynamic;
@property(nonatomic,assign) BOOL  isParticleColor;
@property(nonatomic,strong)   Curve* curve ;
@property(nonatomic,assign)  float life;

-(void)initCurve:(int)type;
-(GLuint)texture;
-(id<MTLTexture> )mtltexture;
@end

NS_ASSUME_NONNULL_END
