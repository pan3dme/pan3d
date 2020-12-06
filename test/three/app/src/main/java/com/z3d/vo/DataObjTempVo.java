package com.z3d.vo;

public class DataObjTempVo {


    public  String url;
    public  float frame;
    public  Vector3D beginPos;
    public  float beginType ;
    public  String beginSocket;
    public  String hitSocket;
    public  String endParticle;

    public  int multype;

    public  float speed;

    public boolean hasSocket;
    public String socket;
    public Vector3D pos;
    public Vector3D rotation;



    public DataObjTempVo()
    {
        this.beginPos=new Vector3D();
    }
}
