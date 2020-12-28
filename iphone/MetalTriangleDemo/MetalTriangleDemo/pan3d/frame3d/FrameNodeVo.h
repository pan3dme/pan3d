//
//  FrameNodeVo.h
//  iosgl
//
//  Created by pan3dme on 2020/11/16.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "Object3D.h"
#import "FrameLinePointVo.h"

NS_ASSUME_NONNULL_BEGIN

@interface FrameNodeVo : Object3D
@property(nonatomic,assign)int maxTime;

@property(nonatomic,assign) int type;
@property(nonatomic,assign) int id;
@property(nonatomic,strong) NSString* name;
@property(nonatomic,strong)  NSString* url;
@property(nonatomic,strong)  NSString* resurl;
@property(nonatomic,assign) float curTime;
@property(nonatomic,assign) bool noLight;
@property(nonatomic,assign) bool directLight;
@property(nonatomic,assign) bool receiveShadow;
@property(nonatomic,strong) NSString* lighturl;
@property(nonatomic,strong) NSMutableArray<FrameLinePointVo*>* pointitem;
@property(nonatomic,strong) NSMutableArray* materialInfoArr;
@property(nonatomic,strong) NSString* materialurl;
 

-(void)writeObject:(NSDictionary*)val ;
@end

NS_ASSUME_NONNULL_END
