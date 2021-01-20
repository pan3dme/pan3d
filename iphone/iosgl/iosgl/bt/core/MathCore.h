//
//  MathCore.h
//  iosgl
//
//  Created by zhao on 2/12/2019.
//  Copyright © 2019 zhao. All rights reserved.
//

#define RGB(r,g,b)          [UIColor colorWithRed:(r)/255.f \
                            green:(g)/255.f \
                            blue:(b)/255.f \
                            alpha:1.f]

#define RGBA(r,g,b,a)       [UIColor colorWithRed:(r)/255.f \
                            green:(g)/255.f \
                            blue:(b)/255.f \
                            alpha:(a)]

#define kScreenW                [[UIScreen mainScreen] bounds].size.width
#define kScreenH                [[UIScreen mainScreen] bounds].size.height

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface MathCore : NSObject

+(void)traceTmNow;
@end

NS_ASSUME_NONNULL_END
