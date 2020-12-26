module Pan3d {
 

    export class SkillShockVo {
        public time: number;
        public lasttime: number;
        public amp: number;

        public setData($data: any): void {
            this.time = $data.time * Scene3D.frameTime;
            this.lasttime = $data.lasttime * Scene3D.frameTime;
            this.amp = $data.amp;
        }
    }

}