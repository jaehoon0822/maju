import moment from "moment";
import "moment/locale/ko";

export const getDateTime = (stringDate: string) => {
  moment.locale("ko");
  const date = moment(stringDate).utc().format("YYYY년 MM월 DD일");
  return date.split(" ");
};
