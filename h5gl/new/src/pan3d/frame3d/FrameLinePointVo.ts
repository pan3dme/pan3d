module Pan3d {
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

}