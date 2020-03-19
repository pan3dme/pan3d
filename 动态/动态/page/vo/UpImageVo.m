//
//  UpImageVo.m
//  动态
//
//  Created by zhao on 19/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "UpImageVo.h"
#import "Header.h"
#import "NSObject+MJKeyValue.h"
#import "NSObject+MJProperty.h"
#import "NSString+MJExtension.h"
#import "NetHttpsManager.h"
#import "UserInfoVo.h"


@interface UpImageVo()
@property (nonatomic,strong) SuccessUpLoad successUpLoad;
@property (nonatomic,strong) ProgressUpLoad progressUpLoad;
@end

@implementation UpImageVo
 
-(void)saveToServes:(NSString*)severUrl  img:(UIImage*)image bfun:(SuccessUpLoad)bfun  progressfun:(ProgressUpLoad)progressfun ;
{
  
    self.successUpLoad=bfun;
    self.progressUpLoad=progressfun;

    //分界线的标识符
    NSString *TWITTERFON_FORM_BOUNDARY = @"AaB03x";
    NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL:[NSURL URLWithString:severUrl]];
    NSString *MPboundary=[[NSString alloc]initWithFormat:@"--%@",TWITTERFON_FORM_BOUNDARY];
    NSString *endMPboundary=[[NSString alloc]initWithFormat:@"%@--",MPboundary];
    NSData* data = UIImagePNGRepresentation(image);
    NSMutableString *body=[[NSMutableString alloc]init];
    [body appendFormat:@"%@\r\n",MPboundary];
    [body appendFormat:@"Content-Disposition: form-data; name=\"pic\"; filename=\"boris.png\"\r\n"];
    [body appendFormat:@"Content-Type: image/png\r\n\r\n"];
    NSString *end=[[NSString alloc]initWithFormat:@"\r\n%@",endMPboundary];
    NSMutableData *myRequestData=[NSMutableData data];
    [myRequestData appendData:[body dataUsingEncoding:NSUTF8StringEncoding]];
    [myRequestData appendData:data];
    [myRequestData appendData:[end dataUsingEncoding:NSUTF8StringEncoding]];
    NSString *content=[[NSString alloc]initWithFormat:@"multipart/form-data; boundary=%@",TWITTERFON_FORM_BOUNDARY];
    [request setValue:content forHTTPHeaderField:@"Content-Type"];
    [request setValue:[NSString stringWithFormat:@"%lu", [myRequestData length]] forHTTPHeaderField:@"Content-Length"];
    [request setHTTPBody:myRequestData];
    [request setHTTPMethod:@"POST"];
    
   [NSURLConnection connectionWithRequest:request delegate:self];
    
 
    
}
- (void)connection:(NSURLConnection *)connection didFailWithError:(NSError *)error
{
    NSLog(@"请求失败:%@",error);
}
 
- (void)connection:(NSURLConnection *)connection didReceiveResponse:(NSURLResponse *)response
{
    
}
 
- (void)connection:(NSURLConnection *)connection didReceiveData:(NSData *)data
{
    
    NSDictionary *responseJson = [NSJSONSerialization JSONObjectWithData:data options:NSJSONReadingMutableContainers error:nil];
      NSNumber* code = [responseJson objectForKey:@"code"]  ;
      int codenum = [code intValue];
      if(codenum==0){
          NSDictionary* filedic = [responseJson objectForKey:@"file"]  ;
           self.successUpLoad([filedic objectForKey:@"path"] );
      }else{
          NSLog(@"判断没有进入正确的地方---%@", responseJson);
      }
}
- (void)connectionDidFinishLoading:(NSURLConnection *)connection
{
    NSLog(@"上传完毕！");
}
 - (void)connection:(NSURLConnection *)connection didSendBodyData:(NSInteger)bytesWritten totalBytesWritten:(NSInteger)totalBytesWritten totalBytesExpectedToWrite:(NSInteger)totalBytesExpectedToWrite
 {
  // NSLog(@"%ld----%ld----%ld",bytesWritten,totalBytesWritten,totalBytesExpectedToWrite);
     self.progressUpLoad((float)totalBytesWritten   /(float)totalBytesExpectedToWrite);
 
 }
 
@end
