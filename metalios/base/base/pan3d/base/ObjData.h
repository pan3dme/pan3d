//
//  ObjData.h
//  base
//
//  Created by pan3dme on 2021/1/17.
//

#import "ResCount.h"

NS_ASSUME_NONNULL_BEGIN

@interface ObjData : ResCount
@property (nonatomic, strong) id<MTLBuffer> vertices;
@property (nonatomic, strong) id<MTLBuffer> indexs;
@property (nonatomic, assign) NSUInteger indexCount;

-(void)makeTempObjData;
@end

NS_ASSUME_NONNULL_END
