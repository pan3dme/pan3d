package com.example.four;

import android.os.Bundle;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.navigation.NavController;
import androidx.navigation.Navigation;

import android.util.Log;
import android.view.LayoutInflater;
import android.view.MenuItem;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.ListView;

import com.pan3d.base.Scene_data;
import com.pan3d.units.LoadBackFun;
import com.pan3d.units.LoadManager;
import com.pan3d.units.LoaderThread;
import com.urlhttp.CallBackUtil;
import com.urlhttp.UrlHttpUtil;

import org.json.JSONArray;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

/**
 * A simple {@link Fragment} subclass.
 * Use the {@link HomeListFragment#newInstance} factory method to
 * create an instance of this fragment.
 */
public class HomeListFragment extends Fragment {

    // TODO: Rename parameter arguments, choose names that match
    // the fragment initialization parameters, e.g. ARG_ITEM_NUMBER
    private static final String ARG_PARAM1 = "param1";
    private static final String ARG_PARAM2 = "param2";

    // TODO: Rename and change types of parameters
    private String mParam1;
    private String mParam2;

    // fruitList用于存储数据
    private List<Fruit> fruitList=new ArrayList<>();

    public HomeListFragment() {
        // Required empty public constructor
    }

    /**
     * Use this factory method to create a new instance of
     * this fragment using the provided parameters.
     *
     * @param param1 Parameter 1.
     * @param param2 Parameter 2.
     * @return A new instance of fragment HomeListFragment.
     */
    // TODO: Rename and change types and number of parameters
    public static HomeListFragment newInstance(String param1, String param2) {
        HomeListFragment fragment = new HomeListFragment();
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
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_home_list, container, false);
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);


        this.loadXmlByUrl();
    }
    private void loadXmlByUrl()
    {

        LoadManager.loadXmlByUrl("pan/test/iosmetia/jason10.xml", new LoadBackFun() {
            @Override
            public void bfun(HashMap val) {
                String str=  val.get("content").toString();
                str=  str.replace("\n","");
                str=  str.replace("/","<<<");
                str=  str.replace("\"","");
                try {
                    JSONArray jsonArray =new JSONArray(str );
                    initListData(jsonArray);
                } catch (Exception e) {
                    e.printStackTrace();
                }


            }
        });

    }



    public void  initListData(JSONArray array)
    {
        this.fruitList=new ArrayList<>();
        // 先拿到数据并放在适配器上
        for(int i=0;i<array.length();i++){

            Fruit a=new Fruit( array.optJSONObject(i) );
            fruitList.add(a);

        }
        FruitAdapter adapter=new FruitAdapter(this.getContext(),R.layout.fruit_item,fruitList);

        // 将适配器上的数据传递给listView
        ListView listView=  getView().findViewById(R.id.baseList);
        listView.setAdapter(adapter);
        this.addListEvents();
    }
    private void addListEvents()
    {
        ListView listView=  getView().findViewById(R.id.baseList);
        listView.setOnItemClickListener(new AdapterView.OnItemClickListener(){

            @Override
            public void onItemClick(AdapterView<?> parent, View view,
                                    int position, long id) {
                // TODO Auto-generated method stub
                Fruit info = fruitList.get(position);

                Bundle bundle=new Bundle();
                bundle.putString("frameName","10005");
                NavController controller= Navigation.findNavController(view);
                controller.navigate(R.id.action_homeListFragment_to_navigation_home,bundle);
            }
        });


    }

}