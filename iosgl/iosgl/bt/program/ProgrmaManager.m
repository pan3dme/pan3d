//
//  ProgrmaManager.m
//  iosgl
//
//  Created by zhao on 7/12/2019.
//  Copyright © 2019 zhao. All rights reserved.
//

#import "ProgrmaManager.h"
#import "Shader3D.h"
static ProgrmaManager *instance = nil;
@implementation ProgrmaManager
+ (instancetype)default{
    if (instance == nil) {
        instance = [[ProgrmaManager alloc] init];
    }
    return instance;
}
- (instancetype)init
{
    self = [super init];
    if (self) {
        _dic = [[NSMutableDictionary alloc] init];
  
    }
    return self;
}
-(Shader3D*) getProgram:(NSString*)value ;
{
    if([_dic objectForKey:value]){
          return  _dic[value];
    }else{
        
        return  nil;
    }
  
}
-(void)registe:(NSString*)keystr shader3d:(Shader3D*)shader3d;{
    if([_dic objectForKey:keystr]){
    
    }else{
       [_dic setValue:shader3d forKey:keystr];
      [shader3d encodeVstr:nil encodeFstr:nil];
    }
}
@end
