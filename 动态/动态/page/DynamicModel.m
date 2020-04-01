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


-(void)GetDynamicSelfBlog:(NSString*)url paramDict:(NSMutableDictionary*)paramDict   PostSuccess:(SuccessBlock)PostSuccess ;
{
    
    NSMutableString*    params = [[NSMutableString alloc] init];
    for(id key in paramDict)
    {
        NSString *encodedkey = [key stringByAddingPercentEscapesUsingEncoding:NSUTF8StringEncoding];
        CFStringRef value = (__bridge CFStringRef)[[paramDict objectForKey:key] copy];
        CFStringRef encodedValue = CFURLCreateStringByAddingPercentEscapes(kCFAllocatorDefault, value,NULL,(CFStringRef)@";/?:@&=+$", kCFStringEncodingUTF8);
        [params appendFormat:@"%@=%@&", encodedkey, encodedValue];
        CFRelease(value);
        CFRelease(encodedValue);
    }
    
    NSString *webURL= [ NSString stringWithFormat:@"%@%@?%@",@"http://34.87.12.20:20080",url,params ];
    NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL:[NSURL URLWithString:webURL]];
    NSURLSession *session = [NSURLSession sharedSession];
    NSURLSessionDataTask *dataTask = [session dataTaskWithRequest:request completionHandler:^(NSData * _Nullable data, NSURLResponse * _Nullable response, NSError * _Nullable error) {
        NSDictionary *responseDic = [NSJSONSerialization JSONObjectWithData:data options:0 error:nil];
        int codenum=  [[responseDic valueForKey:@"code"]intValue] ;
        if(codenum==0){
            PostSuccess(responseDic);
            NSLog(@"成功--%@",webURL);
        }else{
            NSLog(@"失败--%@",webURL);
        }
        
    }];
    [dataTask resume];
    
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
-(void)basePostToUrl:(NSString*)url paramDict:(NSMutableDictionary*)paramDict   PostSuccess:(SuccessBlock)PostSuccess ;
{
    
    NSMutableString*    params = [[NSMutableString alloc] init];
    for(id key in paramDict)
    {
        NSString *encodedkey = [key stringByAddingPercentEscapesUsingEncoding:NSUTF8StringEncoding];
        CFStringRef value = (__bridge CFStringRef)[[paramDict objectForKey:key] copy];
        CFStringRef encodedValue = CFURLCreateStringByAddingPercentEscapes(kCFAllocatorDefault, value,NULL,(CFStringRef)@";/?:@&=+$", kCFStringEncodingUTF8);
        [params appendFormat:@"%@=%@&", encodedkey, encodedValue];
        CFRelease(value);
        CFRelease(encodedValue);
    }
    
    NSString *webURL= [ NSString stringWithFormat:@"%@%@?%@",@"http://34.87.12.20:20080",url,params ];
    NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL:[NSURL URLWithString:webURL]];
    NSURLSession *session = [NSURLSession sharedSession];
    NSURLSessionDataTask *dataTask = [session dataTaskWithRequest:request completionHandler:^(NSData * _Nullable data, NSURLResponse * _Nullable response, NSError * _Nullable error) {
        NSDictionary *responseDic = [NSJSONSerialization JSONObjectWithData:data options:0 error:nil];
        int codenum=  [[responseDic valueForKey:@"code"]intValue] ;
        if(codenum==0){
    
            NSLog(@"成功--%@",webURL);
            dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (ino64_t)(0.1 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
                                 PostSuccess(responseDic);
                         });
        }else{
            NSLog(@"失败--%@",webURL);
        }
        
    }];
    [dataTask resume];
}

-(void)imagePickerController:(UIImagePickerController *)picker didFinishPickingMediaWithInfo:(NSDictionary *)info bfun:(void (^)(NSString* url ))bfun progressfun:(ProgressUpLoad)progressfun ;
{
    NSString* mediaType = [info objectForKey:UIImagePickerControllerMediaType];
    NSData* fileNsData;
    NSString* typestr;
    if([mediaType isEqualToString:@"public.movie"]) { //视频。
         fileNsData = [NSData dataWithContentsOfURL: [info objectForKey:UIImagePickerControllerMediaURL]];
         typestr=@"mov";
        
    }else{//图片
        
        UIImage* sizeImg=   [self resizeImage:[info objectForKey:UIImagePickerControllerOriginalImage] width:400 height:600];
        fileNsData=UIImagePNGRepresentation(sizeImg);
        typestr=@"png";
    }
    
    [self saveNSDateToSever:fileNsData typestr:typestr bfun:^(NSString* value) {
              bfun(value);
          } progressfun:progressfun];
    
    
}
//保存图片
-(void)saveNSDateToSever:(NSDate*)nsdate typestr:(NSString *)typestr bfun:(SuccessUpLoad)bfun progressfun:(ProgressUpLoad)progressfun ;
{
    NSString * token =self.selfUserInfoVo.token  ;
    NSString *baseUrl=[NSString stringWithFormat:@"%@/%@", @"http://34.87.12.20:20080",@"upload/image"];
    baseUrl=[NSString stringWithFormat:@"%@?token=%@",baseUrl,token];
    UpImageVo* upImageVo=[[UpImageVo alloc]init];
    [upImageVo saveFileToSever:baseUrl fileNsData:nsdate typestr:typestr bfun:bfun progressfun:progressfun];
}
/*
 活动记录KEY  0还没数据 1 标记红星 2标记取消了红星
 */
-(int)heartByKey:(NSString*)key ;
{
    NSUserDefaults *defaults = [NSUserDefaults standardUserDefaults];
    NSDictionary* heartDic=   [defaults objectForKey:@"heartpoint1"];
    return   [[heartDic objectForKey:key] intValue];
}
-(void)setHdeartByKey:(NSString*)key num:(NSNumber*)num ;
{
    NSUserDefaults *defaults = [NSUserDefaults standardUserDefaults];
    NSDictionary* heartDic=  [defaults objectForKey:@"heartpoint1"];
    NSMutableDictionary *newdic;
    if(heartDic){
       newdic = [NSMutableDictionary dictionaryWithDictionary:heartDic];
    }else{
       newdic=[[NSMutableDictionary alloc]init];
    }
    [newdic setObject:num forKey:key];
    [defaults setObject:newdic forKey:@"heartpoint1"];
 
}


-(BOOL)isfollowByUserName:(NSString*)userName ;
{
    NSUserDefaults *defaults = [NSUserDefaults standardUserDefaults];
    NSDictionary* heartDic=   [defaults objectForKey:@"fllowDic"];
    return   [[heartDic objectForKey:userName]boolValue];
}
-(void)addFollowByUserId:(NSString*)userName data:(BOOL)data ;
{
     
    NSUserDefaults *defaults = [NSUserDefaults standardUserDefaults];
    NSDictionary* fllowDic=  [defaults objectForKey:@"fllowDic"];
    NSMutableDictionary *newdic;
    if(fllowDic){
       newdic = [NSMutableDictionary dictionaryWithDictionary:fllowDic];
    }else{
       newdic=[[NSMutableDictionary alloc]init];
    }
    [newdic setObject:data?@1:@0 forKey:userName];
    [defaults setObject:newdic forKey:@"fllowDic"];
  
    
    NSMutableDictionary* dic=[[NSMutableDictionary alloc]init];
    NSMutableArray *followItem=[[NSMutableArray alloc]init];
    [followItem addObject:userName];
    [dic setObject:followItem  forKey:@"following"];
    [[ DynamicModel default] GetDynamicByValue:PLATFORM_USER_FOLLOWS paramDict:dic  PostSuccess:^(NSDictionary *responseJson) {
        NSLog(@"更新关注");
    }];
}
 
-(NSString*)getTimeStr:(double)time;
{
     
     
    NSString* str = @"";
    //获取本地时间戳
    double locaTime = (double)[[NSDate date]timeIntervalSince1970];
    
    double countTime = locaTime - time;
    double min = 60;
    double h = min * 60;
    double day = h * 24;
    double mon = day * 30;
    double year = 365 * day;
 
    if (countTime > year) {
        str = [NSString stringWithFormat:@"%d年前",(int)floor(countTime/year) ];
        return str;
    }
    else if (countTime > mon) {
        str = [NSString stringWithFormat:@"%d月前",  (int) floor(countTime / mon)];
        return str;
    }
    else if (countTime > day) {
         str = [NSString stringWithFormat:@"%d天前",  (int) floor(countTime / day)];
        return str;
    }
    else if (countTime > h) {
         str = [NSString stringWithFormat:@"%d小时前",  (int) floor(countTime / h)];
        return str;
    } else if (countTime > min) {
          str = [NSString stringWithFormat:@"%d分钟前",  (int) floor(countTime / min)];
        return str;
    } else {
        str = @"刚刚";
        return str;
    }
     
    return @"";
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

