package com.example.android.ui.dashboard;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.webkit.WebResourceRequest;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.Observer;
import androidx.lifecycle.ViewModelProvider;

import com.example.android.R;

public class DashboardFragment extends Fragment {

    private View mainRoot;

    public View onCreateView(@NonNull LayoutInflater inflater,
                             ViewGroup container, Bundle savedInstanceState) {

        View root = inflater.inflate(R.layout.fragment_dashboard, container, false);
        this.mainRoot=root;
        this.makeWebView();
        return root;
    }
    protected void makeWebView()
    {
        WebView webView = (WebView) this.mainRoot.findViewById(R.id.wv_webview);
        String baseurl="https://pan3dme.github.io/pan3d/new/listmain.html";
        baseurl="https://pan3dme.github.io/pan3d/h5gl/listmain.html";
//        baseurl="https://www.163.com";
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