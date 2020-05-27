package z3d.program;

public class MaterialShader extends  Shader3D {
    public  static  String shaderStr="MaterialShader";
    public String getVertexShaderString() {

        String vertex= "attribute vec3 vPosition;\n"+
                "attribute vec2 vTextCoord;\n"+
                "uniform mat4 vpMatrix3D;\n"+
                "uniform mat4 posMatrix;\n"+

                "varying vec2 textureCoordinate;\n"+
                "void main(){\n"+
                "textureCoordinate=vTextCoord;\n"+
                "gl_Position = vpMatrix3D*vec4(vPosition*0.1,1);\n"+

                "}";


        /*
        Boolean usePbr    = this.paramAry.get(0);
        Boolean useNormal = this.paramAry.get(1);
        Boolean hasFresnel = this.paramAry.get(2);
        Boolean useDynamicIBL = this.paramAry.get(3);
        Boolean lightProbe = this.paramAry.get(4);
        Boolean directLight = this.paramAry.get(5);
        Boolean noLight= this.paramAry.get(6);
        Boolean fogMode = this.paramAry.get(7);

        String addstr;
        String str=
                "attribute vec3 v3Position;\n"+
                        "attribute vec2 v2CubeTexST;\n"+
                        "varying vec2 v0;\n";

        if (directLight) {
            addstr= "varying vec3 v2;\n";
            str=  str +addstr;
        } else if (noLight) {

        } else {
            addstr=
                    "attribute vec2 v2lightuv;\n"+
                            "varying vec2 v2;\n";
            str=  str +addstr;
        }
        if (usePbr) {
            addstr=
                    "attribute vec3 v3Normal;\n"+
                            "varying vec3 v1;\n";
            str=  str +addstr;
            if (!useNormal) {
                addstr=  "varying vec3 v4;\n";
                str=  str +addstr;
            } else {
                addstr= "varying mat3 v4;\n";
                str=  str +addstr;
            }
        } else if (fogMode ) {
            addstr=
                    "varying vec3 v1;\n";
            str=  str +addstr;
        }
        if (useNormal) {
            addstr=
                    "attribute vec3 v3Tangent;\n"+
                            "attribute vec3 v3Bitangent;\n";
            str=  str +addstr;
        }
        if (directLight) {
            if (!usePbr) {
                addstr=
                        "attribute vec3 v3Normal;\n";
                str=  str +addstr;
            }
            addstr=
                    "uniform vec3 sunDirect;\n"+
                            "uniform vec3 sunColor;\n"+
                            "uniform vec3 ambientColor;\n";
            str=  str +addstr;
        }
        addstr=
                "uniform mat4 vpMatrix3D;\n"+
                        "uniform mat4 posMatrix3D;\n"+
                        "uniform mat3 rotationMatrix3D;\n";
        str=  str +addstr;
        addstr=
                "void main(void){\n"+
                        "v0 = vec2(v2CubeTexST.x, v2CubeTexST.y);\n"+
                        "vec4 vt0= vec4(v3Position, 1.0);\n"+
                        "vt0 = vt0*posMatrix3D   ;\n";
        str=  str +addstr;
        if (!(directLight || noLight)) {
            addstr=  "v2 = vec2(v2lightuv.x, v2lightuv.y);\n";
            str=  str +addstr;
        }
        if (usePbr || fogMode ) {
            addstr=
                    "v1 = vec3(vt0.x,vt0.y,vt0.z);\n";
            str=  str +addstr;
        }
        addstr=
                "vt0 = vt0*vpMatrix3D ;\n";
        str=  str +addstr;
        if (usePbr) {
            if (!useNormal) {
                addstr=  "v4 =v3Normal* rotationMatrix3D ;\n";
                str=  str +addstr;
            } else {
                addstr=
                        "v4 = mat3(v3Tangent*rotationMatrix3D  ,v3Bitangent*rotationMatrix3D ,v3Normal* rotationMatrix3D );\n";
                str=  str +addstr;
            }
        }
        if (directLight) {
            if (!usePbr) {
                addstr=
                        "vec3 n = v3Normal*rotationMatrix3D ;\n"+
                                "float suncos = dot(n.xyz,sunDirect.xyz);\n";
                str=  str +addstr;
            } else {
                addstr=
                        "float suncos = dot(v4.xyz,sunDirect.xyz);\n";
                str=  str +addstr;
            }

            addstr=
                    "suncos = clamp(suncos,0.0,1.0);\n"+
                            "v2 = sunColor * suncos + ambientColor;";
            str=  str +addstr;

        }
        addstr= "gl_Position = vt0; }";
        str=  str +addstr;


        Log.d("str=>", str);
*/




        return vertex;
    }
    public String getFragmentShaderString() {
        String fragment ="precision mediump float;\n"+
                "varying vec2 textureCoordinate;\n"+
                "uniform sampler2D fs0;\n"+
                "void main() {\n"+

                "vec4 aa =texture2D(fs0,textureCoordinate);\n"+
                "vec4 bb =vec4(textureCoordinate.x,1.0,1.0,1.0);\n"+

                "gl_FragColor=bb;\n"+
                "}";

        return fragment;
    }
}