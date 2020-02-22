//
//  GroupRes.m
//  iosgl
//
//  Created by zhao on 22/2/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "GroupRes.h"

@implementation GroupRes
-(void)load:(NSString*)url Block:(void (^)(int))block;
{
    NSString *path=  [[NSBundle mainBundle]pathForResource:url ofType:@"txt"];
       NSData *reader = [[NSData alloc] initWithContentsOfFile:path];
       NSLog(@"-----length----%lu",   reader.length);
 
       self.byte=[[ByteArray alloc]init:reader];
       [self loadComplete:self.byte];
    
}
-(void)loadComplete:(ByteArray *)byte;
{
   self.version = [self.byte readInt];
    NSLog(@"version-->%d", self.version);
   [self read]; //img
   [self read]; //obj
   [self read]; //particle
    
    BOOL isGroup = [self.byte readBoolean];
    
    
}
/*
    public loadComplete($byte: ArrayBuffer): void {
             this.dataAry = new Array;
 
             this._byte = new Pan3dByteArray($byte);
             this._byte.position = 0
 
             this.version = this._byte.readInt();
 
             this.read(() => { this.readNext() });//img
 
 
         }
 */
@end
