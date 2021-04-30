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
    var ObjectBone = /** @class */ (function (_super) {
        __extends(ObjectBone, _super);
        function ObjectBone() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ObjectBone.prototype.clone = function () {
            var newBone = new ObjectBone;
            newBone.tx = this.tx;
            newBone.ty = this.ty;
            newBone.tz = this.tz;
            newBone.tw = this.tw;
            newBone.qx = this.qx;
            newBone.qy = this.qy;
            newBone.qz = this.qz;
            newBone.qw = this.qw;
            newBone.changtype = this.changtype;
            newBone.name = this.name;
            newBone.father = this.father;
            newBone.startIndex = this.startIndex;
            newBone.matrix = this.matrix;
            return newBone;
        };
        return ObjectBone;
    }(Pan3d.ObjectBaseBone));
    Pan3d.ObjectBone = ObjectBone;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=ObjectBone.js.map