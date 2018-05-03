import React from "react";
// import { AsyncStorage, Modal, Alert } from "react-native";
import { Button, Text, Icon, Form, Item, Input, Spinner, View, H2, H3, CheckBox, Content, List, ListItem, Body, Container, Textarea, Header, Title } from 'native-base';
import { NavigationStackScreenOptions, NavigationScreenProps } from 'react-navigation';
import { Colors, Margin } from '../Theme';

interface KindnessPageProps extends NavigationScreenProps {

}
interface KindnessPageState {
}
//-- More Lifecyle Info: https://facebook.github.io/react/docs/react-component.html
class KindnessPage extends React.Component<KindnessPageProps, KindnessPageState> {
  public static navigationOptions: NavigationStackScreenOptions = {
    title: "Kindness Page"
  }
  render() {
    const items = [1, 2, 3, 4, 5, 6];
    return (
      <Container>
        <Content style={{ flex: 1, flexDirection: "column" }}>
          <H2 style={{ alignSelf: "center", marginTop: Margin["5"] }}>{"Welcom to the kindess page"}</H2>
          <List>
            {items.map(i => (
              <ListItem key={i}>
                <Text>Diary Entry</Text>
              </ListItem>
            ))}
          </List>
        </Content>
      </Container>
    );
  }
}


export default KindnessPage;