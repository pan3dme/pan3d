module Pan3d {
    export class ResManager extends ResGC {
        public loadRoleRes(url: string, $fun: Function, $meshBatchNum: number): void {
            var roleRes: RoleRes = new RoleRes(this.scene3D);
            roleRes.meshBatchNum = $meshBatchNum;

            roleRes.load(url, () => {
                $fun(roleRes);

                 
            });
        }
    }
}