import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Alert, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import Places from "./places/placesDemo.json";

const categoryImages = {
  cafe: require("../../assets/images/cafe.png"),
  restaurant: require("../../assets/images/restaurant.png"),
  bakery: require("../../assets/images/bakery.png"),
};

const categories = [
  { id: '1', name: 'Cafe', icon: 'cafe-outline' },
  { id: '2', name: 'Food', icon: 'restaurant-outline' },
  { id: '3', name: 'Bakery', icon: 'pizza-outline' },
  { id: '4', name: 'Historic', icon: 'business-outline' },
];


export default function Index() {
  const [search, setSearch] = useState('');
  const [places, setData] = useState([]);

  useEffect(() => {
    setData(Places);
  }, []);

  // Filter logic
  const filteredPlaces = places.filter((place) =>
    place.place_name?.toLowerCase().includes(search.toLowerCase()) ||
    place.category?.toLowerCase().includes(search.toLowerCase())
  );

  // Recommended section (we show this only when NOT searching)
  const recommended = places.slice(0, 4);

  return (
    <ScrollView style={styles.mainContainer} showsVerticalScrollIndicator={false}>

      {/* 1. Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>Explore</Text>
          <Text style={styles.appTitle}>Saudi Arabia</Text>
        </View>
        <Pressable style={styles.notificationBtn}>
          <Ionicons name="notifications-outline" size={24} color="#1e4728" />
        </Pressable>
      </View>

      {/* 2. Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#8e8e8e" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search by name or category..."
          placeholderTextColor={'#8e8e8e'}
          value={search}
          onChangeText={(text) => setSearch(text)}
        />
        {search.length > 0 && (
          <Pressable onPress={() => setSearch('')}>
            <Ionicons name="close-circle" size={20} color="#8e8e8e" />
          </Pressable>
        )}
      </View>

      {/* Only show Recommendations and Categories if the user ISN'T searching */}
      {!search && (
        <>
          {/* 3. Categories */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesSection}>
            {categories.map((cat) => (
              <Pressable key={cat.id} style={styles.categoryItem} onPress={() => setSearch(cat.name)}>
                <View style={styles.categoryIconCircle}>
                  <Ionicons name={cat.icon} size={24} color="#3e6b4d" />
                </View>
                <Text style={styles.categoryLabel}>{cat.name}</Text>
              </Pressable>
            ))}
          </ScrollView>

          {/* 4. Recommended (Horizontal) */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recommended for you</Text>
            <Pressable onPress={() => Alert.alert("See All", "Showing all recommendations")}>
              <Text style={styles.seeAll}>See all</Text>
            </Pressable>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScroll}>
            {recommended.map((place, index) => (
              <Pressable key={index} style={styles.recomCard}>
                <Image
                  source={categoryImages[place.category] || categoryImages.cafe}
                  style={styles.recomImage}
                />
                <View style={styles.recomInfo}>
                  <Text style={styles.recomTitle} numberOfLines={1}>{place.place_name}</Text>
                  <View style={styles.ratingRow}>
                    <Ionicons name="star" size={14} color="#FFD700" />
                    <Text style={styles.recomRating}>{place.rating}</Text>
                  </View>
                </View>
              </Pressable>
            ))}
          </ScrollView>
        </>
      )}

      {/* 5. Explore All / Search Results (Vertical) */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>
          {search ? `Results for "${search}"` : "Explore All"}
        </Text>
      </View>

      {filteredPlaces.length > 0 ? (
        filteredPlaces.map((place, index) => (
          <Pressable key={index} style={styles.verticalCard} onPress={() => console.log(place.place_name)}>
            <Image
              source={categoryImages[place.category] || categoryImages.cafe}
              style={styles.verticalImage}
            />
            <View style={styles.verticalTextContainer}>
              <Text style={styles.verticalTitle}>{place.place_name}</Text>
              <Text style={styles.verticalSub}>{place.category.toUpperCase()}</Text>
              <View style={styles.ratingRow}>
                <Ionicons name="star" size={14} color="#FFD700" />
                <Text style={styles.verticalRating}>{place.rating}</Text>
              </View>
            </View>
            <Ionicons name="heart-outline" size={24} color="#ccc" style={styles.heartIcon} />
          </Pressable>
        ))
      ) : (
        <View style={styles.noResultContainer}>
          <Ionicons name="search-outline" size={50} color="#ccc" />
          <Text style={styles.noResultText}>No places found</Text>
        </View>
      )}

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 60,
  },
  welcomeText: {
    fontSize: 16,
    color: "#6e6e6e",
  },
  appTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1e4728",
  },
  notificationBtn: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 15,
    elevation: 2,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    margin: 20,
    paddingHorizontal: 15,
    borderRadius: 20,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
  },
  categoriesSection: {
    paddingLeft: 20,
    marginBottom: 20,
  },
  categoryItem: {
    alignItems: "center",
    marginRight: 25,
  },
  categoryIconCircle: {
    width: 55,
    height: 55,
    borderRadius: 20,
    backgroundColor: "#e8f5ec",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
  },
  categoryLabel: {
    fontSize: 12,
    color: "#3e6b4d",
    fontWeight: "600",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  seeAll: {
    color: "#3e6b4d",
    fontWeight: "600",
  },
  horizontalScroll: {
    paddingLeft: 20,
    paddingBottom: 20,
  },
  recomCard: {
    width: 200,
    height: 250,
    backgroundColor: "#fff",
    borderRadius: 25,
    marginRight: 15,
    overflow: "hidden",
    elevation: 4,
  },
  recomImage: {
    width: "100%",
    height: "70%",
    resizeMode: "cover",
  },
  recomInfo: {
    padding: 12,
  },
  recomTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  recomRating: {
    fontSize: 14,
    marginLeft: 5,
    color: "#666",
  },
  verticalCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginBottom: 15,
    borderRadius: 20,
    padding: 10,
    alignItems: "center",
    elevation: 2,
  },
  verticalImage: {
    width: 80,
    height: 80,
    borderRadius: 15,
  },
  verticalTextContainer: {
    flex: 1,
    paddingHorizontal: 15,
  },
  verticalTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  verticalSub: {
    fontSize: 12,
    color: "#8e8e8e",
    marginTop: 2,
  },
  verticalRating: {
    fontSize: 14,
    marginLeft: 5,
    color: "#666",
  },
  heartIcon: {
    paddingRight: 5,
  },
  noResultContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  noResultText: {
    color: '#8e8e8e',
    fontSize: 16,
    marginTop: 10,
  }
});