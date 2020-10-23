 

 
 import ZhaoBox from "./ZhaoBox";
 
 
export default class TopInfoPanel extends Laya.Script {
 /** @prop {name:zhaoBox,tips:"掉落容器预制体对象",type:Prefab}*/
    zhaoBox: Laya.Prefab;
  
 
    constructor() { super(); }
    onEnable(): void {
        /**获得组件引用，避免每次获取组件带来不必要的查询开销 */
     
        
        let box: Laya.Sprite = Laya.Pool.getItemByCreateFun("zhaoBox", this.zhaoBox.create, this.zhaoBox);
        box.pos(100,100);
   

        this.owner.addChild(box);
    }
    onUpdate(): void {
        
        console.log("来了TopInfoPanel");
        // (this.owner as Laya.Sprite).rotation++;
    }
    
 
 
    
}