package com.example.android.ui.notifications;


import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;


import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;

import com.example.android.R;
import com.zhpan.bannerview.BannerViewPager;
import com.zhpan.bannerview.BaseBannerAdapter;


import java.util.ArrayList;

import java.util.List;
import java.util.Map;


public class NotificationsFragment<CustomBean> extends Fragment {
    private List< Map<String, Object>> dataList ;
    private BannerViewPager<CustomBean> mViewPager;
    public View onCreateView(@NonNull LayoutInflater inflater,
                             ViewGroup container, Bundle savedInstanceState) {

        View root = inflater.inflate(R.layout.fragment_baner, container, false);


        return root;
    }



}