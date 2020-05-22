import 'dart:math';

import 'package:flutter/material.dart';

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

  Widget _tabBarView() {
    return TabBarView(
      controller: tabController,
      children: tabTitles.map((item) {
        return Container(
//          color: _getColor(),
          child: Row(
            children: <Widget>[
              Container(
                width: ScreenUtil().scaleWidth * 300,
                color: Colors.red,
                child: ListTabelView(),
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

  Widget ShopGridViewCellCopy(context,idx) {
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

  Widget ShopGridViewCell() {
    Container ctx = new Container(
      color: Colors.white,
      child: new Expanded(
          child: new Column(
        children: <Widget>[
          Icon(
            Icons.add,
            color: Colors.pink,
            size: 24.0,
            semanticLabel: 'Text to announce in accessibility modes',
          ),
          new Text(
            '601钻石',
            style: new TextStyle(
              color: Colors.black,
            ),
          ),
        ],
      )),
    );

    return ctx;

    return IconButton(
      onPressed: () {
        showAboutDialog(
//         context: context,
          applicationVersion: 'August 2019',
          children: aboutBoxChildren,
        );
      },
      icon: Image.asset(
        'lib/images/com_diamond_1@3x.png',
        height: 30.0,
        width: 50.0,
        fit: BoxFit.cover,
      ),
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
