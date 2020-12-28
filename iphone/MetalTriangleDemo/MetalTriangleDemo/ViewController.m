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
@end

@implementation ViewController
 
- (void)viewDidLoad {
    [super viewDidLoad];
//    self.view.backgroundColor=[UIColor redColor];
    
     
    // Set the view to use the default device
    self._mtkView = (MTKView *)self.view;
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
    
    // Initialize our renderer with the view size
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
