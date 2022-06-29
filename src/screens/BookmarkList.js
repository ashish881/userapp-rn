import React, {useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import {removeBookmark} from '../redux/action/userListAction';
import styles from './styles';

export default function BookmarksList() {
  const {bookmarks} = useSelector(state => state.usersReducer);
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');

  const removeFromBookmarkList = book => dispatch(removeBookmark(book));

  const handleRemoveBookmark = book => {
    removeFromBookmarkList(book);
  };

  const onChangeSearch = query => setSearchQuery(query);

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
              <TouchableOpacity onPress={() => handleRemoveBookmark(item)}>
                <Icon color={'white'} size={24} name={'bookmark'} />
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
            data={bookmarks?.filter(a =>
              searchQuery
                ? a.login.toLowerCase().indexOf(searchQuery.toLowerCase()) > -1
                : true,
            )}
            keyExtractor={item => item.id}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
