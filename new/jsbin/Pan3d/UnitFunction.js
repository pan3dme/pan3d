function getBaseUrl() {
    return "";
}
function getUItittleUrl(name) {
    return "ui/load/tittle/" + name + ".png";
}
function getSkillUrl(name) {
    var str = "skill/" + name + getBaseUrl() + ".txt";
    return str.replace(".txt", "_byte.txt");
}
function getModelUrl(name) {
    return "model/" + name + getBaseUrl() + ".txt";
}
function getModelUIUrl(name) {
    return "model/" + name + getBaseUrl() + ".txt";
}
function getMapUrl(name) {
    return "map/" + name + ".txt";
}
function getRoleUrl(name) {
    return "role/" + name + getBaseUrl() + ".txt";
}
function makeImage() {
    var _img = new Image();
    _img.setAttribute("crossOrigin", "anonymous");
    return _img;
}
function unZip($aryBuf) {
    var compressed = new Uint8Array($aryBuf);
    //var t = Date.now();
    var inflate = new Zlib.Inflate(compressed);
    var plain = inflate.decompress();
    ////console.log("解压obj",Date.now()-t);
    return plain.buffer;
}
function trim(s) {
    return trimRight(trimLeft(s));
} //去掉左边的空白  
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
    if (s == null)
        return "";
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
function hexToArgb(expColor, is32, color) {
    if (is32 === void 0) { is32 = true; }
    if (color === void 0) { color = null; }
    if (!color) {
        color = new Pan3d.Vector3D();
    }
    color.w = is32 ? (expColor >> 24) & 0xFF : 0;
    color.x = (expColor >> 16) & 0xFF;
    color.y = (expColor >> 8) & 0xFF;
    color.z = (expColor) & 0xFF;
    return color;
}
function getZipByte($byte) {
    var zipLen = $byte.readInt();
    var aryBuf = $byte.buffer.slice($byte.position, $byte.position + zipLen);
    $byte.position += zipLen;
    var zipedBuf = unZip(aryBuf);
    return new Pan3d.Pan3dByteArray(zipedBuf);
}
//# sourceMappingURL=UnitFunction.js.map