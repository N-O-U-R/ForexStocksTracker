import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView, StyleSheet, RefreshControl } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { globalStyles } from '../styles/globalStyles';
import { db, auth } from '../../firebase';
import { collection, query, getDocs } from "firebase/firestore";
import PortfolioStockItem from '../components/PortfolioStockItem';
import PortfolioCurrencyItem from '../components/PortfolioCurrencyItem';

const PortfolioScreen = ({ navigation }) => {
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchPortfolio = async () => {
    if (auth.currentUser) {
      setRefreshing(true); // Start refreshing
      const q = query(collection(db, "users", auth.currentUser.uid, "portfolio"));
      const querySnapshot = await getDocs(q);
      const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPortfolioItems(items);
      setRefreshing(false); // Stop refreshing
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchPortfolio();
    }, [])
  );

  return (
    <ScrollView
      contentContainerStyle={globalStyles.container}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={fetchPortfolio}
        />
      }
    >
      {portfolioItems.map(item => (
        item.type === 'stock' ? (
          <PortfolioStockItem
            id={item.id}
            name={item.name}
            symbol={item.symbol}
            shares={item.value}
            purchasePrice={item.price}
            navigation={navigation}
          />
        ) : item.type === 'currency' ? (
          <PortfolioCurrencyItem
            id={item.id}
            fromCurrency={item.fromCurrency}
            toCurrency={item.toCurrency}
            amount={item.amount}
            purchaseRate={item.rate}
            navigation={navigation}
          />
        ) : (
          // Logic for rendering other types of items, or null if nothing else is to be rendered
          null
        )
      ))}

    </ScrollView >
  );
};

const styles = StyleSheet.create({
  item: {
    width: '100%',
    backgroundColor: '#2f2f2f',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemName: {
    fontSize: 18,
    color: '#fff',
  },
  itemValue: {
    flex: 1,
    color: '#ccc',
    fontSize: 14,
    fontWeight: 'bold',
  },
  itemPrice: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'right',
    paddingRight: 15,
  },
  nameContainer: {
    height: 40,
    justifyContent: 'center',
    flexDirection: 'column',
  }
});

export default PortfolioScreen;
