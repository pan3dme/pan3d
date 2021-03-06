module Pan3d {
    export class MaterialParam  extends ResCount {
        public material: Material;
        public materialUrl: string;

        // public program: WebGLProgram;
        public shader: Shader3D;
        public dynamicTexList:Array<DynamicTexItem>;
        public dynamicConstList:Array<DynamicConstItem>;

    
    

        public setMaterial($materialTree: Material): void {
           
            this.material = $materialTree;
            this.materialUrl = $materialTree.url;

            this.dynamicTexList = new Array;
            this.dynamicConstList = new Array;
            this.setTexList();
            this.setConstList();
           
        }

        public setLife($life: number): void {
      
            for (var i: number = 0; i < this.dynamicTexList.length; i++) {
                if (this.dynamicTexList[i].isParticleColor) {
                    this.dynamicTexList[i].life = $life;
                }
            }
            
        }



        public setTexList(): void {
         
            var texList: Array<TexItem> = this.material.texList;
            for (var i: number = 0; i < texList.length; i++) {
                var dyTex: DynamicTexItem;
                if (texList[i].isParticleColor) {
                    dyTex = new DynamicTexItem(this.scene3D);
                    dyTex.target = texList[i];
                    dyTex.paramName = texList[i].paramName;
                    dyTex.initCurve(4);
                    this.dynamicTexList.push(dyTex);
                    dyTex.isParticleColor = true;
                } else if (texList[i].isDynamic) {
                    dyTex = new DynamicTexItem(this.scene3D);
                    dyTex.target = texList[i];
                    dyTex.paramName = texList[i].paramName;
                    this.dynamicTexList.push(dyTex);
                }

            }
          
        }

        public setConstList(): void {
           
            var constList: Array<ConstItem> = this.material.constList;

            for (var i: number = 0; i < constList.length; i++) {
                var constItem: ConstItem = constList[i];
                var dyCon: DynamicConstItem;
                if (constItem.param0Type != 0) {
                    dyCon = new DynamicConstItem(this.scene3D);
                
                    dyCon.setTargetInfo(constItem, constItem.paramName0, constItem.param0Type);
                    this.dynamicConstList.push(dyCon);
                }

                if (constItem.param1Type != 0) {
                    dyCon = new DynamicConstItem(this.scene3D);
     
                    dyCon.setTargetInfo(constItem, constItem.paramName1, constItem.param1Type);
                    this.dynamicConstList.push(dyCon);
                }

                if (constItem.param2Type != 0) {
                    dyCon = new DynamicConstItem(this.scene3D);
       
                    dyCon.setTargetInfo(constItem, constItem.paramName2, constItem.param2Type);
                    this.dynamicConstList.push(dyCon);
                }

                if (constItem.param3Type != 0) {
                    dyCon = new DynamicConstItem(this.scene3D);
               
                    dyCon.setTargetInfo(constItem, constItem.paramName3, constItem.param3Type);
                    this.dynamicConstList.push(dyCon);
                }
            }
 
        }

        public setTextObj(ary: Array<any>): void {
        
            for (var i: number = 0; i < ary.length; i++) {
                var obj: any = ary[i];
                for (var j: number = 0; j < this.dynamicTexList.length; j++) {
                    var dynamicTexItem:DynamicTexItem=this.dynamicTexList[j];
                    if (dynamicTexItem.paramName == obj.paramName) {
                        if (dynamicTexItem.isParticleColor) {
                            dynamicTexItem.curve.setData(obj.curve);
                        } else {
                            dynamicTexItem.url = obj.url;
                        }
                        break;
                    }
                }
            }
        

        }

        public setConstObj(ary: Array<any>): void {
         
            for (var i: number = 0; i < ary.length; i++) {
                var obj: any = ary[i];
                for (var j: number = 0; j < this.dynamicConstList.length; j++) {
                    if (this.dynamicConstList[j].paramName == obj.paramName) {
                        this.dynamicConstList[j].curve.setData(obj.curve)
                        break;
                    }
                }
            }
          
        }




    }
}