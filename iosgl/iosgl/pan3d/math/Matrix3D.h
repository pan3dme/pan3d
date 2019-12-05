//
//  Matrix3D.h
//  iosgl
//
//  Created by zhao on 5/12/2019.
//  Copyright © 2019 zhao. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <GLKit/GLKit.h>

NS_ASSUME_NONNULL_BEGIN

@interface Matrix3D : NSObject
 
 
@property (nonatomic, assign)  BOOL isIdentity;
@property (nonatomic, assign)  NSArray *m;

-(GLfloat  )getddm;

@end

NS_ASSUME_NONNULL_END
