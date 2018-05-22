import React from "react";
import { Button, Text, Spinner, H2, Container, Content, Footer, Icon } from 'native-base';
import { NavigationScreenProps, NavigationStackScreenOptions } from 'react-navigation';
import { Margin } from '../Theme';
import { GetMyDiaries } from "../lib/diaryManager";
import DiaryCard from '../components/DiaryCard';
import AScreenComponent from './AScreenComponent';

interface MyDiaryProps extends NavigationScreenProps {

}

interface MyDiaryState {
  currentUser?: IFirebaseUser;
  entries: IDiary[];
  isLoading: boolean;
}

class MyDiary extends AScreenComponent<MyDiaryProps, MyDiaryState> {

  public static navigationOptions: NavigationStackScreenOptions = {
    title: "My Diary"
  }

  constructor(props: MyDiaryProps, ctx) {
    super(props, ctx);
  }

  initState() {
    return {
      entries: [],
      isLoading: true
    }
  }

  async onGetUser(u: IFirebaseUser) {
    this.RefreshEntries();
  }

  private RefreshEntries() {
    this.setState({ isLoading: true }, async () => {
      var entries = await GetMyDiaries() || [];
      this.setState({ isLoading: false, entries });
    });
  }

  render() {

    const {
      isLoading,
      currentUser,
      entries
    } = this.state;

    if (isLoading) {
      return (
        <Container>
          <Spinner />
        </Container>
      )
    }

    if (!currentUser) {
      this.props.navigation.replace("Login");
      return null;
    }

    return (
      <Container>
        <Content style={{ flex: 1, flexDirection: "column", paddingHorizontal: Margin["2"] }}>
          {entries.map(i => <DiaryCard key={i.id} diary={i} myUid={currentUser.uid} />)}
        </Content>
        <Footer>
          <Button onPress={() => this.onAddNewEntry()} iconLeft style={{ marginTop: 5 }}>
            <Icon type={"FontAwesome"} name="plus" />
            <Text>Create Entry</Text>
          </Button>
        </Footer>
      </Container>
    );
  }

  private onAddNewEntry() {
    this.props.navigation.push("AddEditEntry", {
      onFinished: () => {
        this.RefreshEntries();
      }
    });
  }
}

export default MyDiary;