//
//  MeshDataManager.h
//  iosgl
//
//  Created by zhao on 2/4/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "ResGC.h"
#import "SkinMesh.h"

NS_ASSUME_NONNULL_BEGIN

@interface MeshDataManager : ResGC 
-(void)getMeshData:(NSString*)url fun:(SkinMeshBfun)fun batchNum:(int)batchNum;
-(void)readData:(ByteArray*)byte batchNum:(int)batchNum url:(NSString*)url version:(int)version;
@end

NS_ASSUME_NONNULL_END
