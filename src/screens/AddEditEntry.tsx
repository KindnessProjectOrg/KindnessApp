import React from "react";
import moment from "moment";
import { AsyncStorage, Modal, Alert } from "react-native";
import { Calendar, CalendarList } from "react-native-calendars";
import { Button, Text, Icon, Form, Item, Input, Spinner, View, H2, H3, CheckBox, Content, ListItem, Body, Container, Textarea, Header, Title } from 'native-base';
import { NavigationScreenProps, NavigationScreenConfigProps } from 'react-navigation';
import { Colors, Margin } from '../Theme';

interface AddEditEntryRouteProps {
  diaryId?: string;
}

interface AddEditEntryProps extends NavigationScreenProps {

}
interface AddEditEntryState {
  isLoading: boolean;
  diary?: IDiary;
  isCalendarVisible?: boolean;
}
//-- More Lifecyle Info: https://facebook.github.io/react/docs/react-component.html
class AddEditEntry extends React.Component<AddEditEntryProps, AddEditEntryState> {

  static navigationOptions = ({ navigation }: NavigationScreenConfigProps) => {
    const { state } = navigation;
    const title = state.params ? state.params.title : null;
    return { title: title || "" };
  }

  static defaultProps: Partial<AddEditEntryProps> = {
    //-- If you don't need default props, this static property can be deleted
  }

  /**
   *
   */
  constructor(props: AddEditEntryProps) {
    super(props);

    this.state = {
      isLoading: true,
    }
    this.getDiaryFromProps();
  }



  diaryKey(id: string) {
    return `Diary_${id}`;
  }

  private getTitle(diary: IDiary) {
    const m = diary && diary.date ? moment(diary.date, moment.ISO_8601) : moment(new Date());
    if (m) {
      return `${m.format("MMMM")} ${m.format("Do")} ${m.format("YYYY")}`;;
    }
    return "";
  }

  render() {
    const props: AddEditEntryRouteProps = this.props.navigation.state.params ? this.props.navigation.state.params : {};

    if (this.state.isLoading) {
      return (
        <View>
          <H2>{"Loading . . . "}</H2>
          <Spinner />
        </View>
      );
    }

    if (this.state.diary) {
      const {
        diary
      } = this.state;
      const m = diary && diary.date ? moment(diary.date, moment.ISO_8601) : moment(new Date());

      return (<Container>
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={!!this.state.isCalendarVisible}
        >
          <View style={{ ...Margin.mt5, flex: 1, flexDirection: "column" }}>
            <Button onPress={() => this.setState({ isCalendarVisible: false })} style={{ alignSelf: "flex-end", margin: Margin["3"] }}>
              <Icon name={"times"} type={"FontAwesome"} />
            </Button>
            <CalendarList
              markedDates={{ [m.format(RNDF)]: { selected: true } }}
              style={{ flex: 1 }}
              horizontal={true}
              pagingEnabled={true}
              onDayPress={(c: RNCalendar) => this.onDateSelected(c)}
            />
          </View>
        </Modal>
        <Content>
          <View style={{ ...Margin.mt5, flex: 1, flexDirection: "column" }}>

            <Button onPress={() => this.setState({ isCalendarVisible: true })} style={{ margin: Margin["3"] }} block >
              <Icon type={"FontAwesome"} name={"calendar"} />
            </Button>
          </View>
          <ListItem>
            <CheckBox checked={diary.isGoalOfTheDay} onPress={() => this.toggleDiary(diary)} />
            <Body>
              <Text>Is Goal of the Day</Text>
            </Body>
          </ListItem>
          <ListItem>
            <CheckBox checked={!diary.isGoalOfTheDay} onPress={() => this.toggleDiary(diary)} />
            <Body>
              <Text>Other</Text>
            </Body>
          </ListItem>

          {!diary.isGoalOfTheDay ? (
            <Item regular>
              <Input placeholder={"Other"} value={diary.title} />
            </Item>
          ) : null}


          <View style={{ borderWidth: 2, borderColor: Colors.Primary, padding: Margin["1"], margin: Margin["3"] }}>
            <Textarea rowSpan={5} placeholder={"Share how you were kind"} onChangeText={text => this.modifyDiary(d => d.body = text)} value={diary.body}></Textarea>
          </View>


          <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between" }}>
            <Button style={{ ...Margin.ml2 }}
              onPress={() => {
                Alert.alert("Submit to Kindess Page?", "\nSubmitting to the kindness page makes this entry public. Although there's no guarentee it'll make it to the page, it could. \n\nAre you sure?",
                  [{ text: "Confirm", style: "default" }, { text: "Cancel", style: "cancel" }], { cancelable: false });
              }}><Text>{"Submit to Kindess Page"}</Text></Button>
            <Button style={{ ...Margin.mr2 }}><Text>{"My Diary"}</Text></Button>
          </View>


        </Content>

      </Container>);
    }

    return <H2>{"An error occured"}</H2>;
  }



  private createDiary(d?: IDiary) {
    if (d) {
      return { ...d };
    }

    return {
      id: Guid.newGuid(),
      date: new Date().toISOString(),
      isGoalOfTheDay: true,
    }
  }

  private async getDiaryFromProps() {
    try {
      const props: AddEditEntryRouteProps = this.props.navigation.state.params ? this.props.navigation.state.params : {};
      if (props.diaryId) {
        const local = await AsyncStorage.getItem(this.diaryKey(props.diaryId));

        if (local) {
          const diary = JSON.parse(local);
          this.setState({ diary, isLoading: false });
          return;
        }
      }
    } catch {

    }

    const d = this.createDiary();
    await AsyncStorage.setItem(this.diaryKey(d.id), JSON.stringify(d));

    this.props.navigation.setParams({ title: this.getTitle(d) });
    this.setState({ diary: d, isLoading: false });
  }


  private onDateSelected(day: RNCalendar) {
    const diary = { ...this.createDiary(this.state.diary), date: moment(day.dateString, RNDF).toISOString() };
    this.props.navigation.setParams({ title: this.getTitle(diary) });
    this.setState({ diary, isCalendarVisible: false });
  }

  private modifyDiary(alter: (d: IDiary) => void) {
    const copy = { ...this.createDiary(this.state.diary) };
    alter(copy);
    this.setState({ diary: copy });
  }

  private toggleDiary(diary: IDiary) {
    this.modifyDiary(d => d.isGoalOfTheDay = !diary.isGoalOfTheDay);
  }

}

const RNDF = "YYYY-MM-DD";

class Guid {
  static newGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}





export default AddEditEntry;