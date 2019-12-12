//
//  SceneRes.m
//  iosgl
//
//  Created by zhao on 12/12/2019.
//  Copyright © 2019 zhao. All rights reserved.
//

#import "SceneRes.h"
#import "ByteArray.h"

@interface SceneRes ()

 

 
@end
@implementation SceneRes
-(void)load:(NSString *)url;
{
    NSString *path=  [[NSBundle mainBundle]pathForResource:url ofType:@"txt"];
    NSData *reader = [[NSData alloc] initWithContentsOfFile:path];
    NSLog(@"-----length----%lu",   reader.length);
    self.byte=[[ByteArray alloc]init:reader];
    
    [self loadComplete:self.byte];
    
}
-(void)loadComplete:(ByteArray *)byte;
{
    [self applyByteArray];
    
}
-(void)applyByteArray;
{
  self.version = [self.byte readInt];
    NSLog(@"version-->%d", self.version);
    [self read];
    
}

@end
