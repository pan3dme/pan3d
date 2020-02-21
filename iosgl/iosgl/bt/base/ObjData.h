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
@property (nonatomic, copy)  NSArray  *vertices;
@property (nonatomic, copy)  NSArray  *uvs;
@property (nonatomic, copy)  NSArray  *nrms;
@property (nonatomic, copy)  NSArray  *indexs;

@property (nonatomic, assign)  int uvsOffsets  ;
@property (nonatomic, assign)  int lightuvsOffsets  ;
@property (nonatomic, assign)  int normalsOffsets  ;
@property (nonatomic, assign)  int tangentsOffsets ;
@property (nonatomic, assign)  int bitangentsOffsets  ;
@property (nonatomic, assign)  int stride  ;
@property (nonatomic, assign) GLuint verticesBuffer ;
@property (nonatomic, assign) GLuint indexBuffer ;
@property (nonatomic, strong) NSMutableData *dataView ;
@property (nonatomic, assign) GLuint dataViewBuffer ;

-(void)upToGpu;
@end

NS_ASSUME_NONNULL_END
