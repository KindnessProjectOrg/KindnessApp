import React from "react";
import { Alert } from "react-native";
import { Button, Text, Spinner, Container, Content, Footer, Icon, } from 'native-base';
import { NavigationScreenProps, NavigationStackScreenOptions } from 'react-navigation';
import { Margin } from '../Theme';
import { GetMyDiaries, DeleteDiary } from "../lib/diaryManager";
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
          {entries.map(i => <DiaryCard key={i.id} diary={i} myUid={currentUser.uid} onEdit={() => this.onEdit(i)} onDelete={() => this.onDelete(i)} />)}
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

  private async onDelete(d: IDiary) {
    console.log(`Diary Entry to Delete: ${d.id}`);
    Alert.alert("Delete Entry?", "\nAre you sure you want to delete this entry??",
      [{
        text: "Delete", style: "destructive", onPress: async () => {
          await DeleteDiary(d.id);
          this.RefreshEntries();
        }
      }, { text: "Cancel", style: "cancel" }], { cancelable: false });
  }

  private onEdit(d: IDiary) {
    this.props.navigation.push("AddEditEntry", {
      diaryId: d.id,
      onFinished: () => {
        this.RefreshEntries();
      }
    });
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