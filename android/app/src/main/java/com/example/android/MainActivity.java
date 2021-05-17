package com.example.android;

import android.os.Bundle;
import android.util.Log;

import com.google.android.material.bottomnavigation.BottomNavigationView;
import com.pan3d.base.Scene_data;
import com.pan3d.units.LoaderThread;

import androidx.appcompat.app.AppCompatActivity;
import androidx.navigation.NavController;
import androidx.navigation.Navigation;
import androidx.navigation.ui.AppBarConfiguration;
import androidx.navigation.ui.NavigationUI;

import cn.leancloud.AVLogger;
import cn.leancloud.AVOSCloud;
import cn.leancloud.AVUser;
import io.reactivex.Observer;
import io.reactivex.disposables.Disposable;

public class MainActivity extends AppCompatActivity {
    private static final String TAG = "MainActivity";
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        this.initColde();
        this.loginEvent();
    }

    private void initColde()
    {
        Scene_data.fileRoot = "https://webpan.oss-cn-shanghai.aliyuncs.com/res/";
        LoaderThread.fileContext = getApplicationContext();

        AVOSCloud.setLogLevel(AVLogger.Level.DEBUG);
        AVOSCloud.initialize(this,"tQdDwaHgg6hNEuYG4WhFlLQ0-gzGzoHsz", "Kc3v7hICoaQcO80skdhOXCrl","https://tqddwahg.lc-cn-n1-shared.com");

    }
    private  void  loginEvent()
    {
        final String username = "pan3dme";
        final String password = "1343";


        AVUser.logIn(username,password).subscribe(new Observer<AVUser>() {
            @Override
            public void onSubscribe(Disposable d) {
                Log.d("onSubscribe", "onSubscribe: ");
            }
            @Override
            public void onNext(AVUser avUser) {
                Log.d(TAG, "onNext: 获取用户信息");
                initMainUi();
            }
            @Override
            public void onError(Throwable e) {
                Log.d("Throwable", "onError: ");
            }
            @Override
            public void onComplete() {
                Log.d("onComplete", "onComplete: ");
            }
        });
    }

    private void  initMainUi()
    {
        setContentView(R.layout.activity_main);
        BottomNavigationView navView = findViewById(R.id.nav_view);
        AppBarConfiguration appBarConfiguration = new AppBarConfiguration.Builder(
                R.id.navigation_home, R.id.navigation_dashboard, R.id.navigation_notifications)
                .build();
        NavController navController = Navigation.findNavController(this, R.id.nav_host_fragment);
        NavigationUI.setupActionBarWithNavController(this, navController, appBarConfiguration);
        NavigationUI.setupWithNavController(navView, navController);
    }


}