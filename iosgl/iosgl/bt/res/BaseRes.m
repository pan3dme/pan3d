//
//  BaseRes.m
//  iosgl
//
//  Created by zhao on 12/12/2019.
//  Copyright © 2019 zhao. All rights reserved.
//

#import "BaseRes.h"
#import <UIKit/UIKit.h>

@implementation BaseRes

-(void)read ;
{
    
    int filetype = [self.byte readInt];
    switch (filetype) {
        case 1:
            [self readImgs];
            break;
            
        default:
            break;
    }
   
    
}
-(void)readImgs;
{
    int imglen = [self.byte readInt];
       for(int i=0;i<imglen;i++){
           NSString *imgurl =   [self.byte readUTF];
           NSLog(@"imgurl-->%@",imgurl);
       }
}
@end
