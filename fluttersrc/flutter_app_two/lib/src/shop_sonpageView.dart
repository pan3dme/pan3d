import 'dart:math';

import 'package:flutter/material.dart';
import 'package:flutterapptwo/src/shop_dataVo.dart';
import 'package:flutterapptwo/src/shop_gridpanel.dart';



typedef MenuCallBack = void Function(int position);

class MathSonPageView extends StatefulWidget {
  @override
  State<StatefulWidget> createState() => MathSonPageViewState();
}

class MathSonPageViewState extends State<MathSonPageView>
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
      children: dataItem.pageList.map((item) {
        return Container(
          child: ListGridPanel(item),
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
      tabs: this.dataItem.pageList.map((e) => Tab(text: e.tabName)).toList(),
    );
    return tabBar;
  }
}
