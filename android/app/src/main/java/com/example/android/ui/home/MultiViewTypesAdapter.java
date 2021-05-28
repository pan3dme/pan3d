package com.example.android.ui.home;

import android.graphics.Bitmap;
import android.widget.ImageView;

import com.example.android.R;

import com.pan3d.units.LoadBackFun;
import com.pan3d.units.LoadManager;
import com.zhpan.bannerview.BaseBannerAdapter;
import com.zhpan.bannerview.BaseViewHolder;

import java.util.HashMap;

import cn.leancloud.AVFile;

/**
 * <pre>
 *   Created by zhpan on 2020/4/6.
 *   Description:Multiple view types adapter sample.
 * </pre>
 */
public class MultiViewTypesAdapter extends BaseBannerAdapter<BannerData> {

    @Override
    protected void bindData(BaseViewHolder<BannerData> holder, BannerData data, int position, int pageSize) {
        ImageView imageView = holder.findViewById(R.id.banner_image);
        this.loadImgeByUrl(imageView,data.getUrl());
    }
    private void loadImgeByUrl(ImageView imageView, String val)
    {

        String url="https://webpan.oss-cn-shanghai.aliyuncs.com/pan/leancloud/"+val;
        LoadManager.loadBitmapByUrl(url, new LoadBackFun() {
            @Override
            public void bfun(HashMap val) {
                imageView.setImageBitmap((Bitmap) val.get("bitmap"));
            }
        });

    }

    @Override
    public int getLayoutId(int viewType) {
        return R.layout.item_slide_mode;
    }


}

