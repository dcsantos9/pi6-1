import styled from 'styled-components/native';
import { FlatList } from 'react-native';

interface Pet {
  id: string;
  name: string;
  image_url: string;
  price: number;
}

export const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
`;

export const PetContainer = styled.View`
  border-radius: 5px;
  margin-top: 60px;
  flex: 1;
  flex-direction: row;
`;

export const PetList = styled(
  FlatList as new () => FlatList<Pet>,
).attrs({
  numColumns: 1,
})`
  flex: 1;
  padding: 0 10px;
`;

export const Pet = styled.View`
  background: #fff;
  padding: 16px 16px;
  border-radius: 5px;
  margin: 8px;
  flex: 1;
`;

export const PetImage = styled.Image`
  height: 122px;
  width: 122px;
  align-self: center;
`;

export const PetTitle = styled.Text`
  font-size: 14px;
  margin-top: 10px;
`;

export const PetButton = styled.TouchableOpacity``;
