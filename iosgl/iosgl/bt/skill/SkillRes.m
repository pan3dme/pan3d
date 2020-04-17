//
//  SkillRes.m
//  iosgl
//
//  Created by zhao on 17/4/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "SkillRes.h"
#import "ByteArray.h"
#import "LoadManager.h"
@interface SkillRes()


@property(nonatomic,strong)SuccessBlock fun;
 


@end
@implementation SkillRes
-(void)load:(NSString*)url  fun:(SuccessBlock)fun;
{
    self.fun=fun;
    [[LoadManager default] loadUrl: url type:LoadManager.BYTE_TYPE fun:^(NSString* value) {
        NSDictionary* dic=(NSDictionary*)value;
        NSData* netNsData = [[NSData alloc] initWithContentsOfFile:dic[@"data"]];
       
        [self loadComplete:[[ByteArray alloc]init:netNsData]];
    }];
 
}
-(void)loadComplete:(ByteArray*)byte;
{
    self.byte=byte;
    self.version= [self.byte readInt];
    self.skillUrl = [self.byte readUTF];
    
    [self read:^(NSString* code) {
        [self readNext];
    }];
}
-(void)readNext;
{
    [self read]; //readmaterial
    [self read]; //readparticle;
 
}
-(void)readData:(ByteArray*)byte;
{
    int len= [self.byte readInt];
    
        NSLog(@"----");
}
@end

