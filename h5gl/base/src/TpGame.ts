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
import InteractiveEvent=Pan3d.InteractiveEvent;
import GameMouseManager=Pan3d.GameMouseManager;
import Display3dMovie=Pan3d.Display3dMovie;
import SceneChar=Pan3d.SceneChar;

class TpGame {



    /**是否是外网 */
    public static outNet: boolean = false;
    public static GM: boolean = true
    public static ready: boolean = false;
    public uiReadyNum: number = 0;
    public uiAllNum: number = 0;
    public init(): void {

        this.loadDataComplet();
        GameMouseManager.getInstance().addMouseEvent();
        Scene_data.uiStage.addEventListener(InteractiveEvent.Down, this.onDown, this);

        this.addRoleMove();
    }
    private addRoleMove():void
    {
        var sc:Display3dMovie=new Display3dMovie();
        sc.setRoleUrl("role/50011.txt");
        sc.addPart(SceneChar.WEAPON_PART ,SceneChar.WEAPON_DEFAULT_SLOT,"model/50011.txt" );
        SceneManager.getInstance().addMovieDisplay(sc);
    }
    protected onDown(event: InteractiveEvent): void {
         console.log(event)
        //  this.loadBaseLyf();
     
    }
    private loadDataComplet(): void {
          ProgrmaManager.getInstance().registe(LineDisplayShader.LineShader,new LineDisplayShader());
 
      
        SceneManager.getInstance().ready=true;

     
        
         SceneManager.getInstance().addDisplay( new   GridLineSprite());

        Scene_data.cam3D.distance=200;
        Scene_data.cam3D.distance = 200;
        Scene_data.cam3D.rotationX =-30;
        Scene_data.cam3D.rotationY=45;

      
    }
    private loadBaseLyf(): void
    {
    //    var url: String  = "model/" + "10018" + "_lyf.txt";
    //    var url: String  = "model/" + "10018" + "_lyf.txt";
       var url: String  = "model/" + "levelup" + "_lyf.txt";
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