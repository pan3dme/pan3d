//
//  Header.h
//  DynamicPoject
//
//  Created by zhao on 15/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#ifndef Header_h
#define Header_h



#define kScreenFrame            [UIScreen mainScreen].bounds
#define kScreenBounds           [UIScreen mainScreen].bounds
#define kScreenSize             [UIScreen mainScreen].bounds.size
#define kScreenScale            [UIScreen mainScreen].scale
#define kScreenW                [[UIScreen mainScreen] bounds].size.width
#define kScreenH                [[UIScreen mainScreen] bounds].size.height
#define kScaleW                 (kScreenW)*(kScreenScale)
#define kScaleH                 (kScreenH)*(kScreenScale)

#define kScaleWidth             [[UIScreen mainScreen] bounds].size.width/375.00
#define kScaleHeight            [[UIScreen mainScreen] bounds].size.height/667.00




// 获取主线程
#define dispatch_main_sync_safe_yt(block)\
if ([NSThread isMainThread]) {\
block();\
} else {\
dispatch_sync(dispatch_get_main_queue(), block);\
}

#define dispatch_main_async_safe_yt(block)\
if ([NSThread isMainThread]) {\
block();\
} else {\
dispatch_async(dispatch_get_main_queue(), block);\
}

 



#define isIPad()                (UI_USER_INTERFACE_IDIOM() == UIUserInterfaceIdiomPad)
#define isIPhone()              (!isIPad())

#define isIPhoneX()             (([[UIScreen mainScreen] bounds].size.height-812) ? NO : YES)

#define isIPhone5()             ([UIScreen instancesRespondToSelector:@selector(currentMode)] ? CGSizeEqualToSize(CGSizeMake(640, 1136), [[UIScreen mainScreen] currentMode].size) : NO)

#define isIPhone4()             ([UIScreen instancesRespondToSelector:@selector(currentMode)] ? CGSizeEqualToSize(CGSizeMake(640, 960), [[UIScreen mainScreen] currentMode].size) : NO)


#define iPhone4s ([UIScreen instancesRespondToSelector:@selector(currentMode)] ? CGSizeEqualToSize(CGSizeMake(640, 960), [[UIScreen mainScreen] currentMode].size) : NO)

#define iPhone5 ([UIScreen instancesRespondToSelector:@selector(currentMode)] ? CGSizeEqualToSize(CGSizeMake(640, 1136), [[UIScreen mainScreen] currentMode].size) : NO)

#define iPhone6 ([UIScreen instancesRespondToSelector:@selector(currentMode)] ? CGSizeEqualToSize(CGSizeMake(750, 1334), [[UIScreen mainScreen] currentMode].size) : NO)

#define iPhone6_Plus ([UIScreen instancesRespondToSelector:@selector(currentMode)] ? CGSizeEqualToSize(CGSizeMake(1242, 2208), [[UIScreen mainScreen] currentMode].size) : NO)


#define iPhone8 ([UIScreen instancesRespondToSelector:@selector(currentMode)] ? CGSizeEqualToSize(CGSizeMake(750, 1334), [[UIScreen mainScreen] currentMode].size) : NO)
 

#define iPhoneX ([UIScreen instancesRespondToSelector:@selector(currentMode)] ? CGSizeEqualToSize(CGSizeMake(1125, 2436), [[UIScreen mainScreen] currentMode].size) : NO)

#define iPhoneX_R ([UIScreen instancesRespondToSelector:@selector(currentMode)] ? CGSizeEqualToSize(CGSizeMake(828, 1792), [[UIScreen mainScreen] currentMode].size)  : NO)

#define iPhoneX_Max ([UIScreen instancesRespondToSelector:@selector(currentMode)] ? CGSizeEqualToSize(CGSizeMake(1242, 2688), [[UIScreen mainScreen] currentMode].size) : NO)

#define kIsiPhoneX_series (iPhoneX==YES || iPhoneX_R ==YES || iPhoneX_Max==YES)

#define SCREEN_HEIGHTL [UIScreen mainScreen].bounds.size.height
#define SCREEN_WIDTHL [UIScreen mainScreen].bounds.size.width
#define IS_IPhoneX_All ((int)((SCREEN_HEIGHTL/SCREEN_WIDTHL)*100) == 216 && iPhoneX==NO)?YES:NO


#define kDefaultNavBarHeight (kIsiPhoneX_series ? 88.0 : 64.0)
#define kDefaultTabBarHeight (kIsiPhoneX_series ? 83.0 : 49.0)
#define kDefaultStatusBarHeight (kIsiPhoneX_series ? 44.0 : 20.0)

#define isIOS11Above()               ([[UIDevice currentDevice].systemVersion doubleValue]>= 11.0)

#define isIOS11()               ([[UIDevice currentDevice].systemVersion doubleValue]>= 11.0 && [[UIDevice currentDevice].systemVersion doubleValue] < 12.0)

#define isIOS10()               ([[UIDevice currentDevice].systemVersion doubleValue]>= 10.0 && [[UIDevice currentDevice].systemVersion doubleValue] < 11.0)

#define isIOS9()                ([[UIDevice currentDevice].systemVersion doubleValue]>= 9.0 && [[UIDevice currentDevice].systemVersion doubleValue] < 10.0)

#define isIOS8()                ([[UIDevice currentDevice].systemVersion doubleValue]>= 8.0 && [[UIDevice currentDevice].systemVersion doubleValue] < 9.0)

#define isIOS7()                ([[UIDevice currentDevice].systemVersion doubleValue]>= 7.0 && [[UIDevice currentDevice].systemVersion doubleValue] < 8.0)

#define isIOS6()                ([[UIDevice currentDevice].systemVersion doubleValue]>= 6.0 && [[UIDevice currentDevice].systemVersion doubleValue] < 7.0)




#endif /* Header_h */
