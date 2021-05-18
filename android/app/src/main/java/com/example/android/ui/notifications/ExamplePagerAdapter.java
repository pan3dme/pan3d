package com.example.android.ui.notifications;

import android.graphics.Color;
import android.view.Gravity;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;
import androidx.viewpager.widget.PagerAdapter;

import com.example.android.MainRecyclerAdapter;
import com.example.android.R;

import java.util.ArrayList;
import java.util.List;

import cn.leancloud.AVObject;
import cn.leancloud.AVQuery;
import io.reactivex.Observer;
import io.reactivex.disposables.Disposable;

/**
 * Created by hackware on 2016/9/10.
 */

public class ExamplePagerAdapter extends PagerAdapter {
    private List<String> mDataList;

    private static final String TAG ="HomeFragment" ;



    public ExamplePagerAdapter(List<String> dataList) {
        mDataList = dataList;
    }

    @Override
    public int getCount() {
        return mDataList == null ? 0 : mDataList.size();
    }

    @Override
    public boolean isViewFromObject(View view, Object object) {
        return view == object;
    }

    @Override
    public Object instantiateItem(ViewGroup container, int position) {
        List<AVObject> mList = new ArrayList<>();
        RecyclerView mRecyclerView = new RecyclerView(container.getContext());
        mRecyclerView.setLayoutManager(new LinearLayoutManager(container.getContext()));
        MainRecyclerAdapter mRecyclerAdapter = new MainRecyclerAdapter(mList, container.getContext());
        mRecyclerView.setAdapter(mRecyclerAdapter);
        container.addView(mRecyclerView);
        this.getListData( mDataList.get(position),mRecyclerAdapter,mList);
        return mRecyclerView;

 

    }

    private  void getListData(String val,MainRecyclerAdapter mRecyclerAdapter,List<AVObject>  mList)
    {
        mList.clear();
        mRecyclerAdapter.notifyDataSetChanged();
        AVQuery<AVObject> query = new AVQuery<>("pan3dlist002");
        if(val!="全部"){
            query.whereEqualTo("tag", val);
        }

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
    public void destroyItem(ViewGroup container, int position, Object object) {
        container.removeView((View) object);
    }

    @Override
    public int getItemPosition(Object object) {

        return POSITION_NONE;
    }

    @Override
    public CharSequence getPageTitle(int position) {
        return mDataList.get(position);
    }
}
