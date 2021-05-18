package com.example.android.ui.home;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.ViewModelProvider;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.example.android.MainRecyclerAdapter;
import com.example.android.R;

import java.util.ArrayList;
import java.util.List;

import cn.leancloud.AVObject;
import cn.leancloud.AVQuery;
import io.reactivex.Observer;
import io.reactivex.disposables.Disposable;

public class HomeFragment extends Fragment {

    private static final String TAG ="HomeFragment" ;
    private RecyclerView mRecyclerView;
    private MainRecyclerAdapter mRecyclerAdapter;
    private List<AVObject> mList = new ArrayList<>();

    private HomeViewModel homeViewModel;

    public View onCreateView(@NonNull LayoutInflater inflater,
                             ViewGroup container, Bundle savedInstanceState) {
        homeViewModel =
                new ViewModelProvider(this).get(HomeViewModel.class);
        View root = inflater.inflate(R.layout.fragment_home, container, false);

        mRecyclerView = (RecyclerView) root.findViewById(R.id.list_main_base);
        mRecyclerView.setLayoutManager(new LinearLayoutManager(root.getContext()));
        mRecyclerAdapter = new MainRecyclerAdapter(mList, root.getContext());
        mRecyclerView.setAdapter(mRecyclerAdapter);

        this.getListData();
        return root;
    }



    private  void getListData()
    {
        mList.clear();
        AVQuery<AVObject> query = new AVQuery<>("pan3dlist002");
        query.addDescendingOrder("createdAt");


        query.findInBackground().subscribe(new Observer<List<AVObject>>() {
            public void onSubscribe(Disposable disposable) {}
            public void onNext(List<AVObject> arr) {

                mList.addAll(arr);
                mRecyclerAdapter.notifyDataSetChanged();
            }
            public void onError(Throwable throwable) {}
            public void onComplete() {}
        });
    }
}