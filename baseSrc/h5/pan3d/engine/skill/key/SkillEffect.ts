module Pan3d {
    export class SkillEffect extends SkillKey {
        private _active: Object3D;
        public set active(value: Object3D) {
            this._active = value;
        }
        public get active(): Object3D {
            return this._active;
        }

        public addToRender(): void {
            super.addToRender();
            this.particle.addEventListener(BaseEvent.COMPLETE, this.onPlayCom, this);
        }

        protected onPlayCom(event: Event = null): void {
            this.particle.removeEventListener(BaseEvent.COMPLETE, this.onPlayCom, this);
            ParticleManager.getInstance().removeParticle(this.particle);
            this.removeCallFun(this);
        }


    }
}