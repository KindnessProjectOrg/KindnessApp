import * as React from 'react'
import { Component } from 'react'
import {
  AsyncStorage,
  View
} from 'react-native';
import { NavigationScreenProps, NavigationStackScreenOptions } from 'react-navigation'
import { Button, Spinner, Text } from "native-base";
import { Colors, Margin } from './Theme';

interface IMainScreenState {
  isLoading: boolean;
  appState?: IStore;
}

export class MainScreen extends Component<NavigationScreenProps, IMainScreenState> {
  public static navigationOptions: NavigationStackScreenOptions = {
    header: null
  }

  constructor(props: NavigationScreenProps) {
    super(props);
    this.state = {
      isLoading: true,
    };
    this.loadFromStorage();
  }


  private async loadFromStorage() {
    try {
      const priorState = await AsyncStorage.getItem("Item");

      if (priorState) {
        const appState = JSON.parse(priorState);
        this.setState({ appState, isLoading: false });
      }
      else {
        this.setState({ isLoading: false, appState: { diaries: [] }});
      }
    } catch {
      this.setState({ isLoading: false });
    }
  }

  public render() {

    return (
      <View
        style={{
          backgroundColor: '#fff',
          flex: 1,
          flexDirection: "column",
          justifyContent: "space-between"
        }}
      >
        {this.state.isLoading ? <Spinner /> : <React.Fragment>
          <Text style={{ textAlign: "center", fontSize: 18, marginTop: "auto", marginBottom: "auto" }}>{"The Kindness Project"}</Text>

          <View>
            <Button block onPress={() => this.props.navigation.push("Login")} style={{ margin: Margin["3"], backgroundColor: Colors.Primary }}  >
              <Text style={{ textAlign: "center" }}>{"Get Started"}</Text>
            </Button>
          </View>

        </React.Fragment>}

      </View>
    )
  }
}