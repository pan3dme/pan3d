module Pan3d {

    export class FrameFileNode extends Vector3D {

        public scene3D: Scene3D;

        constructor(value: Scene3D) {
            super();
            this.scene3D = value;

        }
        public frameNodeVo: FrameNodeVo;
        private _particle: CombineParticle;
        private _sceneChar: FrameSceneChar;
        private _lightSprite: LightDisplay3DSprite;
        private _frameBuildSprite: FrameBuildSprite;
        private _shadowDisplay3DSprite: ShadowDisplay3DSprite;
        public sprite: any;

        public setFrameNodeVo($vo: FrameNodeVo): void {
            this.frameNodeVo = $vo
            if (this.frameNodeVo.type == 1) {

                if (this.frameNodeVo.directLight) {  //有法线的对象
                    this._frameBuildSprite = new FrameBuildSprite(this.scene3D);
                    this._frameBuildSprite.setFrameNodeUrl(this.frameNodeVo);
                    this.scene3D.addDisplay(this._frameBuildSprite);
                    this.sprite = this._frameBuildSprite;
                } else {
                    if (this.frameNodeVo.receiveShadow) {
                        this._shadowDisplay3DSprite = new ShadowDisplay3DSprite(this.scene3D);
                        this._shadowDisplay3DSprite.setFrameNodeUrl(this.frameNodeVo);
                        this.scene3D.addDisplay(this._shadowDisplay3DSprite);
                        this.sprite = this._shadowDisplay3DSprite;
                    } else {
                        this._lightSprite = new LightDisplay3DSprite(this.scene3D);
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
                this._particle.sceneVisible = false
                this.scene3D.particleManager.addParticle(this._particle);
                this.sprite = this._particle

            }
            if (this.frameNodeVo.type == 3) {
                this._sceneChar = new FrameSceneChar(this.scene3D)
                this._sceneChar.shadow = false
                this._sceneChar.setRoleUrl(this.frameNodeVo.resurl);
                this.scene3D.addMovieDisplay(this._sceneChar);

                this.sprite = this._sceneChar
            }
        }
        public sceneVisible: boolean
        public update(): void {
            this.sceneVisible = this.isVisible(Frame3dRes.frameNum)

            if (this.sceneVisible) {
                this.setModelSprite(this.playFrameVoByTime(Frame3dRes.frameNum))
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
        }
        public playFrameVoByTime($time: number): FrameLinePointVo {
            var $keyC: FrameLinePointVo;
            var $a: FrameLinePointVo = this.getPreFrameLinePointVoByTime($time)
            var $b: FrameLinePointVo = this.getNextFrameLinePointVoByTime($time)
            for (var i: number = 0; i < this.frameNodeVo.pointitem.length; i++) {
                if (this.frameNodeVo.pointitem[i].time == $time) {
                    $keyC = this.frameNodeVo.pointitem[i];
                }
            }
            if ($keyC) {
                if ($keyC.iskeyFrame) {
                    return $keyC
                }
            } else {
                if ($a && !$a.isAnimation) {
                    return $a
                } else if ($a && $b) {
                    return this.setModelData($a, $b, $time)
                }
            }
            return null
        }
        public getNextFrameLinePointVoByTime($time: number): FrameLinePointVo  //包含当前
        {
            var $next: FrameLinePointVo;
            for (var i: number = 0; i < this.frameNodeVo.pointitem.length; i++) {
                if (this.frameNodeVo.pointitem[i].time >= $time) {
                    if (!$next || $next.time > this.frameNodeVo.pointitem[i].time) {
                        $next = this.frameNodeVo.pointitem[i]
                    }
                }
            }
            return $next
        }
        public isVisible($num: number): boolean {
            var $min: number = this.frameNodeVo.pointitem[0].time;
            var $max: number = this.frameNodeVo.pointitem[this.frameNodeVo.pointitem.length - 1].time
            var dd: FrameLinePointVo = this.getPreFrameLinePointVoByTime($num);
            if ($num >= $min && $num <= $max && dd) {
                return dd.iskeyFrame;
            } else {
                return false;
            }
        }
        public getPreFrameLinePointVoByTime($time: number): FrameLinePointVo  //包含当前
        {
            var $pre: FrameLinePointVo;
            for (var i: number = 0; i < this.frameNodeVo.pointitem.length; i++) {
                if (this.frameNodeVo.pointitem[i].time <= $time) {
                    if (!$pre || $pre.time < this.frameNodeVo.pointitem[i].time) {
                        $pre = this.frameNodeVo.pointitem[i]
                    }
                }
            }
            return $pre
        }


        private setModelData($a: FrameLinePointVo, $b: FrameLinePointVo, $time: number): FrameLinePointVo {
            var $num: number = ($time - $a.time) / ($b.time - $a.time);

            var $obj: FrameLinePointVo = new FrameLinePointVo
            $obj.x = $a.x + ($b.x - $a.x) * $num;
            $obj.y = $a.y + ($b.y - $a.y) * $num;
            $obj.z = $a.z + ($b.z - $a.z) * $num;

            $obj.scaleX = $a.scaleX + ($b.scaleX - $a.scaleX) * $num;
            $obj.scaleY = $a.scaleY + ($b.scaleY - $a.scaleY) * $num;
            $obj.scaleZ = $a.scaleZ + ($b.scaleZ - $a.scaleZ) * $num;

            var $eulerAngle: Vector3D = this.qtoq($a, $b, $num)
            $obj.rotationX = $eulerAngle.x
            $obj.rotationY = $eulerAngle.y
            $obj.rotationZ = $eulerAngle.z
            $obj.data = $a.data //存前面一个的数所有 

            if (!$b.iskeyFrame) {
                return $a
            } else {
                return $obj
            }

        }
        private setModelSprite($obj: FrameLinePointVo): void {

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
                        this._sceneChar.play($obj.data.action)
                    }
                }

            }

        }
        private qtoq($a: FrameLinePointVo, $b: FrameLinePointVo, $time: number): Vector3D {

            var $m0: Matrix3D = new Matrix3D();
            $m0.appendRotation($a.rotationX, Vector3D.X_AXIS)
            $m0.appendRotation($a.rotationY, Vector3D.Y_AXIS)
            $m0.appendRotation($a.rotationZ, Vector3D.Z_AXIS)
            var q0: Quaternion = new Quaternion()
            q0.fromMatrix($m0)

            var $m1: Matrix3D = new Matrix3D();
            $m1.appendRotation($b.rotationX, Vector3D.X_AXIS)
            $m1.appendRotation($b.rotationY, Vector3D.Y_AXIS)
            $m1.appendRotation($b.rotationZ, Vector3D.Z_AXIS)
            var q1: Quaternion = new Quaternion()
            q1.fromMatrix($m1)

            var resultQ: Quaternion = new Quaternion;
            resultQ.slerp(q0, q1, $time);
            var $ve: Vector3D = resultQ.toEulerAngles();
            $ve.scaleBy(180 / Math.PI)

            if (isNaN($ve.x) || isNaN($ve.y) || isNaN($ve.z)) {
                $ve.x = $a.rotationX;
                $ve.y = $a.rotationY;
                $ve.z = $a.rotationZ;
            }

            return $ve
        }


    }
}