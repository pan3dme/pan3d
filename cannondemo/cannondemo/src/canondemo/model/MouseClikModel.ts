module game {
    import Vector3D = Pan3d.Vector3D;
    import Vector2D = Pan3d.Vector2D;
    import ObjData = Pan3d.ObjData
    import MathUtil = Pan3d.MathUtil
    import Rectangle = Pan3d.Rectangle
    import Display3DSprite = Pan3d.Display3DSprite
    import TestTriangle = Pan3d.TestTriangle
    import Matrix3D = Pan3d.Matrix3D
    import Groundposition = Pan3d.Groundposition

    import CanonSceneSprite = cannondis.CanonSceneSprite


    import CanonFrame3DSprite = frame3d.CanonFrame3DSprite;
    import FrameCanonPrefabSprite = frame3d.FrameCanonPrefabSprite;

    import Physics = canonkey.Physics;

    export class MouseClikModel {

        private static _instance: MouseClikModel;
        public static getInstance(): MouseClikModel {
            if (!MouseClikModel._instance) {
                MouseClikModel._instance = new MouseClikModel();
            }
            return MouseClikModel._instance;
        }
       
        public mouseClik(v2d: Vector2D): boolean {
            var $a: Vector3D = Pan3d.Scene_data.cam3D.postion
            var $rect: Rectangle = new Rectangle(0, 0, Scene_data.stageWidth, Scene_data.stageHeight)
            Scene_data.viewMatrx3D = GameDataModel.scene.viewMatrx3D.clone();
        
            var $b: Vector3D = MouseClikModel.getGroundPos(v2d.x, v2d.y, Scene_data.cam3D, $rect)

            var jiguanSpriteItem: Array<CanonFrame3DSprite> = GameLevelManeger.getInstance().jiguanSpriteItem;
            for (var i: number = 0; i < jiguanSpriteItem.length; i++) {
                var $spriteItem: Array<FrameCanonPrefabSprite> = jiguanSpriteItem[i].spriteItem
                for (var j: number = 0; j < $spriteItem.length; j++) {
                    if ($spriteItem[j].frameFileNode.frameNodeVo.name.indexOf("startup") != -1) { //机关开关
                        var $paretDis: Display3DSprite = $spriteItem[j]._directShadowDisplay3DSprite
                        var groupItem: Array<Display3DSprite> = $spriteItem[j]._directShadowDisplay3DSprite.groupItem
                        for (var k: number = 0; k < groupItem.length; k++) {
                            var $dis: Display3DSprite = groupItem[k]
                            $dis.posMatrix = $paretDis.posMatrix
                            var $isHit: boolean = this.clikSprite($dis, $a, $b);
                            if ($isHit) {
                                jiguanSpriteItem[i].clik(true)
                                return true
                            }
                        }
                    }
                }
            }
            return false

         
        }
        private clikModelItems($a: Vector3D, $b: Vector3D): boolean {
            var modelItems: Array<CanonSceneSprite> = GameLevelManeger.getInstance().modelItems;
            for (var i: number = 0; i < modelItems.length; i++) {
                var $paretDis: Display3DSprite = modelItems[i]._directShadowDisplay3DSprite
                var groupItem: Array<Display3DSprite> = modelItems[i]._directShadowDisplay3DSprite.groupItem
                for (var j: number = 0; j < groupItem.length; j++) {
                    var $dis: Display3DSprite = groupItem[j]
                    $dis.posMatrix = $paretDis.posMatrix
                    var $isHit: boolean = this.clikSprite($dis, $a, $b);
                    if ($isHit) {
                        return true
                    }
                }
            }
            return false
        }


        private static _plantObjectMath: Pan3d.ObjectMath;
        private static _plantnormal: Pan3d.Vector3D;
        private static _plane_a: Pan3d.Vector3D;
        private static cam3D: Pan3d.Camera3D;
        private static windowRect: Pan3d.Rectangle;
  
        public static getGroundPos($x: number, $y: number, $cam3D: Pan3d.Camera3D, $rect: Pan3d.Rectangle): Pan3d.Vector3D {
            this.cam3D = $cam3D;
            this.windowRect = $rect;
 
            var $ty: number = -0
            if (!this._plantObjectMath) {
                var A: Pan3d.Vector3D = new Pan3d.Vector3D(0, $ty, 500);
                var B: Pan3d.Vector3D = new Pan3d.Vector3D(-500, $ty, 0);
                var C: Pan3d.Vector3D = new Pan3d.Vector3D(500, $ty, 0);
                this._plantObjectMath = Pan3d.Calculation._PanelEquationFromThreePt(A, B, C);
                this._plantnormal = new Pan3d.Vector3D(this._plantObjectMath.a, this._plantObjectMath.b, this._plantObjectMath.c);
                this._plantnormal.normalize();
                this._plane_a = new Pan3d.Vector3D(A.x, A.y, A.z);
            }
            //计算直线与平面交点
            var line_a: Pan3d.Vector3D = this.getLookAtPosByCamDistance(new Pan3d.Vector2D($x, $y))
            var line_b: Pan3d.Vector3D = new Pan3d.Vector3D(this.cam3D.x, this.cam3D.y, this.cam3D.z)
            var crossPoint: Pan3d.Vector3D = Pan3d.Calculation.calPlaneLineIntersectPoint(this._plantnormal, this._plane_a, line_a, line_b);
            return crossPoint

        }

        private static getLookAtPosByCamDistance($point: Pan3d.Vector2D): Vector3D {
            var distance350: number = 350 * (GameData.pixelRatio / 2);
            var viewMatrx3D = GameDataModel.scene.viewMatrx3D.clone();
            var camMatrx3d: Matrix3D = GameDataModel.scene.cameraMatrix.clone()
            var fovw: number = this.windowRect.width
            var fovh: number = this.windowRect.height
            var $basePos: Vector2D = new Vector2D($point.x - (fovw / 2), -($point.y - (fovh / 2)));
            $basePos.x = $basePos.x / (fovw / 2) * distance350
            $basePos.y = $basePos.y / (fovh / 2) * distance350
         
            var buildPos: Vector3D = new Pan3d.Vector3D($basePos.x, $basePos.y, distance350)
            var uc: Pan3d.Vector3D = viewMatrx3D.transformVector(buildPos)
            uc.x = $basePos.x;
            uc.y = $basePos.y;

            var $viewMatrx3DInvert: Matrix3D = viewMatrx3D.clone();
            $viewMatrx3DInvert.invert();
            var $camMatrx3dInvert: Matrix3D = camMatrx3d.clone();
            $camMatrx3dInvert.invert();
            var eeee: Vector3D = $viewMatrx3DInvert.transformVector(uc);
            var p: Pan3d.Vector3D = $camMatrx3dInvert.transformVector(new Vector3D(eeee.x, eeee.y, distance350));
   
            return p

        }
      

        private clikSprite($dis: Display3DSprite, $a: Vector3D, $b: Vector3D): boolean {
            var hitVec2: Vector2D = MathUtil.math3DWorldtoDisplay2DPos($b)
            if ($dis.objData && $dis.objData.indexs) {
                var $objdata: ObjData = $dis.objData;
                if (!$objdata.vertices || $objdata.vertices.length<=0) {
                    $objdata.vertices = new Array
                    var dd: DataView = $objdata.baseDataView
                    var $len: number = dd.byteLength / $objdata.stride
                    for (var i: number = 0; i < $len; i++) {
                        $objdata.vertices.push(dd.getFloat32($objdata.stride * i + 0, true))
                        $objdata.vertices.push(dd.getFloat32($objdata.stride * i + 4, true))
                        $objdata.vertices.push(dd.getFloat32($objdata.stride * i + 8, true))

                    }
                }
                var hitBox2DItem: Array<Vector2D> = new Array
                for (var j: number = 0; j < $objdata.vertices.length/3; j++) {
                    var temppp: Vector3D = $dis.posMatrix.transformVector(new Vector3D($objdata.vertices[j * 3 + 0], $objdata.vertices[j * 3 + 1], $objdata.vertices[j * 3 + 2]))
                      hitBox2DItem.push(MathUtil.math3DWorldtoDisplay2DPos(temppp))
                }
      
                for (var i: number = 0; i < $objdata.indexs.length / 3; i++) {
                    TestTriangle.baseTri.p1 = hitBox2DItem[$objdata.indexs[i * 3 + 0]];
                    TestTriangle.baseTri.p2 = hitBox2DItem[$objdata.indexs[i * 3 + 1]];
                    TestTriangle.baseTri.p3 = hitBox2DItem[$objdata.indexs[i * 3 + 2]];

                    if (TestTriangle.baseTri.checkPointIn(hitVec2)) {
                        return true
                    }
                }
      
            }
            return false
            
 
        }
        

        
    }
}
