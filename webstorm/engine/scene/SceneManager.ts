﻿class SceneManager {

    private static _instance: SceneManager;
    public static getInstance(): SceneManager {
        if (!this._instance) {
            this._instance = new SceneManager();
        }
        return this._instance;
    }
    public get displayList(): Array<Display3D> {
        return this._displayList;
    }
    private _displayList: Array<Display3D>;
    private _display2DList: Array<Display3D>;
    private _displaySpriteList: Array<Display3DSprite>;
    private _displayRoleList: Array<Display3dMovie>;
    private _sceneParticleList: Array<CombineParticle>;
    private _time: number;
    //private _sceneLoader: SceneRes;
    private _ready: boolean = false;
    public render: boolean = true;
    private _sceneDic: Object;
    private _sceneQuadTree: SceneQuadTree;
    public viewFrustum: ViewFrustum;
    private _currentUrl: string;

    constructor() {
        this._displayList = new Array;
        this._displaySpriteList = new Array;
        this._displayRoleList = new Array;
        this._display2DList = new Array;
        this._sceneParticleList = new Array;
        this._time = TimeUtil.getTimer();
        //this.initSceneLoader()
        this._sceneDic = new Object;
        //var buildShader: BuildShader = new BuildShader();
        //ProgrmaManager.getInstance().registe(BuildShader.buildShader, buildShader);
        //var skyShader: SkyShader = new SkyShader();
        //ProgrmaManager.getInstance().registe(SkyShader.Sky_Shader, skyShader);
        //ProgrmaManager.getInstance().registe(LineDisplayShader.LineShader, new LineDisplayShader());
        this.initScene();
        this.viewFrustum = new ViewFrustum();
    }
    public get displayRoleList(): Array<Display3dMovie> {
        return this._displayRoleList;
    }

    // private initSceneLoader(): void {
    //     if (!Scene_data.supportBlob) {
    //         //this._sceneLoader = new SceneResLow();
    //     } else {
    //        // this._sceneLoader = new SceneRes();
    //     }

    // }

    public clearScene(): void {
        //this.clearStaticScene();
        this._displayRoleList.length = 0;
    }

    public clearStaticScene(): void {
        console.log("场景场景所有对象");
        for (var key in this._sceneDic) {
            var obj: any = this._sceneDic[key];
            if (obj instanceof CombineParticle) {
                ParticleManager.getInstance().removeParticle(obj);
                obj.destory();
            } else if (obj instanceof Display3DSprite) {
                obj.removeStage();
                obj.destory();

            }
        }

        this._ready = false;

        this._sceneDic = null;

        this._sceneQuadTree = null;

        this._displayList.length = 0;
        this._sceneParticleList.length = 0;

        AstarUtil.porcessBak(false);

    }

    public testUrl($url: string):boolean{
        return this._currentUrl == $url;
    }

    public loadScene($url: string, $completeFun: Function, $progressFun: Function, $analysisCompleteFun: Function): void {
        if (this._currentUrl == $url) {//原场景不加载
            AstarUtil.porcessBak(true);

            this._ready = true;
            $completeFun();
            $analysisCompleteFun();
            return;
        }

        this.clearStaticScene();

        this._ready = false;

        var $mapId: number = GuidData.map.tbMapVo.id

        LoadManager.getInstance().load(Scene_data.fileRoot + "pan/map2d/net/" + $mapId+".txt", LoadManager.XML_TYPE,
            ($str: string) => {
                this._sceneDic = new Object();
                Scene_data.sceneNumId++;
                MapConfig.getInstance().anlyData($str);
                AstarUtil.makeStarGraph(MapConfig.getInstance().astarItem);
                this._ready = true;
                $completeFun();
                $analysisCompleteFun();
            });
  
        this._currentUrl = $url;
    }

    private addSceneImgBg(info: any): void {
        var displayimg: Display3dBg = new Display3dBg();
        displayimg.setImgInfo(info.url, info.width, info.height);
        this.addDisplay(displayimg);
    }

    public getDisplayByID($type: number, $id: number): any {

        if ($type == 0) {
            return this._sceneDic["build" + $id];
        } else if ($type == 1) {
            return this._sceneDic["particle" + $id];
        }

    }

    public fixAstart(pos: Vector2D): void {
        for (var i: number = 0; i < this._displayRoleList.length; i++) {
            this._displayRoleList[i].fixAstartData(pos);
        }
    }




    private getGroundSprite(itemObj: any, terrain: Array<GroundDataMesh>): TerrainDisplay3DSprite {
        var itemDisplay: TerrainDisplay3DSprite = new TerrainDisplay3DSprite();
        itemDisplay.setObjUrl(itemObj.objsurl);


        itemDisplay.setMaterialUrl(itemObj.materialurl, itemObj.materialInfoArr);
        itemDisplay.materialInfoArr = itemObj.materialInfoArr

        itemDisplay.setLightMapUrl(itemObj.lighturl);
        itemDisplay.scaleX = itemObj.scaleX;
        itemDisplay.scaleY = itemObj.scaleY;
        itemDisplay.scaleZ = itemObj.scaleZ;

        itemDisplay.x = itemObj.x;
        itemDisplay.y = itemObj.y;
        itemDisplay.z = itemObj.z;

        itemDisplay.rotationX = itemObj.rotationX;
        itemDisplay.rotationY = itemObj.rotationY;
        itemDisplay.rotationZ = itemObj.rotationZ;

        itemDisplay.objData.lightuvsOffsets = itemDisplay.objData.uvsOffsets;

        if (terrain) {
            itemDisplay.setGrounDataMesh(terrain[itemObj.id])
        }
        this._sceneDic["ground" + itemObj.id] = itemDisplay;
        return itemDisplay;
    }
    private makeCollisioin(arr: Array<any>): void {

    }

    public set ready($value: boolean) {
        console.log("--setready--", $value);
        this._ready = $value;
    }

    public get ready(): boolean {
        return this._ready;
    }

    private getBuildSprite(itemObj: any): Display3DSprite {
        var itemDisplay: Display3DSprite = new Display3DSprite();
        itemDisplay.setObjUrl(itemObj.objsurl);


        itemDisplay.setMaterialUrl(itemObj.materialurl, itemObj.materialInfoArr);
        itemDisplay.materialInfoArr = itemObj.materialInfoArr
        itemDisplay.setLightMapUrl(itemObj.lighturl);
        itemDisplay.scaleX = itemObj.scaleX;
        itemDisplay.scaleY = itemObj.scaleY;
        itemDisplay.scaleZ = itemObj.scaleZ;

        itemDisplay.x = itemObj.x;
        itemDisplay.y = itemObj.y;
        itemDisplay.z = itemObj.z;

        itemDisplay.rotationX = itemObj.rotationX;
        itemDisplay.rotationY = itemObj.rotationY;
        itemDisplay.rotationZ = itemObj.rotationZ;

        itemDisplay.isPerspective = itemObj.isPerspective;


        itemDisplay.type = 0;
        itemDisplay.id = itemObj.id;
        this._sceneDic["build" + itemObj.id] = itemDisplay;

        return itemDisplay;
    }

    private getParticleSprite(itemObj: any): CombineParticle {
        var particle: CombineParticle

        particle = ParticleManager.getInstance().getParticleByte(Scene_data.fileRoot + itemObj.url);


        particle.scaleX = itemObj.scaleX;
        particle.scaleY = itemObj.scaleY;
        particle.scaleZ = itemObj.scaleZ;

        particle.x = itemObj.x;
        particle.y = itemObj.y;
        particle.z = itemObj.z;

        particle.rotationX = itemObj.rotationX;
        particle.rotationY = itemObj.rotationY;
        particle.rotationZ = itemObj.rotationZ;
        particle.type = 0;
        this._sceneDic["particle" + itemObj.id] = particle;

        return particle;
    }

    private initScene(): void {
        return;


        //this._displayList.push(new GridLineSprite());


    }

    public addDisplay($display: Display3D): void {
        if (this._displayList.indexOf($display) != -1) {
            return;
        }
        this._displayList.push($display);
        $display.addStage();
    }

    public removeDisplay($display: Display3D): void {
        var index: number = this._displayList.indexOf($display);
        if (index != -1) {
            this._displayList.splice(index, 1);
        }
        $display.removeStage();
    }
    /**
     * 动态添加的staticMesh 物件例如武器等
    */
    public addSpriteDisplay($display: Display3DSprite): void {
        if (this._displaySpriteList.indexOf($display) != -1) {
            return;
        }
        $display.addStage();
        for (var i: number = 0; i < this._displaySpriteList.length; i++) {
            if (this._displaySpriteList[i].materialUrl == $display.materialUrl) {
                this._displaySpriteList.splice(i, 0, $display);
                return;
            }
        }
        this._displaySpriteList.push($display);

    }

    public removeSpriteDisplay($display: Display3DSprite): void {
        var index: number = this._displaySpriteList.indexOf($display);
        if (index != -1) {
            this._displaySpriteList.splice(index, 1);
        }
        $display.removeStage();
    }
    /**
     * 动态添加的骨骼动画角色
     */
    public addMovieDisplay($display: Display3dMovie): void {
        this._displayRoleList.push($display);
        $display.addStage();
    }

    public addMovieDisplayTop($display: Display3dMovie): void {
        this._displayRoleList.unshift($display);
        $display.addStage();
    }

    public removeMovieDisplay($display: Display3dMovie): void {
        var index: number = this._displayRoleList.indexOf($display);
        if (index != -1) {
            this._displayRoleList.splice(index, 1);
        }
        $display.removeStage();
    }

    private setParticleVisible(): void {
        var $arr: Array<CombineParticle> = ParticleManager.getInstance().particleList
        for (var i: number = 0; $arr && i < $arr.length; i++) {
            if (!$arr[i].dynamic && $arr[i].bindVecter3d) {
                var dis: number = Vector3D.distance(new Vector3D(Scene_data.focus3D.x, Scene_data.focus3D.y, Scene_data.focus3D.z), new Vector3D($arr[i].x, $arr[i].y, $arr[i].z))
                $arr[i].sceneVisible = (dis < 1000);
            }
        }
    }
    public static mapQudaTreeDistance: number = 200;
    public test:boolean = false;
    public update(): void {
        if (this.test) {
            return;
        }
        if (this._sceneQuadTree) {
            this._sceneQuadTree.setCircle(Scene_data.focus3D.x, Scene_data.focus3D.z, SceneManager.mapQudaTreeDistance);
            if (this._sceneQuadTree.needUpdata) {
                for (var i: number = 0; i < this._displayList.length; i++) {
                    this._displayList[i].sceneVisible = false;
                    this._displayList[i].sceneVisible = true;
                }

                this.setParticleVisible()
                this._sceneQuadTree.update();
                this.mathCamFar()
            }
        }

        Engine.resetViewMatrx3D()
        Scene_data.context3D.update();
        Scene_data.context3D.setDepthTest(false);
        UIManager.getInstance().upLeyerZero();
      

        Scene_data.context3D.setDepthTest(true);
        this.updateMovieFrame();
        MathClass.getCamView(Scene_data.cam3D, Scene_data.focus3D); //一定要角色帧渲染后再重置镜头矩阵
        if (this._ready) {

            ParticleManager.getInstance().updateTime();
            SkillManager.getInstance().update();

            if (this.render) {
                this.updateStaticDiplay();
                this.updateSpriteDisplay();
                Scene_data.context3D.setWriteDepth(true);
                this.updateMovieDisplay();
                ShadowManager.getInstance().update();
                Scene_data.context3D.setWriteDepth(false);
                ParticleManager.getInstance().update();
                BloodManager.getInstance().update();

            }

        }
        Scene_data.context3D.setDepthTest(false);
        UIManager.getInstance().update();


        for (var i: number = 0; i < this._display2DList.length; i++) {
            this._display2DList[i].update()
        }


    }

    public updateFBO(): void {
        if (!Scene_data.fbo) {
            Scene_data.fbo = Scene_data.context3D.getFBO();
        }
        Scene_data.context3D.updateFBO(Scene_data.fbo);
        Scene_data.viewMatrx3D.identity();
        Scene_data.context3D.renderContext.viewport(0, 0, FBO.fw, FBO.fh);
        Scene_data.viewMatrx3D.perspectiveFieldOfViewLH(2, 1, 50, Scene_data.camFar);
        Scene_data.viewMatrx3D.appendScale(2, 2 * (Scene_data.stageWidth / Scene_data.stageHeight), 1);
        MathClass.updateVp();
        this.updateStaticDiplay();
        Engine.resetSize();
    }

    public addDisplay2DList($dis: Display3D): void {
        this._display2DList.push($dis)
    }
    private mathCamFar(): void {
        var $p: Vector3D = new Vector3D
        var $far: number = 0;
        for (var i: number = 0; i < this._displayList.length; i++) {
            var $dis: Display3DSprite = <Display3DSprite>this._displayList[i]
            if ($dis.sceneVisible && $dis.aabb) {
                var $m: Matrix3D = $dis.posMatrix.clone();
                $m.append(Scene_data.cam3D.cameraMatrix);
                var $aabbVect: Array<Vector3D> = $dis.aabbVect
                for (var k: number = 0; k < $aabbVect.length; k++) {
                    $p = Scene_data.cam3D.cameraMatrix.transformVector($aabbVect[k])
                    if ($p.z > $far) {
                        $far = $p.z
                    }
                }
                /*
                if (this._displayList[i].objData) {
                
                    for (var j: number = 0; j < $dis.objData.vertices.length/3; j++) {
                        $p.x = $dis.objData.vertices[j * 3 + 0]
                        $p.y = $dis.objData.vertices[j * 3 + 1]
                        $p.z = $dis.objData.vertices[j * 3 + 2]
                        $p = $dis.posMatrix.transformVector($p);
                        $p=Scene_data.cam3D.cameraMatrix.transformVector($p)
                        if ($p.z > $far) {
                            $far = $p.z
                        }
                    }
                }
                */
            }
        }
        Scene_data.camFar = Math.max(500, $far + 100)

        Engine.resetViewMatrx3D();

    }

    private updateStaticDiplay(): void {
        var num: number = 0;
        for (var i: number = 0; i < this._displayList.length; i++) {
            this._displayList[i].update();
            // if (this._displayList[i].sceneVisible) {
            //     num++;
            // }
        }
        // FpsMc.tipStr = "drawNum:" + (num + this._displayRoleList.length) + "/" + this._displayList.length; 


    }

    private updateSpriteDisplay(): void {
        for (var i: number = 0; i < this._displaySpriteList.length; i++) {
            this._displaySpriteList[i].update();
        }
    }

    private updateMovieDisplay(): void {
        for (var i: number = 0; i < this._displayRoleList.length; i++) {
            this._displayRoleList[i].update();
        }
    }
    private updateMovieFrame(): void {
        var t: number = TimeUtil.getTimer();
        var delay: number = t - this._time;
        this._time = t;
        for (var i: number = 0; i < this._displayRoleList.length; i++) {
            this._displayRoleList[i].updateFrame(delay);
        }
        //  FpsMc.tipStr = "人数:" + (this._displayRoleList.length) 
    }



} 