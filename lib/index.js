"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var progress_1 = __importDefault(require("progress"));
function createProgress(total) {
    if (process.stderr.isTTY) {
        return new progress_1["default"]("[:bar] :current/:total :percent :rate/s :etas ", {
            total: total
        });
    }
    else {
        var current_1 = 0;
        var percent_1 = 0;
        var start_1 = +new Date();
        return {
            tick: function () {
                current_1 += 1;
                var ratio = Math.min(Math.max(current_1 / total, 0), 1);
                var value = Math.floor(ratio * 100);
                if (value !== percent_1) {
                    percent_1 = value;
                    var elapsed = +new Date() - start_1;
                    var eta = percent_1 === 100 ? 0 : elapsed * (total / current_1 - 1);
                    var rate = current_1 / (elapsed / 1000);
                    console.log("    " + percent_1 + "% " + Math.round(rate) + "/s " + (isNaN(eta) || !isFinite(eta) ? '0.0' : (eta / 1000).toFixed(1)) + "s");
                }
            }
        };
    }
}
exports["default"] = createProgress;
