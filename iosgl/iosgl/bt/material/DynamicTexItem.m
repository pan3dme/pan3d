//
//  DynamicTexItem.m
//  iosgl
//
//  Created by zhao on 9/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "DynamicTexItem.h"
#import "Curve.h"
#import "Context3D.h"
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
    NSMutableArray<NSMutableArray<NSNumber*>*>* imgNumVec=[[NSMutableArray alloc]init];
 
    for(int i=0;i<this.life;i++){
        NSMutableArray<NSNumber*>* tempInset;
        
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
               tempInset=[[NSMutableArray alloc] initWithObjects:@1, @1, @1,@1, nil];
            } else {
                NSInteger index = i - this.curve.begintFrame;
               tempInset=this.curve.valueVec[index];
            }
        }
 
 
       
     //      tempInset=[[NSMutableArray alloc] initWithObjects:@1, @1, @1,@1, nil];
       
        [imgNumVec addObject:tempInset];
    }
    
 
    
    CGRect rect = CGRectMake(0, 0, 128, 1);
 
    UIGraphicsBeginImageContext(rect.size);
    CGContextRef context = UIGraphicsGetCurrentContext();
    CGContextSetFillColorWithColor(context, [[UIColor clearColor] CGColor]);
    CGContextFillRect(context, rect);
    UIImage *image = UIGraphicsGetImageFromCurrentImageContext();
    UIGraphicsEndImageContext();
    image=  [self imageBlackToTransparent:image withArr:imgNumVec];
    
    self.textureDynamic= [Context3D getTexture:image wrap:0];
   
    
    
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
    NSInteger endindex;
    Vector3D* a=[[Vector3D alloc]init];
    Vector3D* b=[[Vector3D alloc]init];
    Vector3D* c=[[Vector3D alloc]init];
    float bscale=0;
    
    for (int i = 0; i < pixelNum; i++, pCurPtr++){
        
        
        // 改成下面的代码，会将图片转成想要的颜色
        uint8_t* ptr = (uint8_t*)pCurPtr;
        ptr[3] = 0; //0~255
        ptr[2] = 0;
        ptr[1] = 0;
        ptr[0] = 255.0f;
        
        baseindex= floor(((float)i)/pixelNum*withArr.count);
        endindex= ceil(((float)i)/pixelNum*withArr.count);
        endindex=MIN(endindex, withArr.count-1);
        
        a.x=[ withArr[baseindex][0] floatValue];
        a.y=[ withArr[baseindex][1] floatValue];
        a.z=[ withArr[baseindex][2] floatValue];
        a.w=[ withArr[baseindex][3] floatValue];
        
        b.x=[ withArr[endindex][0] floatValue];
        b.y=[ withArr[endindex][1] floatValue];
        b.z=[ withArr[endindex][2] floatValue];
        b.w=[ withArr[endindex][3] floatValue];
        
        if(endindex>baseindex){
            bscale=  (((float)i*((float)withArr.count/(float)pixelNum))-baseindex)/ (endindex-baseindex);
        }else{
            bscale=0;
        }
        c.x=a.x+(b.x-a.x)*bscale;
        c.y=a.y+(b.y-a.y)*bscale;
        c.z=a.z+(b.z-a.z)*bscale;
        c.w=a.w+(b.w-a.w)*bscale;

        ptr[3] = c.w*0xff;
        ptr[2] = c.z*0xff;
        ptr[1] = c.y*0xff;
        ptr[0] = c.x*0xff;
        
   
        
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
