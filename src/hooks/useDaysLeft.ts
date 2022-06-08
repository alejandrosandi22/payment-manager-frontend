import { useState, useEffect } from "react";

import moment from "moment";

function format(setValue: any, properties: any) {
  const updateDay = moment(properties.date);
  const today = moment();

  const diff: any = today.diff(updateDay, "days", true);
  let diffMath: number = Math.trunc(diff);

  if (properties.payment === 10000) {
    if (diffMath >= 30) return setValue("Expired payment");
    return setValue(`Your payment expires in ${30 - diffMath} days`);
  }

  if (properties.payment === 5000) {
    if (diffMath >= 15) return setValue("Expired payment");
    return setValue(`Your payment expires in ${15 - diffMath} days`);
  }

  if (properties.payment === 3000) {
    if (diffMath >= 8) return setValue("Expired payment");
    return setValue(`Your payment expires in ${8 - diffMath} days`);
  }
}

const useDaysLeft = (date: any, payment: number) => {
  const [daysLeft, setDaysLeft] = useState("");

  useEffect(() => {
    format(setDaysLeft, { date, payment });
  }, [payment, date]);

  return daysLeft;
};

export default useDaysLeft;
