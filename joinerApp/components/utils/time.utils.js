import Moment from "moment";

export function getDurationString(beginDate, endDate) {
    return Moment.utc(Moment(endDate).diff(Moment(beginDate))).format("HH [h.] mm [min.]");
}