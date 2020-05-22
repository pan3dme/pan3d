import 'dart:math';

import 'package:flutter/material.dart';
import 'package:flutterapptwo/src/base/BaseDataVo.dart';

import 'package:flutterapptwo/src/page/LeftListView.dart';
import 'package:flutterapptwo/src/unit/ScreenUtil.dart';

typedef MenuCallBack = void Function(int position);

class MathSonPageView extends StatefulWidget {
  @override
  State<StatefulWidget> createState() => MathSonPageViewState();
}

class MathSonPageViewState extends State<MathSonPageView>
    with SingleTickerProviderStateMixin {
  TabController tabController;

  BaseDataItem dataItem = new BaseDataItem();

  List<String> smartList = [
    "aaa",
    "bbb",
    "ccc",
    "ddd",
    "aaa",
    "bbb",
    "ccc",
    "ccc",
    "ddd",
    "aaa",
    "bbb",
    "ccc",
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
//          color: _getColor(),
          child: Row(
            children: <Widget>[
              Container(
                width: ScreenUtil().scaleWidth * 300,
                color: Colors.red,
                child: ListTabelView(item),
              ),
              Expanded(
                child: LimitedBox(
                  maxHeight: double.infinity,
                  child: GridView.count(
                    crossAxisCount: 3,
                    childAspectRatio: 0.9,
                    children: List.generate(
                        smartList.length,
                        (idx) => Card(
                              color: _getColor(),
                              child: ShopGridViewCellCopy(context, idx),
                            )),
                  ),
                ),
              ),
            ],
          ),
        );
      }).toList(),
    );
  }

  Widget ShopGridViewCellCopy(context, idx) {
    GestureDetector ctx = new GestureDetector(
//      color: Colors.white,
      onTapDown: (_) => {
        showAboutDialog(
          context: context,
          applicationVersion: '确认购买$idx',
          children: aboutBoxChildren,
        ),
      },
      child: new Container(
          child: new Column(children: <Widget>[
        Icon(
          Icons.add,
          color: Colors.pink,
          size: 24.0,
          semanticLabel: 'Text to announce in accessibility modes',
        ),
        new Text('60$idx钻石'),
        new Text('9$idx元')
      ])),
    );

    return ctx;
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
