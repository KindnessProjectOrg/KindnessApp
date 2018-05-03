import { TextStyle, ViewStyle } from 'react-native';


export const Colors = {
  Primary: "#2626BB",
  PrimaryLight: "#6464DB",
  Secondary: "#5D1AB6",
  SeocndaryLight: "#905AD8",
  Third: "#156BAE",
  ThirdLight: "#559DD4",

  Gray: "#B3C6D2"
}

export type StyleVariant = "primary" | "secondary" | "disabled";

const space_1 = 4;
const space_2 = 8;
const space_3 = 12;
const space_4 = 16;
const space_5 = 20;

export const Margin = {
  1: space_1,
  2: space_2,
  3: space_3,
  4: space_4,
  5: space_5,
  mt1: {
    marginTop: space_1
  },
  mt2: {
    marginTop: space_2
  },
  mt3: {
    marginTop: space_3
  },
  mt4: {
    marginTop: space_4
  },
  mt5: {
    marginTop: space_5
  },

  mb1: {
    marginBottom: space_1
  },
  mb2: {
    marginBottom: space_2
  },
  mb3: {
    marginBottom: space_3
  },
  mb4: {
    marginBottom: space_4
  },
  mb5: {
    marginBottom: space_5
  },

  mr1: {
    marginRight: space_1
  },
  mr2: {
    marginRight: space_2
  },
  mr3: {
    marginRight: space_3
  },
  mr4: {
    marginRight: space_4
  },
  mr5: {
    marginRight: space_5
  },

  ml1: {
    marginLeft: space_1
  },
  ml2: {
    marginLeft: space_2
  },
  ml3: {
    marginLeft: space_3
  },
  ml4: {
    marginLeft: space_4
  },
  ml5: {
    marginLeft: space_5
  },

  mx1: {
    marginLeft: space_1,
    marginRight: space_1
  },
  mx2: {
    marginLeft: space_2,
    marginRight: space_2

  },
  mx3: {
    marginLeft: space_3,
    marginRight: space_3

  },
  mx4: {
    marginLeft: space_4,
    marginRight: space_4

  },
  mx5: {
    marginLeft: space_5,
    marginRight: space_5
  },


  my1: {
    marginBottom: space_1,
    marginTop: space_1
  },
  my2: {
    marginBottom: space_2,
    marginTop: space_2
  },
  my3: {
    marginBottom: space_3,
    marginTop: space_3
  },
  my4: {
    marginBottom: space_4,
    marginTop: space_4
  },
  my5: {
    marginBottom: space_5,
    marginTop: space_5
  },
}



type Record<K extends string, T> = {
  [P in K]: T;
}

export const TextStyles: Record<StyleVariant, TextStyle> = {
  disabled: {

  },
  primary: {
    color: Colors.PrimaryLight,
    backgroundColor: Colors.Primary
  },
  secondary: {

  }
}

export const ViewStyles: Record<StyleVariant, ViewStyle> = {
  disabled: {

  },
  primary: {
    backgroundColor: Colors.Primary,
  },
  secondary: {

  },
}