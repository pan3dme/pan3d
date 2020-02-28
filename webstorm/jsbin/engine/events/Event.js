"use strict";
var BaseEvent = /** @class */ (function () {
    function BaseEvent($type) {
        this.type = $type;
    }
    BaseEvent.COMPLETE = "complete";
    return BaseEvent;
}());
