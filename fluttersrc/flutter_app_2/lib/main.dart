import 'package:flutter/material.dart';
import 'package:flutter_alipay/flutter_alipay.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        // This is the theme of your application.
        //
        // Try running your application with "flutter run". You'll see the
        // application has a blue toolbar. Then, without quitting the app, try
        // changing the primarySwatch below to Colors.green and then invoke
        // "hot reload" (press "r" in the console where you ran "flutter run",
        // or simply save your changes to "hot reload" in a Flutter IDE).
        // Notice that the counter didn't reset back to zero; the application
        // is not restarted.
        primarySwatch: Colors.blue,
        // This makes the visual density adapt to the platform that you run
        // the app on. For desktop platforms, the controls will be smaller and
        // closer together (more dense) than on mobile platforms.
        visualDensity: VisualDensity.adaptivePlatformDensity,
      ),
      home: MyHomePage(title: 'Flutter 003 Home Page'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  MyHomePage({Key key, this.title}) : super(key: key);

  // This widget is the home page of your application. It is stateful, meaning
  // that it has a State object (defined below) that contains fields that affect
  // how it looks.

  // This class is the configuration for the state. It holds the values (in this
  // case the title) provided by the parent (in this case the App widget) and
  // used by the build method of the State. Fields in a Widget subclass are
  // always marked "final".

  final String title;

  @override
  _MyHomePageState createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  int _counter = 0;

  void _incrementCounter() {
    setState(() {
      // This call to setState tells the Flutter framework that something has
      // changed in this State, which causes it to rerun the build method below
      // so that the display can reflect the updated values. If we changed
      // _counter without calling setState(), then the build method would not be
      // called again, and so nothing would appear to happen.
      _counter++;
    });
  }

  String _payInfo = "ccavet";
  AlipayResult _payResult;
  callAlipay() async {
    dynamic payResult;

    _payInfo= "alipay_sdk=alipay-sdk-php-20161101&app_id=2021001134646627&biz_content=%7B%22out_trade_no%22%3A%2220200604004524281%22%2C%22total_amount%22%3A300%2C%22product_code%22%3A%22QUICK_MSECURITY_PAY%22%2C%22subject%22%3A%22%E5%85%85%E5%80%BC300%E5%85%83%22%7D&charset=utf-8&format=json&method=alipay.trade.app.pay&notify_url=https%3A%2F%2Fyilian.youshangmp.com%2FPay_Aliapp_notifyurl.html&sign_type=RSA2&timestamp=2020-06-04+00%3A45%3A24&version=1.0&sign=jWK5ceMMGu5nr%2BNRrpn9TH6dsrK%2Fb59qDuVuDKgJXHhl6KBx96n%2BP038m2g6z7JV0pBe8aWhVBoerMelwfxadD8phH1qClO7oQFLoPeDP1qBy3voi3p%2Fv0KqwbTKz%2Bvl4pkjw1Bn1jInQ9GboFHzUpAqEZXByVDJnn4m0cd5pPKoLzghcMr5mzw5ifFZ2mmX1ys74m%2F1oR0kmAJLbmN7443RicCSXp8eJIIbPs0ncL4jsLKaMEdOyMBuJC9RWwHN8Hhf%2BKkoyRg1TnXpV3xt2FWP5LeT85FcORbwL7a0JDQA3WPa5mAKQBRmNYQKeiEUjoy6j50yDGpVIfbpKHxu0g%3D%3D" ;
    try {
      print("The pay info is : " + _payInfo);
      payResult = await FlutterAlipay.pay(_payInfo);
    } on Exception catch (e) {
      payResult = null;
    }

    if (!mounted) return;

    setState(() {
      _payResult = payResult;
    });
  }

  linkAppAlipay() async {

  }

  @override
  Widget build(BuildContext context) {
    // This method is rerun every time setState is called, for instance as done
    // by the _incrementCounter method above.
    //
    // The Flutter framework has been optimized to make rerunning build methods
    // fast, so that you can just rebuild anything that needs updating rather
    // than having to individually change instances of widgets.
    return Scaffold(
      appBar: AppBar(
        // Here we take the value from the MyHomePage object that was created by
        // the App.build method, and use it to set our appbar title.
        title: Text(widget.title),
      ),
      body: Center(
        // Center is a layout widget. It takes a single child and positions it
        // in the middle of the parent.
        child: Column(
          // Column is also a layout widget. It takes a list of children and
          // arranges them vertically. By default, it sizes itself to fit its
          // children horizontally, and tries to be as tall as its parent.
          //
          // Invoke "debug painting" (press "p" in the console, choose the
          // "Toggle Debug Paint" action from the Flutter Inspector in Android
          // Studio, or the "Toggle Debug Paint" command in Visual Studio Code)
          // to see the wireframe for each widget.
          //
          // Column has various properties to control how it sizes itself and
          // how it positions its children. Here we use mainAxisAlignment to
          // center the children vertically; the main axis here is the vertical
          // axis because Columns are vertical (the cross axis would be
          // horizontal).
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Text(
              '支付方式选择:',
            ),
            Container(
                child: new RaisedButton(
                    child: new Text('打开支付1宝'), onPressed: callAlipay)),
            Container(
                child: new RaisedButton(
                    child: new Text('测试通道'), onPressed: linkAppAlipay))
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _incrementCounter,
        tooltip: 'Increment',
        child: Icon(Icons.add),
      ), // This trailing comma makes auto-formatting nicer for build methods.
    );
  }
}
