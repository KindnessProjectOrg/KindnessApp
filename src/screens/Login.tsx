import * as React from "react";
import { Component } from 'react'
import { Margin, Colors } from "../Theme";
import { Button, Text, Icon, Form, Item, Input, Spinner, View, H2 } from 'native-base';
import { NavigationScreenProps, NavigationStackScreenOptions } from 'react-navigation'
interface LoginProps extends NavigationScreenProps {

}

interface LoginState {
  mode: Mode;
  phoneNumber?: string;
  code?: string;
}

type Mode = "Welcome" | "RequestingCode" | "EnterCode" | "ValidatingCode" | "Invalid Code";

const PHONE_LEN = 10;
const CODE_LEN = 6;
export class Login extends Component<LoginProps, LoginState> {

  public static navigationOptions: NavigationStackScreenOptions = {
    title: "Login"
  }

  constructor(props: LoginProps) {
    super(props);
    this.state = {
      mode: "Welcome",
      phoneNumber: "6313208176"
    };
  }

  render() {

    switch (this.state.mode) {
      case "Welcome":
      case "RequestingCode":
        return this.renderEnterPhone();
      case "EnterCode":
        return this.renderEnterCode();
      default:
      case "ValidatingCode":
        return (
          <View style={{ flex: 1, flexDirection: "column", justifyContent: "center" }}>
            <H2 style={{alignSelf:"center"}}>{"Validing code . . ."}</H2>
            <Spinner color={Colors.Primary} />
          </View>
        )
    }
  }

  private updatePhone(phoneNumber: string) {
    if (phoneNumber && phoneNumber.length > PHONE_LEN) return;
    this.setState({ phoneNumber });
  }

  private updateCode(code: string) {
    if (code && code.length > CODE_LEN) return;
    this.setState({ code });
  }

  private tryLogIn() {
    this.setState({ mode: "RequestingCode" }, () => {
      setTimeout(() => {
        this.setState({ mode: "EnterCode" })
      }, 2000);
    });
  }

  private tryValidateCode() {
    this.setState({ mode: "ValidatingCode" }, () => {
      setTimeout(() => {
        this.props.navigation.push("Home");
      }, 3000);
    });
  }
  private renderEnterPhone() {
    const isValidNum = !!this.state.phoneNumber && this.state.phoneNumber.length === PHONE_LEN;
    const mode = this.state.mode;
    return (
      <View>
        <Text style={{ margin: Margin["3"] }}>{"Kindness Project uses your phone number to quickly and securly log you in. \n\nEnter your number below"}</Text>
        <Form>
          <Item success={isValidNum}>
            <Input placeholder="Phone" keyboardType={"numeric"} onChangeText={c => this.updatePhone(c)} value={this.state.phoneNumber} style={{ margin: Margin["3"] }} />
            {isValidNum ? <Icon name="checkmark-circle" /> : null}
          </Item>


          {mode === "RequestingCode" ? <Spinner color={Colors.Primary} /> : (
            <Button full disabled={!isValidNum} style={{ margin: Margin["3"] }} onPress={() => this.tryLogIn()}>
              <Text>{"Go"}</Text>
            </Button>
          )}
        </Form>
      </View>
    );
  }

  private renderEnterCode() {

    const isValidNum = !!this.state.code && this.state.code.length === CODE_LEN;
    const mode = this.state.mode;

    return (
      <View>
        <Text style={{ margin: Margin["3"] }}>{"We just sent a text message. \n\nPelase enter the code below:"}</Text>
        <Form>
          <Item success={isValidNum}>
            <Input placeholder="Code" keyboardType={"decimal-pad"} onChangeText={phoneNumber => this.updateCode(phoneNumber)} value={this.state.code} style={{ margin: Margin["3"] }} />
            {isValidNum ? <Icon name="checkmark-circle" /> : null}
          </Item>


          {mode === "ValidatingCode" ? (
            <View>
              <Text>{"Validating code . . ."}</Text>
              <Spinner color={Colors.Primary} />
            </View>
          ) : (
              <Button full disabled={!isValidNum} style={{ margin: Margin["3"] }} onPress={() => this.tryValidateCode()}>
                <Text>{"Go"}</Text>
              </Button>
            )}
        </Form>
      </View>
    );
  }
}