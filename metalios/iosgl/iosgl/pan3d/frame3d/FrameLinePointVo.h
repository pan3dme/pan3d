//
//  FrameLinePointVo.h
//  iosgl
//
//  Created by pan3dme on 2020/11/16.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "Object3D.h"

NS_ASSUME_NONNULL_BEGIN

@interface FrameLinePointVo : Object3D
@property(nonatomic,assign) float time;
@property(nonatomic,assign) int id;
@property(nonatomic,assign) bool iskeyFrame;
@property(nonatomic,assign) bool isAnimation;
@property(nonatomic,strong) NSDictionary* data;


-(void)writeObject:(NSDictionary*)val ;
 
@end

NS_ASSUME_NONNULL_END
