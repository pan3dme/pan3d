import GridLineSprite = Pan3d.GridLineSprite;
import ProgrmaManager = Pan3d.ProgrmaManager;
import LineDisplayShader = Pan3d.LineDisplayShader;
import SceneManager = Pan3d.SceneManager;
import SceneBaseChar = Pan3d.SceneBaseChar;

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
        ProgrmaManager.getInstance().registe(LineDisplayShader.LineShader, new LineDisplayShader());
        SceneManager.getInstance().ready = true;
        SceneManager.getInstance().addDisplay(new GridLineSprite());
        var sceneBaseChar: SceneBaseChar = new SceneBaseChar();
        sceneBaseChar.setRoleUrl("role/50011.txt");
        SceneManager.getInstance().addMovieDisplay(sceneBaseChar);
        Pan3d.Scene_data.cam3D.distance = 200;



    }
    private loadBaseMap(): void {

    }
}