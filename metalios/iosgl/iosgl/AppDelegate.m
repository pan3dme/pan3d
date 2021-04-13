//
//  AppDelegate.m
//  iosgl
//
//  Created by zhao on 2/12/2019.
//  Copyright © 2019 zhao. All rights reserved.
//
#import <UIKit/UIKit.h>
#import "AppDelegate.h"
#import <Foundation/Foundation.h>
#import "ViewController.h"
#import "DynamicHeader.h"
 
#import <AVOSCloud/AVOSCloud.h>
 

#define APP_ID @"tQdDwaHgg6hNEuYG4WhFlLQ0-gzGzoHsz"
#define APP_KEY @"Kc3v7hICoaQcO80skdhOXCrl"
#define APP_SERVER_URL @"https://tqddwahg.lc-cn-n1-shared.com"
 
 
//appId: "tQdDwaHgg6hNEuYG4WhFlLQ0-gzGzoHsz",
//      appKey: "Kc3v7hICoaQcO80skdhOXCrl",
//      serverURL: "https://tqddwahg.lc-cn-n1-shared.com"
@interface AppDelegate ()

@end

@implementation AppDelegate
+ (instancetype)sharedAppDelegate
{
    __block AppDelegate *delegate;
    dispatch_main_sync_safe_yt((^{
        delegate = (AppDelegate *)[UIApplication sharedApplication].delegate;
    }));
    return delegate;
}
#pragma mark 初始化顶部渐变色块的底色
-(void)setHeadTitleView{
 /*
   
    if(![AppDelegate sharedAppDelegate].statusBarLayer){
        [AppDelegate sharedAppDelegate].statusBarLayer = [CAGradientLayer layer];
        [AppDelegate sharedAppDelegate].statusBarLayer.startPoint = CGPointMake(0, 1);//（0，0）表示从左上角开始变化。默认值是(0.5,0.0)表示从x轴为中间，y为顶端的开始变化
        [AppDelegate sharedAppDelegate].statusBarLayer.endPoint = CGPointMake(1, 1);//（1，1）表示到右下角变化结束。默认值是(0.5,1.0)  表示从x轴为中间，y为低端的结束变化
        [[AppDelegate sharedAppDelegate].statusBarLayer setColors:@[(id)[RGB(255, 65, 98) CGColor],(id)[RGB(254,116,35) CGColor]]];//渐变数组
        
        int height = 0;
        int y = 0;
    
        if (@available(iOS 13.0, *)) {
            if(iPhone6_Plus||iPhone8){
                height = 65;
            }else{
                height = 90;
            }
        }else{
            if(iPhone6_Plus||iPhone8){
                y = -20;
                height = 65;
            }else{
                y = -45;
                height = 90;
            }
        }
      
     
        [AppDelegate sharedAppDelegate].statusBarLayer.frame = CGRectMake(0, y, kScreenW, height);
    }
    
    
    
    if (@available(iOS 13.0, *)) {
        [self.navigationViewController.navigationBar.subviews enumerateObjectsUsingBlock:^(__kindof UIView * _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
            
            if ([obj isKindOfClass:NSClassFromString(@"_UIBarBackground")]||[obj isKindOfClass:NSClassFromString(@"_UINavigationBarBackground")]) {
                [obj.layer insertSublayer:[AppDelegate sharedAppDelegate].statusBarLayer atIndex:2];
                obj.backgroundColor = kClearColor;
            }
        }];
    }else{
        [self.navigationViewController.navigationBar.layer insertSublayer:[AppDelegate sharedAppDelegate].statusBarLayer atIndex:1];
    }
    [self.navigationViewController.navigationBar setTintColor:kWhiteColor];
    [self.navigationViewController.navigationBar setTitleTextAttributes:@{NSFontAttributeName:[UIFont systemFontOfSize:20],NSForegroundColorAttributeName:[UIColor whiteColor]}];
    
    */
}
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    
    //初始化 SDK
 
    [AVOSCloud setApplicationId:APP_ID clientKey:APP_KEY serverURLString:APP_SERVER_URL];
    //开启调试日志
    [AVOSCloud setAllLogsEnabled:YES];

        return YES;
 
}


#pragma mark - UISceneSession lifecycle


- (UISceneConfiguration *)application:(UIApplication *)application configurationForConnectingSceneSession:(UISceneSession *)connectingSceneSession options:(UISceneConnectionOptions *)options {
    // Called when a new scene session is being created.
    // Use this method to select a configuration to create the new scene with.
    return [[UISceneConfiguration alloc] initWithName:@"Default Configuration" sessionRole:connectingSceneSession.role];
}


- (void)application:(UIApplication *)application didDiscardSceneSessions:(NSSet<UISceneSession *> *)sceneSessions {
    // Called when the user discards a scene session.
    // If any sessions were discarded while the application was not running, this will be called shortly after application:didFinishLaunchingWithOptions.
    // Use this method to release any resources that were specific to the discarded scenes, as they will not return.
}


#pragma mark - Core Data stack

@synthesize persistentContainer = _persistentContainer;

- (NSPersistentContainer *)persistentContainer {
    // The persistent container for the application. This implementation creates and returns a container, having loaded the store for the application to it.
    @synchronized (self) {
        if (_persistentContainer == nil) {
            _persistentContainer = [[NSPersistentContainer alloc] initWithName:@"iosgl"];
            [_persistentContainer loadPersistentStoresWithCompletionHandler:^(NSPersistentStoreDescription *storeDescription, NSError *error) {
                if (error != nil) {
                    // Replace this implementation with code to handle the error appropriately.
                    // abort() causes the application to generate a crash log and terminate. You should not use this function in a shipping application, although it may be useful during development.
                    
                    /*
                     Typical reasons for an error here include:
                     * The parent directory does not exist, cannot be created, or disallows writing.
                     * The persistent store is not accessible, due to permissions or data protection when the device is locked.
                     * The device is out of space.
                     * The store could not be migrated to the current model version.
                     Check the error message to determine what the actual problem was.
                    */
                    NSLog(@"Unresolved error %@, %@", error, error.userInfo);
                    abort();
                }
            }];
        }
    }
    
    return _persistentContainer;
}

#pragma mark - Core Data Saving support

- (void)saveContext {
    NSManagedObjectContext *context = self.persistentContainer.viewContext;
    NSError *error = nil;
    if ([context hasChanges] && ![context save:&error]) {
        // Replace this implementation with code to handle the error appropriately.
        // abort() causes the application to generate a crash log and terminate. You should not use this function in a shipping application, although it may be useful during development.
        NSLog(@"Unresolved error %@, %@", error, error.userInfo);
        abort();
    }
}

@end
