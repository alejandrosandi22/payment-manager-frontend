import moment from "moment";

function format(setValue: any, properties: any) {
  const updateDay = moment(properties.date).format("YYYY-MM-d");
  const today = moment(new Date()).format("YYYY-MM-d");

  const diff: number = moment(today).diff(moment(updateDay), 'month', true);
  
  if (properties.payment === 10000) {
    if ((30 - Math.trunc(diff * 30)) <= 0) return setValue('Expired monthly payment');
    else return setValue(`${30 - Math.trunc(diff * 30)} days`);
  }

  if (properties.payment === 5000) {
    if (Math.trunc(diff * 30) > 16) return setValue('Expired monthly payment');
    else return setValue(`${14 - Math.trunc(diff * 30)} days`);
  }

  if (properties.payment === 3000) {
    if (Math.trunc(diff * 30) > 8) return setValue('Expired monthly payment');
    else return setValue(`${7 - Math.trunc(diff * 30)} days`);
  }
}

export {format}