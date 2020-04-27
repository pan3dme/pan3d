package z3d.res;

import android.util.Log;

import z3d.base.ByteArray;
import z3d.base.CallBackFun;


public class SceneRes extends BaseRes {

    public void load(String url) {

    }
    public void  loadComplete(byte[] buff)
    {
        this._byte =new ByteArray(buff);
        this.applyByteArray();
    }
    public void applyByteArray() {

        this.version = this._byte.readInt();
        Log.d("SceneRes版本 ->",   this.version+"===> " );
        this.read(new CallBackFun() {
            @Override
            public void StateChange(boolean State) {
                readNext();
            }
        });
    }
    private void   readNext()
    {
        read();
        read();
        read();


    }
    private void  readScene()
    {
        int types = this._byte.readInt();

        int t=1;
        /*
        this.readAstat();
        if (this.version >= 28) {
            this.readTerrainIdInfoBitmapData(this._byte)
        }
        var size: number = this._byte.readInt();
        this.sceneData = JSON.parse(this._byte.readUTFBytes(size));
        this.sceneData.astar = this._astarDataMesh;
        this.sceneData.terrain = this._terrainDataItem;

         */
    }



}
