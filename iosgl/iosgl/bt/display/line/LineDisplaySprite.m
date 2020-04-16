//
//  LineDisplaySprite.m
//  iosgl
//
//  Created by zhao on 6/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "Context3D.h"
#import "Scene3D.h"
#import "LineDisplayShader.h"
#import "LineDisplaySprite.h"
#import "ProgrmaManager.h"

@interface LineDisplaySprite ()

@property (nonatomic, strong) NSMutableArray<Vector3D *>*  linePointArr;
 


@end
@implementation LineDisplaySprite

- (instancetype)init
{
    self = [super init];
    if (self) {
         self.colorV3d=[[Vector3D alloc]x:1 y:0 z:0];
    }
    return self;
}
-(void)clearLine;
{
    if(self.linePointArr&&self.linePointArr.count){
        [self.linePointArr removeAllObjects];
    }
}
-(void)addLineA2B:(Vector3D*)a b:(Vector3D*)b color:(Vector3D*)color;
{
    self.colorV3d=color;
    [self addLineA2B:a b:b];
}
-(void)addLineA2B:(Vector3D*)a b:(Vector3D*)b;
{
    if(!self.linePointArr ){
        self.linePointArr  =[[NSMutableArray alloc]init];
    }
    [self.linePointArr addObject:a];
    [self.linePointArr addObject:[[Vector3D alloc]x:self.colorV3d.x y:self.colorV3d.y z:self.colorV3d.z]];
    [self.linePointArr addObject:b];
    [self.linePointArr addObject:[[Vector3D alloc]x:self.colorV3d.x y:self.colorV3d.y z:self.colorV3d.z]];
}
-(void)onCreated;
{
    self.objData=[[ObjData alloc]init];
    [self clearLine];
    
    self.colorV3d=[[Vector3D alloc]x:1 y:0 z:0];
    [self addLineA2B:[[Vector3D alloc]x:0 y:0 z:0]   b:[[Vector3D alloc]x:100.0f y:0 z:0]];
    self.colorV3d=[[Vector3D alloc]x:0 y:0 z:1];
    [self addLineA2B:[[Vector3D alloc]x:0 y:0 z:0]   b:[[Vector3D alloc]x:0 y:0 z:100.0f]];
}
-(void)registetProgame;
{
     [[ProgrmaManager default] registe:LineDisplayShader.shaderStr shader3d: [[LineDisplayShader alloc]init]];
      self.shader3d=  [[ProgrmaManager default] getProgram:LineDisplayShader.shaderStr];
}
-(void)refrishLineDataToGpu;
{
    if(self.linePointArr&&self.linePointArr.count){
        GLfloat attrArr[self.linePointArr.count*3];
        for (int i=0; i<self.linePointArr.count; i++) {
            attrArr[i*3+0]= self.linePointArr[i].x;
            attrArr[i*3+1]= self.linePointArr[i].y;
            attrArr[i*3+2]= self.linePointArr[i].z;
        }
        unsigned int Indices[self.linePointArr.count];
        for (int j=0; j<self.linePointArr.count/2; j++) {
             Indices[j]=j;
        }
        GLuint verticesBuffer;
        glGenBuffers(1, &verticesBuffer);
        glBindBuffer(GL_ARRAY_BUFFER, verticesBuffer);
        glBufferData(GL_ARRAY_BUFFER, sizeof(attrArr), attrArr, GL_DYNAMIC_DRAW);
        self.objData.verticesBuffer=verticesBuffer;
        GLuint indexBuffer;
        glGenBuffers(1, &indexBuffer);
        glBindBuffer(GL_ELEMENT_ARRAY_BUFFER, indexBuffer);
        glBufferData(GL_ELEMENT_ARRAY_BUFFER, sizeof(Indices), Indices, GL_STATIC_DRAW);
        self.objData.indexBuffer=indexBuffer;
        self.objData.trinum=(int)self.linePointArr.count/2;
        [self clearLine];
    }
}

-(void)upFrame{
    
    if(self.shader3d&&self.objData){
        [self refrishLineDataToGpu];
        GLuint progame= self.shader3d.program;
        glUseProgram(progame);
    
        [self setVc];
        [self setVa];
        
        glBindBuffer(GL_ELEMENT_ARRAY_BUFFER, self.objData.indexBuffer);
        glDrawElements(GL_LINES, self.objData.trinum, GL_UNSIGNED_INT, 0);
        
    }
 
}
-(void)setVc;
{
    Context3D *context3D=self.scene3d.context3D;
    [context3D setVcMatrix4fv:self.shader3d name:"viewMatrix" data:self.viewMatrix.m];
    [context3D setVcMatrix4fv:self.shader3d name:"posMatrix" data:self.posMatrix3d.m];
}
-(void)setVa;
{
    Context3D *context3D=self.scene3d.context3D;
    [context3D pushVa:self.objData.verticesBuffer];
    [context3D setVaOffset:self.shader3d name:"position" dataWidth:3 stride:24 offset:0];
    [context3D setVaOffset:self.shader3d name:"attcolor" dataWidth:3 stride:24 offset:3];
    
}



@end
