import React from "react";
import DateTextBlock from './Date';
import { Body, Button, Card, CardItem, Icon, Left, Text } from 'native-base';
import { KindnessEntry, GoalOfDay } from '../constants/Icons';

interface DiaryCardProps {
  diary: IDiary;
  onAdd?: () => void;
}

const DiaryCard: React.SFC<DiaryCardProps> = (props) => {

  const i = props.diary;

  return (
    <Card style={{ flex: 0 }} key={i.id}>
      <CardItem>
        <Left>
          <Icon type={"FontAwesome"} name={i.isGoalOfTheDay ? GoalOfDay : KindnessEntry} />
          <Body>
            <Text>{i.title}</Text>
            <DateTextBlock value={i.date} note />
          </Body>
        </Left>
      </CardItem>
      <CardItem>
        <Body>
          <Text>
            {i.body}
          </Text>
        </Body>
      </CardItem>
      {props.onAdd ? (<CardItem>
        <Left>
          <Button iconLeft small onPress={props.onAdd}>
            <Icon type={"FontAwesome"} name="plus" />
            <Text>Add to My Diary</Text>
          </Button>
        </Left>
      </CardItem>) : null}
    </Card>
  );
}

DiaryCard.defaultProps = {

  //-- Define any default props you have here

}

export default DiaryCard;