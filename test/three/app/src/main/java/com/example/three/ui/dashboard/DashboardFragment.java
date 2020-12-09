package com.example.three.ui.dashboard;

import android.graphics.Color;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.GridView;
import android.widget.SimpleAdapter;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.constraintlayout.widget.ConstraintLayout;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.Observer;
import androidx.lifecycle.ViewModelProvider;

import com.example.three.R;
import com.z3d.base.CallBack;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class DashboardFragment extends Fragment {

    private DashboardViewModel dashboardViewModel;
    View rootView;
    public View onCreateView(@NonNull LayoutInflater inflater,
                             ViewGroup container, Bundle savedInstanceState) {
        dashboardViewModel =
                new ViewModelProvider(this).get(DashboardViewModel.class);
        rootView = inflater.inflate(R.layout.fragment_dashboard, container, false);

        return rootView;
    }

    @Override
    public void onActivityCreated(@Nullable Bundle savedInstanceState) {
        super.onActivityCreated(savedInstanceState);

        TextView textView=new TextView(this.getActivity());

        final ConstraintLayout constraintlayout = rootView.findViewById(R.id.twoConstra);
        constraintlayout.removeAllViews();
        TextView tv = new TextView(this.getActivity());
        tv.setText("Test set TextView's color.");
        tv.setTextColor(Color.rgb(255, 0, 255));

        List<String> arr=new ArrayList<>();
        arr.add("50011");
        arr.add("50013");
        arr.add("50015");
        arr.add("yezhuz");
        arr.add("全部");
        arr.add("网格");
        arr.add("拉+");
        arr.add("推-");
        addGridView(arr);
    }
    private void  addGridView(List<String> arr ){
        List<Map<String, Object>> data_list=new ArrayList<>();
        for(int i=0;i<arr.size();i++){
            Map<String, Object> map = new HashMap<String, Object>();
            map.put("image", R.drawable.my_cell_sz001);
            map.put("text", arr.get(i));
            data_list.add(map);
        }
        final ConstraintLayout constraintlayout = rootView.findViewById(R.id.baseConstra);
        GridView gview =new GridView(this.getActivity());
        gview.setLayoutParams(new ViewGroup.LayoutParams(
                ViewGroup.LayoutParams.WRAP_CONTENT,
                ViewGroup.LayoutParams.WRAP_CONTENT));
        gview.setNumColumns(4);
        constraintlayout.addView(gview);
        String [] from ={"image","text"};
        int [] to = {R.id.image,R.id.text};
        SimpleAdapter sim_adapter = new SimpleAdapter(this.getActivity(),  data_list, R.layout.item, from, to);
        gview.setAdapter(sim_adapter);
        gview.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {

            }
        });

    }
}