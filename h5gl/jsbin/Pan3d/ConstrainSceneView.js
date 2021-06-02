var DisplayBaseSprite = Pan3d.DisplayBaseSprite;
var Context3D = Pan3d.Context3D;
var Display3dMovie = Pan3d.Display3dMovie;
var Pan3d;
(function (Pan3d) {
    var ConstrainSceneView = /** @class */ (function () {
        function ConstrainSceneView(value) {
            this.canvas3D = value;
            var gl = this.canvas3D.getContext('webgl', { stencil: true, alpha: true, depth: true, antialias: false })
                || this.canvas3D.getContext('experimental-webgl', { stencil: true, alpha: true, depth: true, antialias: false });
            this.renderContext = gl;
            this.scene3D = new Pan3d.Scene3D(this.renderContext);
            this.scene3D.camera3D.distance = 200;
            this.scene3D.camera3D.rotationX = -30;
            this.scene3D.camera3D.rotationY = 45;
            this.addEvents();
            // this.loadSceneByUrl("10002");
            // this.addFrame3dSprite();
        }
        ConstrainSceneView.prototype.playFrame3dSprite = function () {
            var frame3dSprite = new Pan3d.Frame3dSprite(this.scene3D);
            this.scene3D.addDisplay(frame3dSprite);
            return frame3dSprite;
        };
        ConstrainSceneView.prototype.addEvents = function () {
            Pan3d.GameMouseManager.getInstance().addMouseEvent(this.canvas3D);
            Pan3d.GameMouseManager.getInstance().uiBlankStage.addEventListener(Pan3d.InteractiveEvent.Down, this.onDown, this);
            Pan3d.GameMouseManager.getInstance().uiBlankStage.addEventListener(Pan3d.InteractiveEvent.Move, this.onMove, this);
            Pan3d.GameMouseManager.getInstance().uiBlankStage.addEventListener(Pan3d.InteractiveEvent.Up, this.onUp, this);
            Pan3d.GameMouseManager.getInstance().uiBlankStage.addEventListener(Pan3d.InteractiveEvent.WheelEvent, this.onWheelEvent, this);
        };
        ConstrainSceneView.prototype.onWheelEvent = function (event) {
            this.scene3D.camera3D.distance -= event.data;
        };
        ConstrainSceneView.prototype.onDown = function (event) {
            this.downPos = new Pan3d.Vector2D(event.mouseEvent.x, event.mouseEvent.y);
            this.lastCame = new Pan3d.Camera3D();
            this.lastCame.rotationX = this.scene3D.camera3D.rotationX;
            this.lastCame.rotationY = this.scene3D.camera3D.rotationY;
            this.lastCame.distance = this.scene3D.camera3D.distance;
        };
        ConstrainSceneView.prototype.onMove = function (event) {
            if (this.downPos) {
                this.scene3D.camera3D.rotationY = this.lastCame.rotationY + (this.downPos.x - event.mouseEvent.x);
                this.scene3D.camera3D.rotationX = this.lastCame.rotationX + (this.downPos.y - event.mouseEvent.y);
            }
        };
        ConstrainSceneView.prototype.onUp = function (event) {
            this.downPos = null;
        };
        ConstrainSceneView.prototype.loadSceneByUrl = function (value) {
            var _this = this;
            this.scene3D.camera3D.distance = 1500;
            var sceneRes = new Pan3d.SceneRes(this.scene3D);
            //10002
            //2014
            sceneRes.load(value, function () {
                var buildAry = sceneRes.sceneData.buildItem;
                //  //console.log(obj.fogDistance)
                var d = sceneRes.sceneData.fogDistance * 1; //1000
                var s = sceneRes.sceneData.fogAttenuation; //0.5.
                _this.scene3D.fogData = [d * s, 1 / ((1 - s) * d)];
                for (var i = 0; i < buildAry.length; i++) {
                    var itemObj = buildAry[i];
                    if (itemObj.type == Pan3d.BaseRes.PREFAB_TYPE) {
                        _this.scene3D.addDisplay(_this.getBuildSprite(itemObj));
                    }
                    else if (itemObj.type == Pan3d.BaseRes.SCENE_PARTICLE_TYPE) {
                        var particle = _this.getParticleSprite(itemObj);
                        _this.scene3D.particleManager.addParticle(particle);
                    }
                }
            }, function () {
            }, function () {
            });
        };
        ConstrainSceneView.prototype.getParticleSprite = function (itemObj) {
            var particle;
            particle = this.scene3D.particleManager.getParticleByte(this.scene3D.fileRoot + itemObj.url);
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
            return particle;
        };
        ConstrainSceneView.prototype.getBuildSprite = function (value) {
            var itemDisplay = new Pan3d.Display3DSprite(this.scene3D);
            itemDisplay.setObjUrl(value.objsurl);
            itemDisplay.setMaterialUrl(value.materialurl, value.materialInfoArr);
            if (value.lighturl) {
                itemDisplay.setLighturl(value.lighturl);
            }
            itemDisplay.scaleX = value.scaleX;
            itemDisplay.scaleY = value.scaleY;
            itemDisplay.scaleZ = value.scaleZ;
            itemDisplay.x = value.x;
            itemDisplay.y = value.y;
            itemDisplay.z = value.z;
            itemDisplay.rotationX = value.rotationX;
            itemDisplay.rotationY = value.rotationY;
            itemDisplay.rotationZ = value.rotationZ;
            return itemDisplay;
        };
        ConstrainSceneView.prototype.resetSize = function () {
            var mixNum = Math.min(document.body.clientWidth, document.body.clientHeight);
            var stageWidth = mixNum;
            var stageHeight = mixNum;
            this.canvas3D.width = stageWidth;
            this.canvas3D.height = stageHeight;
            this.renderContext.viewport(0, 0, stageWidth, stageHeight);
            // this.canvas3D.style.position = "absolute";
            // this.canvas3D.style.left = "0px";
            // this.canvas3D.style.top = "0px";
            /*
            var mixNum:number=400;
            var stageWidth: number = mixNum;
            var stageHeight: number =mixNum;
            this.canvas3D.width = stageWidth;
            this.canvas3D.height = stageHeight;
            this.renderContext.viewport(0, 0, stageWidth, stageHeight);
            */
        };
        ConstrainSceneView.prototype.clearAll = function () {
            console.log("清理");
            this.scene3D.clearAll();
        };
        ConstrainSceneView.prototype.upFrame = function () {
            this.scene3D.upFrame();
        };
        ConstrainSceneView.prototype.addRoleToSceneByUrl = function (val, pos) {
            var sc = new Pan3d.SceneChar(this.scene3D);
            sc.setRoleUrl("role/" + val + ".txt");
            sc.x = pos.x;
            sc.y = pos.y;
            sc.z = pos.z;
            this.scene3D.addMovieDisplay(sc);
            // sc.addPart(SceneChar.WEAPON_PART, SceneChar.WEAPON_DEFAULT_SLOT, "model/50011.txt");
            return sc;
        };
        ConstrainSceneView.prototype.playParticle = function (name) {
            var _this = this;
            // var url: string = "model/" + name + "_lyf.txt";
            this.scene3D.groupDataManager.getGroupData(this.scene3D.fileRoot + name, function (groupRes) {
                for (var i = 0; i < groupRes.dataAry.length; i++) {
                    var item = groupRes.dataAry[i];
                    var posV3d;
                    var rotationV3d;
                    var scaleV3d;
                    if (item.isGroup) {
                        posV3d = new Pan3d.Vector3D(item.x, item.y, item.z);
                        rotationV3d = new Pan3d.Vector3D(item.rotationX, item.rotationY, item.rotationZ);
                        scaleV3d = new Pan3d.Vector3D(item.scaleX, item.scaleY, item.scaleZ);
                    }
                    if (item.types == Pan3d.BaseRes.SCENE_PARTICLE_TYPE) {
                        var particle = _this.scene3D.particleManager.getParticleByte(_this.scene3D.fileRoot + item.particleUrl);
                        _this.scene3D.particleManager.addParticle(particle);
                    }
                }
            });
        };
        return ConstrainSceneView;
    }());
    Pan3d.ConstrainSceneView = ConstrainSceneView;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=ConstrainSceneView.js.map