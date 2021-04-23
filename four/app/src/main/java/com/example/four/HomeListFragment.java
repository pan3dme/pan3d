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

import com.google.gson.JsonObject;
import com.pan3d.base.Scene_data;
import com.pan3d.units.LoadBackFun;
import com.pan3d.units.LoadManager;
import com.pan3d.units.LoaderThread;
import com.urlhttp.CallBackUtil;
import com.urlhttp.UrlHttpUtil;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import cn.leancloud.AVObject;
import cn.leancloud.AVQuery;
import cn.leancloud.AVUser;
import cn.leancloud.gson.GsonArray;
import cn.leancloud.json.JSONArray;
import io.reactivex.Observer;
import io.reactivex.disposables.Disposable;

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

    private void attemptLogin() {


        final String username = "pan3dme";
        final String password = "1343";


            AVUser.logIn(username,password).subscribe(new Observer<AVUser>() {
                @Override
                public void onSubscribe(Disposable d) {

                }
                @Override
                public void onNext(AVUser avUser) {
                    getInfoTemp();
                }
                @Override
                public void onError(Throwable e) {
                    Log.d("Throwable", "onError: ");
                }
                @Override
                public void onComplete() {

                }
            });

    }
    private  void getInfoTemp()
    {
        AVQuery<AVObject> query = new AVQuery<>("pan3dlist");
        query.findInBackground().subscribe(new Observer<List<AVObject>>() {
            public void onSubscribe(Disposable disposable) {}
            public void onNext(List<AVObject> todos) {
                // 获取需要更新的 todo



                try {
                    initListDataCopy(todos);
                } catch (Exception e) {
                    e.printStackTrace();
                }

            }
            public void onError(Throwable throwable) {}
            public void onComplete() {}
        });
    }

    public void  initListDataCopy(List<AVObject> array) throws JSONException {

        this.fruitList=new ArrayList<>();
        // 先拿到数据并放在适配器上
        for(int i=0;i<array.size();i++){

            AVObject avObject= array.get(i);


            Fruit a=new Fruit( avObject );
            fruitList.add(a);

        }
        FruitAdapter adapter=new FruitAdapter(this.getContext(),R.layout.fruit_item,fruitList);
        // 将适配器上的数据传递给listView
        ListView listView=  getView().findViewById(R.id.baseList);
        listView.setAdapter(adapter);
        this.addListEvents();
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


        this.attemptLogin();
    }
    private void loadXmlByUrl()
    {

        LoadManager.loadXmlByUrl("pan/test/iosmetia/jason12.xml", new LoadBackFun() {
            @Override
            public void bfun(HashMap val) {



            }
        });

    }




    private void addListEvents()
    {
        ListView listView=  getView().findViewById(R.id.baseList);
        listView.setOnItemClickListener(new AdapterView.OnItemClickListener(){

            @Override
            public void onItemClick(AdapterView<?> parent, View view,
                                    int position, long id) {
                // TODO Auto-generated method stub
                Fruit fruit = fruitList.get(position);
                Bundle bundle=new Bundle();




                bundle.putString("data",  fruit.getSceneInfoSt());






                NavController controller= Navigation.findNavController(view);
                controller.navigate(R.id.action_homeListFragment_to_baseSceneFragment,bundle);


            }
        });


    }

}