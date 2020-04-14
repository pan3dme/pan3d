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
    DynamicTexItem* this=self;
    NSInteger endVecIndex = self.curve.valueVec.count - 1;
    NSMutableArray<NSMutableArray*>* imgNumVec=[[NSMutableArray alloc]init];
    
    
    for(int i=0;i<this.life;i++){
        NSMutableArray* tempInset;
        if (i < this.curve.begintFrame) {
            tempInset=this.curve.valueVec[0];
        } else if (i > this.curve.maxFrame) {
            if (this.curve.maxFrame == 0 && this.curve.begintFrame < 0) {
               tempInset=[[NSMutableArray alloc] initWithObjects:@1, @1, @1,@1, nil];
            } else {
               tempInset=this.curve.valueVec[endVecIndex];
            }
            
        } else {
            if (this.curve.begintFrame < 0) {
               tempInset=[[NSMutableArray alloc] initWithObjects:@0, @1, @1,@1, nil];
            } else {
                NSInteger index = i - this.curve.begintFrame;
               tempInset=this.curve.valueVec[index];
            }
            
        }
        tempInset=[[NSMutableArray alloc] initWithObjects:@1, @1, @0,@1, nil];
        [imgNumVec addObject:tempInset];
    }
    
     imgNumVec=  [self makeArrToArr:imgNumVec len:128];
 
    
    CGRect rect = CGRectMake(0, 0, 128, 1);
    UIGraphicsBeginImageContext(rect.size);
    CGContextRef context = UIGraphicsGetCurrentContext();
    CGContextSetFillColorWithColor(context, [[UIColor clearColor] CGColor]);
    CGContextFillRect(context, rect);
    UIImage *image = UIGraphicsGetImageFromCurrentImageContext();
    UIGraphicsEndImageContext();
    image=  [self imageBlackToTransparent:image withArr:imgNumVec];
    
    self.textureDynamic= [[MaterialManager default] createTextureWithImage:image];
   
    
    
}
-(NSMutableArray<NSMutableArray*>*)makeArrToArr:(NSMutableArray<NSMutableArray*>*)arr len:(int)len;
{
    NSMutableArray<NSMutableArray*>* outarr=[[NSMutableArray alloc]init];
    for(int i=0;i<len;i++){
        int idx=floor((float)i/(float)len *(float)arr.count);
        [outarr addObject:arr[idx]];
    }
    return outarr;
}
void ProviderReleaseData (void *info, const void *data, size_t size){
    free((void*)data);
}
- (UIImage*)imageBlackToTransparent:(UIImage*)image withArr:(NSArray*)withArr{
    const int imageWidth = image.size.width;
    const int imageHeight = image.size.height;
    size_t      bytesPerRow = imageWidth * 4;
    uint32_t* rgbImageBuf = (uint32_t*)malloc(bytesPerRow * imageHeight);
    CGColorSpaceRef colorSpace = CGColorSpaceCreateDeviceRGB();
    CGContextRef context = CGBitmapContextCreate(rgbImageBuf, imageWidth, imageHeight, 8, bytesPerRow, colorSpace,
                                                 kCGBitmapByteOrder32Little | kCGImageAlphaNoneSkipLast);
    CGContextDrawImage(context, CGRectMake(0, 0, imageWidth, imageHeight), image.CGImage);
    // 遍历像素
    int pixelNum = imageWidth * imageHeight;
    uint32_t* pCurPtr = rgbImageBuf;
    
    NSInteger baseindex;
    for (int i = 0; i < pixelNum; i++, pCurPtr++){

         
            // 改成下面的代码，会将图片转成想要的颜色
            uint8_t* ptr = (uint8_t*)pCurPtr;
            ptr[3] = 0.0; //0~255
            ptr[2] = 0.0;
            ptr[1] = 255.0;
            ptr[0] = 128.0f;
        
           baseindex= floor(((float)i)/pixelNum*withArr.count);

            ptr[3] = [ withArr[baseindex][2] floatValue]*0xff;
            ptr[2] =  [ withArr[baseindex][1] floatValue]*0xff;
            ptr[1] =  [ withArr[baseindex][0] floatValue]*0xff;
            ptr[0] =  [ withArr[baseindex][3] floatValue]*0xff;;
        
      //  NSLog(@"--%d",baseindex);

    }
       
    // 输出图片
    CGDataProviderRef dataProvider = CGDataProviderCreateWithData(NULL, rgbImageBuf, bytesPerRow * imageHeight, ProviderReleaseData);
    CGImageRef imageRef = CGImageCreate(imageWidth, imageHeight, 8, 32, bytesPerRow, colorSpace,
                                        kCGImageAlphaLast | kCGBitmapByteOrder32Little, dataProvider,
                                        NULL, true, kCGRenderingIntentDefault);
    CGDataProviderRelease(dataProvider);
    UIImage* resultUIImage = [UIImage imageWithCGImage:imageRef];
    // 清理空间
    CGImageRelease(imageRef);
    CGContextRelease(context);
    CGColorSpaceRelease(colorSpace);
    return resultUIImage;
}

@end
