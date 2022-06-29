import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
  TextInput,
  RefreshControl,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';
import {
  getUserListAction,
  addBookmark,
  removeBookmark,
} from '../redux/action/userListAction';

export default function UserList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const {userList, bookmarks} = useSelector(state => state.usersReducer);
  const dispatch = useDispatch();

  const addToBookmarkList = user => dispatch(addBookmark(user));
  const removeFromBookmarkList = user => dispatch(removeBookmark(user));

  useEffect(() => {
    dispatch(getUserListAction(0));
  }, []);

  const handleAddBookmark = book => {
    addToBookmarkList(book);
  };

  const handleRemoveBookmark = book => {
    removeFromBookmarkList(book);
  };

  const ifExists = book => {
    if (bookmarks.filter(item => item.id === book.id).length > 0) {
      return true;
    }

    return false;
  };

  const fetchMore = () => {
    var last = userList.slice(-1)[0];
    dispatch(getUserListAction(last?.id));
  };

  const onChangeSearch = query => setSearchQuery(query);

  const _onRefresh = () => {
    setLoading(true);
    dispatch(getUserListAction(0));

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const renderItem = ({item}) => {
    return (
      <View style={{marginVertical: 12}}>
        <View style={styles.userListRenderCont}>
          <View>
            <TouchableOpacity>
              <Image
                style={styles.imageView}
                source={{uri: item?.avatar_url}}></Image>
            </TouchableOpacity>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginVertical: 10,
              }}>
              <Text id={item.id} style={styles.loginText}>
                {item?.login}
              </Text>
              <TouchableOpacity
                onPress={() =>
                  ifExists(item)
                    ? handleRemoveBookmark(item)
                    : handleAddBookmark(item)
                }>
                <Icon
                  color={ifExists(item) ? 'white' : '#64676D'}
                  size={24}
                  name={ifExists(item) ? 'bookmark' : 'bookmark-o'}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.userListView}>
      <View style={styles.userListCont}>
        <TextInput
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
          inputStyle={styles.textInputSearch}
          style={styles.textInputView}
          placeholderTextColor={'#000'}
        />

        <View style={{flex: 1, marginTop: 8}}>
          <FlatList
            refreshControl={
              <RefreshControl refreshing={loading} onRefresh={_onRefresh} />
            }
            data={userList?.filter(a =>
              searchQuery
                ? a.login.toLowerCase().indexOf(searchQuery.toLowerCase()) > -1
                : true,
            )}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            onEndReached={fetchMore}
            onEndReachedThreshold={0.3}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
