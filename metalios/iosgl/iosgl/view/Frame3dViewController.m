//
//  Frame3dViewController.m
//  iosgl
//
//  Created by pan3dme on 2021/3/10.
//  Copyright © 2021 zhao. All rights reserved.
//

#import "Frame3dViewController.h"
#import "Frame3dSprite.h"
#import "Md5MoveSprite.h"

@interface Frame3dViewController ()

@end

@implementation Frame3dViewController


- (void)viewDidLoad {
    [super viewDidLoad];
    
    Frame3dSprite* temp=[[Frame3dSprite alloc]init:self.scene3D];
    
    [self.scene3D addDisplay:temp];
    
 
}
-(void)addMenuList;
{
    self.butItems=[[NSMutableArray alloc]init];
    NSMutableArray* arr=[[NSMutableArray alloc]init];
    [arr addObject:@"动态场景"];
    [arr addObject:@"MD5模型"];
 
 
    [self addButsByArr:arr ];
    
    
    [self viewDidLayoutSubviews];
  
}
- (BOOL) addMenuListClikEvent:(UIButton *) btn;
{
    BOOL isCanNext= [super addMenuListClikEvent:btn];
    if(!isCanNext){
        return isCanNext;
    }
    NSString* titleStr=btn.titleLabel.text;
    if ([titleStr isEqual:@"动态场景"]) {
    
        
        [self.scene3D addDisplay:[[Frame3dSprite alloc]init:self.scene3D]];
    }
    if ([titleStr isEqual:@"MD5001"]) {
        Md5MoveSprite* sc=[[Md5MoveSprite alloc]init:self.scene3D];
        [sc setMd5url:@"pan/expmd5/2/body.md5mesh"  animurl:@"pan/expmd5/2/body.md5mesh"  picurl:@"pan/expmd5/shuangdaonv.jpg"  ];
        
        [self.scene3D addDisplay:sc];
    }
   
    
    
    return true;
}



@end
