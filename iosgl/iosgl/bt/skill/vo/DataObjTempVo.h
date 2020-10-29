//
//  DataObjTempVo.h
//  iosgl
//
//  Created by zhao on 29/10/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "Vector3D.h"

NS_ASSUME_NONNULL_BEGIN

@interface DataObjTempVo : NSObject
@property(nonatomic,strong)NSString* url;
@property(nonatomic,assign)float frame;
@property(nonatomic,strong)NSString* beginPos;
@property(nonatomic,assign)float beginType ;
@property(nonatomic,strong)NSString* beginSocket;
@property(nonatomic,strong)NSString* hitSocket;
@property(nonatomic,strong)NSString* endParticle;
@property(nonatomic,assign)int multype;
@property(nonatomic,assign)float speed;
@property(nonatomic,assign)BOOL hasSocket;
@property(nonatomic,strong)NSString* socket;
@property(nonatomic,strong)Vector3D* pos;
@property(nonatomic,strong)Vector3D* rotation;
@end

NS_ASSUME_NONNULL_END
