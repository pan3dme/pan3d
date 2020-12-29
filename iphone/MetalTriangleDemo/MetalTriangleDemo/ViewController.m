//
//  RoleListViewController.m
//  iphonePan3d
//
//  Created by pan3dme on 2020/12/28.
//
@import MetalKit;
 
#import "ViewController.h"
#import "RenderObject.h"
 

@interface ViewController ()
 
@property (nonatomic, strong) MTKView* _mtkView;
@property (nonatomic, strong) RenderObject* _renderer;
@property (nonatomic, strong) UIView* _sceneUiView;
 
@end

@implementation ViewController
 
- (void)viewDidLoad {
    [super viewDidLoad];
//    self.view.backgroundColor=[UIColor redColor];
    
    self._sceneUiView=[[UIView alloc]init];
    self._sceneUiView.frame=CGRectMake(0, 0, 150, 150);
    self._sceneUiView.backgroundColor=[UIColor yellowColor];
    [self.view addSubview:self._sceneUiView];
    
   
    
    UIView* selectView=self.view;
    
    // Set the view to use the default device
 
    self._mtkView = (MTKView *)selectView;
    MTLCreateSystemDefaultDevice();
    self._mtkView.device = MTLCreateSystemDefaultDevice();
    
    if(!self._mtkView.device)
    {
        NSLog(@"Metal is not supported on this device");
        return;
    }
    
    self._renderer = [[RenderObject alloc] initWithMetalKitView:self._mtkView];
    
    if(!self._renderer)
    {
        NSLog(@"Renderer failed initialization");
        return;
    }
    
  
    [self._renderer mtkView:self._mtkView drawableSizeWillChange:self._mtkView.drawableSize];
    
    self._mtkView.delegate = self._renderer;
  
    
}

/*
#pragma mark - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
}
*/

@end
