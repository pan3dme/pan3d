package com.example.four.ui.notifications;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.constraintlayout.widget.ConstraintLayout;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.Observer;
import androidx.lifecycle.ViewModelProvider;

import com.example.four.R;
import com.pan3d.base.CallBackFun;
import com.pan3d.scene.ConstrainSceneView;
import com.pan3d.vo.Vector3D;

public class NotificationsFragment extends Fragment {

    private NotificationsViewModel notificationsViewModel;
    private View rootView;
    public View onCreateView(@NonNull LayoutInflater inflater,
                             ViewGroup container, Bundle savedInstanceState) {
        notificationsViewModel =
                new ViewModelProvider(this).get(NotificationsViewModel.class);
        View root = inflater.inflate(R.layout.fragment_notifications, container, false);
        final TextView textView = root.findViewById(R.id.text_notifications);
        notificationsViewModel.getText().observe(getViewLifecycleOwner(), new Observer<String>() {
            @Override
            public void onChanged(@Nullable String s) {
                textView.setText(s);
            }
        });
        rootView=root;
        return root;
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        addConstrainSceneViewOne();


    }
    ConstrainSceneView constrainSceneViewOne;
    private void addConstrainSceneViewOne()
    {
        final ConstraintLayout constraintlayout = rootView.findViewById(R.id.glContentNotifications);
        constrainSceneViewOne =new ConstrainSceneView(this.getContext(), new CallBackFun() {
            @Override
            public void StateChange(boolean State) {

                constrainSceneViewOne.addRoleToSceneByUrl( "yezhuz.txt",new Vector3D(0,0,0));
            }
        });
        constraintlayout.addView(constrainSceneViewOne);
    }



}