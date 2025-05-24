import moment from "moment";

export const printLog = (message) => {
    const formattedDate = moment().format("YYYY-MM-DD HH:mm:ss");
    console.log(`[${formattedDate}] ${message}`);
}