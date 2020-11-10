package z3d.md5;

import android.util.Log;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import z3d.vo.Matrix3D;
import z3d.vo.ObjectBone;
import z3d.vo.Vector3D;

public class Md5animAnalysis {
    private static final String TAG ="Md5animAnalysis" ;
    public List<List<ObjectBone>> allFrames;
    public boolean framesok;

    private HashMap _dir;
    private List<ObjectBone>  _hierarchyitem ;
    private List<String> _hierarchy ;
    private List<String> _baseframe ;
    private List _bounds ;
    private List<List<String>> _frame ;
    public List<String> bigArr ;

    public HashMap resultInfo;
    private String loopKey = "inLoop";
    private String boundsKey = "mybounds";
    private String nameHeightKey = "nameheight";
    private String interKey = "inter";
    private String pos = "pos";
    /**
     * 包围盒最终数据
     */
    private List<Vector3D> _boundFrameAry;
    private List<Vector3D> _posFrameAry;
    private List<String> _interAry ;

    public List<List<Matrix3D>> addAnim(String ini) {

        this._dir = new HashMap();
        this.allFrames = new ArrayList<>();
        this.framesok = false;
        this._hierarchyitem = new ArrayList<>();
        this._hierarchy = new ArrayList<>();
        this._baseframe = new ArrayList<>();
        this._bounds = new ArrayList<>();
        this._frame = new ArrayList<>();
        this.bigArr = new ArrayList<>();
        //var ini:String = urlloader.data;
        ini=ini.replace("\t","");
        String[] arr  = ini.split("\n");

        int len = arr.length;
        String tempStr = "";
        boolean isbig = false;
        //var t:int = getTimer();
        for (int i = 0; i < len; i++) {
            int dindex =  (arr[i]).indexOf("//");
            if (dindex == 0) {
                //注释行
                continue;
            }
            if (dindex != -1) {
                //包含注释
                arr[i] =  arr[i].substring(0, dindex);
                //删除注释
            }
            if (arr[i].indexOf("{") != -1) {
                isbig = true;
            }
            if (isbig) {

                tempStr += arr[i] + "\n\r";

                if ( arr[i].indexOf("}") != -1) {
                    isbig = false;
                    this.bigArr.add(tempStr);
                    tempStr = "";
                }

            } else {

                if (arr[i] != "") {

                    String[] arr2  =  arr[i].split(" ");

                    this._dir.put(arr2[0],arr2[1]);

                    //正常行
                } else {
                    //空行
                }

            }
        }
        for (int p = 0; p < this.bigArr.size(); p++) {
             this.handleBigWord(this.bigArr.get(p));
        }

         this._pushhierarchyitem();
//        return this.setFrameToMatrix(this.allFrames);
        return null;
    }

    private void _pushhierarchyitem() {
        String _str = "";
        List _arr = new ArrayList();
 
        for (int i = 0; i < this._hierarchy.size(); i++) {
            //_str=_genewStr(_hierarchy[i]);
            List<String> tempary = this.getBoneFilterStr(this._hierarchy.get(i));
//            _arr = tempary.get(1).split(" ");
//            var _temp: ObjectBone = new ObjectBone();
//            _temp.father = Number(_arr[0]);
//            _temp.changtype = Number(_arr[1]);
//            _temp.startIndex = Number(_arr[2]);
//            _temp.name = tempary[0];
//            this._hierarchyitem.push(_temp);

        }

//        this._pushbasefamer();
    }

    private List<String> getBoneFilterStr(String _str) {
        String _s = "";
        String _t ;
        String _e = " ";
        int i = 0;
        while (i < _str.length()) {
            _t =String.valueOf(_str.charAt(i));
            switch (_t) {
                case "(":
                    break;
                case ")":
                    break;
                case "	":
                    if (_e != " ") {
                        _s = _s + " ";
                    }
                    _e = " ";
                    break;
                case " ":
                    if (_e != " ") {
                        _s = _s + " ";
                    }
                    _e = " ";
                    break;
                default:
                    _s = _s + _t;
                    _e =_t;
                    break;
            }

            i++;
        }
        int index = _s.indexOf("\"", 1);
        String name = _s.split(" ")[0];
        String num = _s.split(" ")[1];
        List<String> outArr=new ArrayList<>();
        outArr.add(name);
        outArr.add(num);
        return outArr;
    }

    private List<String> getArrayByStr(String[] baseArr)
    {
        List<String> outArr=new ArrayList<>();
        for(int i=0;i<baseArr.length;i++){
            if(baseArr[i].length()>0){
                outArr.add(baseArr[i]);
            }
        }
        return  outArr;

    }
    private void handleBigWord(String str) {
//        var reg: RegExp = /\d+/;
        List<String>  arr;
        if (str.indexOf("hierarchy") != -1) {
            arr=getArrayByStr(str.split("[\n\t]"));
            for (int i = 0; i < arr.size(); i++) {
                if ( arr.get(i).indexOf("{") == -1 &&  arr.get(i).indexOf("}") == -1 && arr.get(i) != "") {
                    this._hierarchy.add(arr.get(i));
                }
            }
        }
        if (str.indexOf("bounds") != -1) {

            arr=getArrayByStr(str.split("[\n\t]"));

            for (int m = 0; m < arr.size(); m++) {

                if (arr.get(m).indexOf("{") == -1 && arr.get(m).indexOf("}") == -1 && arr.get(m) != "") {

                    this._bounds.add(arr.get(m));
                }
            }
        }

        if (str.indexOf("baseframe") != -1) {
            arr=getArrayByStr(str.split("[\n\t]"));
            for (int k = 0; k < arr.size(); k++) {

                if (arr.get(k).indexOf("{") == -1 && arr.get(k).indexOf("}") == -1 && arr.get(k) != "") {

                    this._baseframe.add(arr.get(k));
                }
            }
        }

        if (str.indexOf("frame") != -1 && str.indexOf("baseframe") == -1 && str.indexOf("BoneScale") == -1) {
            arr=getArrayByStr(str.split("[\n\t]"));
            int arrsign=0;
            List tempArray  = new ArrayList();
            for (int w = 0; w < arr.size(); w++) {
                if (arr.get(w).indexOf("frame") != -1) {
                    arrsign=Integer.parseInt(arr.get(w));
                }
                if (arr.get(w).indexOf("{") == -1 && arr.get(w).indexOf("}") == -1 && arr.get(w) != "") {
                    tempArray.add(arr.get(w));
                }

                this._frame.add(arrsign,tempArray);
            }
        }
    }

}
