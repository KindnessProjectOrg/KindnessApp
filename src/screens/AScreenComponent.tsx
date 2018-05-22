import React from "react";
import { NavigationScreenProps } from 'react-navigation';
import { GetUser } from '../lib/LocalStore';

interface AScreenState {
  currentUser?: IFirebaseUser;
}

abstract class AScreenComponent<TProps extends NavigationScreenProps, TState extends AScreenState> extends React.Component<TProps, TState> {

  constructor(props: TProps, ctx) {
    super(props, ctx);

    this.state = this.initState();

    GetUser().then(u => {
      if (u) {
        this.setState({ currentUser: u }, () => {
          this.onGetUser(u);
        });
        return;
      }
      else {
        this.ReplaceStack("Login");
      }
    })

  }

  protected abstract initState(): TState;
  protected abstract onGetUser(u: IFirebaseUser): void | Promise<void>;

  protected ReplaceStack(route: string) {
    this.props.navigation.replace(route);
  }

  protected
}

export default AScreenComponent;