//
//  GameViewController.m
//  SCNShape_Demo
//
//  Created by tianpengfei on 16/10/22.
//  Copyright (c) 2016年 tianpengfei. All rights reserved.
//

#import "GameViewController.h"

@implementation GameViewController

- (void)viewDidLoad
{
    [super viewDidLoad];

    // create a new scene
    SCNScene *scene = [SCNScene new];

    // create and add a camera to the scene
    SCNNode *cameraNode = [SCNNode node];
    cameraNode.camera = [SCNCamera camera];
    [scene.rootNode addChildNode:cameraNode];
    
    // place the camera
    cameraNode.position = SCNVector3Make(15, 15, 40);
    cameraNode.camera.zFar = 100;
    
    SCNNode *ambientLightNode = [SCNNode node];
    ambientLightNode.light = [SCNLight light];
    ambientLightNode.light.type = SCNLightTypeAmbient;
    ambientLightNode.light.color = [UIColor colorWithWhite:0.3 alpha:1.0];
    [scene.rootNode addChildNode:ambientLightNode];
    
    SCNNode *omniLightNode = [SCNNode node];
    omniLightNode.light = [SCNLight light];
    omniLightNode.light.type = SCNLightTypeOmni;
    omniLightNode.light.color = [UIColor colorWithWhite:0.3 alpha:1.0];
    omniLightNode.position = SCNVector3Make(15, 15, 20);
    [scene.rootNode addChildNode:omniLightNode];
    
    // retrieve the SCNView
    SCNView *scnView = (SCNView *)self.view;
    
    // set the scene to the view
    scnView.scene = scene;
    
    // allows the user to manipulate the camera
    scnView.allowsCameraControl = YES;
        
    // show statistics such as fps and timing information
    scnView.showsStatistics = YES;

    // configure the view
    scnView.backgroundColor = [UIColor blackColor];
    

    NSMutableArray *gestureRecognizers = [NSMutableArray array];
    [gestureRecognizers addObjectsFromArray:scnView.gestureRecognizers];
    scnView.gestureRecognizers = gestureRecognizers;
    
    [self addShapeNode:scene];
}
-(void)addShapeNode:(SCNScene *)scene{

    SCNShape *customShape = [SCNShape shapeWithPath:[self getBezierPath] extrusionDepth:4];
    
    customShape.chamferRadius = 0.2;
    customShape.chamferMode = SCNChamferModeBoth;
//    customShape.chamferProfile = [self chamferProfileForOutline];
    
    SCNNode *shapeNode = [SCNNode nodeWithGeometry:customShape];
    shapeNode.geometry.firstMaterial.diffuse.contents = [UIColor greenColor];
    shapeNode.eulerAngles = SCNVector3Make(0,-M_PI_2/6, 0);

    
    [scene.rootNode addChildNode:shapeNode];
    
//    customShape.materials = @[[self differentColorMaterial:[UIColor redColor]],
//                              [self differentColorMaterial:[UIColor greenColor]],
//                              [self differentColorMaterial:[UIColor blueColor]],
//                              [self differentColorMaterial:[UIColor yellowColor]],
//                              [self differentColorMaterial:[UIColor whiteColor]]
//                              ];
//    
//    //Show bezier path
//    UIBezierPath *star = [self starPathWithInnerRadius:3 outerRadius:6];
//    
//    SCNShape *shape = [SCNShape shapeWithPath:star extrusionDepth:1];
//    shape.chamferRadius = 0.2;
////    shape.chamferProfile = [self chamferProfileForOutline];
//    shape.chamferMode = SCNChamferModeFront;
//    
//    // that way only the outline of the model will be visible
//    SCNMaterial *outlineMaterial = [SCNMaterial material];
//    outlineMaterial.ambient.contents = outlineMaterial.diffuse.contents = outlineMaterial.specular.contents = [UIColor blackColor];
//    outlineMaterial.emission.contents = [UIColor whiteColor];
//    outlineMaterial.doubleSided = YES;
//    
//    SCNMaterial *tranparentMaterial = [SCNMaterial material];
//    tranparentMaterial.transparency = 0.0;
//    
//    shape.materials = @[tranparentMaterial, tranparentMaterial, tranparentMaterial, outlineMaterial, outlineMaterial];
//    
//    customShape.materials = @[tranparentMaterial, tranparentMaterial, tranparentMaterial, outlineMaterial, tranparentMaterial];
//
//    SCNNode *_starOutline = [SCNNode node];
//    _starOutline.geometry = shape;
//    _starOutline.position = SCNVector3Make(15, 0, 0);
////    [_starOutline runAction:[SCNAction repeatActionForever:[SCNAction rotateByX:0 y:M_PI*2 z:0 duration:10.0]]];
//    
//    [scene.rootNode addChildNode:_starOutline];
    
}
-(SCNMaterial *)differentColorMaterial:(UIColor *)color{

    SCNMaterial *material = [SCNMaterial material];
    material.ambient.contents = material.diffuse.contents = material.specular.contents = [UIColor blackColor];
    material.emission.contents = color;
    
    return material;
}
// the curve to use to extrude the shape
- (UIBezierPath *)chamferProfileForOutline {
    UIBezierPath *path = [UIBezierPath bezierPath];
    [path moveToPoint:CGPointMake(1, 1)];
    [path addLineToPoint:CGPointMake(0, 1)];
    return path;
}
-(UIBezierPath *)getBezierPath{

    UIBezierPath *path = [UIBezierPath new];
    
    NSArray *pointArray = [self getVertexCoordinates];
    for (int i =0; i<pointArray.count; i++) {
        
        CGPoint tempPoint = CGPointFromString(pointArray[i]);
        
        if(i==0)
            [path moveToPoint:tempPoint];
        else
            [path addLineToPoint:tempPoint];
    }
    
    [path closePath];
    
    return path;
}
-(NSArray *)getVertexCoordinates{

    CGPoint firstPoint = CGPointMake(10, 10);
    CGPoint secondPoint = CGPointMake(20, 10);
    CGPoint thridPoint = CGPointMake(20, 15);
    CGPoint fourthPoint = CGPointMake(15, 15);
    CGPoint fifthPoint = CGPointMake(15, 20);
    CGPoint sixthPoint = CGPointMake(10, 20);
    
    return @[
              NSStringFromCGPoint(firstPoint),
              NSStringFromCGPoint(secondPoint),
              NSStringFromCGPoint(thridPoint),
              NSStringFromCGPoint(fourthPoint),
              NSStringFromCGPoint(fifthPoint),
              NSStringFromCGPoint(sixthPoint)
            ];
}
- (BOOL)shouldAutorotate
{
    return YES;
}

- (BOOL)prefersStatusBarHidden {
    return YES;
}

- (UIInterfaceOrientationMask)supportedInterfaceOrientations
{
    if ([[UIDevice currentDevice] userInterfaceIdiom] == UIUserInterfaceIdiomPhone) {
        return UIInterfaceOrientationMaskAllButUpsideDown;
    } else {
        return UIInterfaceOrientationMaskAll;
    }
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Release any cached data, images, etc that aren't in use.
}


- (UIBezierPath *)starPathWithInnerRadius:(CGFloat)innerRadius outerRadius:(CGFloat)outerRadius {
    NSUInteger raysCount = 5;
    CGFloat delta = 2.0 * M_PI / raysCount;
    
    UIBezierPath *path = [UIBezierPath bezierPath];
    
    for (NSUInteger i = 0; i < raysCount; ++i) {
        CGFloat alpha = i * delta + M_PI_2;
        
        if (i == 0){
            [path moveToPoint:CGPointMake(outerRadius * cos(alpha), outerRadius * sin(alpha))];
        }
        else{
            [path addLineToPoint:CGPointMake(outerRadius * cos(alpha), outerRadius * sin(alpha))];
        }
        
        alpha += 0.5 * delta;
        [path addLineToPoint:CGPointMake(innerRadius * cos(alpha), innerRadius * sin(alpha))];
    }
    
    return path;
}
// the curve to use to extrude the shape
//- (UIBezierPath *)chamferProfileForOutline {
//    UIBezierPath *path = [UIBezierPath bezierPath];
//    [path moveToPoint:CGPointMake(1, 1)];
//    [path addLineToPoint:CGPointMake(1, 0)];
//    return path;
//}
@end
