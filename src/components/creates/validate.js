import moment from "moment";

export function someDate([value]) {
  if (!value) {
    return "Some date must not be null";
  }

  const date = moment(value);

  if (!date.isValid()) {
    return "Some date must be an actual date";
  }

  if (date.isBefore(moment().subtract(3, "days"))) {
    return "Some date must not be more than three days in the past";
  }

  return undefined;
}
