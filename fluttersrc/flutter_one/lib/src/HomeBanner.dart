import 'package:flutter/material.dart';
import 'package:flutter_swiper/flutter_swiper.dart';

class HomeBanerBase extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return new MaterialApp(
      title: 'Flutter Demo',
      theme: new ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: new MyHomePage(title: '显示Banner'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  MyHomePage({Key key, this.title}) : super(key: key);

  final String title;

  @override
  _MyHomePageState createState() => new _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  @override
  Widget build(BuildContext context) {
    return new Scaffold(
        appBar: new AppBar(
          title: new Text(widget.title),
        ),
        body: Column(
          children: <Widget>[
            Container(
              margin: EdgeInsets.only(left: 0.0),
              color: Colors.yellow,
              width: 400.0,
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
            Container(
              color: Colors.black,
              width: 400.0,
              height: 30.0,
            ),
            Container(
              color: Colors.green,
              width: 400.0,
              height: 300.0,
              child: Row(
                children: <Container>[
                  Container(
                    color: Colors.blue,
                    width: 100.0,
                    height: 300.0,
                    child: ListView.builder(
                      itemCount: 20,
                      itemBuilder: (context, idx) {
                        print(idx);
                        return Card(
                            child: Container(
                          child: Text('$idx'),
                          height: 30,
                        ));
                      },
                    ),
                  ),
                  Container(
                    margin: EdgeInsets.only(left: 0.0),
                    color: Colors.yellow,
                    width: 220.0,
                    height: 300.0,
                    child: GridView.count(
                      crossAxisCount: 3,
                      childAspectRatio: 2 / 3,
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
                    ),
                  )
                ],
              ),
            ),
          ],
        ));
  }
}
