import 'dart:math';

import 'package:flutter/material.dart';
import 'package:flutter_swiper/flutter_swiper.dart';
import 'package:flutterapptwo/src/core/mathclass.dart';
import 'package:flutterapptwo/src/shop/shop_sonpageView.dart';



class ShopMainView extends StatefulWidget {
  @override
  State<StatefulWidget> createState() => ShopMainViewState();
}

class ShopMainViewState extends State<ShopMainView>
    with SingleTickerProviderStateMixin {
  TabController tabController;

  List tabs = ['钻石', '筹码', '座驾', '会员']; // 顶部导航栏
  List<String> tabTitles = [
    "tab1",
    "tab2",
    "tab3",
    "tab4",
  ];

  bool haveGonggao = true;
  double sceneWidth = 300;

  void initState() {
    super.initState();
    tabController =
        TabController(initialIndex: 0, length: tabs.length, vsync: this);
  }

  @override
  Widget build(BuildContext context) {
    // MediaQueryData mediaQuery = MediaQuery.of(context);
    return DefaultTabController(
      length: tabs.length,
      child: Scaffold(
        appBar: PreferredSize(
          child: AppBar(
            bottom: buildTabBar(),
          ),
          preferredSize: Size.fromHeight(50),
        ),
        body: TabBarView(
          controller: tabController,
          children: tabTitles.map((tabstr) {
            return Container(
                color: _getColor(),
                child: Column(children: <Widget>[
                  MakeBaseBaner(tabstr),

                  Expanded(child: MakeSonPageView(tabstr))
                ]));
          }).toList(),
        ),
      ),
    );
  }

  Widget MakeBaseBaner(tabStr) {
    var content;
    content = Container(
//              margin: EdgeInsets.all(0.0),
      color: Colors.yellow,
      height: 135.0,
      child: new Swiper(
        itemBuilder: (BuildContext context, int index) {
          return new Image.network(
            "http://via.placeholder.com/350x150",
            fit: BoxFit.fill,
          );
        },
        itemCount: 3,
      ),
    );

    return content;
  }

  Widget MakeSonPageView(tabStr) {
    var content;
    if (tabStr == "tab1") {
      haveGonggao = true;
    } else {
      haveGonggao = false;
    }
//    haveGonggao = true;
    if (haveGonggao) {
      content = Container(
        margin: EdgeInsets.all(0.0),
        height: 300,
        color: Colors.white10,
        child: MathSonPageView(),
      );
    } else {
      //当数据为空我们需要隐藏这个Text
      //我们又不能返回一个null给当前的Widget Tree
      //只能返回一个长宽为0的widget占位
      content = new Container(height: 0.0, width: 0.0);
    }
    return content;
  }

  Widget gonggaoBoxView(tabStr) {
    var content;
    if (tabStr == "tab1" || tabStr == "tab3") {
      haveGonggao = true;
    } else {
      haveGonggao = false;
    }
//    haveGonggao = true;
    if (haveGonggao) {
      //如果数据不为空，则显示Text
      content = Container(
        margin: EdgeInsets.all(0.0),
        height: 30,
        color: Colors.white10,
        child: Text('这里显示公告$tabStr示公告数据这里显'),
      );
    } else {
      //当数据为空我们需要隐藏这个Text
      //我们又不能返回一个null给当前的Widget Tree
      //只能返回一个长宽为0的widget占位
      content = new Container(height: 0.0, width: 0.0);
    }
    return content;
  }

  Color _getColor() {

    return MathClass.getRandomColor();
  }

  buildTabBar() {
    Widget tabBar = TabBar(
      isScrollable: true,
      unselectedLabelStyle: TextStyle(
        fontSize: 15,
      ),
      labelStyle: TextStyle(
        fontSize: 16,
      ),
      labelColor: Colors.black,
      unselectedLabelColor: Colors.black54,
      indicatorColor: Colors.red, // 设置指示器颜色
      indicatorWeight: 3, // 设置指示器厚度
      indicatorSize: TabBarIndicatorSize.label,
      controller: tabController,
      tabs: tabs.map((e) => Tab(text: e)).toList(),
    );
    return tabBar;
  }
}
