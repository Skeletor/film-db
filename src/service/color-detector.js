
import Constants from "../constants";

export default class ColorDetector {
    static detectColorByRating(rate) {
        return rate >= 0 && rate < 3
               ? Constants.LowestRateColor
               : rate >= 3 && rate < 5
               ? Constants.LowRateColor
               : rate >= 5 && rate < 7
               ? Constants.MiddleRateColor
               : Constants.HighRateColor
    }
}