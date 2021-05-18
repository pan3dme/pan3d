package com.example.android.ui.dashboard;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.TextView;

import androidx.annotation.NonNull;

import androidx.fragment.app.Fragment;

import androidx.viewpager.widget.ViewPager;


import android.util.Log;

import android.webkit.JavascriptInterface;
import android.webkit.WebChromeClient;

import android.widget.Toast;

import com.example.android.R;
import com.example.android.ui.notifications.ExamplePagerAdapter;

import net.lucode.hackware.magicindicator.MagicIndicator;
import net.lucode.hackware.magicindicator.buildins.commonnavigator.CommonNavigator;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class DashboardFragment extends Fragment {

    private View mainRoot;


    public View onCreateView(@NonNull LayoutInflater inflater,
                             ViewGroup container, Bundle savedInstanceState) {

        View root = inflater.inflate(R.layout.fragment_dashboard, container, false);
        this.mainRoot=root;
        this.testLoadWeb();
        return root;
    }

    private void testLoadWeb()
    {
        final WebView myWebView = (WebView) this.mainRoot.findViewById(R.id.wv_webview);
        WebSettings settings = myWebView.getSettings();
        settings.setJavaScriptEnabled(true);
        myWebView.getSettings().setDomStorageEnabled(true);
        myWebView.addJavascriptInterface(new JsInteration(), "control");
        myWebView.setWebChromeClient(new WebChromeClient() {});
        myWebView.setWebViewClient(new WebViewClient() {

            @Override
            public void onPageFinished(WebView view, String url) {
                super.onPageFinished(view, url);

            }

        });
        myWebView.loadUrl("https://webpan.oss-cn-shanghai.aliyuncs.com/pan/h5glweb/listmain.html");
    }



    public class JsInteration {
        @JavascriptInterface
        public void toastMessage(String message) {

            Toast.makeText(   getContext(), message, Toast.LENGTH_LONG).show();
        }

        @JavascriptInterface
        public void onSumResult(int result) {
            Log.i("LOGTAG", "onSumResult result=" + result);
        }
    }

}