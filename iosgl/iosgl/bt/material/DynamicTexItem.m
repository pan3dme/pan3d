//
//  DynamicTexItem.m
//  iosgl
//
//  Created by zhao on 9/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "DynamicTexItem.h"
#import "Curve.h"
#import "MaterialManager.h"

@implementation DynamicTexItem

/*
 public initCurve($type: number): void {
        this.curve = new Curve
        this.curve.type = $type;
    }
 */

-(void)initCurve:(int)type;
{
    self.curve=[[Curve alloc]init];
    self.curve.type=type;
    
}

-(GLuint)texture;
{
    if(self.textureDynamic){
        return self.textureDynamic;
    }else{
     if(self.textureRes){
              return self.textureRes.textTureLuint;
          }else{
              return nil;
          }
    }
    
}
/*
 public get texture(): WebGLTexture {
     if (this._textureDynamic) {
         return this._textureDynamic;
     } else {
         if (this.textureRes) {
             return this.textureRes.texture;
         } else {
             return null;
         }
     }
     
 }
 */
-(void)creatTextureByCurve;
{
   // self.textureDynamic
    
  
    
    
    CGRect rect = CGRectMake(0, 0, 100, 2);
    UIGraphicsBeginImageContext(rect.size);
    CGContextRef context = UIGraphicsGetCurrentContext();
    CGContextSetFillColorWithColor(context, [[UIColor redColor] CGColor]);
    CGContextFillRect(context, rect);
    UIImage *image = UIGraphicsGetImageFromCurrentImageContext();
    UIGraphicsEndImageContext();
    
    self.textureDynamic= [[MaterialManager default] createTextureWithImage:image];
    //[self createTextureWithImage:[UIImage imageNamed:urlStr]];
}
@end
