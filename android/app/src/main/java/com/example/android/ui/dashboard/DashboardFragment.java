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
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.Observer;
import androidx.lifecycle.ViewModelProvider;
import android.annotation.SuppressLint;
import android.app.Activity;
import android.os.Bundle;
import android.util.Log;
import android.view.Menu;
import android.webkit.JavascriptInterface;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Toast;

import com.example.android.R;

public class DashboardFragment extends Fragment {

    private View mainRoot;

    public View onCreateView(@NonNull LayoutInflater inflater,
                             ViewGroup container, Bundle savedInstanceState) {

        View root = inflater.inflate(R.layout.fragment_dashboard, container, false);
        this.mainRoot=root;
        this.testLoadWeb();
//        this.makeWebView();
        return root;
    }

    private void testLoadWeb()
    {
        final WebView myWebView = (WebView) this.mainRoot.findViewById(R.id.wv_webview);
        WebSettings settings = myWebView.getSettings();
        settings.setJavaScriptEnabled(true);
        myWebView.addJavascriptInterface(new JsInteration(), "control");
        myWebView.setWebChromeClient(new WebChromeClient() {});
        myWebView.setWebViewClient(new WebViewClient() {

            @Override
            public void onPageFinished(WebView view, String url) {
                super.onPageFinished(view, url);
//                testMethod(myWebView);
            }

        });
        myWebView.loadUrl("https://pan3dme.github.io/pan3d/h5gl/listmain.html");
    }

    private void testMethod(WebView webView) {
        String call = "javascript:initfuck()";

//        call = "javascript:alertMessage(\"" + "content" + "\")";
//
//        call = "javascript:toastMessage(\"" + "content" + "\")";
//
//        call = "javascript:sumToJava(1,2)";
        webView.loadUrl(call);

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
    protected void makeWebView()
    {
        WebView webView = (WebView) this.mainRoot.findViewById(R.id.wv_webview);

        /*
        WebSettings webSettings = webView.getSettings();
        webSettings.setJavaScriptEnabled(true);;
        webView.loadData("","text/html","UTF-8");
        webView.loadUrl("javascript:alert('hello')");
        */


        String baseurl="https://pan3dme.github.io/pan3d/new/listmain.html";
        baseurl="https://pan3dme.github.io/pan3d/h5gl/index.html";
        baseurl="https://www.163.com";
        baseurl="https://pan3dme.github.io/pan3d/h5gl/listmain.html";
        webView.loadUrl(baseurl);

        webView.setWebViewClient(new WebViewClient(){
        @Override
        public boolean shouldOverrideUrlLoading(WebView view, String url) {
        view.loadUrl(url);
        return true;
        }
        });


    }
}