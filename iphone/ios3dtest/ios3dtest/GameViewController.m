//
//  GameViewController.m
//  ios3dtest
//
//  Created by pan3dme on 2021/1/3.
//

#import "GameViewController.h"

@implementation GameViewController



- (void)viewDidLoad
{
    [super viewDidLoad];
    self.scnView = [[SCNView alloc]initWithFrame:self.view.bounds];
    self.scnView.backgroundColor = [UIColor grayColor];
    [self.view addSubview: self.scnView];
    
    self.scnView.allowsCameraControl = YES;
    // 设置场景
    self.scnView.scene = [SCNScene scene];
    
    // 添加照相机
    SCNCamera *camera = [SCNCamera camera];
 
    // 设置正投影
//    camera.usesOrthographicProjection = YES;
    // 设置正投影比例
    camera.orthographicScale = 10;
    
    SCNNode *caNode = [SCNNode node];
    caNode.camera = camera;
    caNode.position = SCNVector3Make(0, 0, 20);
    // 把节点添加进去场景
    [self.scnView.scene.rootNode addChildNode:caNode];
    
    [self creatTest];
}
 
-(void)creatTest
{
    SCNShape *shape = [SCNShape shapeWithPath:[UIBezierPath bezierPathWithRoundedRect:CGRectMake(-2.5, -2.5, 5, 5) cornerRadius:36] extrusionDepth:5];
    shape.firstMaterial.diffuse.contents = [UIImage imageNamed:@"de.jpg"];
    SCNNode *shapdeNode =[SCNNode nodeWithGeometry:shape];
    [self.scnView.scene.rootNode addChildNode:shapdeNode];
    
//    shape.shaderModifiers
    
 
    
   

}
// 正方体
-(void)createBox{
    SCNBox *box1 = [SCNBox boxWithWidth:1 height:1 length:1 chamferRadius:0];
    box1.firstMaterial.diffuse.contents = [UIImage imageNamed:@"123.png"];
    
    // 创建节点，绑定几何体
    SCNNode *node1 = [SCNNode nodeWithGeometry:box1];
    node1.position = SCNVector3Make(0, 0, 0);
    // 把节点添加进去场景
    [self.scnView.scene.rootNode addChildNode:node1];
}
 
// 创建平面
-(void)createPlane{
 
    SCNPlane *box1 = [SCNPlane planeWithWidth:2 height:2];
    box1.firstMaterial.diffuse.contents = [UIImage imageNamed:@"123.png"];
    
    // 创建节点，绑定几何体
    SCNNode *node1 = [SCNNode nodeWithGeometry:box1];
    node1.position = SCNVector3Make(0, 0, 0);
    // 把节点添加进去场景
    [self.scnView.scene.rootNode addChildNode:node1];
}
 
// 创建金字塔
-(void)createPyramid{
    
    SCNPyramid *box1 = [SCNPyramid pyramidWithWidth:1 height:1 length:1];
    box1.firstMaterial.diffuse.contents = [UIImage imageNamed:@"123.png"];
    
    // 创建节点，绑定几何体
    SCNNode *node1 = [SCNNode nodeWithGeometry:box1];
    node1.position = SCNVector3Make(0, 0, 0);
    // 把节点添加进去场景
    [self.scnView.scene.rootNode addChildNode:node1];
}
 
// 创建球体
-(void)createSphere{
    
    SCNSphere *box1 = [SCNSphere sphereWithRadius:1];
    box1.firstMaterial.diffuse.contents = [UIImage imageNamed:@"123.png"];
    
    // 创建节点，绑定几何体
    SCNNode *node1 = [SCNNode nodeWithGeometry:box1];
    node1.position = SCNVector3Make(0, 0, 0);
    // 把节点添加进去场景
    [self.scnView.scene.rootNode addChildNode:node1];
}
 
// 圆柱体
-(void)createCylinder{
    
    SCNCylinder *box1 = [SCNCylinder cylinderWithRadius:1 height:2];
    box1.firstMaterial.diffuse.contents = [UIImage imageNamed:@"123.png"];
    
    // 创建节点，绑定几何体
    SCNNode *node1 = [SCNNode nodeWithGeometry:box1];
    node1.position = SCNVector3Make(0, 0, 0);
    // 把节点添加进去场景
    [self.scnView.scene.rootNode addChildNode:node1];
}
 
// 圆锥提
-(void)createCone{
    
    SCNCone *box1 = [SCNCone coneWithTopRadius:0 bottomRadius:1 height:2];
    box1.firstMaterial.diffuse.contents = [UIImage imageNamed:@"123.png"];
    
    // 创建节点，绑定几何体
    SCNNode *node1 = [SCNNode nodeWithGeometry:box1];
    node1.position = SCNVector3Make(0, 0, 0);
    // 把节点添加进去场景
    [self.scnView.scene.rootNode addChildNode:node1];
}
 
// 管道
-(void)createTube{
    //InnerRadius 内环半径
    //outerRadius 外环半径
    SCNTube *box1 = [SCNTube tubeWithInnerRadius:1 outerRadius:2 height:2];
    box1.firstMaterial.diffuse.contents = [UIImage imageNamed:@"123.png"];
    
    // 创建节点，绑定几何体
    SCNNode *node1 = [SCNNode nodeWithGeometry:box1];
    node1.position = SCNVector3Make(0, 0, 0);
    // 把节点添加进去场景
    [self.scnView.scene.rootNode addChildNode:node1];
}
 
// 环面
-(void)createTorus{
    //pipeRadius 内环半径
    //RingRadius 外环半径
    SCNTorus *box1 = [SCNTorus torusWithRingRadius:1 pipeRadius:0.5];
    box1.firstMaterial.diffuse.contents = [UIImage imageNamed:@"123.png"];
    
    // 创建节点，绑定几何体
    SCNNode *node1 = [SCNNode nodeWithGeometry:box1];
    node1.position = SCNVector3Make(0, 0, 0);
    // 把节点添加进去场景
    [self.scnView.scene.rootNode addChildNode:node1];
}
 
// 地板
-(void)createFloor{
    SCNFloor *box1 = [SCNFloor floor];
    box1.firstMaterial.diffuse.contents = [UIImage imageNamed:@"123.png"];
    
    // 创建节点，绑定几何体
    SCNNode *node1 = [SCNNode nodeWithGeometry:box1];
    node1.position = SCNVector3Make(0, -5, 0);
    // 把节点添加进去场景
    [self.scnView.scene.rootNode addChildNode:node1];
}
 
// 字体
-(void)createText{
    SCNText *box1 = [SCNText textWithString:@"超哥" extrusionDepth:0.5];
    box1.firstMaterial.diffuse.contents = [UIImage imageNamed:@"123.png"];
    box1.font = [UIFont systemFontOfSize:1];
    // 创建节点，绑定几何体
    SCNNode *node1 = [SCNNode nodeWithGeometry:box1];
    node1.position = SCNVector3Make(-2, 0, 0);
    // 把节点添加进去场景
    [self.scnView.scene.rootNode addChildNode:node1];
}
 
// 自定义形状
-(void)createCustom{
    SCNShape *box1 = [SCNShape shapeWithPath:[UIBezierPath bezierPathWithRoundedRect:CGRectMake(0, 0, 1, 1) cornerRadius:0.5] extrusionDepth:3];
    box1.firstMaterial.diffuse.contents = [UIImage imageNamed:@"123.png"];
    // 创建节点，绑定几何体
    SCNNode *node1 = [SCNNode nodeWithGeometry:box1];
   
    // 把节点添加进去场景
    [self.scnView.scene.rootNode addChildNode:node1];
}

@end
