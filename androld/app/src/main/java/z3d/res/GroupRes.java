package z3d.res;



import z3d.base.ByteArray;

import z3d.base.GroupBackFun;

public class GroupRes extends BaseRes {

    public void  loadComplete(byte[] buff, GroupBackFun bfun)
    {

        this._byte =new ByteArray(buff);

    }
}
