import 'dart:async';

import 'package:flutter/services.dart';

class Flutterpluginthree {
  static const MethodChannel _channel =
      const MethodChannel('flutterpluginthree');

  static Future<String> get platformVersion async {
    final String version = await _channel.invokeMethod('getPlatformVersion');
    return version;
  }
}
