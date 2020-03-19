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

-(void)GetDynamicByValue:(NSString*)url beginId:(NSString*)beginId count:(NSString*)count PostSuccess:(SuccessBlock)PostSuccess ;
{
    NSMutableDictionary* dic=[[NSMutableDictionary alloc]init];
//    [dic setObject:@"0" forKey:@"begin_id"];
//    [dic setObject:@"10" forKey:@"count"];
    [dic setObject:beginId forKey:@"begin_id"];
    [dic setObject:count forKey:@"count"];
    NSString *webURL= [ NSString stringWithFormat:self.rootUrl,url ];
    [[NetHttpsManager default] POSTWithUrl:webURL paramDict:dic OverTime:100 successBlock:^(NSDictionary *responseJson) {
        int codenum=  [[dic valueForKey:@"code"]intValue] ;
        if(codenum==0){
            PostSuccess(responseJson);
        }
    } FailureBlock:^(NSError *error) {
        
    }];
}

-(void)imagePickerController:(UIImagePickerController *)picker didFinishPickingMediaWithInfo:(NSDictionary *)info bfun:(void (^)(NSString* url ))bfun;
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
    }];
  
}
//保存图片
-(void)saveImage:(UIImage *)tempImage WithName:(NSString *)imageName bfun:(void (^)(NSString* url ))bfun;
{
    NSData* imageData = UIImagePNGRepresentation(tempImage);
    NSString* documentPath = [NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES) objectAtIndex:0];
    NSString* totalPath = [documentPath stringByAppendingPathComponent:imageName];
    [imageData writeToFile:totalPath atomically:NO];
    NSUserDefaults *userDefaults = [NSUserDefaults standardUserDefaults];
    [userDefaults setObject:totalPath forKey:@"avatar"];
    [self saveToServes :tempImage bfun:bfun];
}
// NSString *baseUrl=[NSString stringWithFormat:@"%@%@", self.rootUrl,@"/upload/image"];
-(void)saveToServes:(UIImage*)tempImage bfun:(void (^)(NSString* url ))bfun;
{
    
   
    //分界线的标识符
    NSString *TWITTERFON_FORM_BOUNDARY = @"AaB03x";
    
   NSString *baseUrl=[NSString stringWithFormat:@"%@/%@", @"http://34.87.12.20:20080",@"upload/image"];
    
    NSString * token =self.selfUserInfoVo.token  ;
    
    baseUrl=[NSString stringWithFormat:@"%@?token=%@",baseUrl,token];
    NSURL *url = [NSURL URLWithString:baseUrl];
    
    //(1)构造Request
    NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL:url];
    
    //分界线 --AaB03x
    NSString *MPboundary=[[NSString alloc]initWithFormat:@"--%@",TWITTERFON_FORM_BOUNDARY];
    //结束符 AaB03x--
    NSString *endMPboundary=[[NSString alloc]initWithFormat:@"%@--",MPboundary];
    //要上传的图片
    UIImage *image= tempImage;
    //得到图片的data
    NSData* data = UIImagePNGRepresentation(image);
    //http body的字符串
    NSMutableString *body=[[NSMutableString alloc]init];
    //参数的集合的所有key的集合
    
    
    ////添加分界线，换行
    [body appendFormat:@"%@\r\n",MPboundary];
    //声明pic字段，文件名为boris.png
    [body appendFormat:@"Content-Disposition: form-data; name=\"pic\"; filename=\"boris.png\"\r\n"];
    //声明上传文件的格式
    [body appendFormat:@"Content-Type: image/png\r\n\r\n"];
    
    //声明结束符：--AaB03x--
    NSString *end=[[NSString alloc]initWithFormat:@"\r\n%@",endMPboundary];
    //声明myRequestData，用来放入http body
    NSMutableData *myRequestData=[NSMutableData data];
    //将body字符串转化为UTF8格式的二进制
    [myRequestData appendData:[body dataUsingEncoding:NSUTF8StringEncoding]];
    //将image的data加入
    [myRequestData appendData:data];
    //加入结束符--AaB03x--
    [myRequestData appendData:[end dataUsingEncoding:NSUTF8StringEncoding]];
    
    //设置HTTPHeader中Content-Type的值
    NSString *content=[[NSString alloc]initWithFormat:@"multipart/form-data; boundary=%@",TWITTERFON_FORM_BOUNDARY];
    //设置HTTPHeader
    [request setValue:content forHTTPHeaderField:@"Content-Type"];
    //设置Content-Length
    [request setValue:[NSString stringWithFormat:@"%d", [myRequestData length]] forHTTPHeaderField:@"Content-Length"];
    //设置http body
    [request setHTTPBody:myRequestData];
    //http method
    [request setHTTPMethod:@"POST"];
    //建立连接，设置代理
    [NSURLConnection sendAsynchronousRequest:request queue:[NSOperationQueue mainQueue] completionHandler:^(NSURLResponse *response, NSData *data, NSError *connectionError) {
        if (connectionError) {
          //  [FanweMessage alertHUD:  @"上传失败"];
               NSLog(@"上传失败");
        }else{
            NSDictionary *responseJson = [NSJSONSerialization JSONObjectWithData:data options:NSJSONReadingMutableContainers error:nil];
            NSNumber* code = [responseJson objectForKey:@"code"]  ;
            /*
             [0]    (null)    @"file" : 5 key/value pairs
             key    NSTaggedPointerString *    @"file"    0xc156eb099f0164bd
             value    __NSDictionaryM *    5 key/value pairs    0x0000000280d305a0
             [0]    (null)    @"path" : @"/static/upload/img/e76e4ea7dbdbfab5a75c9d4c3bee2110.png"
             [1]    (null)    @"extname" : @"png"
             [2]    (null)    @"filename" : @"e76e4ea7dbdbfab5a75c9d4c3bee2110.png"
             [3]    (null)    @"success" : YES
             [4]    (null)    @"origin_filename" : @"boris.png"
             */
            int codenum = [code intValue];
            if(codenum==0){
                NSDictionary* filedic = [responseJson objectForKey:@"file"]  ;
                NSString  *avatarpath = [filedic objectForKey:@"path"]  ;
                // [self changeHeadImgByPath:avatarpath];
            
                bfun(avatarpath);
                
            }else{
                NSLog(@"判断没有进入正确的地方---%@", responseJson);
              //  [FanweMessage alertHUD:  [responseJson objectForKey:@"msg"]];
            }
            NSLog(@"上传成功");
        }
    }];
    
    
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
