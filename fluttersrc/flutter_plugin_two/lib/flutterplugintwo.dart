import 'dart:async';

import 'package:flutter/services.dart';

class Flutterplugintwo {
  static const MethodChannel _channel =
      const MethodChannel('flutterplugintwo');

  static Future<String> get platformVersion async {
    final String version = await _channel.invokeMethod('getPlatformVersion');
    return version;
  }
}
