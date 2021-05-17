module Pan3d {
    export class SceneChar extends Display3dMovie {
        public skillVo: Skill;
        private mountChar:Display3dMovie;
      
        public static WEAPON_PART: string = "weapon";
        public static WEAPON_DEFAULT_SLOT: string = "w_01";
        public static MOUNT_SLOT: string = "mount_01";
        public static WING_SLOT: string = "wing_01";
        public static SEL_PART: string = "select";
        public static QUEST_ICON: string = "questicon";
        public static NONE_SLOT: string = "none";

        public static   CharAction_stand  : string       ="stand";
        public static   CharAction_walk    : string      ="walk";
        public static   CharAction_jump    : string      ="jump";
        public static   CharAction_death   : string      ="death";
        public static   CharAction_injured    : string   ="injured";
        public static   CharAction_stand_mount   : string   ="stand_mount";
        public static   CharAction_walk_mount  : string    ="walk_mount";
 
        public playSkill($skill: Skill): void {

       
            this.scene3D.skillManager .playSkill($skill);
            this.skillVo = $skill;
        }
        public addPart($key: string, $bindSocket: string, $url: string): void {
            if (this._partUrl[$key] == $url) {//如果相同则返回
                return;
            } else if (this._partUrl[$key]) {//如果不同则先移除
                this.removePart($key);
            }
            if (!this._partDic[$key]) {
                this._partDic[$key] = new Array;
            }
            this._partUrl[$key] = $url;
            var ary: Array<any> = this._partDic[$key];

            this.scene3D.groupDataManager.getGroupData(this.scene3D.fileRoot + $url, (groupRes: GroupRes) => {
                this.loadPartRes($bindSocket, groupRes, ary)
            })
   
        }
        public play($action: string, $completeState: number = 0, needFollow: boolean = true): boolean {
           var tf: boolean = super.play($action,$completeState,needFollow);
           if(this.mountChar!=null){
             this.changeMountAction();
            }
            return tf;
        }
        private   changeMountAction() {
            var action:string=this.curentAction;
            if(this.mountChar!=null){
                if( action==SceneChar.CharAction_stand||action==SceneChar.CharAction_stand_mount){
                    this.curentAction=SceneChar.CharAction_stand_mount;
                    this.mountChar.curentAction=SceneChar.CharAction_stand;
                }
            else if(action==SceneChar.CharAction_walk||action==SceneChar.CharAction_walk_mount){
                this.curentAction=SceneChar.CharAction_walk_mount;
                this.mountChar.curentAction=SceneChar.CharAction_walk;
                }else{
                    this.mountChar.curentAction=SceneChar.CharAction_stand;
                }
            }
        }
     
        public setMountCharByName(val:String)
        {
            var sc: Display3dMovie = new Display3dMovie(this.scene3D);
            sc.setRoleUrl("role/" + val + ".txt");
            sc.x = this.x;
            sc.y = this.y;
            sc.z = this.z;
            this.mountChar=sc;
            this.scene3D.addMovieDisplay(sc);

            this.setBind(this.mountChar, SceneChar.MOUNT_SLOT);

        }
        protected loadPartRes($bindSocket: string, groupRes: GroupRes, ary: Array<any>): void {
            
            for (var i: number = 0; i < groupRes.dataAry.length; i++) {
                var item: GroupItem = groupRes.dataAry[i];

                var posV3d: Vector3D;
                var rotationV3d: Vector3D;
                var scaleV3d: Vector3D;
                if (item.isGroup) {
     
                }

                if (item.types == BaseRes.SCENE_PARTICLE_TYPE) {
                     
                } else if (item.types == BaseRes.PREFAB_TYPE) {
                    var display: Display3DSprite = new Display3DSprite(this.scene3D);
                    display.setObjUrl(item.objUrl);
                    display.setMaterialUrl(item.materialUrl, item.materialInfoArr);
                    display.dynamic = true;
                    ary.push(display);
                    display.setBind(this, $bindSocket);
                    this.scene3D.addDisplay(display);
                    if (item.isGroup) {
                        // display.setGroup(posV3d, rotationV3d, scaleV3d);
                    }

                }

            }

            this.applyVisible();

        }
        applyVisible() {
            // throw new Error("Method not implemented.");
        }
        removePart($key: string) {
            throw new Error("Method not implemented.");
        }
    }
}