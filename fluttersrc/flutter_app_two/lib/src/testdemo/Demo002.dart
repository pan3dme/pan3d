import 'package:flutter/material.dart';
import 'package:flutterapptwo/src/core/mathclass.dart';
import 'package:flutterapptwo/src/shop/shop_dataVo.dart';
import 'package:flutterapptwo/src/testdemo/Demo001.dart';


/*
测试TABBAR
 */

class Demo002 extends StatefulWidget {
  @override
  State<StatefulWidget> createState() => Demo002State();
}

class Demo002State extends State<Demo002>
    with SingleTickerProviderStateMixin {
  TabController tabController;

  BaseDataItem dataItem = new BaseDataItem();

  void initState() {
    super.initState();
    tabController = TabController(
        initialIndex: 0, length: dataItem.pageList.length, vsync: this);
  }

  @override
  Widget build(BuildContext context) {
    // MediaQueryData mediaQuery = MediaQuery.of(context);
    return DefaultTabController(
      length: dataItem.pageList.length,
      child: Scaffold(
        appBar: AppBar(
          // Here we take the value from the MyHomePage object that was created by
          // the App.build method, and use it to set our appbar title.
          title: Text('demo2'),
        ),

        body:  Column(children: <Widget>[
          Container(color: Colors.green,height: 100,),
          Expanded(child:  Demo002_TabBarview(),),
        ]),
      ),
    );
  }




}



class Demo002_TabBarview extends StatefulWidget {
  @override
  State<StatefulWidget> createState() => Demo002_TabBarviewState();
}

class Demo002_TabBarviewState extends State<Demo002_TabBarview>
    with SingleTickerProviderStateMixin {
  TabController tabController;

  List tabs = ['钻石', '筹码', '座驾', '会员']; // 顶部导航栏

  void initState() {
    super.initState();
    tabController = TabController(
        initialIndex: 0, length:tabs.length, vsync: this);
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

  Widget _tabBarView() {
    return TabBarView(
      controller: tabController,
      children:tabs.map((item) {
        return Container(
          child:Text('a'),
        );
      }).toList(),
    );
  }

  buildTabBar() {
    Widget tabBar = new TabBar(
      controller: tabController,
      tabs: this.tabs.map((e) => Tab(text: e)).toList(),
    );
    return tabBar;
  }
}
