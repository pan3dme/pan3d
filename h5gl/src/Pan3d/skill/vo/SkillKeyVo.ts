module Pan3d {
    export class SkillKeyVo {
        public frame: number = 0;
        public url: string;

        public setData($data: any): void {
            this.frame = $data.frame;
            this.url = $data.url;
        }
    }

 

}