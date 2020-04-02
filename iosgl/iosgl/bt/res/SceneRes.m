//
//  SceneRes.m
//  iosgl
//
//  Created by zhao on 12/12/2019.
//  Copyright © 2019 zhao. All rights reserved.
//

#import "SceneRes.h"
#import "ByteArray.h"
#import "Scene_data.h"
#import "LoadManager.h"
#import "GL_Header.h"

@interface SceneRes ()




@end
@implementation SceneRes
-(void)load:(NSString *)url bfun:(SuccessBlock)bfun;
{
    
  
     //本地文件读取
    NSString *path=  [[NSBundle mainBundle]pathForResource:@"5555_base" ofType:@"txt"];
    NSData *reader = [[NSData alloc] initWithContentsOfFile:path];
    NSLog(@"-----length----%lu",   reader.length);
    self.byte=[[ByteArray alloc]init:reader];
    [self loadComplete:self.byte];
  

    
    [[LoadManager default] loadUrl:url type: LoadManager.IMG_TYPE fun:^(NSString* value) {
        NSData* netNsData = [[NSData alloc] initWithContentsOfFile:value];
        self.byte=[[ByteArray alloc]init:reader];
        [self loadComplete:self.byte];
        bfun(nil);
        
    }];
    
}
-(void)loadComplete:(ByteArray *)byte;
{
    [self applyByteArray];
    
}
-(void)applyByteArray;
{
    self.version = [self.byte readInt];
    NSLog(@"version-->%d", self.version);
    [self read]; //img
    [self read];//obj
    [self read];//material
    [self read];//particle
    [self readScene];
}
-(void)readScene;
{
    int types = [self.byte readInt];
    [self readAstat];
    [self readTerrainIdInfoBitmapData:self.byte];
    int sceneInfosize   = [self.byte readInt];
    NSString *jsonStr= [self.byte readUTFBytes:sceneInfosize];
    NSData *data=[jsonStr dataUsingEncoding:NSUTF8StringEncoding];
    self.sceneData = [NSJSONSerialization JSONObjectWithData:data options:NSJSONReadingMutableContainers error:nil];
}
-(void)readAstat;
{
    Boolean hasAstat = [self.byte readBoolean] ;
    if (hasAstat) {
        float midu = [self.byte readFloat];
        float aPosx = [self.byte readFloat];
        float aPosy = [self.byte readFloat];
        float aPosz = [self.byte readFloat];
        
        int tw = [self.byte readInt ];
        int th = [self.byte readInt ];
        
        NSLog(@"%d=%d",tw,th);
        
        float heightScaleNum= [self.byte readFloat];
        [self readAstarFromByte:self.byte];
        [self readAstarFromByte:self.byte];
        for (int i = 0; i < th; i++) {
            for (int j = 0; j < tw; j++) {
                [self.byte readShort ];
            }
            
        }
    }
    
}
-(void)readTerrainIdInfoBitmapData:(ByteArray *)byteSrc;
{
    int  len = [byteSrc readInt];
    if (len) {
        NSData *bmpNsdata=  [self.byte getNsDataByLen:len];
        ByteArray *materByte=  [[ByteArray alloc]init:bmpNsdata];
    }
    
}
 
-(void)readAstarFromByte:(ByteArray *)byteSrc
{
    int  len = [byteSrc readUnsignedInt];
    int intLen = ceil(((double)len) / 32.0);
    for (int i = 0; i < intLen; i++) {
        [byteSrc readUnsignedInt];
        for (int j = 0; j < 32; j++) {
            
        }
    }
    
}


@end
