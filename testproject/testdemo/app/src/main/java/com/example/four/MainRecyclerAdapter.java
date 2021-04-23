package com.example.four;


import android.content.Context;

import androidx.cardview.widget.CardView;


import androidx.recyclerview.widget.RecyclerView;


import android.content.Intent;
import android.graphics.Bitmap;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;


import com.example.testdemo.R;
import com.pan3d.units.LoadBackFun;
import com.pan3d.units.LoadManager;

import java.util.HashMap;
import java.util.List;

import cn.leancloud.AVObject;
import cn.leancloud.json.JSONArray;

public class MainRecyclerAdapter extends RecyclerView.Adapter<MainRecyclerAdapter.MainViewHolder> {
    private Context mContext;
    private List<AVObject> mList;

    public MainRecyclerAdapter(List<AVObject> list, Context context) {
        this.mContext = context;
        this.mList = list;
    }

    @Override
    public MainViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        return new MainViewHolder(LayoutInflater.from(mContext).inflate(R.layout.item_list_main, parent, false));
    }

    @Override
    public void onBindViewHolder(MainViewHolder holder, final int position) {
        AVObject avObject=  mList.get(position);
        holder.mItem.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                Intent intent = new Intent(mContext, DetailActivity.class);
                JSONArray jsonArray=  avObject.getJSONArray("sceneinfo");
                intent.putExtra("sceneinfo",(CharSequence) jsonArray.toJSONString());
                mContext.startActivity(intent);
            }
        });

        holder.mTitle.setText((CharSequence)avObject.get("text"));
        holder.mName.setText((CharSequence)avObject.get("title"));
        JSONArray picitem = avObject.getJSONArray("picitem");
        String picurl001=  getImageUrlByIdx(0,picitem);
        LoadManager.loadBitmapByUrl(picurl001, new LoadBackFun() {
            @Override
            public void bfun(HashMap val) {

                holder.mPicture.setImageBitmap((Bitmap) val.get("bitmap"));
            }
        });
    }

    public String getImageUrlByIdx(int idx,  JSONArray picitem){
        String outUrl="";
        try {
            outUrl= (String)    picitem.get(idx);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }

        return outUrl;
    }


    @Override
    public int getItemCount() {
        return mList.size();
    }

    class MainViewHolder extends RecyclerView.ViewHolder {
        private TextView mName;
        private TextView mPrice;
        private TextView mTitle;
        private CardView mItem;
        private ImageView mPicture;

        public MainViewHolder(View itemView) {
            super(itemView);
            mName = (TextView) itemView.findViewById(R.id.name_item_main);
            mTitle = (TextView) itemView.findViewById(R.id.title_item_main);
            mPrice = (TextView) itemView.findViewById(R.id.price_item_main);
            mPicture = (ImageView) itemView.findViewById(R.id.picture_item_main);
            mItem = (CardView) itemView.findViewById(R.id.item_main);
        }
    }
}