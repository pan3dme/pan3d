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
    var DynamicTexItem = /** @class */ (function (_super) {
        __extends(DynamicTexItem, _super);
        function DynamicTexItem() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        DynamicTexItem.prototype.initCurve = function ($type) {
            this.curve = new Pan3d.Curve(this.scene3D);
            this.curve.type = $type;
        };
        Object.defineProperty(DynamicTexItem.prototype, "texture", {
            get: function () {
                if (this._textureDynamic) {
                    return this._textureDynamic;
                }
                else {
                    if (this.textureRes) {
                        return this.textureRes.texture;
                    }
                    else {
                        return null;
                    }
                }
            },
            enumerable: false,
            configurable: true
        });
        DynamicTexItem.prototype.creatTextureByCurve = function () {
            var i = 0;
            var endVecIndex = this.curve.valueVec.length - 1;
            var imgNumVec = new Array;
            for (var i = 0; i < this.life; i++) {
                if (i < this.curve.begintFrame) {
                    imgNumVec.push(this.curve.valueVec[0][0] * 0xff, this.curve.valueVec[0][1] * 0xff, this.curve.valueVec[0][2] * 0xff, this.curve.valueVec[0][3] * 0xff);
                }
                else if (i > this.curve.maxFrame) {
                    if (this.curve.maxFrame == 0 && this.curve.begintFrame < 0) {
                        imgNumVec.push(0xff, 0xff, 0xff, 0xff);
                    }
                    else {
                        imgNumVec.push(this.curve.valueVec[endVecIndex][0] * 0xff, this.curve.valueVec[endVecIndex][1] * 0xff, this.curve.valueVec[endVecIndex][2] * 0xff, this.curve.valueVec[endVecIndex][3] * 0xff);
                    }
                }
                else {
                    if (this.curve.begintFrame < 0) {
                        imgNumVec.push(0xff, 0xff, 0xff, 0xff);
                    }
                    else {
                        var index = i - this.curve.begintFrame;
                        imgNumVec.push(this.curve.valueVec[index][0] * 0xff, this.curve.valueVec[index][1] * 0xff, this.curve.valueVec[index][2] * 0xff, this.curve.valueVec[index][3] * 0xff);
                    }
                }
            }
            var img = Pan3d.ColorTransition.getInstance().getImageDataByVec(imgNumVec, this.life);
            this._textureDynamic = this.scene3D.context3D.getTexture(img);
        };
        return DynamicTexItem;
    }(Pan3d.DynamicBaseTexItem));
    Pan3d.DynamicTexItem = DynamicTexItem;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=DynamicTexItem.js.map