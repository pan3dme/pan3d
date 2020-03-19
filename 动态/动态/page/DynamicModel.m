//
//  DynamicModel.m
//  动态
//
//  Created by zhao on 18/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "Header.h"
#import "NSObject+MJKeyValue.h"
#import "NSObject+MJProperty.h"
#import "NSString+MJExtension.h"
#import "NetHttpsManager.h"
#import "DynamicModel.h"
#import "UserInfoVo.h"
#import "UpImageVo.h"
 
 

static DynamicModel *dynamicModel = nil;
@implementation DynamicModel
+ (instancetype)default;
{
    if (dynamicModel == nil) {
        dynamicModel = [[DynamicModel alloc] init];
    }
    return dynamicModel;
}
- (instancetype)init
{
    self = [super init];
    if (self) {
        self.rootUrl=@"http://34.87.12.20:20080/%@";
    }
    return self;
}

-(void)userImport:(SuccessBlock)PostSuccess;
{
 
    NSString* key=@"eyJleHRyYV9ibG9nIjoie1widmlwX2x2XCI6MSxcInVzZXJfbGV2ZWxcIjpcIjZcIixcImF1dGhfYW5jaG9yXCI6MCxcImRpc2Nlcm5fdHlwZVwiOlwidHVpMVwifSIsIm5pY2tuYW1lIjoiXHU1NGM4XHU1NGM4bGV2ZWwiLCJoZWFkIjoiaHR0cDpcL1wvb3NzLmlwaWd3ZWIuY29tXC9wdWJsaWNcL2F0dGFjaG1lbnRcLzIwMTkwN1wvMjZcLzE3XC81ZDNhYzYzMDFkYTQ2LnBuZz94LW9zcy1wcm9jZXNzPWltYWdlXC9yZXNpemUsbV9tZml0LGhfMjYwLHdfMjYwIiwidXNlcm5hbWUiOiIyOTg5NDYzMSIsInRpbWUiOjE1ODQ0ODk5MTcsInNpZ24iOiJhMzJmYzkzZWQ0MWVmOWZmNTU4ZmEzMzVlNzhiNjExYiJ9";
 
    NSString *path= [ NSString stringWithFormat:@"http://34.87.12.20:20080/%@?key=%@",PLATFORM_GAME_USER_IMPORT,key];
    NSURL *url = [NSURL URLWithString:path];
    NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL:url];
    NSURLSession *session = [NSURLSession sharedSession];
    NSURLSessionDataTask *dataTask = [session dataTaskWithRequest:request completionHandler:^(NSData * _Nullable data, NSURLResponse * _Nullable response, NSError * _Nullable error) {
        NSDictionary *dic = [NSJSONSerialization JSONObjectWithData:data options:0 error:nil];
        //[0]    (null)    @"info" : 12 key/value pairs
        
        int codenum=  [[dic valueForKey:@"code"]intValue] ;
        if(codenum==0){
            [DynamicModel default].selfUserInfoVo=[[UserInfoVo alloc]init];
            [[DynamicModel default].selfUserInfoVo refrishData:[dic valueForKey:@"info"]];
            PostSuccess(dic);
        }
        
    }];
    
    [dataTask resume];
    

}

-(void)listAll:(SuccessBlock)PostSuccess;
{
    NSMutableDictionary* dic=[[NSMutableDictionary alloc]init];
    [dic setObject:@"0" forKey:@"begin_id"];
    [dic setObject:@"10" forKey:@"count"];
    NSString *URL= [ NSString stringWithFormat:self.rootUrl,PLATFORM_GAME_BLOG_LIST_ALL ];
    [[NetHttpsManager default] POSTWithUrl:URL paramDict:dic OverTime:100 successBlock:^(NSDictionary *responseJson) {
        int codenum=  [[dic valueForKey:@"code"]intValue] ;
        if(codenum==0){
            PostSuccess(responseJson);
        }
    } FailureBlock:^(NSError *error) {
        
    }];
}

-(void)GetDynamicByValue:(NSString*)url paramDict:(NSMutableDictionary*)paramDict   PostSuccess:(SuccessBlock)PostSuccess ;
{
 
    NSString *webURL= [ NSString stringWithFormat:self.rootUrl,url ];
    [[NetHttpsManager default] POSTWithUrl:webURL paramDict:paramDict OverTime:100 successBlock:^(NSDictionary *responseJson) {
        int codenum=  [[responseJson valueForKey:@"code"]intValue] ;
        if(codenum==0){
            PostSuccess(responseJson);
        }else{
            NSLog(@"%@",[responseJson valueForKey:@"msg"]);
        }
    } FailureBlock:^(NSError *error) {
        
    }];
}

-(void)imagePickerController:(UIImagePickerController *)picker didFinishPickingMediaWithInfo:(NSDictionary *)info bfun:(void (^)(NSString* url ))bfun progressfun:(ProgressUpLoad)progressfun ;
{
    CGRect croppingRect = [[info valueForKey:@"UIImagePickerControllerCropRect"] CGRectValue];
    UIImage* image=[info objectForKey:UIImagePickerControllerOriginalImage];
    UIImageOrientation imageOrientation=image.imageOrientation;
    if(imageOrientation!=UIImageOrientationUp)
    {
        UIGraphicsBeginImageContext(image.size);
        [
         image drawInRect:CGRectMake(0, 0, image.size.width,image.size.height)];
        image = UIGraphicsGetImageFromCurrentImageContext();
        UIGraphicsEndImageContext();
    }
    UIImage *originalImage= image;
    UIImage *  croppedImage =    [UIImage imageWithCGImage:CGImageCreateWithImageInRect(originalImage.CGImage,croppingRect)];
    UIImage *image320 = [self resizeImage:croppedImage width:320 height:320];
    [self saveImage:image320 WithName:@"userAvatar" bfun:^(NSString* value) {
  
        bfun(value);
    } progressfun:progressfun];
  
}
//保存图片
-(void)saveImage:(UIImage *)tempImage WithName:(NSString *)imageName bfun:(SuccessUpLoad)bfun progressfun:(ProgressUpLoad)progressfun ;
{
    NSData* imageData = UIImagePNGRepresentation(tempImage);
    NSString* documentPath = [NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES) objectAtIndex:0];
    NSString* totalPath = [documentPath stringByAppendingPathComponent:imageName];
    [imageData writeToFile:totalPath atomically:NO];
    NSString * token =self.selfUserInfoVo.token  ;
    NSString *baseUrl=[NSString stringWithFormat:@"%@/%@", @"http://34.87.12.20:20080",@"upload/image"];
    baseUrl=[NSString stringWithFormat:@"%@?token=%@",baseUrl,token];
    UpImageVo* upImageVo=[[UpImageVo alloc]init];
    [upImageVo saveToServes:baseUrl img:tempImage bfun:bfun progressfun:progressfun];
 
}
 

-(UIImage *)resizeImage:(UIImage *)image width:(int)wdth height:(int)hght{
    int w = image.size.width;
    int h = image.size.height;
    CGImageRef imageRef = [image CGImage];
    int width, height;
    int destWidth = wdth;
    int destHeight = hght;
    if(w > h){
        width = destWidth;
        height = h*destWidth/w;
    }
    else {
        height = destHeight;
        width = w*destHeight/h;
    }
    CGColorSpaceRef colorSpace = CGColorSpaceCreateDeviceRGB();
    CGContextRef bitmap;
    bitmap = CGBitmapContextCreate(NULL, width, height, 8, 4 * width, colorSpace, kCGImageAlphaPremultipliedFirst);
    
    if (image.imageOrientation == UIImageOrientationLeft) {
        
        CGContextRotateCTM (bitmap, M_PI/2);
        CGContextTranslateCTM (bitmap, 0, -height);
        
    } else if (image.imageOrientation == UIImageOrientationRight) {
        
        CGContextRotateCTM (bitmap, -M_PI/2);
        CGContextTranslateCTM (bitmap, -width, 0);
        
    }
    else if (image.imageOrientation == UIImageOrientationUp) {
        
    } else if (image.imageOrientation == UIImageOrientationDown) {
        
        CGContextTranslateCTM (bitmap, width,height);
        CGContextRotateCTM (bitmap, -M_PI);
    }
    
    CGContextDrawImage(bitmap, CGRectMake(0, 0, width, height), imageRef);
    CGImageRef ref = CGBitmapContextCreateImage(bitmap);
    UIImage *result = [UIImage imageWithCGImage:ref];
    CGContextRelease(bitmap);
    CGImageRelease(ref);
    
    return result;
    
}
@end
