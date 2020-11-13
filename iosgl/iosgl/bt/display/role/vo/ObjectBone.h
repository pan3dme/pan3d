//
//  ObjectBone.h
//  iosgl
//
//  Created by zhao on 3/4/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "ObjectBaseBone.h"
#import "Matrix3D.h"
 

NS_ASSUME_NONNULL_BEGIN

@interface ObjectBone : ObjectBaseBone
@property(nonatomic,strong)NSString*   name;
@property(nonatomic,assign)int   changtype;
@property(nonatomic,assign)int   startIndex;
@property(nonatomic,strong)Matrix3D*   matrix;
-(ObjectBone*)clone;
@end

NS_ASSUME_NONNULL_END
