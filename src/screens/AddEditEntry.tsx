import React from "react";
import moment from "moment";
import { Modal, Alert } from "react-native";
import { CalendarList } from "react-native-calendars";
import { Button, Text, Icon, Item, Input, Spinner, View, H2, CheckBox, Content, ListItem, Body, Container, Textarea, } from 'native-base';
import { NavigationScreenProps, NavigationScreenConfigProps } from 'react-navigation';
import { Colors, Margin } from '../Theme';
import { StoreDiary, GetDiary, AddOrUpdateDiary } from '../lib/LocalStore';
import AScreenComponent from './AScreenComponent';

interface AddEditEntryRouteProps {
  diaryId?: string;
}

interface AddEditEntryProps extends NavigationScreenProps {

}
interface AddEditEntryState {
  isLoading: boolean;
  diary?: IDiary;
  isCalendarVisible?: boolean;
  currentUser?: IFirebaseUser;
}

class AddEditEntry extends AScreenComponent<AddEditEntryProps, AddEditEntryState> {

  static navigationOptions = ({ navigation }: NavigationScreenConfigProps) => {
    const { state } = navigation;
    const title = state.params ? state.params.title : null;
    return { title: title || "" };
  }

  constructor(props: AddEditEntryProps, ctx) {
    super(props, ctx);
  }

  private getTitle(diary: IDiary) {
    const m = diary && diary.date ? moment(diary.date, moment.ISO_8601) : moment(new Date());
    if (m) {
      return `${m.format("MMMM")} ${m.format("Do")} ${m.format("YYYY")}`;;
    }
    return "";
  }

  render() {

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
              <Input placeholder={"Other"} onChangeText={t => this.modifyDiary(d => d.title = t)} value={diary.title} />
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
            <Button style={{ ...Margin.mr2 }} onPress={this.AddUpdateToMyDiary}><Text>{"My Diary"}</Text></Button>
          </View>


        </Content>

      </Container>);
    }

    return <H2>{"An error occured"}</H2>;
  }

  AddUpdateToMyDiary = async () => {
    this.setState({ isLoading: true });

    if(this.state.diary) {
      await AddOrUpdateDiary(this.state.diary);
    }
    this.props.navigation.goBack();
  }



  private createDiary(d?: IDiary): IDiary {
    if (d) {
      return { ...d };
    }

    return {
      id: Guid.newGuid(),
      authorId: "",
      date: new Date().toISOString(),
      isGoalOfTheDay: true,
    }
  }

  protected initState(): AddEditEntryState {
    return {
      isLoading: true,
    }
  }

  protected async onGetUser(user: IFirebaseUser) {
    try {

      const props: AddEditEntryRouteProps = this.props.navigation.state.params ? this.props.navigation.state.params : {};
      if (props.diaryId) {
        const diary = await GetDiary(props.diaryId);

        if (diary) {
          this.setState({ diary, currentUser: user, isLoading: false });
          this.setState({ diary, isLoading: false });
          return;
        }
      }

    } catch {

    }

    const d = this.createDiary();
    await AddOrUpdateDiary(d);

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