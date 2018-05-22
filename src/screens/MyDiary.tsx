import * as React from "react";
import { GetMyDiaries, ClearDiaries } from "../lib/diaryManager";
import { YMDString } from "../lib/dt";
import { Button, Text, Icon, Form, Item, Input, Left, Spinner, View, H2, H3, CheckBox, Content, List, ListItem, Body, Container, Textarea, Header, Title } from 'native-base';
import { Colors, Margin } from '../Theme';
import { NavigationScreenProps } from 'react-navigation';
interface MyDiaryProps extends NavigationScreenProps {
  //-- Define the interface for your props here. It's just a regular typescript interface
  //-- Use ? for optional properties
}

interface MyDiaryState {
  myEntries: IAsyncRequest<IDiary[]>;
}


//-- More Lifecyle Info: https://facebook.github.io/react/docs/react-component.html
class MyDiary extends React.Component<MyDiaryProps, MyDiaryState> {


  /**
   *
   */
  constructor(props: MyDiaryProps) {
    super(props);

    this.state = {
      myEntries: {
        isLoading: true,
        data: []
      }
    }

    this.refresh();
  }

  refresh = async () => {
    GetMyDiaries().then(d => {
      this.setState({
        myEntries: {
          isLoading: false,
          data: d || []
        }
      })
    });
  }

  clear = async () => {
    await ClearDiaries();
    this.setState({
      myEntries: {
        isLoading: false,
        data: []
      }
    });
  }

  render() {
    const entries = this.state.myEntries;
    return (
      <Container>
        <Content style={{ flex: 1, flexDirection: "column" }}>
          <H2 style={{ alignSelf: "center", marginTop: Margin["5"] }}>{"My Diaries"}</H2>
          <View style={{ flex: 1, flexDirection: "row", alignContent: "space-between", padding: 12}}>
            <Button onPress={() => this.props.navigation.push("AddEditEntry")}>
              <Text style={{ textAlign: "center" }}>{"Add"}</Text>
            </Button>
            <Button onPress={this.clear} danger>
              <Text style={{ textAlign: "center" }}>{"Clear Entries"}</Text>
            </Button>
            <Button onPress={this.refresh} danger>
              <Text style={{ textAlign: "center" }}>{"Refresh"}</Text>
            </Button>
          </View>
          {entries.isLoading ? <Spinner /> : null}
          {!entries.isLoading && entries.data && entries.data.length > 0 ? (
            <List>
              {entries.data.map(i => (
                <ListItem key={i.id} icon onPress={() => this.props.navigation.push("AddEditEntry", { diaryId: i.id })}>
                  <Left>
                    <Icon name={i.isGoalOfTheDay ? "star" : "circle"} type={"FontAwesome"} />
                  </Left>
                  <Body>
                    <Text>{`${YMDString(i.date)} - ${i.title || ""}`}</Text>
                  </Body>
                </ListItem>
              ))}
            </List>
          ) : null}
        </Content>
      </Container >
    );
  }
}


export default MyDiary;