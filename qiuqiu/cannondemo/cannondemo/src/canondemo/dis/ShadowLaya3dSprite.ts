class ShadowLaya3dSprite extends Scene3dLaya3dSprite {

    protected upFrame(): void {
        Pan3d.Scene_data.context3D._contextSetTest.clear();
        shadow.ShadowModel.getInstance().updateDepth(this.scene)
        super.upFrame();
    }


   
}