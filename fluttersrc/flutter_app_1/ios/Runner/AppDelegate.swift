import UIKit
import Flutter

@UIApplicationMain
@objc class AppDelegate: FlutterAppDelegate {
  override func application(
    _ application: UIApplication,
    didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?
  ) -> Bool {
    GeneratedPluginRegistrant.register(with: self)
    return super.application(application, didFinishLaunchingWithOptions: launchOptions)
  }
    override func application(_application:UIApplication, open url:URL, sourceApplication:String?, annotation:Any) ->Bool{

     if(url.host=="safepay")//支付宝支付

            {

     return FlutterAlipayPlugin.handleOpen(url);

            }

     return true;

        }

     override func application(_application:UIApplication, handleOpen url:URL) ->Bool{

    if(url.host=="safepay")//支付宝支付

            {

     return FlutterAlipayPlugin.handleOpen(url);

            }

     return true;

        }

     override func application(_app:UIApplication, open url:URL, options: [UIApplication.OpenURLOptionsKey:Any] = [:]) ->Bool{

    if(url.host=="safepay")//支付宝支付

            {

     return FlutterAlipayPlugin.handleOpen(url);

            }

     return true;

        }

 
}
