import 'package:flutter/material.dart';
import 'dart:math';
import 'package:flutter/rendering.dart';
import 'package:flutterone/src/Vect3d.dart';

void main() => runApp(MaterialApp(home: new MainPage()));

class MainPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
//    debugPaintSizeEnabled = true;

    //final String bannerImg='http://img2.imgtn.bdimg.com/it/u=2134092665,3141066907&fm=26&gp=0.jpg';
    final String bannerImg =
        'https://jilioss.oss-cn-hongkong.aliyuncs.com/rb_ios/a/res/base/brdf_ltu.jpg';

    // TODO: implement build
    return Scaffold(
      appBar: new AppBar(
        title: Text('当前'),
      ),
      body: GridView.builder(
//            gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
//                crossAxisCount: 2, childAspectRatio: 2 / 3),
          gridDelegate: SliverGridDelegateWithMaxCrossAxisExtent(
              maxCrossAxisExtent: 100, childAspectRatio: 2 / 3),
          itemBuilder: (context, idx) {
            return Card(
                child: Container(
                  color: Colors.greenAccent,
                  child: Text('index$idx'),
                  height: 100,
                ));
          }),
      bottomNavigationBar: BottomNavigationBar(
        type: BottomNavigationBarType.fixed,
        items: [
          BottomNavigationBarItem(
            icon: Icon(Icons.add,color: Colors.black54,),
            title: Text("可已",style: TextStyle(color: Colors.black),),
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.account_circle,color: Colors.black54,),
            title: Text("德旺",style: TextStyle(color: Colors.black),),
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.close,color: Colors.black54,),
            title: Text("中新",style: TextStyle(color: Colors.black),),
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.build,color: Colors.black54,),
            title: Text("我的",style: TextStyle(color: Colors.black),),
          )

        ],
      ),
    );
  }
}
/*
   gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                crossAxisCount: 2, childAspectRatio: 2 / 3
    itemBuilder: (context,idx)){
    return Card(Text('tess'));
    }
 */
/*
<Widget>[
            Container(
              color: getColor(),
              width: 100.0,
              height: 100.0,
            ),
            Container(
              margin: EdgeInsets.only(left: 10.0),
              color: Colors.blue,
              width: 100.0,
              height: 100.0,
            )
          ],
 */
