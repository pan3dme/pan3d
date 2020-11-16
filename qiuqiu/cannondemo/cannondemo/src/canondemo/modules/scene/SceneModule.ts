module game {
    import Module = Pan3d.Module
    import Processor = Pan3d.Processor
    export class SceneModule extends Module {

        public getModuleName(): string {
            return "SceneModule";
        }
        protected listProcessors(): Array<Processor> {
            return [new SceneProcessor()
            ];
        }
    }
}