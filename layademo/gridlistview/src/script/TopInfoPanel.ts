


import ZhaoBox from "./ZhaoBox";


export default class TopInfoPanel extends Laya.Script {
    /** @prop {name:zhaoBox,tips:"对象",type:Prefab}*/
    zhaoBox: Laya.Prefab;

    moveBox:Laya.Sprite ;

    constructor() { super(); }
    onEnable(): void {
       this. moveBox= Laya.Pool.getItemByCreateFun("zhaoBox", this.zhaoBox.create, this.zhaoBox);
       this. moveBox.pos(100, 100);
        this.owner.addChild(  this. moveBox);
    }
    onUpdate(): void {

        console.log("来了3333");
        this. moveBox.rotation++;
    }




}