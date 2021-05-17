module Pan3d {
    export class GroupDataManager extends ResGC {
        protected _loadDic: Object = new Object;
        public getGroupData($url: string, $fun: Function): void {

            if (this.dic[$url]) {
                var gr: GroupRes = this.dic[$url];
 
                $fun(gr);
                return;
            }

            if (this._loadDic[$url]) {
                this._loadDic[$url].push($fun);
                return;
            }

            this._loadDic[$url] = new Array;
            this._loadDic[$url].push($fun);

            var group: GroupRes = new GroupRes(this.scene3D);
            group.load($url, () => {
                var ary: Array<Function> = this._loadDic[$url];
                for (var i: number = 0; i < ary.length; i++) {
                    var fun: Function = ary[i];
                    fun(group);
                }
                this.dic[$url] = group;
                delete this._loadDic[$url];
                group.initReg();
            })




        }
    }
    
}