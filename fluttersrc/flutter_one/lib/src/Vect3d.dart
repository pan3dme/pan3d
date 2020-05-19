import 'package:flutter/material.dart';
import 'dart:math';
import 'package:flutter/rendering.dart';




class BottomNavigationPage extends StatefulWidget {
  @override
  BottomNavigationPageState createState() {
    return new BottomNavigationPageState();
  }
}

class BottomNavigationPageState extends State<BottomNavigationPage> {
  int index=0;
  List<Widget>pages=[Container(color: Colors.red,),Container(color: Colors.green,),Container(color: Colors.blue,),Container(color: Colors.white,)];
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        floatingActionButton: FloatingActionButton(
          child: Icon(Icons.forward),
          onPressed: () {
            setState(() {});
          },
        ),
        appBar: new AppBar(
          title: Text('HomePage2'),
        ),
        bottomNavigationBar: BottomNavigationBar(
          type: BottomNavigationBarType.fixed,
          currentIndex: index,
          onTap: (int idx) {
            index=idx;
            print("indx->$idx");
            setState(() {});
          },
          items: [
            BottomNavigationBarItem(
              icon: Icon(
                Icons.forward,
                color: Colors.black54,
              ),
              title: Text(
                "可已",
                style: TextStyle(color: Colors.black),
              ),
            ),
            BottomNavigationBarItem(
              icon: Icon(
                Icons.account_circle,
                color: Colors.black54,
              ),
              title: Text(
                "德旺",
                style: TextStyle(color: Colors.black),
              ),
            ),
            BottomNavigationBarItem(
              icon: Icon(
                Icons.calendar_today,
                color: Colors.black54,
              ),
              title: Text(
                "中新",
                style: TextStyle(color: Colors.black),
              ),
            ),
            BottomNavigationBarItem(
              icon: Icon(
                Icons.build,
                color: Colors.black54,
              ),
              title: Text(
                "我的",
                style: TextStyle(color: Colors.black),
              ),
            )
          ],
        ),
        body: pages[index]);
  }

  Color getColor() {
    return Color.fromARGB(255, Random().nextInt(255), Random().nextInt(255),
        Random().nextInt(255));
  }
}


class GridViewBuild extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
//    debugPaintSizeEnabled = true;

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

class HomePage12 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
//    debugPaintSizeEnabled = true;

    //final String bannerImg='http://img2.imgtn.bdimg.com/it/u=2134092665,3141066907&fm=26&gp=0.jpg';
    final String bannerImg =
        'https://jilioss.oss-cn-hongkong.aliyuncs.com/rb_ios/a/res/base/brdf_ltu.jpg';

    // TODO: implement build
    return Scaffold(
        appBar: new AppBar(
          title: Text('当前'),
        ),
        body: GridView.count(
          crossAxisCount: 3,
          childAspectRatio: 2/3,
          children: List.generate(
              100,
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
        ));
  }
}

class ListTabelView extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
//    debugPaintSizeEnabled=true;

    // TODO: implement build
    return Scaffold(
        appBar: new AppBar(
          title: Text('当前'),
        ),
        body: ListView.builder(
          itemCount: 2,
          itemBuilder: (context, idx) {
            print(idx);
            return Card(
                child: Container(
              child: Text('$idx'),
              height: 100,
            ));
          },
        ));
  }
}

class HomePage10 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
//    debugPaintSizeEnabled = true;

    // TODO: implement build
    return Scaffold(
        appBar: new AppBar(
          title: Text('当前'),
        ),
        body: Image.asset('lib/images/dt_xihuan_hong.png',
          height: 200.0,
          width: 200.0,
          fit: BoxFit.none ,)
    );
  }
}



class HomePage9 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
//    debugPaintSizeEnabled = true;

    //final String bannerImg='http://img2.imgtn.bdimg.com/it/u=2134092665,3141066907&fm=26&gp=0.jpg';
    final String bannerImg =
        'https://jilioss.oss-cn-hongkong.aliyuncs.com/rb_ios/a/res/base/brdf_ltu.jpg';

    // TODO: implement build
    return Scaffold(
      appBar: new AppBar(
        title: Text('当前'),
      ),
      body: Image.network(
        bannerImg,
        height: 200.0,
        width: 500,
        fit: BoxFit.none ,
        alignment: Alignment.bottomCenter,
      ),
    );
  }
}


class HomePage1 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    // TODO: implement build
    return Scaffold(
        appBar: new AppBar(
          title: Text('HomePage1'),
        ),
        body: Row(
          children: <Widget>[
            Container(
              color: Colors.black,
              width: 100.0,
              height: 100.0,
            ),
            Container(
              margin: EdgeInsets.only(left: 10.0),
              color: Colors.yellow,
              width: 100.0,
              height: 100.0,
            )
          ],
        ));
  }
}

class HomePage2 extends StatefulWidget {
  @override
  HomePage2State createState() {
    return new HomePage2State();
  }
}

class HomePage2State extends State<HomePage2> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        floatingActionButton: FloatingActionButton(
          child: Icon(Icons.forward),
          onPressed: () {
            setState(() {});
          },
        ),
        appBar: new AppBar(
          title: Text('HomePage2'),
        ),
        body: Row(
          children: <Widget>[
            Container(
              color: getColor(),
              width: 100.0,
              height: 100.0,
            ),
            Container(
              margin: EdgeInsets.only(left: 10.0),
              color: Colors.blue,
              width: 100.0,
              height: 100.0,
            )
          ],
        ));
  }

  Color getColor() {
    return Color.fromARGB(255, Random().nextInt(255), Random().nextInt(255),
        Random().nextInt(255));
  }
}

class HomePage3 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    // TODO: implement build
    return Scaffold(
        appBar: new AppBar(
          title: Text('HomePage3'),
        ),
        body: Row(
          children: <Widget>[
            Text(
              'Demo',
              style: TextStyle(
                  fontSize: 20.0,
                  fontWeight: FontWeight.w700,
                  color: Colors.green,
                  fontStyle: FontStyle.italic),
            )
          ],
        ));
  }
}

class HomePage4 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
//    debugPaintSizeEnabled=true;
    // TODO: implement build
    return Scaffold(
        appBar: new AppBar(
          title: Text('当前'),
        ),
        body: Container(
          margin: EdgeInsets.all(20),
          padding: EdgeInsets.only(left: 10, right: 10, bottom: 10, top: 10),

          //  decoration: BoxDecoration(color: Colors.red,borderRadius: BorderRadius.circular(10.0)),

          color: Colors.greenAccent,
          child: Text("我来了我3来了"),
        ));
  }
}

class HomePage5 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    debugPaintSizeEnabled = true;
    // TODO: implement build
    return Scaffold(
        appBar: new AppBar(
          title: Text('当前'),
        ),
        body: SizedBox(
          width: 100,
          height: 100,
          child: Card(
            child: Text('TestDemo'),
          ),
        ));
  }
}

class HomePage6 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    //debugPaintSizeEnabled=true;

    TextEditingController txtcontroller = new TextEditingController();
    // TODO: implement build

    return Scaffold(
        appBar: new AppBar(
          title: Text('当前'),
        ),
        body: TextField(
          controller: txtcontroller,
          onChanged: (text) {
            print('onchange=>' + text);
          },
          onEditingComplete: () {
            print('绑定文本->' + txtcontroller.text);
          },
          decoration: new InputDecoration(
            icon: Icon(Icons.calendar_today),
            labelText: '日期',
            focusedBorder: UnderlineInputBorder(
                borderSide: BorderSide(color: Colors.black54)),
            helperText: '输入日期',
            suffix: IconButton(
              icon: Icon(Icons.close),
              onPressed: () {
                FocusScope.of(context).requestFocus(new FocusNode());

                txtcontroller.text = '';
              },
            ),
          ),
        ));
  }
}

class HomePage7 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    //debugPaintSizeEnabled=true;

    TextEditingController txtcontroller = new TextEditingController();
    // TODO: implement build

    return Scaffold(
        appBar: new AppBar(
          title: Text('当前'),
        ),
        body: ListView(
          children: List.generate(
              1000,
                  (index) => Card(
                child: Container(
                  height: 150,
                  color: Colors.greenAccent,
                  child: Text('$index'),
                ),
              )),
        ));
  }
}


class HomePage8 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
//    debugPaintSizeEnabled=true;

    // TODO: implement build
    return Scaffold(
        appBar: new AppBar(
          title: Text('当前'),
        ),
        body: ListView.builder(
          itemCount: 10,
          itemBuilder: (context, idx) {
            print(idx);
            return Card(
                child: Container(
                  child: Text('$idx'),
                  height: 100,
                ));
          },
        ));
  }
}
