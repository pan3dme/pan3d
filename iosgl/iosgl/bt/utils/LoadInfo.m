//
//  LoadInfo.m
//  iosgl
//
//  Created by zhao on 9/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "LoadInfo.h"
#import "GL_Header.h"
@interface LoadInfo ()


@property (nonatomic, assign) NSDictionary*  info;

@end
@implementation LoadInfo
//$url, $type, $fun, $info, $progressFun);

- (instancetype)initUrl:(NSString*)url type:(int)type fun:(SuccessBlock)fun info:(NSDictionary*)info progressFun:(ProceeseBlock)progressFun;
{
    self = [super init];
      if (self) {
          self.url=url;
          self.type=type;
          self.info=info;
          self.progressFun=progressFun;
         
      }
      return self;
}
 

//-(void)load:(NSString*)url type:(int)type fun:(FinishBlock)fun info:(NSDictionary*)info progressFun:(void (^)(int))progressFun;
@end
