import GridLineSprite = Pan3d.GridLineSprite;
import ProgrmaManager = Pan3d.ProgrmaManager;
import LineDisplayShader = Pan3d.LineDisplayShader;
import SceneManager = Pan3d.SceneManager;
import SceneBaseChar=Pan3d.SceneBaseChar;
import ParticleManager=Pan3d.ParticleManager;
import GroupDataManager=Pan3d.GroupDataManager;
import GroupItem=Pan3d.GroupItem;
import CombineParticle=Pan3d.CombineParticle;
import BaseRes=Pan3d.BaseRes;
import Scene_data=Pan3d.Scene_data;

class TpGame {



    /**是否是外网 */
    public static outNet: boolean = false;
    public static GM: boolean = true
    public static ready: boolean = false;
    public uiReadyNum: number = 0;
    public uiAllNum: number = 0;
    public init(): void {

        this.loadDataComplet();
    }
    private loadDataComplet(): void {
          ProgrmaManager.getInstance().registe(LineDisplayShader.LineShader,new LineDisplayShader());
 
      
        SceneManager.getInstance().ready=true;
        
         SceneManager.getInstance().addDisplay( new   GridLineSprite());

     
         this.loadBaseLyf();
         
        
        
    }
    private loadBaseLyf(): void
    {
    //    var url: String  = "model/" + "10018" + "_lyf.txt";
       var url: String  = "model/" + "10018" + "_lyf.txt";
        GroupDataManager.getInstance().getGroupData( Scene_data.fileRoot + url, function (groupRes) {
            
            for (var i: number = 0; i < groupRes.dataAry.length; i++) {
                var item: GroupItem = groupRes.dataAry[i];
 
               
                if (item.types == BaseRes.SCENE_PARTICLE_TYPE) {
                    var particle: CombineParticle = ParticleManager.getInstance().getParticleByte(Scene_data.fileRoot + item.particleUrl);
                 
                    ParticleManager.getInstance().addParticle(particle);
                     
                }  

            }
        });
         
    }
    private loadBaseMap(): void
    {
         
    }
    private loadBaseRole(): void
    {
        var sceneBaseChar:SceneBaseChar=new SceneBaseChar();
        sceneBaseChar.setRoleUrl("role/50011.txt");
        SceneManager.getInstance().addMovieDisplay(sceneBaseChar);


    }
}