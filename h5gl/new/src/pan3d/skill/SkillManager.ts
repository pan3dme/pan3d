module Pan3d {
    export class SkillManager extends ResGC {
        //private _dic: Object;
        public _skillDic: Object;
        public _loadDic: Object;
        public _preLoadDic: Object;
        public _skillAry: Array<Skill>;
        protected _time: number = 0;
 
        constructor(value:Scene3D) {
            //this.dic = new Object();
            super(value);
            this._skillDic = new Object;
            this._loadDic = new Object;
            this._skillAry = new Array;
            this._preLoadDic = new Object;

        }
        

        public update(): void {
            var _tempTime: number = TimeUtil.getTimer();
            var t: number = _tempTime - this._time;
            for (var i: number = 0; i < this._skillAry.length; i++) {
                this._skillAry[i].update(t);
            }
            this._time = _tempTime;
        }

        public preLoadSkill($url: string): void {

            if (this.dic[$url] || this._preLoadDic[$url]) {
                return;
            }

           this.scene3D.resManager.loadSkillRes(this.scene3D.fileRoot + $url, ($skillRes: SkillRes) => {

                var skillData: SkillData = new SkillData(this.scene3D);
                skillData.data = $skillRes.data;
                skillData.useNum++;
                this.dic[$url] = skillData;
                this.addSrc($url, skillData);
            });

            this._preLoadDic[$url] = true;
        }



        //public fengbaonum:number = 0;
        public getSkill($url: string, $name: string, $callback: Function = null): Skill {

            var skill: Skill;
            var key: string = $url + $name;
            // if(key == "skill/jichu_1_byte.txtm_skill_04"){
            //     console.log("添加技能风暴");
            //     this.fengbaonum++;
            // }
            var ary: Array<Skill> = this._skillDic[key];
            if (ary) {
                for (var i: number = 0; i < ary.length; i++) {
                    skill = ary[i];
                    if (skill.isDeath && skill.useNum == 0) {
                        skill.reset();
                        skill.isDeath = false;
                        return skill;
                    }
                }
            }



            skill = new Skill(this.scene3D);
            skill.name = $name;
            skill.isDeath = false;

            if (!this._skillDic[key]) {
                this._skillDic[key] = new Array;
            }
            this._skillDic[key].push(skill);

            if (this.dic[$url]) {
                skill.setData(this.dic[$url].data[skill.name], this.dic[$url]);
                skill.key = key;
                this.dic[$url].useNum++;
                return skill;
            }

            if (this._loadDic[$url]) {
                var obj: any = new Object;
                obj.name = $name;
                obj.skill = skill;
                obj.callback = $callback;
                this._loadDic[$url].push(obj);
                return skill;
            }

            this._loadDic[$url] = new Array;
            var obj: any = new Object;
            obj.name = $name;
            obj.skill = skill;
            obj.callback = $callback;
            this._loadDic[$url].push(obj);


            this.scene3D.resManager.loadSkillRes(this.scene3D.fileRoot + $url, ($skillRes: SkillRes) => {

                this.loadSkillCom($url, $skillRes);

            });
            return skill;
        }

        protected loadSkillCom($url: string, $skillRes: SkillRes): void {

            var skillData: SkillData = new SkillData(this.scene3D);
            skillData.data = $skillRes.data;



            for (var i: number = 0; i < this._loadDic[$url].length; i++) {
                var obj: any = this._loadDic[$url][i];
                if (!obj.skill.hasDestory) {
                    obj.skill.setData(skillData.data[obj.name], skillData);
                    obj.skill.key = $url + obj.name;
                    skillData.useNum++;
                }

            }



            this.dic[$url] = skillData;

            this.addSrc($url, skillData);

            for (var i: number = 0; i < this._loadDic[$url].length; i++) {
                var obj: any = this._loadDic[$url][i];
                if (obj.callback) {
                    obj.callback();
                }
            }

            this._loadDic[$url].length = 0
            this._loadDic[$url] = null;


        }

        public addSrc($url: string, skillData: SkillData): void {
            for (var key in skillData.data) {
                var skill: Skill = new Skill(this.scene3D);
                skill.name = key;
                skill.isDeath = true;
                skill.src = true;
                skill.setData(skillData.data[key], skillData);
                skillData.addSrcSkill(skill);
                //skillData.useNum++;

                var dkey: string = $url + key
                if (!this._skillDic[dkey]) {
                    this._skillDic[dkey] = new Array;
                }
                this._skillDic[dkey].push(skill);

            }
        }



        public playSkill($skill: Skill): void {
            this._skillAry.push($skill);
            $skill.play();
        }

        public removeSkill($skill: Skill): void {
            var index: number = this._skillAry.indexOf($skill);
            if (index != -1) {
                this._skillAry.splice(index, 1);
            }
        }

        public gcSkill(skill: Skill): void {
            for (var key in this._skillDic) {
                var ary: Array<Skill> = this._skillDic[key];
                var idx: number = ary.indexOf(skill);
                if (idx != -1) {
                    ary.splice(idx, 1);
                }
            }
        }

        public gc(): void {
            //super.gc();

            for (var key in this.dic) {
                var rc: SkillData = <SkillData>this.dic[key];
                if (rc.useNum <= 0) {
                    rc.idleTime++;

                    if (rc.idleTime >= ResCount.GCTime && rc.testDestory()) {
                        //console.log("清理 -" + key);
                        rc.destory();
                        delete this.dic[key];
                    }

                }
            }

            for (var key in this._skillDic) {
                var ary: Array<Skill> = this._skillDic[key];
                for (var i: number = ary.length - 1; i >= 0; i--) {
                    if (ary[i].isDeath && ary[i].useNum <= 0) {
                        ary[i].idleTime++;
                        if (ary[i].idleTime >= ResCount.GCTime) {
                            if (!ary[i].src) {
                                ary[i].destory();
                                ary.splice(i, 1);
                            }
                        }
                    }
                }
                if (ary.length == 0) {
                    //console.log("清理 -" + key);
                    delete this._skillDic[key];
                }

            }

        }



    }


  
}