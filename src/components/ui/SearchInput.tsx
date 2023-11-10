import React, {useState} from 'react';

import {View, TextInput, StyleSheet} from 'react-native';
import {Colors, UI} from '../../styles/custom';
import {Search} from 'lucide-react-native';

interface DataItem {
  id: number;
  name: string;
}

interface SearchComponentProps {
  data: DataItem[];
  setData: React.Dispatch<React.SetStateAction<DataItem[]>>;
}

const SearchInput: React.FC<SearchComponentProps> = ({data, setData}) => {
  const [query, setQuery] = useState('');

  const handleSearch = (text: string) => {
    const filtered = data.filter(item =>
      item.name.toLowerCase().includes(text.toLowerCase()),
    );
    setQuery(text);
    setData(filtered);
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
        // paddingHorizontal: 16,
      }}>
      <TextInput
        placeholderTextColor={Colors.DarkBlue}
        style={styles.container}
        placeholder="Search"
        value={query}
        onChangeText={handleSearch}
      />
      <Search
        size={16}
        color={Colors.DarkBlue}
        style={{position: 'absolute', right: 25}}
      />
    </View>
  );
};

export default SearchInput;

const styles = StyleSheet.create({
  container: {
    ...UI.flexRow,
    ...UI.alignCenter,
    borderRadius: 9,
    paddingHorizontal: 12,
    paddingRight: 40,
    borderWidth: 1,
    borderColor: Colors.Brown,
    paddingVertical: 4,
    width: '100%',
  },
});
