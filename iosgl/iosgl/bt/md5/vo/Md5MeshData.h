//
//  Md5MeshData.h
//  iosgl
//
//  Created by pan3dme on 2020/11/12.
//  Copyright © 2020 zhao. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface Md5MeshData : NSObject
@property(nonatomic,strong)NSDictionary*  mesh  ;
@property(nonatomic,strong)NSArray* triItem;
@property(nonatomic,strong)NSArray*  weightItem;
@property(nonatomic,strong)NSArray*  uvItem;
@property(nonatomic,strong)NSArray*  boneItem;
@property(nonatomic,assign)int faceNum;
@end

NS_ASSUME_NONNULL_END
