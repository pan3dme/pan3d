package com.example.android.ui.home;

import android.content.Context;
import android.graphics.Color;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;

import androidx.viewpager.widget.ViewPager;

import com.example.android.R;
import com.zhpan.bannerview.BannerViewPager;
import com.zhpan.bannerview.BaseBannerAdapter;

import net.lucode.hackware.magicindicator.MagicIndicator;
import net.lucode.hackware.magicindicator.ViewPagerHelper;
import net.lucode.hackware.magicindicator.buildins.commonnavigator.CommonNavigator;
import net.lucode.hackware.magicindicator.buildins.commonnavigator.abs.CommonNavigatorAdapter;
import net.lucode.hackware.magicindicator.buildins.commonnavigator.abs.IPagerIndicator;
import net.lucode.hackware.magicindicator.buildins.commonnavigator.abs.IPagerTitleView;
import net.lucode.hackware.magicindicator.buildins.commonnavigator.titles.ClipPagerTitleView;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import cn.leancloud.AVObject;
import cn.leancloud.AVQuery;
import io.reactivex.Observer;
import io.reactivex.disposables.Disposable;

public class HomeFragment<CustomBean>  extends Fragment {



    private static final String[] CHANNELS = new String[]{"全部", "场景", "角色", "特效", "技能", "MD5", "动画", "其它", "更多"};
    private List<String> mDataList = new ArrayList<String>(Arrays.asList(CHANNELS));
    private ExamplePagerAdapter mExamplePagerAdapter = new ExamplePagerAdapter(mDataList);

    private ViewPager mViewPager;
    private BannerViewPager<CustomBean> mViewBanerPager;
    private MagicIndicator mMagicIndicator;
    private CommonNavigator mCommonNavigator;

    private Toast mToast;

    public View onCreateView(@NonNull LayoutInflater inflater,
                             ViewGroup container, Bundle savedInstanceState) {

        View root = inflater.inflate(R.layout.fragment_home, container, false);



        mViewPager = (ViewPager) root.findViewById(R.id.view_pager);
        mViewPager.setAdapter(mExamplePagerAdapter);



        mMagicIndicator = (MagicIndicator) root.findViewById(R.id.magic_indicator1);
        mMagicIndicator.setBackgroundColor(Color.parseColor("#d43d3d"));
        mCommonNavigator = new CommonNavigator(root.getContext());
        mCommonNavigator.setSkimOver(true);
        mCommonNavigator.setAdapter(new CommonNavigatorAdapter() {

            @Override
            public int getCount() {
                return mDataList.size();
            }

            @Override
            public IPagerTitleView getTitleView(Context context, final int index) {
                ClipPagerTitleView clipPagerTitleView = new ClipPagerTitleView(context);
                clipPagerTitleView.setText(mDataList.get(index));
                clipPagerTitleView.setTextColor(Color.parseColor("#f2c4c4"));
                clipPagerTitleView.setClipColor(Color.WHITE);
                clipPagerTitleView.setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(View v) {
                        mViewPager.setCurrentItem(index);
                    }
                });
                return clipPagerTitleView;
            }

            @Override
            public IPagerIndicator getIndicator(Context context) {
                return null;
            }
        });
        mMagicIndicator.setNavigator(mCommonNavigator);
        ViewPagerHelper.bind(mMagicIndicator, mViewPager);



        initBanerInfo(root);

        return root;
    }
    private void initBanerInfo(View root )
    {
        mViewBanerPager = root.findViewById(R.id.home_top_baner);
        mViewBanerPager  .setAdapter((BaseBannerAdapter<CustomBean>) new ViewBindingSampleAdapter(9)).create();
        ArrayList mPictureList = new ArrayList();
        mPictureList.add(     R.drawable.ic_home_black_24dp);
        mPictureList.add(     R.drawable.ic_home_black_24dp);
        mPictureList.add(     R.drawable.ic_home_black_24dp);
        mPictureList.add(     R.drawable.ic_home_black_24dp);


        List<AVObject> mList=new ArrayList<>();
        AVQuery<AVObject> query = new AVQuery<>("pan3dlist002");
        query.whereNotEqualTo("baner", null);

        query.addDescendingOrder("createdAt");
        query.findInBackground().subscribe(new Observer<List<AVObject>>() {
            public void onSubscribe(Disposable disposable) {}
            public void onNext(List<AVObject> arr) {
                mList.addAll(arr);
                mViewBanerPager .refreshData(mPictureList);


            }
            public void onError(Throwable throwable) {}
            public void onComplete() {}
        });


    }


}