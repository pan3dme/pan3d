//
//  CubemapLoad.h
//  iosgl
//
//  Created by zhao on 22/4/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "GL_Header.h"
NS_ASSUME_NONNULL_BEGIN

@interface CubemapLoad : NSObject
@property (nonatomic, strong)  SuccessMaterial fun;
@property (nonatomic, strong)  NSMutableArray*  ary;
@property (nonatomic, assign)  int flagNum;
 
-(void)loadCube:(NSString*)url fun:(SuccessMaterial)fun;
@end

NS_ASSUME_NONNULL_END
