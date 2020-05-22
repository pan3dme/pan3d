

import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart';
import 'package:flutterone/src/markbase/MakeBaseView.dart';
import 'package:flutterone/src/old/AppBarBottom.dart';

import 'package:flutterone/src/old/HomeTabScene.dart';
import 'package:flutterone/src/old/RoutePage.dart';

import 'package:flutterone/src/old/Vect3d.dart';
import 'package:flutterone/src/base/BaseColumnView.dart';
import 'package:flutterone/src/base/BaseRowView.dart';
import 'package:flutterone/src/base/ShowAlrit.dart';


void main() => runApp(MaterialApp(routes: {
  '/': (context) {
    return MarkBaseView();
  },

  '/MarkBaseView': (context) { //综合
    return MarkBaseView();
  },
  '/HomeTabScene': (context) { //综合
    return HomeTabScene();
  },

  '/BaseColumnView': (context) {
    return BaseColumnView();
  },
  '/BaseRowView': (context) {
    return BaseRowView();
  },
  '/ShowAboutView': (context) {
    return ShowAboutView();
  },
  '/HomeTabScene': (context) {
    return HomeTabScene();
  },
  '/AppBarBottomSample': (context) {
    return AppBarBottomSample();
  },
  '/RoutePageView': (context) {
    return RoutePageView();
  },
  '/page2': (context) {
    return Router2();
  },
}));


//void main() => runApp(MaterialApp(home: new AppBarBottomSample()));

class GridViewBuild extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    //debugPaintSizeEnabled = true;

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
                color: Colors.red,
                child: Text('index$idx'),
                height: 100,
              ));
            }));
  }
}
