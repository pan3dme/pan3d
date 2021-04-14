module Pan3d{
    export class SkillFixEffectKeyVo extends SkillKeyVo {
        public pos: Vector3D;
        public rotation: Vector3D;
        public hasSocket: boolean;
        public socket: string;

        public setData($data: any): void {
            super.setData($data);

            this.hasSocket = $data.hasSocket;

            if (this.hasSocket) {
                this.socket = $data.socket;
            } else {
                this.pos = new Vector3D($data.pos.x, $data.pos.y, $data.pos.z);
                this.rotation = new Vector3D($data.rotation.x, $data.rotation.y, $data.rotation.z);
            }

        }

    }
}

