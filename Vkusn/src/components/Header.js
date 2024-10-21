import { Image, Linking, TouchableHighlight, View, StyleSheet } from 'react-native';

const Header = () => {
  return (
    <View style={styles.headerContainer}>
        <Image
          source={require("../../assets/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      <Image
        source={{
          uri: 'https://findicons.com/files/icons/1700/2d/512/cart.png',
        }}
        style={styles.cartIcon}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 0,
    backgroundColor: '#000',
    height: 60,
  },
  logo: {
    width: 250,
    height: 250,
    marginTop: 10,
  },
  cartIcon: {
    width: 45,
    height: 45,
    marginTop: 10,
  },
});

export default Header;
