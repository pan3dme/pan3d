import 'dart:math';

import 'package:flutter/material.dart';
import 'package:flutterone/src/base/BaseColumnView.dart';

class MathSonPageView extends StatefulWidget {
  @override
  State<StatefulWidget> createState() => MathSonPageViewState();
}

class MathSonPageViewState extends State<MathSonPageView>
    with SingleTickerProviderStateMixin {
  TabController tabController;

  List tabs = ['微1信', '支付宝', '银1联', '闪1付']; // 顶部导航栏
  List<String> tabTitles = [
    "tab1",
    "tab2",
    "tab3",
    "tab4",
  ];
  List<String> smartList = [
    "aaa",
    "bbb",
    "ccc",
    "ddd",
    "aaa",
    "bbb",
    "ccc",
    "ddd",
  ];
  final List<Widget> aboutBoxChildren = <Widget>[
    SizedBox(height: 24),
    RichText(
      text: TextSpan(
        children: <TextSpan>[
          TextSpan(text: 'Flutter is Googleâ t '),
          TextSpan(text: 'http://www.baidu.com'),
        ],
      ),
    ),
  ];

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

  Widget _LeftListTabs() {
    return new Container(
      width: 100,
      height: 100,
      color: Colors.red,
    );
  }

  Widget _tabBarView() {
    return TabBarView(
      controller: tabController,
      children: tabTitles.map((item) {
        return Container(
//          color: _getColor(),
          child: Row(
            children: <Widget>[
              Container(
                width: 100,
                color: Colors.red,
                child: BaseColumnView(),
              ),
              LimitedBox(
                maxWidth: 275,
                maxHeight: double.infinity,
                child: GridView.count(
                  crossAxisCount: 3,
                  childAspectRatio: 1,
                  children: List.generate(
                      smartList.length,
                      (idx) => Card(
                            color: _getColor(),
                            child: IconButton(
                              onPressed: () {
                                showAboutDialog(
                                  context: context,
                                  applicationVersion: 'August 2019',
                                  children: aboutBoxChildren,
                                );
                              },
                              icon: Image.asset(
                                'lib/images/dt_xihuan_hong.png',
                                height: 50.0,
                                width: 50.0,
                                fit: BoxFit.cover,
                              ),
                            ),
                          )),
                ),
              ),
            ],
          ),
        );
      }).toList(),
    );
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

  buildTabBar() {
    Widget tabBar = new TabBar(
      controller: tabController,
      tabs: tabs.map((e) => Tab(text: e)).toList(),
    );
    return tabBar;
  }
}
