// Flutter code sample for AboutListTile

// This sample shows two ways to open [AboutDialog]. The first one
// uses an [AboutListTile], and the second uses the [showAboutDialog] function.

import 'package:flutter/material.dart';


/// This Widget is the main application widget.
class ShowAboutView extends StatelessWidget {
  static const String _title = '显示提示框';

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: _title,
      home: MyStatelessWidget(),
    );
  }
}

/// This is the stateless widget that the main application instantiates.
class MyStatelessWidget extends StatelessWidget {
  MyStatelessWidget({Key key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final TextStyle textStyle = Theme.of(context).textTheme.bodyText2;
    final List<Widget> aboutBoxChildren = <Widget>[
      SizedBox(height: 24),
      RichText(
        text: TextSpan(
          children: <TextSpan>[
            TextSpan(
                style: textStyle,
                text: 'Flutter is Googleâ t '),
            TextSpan(
                style: textStyle.copyWith(color: Theme.of(context).accentColor),
                text: 'http://www.baidu.com'),
            TextSpan(style: textStyle, text: '.'),
          ],
        ),
      ),
    ];

    return Scaffold(
      appBar: AppBar(
        title: Text('Show About Example'),
      ),
      drawer: Drawer(
        child: SingleChildScrollView(
          child: SafeArea(
            child: AboutListTile(
              icon: Icon(Icons.info),
              applicationIcon: FlutterLogo(),
              applicationName: 'Show 111 Example',
              applicationVersion: 'August 2019',
              applicationLegalese: 'Â© 2014 The Flutter Authors',
              aboutBoxChildren: aboutBoxChildren,
            ),
          ),
        ),
      ),
      body: Container(

        child: RaisedButton(

          child: Text('提示按钮'),
          onPressed: () {
            showAboutDialog(
              context: context,
//              applicationIcon: FlutterLogo(),
//              applicationName: 'ShowT8时 Example',
              applicationVersion: 'August 2019',
//              applicationLegalese: 'Â© 2014 The Flutter Authors',
              children: aboutBoxChildren,
            );
          },
        ),
      ),
    );
  }
}
