package com.example.android.ui.home;


import android.graphics.Bitmap;
import android.util.Log;
import android.widget.ImageView;

import com.example.android.R;
import com.example.android.databinding.ItemSlideModeBinding;
import com.pan3d.units.LoadBackFun;
import com.pan3d.units.LoadManager;
import com.zhpan.bannerview.BaseBannerAdapter;
import com.zhpan.bannerview.BaseViewHolder;

import java.util.HashMap;

import cn.leancloud.AVFile;

/**
 * @author DBoy
 * @date 2020/12/11
 * Class 描述 : 使用ViewBinding示例
 */
public class BannerBindingAdapter extends BaseBannerAdapter<Integer> {
    private final int mRoundCorner;
    public BannerBindingAdapter(int roundCorner) {
        mRoundCorner = roundCorner;
    }
    @Override
    protected void bindData(BaseViewHolder<Integer> holder, Integer data, int position, int pageSize) {
        //示例使用ViewBinding
        ItemSlideModeBinding viewBinding = ItemSlideModeBinding.bind(holder.itemView);

        loadImgeByUrl(viewBinding.bannerImage,null);
    }
    private void loadImgeByUrl(ImageView imageView, AVFile avFile)
    {

        String url="https://webpan.oss-cn-shanghai.aliyuncs.com/pan/leancloud/file/pic/2021_5_27_0.jpeg";

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
