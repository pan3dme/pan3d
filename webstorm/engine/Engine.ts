﻿class Engine {

    public static init($caves: HTMLCanvasElement): void {

        var isIpad = /ipad/i.test(navigator.userAgent);
        var isIphone = /iPhone/i.test(navigator.userAgent);
        var isAndroid = /android/i.test(navigator.userAgent);
        var isWindow = /iindow/i.test(navigator.userAgent);

        var sUserAgent = navigator.userAgent.toLowerCase();
        //console.log("--sUserAgent--",sUserAgent,isIpad,isIphone,isAndroid,isWindow);
        if (isIpad || isIphone || isAndroid) {
            Scene_data.isPc = false;
        } else {
            Scene_data.isPc = true;
        }

        Scene_data.vpMatrix = new Matrix3D;
        Scene_data.canvas3D = $caves;
        Scene_data.context3D = new Context3D();
        Scene_data.context3D.init($caves);
        UIManager.getInstance().init();

        Scene_data.cam3D = new Camera3D;
        Scene_data.focus3D = new Object3D;
        Scene_data.focus3D.x = 0;
        Scene_data.focus3D.y = 0;
        Scene_data.focus3D.z = 0;
        Scene_data.focus3D.rotationY = 0;
        Scene_data.focus3D.rotationX = -45
        Scene_data.cam3D.distance = 250;

        Scene_data.light = new LightVo();

        Engine.testBlob();

        Engine.resetSize();

        Engine.initShadow();

        TimeUtil.init();

        PathManager.init();

    }

    public static resReady(): void {
        Engine.initPbr();
    }

    public static testBlob(): void {

        //Scene_data.supportBlob = false;
        //return;

        try {
            var blob = new Blob();
        } catch (e) {
            Scene_data.supportBlob = false;
            return;
        }
        Scene_data.supportBlob = true;
    }

    public static initPbr(): void {
        if (!Scene_data.pubLut) {
            TextureManager.getInstance().getTexture(Scene_data.fileRoot + "base/brdf_ltu.jpg", ($texture: TextureRes) => {
                Scene_data.pubLut = $texture.texture;
            }, 1);
        }

        if (!Scene_data.skyCubeMap) {
            TextureManager.getInstance().loadCubeTexture(Scene_data.fileRoot + "base/cube/e", ($ary: any) => {
                Scene_data.skyCubeMap = $ary;
            })
        }


    }

    public static initShadow(): void {
        TextureManager.getInstance().getTexture(Scene_data.fileRoot + "base/shadow.png", ($texture: TextureRes) => {
            Display3dShadow.texture = $texture.texture;
        });
    }

    public static needVertical: Boolean = true;
    public static needInputTxt: boolean = false;//在输入文本时，将不再可调整大小
    public static resetSize(): void {

        if (Engine.needInputTxt) {
            return;
        }
        //Scene_data.stageWidth = document.documentElement.clientWidth;
        //Scene_data.stageHeight = document.documentElement.clientHeight;
        //var flag: boolean = false;



        Scene_data.stageWidth = document.body.clientWidth;
        Scene_data.stageHeight = document.body.clientHeight;
        Scene_data.verticalScene = false;

        if (Scene_data.isPc) {
            Scene_data.stageWidth = 960;
            Scene_data.stageHeight = 540;
            Scene_data.canvas3D.style.left=String( (document.body.clientWidth - 960) / 2);
            Scene_data.canvas3D.style.top = String((document.body.clientHeight - 540) / 2);
        }
        console.log(Scene_data.stageWidth)

        Scene_data.canvas3D.width = Scene_data.stageWidth;
        Scene_data.canvas3D.height = Scene_data.stageHeight;

        Scene_data.context3D.resetSize(Scene_data.stageWidth, Scene_data.stageHeight);

        UIManager.getInstance().resize();
        BloodManager.getInstance().resize();


        this.resetViewMatrx3D()

        Scene_data.canvas3D.style.position = "absolute";


    }
    public static sceneCamScale: number = 1.76;
    public static resetViewMatrx3D(): void {
        if (Scene_data.viewMatrx3D) {
            Scene_data.viewMatrx3D.identity()
        } else {
            Scene_data.viewMatrx3D = new Matrix3D;
        }
        var fovw: number = Scene_data.stageWidth
        var fovh: number = Scene_data.stageHeight
        Scene_data.sceneViewHW = Math.max(fovw, fovh)

        console.log("resetViewMatrx3D", Scene_data.sceneViewHW)

        Scene_data.viewMatrx3D.appendScale(1 / Scene_data.sceneViewHW * 2, 1 / Scene_data.sceneViewHW * 2, 1 / 1000);

        Scene_data.viewMatrx3D.appendScale(1 * (Scene_data.sceneViewHW / fovw * 2), fovw / fovh * (Scene_data.sceneViewHW / fovw * 2), 1);
        Scene_data.viewMatrx3D.appendScale(2 * UIData.htmlScale, 2 * UIData.htmlScale, 1);


        if (this.resetFun) {
            this.resetFun()
        }

    }
    public static resetFun: Function
    public static update(): void {
        TimeUtil.update();
        SceneManager.getInstance().update();
        FpsMc.update();
    }

    public static unload(): void {
        //NetManager.getInstance().close();
    }


}