import 'dart:math';

import 'package:flutter/material.dart';
import 'package:flutter_swiper/flutter_swiper.dart';
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
  double sceneWidth=300;
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
          child: _diamondPageListView(),
          /*
          child: Center(
          child: Text(item,
              style: TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.bold,
                  color: Colors.white)),
        ),

           */
        );
      }).toList(),
    );
  }
  Widget _diamondPageListView() {
    return Column(children: <Widget>[
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

    ]);
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
