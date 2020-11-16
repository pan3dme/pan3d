module cannondis {
    import Display3DSprite = Pan3d.Display3DSprite;
    import Vector3D = Pan3d.Vector3D;
    import Quaternion = Pan3d.Quaternion;
    import Vector2D = Pan3d.Vector2D;
    import Matrix3D = Pan3d.Matrix3D;
    import SceneManager = Pan3d.SceneManager;

    import Scene_data = Pan3d.Scene_data;
    import ObjDataManager = Pan3d.ObjDataManager;
    import ObjData = Pan3d.ObjData;
    import Shader3D = Pan3d.Shader3D;
    import ProgrmaManager = Pan3d.ProgrmaManager;
    import DirectShadowDisplay3DSprite = shadow.DirectShadowDisplay3DSprite;
    import ShadowModel = shadow.ShadowModel;
    import GameDataModel = game.GameDataModel;


   

    export class DynamicDirectShadowColorSprite extends DirectShadowColorSprite {

        private dynamicShader: Shader3D
        protected initData(): void {


            super.initData()
            ProgrmaManager.getInstance().registe(MainNoShadowShader.MainNoShadowShader, new MainNoShadowShader);
            this.dynamicShader = ProgrmaManager.getInstance().getProgram(MainNoShadowShader.MainNoShadowShader);
        }
        protected drawTemp($dis: Display3DSprite): void {


            var $objdata: ObjData = $dis.objData;
            var $shader: Shader3D = this.dynamicShader;
            if ($objdata && $objdata.indexBuffer && this._uvTextureRes) {
                Scene_data.context3D.setProgram($shader.program);

                var $numr: Vector3D = new Vector3D(0.5, 0.6, -0.7);
                $numr.normalize()
                var mGamA: Matrix3D = new Matrix3D;
                mGamA.appendRotation(-game.GameDataModel.gameAngle, Vector3D.Y_AXIS);
                $numr = mGamA.transformVector($numr)

                Scene_data.context3D.setVc3fv($shader, "sunDirect", [$numr.x, $numr.y, $numr.z]);
                Scene_data.context3D.setVc3fv($shader, "sunColor", [0.6, 0.6, 0.6]);
                Scene_data.context3D.setVc3fv($shader, "ambientColor", [0.4, 0.4, 0.4]);


 

                Scene_data.context3D.setVcMatrix3fv($shader, "rotationMatrix3D", $dis._rotationData);
                Scene_data.context3D.setVcMatrix4fv($shader, "vpMatrix3D", Scene_data.vpMatrix.m);
                Scene_data.context3D.setVcMatrix4fv($shader, "posMatrix3D", this.posMatrix.m);

                Scene_data.context3D.setRenderTexture($shader, "fs0", this._uvTextureRes.texture, 0);

                Scene_data.context3D.renderContext.bindBuffer(Scene_data.context3D.renderContext.ARRAY_BUFFER, $objdata.vertexBuffer);


                Scene_data.context3D.setVaOffset(0, 3, $objdata.stride, 0);
                Scene_data.context3D.setVaOffset(1, 2, $objdata.stride, $objdata.uvsOffsets);
                Scene_data.context3D.setVaOffset(2, 3, $objdata.stride, $objdata.normalsOffsets);

                Scene_data.context3D.drawCall($objdata.indexBuffer, $objdata.treNum);
             
          
                 
            }
        }
 
    }

}