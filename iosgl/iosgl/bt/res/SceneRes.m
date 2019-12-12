//
//  SceneRes.m
//  iosgl
//
//  Created by zhao on 12/12/2019.
//  Copyright © 2019 zhao. All rights reserved.
//

#import "SceneRes.h"
#import "ByteArray.h"

@implementation SceneRes
-(void)load:(NSString *)url;
{
    NSString *path=  [[NSBundle mainBundle]pathForResource:url ofType:@"txt"];
    NSData *reader = [[NSData alloc] initWithContentsOfFile:path];
    NSLog(@"-----length----%lu",   reader.length);
    ByteArray *byte=[[ByteArray alloc]init:reader];
    
    [self loadComplete:byte];
    
}
-(void)loadComplete:(ByteArray *)byte;
{
    
    int version = [byte readInt];
    NSLog(@"version-->%d",version);
    int filetype = [byte readInt];
    int imglen = [byte readInt];
    for(int i=0;i<imglen;i++){
        NSString *imgurl =   [byte readUTF];
        NSLog(@"imgurl-->%@",imgurl);
    }
}
@end
