module Pan3d
{

    export class SkillTrajectoryTargetKeyVo extends SkillKeyVo {
        public beginType: number;
        public beginSocket: string;
        public beginPos: Vector3D;
        public hitSocket: string;
        public endParticleUrl: string;
        public speed: number;
        public multype: number;

        public setData($data: any): void {
            super.setData($data);
            this.beginType = $data.beginType;
            if (this.beginType == 0) {
                this.beginPos = new Vector3D($data.beginPos.x, $data.beginPos.y, $data.beginPos.z);
            } else if (this.beginType == 1) {
                this.beginSocket = $data.beginSocket;
            }
            this.speed = $data.speed;
            if ($data.hitSocket) {
                this.hitSocket = $data.hitSocket
            }
            if ($data.endParticle) {
                this.endParticleUrl = $data.endParticle;
            }
            this.multype = $data.multype;
        }


    }
}