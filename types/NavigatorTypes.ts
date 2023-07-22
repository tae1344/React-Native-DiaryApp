export type RootStackParamList = {
  Home: undefined;
  MainTab: undefined;
  Calendar: undefined;
  Post:
    | {
        selectedDay: any;
        mode: string;
      }
    | undefined;
};
