import 'package:flutter/material.dart';
import 'dart:math';

void main() => runApp(MaterialApp(home: new HomePage2()));

class HomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    // TODO: implement build
    return Scaffold(
        appBar: new AppBar(
          title: Text('我的Ap3p'),
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
          title: Text('我的Ap3p'),
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

/*
class HomePagetwo2 extends StatefulWidget
{
  @override
   HomePage2State creatState()=>HomePage2State();

}
class HomePage2State extends State<HomePagetwo2>{
  @override
  Widget build(BuildContext context)
  {
    return null;
  }


  */
