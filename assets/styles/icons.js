import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import EvilIcons from "react-native-vector-icons/EvilIcons";

const LogoutIcon = ({ color = "black", size = 25 }) => (
  <MaterialIcons name="logout" color={color} size={size} />
);

const PersonIcon = ({ color = "black", size = 25 }) => (
  <MaterialIcons name="person" color={color} size={size} />
);

const HomeIcon = ({ color = "black", size = 25 }) => (
  <Entypo name="home" color={color} size={size} />
);

const CloseIcon = ({ color = "black", size = 25 }) => (
  <AntDesign name="close" color={color} size={size} />
);

const LeftArrowIcon = ({ color = "black", size = 25 }) => (
  <AntDesign name="left" size={size} color={color} />
);

const RightArrowIcon = ({ color = "black", size = 25 }) => (
  <AntDesign name="right" size={size} color={color} />
);

const FavIcon = ({ color = "black", size = 25 }) => (
  <MaterialIcons name="favorite" color={color} size={size} />
);

const FavOutlineIcon = ({ color = "black", size = 25 }) => (
  <MaterialIcons name="favorite-outline" color={color} size={size} />
);

const SearchIcon = ({ color = "black", size = 25 }) => (
  <EvilIcons name="search" color={color} size={size} />
);

export default {
  PersonIcon,
  LogoutIcon,
  CloseIcon,
  LeftArrowIcon,
  HomeIcon,
  RightArrowIcon,
  FavIcon,
  FavOutlineIcon,
  SearchIcon,
};
