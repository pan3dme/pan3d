package com.example.four;

import android.content.Context;
import android.graphics.Bitmap;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.ImageView;
import android.widget.TextView;


import androidx.constraintlayout.widget.ConstraintLayout;

import com.pan3d.units.LoadBackFun;
import com.pan3d.units.LoadManager;

import java.util.HashMap;
import java.util.List;

public class FruitAdapter extends ArrayAdapter<Fruit> {
    private static final String TAG = "FruitAdapter";
    // 定义一个内部类，用于对控件的实例进行缓存

    class ViewHolder{

    }
    private int resourceId;

    // 适配器的构造函数，把要适配的数据传入这里
    public FruitAdapter(Context context, int textViewResourceId, List<Fruit> objects){
        super(context,textViewResourceId,objects);
        resourceId=textViewResourceId;
    }




    // convertView 参数用于将之前加载好的布局进行缓存
    @Override
    public View getView(int position, View convertView, ViewGroup parent){
        Fruit fruit=getItem(position); //获取当前项的Fruit实例

        // 加个判断，以免ListView每次滚动时都要重新加载布局，以提高运行效率
        View view;
        ViewHolder viewHolder;
        if (convertView==null){

            // 避免ListView每次滚动时都要重新加载布局，以提高运行效率
            view=LayoutInflater.from(getContext()).inflate(resourceId,parent,false);

            // 避免每次调用getView()时都要重新获取控件实例
            viewHolder=new ViewHolder();


            // 将ViewHolder存储在View中（即将控件的实例存储在其中）
            view.setTag(viewHolder);
        } else{
            view=convertView;
            viewHolder=(ViewHolder) view.getTag();
        }




       String picUrl= fruit.getImageOneUrl();


        this.addLabelTxt((ConstraintLayout)view, fruit.getName());



        this.addTempImageView((ConstraintLayout)view,picUrl);






        return view;
    }
    private void addLabelTxt(ConstraintLayout constraintLayout, String txt)
    {


        TextView tvRight =new TextView(this.getContext());
        tvRight.setText(txt);
        constraintLayout.addView(tvRight);


    }
    private void addTempImageView(ConstraintLayout constraintLayout,String picUrl)
    {
        ImageView imageView=new ImageView(this.getContext());
        imageView.setPadding(100,5,100,5);
 

        constraintLayout.addView(imageView);


        LoadManager.loadBitmapByUrl(picUrl, new LoadBackFun() {
            @Override
            public void bfun(HashMap val) {
                imageView.setImageBitmap((Bitmap) val.get("bitmap"));
            }
        });

    }






}