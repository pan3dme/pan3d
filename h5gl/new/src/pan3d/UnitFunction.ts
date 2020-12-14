

function getBaseUrl(): string {
    return "";
}
function getUItittleUrl(name: string): string {

    return "ui/load/tittle/" + name + ".png";
}
function getSkillUrl(name: string): string {
    var str: string = "skill/" + name + getBaseUrl() + ".txt";
    return str.replace(".txt", "_byte.txt")
}

function getModelUrl(name: string): string {
    return "model/" + name + getBaseUrl() + ".txt";
}

function getModelUIUrl(name: string): string {
    return "model/" + name + getBaseUrl() + ".txt";
}
function getMapUrl(name: string): string {
    return "map/" + name + ".txt";
}

function getRoleUrl(name: string): string {
   
    return "role/" + name + getBaseUrl() + ".txt";
}
function makeImage(): any {
    var _img: any = new Image();
    _img.setAttribute("crossOrigin", "anonymous");
    return _img
}
function unZip($aryBuf: ArrayBuffer): ArrayBuffer {
    var compressed: Uint8Array = new Uint8Array($aryBuf);
    //var t = Date.now();
    var inflate = new Zlib.Inflate(compressed);
    var plain: Uint8Array = inflate.decompress();
    ////console.log("解压obj",Date.now()-t);
    return plain.buffer;


}