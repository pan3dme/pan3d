//
//  SkinMesh.m
//  iosgl
//
//  Created by zhao on 2/4/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "SkinMesh.h"
#import "Matrix3D.h"
#import "MeshData.h"
#import "Vector2D.h"
@interface SkinMesh()
@property(nonatomic,strong)NSMutableArray<MeshData*>*  meshAry ;

@property(nonatomic,strong)NSMutableArray<NSString*>*   animUrlAry;
@property(nonatomic,strong)NSMutableArray<NSNumber*>*   lightData;
@property(nonatomic,strong)NSMutableArray<Vector3D*>*   hitPosItem;


@property(nonatomic,strong)NSMutableDictionary*  animDic;

 

@property(nonatomic,assign)BOOL  ready;
@property(nonatomic,assign)float  type;

 
@end
@implementation SkinMesh
-(void)makeHitBoxItem;
{
    
}
-(void)addMesh:(MeshData*)mesh;
{
    mesh.uid=(int)self.meshAry.count;
    [self.meshAry addObject:mesh];
}
 
@end
