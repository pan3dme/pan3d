class TpModuleList {
    public constructor() {
    }
    private static getModuleList(): Array<Pan3d.Module> {
        //所有的需要注册的模块  都写在这里
        return [
            new TpSceneModule(),
        ];
    }

    /**
     * 启动所有模块 
     */
    public static startup(): void {
        var allModules: Array<Pan3d.Module> = TpModuleList.getModuleList();
        for (var i: number = 0; i < allModules.length; i++) {
            Pan3d. Module.registerModule(allModules[i]);
        }
    }
}
