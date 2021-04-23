package com.example.four;

import android.os.Bundle;

import androidx.appcompat.app.AppCompatActivity;
import androidx.fragment.app.Fragment;

import android.view.MenuItem;

import android.widget.ImageView;
import android.widget.TextView;

import com.example.testdemo.R;
import com.squareup.picasso.Picasso;

import cn.leancloud.AVObject;
import io.reactivex.Observer;
import io.reactivex.disposables.Disposable;

/**
 * A simple {@link Fragment} subclass.
 * Use the  factory method to
 * create an instance of this fragment.
 */
public class DetailActivity extends AppCompatActivity {
    private TextView mName;
    private TextView mDescription;
    private ImageView mImage;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.fragment_detail_activity);
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
        getSupportActionBar().setTitle(getString(R.string.detail));

        mName = (TextView) findViewById(R.id.name_detail);
        mDescription = (TextView) findViewById(R.id.description_detail);
        mImage = (ImageView) findViewById(R.id.image_detail);

        String goodsObjectId = getIntent().getStringExtra("goodsObjectId");
        AVObject avObject = AVObject.createWithoutData("Product", goodsObjectId);

    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        if (item.getItemId() == android.R.id.home) {
            onBackPressed();
        }
        return super.onOptionsItemSelected(item);
    }
}