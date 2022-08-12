import App from '@iso/redux/app/reducer';
import Auth from '@iso/redux/auth/reducer';
import Campaign from '@iso/redux/campaign/reducers';
import Company from '@iso/redux/company/reducers';
import DirectOffer from '@iso/redux/directOffer/reducers';
import Host from '@iso/redux/host/reducers';
import HostPayment from '@iso/redux/hostPayment/reducers';
import Invoices from '@iso/redux/invoice/reducer';
import LanguageSwitcher from '@iso/redux/languageSwitcher/reducer';
import Payment from '@iso/redux/payment/reducers';
import PaymentJob from '@iso/redux/paymentJob/reducers';
import Product from '@iso/redux/product/reducers';
import ThemeSwitcher from '@iso/redux/themeSwitcher/reducer';
import { combineReducers } from 'redux';
import drawer from '@iso/redux/drawer/reducer';
import modal from '@iso/redux/modal/reducer';
import profile from '@iso/redux/profile/reducer';
import notification from '@iso/components/Notification/reducer';

export default combineReducers({
  Auth,
  App,
  ThemeSwitcher,
  LanguageSwitcher,
  Invoices,
  modal,
  drawer,
  profile,
  Company,
  Host,
  Campaign,
  DirectOffer,
  Product,
  Payment,
  PaymentJob,
  HostPayment,
  notification,
});
