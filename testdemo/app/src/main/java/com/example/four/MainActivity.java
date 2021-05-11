package com.example.four;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;

import com.example.testdemo.R;
import com.google.android.material.floatingactionbutton.FloatingActionButton;
import com.pan3d.base.Scene_data;
import com.pan3d.units.LoaderThread;

import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ListView;

import java.util.ArrayList;
import java.util.List;

import cn.leancloud.AVLogger;
import cn.leancloud.AVOSCloud;
import cn.leancloud.AVObject;
import cn.leancloud.AVQuery;
import cn.leancloud.AVUser;
import cn.leancloud.search.AVSearchSortBuilder;
import io.reactivex.Observer;
import io.reactivex.disposables.Disposable;


public class MainActivity extends AppCompatActivity {
    private static final String TAG ="MainActivity" ;
    private RecyclerView mRecyclerView;
    private MainRecyclerAdapter mRecyclerAdapter;
    private List<AVObject> mList = new ArrayList<>();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        Scene_data.fileRoot = "https://webpan.oss-cn-shanghai.aliyuncs.com/res/";
        LoaderThread.fileContext = getApplicationContext();


 

        mRecyclerView = (RecyclerView) findViewById(R.id.list_main);
        mRecyclerView.setHasFixedSize(true);
        mRecyclerView.setLayoutManager(new LinearLayoutManager(MainActivity.this));
        mRecyclerAdapter = new MainRecyclerAdapter(mList, MainActivity.this);
        mRecyclerView.setAdapter(mRecyclerAdapter);



    }

    @Override
    protected void onResume() {
        super.onResume();
        initData();
    }

    @Override
    protected void onPause() {
        super.onPause();
    }

    private void initData() {
        mList.clear();


        AVOSCloud.setLogLevel(AVLogger.Level.DEBUG);
        AVOSCloud.initialize(this,"tQdDwaHgg6hNEuYG4WhFlLQ0-gzGzoHsz", "Kc3v7hICoaQcO80skdhOXCrl","https://tqddwahg.lc-cn-n1-shared.com");


    }


    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_main, menu);
        return true;
    }

    @Nullable
    @Override
    public View onCreatePanelView(int featureId) {
        final String username = "pan3dme";
        final String password = "1343";


        AVUser.logIn(username,password).subscribe(new Observer<AVUser>() {
            @Override
            public void onSubscribe(Disposable d) {
                Log.d("onSubscribe", "onSubscribe: ");
            }
            @Override
            public void onNext(AVUser avUser) {
                getInfoTemp();
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

        return super.onCreatePanelView(featureId);
    }
    private  void getInfoTemp()
    {

        AVQuery<AVObject> query = new AVQuery<>("pan3dlist002");
        query.addDescendingOrder("createdAt");


        query.findInBackground().subscribe(new Observer<List<AVObject>>() {
            public void onSubscribe(Disposable disposable) {}
            public void onNext(List<AVObject> arr) {

                mList.addAll(arr);
                mRecyclerAdapter.notifyDataSetChanged();
            }
            public void onError(Throwable throwable) {}
            public void onComplete() {}
        });
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();

        //noinspection SimplifiableIfStatement
        /*
        if (id == R.id.action_logout) {
            return true;
        }
        */

        return super.onOptionsItemSelected(item);
    }
}
