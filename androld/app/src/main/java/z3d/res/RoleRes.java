package z3d.res;

import android.util.Log;

import java.util.ArrayList;
import java.util.List;

import z3d.base.ByteArray;

import z3d.base.CallBackFun;
import z3d.base.RoleBackFun;
import z3d.filemodel.MeshDataManager;
import z3d.units.AnimManager;
import z3d.vo.SkinMesh;
import z3d.vo.Vector3D;

public class RoleRes extends BaseRes {
    public String roleUrl;
    public List<String> actionAry ;
    private RoleBackFun bfun;
    public int meshBatchNum;
    public Vector3D ambientLightColor;
    public float ambientLightIntensity;
    public Vector3D sunLigthColor;
    public float sunLigthIntensity;
    public Vector3D nrmDircet;


    public void  loadComplete(byte[] buff, RoleBackFun bfun)
    {
        this._byte =new ByteArray(buff);
        this.version = this._byte.readInt();

        this.readMesh();
        this.readAction();
        this.read(new CallBackFun() {
            @Override
            public void StateChange(boolean State) {
                readNext();
            }
        });;//readimg

    }
    private void   readNext() {


    }
    public void readMesh() {
        this.roleUrl = this._byte.readUTF();
        if (this.version >= 16) { //环境参数
            this.ambientLightColor = new Vector3D();
            this.sunLigthColor = new Vector3D();
            this.nrmDircet = new Vector3D();

            this.ambientLightColor.x = this._byte.readFloat();
            this.ambientLightColor.y = this._byte.readFloat();
            this.ambientLightColor.z = this._byte.readFloat();
            this.ambientLightIntensity = this._byte.readFloat();
            this.ambientLightColor.scaleBy(this.ambientLightIntensity);

            this.sunLigthColor.x = this._byte.readFloat();
            this.sunLigthColor.y = this._byte.readFloat();
            this.sunLigthColor.z = this._byte.readFloat();
            this.sunLigthIntensity = this._byte.readFloat();
            this.sunLigthColor.scaleBy(this.sunLigthIntensity);

            this.nrmDircet.x = this._byte.readFloat();
            this.nrmDircet.y = this._byte.readFloat();
            this.nrmDircet.z = this._byte.readFloat();
        }

          MeshDataManager.getInstance().readData(this._byte, this.meshBatchNum, this.roleUrl, this.version);


    }
    private void readAction() {
        ByteArray $actionByte;
        if (this.version >= 30) {
            $actionByte = this.getZipByte(this._byte);
        } else {
            $actionByte = this._byte;
        }
        this.actionAry = new ArrayList<>();
        int actionNum = $actionByte.readInt();
        for (int i = 0; i < actionNum; i++) {
            String actionName = $actionByte.readUTF();
            Log.d(actionName, "actionName: ");
            AnimManager.getInstance().readData($actionByte, this.roleUrl + actionName);
            this.actionAry.add(actionName);
        }


    }

}
