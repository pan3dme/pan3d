//
//  UpImageVo.h
//  动态
//
//  Created by zhao on 19/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "Header.h"

NS_ASSUME_NONNULL_BEGIN
typedef void (^SuccessUpLoad)(NSString *url);
typedef void (^ProgressUpLoad)(float num);
 

@interface UpImageVo : NSObject
-(void)saveToServes:(NSString*)severUrl  img:(UIImage*)image bfun:(SuccessUpLoad)bfun  progressfun:(ProgressUpLoad)progressfun ;
@end

NS_ASSUME_NONNULL_END
