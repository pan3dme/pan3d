package scene.dis;

import androidx.lifecycle.MutableLiveData;
import androidx.lifecycle.ViewModel;

public class MyViewModel extends ViewModel {
    private MutableLiveData<Integer> aTimeScore;
    private MutableLiveData<Integer> bTimeScore;
    private int aBack,bBack;

    public MutableLiveData<Integer> getaTimeScore() {
        if(aTimeScore==null){
            aTimeScore=new MutableLiveData<>();
            aTimeScore.setValue(0);
        }
        return aTimeScore;
    }

    public MutableLiveData<Integer> getbTimeScore() {
        if (bTimeScore==null){
            bTimeScore=new MutableLiveData<>();
            bTimeScore.setValue(0);
        }
        return bTimeScore;
    }

    public void aTimeAdd(int val)
    {
        saveLastData();
        aTimeScore.setValue(aTimeScore.getValue()+val);
    }
    public void bTimeAdd(int val)
    {
        saveLastData();
        bTimeScore.setValue(bTimeScore.getValue()+val);
    }
    private void saveLastData()
    {
        aBack=aTimeScore.getValue();
        bBack=bTimeScore.getValue();
    }
    public void unDo(){
        aTimeScore.setValue(aBack);
        bTimeScore.setValue(bBack);
    }
    public void reset()
    {
        saveLastData();
        aTimeScore.setValue(0);
        bTimeScore.setValue(0);
    }
}
