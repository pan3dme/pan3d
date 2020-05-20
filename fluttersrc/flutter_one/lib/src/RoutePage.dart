import 'package:flutter/material.dart';
import 'dart:math';
import 'package:flutter/rendering.dart';
import 'package:flutterone/src/Vect3d.dart';

class RoutePageView extends StatefulWidget {
  @override
  RoutePageViewState createState() {
    return new RoutePageViewState();
  }
}

class RoutePageViewState extends State<RoutePageView> {
  int index = 0;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: new AppBar(
          title: Text('page1'),
        ),
        floatingActionButton: FloatingActionButton(
          onPressed: () {
//          Navigator.pushNamed(context, '/page2');

            Navigator.of(context).push(MaterialPageRoute(builder: (context) {
              return Router2(
                textData: "fukcjusttobi",
              );
            })).then((value){
              print(value);
            });
          },
        ),
        body: Container(
          color: getColor(),
        ));
  }

  Color getColor() {
    return Color.fromARGB(255, Random().nextInt(255), Random().nextInt(255),
        Random().nextInt(255));
  }
}

class Router2 extends StatelessWidget {
  @override
  final String textData;
  Router2({Key key, @required this.textData}) : super(key: key);
  Widget build(BuildContext context) {
//    debugPaintSizeEnabled = true;
    // TODO: implement build
    return Scaffold(
        floatingActionButton: FloatingActionButton(
          onPressed: () {
            // Navigator.pushNamed(context, '/');

            Navigator.pop(context, 'qqqqqqqq');
          },
        ),
        appBar: new AppBar(
          title: Text('page2'),
        ),
        body: Text('$textData'));
  }
}
