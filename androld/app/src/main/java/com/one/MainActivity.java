package com.one;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;

import com.one.five.obj.ObjLoadActivity;

public class MainActivity extends AppCompatActivity   {




    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);


         setContentView(R.layout.activity_main);


       // startActivity(new Intent(this, ObjLoadActivity.class));



    }



}
