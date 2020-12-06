package com.example.three;

import android.graphics.Bitmap;
import android.os.Bundle;
import android.util.Log;


import com.google.android.material.bottomnavigation.BottomNavigationView;
import com.urlhttp.CallBackUtil;
import com.urlhttp.UrlHttpUtil;
import com.z3d.base.Scene_data;
import com.z3d.units.LoaderThread;

import androidx.appcompat.app.AppCompatActivity;
import androidx.navigation.NavController;
import androidx.navigation.Navigation;
import androidx.navigation.ui.AppBarConfiguration;
import androidx.navigation.ui.NavigationUI;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        BottomNavigationView navView = findViewById(R.id.nav_view);

        Scene_data.fileRoot = "https://webpan.oss-cn-shanghai.aliyuncs.com/res/";
        LoaderThread.fileContext = getApplicationContext();

        // Passing each menu ID as a set of Ids because each
        // menu should be considered as top level destinations.
        AppBarConfiguration appBarConfiguration = new AppBarConfiguration.Builder(
                R.id.navigation_home, R.id.navigation_dashboard, R.id.navigation_notifications)
                .build();
        NavController navController = Navigation.findNavController(this, R.id.nav_host_fragment);
        NavigationUI.setupActionBarWithNavController(this, navController, appBarConfiguration);
        NavigationUI.setupWithNavController(navView, navController);


    }
    private void  loadTestFile()
    {
        String string=Scene_data.fileRoot+"base/brdf_ltu.jpg";
        UrlHttpUtil.getBitmap(string, new CallBackUtil.CallBackBitmap() {
            @Override
            public void onFailure(int code, String errorMessage) {
                Log.d("errorMessage", "onResponse: ");
            }
            @Override
            public void onResponse(Bitmap bm) {
                Log.d("onResponse", "onResponse: ");
            }
        });
    }

}