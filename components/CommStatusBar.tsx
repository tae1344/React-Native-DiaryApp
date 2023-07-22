import React, { useMemo } from "react";
import { Platform, StatusBar, StatusBarStyle, View } from "react-native";

type PropsType = {
  barStyle?: StatusBarStyle;
  backgroundColor?: string;
};

function CommStatusBar(props: PropsType) {
  const translucent = useMemo(() => Platform.OS === "ios", []);

  const backgroundColor = useMemo(() => {
    return props.backgroundColor ?? "#ffffff";
  }, []);

  const barStyle = useMemo(() => {
    return props.barStyle ?? "dark-content";
  }, []);

  return (
    <View>
      <StatusBar
        translucent={translucent}
        backgroundColor={backgroundColor}
        barStyle={barStyle}
        animated={false}
      />
    </View>
  );
}

export default CommStatusBar;
