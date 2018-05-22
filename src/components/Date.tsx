import * as React from "react";
import { Text } from "native-base";
import moment from "moment";


interface DateProps {
  value?: string;
  note?: boolean;
}

const DateTextBlock: React.SFC<DateProps> = (props) => {
  if (props.value) {
    const m = moment(props.value);

    if (m.isValid()) {
      return (
        <Text note={props.note}>{`${m.format("MMMM")} ${m.format("Do")} ${m.format("YYYY")}`}</Text>
      );
    }
  }

  return null;
}

DateTextBlock.defaultProps = {

  //-- Define any default props you have here

}

export default DateTextBlock;