module Pan3d {
    export class ProgrmaManager extends ResGC{

        public constructor(value:Scene3D)
        {
            super(value);
        }

        public getProgram($str: string): Shader3D {
            if (this.dic[$str]) {
                return this.dic[$str];
            } else {
                alert("please registe Program=>" + $str);
                return null
            }
        }
        public registe($str, $shader3D: Shader3D): void {
            if (!this.dic[$str]) {
                $shader3D.encode();
                $shader3D.name = $str;
                this.dic[$str] = $shader3D;
            }

        }
      
    }
}