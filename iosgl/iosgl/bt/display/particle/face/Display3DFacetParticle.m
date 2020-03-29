//
//  Display3DFacetParticle.m
//  iosgl
//
//  Created by zhao on 29/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "Display3DFacetParticle.h"
#import "ProgrmaManager.h"
#import "Context3D.h"
#import "Scene3D.h"
#import "ObjData.h"
#import "ParticleFacetData.h"
#import "DisplayBaseTriSprite.h"
#import "Display3DFacetShader.h"

@interface Display3DFacetParticle ()
 
@end

 
@implementation Display3DFacetParticle

- (instancetype)init
{
    self = [super init];
    if (self) {
        [[ProgrmaManager default] registe:Display3DFacetShader.shaderStr shader3d: [[Display3DFacetShader alloc]init]];
        self.shader3d=  [[ProgrmaManager default] getProgram:Display3DFacetShader.shaderStr];
         
    }
    return self;
}
- (void)update;
{
       if(self.shader3d&&self.facetdata.objData){
           GLuint progame= self.shader3d.program;
           glUseProgram(progame);
           [self setViewCamModeMatr3d];
           Context3D *context3D=self.scene3d.context3D;
           [context3D pushVa:self.facetdata.objData.verticesBuffer];
           GLuint position = glGetAttribLocation( self.shader3d.program,"position");
           glEnableVertexAttribArray(position);
           glVertexAttribPointer(position, 3, GL_FLOAT, GL_FALSE,0, (GLfloat *)NULL+0);
    
           [context3D drawCall:self.facetdata.objData.indexBuffer  numTril:self.facetdata.objData.trinum ];
            
       }
}
-(ParticleFacetData*)facetdata;
{
    return (ParticleFacetData*)self.data;
}
@end
