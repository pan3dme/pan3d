var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Pan3d;
(function (Pan3d) {
    var AnimManager = /** @class */ (function (_super) {
        __extends(AnimManager, _super);
        function AnimManager() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        AnimManager.prototype.getAnimDataImmediate = function ($url) {
            return this.dic[$url];
        };
        AnimManager.prototype.readData = function (byte, $url) {
            var hierarchyList = new Array;
            var frameAry = new Array;
            var animData = new Pan3d.AnimData();
            animData.inLoop = byte.readInt();
            var numLength = byte.readInt();
            for (var i = 0; i < numLength; i++) {
                animData.inter.push(byte.readInt());
            }
            numLength = byte.readInt();
            for (var i = 0; i < numLength; i++) {
                animData.bounds.push(byte.readVector3D());
            }
            animData.nameHeight = byte.readInt();
            numLength = byte.readInt();
            for (var i = 0; i < numLength; i++) {
                var objBone = new Pan3d.ObjectBone();
                objBone.father = byte.readInt();
                objBone.changtype = byte.readInt();
                objBone.startIndex = byte.readInt();
                objBone.tx = byte.readFloat();
                objBone.ty = byte.readFloat();
                objBone.tz = byte.readFloat();
                objBone.qx = byte.readFloat();
                objBone.qy = byte.readFloat();
                objBone.qz = byte.readFloat();
                hierarchyList.push(objBone);
            }
            this.readFrameData(byte, frameAry);
            numLength = byte.readInt();
            for (var i = 0; i < numLength; i++) {
                animData.posAry.push(byte.readVector3D());
            }
            animData.matrixAry = this.processFrame(frameAry, hierarchyList);
            this.dic[$url] = animData;
            return animData;
        };
        AnimManager.prototype.readFrameData = function (byte, frameAry) {
            var $frameTyeArr = this.readFrameTypeData(byte);
            var $isStand = byte.readBoolean(); //是否为站立，这里特殊给站立的旋转设置其权重值不压缩
            var $scaleNum = byte.readFloat();
            var numLength = byte.readInt();
            for (var i = 0; i < numLength; i++) {
                var frameItemAryLength = byte.readInt();
                var frameItemAry = new Array;
                frameAry.push(frameItemAry);
                for (var j = 0; j < frameItemAryLength; j++) {
                    if ($frameTyeArr[j]) {
                        frameItemAry.push(byte.readFloatTwoByte($scaleNum));
                    }
                    else {
                        if ($isStand) { //注意这里的特殊，针对站立时的旋转精度用浮点
                            frameItemAry.push(byte.readFloat());
                        }
                        else {
                            frameItemAry.push(byte.readShort() / 32767);
                        }
                    }
                }
            }
        };
        AnimManager.prototype.readFrameTypeData = function (byte) {
            var $arr = new Array;
            var numLength = byte.readInt();
            for (var i = 0; i < numLength; i++) {
                $arr.push(byte.readBoolean());
            }
            return $arr;
        };
        AnimManager.prototype.processFrame = function (frameAry, hierarchyList) {
            var newFrameAry = new Array;
            for (var i = 0; i < frameAry.length; i++) {
                newFrameAry.push(this.frameToBone(frameAry[i], hierarchyList));
            }
            return this.setFrameToMatrix(newFrameAry);
        };
        AnimManager.prototype.frameToBone = function (frameData, hierarchyList) {
            var _arr = new Array;
            for (var i = 0; i < hierarchyList.length; i++) {
                var _temp = new Pan3d.ObjectBaseBone();
                _temp.father = hierarchyList[i].father;
                var k = 0;
                if (hierarchyList[i].changtype & 1) {
                    _temp.tx = frameData[hierarchyList[i].startIndex + k];
                    ++k;
                }
                else {
                    _temp.tx = hierarchyList[i].tx;
                }
                if (hierarchyList[i].changtype & 2) {
                    _temp.ty = frameData[hierarchyList[i].startIndex + k];
                    ++k;
                }
                else {
                    _temp.ty = hierarchyList[i].ty;
                }
                if (hierarchyList[i].changtype & 4) {
                    _temp.tz = frameData[hierarchyList[i].startIndex + k];
                    ++k;
                }
                else {
                    _temp.tz = hierarchyList[i].tz;
                }
                if (hierarchyList[i].changtype & 8) {
                    _temp.qx = frameData[hierarchyList[i].startIndex + k];
                    ++k;
                }
                else {
                    _temp.qx = hierarchyList[i].qx;
                }
                if (hierarchyList[i].changtype & 16) {
                    _temp.qy = frameData[hierarchyList[i].startIndex + k];
                    ++k;
                }
                else {
                    _temp.qy = hierarchyList[i].qy;
                }
                if (hierarchyList[i].changtype & 32) {
                    _temp.qz = frameData[hierarchyList[i].startIndex + k];
                    ++k;
                }
                else {
                    _temp.qz = hierarchyList[i].qz;
                }
                _arr.push(_temp);
            }
            return _arr;
        };
        AnimManager.prototype.setFrameToMatrix = function (frameAry) {
            var matrixAry = new Array;
            for (var j = 0; j < frameAry.length; j++) {
                var boneAry = frameAry[j];
                var Q0 = new Pan3d.Quaternion();
                var newM = new Pan3d.Matrix3D();
                var frameMatrixAry = new Array;
                matrixAry.push(frameMatrixAry);
                for (var i = 0; i < boneAry.length; i++) {
                    var xyzfarme0 = boneAry[i];
                    Q0 = new Pan3d.Quaternion(xyzfarme0.qx, xyzfarme0.qy, xyzfarme0.qz);
                    Q0.w = this.getW(Q0.x, Q0.y, Q0.z);
                    if (xyzfarme0.father == -1) {
                        newM = Q0.toMatrix3D();
                        newM.appendTranslation(xyzfarme0.tx, xyzfarme0.ty, xyzfarme0.tz);
                        newM.appendRotation(-90, Pan3d.Vector3D.X_AXIS);
                        //xyzfarme0.matrix = newM;
                        frameMatrixAry.push(newM);
                    }
                    else {
                        var fatherBone = boneAry[xyzfarme0.father];
                        newM = Q0.toMatrix3D();
                        newM.appendTranslation(xyzfarme0.tx, xyzfarme0.ty, xyzfarme0.tz);
                        //newM.append(fatherBone.matrix);
                        newM.append(frameMatrixAry[xyzfarme0.father]);
                        frameMatrixAry.push(newM);
                        //xyzfarme0.matrix = newM;
                    }
                }
                for (i = 0; i < frameMatrixAry.length; i++) {
                    frameMatrixAry[i].appendScale(-1, 1, 1); //特别标记，因为四元数和矩阵运算结果不一  先存正确的矩阵
                    //xyzfarme0.matrix.appendScale(-1, 1, 1);
                }
            }
            return matrixAry;
        };
        AnimManager.prototype.getW = function (x, y, z) {
            var t = 1 - (x * x + y * y + z * z);
            if (t < 0) {
                t = 0;
            }
            else {
                t = -Math.sqrt(t);
            }
            return t;
        };
        return AnimManager;
    }(Pan3d.ResGC));
    Pan3d.AnimManager = AnimManager;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=AnimManager.js.map