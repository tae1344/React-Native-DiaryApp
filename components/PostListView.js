import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';


export default function PostListView({ navigation, posts }) {


  return (

    <View style={styles.container}>
      {!posts ? <Text style={styles.none}>작성된 포스트가 없어요!</Text>
        : <FlatList
          data={Object.values(posts)}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('PostRead', { selectedDay: item.date, mode: 'read' })}>
              <Text style={styles.text}>{item.date}</Text>
              <Text style={styles.text} numberOfLines={1}>{item.content}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.date}
        />}
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f6f9',

  },
  item: {
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
  text: {
    fontSize: 20,
    fontFamily: 'CuteFontRegular'
  },
  none: {
    textAlign: 'center',
    fontFamily: 'CuteFontRegular',
    fontSize: 40,
    color: 'rgba(0, 0, 0, 0.3)',
    marginTop: 0,
    marginRight: 'auto',
    marginBottom: 0,
    marginLeft: 'auto',
  }
});
