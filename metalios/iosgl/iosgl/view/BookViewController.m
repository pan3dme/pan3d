//
//  BookViewController.m
//  iosgl
//
//  Created by pan3dme on 2021/3/15.
//  Copyright © 2021 zhao. All rights reserved.
//

#import "BookViewController.h"

@interface BookViewController ()

@end

@implementation BookViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    
    self.elementToParse = [[NSArray alloc] initWithObjects:@"title",@"author",@"summary", nil];
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}
 
- (void) parser:(NSXMLParser *)parser didStartElement:(NSString *)elementName namespaceURI:(NSString *)namespaceURI qualifiedName:(NSString *)qName attributes:(NSDictionary *)attributeDict {
    if([elementName isEqualToString:@"Books"]) {
        //Initialize the array.
        //在这里初始化用于存储最终解析结果的数组变量,我们是在当遇到Books根元素时才开始初始化
        self.books = [[NSMutableArray alloc] init];
        }
    else if([elementName isEqualToString:@"Book"]) {
        
        //Initialize the book.
        //当碰到Book元素时，初始化用于存储Book信息的实例对象aBook
        
        self.aBook = [[Book alloc] init];
        
        //Extract the attribute here.
        //从attributeDict字典中读取Book元素的属性
        
        self.aBook.bookID = [[attributeDict objectForKey:@"id"] integerValue];
        
        NSLog(@"ID:%i", self.aBook.bookID);
        }
    self.storingFlag = [self.elementToParse containsObject:elementName];  //判断是否存在要存储的对象
}
 
- (void) parser:(NSXMLParser *)parser foundCharacters:(NSString *)string {
    // 当用于存储当前元素的值是空时，则先用值进行初始化赋值
    // 否则就直接追加信息
    if (self.storingFlag) {
        if (!self.currentElementValue) {
            self.currentElementValue = [[NSMutableString alloc] initWithString:string];
        }
        else {
            [self.currentElementValue appendString:string];
        }
    }
    
}
 
// 这里才是真正完成整个解析并保存数据的最终结果的地方
- (void) parser:(NSXMLParser *)parser didEndElement:(NSString *)elementName namespaceURI:(NSString *)namespaceURI qualifiedName:(NSString *)qName {
    
    if ([elementName isEqualToString:@"Book"]) {
        [self.books addObject:self.aBook];
        self.aBook = nil;
    }
    
    if (self.storingFlag) {
        //去掉字符串的空格
        NSString *trimmedString = [self.currentElementValue stringByTrimmingCharactersInSet:[NSCharacterSet whitespaceAndNewlineCharacterSet]];
        
        //将字符串置空
        [self.currentElementValue setString:@""];
        
        if ([elementName isEqualToString:@"title"]) {
            self.aBook.title = trimmedString;
            NSLog(@"title :%@",self.aBook.title);
        }
        if ([elementName isEqualToString:@"author"]) {
            self.aBook.author = trimmedString;
            NSLog(@"author :%@",self.aBook.author);
        }
        if ([elementName isEqualToString:@"summary"]) {
            self.aBook.summary = trimmedString;
            NSLog(@"summary :%@",self.aBook.summary);
        }
    }
    
}
 
- (IBAction)xmlButton:(id)sender {
    //打开xml文件，读取数据到NSData
    NSString *path = [[NSBundle mainBundle] pathForResource:@"Books" ofType:@"xml"];
    NSFileHandle *file = [NSFileHandle fileHandleForReadingAtPath:path];
    NSData *data = [file readDataToEndOfFile];
    [file closeFile];
    
    //测试从xml接受到的数据
    NSString *dataString = [[NSString alloc] initWithData:data encoding:NSUTF8StringEncoding];
    NSLog(@"%@",dataString);
    
    NSXMLParser *m_parser = [[NSXMLParser alloc] initWithData:data];
    //设置该类本身为代理类，即该类在声明时要实现NSXMLParserDelegate委托协议
    [m_parser setDelegate:self];  //设置代理为本地
    
    BOOL flag = [m_parser parse]; //开始解析
    if(flag) {
        NSLog(@"解析指定路径的xml文件成功");
    }
    else {
        NSLog(@"解析指定路径的xml文件失败");
    }
}

 

@end
