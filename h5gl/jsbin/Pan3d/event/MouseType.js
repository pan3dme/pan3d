var Pan3d;
(function (Pan3d) {
    var MouseType = /** @class */ (function () {
        function MouseType() {
        }
        MouseType.MouseDown = "mousedown";
        MouseType.MouseUp = "mouseup";
        MouseType.MouseMove = "mousemove";
        MouseType.MouseClick = "mouseclick";
        MouseType.KeyDown = "keydown";
        MouseType.KeyUp = "keyup";
        MouseType.MouseWheel = "mousewheel";
        //public static TouchMown = "panstart";   
        //public static TouchMove = "panmove";
        //public static TouchUp = "panend";
        //public static TouchClick = "tap";
        MouseType.TouchStart = "touchstart";
        MouseType.TouchMove = "touchmove";
        MouseType.TouchEnd = "touchend";
        MouseType.TouchClick = "touchstart";
        return MouseType;
    }());
    Pan3d.MouseType = MouseType;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=MouseType.js.map