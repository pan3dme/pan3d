

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
function trim(s) {
    return trimRight(trimLeft(s));
}//去掉左边的空白  
function trimLeft(s) {
    if (s == null) {
        return "";
    }
    var whitespace = new String(" \t\n\r");
    var str = new String(s);
    if (whitespace.indexOf(str.charAt(0)) != -1) {
        var j = 0, i = str.length;
        while (j < i && whitespace.indexOf(str.charAt(j)) != -1) {
            j++;
        }
        str = str.substring(j, i);
    }
    return str;
}

//去掉右边的空白 www.2cto.com   
function trimRight(s) {
    if (s == null) return "";
    var whitespace = new String(" \t\n\r");
    var str = new String(s);
    if (whitespace.indexOf(str.charAt(str.length - 1)) != -1) {
        var i = str.length - 1;
        while (i >= 0 && whitespace.indexOf(str.charAt(i)) != -1) {
            i--;
        }
        str = str.substring(0, i + 1);
    }
    return str;
}

function float2int(value) {
    return value | 0;
}
function hexToArgb(expColor: number, is32: boolean = true, color: Pan3d.Vector3D = null): Pan3d. Vector3D {
    if (!color) {
        color = new Pan3d. Vector3D();
    }
    color.w = is32 ? (expColor >> 24) & 0xFF : 0;
    color.x = (expColor >> 16) & 0xFF;
    color.y = (expColor >> 8) & 0xFF;
    color.z = (expColor) & 0xFF;
    return color;
}
function getZipByte($byte: Pan3d.Pan3dByteArray): Pan3d. Pan3dByteArray {
    var zipLen: number = $byte.readInt();
    var aryBuf: ArrayBuffer = $byte.buffer.slice($byte.position, $byte.position + zipLen);
    $byte.position += zipLen;
    var zipedBuf: ArrayBuffer = unZip(aryBuf)
    return new Pan3d. Pan3dByteArray(zipedBuf)
}