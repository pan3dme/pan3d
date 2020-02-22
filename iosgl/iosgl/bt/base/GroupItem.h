//
//  GroupItem.h
//  iosgl
//
//  Created by zhao on 22/2/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "Object3D.h"

NS_ASSUME_NONNULL_BEGIN

@interface GroupItem : Object3D
/*
public objUrl: string;
      public materialUrl: string;
      public particleUrl: string;
      public materialInfoArr: Array<any>
      public isGroup: boolean;
      public types: number;

*/
@property (nonatomic, strong) NSString *objUrl;
@property (nonatomic, strong) NSString *materialUrl;
@property (nonatomic, strong) NSString *particleUrl;
@property (nonatomic, strong) NSArray *materialInfoArr;
@property (nonatomic, assign) BOOL isGroup;
@property (nonatomic, assign) int types;
@end

NS_ASSUME_NONNULL_END
