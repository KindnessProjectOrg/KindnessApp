import * as React from "react";
import { Button, Text, Icon, Form, Item, Input, Spinner, View, H2, Container, Content, Footer, FooterTab } from 'native-base';
import { NavigationScreenProps } from 'react-navigation';
import { Image } from 'react-native';
import { Colors, Margin } from '../Theme';
import { GetUser } from '../lib/LocalStore';

interface HomeScreenProps extends NavigationScreenProps {
  //-- Define the interface for your props here. It's just a regular typescript interface
  //-- Use ? for optional properties


}
interface HomeScreenState {
  currentUser?: IFirebaseUser;
}
//-- More Lifecyle Info: https://facebook.github.io/react/docs/react-component.html
class HomeScreen extends React.Component<HomeScreenProps, HomeScreenState> {

  constructor(props: HomeScreenProps) {
    super(props);

    this.state = {

    };

    GetUser().then(u => {
      if (u) {
        this.setState({ currentUser: u });
      }
    })
  }

  render() {
    const goal = (new Date().getMilliseconds() % 2 === 1) || true;
    return (
      <Container>
        <Content>
          <View style={{ flex: 1, flexDirection: "column", justifyContent: "space-between" }}>
            <View style={{ flex: 1 }}>
              <View style={{ borderColor: Colors.Primary, borderWidth: BORDER_WIDTH, flex: 1, justifyContent: "center", maxHeight: 125, margin: Margin["4"] }}>
                <H2 style={{ textAlign: "center" }}>{"Welcome to the Kindness Project!"}</H2>
              </View>

              {!goal ? null : (
                <View style={{ borderColor: Colors.Primary, borderWidth: BORDER_WIDTH, justifyContent: "space-between", paddingTop: 8, paddingBottom: 8, margin: Margin["3"] }}>
                  <Text style={{ ...Margin.ml3, ...Margin.mt3 }}>{"Goal:"}</Text>
                  <Text style={{ padding: Margin["3"] }}>{SAMPLE_GOAL_TEXT}</Text>
                  <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                    <Button primary disabled><Text>{"I'll tackle this later!"}</Text></Button>
                    <Button primary disabled><Text>{"Choose Kind"}</Text></Button>
                  </View>
                </View>
              )}
            </View>
          </View>
        </Content>
        <Footer>
          <FooterTab>
            <Button onPress={() => this.props.navigation.push("KindnessPage")}>
              <Text style={{ textAlign: "center" }}>{"THE\nKINDNESS\nPAGE"}</Text></Button>
            <Button onPress={() => this.props.navigation.push("MyDiary")}>
              <Text style={{ textAlign: "center" }}>{"MY\nKINDNESS\nDIARY"}</Text></Button>
          </FooterTab>
        </Footer>
      </Container>

    );
  }
}

const BORDER_WIDTH = 3;
const SAMPLE_GOAL_TEXT = "This is a sample goal. It should be a brief description of what the goal is. It should be nice and easy.";

export default HomeScreen;