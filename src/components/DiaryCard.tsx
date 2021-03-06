import React from "react";
import DateTextBlock from './Date';
import { Body, Button, Card, CardItem, Icon, Left, Text, Right } from 'native-base';
import { KindnessEntry, GoalOfDay } from '../constants/Icons';

interface DiaryCardProps {
  diary: IDiary;
  myUid: string;
  onAdd?: () => void;

  onEdit?: () => void;

  onDelete?: () => void;
}

const DiaryCard: React.SFC<DiaryCardProps> = (props) => {

  const i = props.diary;

  const isMine = props.myUid === i.authorId;

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
      <CardItem>
        {/* <Left>
          {props.onAdd && props.myUid !== i.authorId ? (
            <Button iconLeft small onPress={props.onAdd}>
              <Icon type={"FontAwesome"} name="plus" />
              <Text>Add to My Diary</Text>
            </Button>
          ) : null}
        </Left> */}
        {isMine && props.onDelete ? (
          <Left>
            <Button iconLeft small danger onPress={props.onDelete}>
              <Icon type={"FontAwesome"} name="trash" />
              <Text>Delete</Text>
            </Button>
          </Left>
        ) : null}
        {/* <Right>
          <Button iconLeft small onPress={() => alert("ToDo -> FullScreen Modal")}>
            <Icon type={"FontAwesome"} name="arrows-alt" />
            <Text>View</Text>
          </Button>

        </Right> */}

        {isMine && props.onEdit ? (
          <Right>
            <Button iconLeft small onPress={props.onEdit}>
              <Icon type={"FontAwesome"} name="pencil" />
              <Text>Edit</Text>
            </Button>
          </Right>

        ) : null}
      </CardItem>
    </Card>
  );
}

export default DiaryCard;