
import {
    DashboardStack,
    AccountsStack,
    UserAgreementStack,
    ProductCategoriesStack,
    OrdersHistoryStack,
    BrandsCatalogStack,
    PartnersCatalogStack,
    RecommendationsCatalogStack,
    CartStack,
    FavoritesStack
  
  } from './StackContainer'
import {DrawerNavigator} from 'react-navigation';
import SideMenu from './SideMenu';
export default DrawerNavigator({
    Dashboard: {
    screen: DashboardStack
  },
  Account: {
    screen: AccountsStack
  },
  UserAgreement: {
    screen: UserAgreementStack
  },
  ProductCategories: {
    screen: ProductCategoriesStack
  },
  OrdersHistory: {
    screen: OrdersHistoryStack
  },
  BrandsCatalog: {
    screen: BrandsCatalogStack
  },
  PartnersCatalog: {
    screen: PartnersCatalogStack
  },
  RecommendationsCatalog: {
    screen: RecommendationsCatalogStack
  },
  Cart: {
    screen:CartStack
  },
  Favorites: {
    screen: FavoritesStack
  }
}, {
    contentComponent: SideMenu,
  drawerWidth: 300
});