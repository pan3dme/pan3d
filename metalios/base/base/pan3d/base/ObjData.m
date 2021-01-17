//
//  ObjData.m
//  base
//
//  Created by pan3dme on 2021/1/17.
//

#import "ObjData.h"
#import "ShaderTypes.h"

@implementation ObjData

-(void)makeTempObjData
{
    static const LYVertex quadVertices[] =
    {  // 顶点坐标                          顶点颜色                    纹理坐标
        {{-0.5f, 0.5f, 0.0f, 1.0f},      {0.0f, 0.0f, 0.5f},       {0.0f, 1.0f}},//左上
        {{0.5f, 0.5f, 0.0f, 1.0f},       {0.0f, 0.5f, 0.0f},       {1.0f, 1.0f}},//右上
        {{-0.5f, -0.5f, 0.0f, 1.0f},     {0.5f, 0.0f, 1.0f},       {0.0f, 0.0f}},//左下
        {{0.5f, -0.5f, 0.0f, 1.0f},      {0.0f, 0.0f, 0.5f},       {1.0f, 0.0f}},//右下
        {{0.0f, 0.0f, 1.0f, 1.0f},       {1.0f, 1.0f, 1.0f},       {0.5f, 0.5f}},//顶点
    };
    self.vertices = [self.scene3D.mtkView.device newBufferWithBytes:quadVertices
                                                 length:sizeof(quadVertices)
                                                options:MTLResourceStorageModeShared];
    static int indices[] =
    { // 索引
        0, 3, 2,
        0, 1, 3,
        0, 2, 4,
        0, 4, 1,
        2, 3, 4,
        1, 4, 3,
    };
    self.indexs = [self.scene3D.mtkView.device newBufferWithBytes:indices
                                                     length:sizeof(indices)
                                                    options:MTLResourceStorageModeShared];
    self.indexCount = sizeof(indices) / sizeof(int);
}
@end
