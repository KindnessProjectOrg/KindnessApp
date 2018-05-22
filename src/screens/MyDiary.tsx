import * as React from "react";
import { Button, Text, Spinner, H2, Container, Content } from 'native-base';
import { NavigationScreenProps } from 'react-navigation';
import { Margin } from '../Theme';
import { GetUser } from '../lib/LocalStore';
import DiaryCard from '../components/DiaryCard';

interface MyDiaryProps extends NavigationScreenProps {

}

interface MyDiaryState {
  currentUser?: IFirebaseUser;
  entries: IDiary[];
  isLoading: boolean;
}

class MyDiary extends React.Component<MyDiaryProps, MyDiaryState> {

  constructor(props: MyDiaryProps) {
    super(props);

    this.state = {
      entries: [],
      isLoading: true
    };

    GetUser().then(u => {
      if(u) {
        this.setState({currentUser: u});
      }
    })
  }

  render() {
    
    const {
      isLoading,
      currentUser,
      entries
    } = this.state;

    if(isLoading) {
      return (
        <Container>
          <Spinner />
        </Container>
      )
    }

    if(!currentUser) {
      this.props.navigation.replace("Login");
      return null;
    }
    
    return (
      <Container>
          <Content style={{ flex: 1, flexDirection: "column", paddingHorizontal: Margin["2"] }}>
            <Button onPress={() => this.onAddNewEntry()}>
              <Text>{"New Entry"}</Text>
            </Button>
            <H2 style={{ textAlign: "center" }}>{"My Diary Entries!"}</H2>
            {entries.map(i => <DiaryCard key={i.id} diary={i} myUid={currentUser.uid} />)}
          </Content>
      </Container>
    );
  }

  private onAddNewEntry() {
    this.props.navigation.push("AddEditEntry");
  }
}

export default MyDiary;