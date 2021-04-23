package com.example.four;


import android.content.Context;

import androidx.cardview.widget.CardView;


import androidx.recyclerview.widget.RecyclerView;


import android.content.Intent;
import android.graphics.Bitmap;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;


import com.example.testdemo.R;
import com.pan3d.units.LoadBackFun;
import com.pan3d.units.LoadManager;

import java.util.ArrayList;
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
        /*
        holder.mTitle.setText((CharSequence) mList.get(position).get("title"));
        holder.mPrice.setText(mList.get(position).get("price") == null ? "￥" : "￥ " + mList.get(position).get("price"));
        holder.mName.setText(mList.get(position).getAVObject("owner") == null ? "" : mList.get(position).getAVObject("owner").getString("username"));
        Picasso.with(mContext).load(mList.get(position).getAVFile("image") == null ? "www" : mList.get(position).getAVFile("image").getUrl()).transform(new RoundedTransformation(9, 0)).into(holder.mPicture);
        holder.mItem.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(mContext, DetailActivity.class);
                intent.putExtra("goodsObjectId", mList.get(position).getObjectId());
                mContext.startActivity(intent);
            }
        });
        */
        holder.mItem.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                Intent intent = new Intent(mContext, DetailActivity.class);
                intent.putExtra("goodsObjectId", "ccav");
                mContext.startActivity(intent);
            }
        });

        holder.mTitle.setText((CharSequence) mList.get(position).get("text"));
        holder.mName.setText((CharSequence) mList.get(position).get("title"));
        JSONArray picitem = mList.get(position).getJSONArray("picitem");

//         ArrayList<String> picitem=    mList.get(position).get("picitem");

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
