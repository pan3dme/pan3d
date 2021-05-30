//
//  LCLoginViewController.m
//  StorageStarted
//
//  Created by XiaoXu on 2018/7/23.
//  Copyright © 2018年 cuiyiran. All rights reserved.
//

#import "LCLoginViewController.h"
#import "LCTabBarController.h"
#import "EditViewController.h"
#import "HomeSceneBaseViewController.h"
#import <AVOSCloud/AVOSCloud.h>
@interface LCLoginViewController ()

@property (weak, nonatomic) IBOutlet UITextField *userNameTextField;

@property (weak, nonatomic) IBOutlet UITextField *passwordTextField;

@end

@implementation LCLoginViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    self.userNameTextField.text=@"pan3dme";
    self.passwordTextField.text=@"1343";
   
    [self sendLoginEvent];
    
}
-(void)viewWillAppear:(BOOL)animated{
    [super viewWillAppear:YES];
    [AVAnalytics beginLogPageView:@"LoginView"];
    
}
- (void)viewWillDisappear:(BOOL)animated {
    [super viewWillDisappear:YES];
    [AVAnalytics endLogPageView:@"LoginView"];
}

 

- (IBAction)LoginBtnClick:(id)sender {
    
  
    [self sendLoginEvent];
    
 
}
-(void)sendLoginEvent
{
    NSString *username = self.userNameTextField.text;
    NSString *password = self.passwordTextField.text;
    if (username && password) {
        [AVUser logInWithUsernameInBackground:username password:password block:^(AVUser *user, NSError *error){
           if (user) {
        
               [self toSceneBase];
            } else {
            NSLog(@"登录失败：%@",error.localizedFailureReason);
            }
        }];
    }
}
-(void)toSceneBase
{
    //直接进入场景
    
    NSMutableArray* arr=[[NSMutableArray alloc]init];
    NSMutableDictionary* dic=[[NSMutableDictionary alloc]init ];
    [dic setValue:@"1" forKey:@"id"];
    [dic setValue:@"1" forKey:@"type"];
    [dic setValue:@"2015" forKey:@"text"];
 
 
    [arr addObject:dic];
    //[{"id":1,"type":1,"text":2015}]
    HomeSceneBaseViewController* vc=[[HomeSceneBaseViewController alloc]init:arr];
    [UIApplication sharedApplication].keyWindow.rootViewController = vc;
}

-(void)toNextPage
{
    [UIApplication sharedApplication].keyWindow.rootViewController = [[LCTabBarController alloc]init];
}


// LeanCloud - 注册 https://leancloud.cn/docs/leanstorage_guide-objc.html#hash885156
- (IBAction)SignUpBtnClick:(id)sender {
    
    AVUser *user = [AVUser user];
    user.username = self.userNameTextField.text;
    user.password = self.passwordTextField.text;
    
    [user signUpInBackgroundWithBlock:^(BOOL succeeded, NSError *error) {
        if (succeeded) {
            // 注册成功直接登录
            [AVUser logInWithUsernameInBackground:self.userNameTextField.text password:self.passwordTextField.text block:^(AVUser *user, NSError *error){
                if (user) {
                    [UIApplication sharedApplication].keyWindow.rootViewController = [[LCTabBarController alloc]init];
                } else {
                    NSLog(@"登录失败：%@",error.localizedFailureReason);
                }
            }];
        }else if(error.code == 202){
            //注册失败的原因可能有多种，常见的是用户名已经存在。
            NSLog(@"注册失败，用户名已经存在");
        }else{
            NSLog(@"注册失败：%@",error.localizedFailureReason);
        }
    }];
}

@end

