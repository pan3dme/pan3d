//
//  Md5Analysis.h
//  iosgl
//
//  Created by pan3dme on 2020/11/12.
//  Copyright © 2020 zhao. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "Md5MeshData.h"
#import "GC.h"

NS_ASSUME_NONNULL_BEGIN

@interface Md5Analysis : GC
-(Md5MeshData*)addMesh:(NSString*)str;
 
@end

NS_ASSUME_NONNULL_END
