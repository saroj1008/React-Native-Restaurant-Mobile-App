import React, { useContext } from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';


// ViewFoodDetails component for viewing food details(single food item)
const ViewFoodDetails = (props) => {

  // Extracting the necessary properties from route params
  const { _id, name, origin, price, date, image } = props.route.params;

  // Extracting the date without the time and timezone
  const extractedDate = date.split('T')[0];


  return (
    <View style={styles.container}>
      <Text style={styles.text}>Food Id: {_id}</Text>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.detailsContainer}>
        <View style={styles.detailsContainer1}>
          <View style={styles.priceContainer}>
            <Text style={styles.priceText}>${price}</Text>
          </View>
          <Text style={styles.name}>{name}</Text>
        </View>
        <Text style={styles.origin}>Origin: {origin}</Text>
        <Text style={styles.text}>Date: {extractedDate}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#8ECEFB',
    borderRadius: 8,
    elevation: 4,
    margin: 16,
    padding: 16,
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
    borderColor: "#FFCD00",
    borderWidth: 4,
    borderRadius: 10
  },
  detailsContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: 'bold'
  },
  detailsContainer: {
    flex: 1,
    flexDirection: 'column',
    marginRight: 10,
  },
  detailsContainer1: {
    flex: 1,
    flexDirection: 'column',
    marginRight: 10,
    flexDirection: 'row',
    gap: 10,
    marginTop: 5
  },
  name: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  priceContainer: {
    backgroundColor: '#FFD700',
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignSelf: 'flex-start',
    marginBottom: 5,
  },
  priceText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
  },
  origin: {
    fontSize: 14,
    color: '#888',
    marginBottom: 10,
  }
});

export default ViewFoodDetails;
