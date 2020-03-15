//
//  ColorHeader.h
//  动态
//
//  Created by zhao on 16/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#ifndef ColorHeader_h
#define ColorHeader_h


#define RGB(r,g,b)          [UIColor colorWithRed:(r)/255.f \
                            green:(g)/255.f \
                            blue:(b)/255.f \
                            alpha:1.f]

#define RGBA(r,g,b,a)       [UIColor colorWithRed:(r)/255.f \
                            green:(g)/255.f \
                            blue:(b)/255.f \
                            alpha:(a)]

#define RGBOF(rgbValue)     [UIColor colorWithRed:((float)((rgbValue & 0xFF0000) >> 16))/255.0 \
                            green:((float)((rgbValue & 0xFF00) >> 8))/255.0 \
                            blue:((float)(rgbValue & 0xFF))/255.0 \
                            alpha:1.0]

#define RGBA_OF(rgbValue)   [UIColor colorWithRed:((float)(((rgbValue) & 0xFF000000) >> 24))/255.0 \
                            green:((float)(((rgbValue) & 0x00FF0000) >> 16))/255.0 \
                            blue:((float)(rgbValue & 0x0000FF00) >> 8)/255.0 \
                            alpha:((float)(rgbValue & 0x000000FF))/255.0]

#define RGBAOF(v, a)        [UIColor colorWithRed:((float)(((v) & 0xFF0000) >> 16))/255.0 \
                            green:((float)(((v) & 0x00FF00) >> 8))/255.0 \
                            blue:((float)(v & 0x0000FF))/255.0 \
                            alpha:a]
#define kColorWithStr(colorStr)      [UIColor colorWithHexString:colorStr]


#endif /* ColorHeader_h */
