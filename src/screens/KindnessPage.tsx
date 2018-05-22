import React from "react";
import { Spinner, Content, Container } from 'native-base';
import { NavigationStackScreenOptions, NavigationScreenProps } from 'react-navigation';
import { Margin } from '../Theme';
import DiaryCard from '../components/DiaryCard';
import { GetUser } from '../lib/LocalStore';

interface KindnessPageProps extends NavigationScreenProps {

}
interface KindnessPageState {
  currentUser?: IFirebaseUser;
}

class KindnessPage extends React.Component<KindnessPageProps, KindnessPageState> {
  public static navigationOptions: NavigationStackScreenOptions = {
    title: "Kindness Page (Sample Data)"
  }

  constructor(props: KindnessPageProps) {
    super(props);
    this.state = {
      
    };

    GetUser().then(u => {
      if(u) {
        this.setState({currentUser: u});
      }
    })
  }

  private addToMyJournal(d: IDiary) {
    this.props.navigation.push("AddEditEntry", { "diaryId": d.id });
  }

  render() {
    const u = this.state.currentUser;

    if(!u) {
      return (
        <Container>
          <Content>
            <Spinner />
          </Content>
        </Container>
      )
    }
    const entries: IDiary[] = [
      { body: "This is a sample body text", title: "Diary Entry 1", id: "01", isGoalOfTheDay: true, date: "2018-05-01", authorId: "-1" },
      { body: "Yet another bit of sample text", title: "My First Real Entry", id: "02", isGoalOfTheDay: false, date: "2018-05-05", authorId: u.uid },
      { body: "Here's more of the text", title: "Diary Entry 3", id: "03", isGoalOfTheDay: true, date: "2018-05-15", authorId: "-1" }
    ];

    return (
      <Container>
          <Content style={{ flex: 1, flexDirection: "column", paddingHorizontal: Margin["2"] }}>
            {entries.map(i => <DiaryCard key={i.id} diary={i} onAdd={() => this.addToMyJournal(i)} myUid={u.uid} />)}
          </Content>
      </Container>
    );
  }
}


export default KindnessPage;