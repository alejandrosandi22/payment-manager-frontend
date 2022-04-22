import moment from "moment";

export function format(setValue: any, properties: any) {
  const updateDay = moment(properties.date);
  const today = moment();

  const diff: any = today.diff(updateDay, 'days', true);
  let diffMath: number = (Math.trunc(diff));

  if (properties.payment === 10000) {
    if (diffMath >= 30) return setValue('Expired payment');
    return setValue(`${30 - diffMath} days`);
  }
  
  if (properties.payment === 5000) {
    if (diffMath >= 15) return setValue('Expired payment');
    return setValue(`${15 - diffMath} days`);
  }
  
  if (properties.payment === 3000) {
    if (diffMath >= 8) return setValue('Expired payment');
    return setValue(`${8 - diffMath} days`);
  }
}
