import 'package:flutter/material.dart';
import 'dart:math';
import 'package:flutter/rendering.dart';

void main() => runApp(MaterialApp(home: new HomePage()));

class HomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    //debugPaintSizeEnabled=true;

    TextEditingController txtcontroller=new TextEditingController();
    // TODO: implement build

    return Scaffold(
        appBar: new AppBar(
          title: Text('当前'),
        ),
        body: TextField(
          controller: txtcontroller,
          onChanged: (text) {
            print('onchange=>'+text);
          },
          onEditingComplete: (){
//            print('onEditingComplete');
            print('绑定文本->'+txtcontroller.text);
          },
//          onSubmitted: (text){
//            print('onSubmitted'+text);
//          },
          decoration: new InputDecoration(
            icon: Icon(Icons.calendar_today),
            labelText: '日期',
            focusedBorder: UnderlineInputBorder(
                borderSide: BorderSide(color: Colors.black54)),
            helperText: '输入日期',
//            suffix: Icon(Icons.remove),
            suffixIcon: Icon(Icons.close),
          ),
        ));
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
