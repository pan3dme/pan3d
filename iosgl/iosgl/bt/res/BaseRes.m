//
//  BaseRes.m
//  iosgl
//
//  Created by zhao on 12/12/2019.
//  Copyright © 2019 zhao. All rights reserved.
//

#import "BaseRes.h"
#import <UIKit/UIKit.h>
 
 #import "NSData+GZIP.h"
 #import <zlib.h>
 

@implementation BaseRes

typedef void (^PostSuccess)(NSDictionary *responseJson);

-(void)dddd  : (PostSuccess )PostSuccess{
    
}
-(void)read ;
{
    
    int filetype = [self.byte readInt];
       NSLog(@"位置-->%d",self.byte.position);
    switch (filetype) {
        case 1:
            [self readImgs];
            break;
            case 6:
                      [self readZipObj];
                      break;
        default:
            NSLog(@"需要补充");
            
            break;
    }
   
    
}
-(void)readZipObj;
{
    int zipLen = [self.byte readInt];
    NSData *abb=  [self.byte getNsDataByLen:zipLen];
    NSLog(@"len-%d-aaaaaaaaaaa>%ld",zipLen,abb.length);
    NSData *outputData = [abb gunzippedData];
    NSLog(@"len-%d-outputData>%ld",zipLen,outputData.length);
    NSLog(@"----------" );
}
-(void)readImgs;
{
    int imglen = [self.byte readInt];
       for(int i=0;i<imglen;i++){
           NSString *imgurl =   [self.byte readUTF];
                      NSLog(@"imgurl-->%@",imgurl);
           int imgSize=  [self.byte readInt];
       
           
           
   NSLog(@"len-->%d",imgSize);
       }
}
@end
