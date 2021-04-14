module Pan3d {
    

    export class GroupItem extends Object3D {
        public objUrl: string;
        public materialUrl: string;
        public particleUrl: string;
        public materialInfoArr: Array<any>
        public isGroup: boolean;
        public types: number;
    }
}