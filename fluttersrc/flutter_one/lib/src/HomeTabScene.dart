import 'dart:math';

import 'package:flutter/material.dart';
import 'package:flutter_swiper/flutter_swiper.dart';
import 'package:flutterone/main.dart';
import 'package:flutterone/src/AppBarBottom.dart';

class HomeTabScene extends StatefulWidget {
  @override
  State<StatefulWidget> createState() => HomeSceneState();
}

class HomeSceneState extends State<HomeTabScene>
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
        body: _tabBarView(),
        /*
        body: Column(children: <Widget>[
          Container(
            margin: EdgeInsets.only(left: 0.0),
            color: Colors.yellow,
            height: 100.0,
            child: new Swiper(
              itemBuilder: (BuildContext context, int index) {
                return new Image.network(
                  "http://via.placeholder.com/350x150",
                  fit: BoxFit.fill,
                );
              },
              itemCount: 3,
            ),
          ),

        ]),
        */
      ),
    );
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

  Widget _tabBarView() {
    return TabBarView(
      controller: tabController,
      children: tabTitles.map((item) {
        return Container(
          color: _getColor(),
          child: _banerSwiper(),
        );
      }).toList(),
    );
  }

  Widget _banerSwiper() {
    return Column(children: <Widget>[
      Container(
        margin: EdgeInsets.all(0.0),
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
      ),
      gonggaoBoxView(),
      Container(
        margin: EdgeInsets.all(0.0),
        color: Colors.yellow,
        height: 500,
        child: rightGridBoxView(),
      ),
    ]);
  }

  Widget rightGridBoxView() {
    var content = GridView.builder(
        gridDelegate: SliverGridDelegateWithMaxCrossAxisExtent(
            maxCrossAxisExtent: 125, childAspectRatio: 2 / 2),
        itemBuilder: (context, idx) {
          return Card(
              child: Container(
            color: Colors.red,
            child: Text('index$idx'),
            height: 125,
          ));
        });

    return content;
  }

  Widget gonggaoBoxView() {
    var content;
    if (haveGonggao) {
      //如果数据不为空，则显示Text
      content = Container(
        margin: EdgeInsets.all(0.0),
        height: 30,
        color: Colors.white10,
        child: Text('这里显示公告数据这里显示公告数据这里显'),
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
    var random = new Random();
    int r = random.nextInt(255);
    int g = random.nextInt(255);
    int b = random.nextInt(255);
    print(r);
    print(g);
    print(b);
    return Color.fromARGB(255, r, g, b);
  }
}
