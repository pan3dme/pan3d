//
//  ObjData.h
//  iosgl
//
//  Created by zhao on 7/12/2019.
//  Copyright © 2019 zhao. All rights reserved.
//

#import "ResCount.h"
#import "Scene3D.h"
#import <GLKit/GLKit.h>
NS_ASSUME_NONNULL_BEGIN

@interface ObjData : ResCount
  //  public vertices: Array<number> = new Array;
@property (nonatomic, copy)  NSArray  *vertices;
@property (nonatomic, copy)  NSArray  *uvs;
@property (nonatomic, copy)  NSArray  *lightuvs;
@property (nonatomic, copy)  NSArray  *nrms;
@property (nonatomic, copy)  NSArray  *indexs;
@property (nonatomic, strong)  Scene3D  *mtkScene3D;

 
@property (nonatomic, assign)  BOOL compressBuffer  ;

@property (nonatomic, assign)  int uvsOffsets  ;
@property (nonatomic, assign)  int lightuvsOffsets  ;
@property (nonatomic, assign)  int normalsOffsets  ;
@property (nonatomic, assign)  int tangentsOffsets ;
@property (nonatomic, assign)  int bitangentsOffsets  ;
@property (nonatomic, assign)  int stride  ;
@property (nonatomic, assign)  int trinum  ;
@property (nonatomic, assign) GLuint verticesBuffer ;
@property (nonatomic, assign) GLuint uvBuffer ;
@property (nonatomic, assign) GLuint lightuvsBuffer ;
@property (nonatomic, assign) GLuint nrmsBuffer ;
@property (nonatomic, assign) GLuint indexBuffer ;
@property (nonatomic, strong) NSMutableData *dataView ;
@property (nonatomic, assign) GLuint dataViewBuffer ;

@property (nonatomic, strong) id<MTLBuffer> mtkvertices;
@property (nonatomic, strong) id<MTLBuffer> mtkindexs;
@property (nonatomic, assign) NSUInteger mtkindexCount;

- (instancetype)init:(Scene3D*)value;
-(GLuint)upGpuIndexBuffer:(NSArray*)arr;
-(GLuint)upGpuvertexBuffer:(NSArray*)arr;
-(void)upToGpu;
-(void)makeTempObjData;
-(void)changeObjDataToMtkGpu ;

@end

NS_ASSUME_NONNULL_END
