//
//  XmlMeshManneger.m
//  iosgl
//
//  Created by pan3dme on 2021/3/15.
//  Copyright © 2021 zhao. All rights reserved.
//

#import "XmlMeshManneger.h"

@implementation XmlMeshManneger


- (void)loadXML
{
    // 1. 从服务器获取数据 GET
    // 1) url
    NSURL *url = [NSURL URLWithString:@"http://192.168.3.251/~apple/itcast/videos.php?format=xml"];
    // 2) request
    NSURLRequest *request = [NSURLRequest requestWithURL:url cachePolicy:NSURLRequestUseProtocolCachePolicy timeoutInterval:2.0f];
    
    // 3) 连接同步，可以让用户先有内容可看
    NSError *error;
    // NSData存放的是二进制的数据
    NSData *data = [NSURLConnection sendSynchronousRequest:request returningResponse:nil error:&error];
    
    // 2. XML解析
    // 1) 解析器
    NSXMLParser *parser = [[NSXMLParser alloc] initWithData:data];
    // 2) 设置代理
    parser.delegate = self;
    
    // 3）开始解析
    [parser parse];
}
 
#pragma mark - XML解析方法
// 1. 开始解析文档，在这里做初始化工作
- (void)parserDidStartDocument:(NSXMLParser *)parser
{
    NSLog(@"开始解析文档");
    // 数组还没有被初始化，初始化数组
     
}
 
// 2.3.4会循环执行，一直到XML文档解析完毕
// 2. 解析一个节点
- (void)parser:(NSXMLParser *)parser didStartElement:(NSString *)elementName namespaceURI:(NSString *)namespaceURI qualifiedName:(NSString *)qName attributes:(NSDictionary *)attributeDict
{
    
}
 
// 3. 查找节点内容，可能会多次
- (void)parser:(NSXMLParser *)parser foundCharacters:(NSString *)string
{
   
}
 
// 4. 节点完成
- (void)parser:(NSXMLParser *)parser didEndElement:(NSString *)elementName namespaceURI:(NSString *)namespaceURI qualifiedName:(NSString *)qName
{
     
}
 
// 5. 解析完成，做收尾工作
- (void)parserDidEndDocument:(NSXMLParser *)parser
{
    NSLog(@"解析完成");
    
 
}
 
// 6. 解析出错，清理中间数据
- (void)parser:(NSXMLParser *)parser parseErrorOccurred:(NSError *)parseError
{
    NSLog(@"%@", parseError.localizedDescription);
    
    
}
 
@end
