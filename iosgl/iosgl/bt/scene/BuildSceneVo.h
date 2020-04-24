//
//  BuildSceneVo.h
//  iosgl
//
//  Created by zhao on 24/4/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface BuildSceneVo : NSObject
/*
 [0]    (null)    @"id" : (long)106
  [1]    (null)    @"objsurl" : @"wudiqiuqiu/changjing/guankajibenmoxing/017/017_0.xml"
  [2]    (null)    @"rotationY" : (long)0
  [3]    (null)    @"x" : (double)113.621
  [4]    (null)    @"y" : (long)0
  [5]    (null)    @"rotationZ" : (long)0
  [6]    (null)    @"type" : (long)1
  [7]    (null)    @"z" : (long)0
  [8]    (null)    @"scaleZ" : (long)1
  [9]    (null)    @"materialurl" : @"wudiqiuqiu/changjing/texture/wuditexture.txt"
  [10]    (null)    @"scaleY" : (long)1
  [11]    (null)    @"isPerspective" : NO
  [12]    (null)    @"rotationX" : (long)0
  [13]    (null)    @"scaleX" : (double)1.73914
  [14]    (null)    @"name" : @"017_0"
  [15]    (null)    @"materialInfoArr" : @"1 element"
 */
@property(nonatomic,assign)int id;
@property(nonatomic,assign)int type;
@property(nonatomic,strong)NSString* name;
@property(nonatomic,strong)NSString* objsurl;
@property(nonatomic,strong)NSString* materialurl;
@property(nonatomic,assign)float rotationX;
@property(nonatomic,assign)float rotationY;
@property(nonatomic,assign)float rotationZ;
@property(nonatomic,assign)float x;
@property(nonatomic,assign)float y;
@property(nonatomic,assign)float z;
@property(nonatomic,assign)float scaleX;
@property(nonatomic,assign)float scaleY;
@property(nonatomic,assign)float scaleZ;
@property(nonatomic,assign)BOOL isPerspective;
@property(nonatomic,strong)NSMutableArray* materialInfoArr;

-(void)preshValue:(NSDictionary*)value;
@end

NS_ASSUME_NONNULL_END
