//
//  ObjData.h
//  iosgl
//
//  Created by zhao on 7/12/2019.
//  Copyright © 2019 zhao. All rights reserved.
//

#import "ResCount.h"
#import <GLKit/GLKit.h>
NS_ASSUME_NONNULL_BEGIN

@interface ObjData : ResCount
  //  public vertices: Array<number> = new Array;
@property (nonatomic, assign)  float  *vertices;
@property (nonatomic, assign) GLuint verticesBuffer ;
-(void)upToGpu;
@end

NS_ASSUME_NONNULL_END
