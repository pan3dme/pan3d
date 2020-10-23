import GameUI from "./GameUI";
/**
 * 掉落盒子脚本，实现盒子碰撞及回收流程
 */
export default class TopInfoPanel extends Laya.Script {
    /**盒子等级 */
 
    constructor() { super(); }
    onEnable(): void {
        /**获得组件引用，避免每次获取组件带来不必要的查询开销 */
     

    }
    onUpdate(): void {
        
        console.log("来了");
        // (this.owner as Laya.Sprite).rotation++;
    }
    
 
 
    
}