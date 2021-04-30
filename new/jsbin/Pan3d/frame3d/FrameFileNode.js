var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Pan3d;
(function (Pan3d) {
    var FrameFileNode = /** @class */ (function (_super) {
        __extends(FrameFileNode, _super);
        function FrameFileNode(value) {
            var _this = _super.call(this) || this;
            _this.scene3D = value;
            return _this;
        }
        FrameFileNode.prototype.setFrameNodeVo = function ($vo) {
            this.frameNodeVo = $vo;
            if (this.frameNodeVo.type == 1) {
                if (this.frameNodeVo.directLight) { //有法线的对象
                    this._frameBuildSprite = new Pan3d.FrameBuildSprite(this.scene3D);
                    this._frameBuildSprite.setFrameNodeUrl(this.frameNodeVo);
                    this.scene3D.addDisplay(this._frameBuildSprite);
                    this.sprite = this._frameBuildSprite;
                }
                else {
                    if (this.frameNodeVo.receiveShadow) {
                        this._shadowDisplay3DSprite = new Pan3d.ShadowDisplay3DSprite(this.scene3D);
                        this._shadowDisplay3DSprite.setFrameNodeUrl(this.frameNodeVo);
                        this.scene3D.addDisplay(this._shadowDisplay3DSprite);
                        this.sprite = this._shadowDisplay3DSprite;
                    }
                    else {
                        this._lightSprite = new Pan3d.LightDisplay3DSprite(this.scene3D);
                        this._lightSprite.setFrameNodeUrl(this.frameNodeVo);
                        this.scene3D.addDisplay(this._lightSprite);
                        this.sprite = this._lightSprite;
                        //this._lightSprite.setObjUrl($vo.resurl);
                        //this._lightSprite.setMaterialUrl($vo.materialurl, $vo.materialInfoArr);
                        //this._lightSprite.materialInfoArr = $vo.materialInfoArr
                        //this._lightSprite.setLightMapUrl($vo.lighturl);
                    }
                }
            }
            if (this.frameNodeVo.type == 2) {
                this._particle = this.scene3D.particleManager.getParticleByte(this.scene3D.fileRoot + $vo.resurl);
                this._particle.dynamic = true;
                this._particle.sceneVisible = false;
                this.scene3D.particleManager.addParticle(this._particle);
                this.sprite = this._particle;
            }
            if (this.frameNodeVo.type == 3) {
                this._sceneChar = new Pan3d.FrameSceneChar(this.scene3D);
                this._sceneChar.shadow = false;
                this._sceneChar.setRoleUrl(this.frameNodeVo.resurl);
                this.scene3D.addMovieDisplay(this._sceneChar);
                this.sprite = this._sceneChar;
            }
        };
        FrameFileNode.prototype.update = function () {
            this.sceneVisible = this.isVisible(Pan3d.Frame3dRes.frameNum);
            if (this.sceneVisible) {
                this.setModelSprite(this.playFrameVoByTime(Pan3d.Frame3dRes.frameNum));
            }
            if (this._particle) {
                this._particle.sceneVisible = this.sceneVisible;
            }
            if (this._frameBuildSprite) {
                this._frameBuildSprite.sceneVisible = this.sceneVisible;
            }
            if (this._lightSprite) {
                this._lightSprite.sceneVisible = this.sceneVisible;
            }
        };
        FrameFileNode.prototype.playFrameVoByTime = function ($time) {
            var $keyC;
            var $a = this.getPreFrameLinePointVoByTime($time);
            var $b = this.getNextFrameLinePointVoByTime($time);
            for (var i = 0; i < this.frameNodeVo.pointitem.length; i++) {
                if (this.frameNodeVo.pointitem[i].time == $time) {
                    $keyC = this.frameNodeVo.pointitem[i];
                }
            }
            if ($keyC) {
                if ($keyC.iskeyFrame) {
                    return $keyC;
                }
            }
            else {
                if ($a && !$a.isAnimation) {
                    return $a;
                }
                else if ($a && $b) {
                    return this.setModelData($a, $b, $time);
                }
            }
            return null;
        };
        FrameFileNode.prototype.getNextFrameLinePointVoByTime = function ($time) {
            var $next;
            for (var i = 0; i < this.frameNodeVo.pointitem.length; i++) {
                if (this.frameNodeVo.pointitem[i].time >= $time) {
                    if (!$next || $next.time > this.frameNodeVo.pointitem[i].time) {
                        $next = this.frameNodeVo.pointitem[i];
                    }
                }
            }
            return $next;
        };
        FrameFileNode.prototype.isVisible = function ($num) {
            var $min = this.frameNodeVo.pointitem[0].time;
            var $max = this.frameNodeVo.pointitem[this.frameNodeVo.pointitem.length - 1].time;
            var dd = this.getPreFrameLinePointVoByTime($num);
            if ($num >= $min && $num <= $max && dd) {
                return dd.iskeyFrame;
            }
            else {
                return false;
            }
        };
        FrameFileNode.prototype.getPreFrameLinePointVoByTime = function ($time) {
            var $pre;
            for (var i = 0; i < this.frameNodeVo.pointitem.length; i++) {
                if (this.frameNodeVo.pointitem[i].time <= $time) {
                    if (!$pre || $pre.time < this.frameNodeVo.pointitem[i].time) {
                        $pre = this.frameNodeVo.pointitem[i];
                    }
                }
            }
            return $pre;
        };
        FrameFileNode.prototype.setModelData = function ($a, $b, $time) {
            var $num = ($time - $a.time) / ($b.time - $a.time);
            var $obj = new Pan3d.FrameLinePointVo;
            $obj.x = $a.x + ($b.x - $a.x) * $num;
            $obj.y = $a.y + ($b.y - $a.y) * $num;
            $obj.z = $a.z + ($b.z - $a.z) * $num;
            $obj.scaleX = $a.scaleX + ($b.scaleX - $a.scaleX) * $num;
            $obj.scaleY = $a.scaleY + ($b.scaleY - $a.scaleY) * $num;
            $obj.scaleZ = $a.scaleZ + ($b.scaleZ - $a.scaleZ) * $num;
            var $eulerAngle = this.qtoq($a, $b, $num);
            $obj.rotationX = $eulerAngle.x;
            $obj.rotationY = $eulerAngle.y;
            $obj.rotationZ = $eulerAngle.z;
            $obj.data = $a.data; //存前面一个的数所有 
            if (!$b.iskeyFrame) {
                return $a;
            }
            else {
                return $obj;
            }
        };
        FrameFileNode.prototype.setModelSprite = function ($obj) {
            if (this.sprite) {
                this.sprite.x = $obj.x;
                this.sprite.y = $obj.y;
                this.sprite.z = $obj.z;
                this.sprite.scaleX = $obj.scaleX;
                this.sprite.scaleY = $obj.scaleY;
                this.sprite.scaleZ = $obj.scaleZ;
                this.sprite.rotationX = $obj.rotationX;
                this.sprite.rotationY = $obj.rotationY;
                this.sprite.rotationZ = $obj.rotationZ;
            }
            if (this._sceneChar) {
                if ($obj.data && $obj.data.action) {
                    if (this._sceneChar.curentAction != $obj.data.action) {
                        this._sceneChar.play($obj.data.action);
                    }
                }
            }
        };
        FrameFileNode.prototype.qtoq = function ($a, $b, $time) {
            var $m0 = new Pan3d.Matrix3D();
            $m0.appendRotation($a.rotationX, Pan3d.Vector3D.X_AXIS);
            $m0.appendRotation($a.rotationY, Pan3d.Vector3D.Y_AXIS);
            $m0.appendRotation($a.rotationZ, Pan3d.Vector3D.Z_AXIS);
            var q0 = new Pan3d.Quaternion();
            q0.fromMatrix($m0);
            var $m1 = new Pan3d.Matrix3D();
            $m1.appendRotation($b.rotationX, Pan3d.Vector3D.X_AXIS);
            $m1.appendRotation($b.rotationY, Pan3d.Vector3D.Y_AXIS);
            $m1.appendRotation($b.rotationZ, Pan3d.Vector3D.Z_AXIS);
            var q1 = new Pan3d.Quaternion();
            q1.fromMatrix($m1);
            var resultQ = new Pan3d.Quaternion;
            resultQ.slerp(q0, q1, $time);
            var $ve = resultQ.toEulerAngles();
            $ve.scaleBy(180 / Math.PI);
            if (isNaN($ve.x) || isNaN($ve.y) || isNaN($ve.z)) {
                $ve.x = $a.rotationX;
                $ve.y = $a.rotationY;
                $ve.z = $a.rotationZ;
            }
            return $ve;
        };
        return FrameFileNode;
    }(Pan3d.Vector3D));
    Pan3d.FrameFileNode = FrameFileNode;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=FrameFileNode.js.map