//
//  Md5FileViewController.m
//  iosgl
//
//  Created by pan3dme on 2021/3/11.
//  Copyright © 2021 zhao. All rights reserved.
//

#import "Md5FileViewController.h"
#import "Md5MoveSprite.h"

@interface Md5FileViewController ()

@end

@implementation Md5FileViewController


- (void)viewDidLoad {
    [super viewDidLoad];
    
    Md5MoveSprite* sc=[[Md5MoveSprite alloc]init:self.scene3D];
    [sc setMd5url:@"pan/expmd5/2/body.md5mesh"  animurl:@"pan/expmd5/2/body.md5mesh"  picurl:@"pan/expmd5/shuangdaonv.jpg"  ];
    
    [self.scene3D addDisplay:sc];
    
 
}
-(void)addMenuList;
{
    self.butItems=[[NSMutableArray alloc]init];
    NSMutableArray* arr=[[NSMutableArray alloc]init];
    [arr addObject:@"动态场景"];
 
 
    [self addButsByArr:arr ];
    
    
    [self viewDidLayoutSubviews];
  
}
- (BOOL) addMenuListClikEvent:(UIButton *) btn;
{
    BOOL isCanNext= [super addMenuListClikEvent:btn];
    if(!isCanNext){
        return isCanNext;
    }
//    NSString* titleStr=btn.titleLabel.text;
   
    
    
    return true;
}



@end
