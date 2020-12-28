//
//  TextureLoad.m
//  iosgl
//
//  Created by zhao on 15/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "TextureLoad.h"

@implementation TextureLoad


- (instancetype)init:(void (^)(NSObject* any))fun info:(NSObject*)info url:(NSString*)url wrap:(int)wrap filter:(int)filter mipmap:(int)mipmap;
{
    self = [super init];
    if (self) {
         
        self.fun = fun;
            self.info = info;
            self.url = url;
            self.wrap = wrap;
            self.filter = filter;
            self.mipmap = mipmap;
        
        
    }
    return self;
}

//constructor($fun: Function, $info: any, $url: string, $wrap: number, $filter: number, $mipmap: number) {
@end
