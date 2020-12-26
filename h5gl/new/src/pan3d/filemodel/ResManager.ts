module Pan3d {
    export class ResManager extends ResGC {
       
        public loadRoleRes(url: string, $fun: Function, $meshBatchNum: number): void {
            var roleRes: RoleRes = new RoleRes(this.scene3D);
            roleRes.meshBatchNum = $meshBatchNum;

            roleRes.load(url, () => {
                $fun(roleRes);

                 
            });
        }


        public loadSkillRes(url: string, $fun: Function): void {
       
            var skillRes: SkillRes = new SkillRes(this.scene3D);

            skillRes.load(url, () => {
                $fun(skillRes);
                
            });

        }
    }
}