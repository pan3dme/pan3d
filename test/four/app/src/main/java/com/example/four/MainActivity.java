package com.example.four;

import android.os.Bundle;

import com.google.android.material.bottomnavigation.BottomNavigationView;
import com.pan3d.base.Scene_data;
import com.pan3d.res.SceneRes;
import com.pan3d.scene.Scene3D;
import com.pan3d.units.LoaderThread;

import androidx.appcompat.app.AppCompatActivity;
import androidx.navigation.NavController;
import androidx.navigation.Navigation;
import androidx.navigation.ui.AppBarConfiguration;
import androidx.navigation.ui.NavigationUI;

import cn.leancloud.AVLogger;
import cn.leancloud.AVOSCloud;

public class MainActivity extends AppCompatActivity {
    private Scene3D _scene3d;
    private SceneRes _sceneRes;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Scene_data.fileRoot = "https://webpan.oss-cn-shanghai.aliyuncs.com/res/";
        LoaderThread.fileContext = getApplicationContext();

        AVOSCloud.setLogLevel(AVLogger.Level.DEBUG);
        AVOSCloud.initialize(this,"tQdDwaHgg6hNEuYG4WhFlLQ0-gzGzoHsz", "Kc3v7hICoaQcO80skdhOXCrl","https://tqddwahg.lc-cn-n1-shared.com");
//        appId: "tQdDwaHgg6hNEuYG4WhFlLQ0-gzGzoHsz",
//                appKey: "Kc3v7hICoaQcO80skdhOXCrl",
//                serverURL: "https://tqddwahg.lc-cn-n1-shared.com"
//
        BottomNavigationView navView = findViewById(R.id.nav_view);
        // Passing each menu ID as a set of Ids because each
        // menu should be considered as top level destinations.
        AppBarConfiguration appBarConfiguration = new AppBarConfiguration.Builder(
                R.id.navigation_home, R.id.navigation_dashboard, R.id.navigation_notifications)
                .build();

//        AppBarConfiguration appBarConfiguration = new AppBarConfiguration.Builder(
//                R.id.navigation_home, R.id.navigation_dashboard, R.id.navigation_notifications)
//                .build();
        NavController navController = Navigation.findNavController(this, R.id.nav_host_fragment);
        NavigationUI.setupActionBarWithNavController(this, navController, appBarConfiguration);
        NavigationUI.setupWithNavController(navView, navController);
    }

}