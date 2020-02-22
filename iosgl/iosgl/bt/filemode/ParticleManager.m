//
//  ParticleManager.m
//  iosgl
//
//  Created by zhao on 23/2/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "ParticleManager.h"
static ParticleManager *instance = nil;
@implementation ParticleManager
+ (instancetype)default{
    if (instance == nil) {
        instance = [[ParticleManager alloc] init];
    }
    return instance;
}
- (instancetype)init
{
    self = [super init];
    if (self) {
        self.dic=[[NSMutableDictionary alloc]init];
    }
    return self;
}
-(void)addResByte:(NSString*)url byteArray:(ByteArray*)byteArray;
{
    
}
@end
