package com.e.demo_001;

import androidx.appcompat.app.AppCompatActivity;
import androidx.navigation.NavController;
import androidx.navigation.Navigation;

import android.os.Bundle;

import com.google.android.material.bottomnavigation.BottomNavigationItemView;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
          setContentView(R.layout.activity_main);
//       BottomNavigationItemView aaaaaa=findViewById(R.id.bottomnavigtion);

//      NavController navController= Navigation.findNavController(this,R.id.fragment);
//        AppBarConfiguration configuration=new AppBarConfiguration.Builder(navController.getGraph()).build();
//        NavigationUI.setupActionBarWithNavController(this,navController,configuration);


       // NavigationUI.setupWithNavController(bottomNavigationItemView,navController);


    }
}