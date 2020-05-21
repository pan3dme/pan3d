import 'dart:math';

import 'package:flutter/material.dart';
import 'package:flutter_swiper/flutter_swiper.dart';
import 'package:flutterone/main.dart';
import 'package:flutterone/src/base/BaseColumnView.dart';
import 'package:flutterone/src/old/AppBarBottom.dart';
import 'package:flutterone/src/old/MartPageView.dart';
import 'package:flutterone/src/old/Vect3d.dart';

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
  List zhifuMenuXml = ['钻a石', '筹b码', '座c驾', '会d员']; // 顶部导航栏
//  List zhifuMenuXml = ['支付宝', '人工充值', '云闪付', '微信', '网银中心']; // 顶部导航栏
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
//          color: _getColor(),
          child: Column(children: <Widget>[
            Container(
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
            ),
            gonggaoBoxView(item),
            Container(
              height: 48,
              child: AppBar(
                bottom: buildZhifuMenu(),
              ),
            ),
            Expanded(

              child: Container(
                color: Colors.red,
                child: Row(
                  children: <Widget>[
                   Container(width: 100, child:  BaseColumnView(),),
                    LimitedBox(
                      maxWidth: 275,
                      maxHeight: 999999,
                      child: GridView.count(
                        crossAxisCount: 3,
                        childAspectRatio: 1,
                        children: List.generate(
                            10,
                            (idx) => Card(
                                  child: Container(
                                    color: Colors.blue,
                                    child: Image.asset(
                                      'lib/images/dt_xihuan_hong.png',
                                      height: 50.0,
                                      width: 50.0,
                                      fit: BoxFit.none,
                                    ),
                                  ),
                                )),
                      ),
                    ),
                  ],
                ),
              ),
//        width: 300,
//              height: 200,
            ),
          ]),
        );
      }).toList(),
    );
  }

  buildZhifuMenu() {




    Widget tabBar = TabBar(
      tabs: zhifuMenuXml.map((e) => Tab(text: e)).toList(),
    );
    return tabBar;


  }

  /// 构建button
  Column _buildButtonColumn(BuildContext context, String label) {
    Color color = Theme.of(context).primaryColor;

    return Column(
//      mainAxisSize: MainAxisSize.min,
//      mainAxisAlignment: MainAxisAlignment.center,
      //列布局
      children: <Widget>[
        Text('abcd'),
        Container(
          margin: EdgeInsets.only(top: 8.0),
          child: Text(
            label,
            style: TextStyle(
              fontSize: 12.0,
              fontWeight: FontWeight.w400,
              color: color,
            ),
          ),
        )
      ],
    );
  }

  Widget _banerSwiper(item) {
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
      gonggaoBoxView(item),
      Container(
        margin: EdgeInsets.all(0.0),
        color: Colors.green,
//        width: 300,
        height: 100,
//        child: MartPageView(item),
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
