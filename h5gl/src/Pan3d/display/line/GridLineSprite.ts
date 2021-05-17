module Pan3d {
   
    export class GridLineSprite  extends LineDisplaySprite  {
 
        constructor(value: Scene3D) {
          super(value);
        }
        protected initData():void
        {

            var w: number = 100;
            var n: number = 10;
            var skeep: number = w / n;
            this.clear();
            var a: Vector3D;
            var b: Vector3D;
            a = new Vector3D(0, 0, +w);
            b = new Vector3D(0, 0, -w);
            this.makeLineMode(a, b, new Vector3D(0, 0, 1, 1))
            a = new Vector3D(+w, 0, 0);
            b = new Vector3D(-w, 0, 0);
            this.makeLineMode(a, b, new Vector3D(1, 0, 0, 1))

            this.baseColor = new Vector3D(128 / 255, 128 / 255, 128 / 255, 1);
            for (var i = 1; i <= n; i++) {
                a = new Vector3D(+i * skeep, 0, +w);
                b = new Vector3D(+i * skeep, 0, -w);
                this.makeLineMode(a, b)
                a = new Vector3D(-i * skeep, 0, +w);
                b = new Vector3D(-i * skeep, 0, -w);
                this.makeLineMode(a, b)

                a = new Vector3D(+w, 0, +i * skeep);
                b = new Vector3D(-w, 0, +i * skeep);
                this.makeLineMode(a, b)
                a = new Vector3D(+w, 0, -i * skeep);
                b = new Vector3D(-w, 0, -i * skeep);
                this.makeLineMode(a, b)
            }


            this.upToGpu();
        }
    }
}