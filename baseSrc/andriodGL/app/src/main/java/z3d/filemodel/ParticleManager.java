package z3d.filemodel;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Set;

import z3d.base.ByteArray;
import z3d.base.ResGC;
import z3d.display.particle.CombineParticle;
import z3d.display.particle.CombineParticleData;
import z3d.scene.Scene3D;
import z3d.units.TimeUtil;


public class ParticleManager extends ResGC {
    public List<CombineParticle> particleList;
    public  float time;
    public Scene3D scene3d;
    private HashMap<String,List<CombineParticle>> renderDic;
    private static ParticleManager _instance;
    public static ParticleManager getInstance()  {
        if (ParticleManager._instance==null) {
            ParticleManager._instance = new ParticleManager();
        }
        return ParticleManager._instance;
    }
    public  ParticleManager()
    {
        super();

        this.particleList=new ArrayList<>();
        this.renderDic=new HashMap<>();
        this.time=0;

    }


    public void addResByte(String url, ByteArray data) {
        if (!this.dic.containsKey(url)) {
            CombineParticleData baseData   = new CombineParticleData();
            baseData.setDataByte(data);
            this.dic.put(url,baseData);
        }
    }

    public CombineParticle getParticleByte(String $url)
    {
        $url = $url.replace("_byte.txt", ".txt");
        $url = $url.replace(".txt", "_byte.txt");
        CombineParticle combineParticle = new CombineParticle();
        String url = $url;
        if (this.dic.containsKey(url)) {
            CombineParticleData baseData  =(CombineParticleData) this.dic.get(url);
            combineParticle = baseData.getCombineParticle();
        }

        return combineParticle;
    }
    public void addParticle(CombineParticle particle )
    {
        this.particleList.add(particle);
        this.addRenderDic(particle);
    }
    public  void clearAll(){
        this.particleList=new ArrayList<>();
        this.renderDic=new HashMap<>();
    }

    private   void  addRenderDic(CombineParticle particle )
    {
        String url=particle.url;
        if( !this.renderDic.containsKey(url)){
            this.renderDic.put(url,new ArrayList<CombineParticle>());
        }
        this.renderDic.get(url).add(particle);

    }
    public  void  upFrame()
    {
         this. updateTime();
         this. updateRenderDic();


    }
    public void   updateTime()
    {
        float _tempTime=  TimeUtil.getTimer();
        float t = _tempTime - this.time;
        this.time=_tempTime;
        Set<String> set=this.renderDic.keySet();
        for (String url : set) {
            List<CombineParticle> arr=    this.renderDic.get(url);
            for (int i=0;i<arr.size();i++){
                CombineParticle dic=  arr.get(i);
                dic.updateTime(t);

            }

        }


    }

    public void   updateRenderDic()
    {
        Set<String> set=this.renderDic.keySet();
        for (String url : set) {
            List<CombineParticle> arr=    this.renderDic.get(url);
            for (int i=0;i<arr.size();i++){
                CombineParticle dic=  arr.get(i);
                dic.upData(this.scene3d);

            }

        }

    }

    public void removeParticle(CombineParticle particle) {

        int indexs = this.particleList.indexOf(particle);
        if (indexs == -1) {
            return;
        }
        this.particleList.remove(indexs);
        this.removeRenderDic(particle);
    }

    private void removeRenderDic(CombineParticle $particle) {
        String url = $particle.url;
        int indexs = this.renderDic.get(url).indexOf($particle);
        if (indexs == -1) {
            return;
        }
        this.renderDic.get(url).remove(indexs);
        if (this.renderDic.get(url).size() == 0) {
             this.renderDic.remove(url);
        }
    }
}
