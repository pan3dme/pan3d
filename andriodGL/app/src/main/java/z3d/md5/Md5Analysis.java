package z3d.md5;

import android.util.Log;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import z3d.md5.vo.Md5MeshData;
import z3d.md5.vo.ObjectBone;
import z3d.md5.vo.ObjectTri;
import z3d.md5.vo.ObjectUv;
import z3d.md5.vo.ObjectWeight;

public class Md5Analysis {
    private static final String TAG = "Md5Analysis";
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
    public Md5MeshData addMesh(String str) {
        List<String>  arr;
        if (str.indexOf("mesh") != -1) {
            Md5MeshData meshData = new Md5MeshData();
            HashMap meshSmaple = new HashMap();
            arr=getArrayByStr(str.split("[\n\t]"));
            //调用方式

            boolean numverts = false;
            int numvertsIndex = 0;
            int currentnumvertsIndex = 0;
            List numvertsArray=new ArrayList();
            boolean numtris = false;
            int numtrisIndex = 0;
            int currentnumtrisIndex = 0;
            List numtrisArray=new ArrayList();
            boolean numweights = false;
            int numweightsIndex = 0;
            int currentnumweightsIndex = 0;
            List numweightsArray=new ArrayList();
            boolean joints=false;
            List jointAry=new ArrayList();

            for (int m = 0; m < arr.size(); m++) {


                if (numverts) {
                    if (currentnumvertsIndex < numvertsIndex) {
                        numvertsArray.add(arr.get(m));
                        currentnumvertsIndex++;

                    } else {
                        meshSmaple.put("numverts",numvertsArray);
                        numverts = false;
                    }
                }

                if (numtris) {
                    if (currentnumtrisIndex < numtrisIndex) {
                        numtrisArray.add(arr.get(m));
                        currentnumtrisIndex++;
                    } else {
                        meshSmaple.put("numtris",numtrisArray);
                        numtris = false;
                    }
                }
                if (numweights) {

                    if (currentnumweightsIndex < numweightsIndex) {
                        numweightsArray.add(arr.get(m));
                        currentnumweightsIndex++;

                    } else {
                        meshSmaple.put("numweights",numweightsArray);
                        numweights = false;
                    }
                }
                if (joints) {
                    jointAry.add(arr.get(m));

                }
                String arrMstr= arr.get(m);
                String[]  matcchArr=   arrMstr.split("[0-9]");
                if (arrMstr.indexOf("numverts") != -1) {
                    numverts = true;
                    numvertsIndex=  Integer.parseInt(  getOnlyNumByStrArr(arrMstr));

                }
                if (arrMstr.indexOf("numtris") != -1) {
                    numtris = true;
                    numtrisIndex =  Integer.parseInt(  getOnlyNumByStrArr(arrMstr));
                }
                if (arrMstr.indexOf("numweights") != -1) {
                    numweights = true;
                    numweightsIndex =  Integer.parseInt(  getOnlyNumByStrArr(arrMstr));
                }
                if (arrMstr.indexOf("joints") != -1) {
                    joints = true;
                }

                if (arrMstr.indexOf("mesh") != -1) {
                    joints = false;
                    meshSmaple.put("joints",jointAry);
                }
                if (arrMstr.indexOf("commandline") != -1) {
                }
            }
            meshData.mesh = meshSmaple;
            this.joinTri(meshData);
            this.joinPoint(meshData);
            this.joinUV(meshData);
            this.joinJoints(meshData);
            return meshData;

        }



        return  null;
    }

    private String getBoneNameByStr(String str)
    {
     List<String> arr= getArrayByStr( str.split("[\"]"));
      return arr.get(0);
    }
    private void joinJoints(Md5MeshData meshData) {

        List<String> jointAry  =   meshData.mesh.get("joints");
        meshData.boneItem = new ArrayList<>();
        for (int i = 0; i < jointAry.size(); i++) {
            String line = jointAry.get(i);
            if (line.length() < 9) {
                break;
            }
            getBoneNameByStr(line);
            String boneName=getBoneNameByStr(line);
            line = getArrayByStr( line.split("[\"]")).get(1);
            List<String> boneNameAry= getArrayByStr(line.split("[\\s+]"));
            if (boneNameAry.size() <9) {
                break;
            }
            ObjectBone bone = new ObjectBone();
            bone.name = boneName;
            bone.father =Integer.parseInt(boneNameAry.get(0));
            bone.tx = Float.parseFloat(boneNameAry.get(2));
            bone.ty = Float.parseFloat(boneNameAry.get(3));
            bone.tz = Float.parseFloat(boneNameAry.get(4));
            bone.qx =Float.parseFloat(boneNameAry.get(7));
            bone.qy = Float.parseFloat(boneNameAry.get(8));
            bone.qz =Float.parseFloat(boneNameAry.get(9));
            meshData.boneItem.add(bone);
        }
    }

    private void joinUV(Md5MeshData meshData) {

        List<String> _meshNumverts  =   meshData.mesh.get("numverts");
        meshData.uvItem = new ArrayList<>();
        String _str = "";
        String[] _arr ;
        int i = 0;
        for (i = 0; i < _meshNumverts.size(); i++) {
            _str = this.genewStr(_meshNumverts.get(i));
            if(_str.length()>0){
                _arr = _str.split(" ");
              if(_arr.length>5){
                  ObjectUv _temp = new ObjectUv();
                  _temp.id = Integer.parseInt(_arr[1]);
                  _temp.x =Float.parseFloat(_arr[2]);
                  _temp.y =Float.parseFloat(_arr[3]);
                  _temp.a = Integer.parseInt(_arr[4]);
                  _temp.b =Integer.parseInt(_arr[5]);
                  meshData.uvItem.add(_temp);
              }
            }

        }
    }

    private void joinPoint(Md5MeshData meshData) {
        List<String> _meshNumweights  =   meshData.mesh.get("numweights");
        meshData.weightItem = new ArrayList<>();
        String _str = "";
        String[] _arr;
        for (int i = 0; i < _meshNumweights.size(); i++) {
            _str = this.genewStr(_meshNumweights.get(i));
            if(_str.length()>0){
                _arr = _str.split(" ");
                if(_arr.length>6){
                    ObjectWeight _temp = new ObjectWeight();
                    _temp.id =Integer.parseInt(_arr[1]);
                    _temp.boneId = Integer.parseInt(_arr[2]);
                    _temp.w = Float.parseFloat(_arr[3]);
                    _temp.x = Float.parseFloat(_arr[4]);
                    _temp.y = Float.parseFloat(_arr[5]);
                    _temp.z =Float.parseFloat(_arr[6]);
                    meshData.weightItem.add(_temp);
                }

            }

        }
    }

    private void joinTri(Md5MeshData meshData) {
        List<String> _meshNumtris  =   meshData.mesh.get("numtris");

        meshData.triItem = new ArrayList<>();
        String _str = "";
        String[] _arr  ;

        for (int i = 0; i < _meshNumtris.size(); i++) {
            _str = this.genewStr(_meshNumtris.get(i));
            if(_str.length()>0){
             _arr = _str.split(" ");
             if(_arr.length>4){
                 ObjectTri _temp  = new ObjectTri();
                 _temp.id =Integer.parseInt(_arr[1]);
                 _temp.t0 =Integer.parseInt(_arr[2]);
                 _temp.t1 =Integer.parseInt(_arr[3]);
                 _temp.t2 =Integer.parseInt(_arr[4]);
                 meshData.triItem.add(_temp);
             }

            }



        }

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
    private String genewStr(String _str) {
        String _s="" ;
        String _t="";
        String _e=" ";
        int i = 0;
        while (i < _str.length()) {
            _t = String.valueOf(_str.charAt(i));
            switch (_t) {
                case "(":
                    break;
                case ")":
                    break;
                case "\"":
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
                    _e = String.valueOf(_t);
                    break;
            }

            i++;
        }

        return _s;
    }

}
