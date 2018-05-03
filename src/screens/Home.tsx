import * as React from "react";
import { Button, Text, Icon, Form, Item, Input, Spinner, View, H2 } from 'native-base';
import { NavigationScreenProps } from 'react-navigation';
import { Image } from 'react-native';
import { Colors, Margin } from '../Theme';

interface HomeScreenProps extends NavigationScreenProps {
  //-- Define the interface for your props here. It's just a regular typescript interface
  //-- Use ? for optional properties


}
interface HomeScreenState {
  //-- Define the interface for your state here. It's just a regular typescript interface
  //-- Use ? for optional properties

}
//-- More Lifecyle Info: https://facebook.github.io/react/docs/react-component.html
class HomeScreen extends React.Component<HomeScreenProps, HomeScreenState> {


  static defaultProps: Partial<HomeScreenProps> = {
    //-- If you don't need default props, this static property can be deleted
  }

  /**
  *	Invoked immediately after a component is mounted. Initialization that requires DOM nodes should go here. If you need to load data from a remote endpoint, this is a good place to instantiate the network request. Setting state in this method will trigger a re-rendering.
  */
  componentDidMount() { }
  /**
  *	Invoked immediately before mounting occurs. It is called before render(), therefore setting state in this method will not trigger a re-rendering. Avoid introducing any side-effects or subscriptions in this method.
  */
  componentWillMount() { }


  /**
  *	Invoked before a mounted component receives new props. If you need to update the state in response to prop changes (for example, to reset it), you may compare this.props and nextProps and perform state transitions using this.setState() in this method. Note that React may call this method even if the props have not changed, so make sure to compare the current and next values if you only want to handle changes. This may occur when the parent component causes your component to re-render.
  */
  componentWillReceiveProps(nextProps: HomeScreenProps) { }


  /**
  *	Use shouldComponentUpdate() to let React know if a component's output is not affected by the current change in state or props. The default behavior is to re-render on every state change, and in the vast majority of cases you should rely on the default behavior. shouldComponentUpdate() is invoked before rendering when new props or state are being received. Defaults to true This method is not called for the initial render or when forceUpdate() is used.
  */
  shouldComponentUpdate(nextProps: HomeScreenProps, nextState: HomeScreenState): boolean {
    return true;
  }



  render() {
    const goal = (new Date().getMilliseconds() % 2 === 1) || true;
    return (
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
                <Button primary><Text>{"I'll tackle this later!"}</Text></Button>
                <Button primary><Text>{"Choose Kind"}</Text></Button>
              </View>
            </View>
          )}
        </View>
        <View style={{ height: 100, flexDirection: "row", justifyContent: "space-around", margin: Margin["2"] }}>
          <Button style={{ padding: 13, height: 80 }} primary onPress={() => this.props.navigation.push("KindnessPage")}>
            <Text style={{ textAlign: "center" }}>{"THE\nKINDNESS\nPAGE"}</Text></Button>
          <Button style={{ padding: 13, height: 80 }} primary>
            <Text style={{ textAlign: "center" }}>{"MY\nKINDNESS\nDIARY"}</Text></Button>
        </View>
        <Image source={{ uri: "https://s3.amazonaws.com/nikeinc/assets/48622/2015-Nike-Mag-02_original.jpg?1445446034" }} style={{ flex: 1, height: 75, width: 100 }} />
        <Button style={{ padding: 13, height: 60, ...Margin.mb3, alignSelf: "center" }} onPress={() => this.props.navigation.push("AddEditEntry", { diaryId: "JImmy Jones" })} primary>
          <Icon name={"compass"} type={"FontAwesome"} />

        </Button>
      </View>
    );
  }
}

const BORDER_WIDTH = 3;
const SAMPLE_GOAL_TEXT = "This is a sample goal. It should be a brief description of what the goal is. It should be nice and easy.";

export default HomeScreen;