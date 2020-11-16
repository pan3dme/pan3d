module frame3d {
    import Object3D = Pan3d.Object3D;
    import BaseRes = Pan3d.BaseRes;
    import LoadManager = Pan3d.LoadManager;
    import Pan3dByteArray = Pan3d.Pan3dByteArray;
    import Vector3D = Pan3d.Vector3D;
    import Vector2D = Pan3d.Vector2D;
    import Scene_data = Pan3d.Scene_data;

    import SceneChar = Pan3d.SceneChar;
    import Shader3D = Pan3d.Shader3D;

    import MeshData = Pan3d.MeshData;
    import AnimData = Pan3d.AnimData;
    import CombineParticle = Pan3d.CombineParticle;

    import Quaternion = Pan3d.Quaternion;
    import ParticleManager = Pan3d.ParticleManager;
    import SceneManager = Pan3d.SceneManager;
    import Matrix3D = Pan3d.Matrix3D;
    import ProgrmaManager = Pan3d.ProgrmaManager;




    export class FrameLinePointVo extends Object3D {

        public time: number;
        public id: number;
        public iskeyFrame: boolean;
        public isAnimation: boolean;
        public data: any

        public static maxTime: number = 0
        public writeObject($obj: any): void {

            this.time = $obj.time;
            this.id = $obj.id;
            this.iskeyFrame = $obj.iskeyFrame;
            this.isAnimation = $obj.isAnimation;



            this.x = $obj.x / 10;
            this.y = $obj.y / 10;
            this.z = $obj.z / 10;

            this.scaleX = $obj.scaleX / 10;
            this.scaleY = $obj.scaleY / 10;
            this.scaleZ = $obj.scaleZ / 10;

            this.rotationX = $obj.rotationX;
            this.rotationY = $obj.rotationY;
            this.rotationZ = $obj.rotationZ;

            this.data = $obj.data;

            FrameLinePointVo.maxTime = Math.max(this.time, FrameLinePointVo.maxTime)

        }
    }

    export   class FrameNodeVo {
        constructor() {
        }
        public type: number;
        public id: number;
        public name: string;
        public url: string;
        public resurl: string;

        public noLight: boolean;
        public directLight: boolean;
        public receiveShadow: boolean;
        public lighturl: string

        public pointitem: Array<FrameLinePointVo>;
        public materialInfoArr: Array<any>;

        public materialurl: string

        public writeObject($obj: any): void {

            this.id = $obj.id;
            this.name = $obj.name;
            this.url = $obj.url;


            this.pointitem = new Array
            for (var j: number = 0; j < $obj.pointitem.length; j++) {
                var $FrameLinePointVo: FrameLinePointVo = new FrameLinePointVo();
                $FrameLinePointVo.writeObject($obj.pointitem[j])
                this.pointitem.push($FrameLinePointVo)
            }
            this.resurl = $obj.resurl
            if (this.url.search(".prefab") != -1) {
                this.materialInfoArr = new Array
                for (var i: number = 0; $obj.materialInfoArr && i < $obj.materialInfoArr.length; i++) {
                    this.materialInfoArr.push($obj.materialInfoArr[i])
                }
                this.noLight = $obj.noLight;
                this.directLight = $obj.directLight;
                this.receiveShadow = $obj.receiveShadow;

                if (this.noLight == false) {
                    this.lighturl = $obj.lighturl

                }
                this.materialurl = $obj.materialurl
                this.type = 1;
            }
            if (this.url.search(".lyf") != -1) {
                this.type = 2;
            }
            if (this.url.search(".zzw") != -1) {
                this.type = 3;
            }



        }



    }
    export  class Frame3dRes extends BaseRes {
        private _completeFun: Function;
        private static _dic: any = {}
        public load($url: string, $completeFun: Function): void {
            this._completeFun = $completeFun;
            if (Frame3dRes._dic[$url]) {
                this.loadComplete(Frame3dRes._dic[$url]);
            } else {
               LoadManager.getInstance().load($url, LoadManager.BYTE_TYPE, ($byte: ArrayBuffer) => {
                    Frame3dRes._dic[$url] = $byte
                    this.loadComplete(Frame3dRes._dic[$url]);
                }, null);
            }
        }
        public static frameSpeedNum: number;
        public static sceneFileroot: string;
        public static fileName: string;
        public haveVideo: boolean
        public loadComplete($byte: ArrayBuffer): void {

            this._byte = new Pan3dByteArray($byte);
            this._byte.position = 0;
            this.version = this._byte.readInt();
            if (this.version >= 31) {

            }
            var $str = this._byte.readUTF();
            var $itemstr: Array<string> = $str.split("/")
            Frame3dRes.sceneFileroot = $str.replace($itemstr[$itemstr.length - 1], "")
            Frame3dRes.fileName = $itemstr[$itemstr.length - 1]


            Frame3dRes.frameSpeedNum = this._byte.readInt();
       //     console.log("版本", this.version, "frameSpeedNum", Frame3dRes.frameSpeedNum)


            this.readSceneInfo();


            this.read(() => { this.readNext() });//img
        }
        private toVect4($num: number): Vector3D {
            var temp: number = Math.floor(65536 * $num);
            var a: number = Math.floor(temp / 256);
            var b: number = Math.floor(temp - a * 256);
            return new Vector3D(a / 256, b / 256, 0, 1);

        }
        private toNum(vect: Vector3D): number {
            var $a: number = vect.x * 256;
            var $b: number = vect.y * 256;
            var $bnum: number = ($a * 256 + $b) / 65536
            console.log("$bnum", $bnum)
            return ($a * 256 + $b) / 65536
        }
        //收获环境参数
        private readSceneInfo(): void {
            var size: number = this._byte.readInt();
            var $obj: any = JSON.parse(this._byte.readUTFBytes(size));



        }
        public  frameNum: number = 1
        public readNext(): void {
            this.read();//obj
            this.read();//material
            this.read();//particle;
            this.readFrame3dScene()

        }
        public frameItem: Array<FrameNodeVo>
        public readFrame3dScene(): void {
            this.frameItem = new Array;
            var size: number = this._byte.readInt();
            var $scene = JSON.parse(this._byte.readUTFBytes(size));
            for (var i: number = 0; i < $scene.length; i++) {
                var $frameNodeVo: FrameNodeVo = new FrameNodeVo()
                $frameNodeVo.writeObject($scene[i])
                this.frameItem.push($frameNodeVo)
            }
            this._completeFun();
        }
    }


    export  class FrameFileNode extends Vector3D {
        constructor() {
            super();
        }
        public frameNodeVo: FrameNodeVo;
        public sprite: any;
        public setFrameNodeVo($vo: FrameNodeVo): void {
            this.frameNodeVo = $vo
            if (this.frameNodeVo.type == 1) {


            }
        
        }
        public sceneVisible: boolean
        public update(frameNum: number): void {
            this.sceneVisible = this.isVisible(frameNum)

            if (this.sceneVisible) {
                this.setModelSprite(this.playFrameVoByTime(frameNum))
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