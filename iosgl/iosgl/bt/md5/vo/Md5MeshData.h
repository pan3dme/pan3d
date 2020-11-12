//
//  Md5MeshData.h
//  iosgl
//
//  Created by pan3dme on 2020/11/12.
//  Copyright © 2020 zhao. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "MeshData.h"

NS_ASSUME_NONNULL_BEGIN

@interface Md5MeshData : MeshData
@property(nonatomic,strong)NSMutableDictionary*  mesh  ;
@property(nonatomic,strong)NSMutableArray* triItem;
@property(nonatomic,strong)NSMutableArray*  weightItem;
@property(nonatomic,strong)NSMutableArray*  uvItem;
@property(nonatomic,strong)NSMutableArray*  boneItem;
@property(nonatomic,assign)int faceNum;
@end

NS_ASSUME_NONNULL_END
