//
//  MeshData.m
//  iosgl
//
//  Created by zhao on 2/4/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "MeshData.h"
#import "MaterialBaseParam.h"
#import "Material.h"

@interface MeshData()

@property(nonatomic,strong)MaterialBaseParam* materialParam;

 
 
@end

@implementation MeshData

- (instancetype)init
{
    self = [super init];
    if (self) {
        self.particleAry=[[NSMutableArray alloc]init];
    }
    return self;
}

@end
