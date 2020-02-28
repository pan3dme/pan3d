﻿class SceneAstarModel extends UIPanel {

    private static _instance: SceneAstarModel;
    public static getInstance(): SceneAstarModel {
        if (!this._instance) {
            this._instance = new SceneAstarModel();
        }
        return this._instance;
    }
    private _astarLineSprite: MulLineSprite;
    private _showOrHide:boolean=false
    public showAstarLine(): void {
        if (!this._astarLineSprite) {
            ProgrmaManager.getInstance().registe(LineDisplayShader.LineShader, new LineDisplayShader());
            this._astarLineSprite = new MulLineSprite();
        } 
        this._showOrHide = !this._showOrHide;
        if (this._showOrHide) {
            SceneManager.getInstance().addDisplay(this._astarLineSprite);
           // this.drawTemp(AstarUtil.navmeshData.astarItem)
            this.drawTemp(MapConfig.getInstance().astarItem)

            var $k: Vector3D = AstarUtil.getWorldPosByStart2D(new Vector2D());
            this._astarLineSprite.x = $k.x;
            this._astarLineSprite.z = $k.z;
        } else {
            this.clearAstarLine();
        }
    }
    private clearAstarLine(): void
    {
        this._astarLineSprite.clear()
        this._astarLineSprite.upToGpu();
    }
    private lastMouseDownTm: number = 0;
    public mouseDownFindLoad($evt: InteractiveEvent): void {
        this.lastMouseDownTm = TimeUtil.getTimer()
    }
    public mouseMoveFindLoad($evt: InteractiveEvent): void {
        this.lastMouseDownTm = 0
    }
    public mouseUpFindLoad($evt: InteractiveEvent): void {

        if (!GameInstance.mainChar) {
            return 
        }

        if ((TimeUtil.getTimer() - this.lastMouseDownTm) < 200) {
            var $hitSceneChar: SceneChar = this.findHitChat(new Vector2D($evt.x, $evt.y));
            GameInstance.attackTarget = $hitSceneChar;
            if ($hitSceneChar) {
                AotuSkillManager.getInstance().aotuBattle = true;
                AppDataArpg.lockMainChar=true
            } else {
                AotuSkillManager.getInstance().aotuBattle = false;
                var $beginV2: Vector2D = this.getAstarBySceneV3D(new Vector3D(GameInstance.mainChar.x, 0, GameInstance.mainChar.z))
                var $toV2: Vector2D = this.getAstarSceneByMouse($evt);
                var item: Array<Vector2D> = AstarUtil.findPath2D($beginV2, $toV2);
                if (item && item.length) {
                    MainCharControlModel.getInstance().setWalkPathFun(item);
                }
            }
       
        } 
    }
    private findHitChat($evt: Vector2D): SceneChar {

        var $hitPos: Vector3D = AppDataArpg.math2Dto3DGroundarpg(new Vector2D($evt.x/2, $evt.y/2))
        if ($hitPos) {
            var $camVec: Vector3D = new Vector3D;
            $camVec.x = Scene_data.cam3D.x
            $camVec.y = Scene_data.cam3D.y
            $camVec.z = Scene_data.cam3D.z
            for (var i: number = 0; i < GameInstance.roleList.length; i++) {
                var $sceneChar: SceneChar = GameInstance.roleList[i];
                if (!$sceneChar.unit.isMain&&$sceneChar.mouseClik($camVec, $hitPos)) {
                        return $sceneChar;
                    }
               
            }
        }
        return null

    }

    //收获鼠标的A星坐标
    private getAstarSceneByMouse($evt: InteractiveEvent): Vector2D
    {

        var mouse2D: Vector2D = new Vector2D();
        mouse2D.x = $evt.x / MapConfig.Scale - AppDataArpg.sceneStagePos.x
        mouse2D.y = $evt.y / MapConfig.Scale - AppDataArpg.sceneStagePos.y

        mouse2D.x = Math.round(mouse2D.x / MapConfig.pix15.x);
        mouse2D.y = Math.round(mouse2D.y / MapConfig.pix15.y);
        return mouse2D
    }
    //3d世界坐标得到2D坐标
    public getAstarBySceneV3D($v3d:Vector3D): Vector2D
    {
        var $v2: Vector2D = AppDataArpg.getScene2DBy3Dpostion($v3d)

        $v2.x = Math.round($v2.x / MapConfig.pix15.x);
        $v2.y = Math.round($v2.y / MapConfig.pix15.y);

        return $v2
    }
    private drawTemp(astarItem: Array<Array<number>>): void {
        this._astarLineSprite.clear()
        this._astarLineSprite.baseColor = new Vector3D(0.6, 0.6, 0.6, 1);
        var w: number = astarItem[0].length;
        var h: number = astarItem.length;
        var miduX15: number = MapConfig.pix15.x / MapConfig.Scale * UIData.htmlScale
        var miduY15: number = MapConfig.pix15.y / MapConfig.Scale * UIData.htmlScale
        var $hscale: number = 1 / Math.sin(45 * Math.PI / 180)
        for (var i: number = 0; i < astarItem.length; i++) {
            for (var j: number = 0; j < astarItem[i].length; j++) {
                if (astarItem[i][j] == 1) {
                    var pos: Vector3D = new Vector3D(j * miduX15, 0, -i * miduY15);
                    pos.z = pos.z * $hscale
                    var $a: Vector3D = new Vector3D(pos.x, pos.y, pos.z)
                    var $b: Vector3D = new Vector3D(pos.x + miduX15, pos.y, pos.z)
                    var $c: Vector3D = new Vector3D(pos.x + miduX15, pos.y, pos.z - miduY15 * $hscale)
                    var $d: Vector3D = new Vector3D(pos.x, pos.y, pos.z - miduY15 * $hscale)
                    this._astarLineSprite.makeLineMode($a, $b);
                    this._astarLineSprite.makeLineMode($a, $d);
                    if (astarItem[i + 1]&&astarItem[i + 1][j] != 1) {
                        this._astarLineSprite.makeLineMode($c, $d);
                    }
                    if (astarItem[i][j + 1]&&astarItem[i ][j+1] != 1) {
                        this._astarLineSprite.makeLineMode($b, $c);
                    }

                }
            }
        }

        this._astarLineSprite.upToGpu();
    }


}