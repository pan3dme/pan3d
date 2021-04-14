//
//  ParticleFacetData.m
//  iosgl
//
//  Created by zhao on 23/2/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "ParticleFacetData.h"
#import "Display3DFacetParticle.h"
#import "Display3DFacetShader.h"
#import "ProgrmaManager.h"
#import "ObjData.h"
#import "Vector2D.h"

@implementation ParticleFacetData
- (void)setAllByteInfo:(ByteArray *)byte
{
    
    ParticleFacetData *this=self;
    this._maxAnimTime = [byte readFloat];
    this._isCycle =[byte readBoolean];
    this._lockx = [byte readBoolean];
    this._locky = [byte readBoolean];
    [super setAllByteInfo:byte];
    
    [self uploadGpu];
    
}
-(void)uploadGpu;
{
    
    [self makeRectangleData:self._width height:self._height offsetX:self._originWidthScale offsetY:self._originHeightScale isUV:self._isUV isU:self._isUV isV:self._isV animLine:self._animLine animRow:self._animRow];
}

-(void)makeRectangleData:(float)width height:(float)height offsetX:(float)offsetX  offsetY:(float)offsetY  isUV:(BOOL)isUV  isU:(BOOL)isU  isV:(BOOL)isV  animLine:(float)animLine animRow:(float)animRow;
{
    
//    width=50;
//    height=25;
    
    self.objData=[[ObjData alloc]init:self.scene3D];
    GLfloat attrArr[12];
    attrArr[0]=-offsetX * width;
    attrArr[1]=height - offsetY * height;
    attrArr[2]=0.0f;
    
    attrArr[3]=width - offsetX * width;
    attrArr[4]=height - offsetY * height;
    attrArr[5]=0.0f;
    
    attrArr[6]=width - offsetX * width;
    attrArr[7]=-offsetY * height;
    attrArr[8]=0.0f;
    
    attrArr[9]=-offsetX * width;
    attrArr[10]=-offsetY * height;
    attrArr[11]=0.0f;
    
    
     
    
   
    NSMutableArray* arr001  =[[NSMutableArray alloc]init];
    for(int i=0;i<12;i++){
        [arr001 addObject:[NSNumber numberWithFloat:attrArr[i]]];
    }
    self.objData.mtkvertices=[self.scene3D.context3D changeDataToGupMtkfloat3:arr001];
  
    
    
    NSMutableArray<Vector2D*>* ary=[[NSMutableArray alloc] init];
    [ary addObject:[[Vector2D alloc]x:0.0f y:0.0f]];
    [ary addObject:[[Vector2D alloc]x:0.0f y:1.0f / animRow]];
    [ary addObject:[[Vector2D alloc]x:1.0f / animLine y:1.0f / animRow]];
    [ary addObject:[[Vector2D alloc]x:1.0f / animLine y:0.0f]];
    
    
    if (isU) {
        for (int i = 0; i < ary.count; i++) {
            ary[i].x = - ary[i].x;
        }
    }
    if (isV) {
        for (int i = 0; i < ary.count; i++) {
            ary[i].y = - ary[i].y;
        }
    }
    if (isUV) {
        Vector2D* temp=ary[0];
        [ary removeObjectAtIndex:0];
        [ary addObject:temp];
    }
    GLfloat uvArr[8];
    uvArr[0]=ary[0].x;
    uvArr[1]=ary[0].y;
    
    uvArr[2]=ary[1].x;
    uvArr[3]=ary[1].y;
    
    uvArr[4]=ary[2].x;
    uvArr[5]=ary[2].y;
    
    uvArr[6]=ary[3].x;
    uvArr[7]=ary[3].y;
    
    
    NSMutableArray* arr002  =[[NSMutableArray alloc]init];
    for(int i=0;i<8;i++){
        [arr002 addObject:[NSNumber numberWithFloat:uvArr[i]]];
    }
    self.objData.mtkuvs=[self.scene3D.context3D changeDataToGupMtkfloat2:arr002];
    
  
  
    
    
    unsigned int Indices[6];
    Indices[0]=0;
    Indices[1]=1;
    Indices[2]=2;
    Indices[3]=0;
    Indices[4]=2;
    Indices[5]=3;
 
    
    self.objData.mtkindexs = [self.scene3D.mtkView.device newBufferWithBytes:Indices
                                                     length:sizeof(Indices)
                                                    options:MTLResourceStorageModeShared];
    
    
    
    self.objData.trinum=6;
    
    self.objData.mtkindexCount = self.objData.trinum;
    
    
}

-(void)regShader;
{
    if ( self.materialParam) {
        [ self.scene3D.progrmaManager registe:Display3DFacetShader.shaderStr shader3d: [[Display3DFacetShader alloc]init:self.scene3D]];
        self.materialParam.shader=  [ self.scene3D.progrmaManager getProgram:Display3DFacetShader.shaderStr];
        
    }
    
    
}

-(Display3DParticle*)getParticle;
{
    return [[Display3DFacetParticle alloc]init:self.scene3D];
}
@end
