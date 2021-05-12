package com.pan3d.md5;

import android.util.Log;

import com.pan3d.vo.Matrix3D;
import com.pan3d.vo.ObjectBaseBone;
import com.pan3d.vo.ObjectBone;
import com.pan3d.vo.Quaternion;
import com.pan3d.vo.Vector3D;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.regex.Pattern;

public class Md5animAnalysis {
    private static final String TAG ="Md5animAnalysis" ;
    public List<List<ObjectBone>> allFrames;
    public boolean framesok;

    private HashMap _dir;
    private List<ObjectBone>  _hierarchyitem ;
    private List<String> _hierarchy ;
    private List<String> _baseframe ;
    private List _bounds ;
    private HashMap<Integer,List<String>> _frame ;
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
        this._frame = new HashMap<>();
        this.bigArr = new ArrayList<>();
        //var ini:String = urlloader.data;
        ini=ini.replace("\t","");
        String[] arr  = ini.split("\n");

        int len = arr.length;
        String tempStr = "";
        boolean isbig = false;
        //var t:int = getTimer();
        for (int i = 0; i < len; i++) {
            String arrIndStr=arr[i];
            int dindex =  arrIndStr.indexOf("//");
            if (dindex == 0) {
                //注释行
                continue;
            }
            if (dindex != -1) {
                //包含注释
                arrIndStr =  arrIndStr.substring(0, dindex);
                //删除注释
            }
            if (arrIndStr.indexOf("{") != -1) {
                isbig = true;
            }
            if (isbig) {

                tempStr +=arrIndStr + "\n\r";

                if ( arrIndStr.indexOf("}") != -1) {
                    isbig = false;
                    this.bigArr.add(tempStr);
                    tempStr = "";
                }

            } else {

                if (!arrIndStr.equals("")) {

                    String[] arr2  =  arrIndStr.split(" ");

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
         return this.setFrameToMatrix(this.allFrames);

    }

    private List<List<Matrix3D>> setFrameToMatrix(List<List<ObjectBone>> frameAry) {
        List<List<Matrix3D>> matrixAry = new ArrayList<>();

        for (int j = 0; j < frameAry.size(); j++) {
            List<ObjectBone> boneAry = frameAry.get(j);

            Quaternion Q0 = new Quaternion();
            Matrix3D newM = new Matrix3D();

            List<Matrix3D> frameMatrixAry = new ArrayList<>();
            matrixAry.add(frameMatrixAry);

            for (int i = 0; i < boneAry.size(); i++) {

                ObjectBaseBone xyzfarme0 = boneAry.get(i);
                Q0 = new Quaternion(xyzfarme0.qx, xyzfarme0.qy, xyzfarme0.qz);
                Q0.w = this.getW(Q0.x, Q0.y, Q0.z);

                if (xyzfarme0.father == -1) {
                    newM = Q0.toMatrix3D();
                    newM.appendTranslation(xyzfarme0.tx, xyzfarme0.ty, xyzfarme0.tz);
                    newM.appendRotation(-90, Vector3D.X_AXIS);
                    //xyzfarme0.matrix = newM;
                    frameMatrixAry.add(newM);
                } else {
                    ObjectBaseBone fatherBone = boneAry.get(xyzfarme0.father);

                    newM = Q0.toMatrix3D();
                    newM.appendTranslation(xyzfarme0.tx, xyzfarme0.ty, xyzfarme0.tz);
                    //newM.append(fatherBone.matrix);
                    newM.append(frameMatrixAry.get(xyzfarme0.father));
                    frameMatrixAry.add(newM);
                    //xyzfarme0.matrix = newM;

                }
            }
            for (int i = 0; i < frameMatrixAry.size(); i++) {
                frameMatrixAry.get(i).appendScale(-1, 1, 1);  //特别标记，因为四元数和矩阵运算结果不一  先存正确的矩阵
                //xyzfarme0.matrix.appendScale(-1, 1, 1);
            }

        }

        return matrixAry;

    }

    private float getW(float x,float y,float z) {
        float t = 1 - (x * x + y * y + z * z);
        if (t < 0) {
            t = 0;
        } else {

            t = -(float) Math.sqrt(t);
        }
        return t;
    }

    private void _pushhierarchyitem() {
        String _str = "";
        String[] _arr;
        for (int i = 0; i < this._hierarchy.size(); i++) {
            List<String> tempary = this.getBoneFilterStr(this._hierarchy.get(i));
            _arr = tempary.get(1).split(" ");
            ObjectBone _temp = new ObjectBone();
            _temp.father =Integer.parseInt(_arr[0]);
            _temp.changtype =Integer.parseInt(_arr[1]);
            _temp.startIndex =Integer.parseInt(_arr[2]);
            _temp.name = tempary.get(0);
            this._hierarchyitem.add(_temp);

        }
        Log.d(TAG, "_pushhierarchyitem: ");
        this._pushbasefamer();
    }
    public  List<String>  getArrByStr(String str ) {
        List<String> outArr=new ArrayList<>();
        String[] arr= str.split(" ");
        for (int i = 0;i<arr.length; i++) {
            if(arr[i].length()>0){
                outArr.add(arr[i]);
            }
        }
        return outArr;
    }
    private void _pushbasefamer() {

        for (int i = 0; i < this._baseframe.size(); i++) {
            String[] _arr  = this._baseframe.get(i).split(" ");
            this._hierarchyitem.get(i).tx = Float.parseFloat(_arr[1]);
            this._hierarchyitem.get(i).ty = Float.parseFloat(_arr[2]);
            this._hierarchyitem.get(i).tz =Float.parseFloat(_arr[3]);
            this._hierarchyitem.get(i).qx = Float.parseFloat(_arr[6]);
            this._hierarchyitem.get(i).qy = Float.parseFloat(_arr[7]);
            this._hierarchyitem.get(i).qz = Float.parseFloat(_arr[8]);
            Log.d(TAG, "_pushbasefamer: ");
        }
       this._pushfamers();
    }

    private void _pushfamers() {

        for (int i = 0; i < this._frame.size(); i++) {
            if (this._frame.get(i)!=null) {
                this.allFrames.add(this._getsamplefamer(this._frame.get(i)));
            }
        }
        this.framesok = true;
    }

    private List<ObjectBone> _getsamplefamer(List<String> _framesample) {

        int i = 0;
        List<ObjectBone> _arr = new ArrayList<>();
        List<Float> _arrframesample  = new ArrayList<>();

        for (int js = 0; js < _framesample.size(); js++) {
            List<String> aar  =getArrByStr( _framesample.get(js));
            if (aar.size()>0 && aar.get(aar.size() - 1).length()==0 ) {
                aar.remove(aar.size()-1);
            }

            for(int linkId=0;linkId<aar.size();linkId++){
                _arrframesample.add(Float.parseFloat(aar.get(linkId)));
            }



        }
        for (i = 0; i < this._hierarchyitem.size(); i++) {
            ObjectBone _temp = new ObjectBone();
            ObjectBone _objectBone = this._hierarchyitem.get(i);
            _temp.father = _objectBone.father;
            _temp.name = _objectBone.name;
            _temp.tx = _objectBone.tx;
            _temp.ty = _objectBone.ty;
            _temp.tz = _objectBone.tz;
            _temp.qx =_objectBone.qx;
            _temp.qy = _objectBone.qy;
            _temp.qz = _objectBone.qz;

            int k=0;
            if ((_objectBone.changtype & 1) !=0) {
                _temp.tx = _arrframesample.get(_objectBone.startIndex + k);
                k++;
            }
            if ((_objectBone.changtype & 2) !=0) {
                _temp.ty = _arrframesample.get(_objectBone.startIndex + k);
                k++;
            }
            if ((_objectBone.changtype & 4) !=0) {
                _temp.tz = _arrframesample.get(_objectBone.startIndex + k);
                k++;
            }
            if ((_objectBone.changtype & 8) !=0) {
                _temp.qx = _arrframesample.get(_objectBone.startIndex + k);
                k++;
            }
            if ((_objectBone.changtype & 16) !=0) {
                _temp.qy =_arrframesample.get(_objectBone.startIndex + k);
                k++;
            }
            if ((_objectBone.changtype & 32) !=0) {
                _temp.qz =_arrframesample.get(_objectBone.startIndex + k);
                k++;
            }
            _arr.add(_temp);
        }
        return _arr;
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
        int begin = _s.indexOf("\"", 0);
        int index = _s.indexOf("\"", 1);
        String name = _s.substring(begin+1,index-begin);
        String num = _s.substring(index+1);

        List<String> outArr=new ArrayList<>();
        outArr.add(name);
        outArr.add( num.trim());
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
    Pattern pattern =Pattern.compile("[0-9]*");
    private String getOnlyNumByStrArr(String str)
    {
        String[]  matcchArr=   str.split(" ");
        for (int i=0;i<matcchArr.length;i++){
            if(pattern.matcher(matcchArr[i]).matches()){
                return matcchArr[i];
            }
        }
        return str;
    }
    public static <T> T[] concatAll(T[] first, T[]... rest) {
        int totalLength = first.length;
        for (T[] array : rest) {
            totalLength += array.length;
        }
        T[] result = Arrays.copyOf(first, totalLength);
        int offset = first.length;
        for (T[] array : rest) {
            System.arraycopy(array, 0, result, offset, array.length);
            offset += array.length;
        }
        return result;
    }
    private void handleBigWord(String str) {

        List<String>  arr;
        str=str.replace("\t","");
        str=str.replace("\r","");
        arr=getArrayByStr(str.split("\n"));
        if (str.indexOf("hierarchy") != -1) {

            for (int i = 0; i < arr.size(); i++) {
                if ( arr.get(i).indexOf("{") == -1 &&  arr.get(i).indexOf("}") == -1 && arr.get(i) != "") {
                    this._hierarchy.add(arr.get(i));
                }
            }
        }
        if (str.indexOf("bounds") != -1) {


            for (int m = 0; m < arr.size(); m++) {

                if (arr.get(m).indexOf("{") == -1 && arr.get(m).indexOf("}") == -1 && arr.get(m) != "") {

                    this._bounds.add(arr.get(m));
                }
            }
        }

        if (str.indexOf("baseframe") != -1) {

            for (int k = 0; k < arr.size(); k++) {

                if (arr.get(k).indexOf("{") == -1 && arr.get(k).indexOf("}") == -1 && arr.get(k) != "") {

                    this._baseframe.add(arr.get(k));
                }
            }
        }


        if (str.indexOf("frame") != -1 && str.indexOf("baseframe") == -1 && str.indexOf("BoneScale") == -1) {
            int arrsign=0;
            List tempArray  = new ArrayList();
            for (int w = 0; w < arr.size(); w++) {
                if (arr.get(w).indexOf("frame") != -1) {
                    String frameNum=  arr.get(w);
                    arrsign=Integer.parseInt(getOnlyNumByStrArr(frameNum));
                }
                if (arr.get(w).indexOf("{") == -1 && arr.get(w).indexOf("}") == -1 && arr.get(w) != "") {
                    tempArray.add(arr.get(w));
                }


                this._frame.put(arrsign,tempArray);

            }

            Log.d(TAG, "handleBigWord: ");
        }

    }

}
