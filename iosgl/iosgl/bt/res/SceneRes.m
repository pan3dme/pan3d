//
//  SceneRes.m
//  iosgl
//
//  Created by zhao on 12/12/2019.
//  Copyright © 2019 zhao. All rights reserved.
//

#import "SceneRes.h"
#import "ByteArray.h"

@interface SceneRes ()

 

 
@end
@implementation SceneRes
-(void)load:(NSString *)url Block:(void (^)(NSDictionary* ))block;
{
    NSString *path=  [[NSBundle mainBundle]pathForResource:url ofType:@"txt"];
    NSData *reader = [[NSData alloc] initWithContentsOfFile:path];
    NSLog(@"-----length----%lu",   reader.length);
    self.byte=[[ByteArray alloc]init:reader];
    [self loadComplete:self.byte];
    block([[NSDictionary alloc]init]);
   
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
/*
private readTerrainIdInfoBitmapData($byte: Pan3dByteArray): void {
            var $len: number = $byte.readInt();
            if ($len) {
                //var newByte: ByteArray = new ByteArray();
                //newByte.length = $len;
                //$byte.readBytes(newByte, 0, $len);

                var zipLen: number = $len
                var aryBuf: ArrayBuffer = $byte.buffer.slice($byte.position, $byte.position + zipLen);
                $byte.position += zipLen;
                var zipedBuf: ArrayBuffer = unZip(aryBuf)
                var newByte: Pan3dByteArray = new Pan3dByteArray(zipedBuf);

                this._terrainDataItem = GroundDataMesh.meshAllgroundData(newByte);
            }

        }
*/
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
