import React from "react";
// import { AsyncStorage, Modal, Alert } from "react-native";
import { Button, Text, Icon, Form, Item, Input, Spinner, View, H2, H3, CheckBox, Content, List, ListItem, Body, Container, Textarea, Header, Title, Left, Card, CardItem, } from 'native-base';
import { NavigationStackScreenOptions, NavigationScreenProps } from 'react-navigation';
import { Colors, Margin } from '../Theme';
import DiaryCard from '../components/DiaryCard';

interface KindnessPageProps extends NavigationScreenProps {

}
interface KindnessPageState {
}
//-- More Lifecyle Info: https://facebook.github.io/react/docs/react-component.html
class KindnessPage extends React.Component<KindnessPageProps, KindnessPageState> {
  public static navigationOptions: NavigationStackScreenOptions = {
    title: "Kindness Page"
  }

  private addToMyJournal(d: IDiary) {
    this.props.navigation.push("AddEditEntry", { "diaryId": d.id });
  }

  render() {
    const entries: IDiary[] = [
      { body: "This is a sample body text", title: "Diary Entry 1", id: "01", isGoalOfTheDay: true, date: "2018-05-01" },
      { body: "Yet another bit of sample text", title: "My First Real Entry", id: "02", isGoalOfTheDay: false, date: "2018-05-05" },
      { body: "Here's more of the text", title: "Diary Entry 3", id: "03", isGoalOfTheDay: true, date: "2018-05-15" }
    ];

    return (
      <Container>
          <Content style={{ flex: 1, flexDirection: "column", paddingHorizontal: Margin["2"] }}>
            {entries.map(i => <DiaryCard key={i.id} diary={i} onAdd={() => this.addToMyJournal(i)} />)}
          </Content>
        </Container>
    );
  }
}


export default KindnessPage;