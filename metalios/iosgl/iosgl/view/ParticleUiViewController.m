//
//  ParticleUiViewController.m
//  iosgl
//
//  Created by pan3dme on 2021/3/1.
//  Copyright © 2021 zhao. All rights reserved.
//

#import "ParticleUiViewController.h"
#import "Scene3D.h"
#import "Display3dMovie.h"
#import "MtkBaseLine.h"

@interface ParticleUiViewController ()
 
@end

@implementation ParticleUiViewController


- (void)viewDidLoad {
    [super viewDidLoad];
 
}
-(void)addMenuList;
{
    self.butItems=[[NSMutableArray alloc]init];
    NSMutableArray* arr=[[NSMutableArray alloc]init];
    [arr addObject:@"10017"];
    [arr addObject:@"10018"];
    [arr addObject:@"levelup"];
 
 
    [self addButsByArr:arr  ];
    
    [self viewDidLayoutSubviews];
  
}
- (BOOL) addMenuListClikEvent:(UIButton *) btn;
{
   BOOL isCanNext= [super addMenuListClikEvent:btn];
    if(isCanNext){
        NSString* titleStr=btn.titleLabel.text;
        [self.scene3D playLyfByUrl: [NSString stringWithFormat:@"model/%@_lyf.txt",titleStr]];
       
    }
    return true;
}
 

@end
