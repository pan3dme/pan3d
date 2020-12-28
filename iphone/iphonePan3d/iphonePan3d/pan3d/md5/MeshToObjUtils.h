//
//  MeshToObjUtils.h
//  iosgl
//
//  Created by pan3dme on 2020/11/12.
//  Copyright © 2020 zhao. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "Md5MeshData.h"
NS_ASSUME_NONNULL_BEGIN

@interface MeshToObjUtils : NSObject
 
+ (instancetype)default;
-(NSArray*)getStorNewTargerArr:(NSArray*)targetAry;
-(void)getObj:(Md5MeshData*)mesh;
@end

NS_ASSUME_NONNULL_END
