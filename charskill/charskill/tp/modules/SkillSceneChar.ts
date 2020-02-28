﻿class SkillSceneChar extends SceneChar{

    public onMeshLoaded(): void {
        super.onMeshLoaded()
        if (this.loadFinishFun) {
            this.loadFinishFun();
        }
    }
    public loadFinishFun: Function

    public changeActionFun: Function
    public changeAction($action: string): void {
        this.curentAction = this._defaultAction;
        if (this.changeActionFun) {
            this.changeActionFun($action);
        }
    }
}