import {Dimensions, StyleSheet, Platform} from 'react-native';

const styles = StyleSheet.create({
  userListView: {
    flex: 1,
    backgroundColor: '#1E1B26',
  },

  userListRenderCont: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
  },

  textInputSearch: {
    fontSize: 15,
    color: '#000',
    backgroundColor: '#EDEDED',
    borderRadius: 10,
  },

  imageView: {
    width: 150,
    height: 150,
    borderRadius: 100,
  },

  textInputView: {
    backgroundColor: '#EDEDED',
    borderColor: '#EDEDED',
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    color: '#000',
  },
  userListCont: {
    flex: 1,
    paddingHorizontal: 16,
    marginTop: 20,
  },
  loginText: {fontSize: 16, marginRight: 10},
});

export default styles;
