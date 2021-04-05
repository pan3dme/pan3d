package com.example.calculationtest;

import android.os.Bundle;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.navigation.NavController;
import androidx.navigation.Navigation;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ListView;

import java.util.ArrayList;
import java.util.List;

/**
 * A simple {@link Fragment} subclass.
 * Use the {@link ListBestFragment#newInstance} factory method to
 * create an instance of this fragment.
 */
public class ListBestFragment extends Fragment {

    // TODO: Rename parameter arguments, choose names that match
    // the fragment initialization parameters, e.g. ARG_ITEM_NUMBER
    private static final String ARG_PARAM1 = "param1";
    private static final String ARG_PARAM2 = "param2";

    // TODO: Rename and change types of parameters
    private String mParam1;
    private String mParam2;

    // fruitList用于存储数据
    private List<Fruit> fruitList=new ArrayList<>();

    public ListBestFragment() {
        // Required empty public constructor
    }

    /**
     * Use this factory method to create a new instance of
     * this fragment using the provided parameters.
     *
     * @param param1 Parameter 1.
     * @param param2 Parameter 2.
     * @return A new instance of fragment ListBestFragment.
     */
    // TODO: Rename and change types and number of parameters
    public static ListBestFragment newInstance(String param1, String param2) {
        ListBestFragment fragment = new ListBestFragment();
        Bundle args = new Bundle();
        args.putString(ARG_PARAM1, param1);
        args.putString(ARG_PARAM2, param2);
        fragment.setArguments(args);
        return fragment;
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        if (getArguments() != null) {
            mParam1 = getArguments().getString(ARG_PARAM1);
            mParam2 = getArguments().getString(ARG_PARAM2);
        }


    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);


        this.addEvents();
    }

    private void  addEvents(){


        // 先拿到数据并放在适配器上
        this.initFruitsaa(); //初始化水果数据
        FruitAdapter adapter=new FruitAdapter(this.getContext(),R.layout.fruit_item,fruitList);
        // 将适配器上的数据传递给listView
        ListView listView=  getView().findViewById(R.id.listbest);
        listView.setAdapter(adapter);

        getView().findViewById(R.id.buttonLoad).setOnClickListener(new View.OnClickListener(){
            @Override
            public void onClick(View v) {
                initListData();
            }


        });
    }
    public void  initListData()
    {
        this.fruitList=new ArrayList<>();
        // 先拿到数据并放在适配器上
        initFruits(); //初始化水果数据
        FruitAdapter adapter=new FruitAdapter(this.getContext(),R.layout.fruit_item,fruitList);

        // 将适配器上的数据传递给listView
        ListView listView=  getView().findViewById(R.id.listbest);
        listView.setAdapter(adapter);
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_list_best, container, false);
    }
    // 初始化数据
    private void initFruitsaa(){
        Fruit a=new Fruit("FRISTH",R.drawable.tittleimage);
        fruitList.add(a);

    }
    // 初始化数据
    private void initFruits(){
        for(int i=0;i<10;i++){
            Fruit a=new Fruit("A",R.drawable.tittleimage);
            fruitList.add(a);
            Fruit b=new Fruit("B",R.drawable.tittleimage);
            fruitList.add(b);
            Fruit c=new Fruit("C",R.drawable.tittleimage);
            fruitList.add(c);
            Fruit d=new Fruit("D",R.drawable.tittleimage);
            fruitList.add(d);
        }
    }
}