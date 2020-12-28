//
//  RenderObject.h
//  MetalDemo
//
//  Created by 徐鹏飞 on 2020/8/20.
//  Copyright © 2020 徐鹏飞. All rights reserved.
//
/*
 分开你的渲染循环:
    在我们开发Metal 程序时,将渲染循环分为自己创建的类,是非常有用的一种方式,使用单独的类,我们可以更好管理初始化Metal,以及Metal视图委托.
 
 在MTKViewDelegate 协议中有2个方法.
 - (void)mtkView:(nonnull MTKView *)view drawableSizeWillChange:(CGSize)size;
 
    1.每当窗口大小变化或者重新布局(设备方向更改)时,视图就会调用此方法.
    2.视图可以根据视图属性上设置View.preferredFramesPerSecond帧速率(指定时间来调用drawInMTKView方法),
 
- (void)drawInMTKView:(nonnull MTKView *)view;
    以上的方法,每当视图需要渲染时调用
 */

#import <Foundation/Foundation.h>
@import MetalKit;

NS_ASSUME_NONNULL_BEGIN
//这是一个独立于平台的渲染类
//MTKViewDelegate协议:允许对象呈现在视图中并响应调整大小事件

@interface RenderObject : NSObject<MTKViewDelegate>

-(id)initWithMetalKitView:(MTKView *)mtkView;

@end

NS_ASSUME_NONNULL_END
