import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/index';
import { HomeTComponent } from './home/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { ProfileComponent } from './profile/profile.component';
import { ShippingComponent, AddShippingComponent , TrackComponent } from './shipping/index';
import { AuthGuard } from './_guards/index';
import {LandingPageComponent} from './landing/landing.component';
import {AboutPageComponent} from './about/about.component';
import {ForgetPasswordComponent} from './forgetPassword/forgot.component';
import {
  TruckerComponent, TruckerSettingComponent, TruckerAddComponent, TruckerLicenceComponent,
  TruckerInsuranceComponent, TruckerAvailableShipmentComponent, TruckerShipmentDetailsComponent, TruckerShipmentDetailsAcceptedComponent,
  TruckerYourShipmentsComponent
} from './trucker/index';
import {PrivacyComponent , TermComponent} from './static/index';
import {NotificationComponent} from './notification/notification.component';
import {ContactComponent} from './contactUs/contact.component';
import {GetAQuoteComponent} from './getAQuote/getAQuote.component';

const appRoutes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'about', component: AboutPageComponent },
    { path: 'forget', component: ForgetPasswordComponent },
    { path: '', component: LandingPageComponent },
    { path: 'terms-service', component: TermComponent },
    { path: 'privacy-policy', component: PrivacyComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'shipping', component: ShippingComponent },
    { path: 'trucker', component: HomeTComponent },
    { path: 'trucks', component: TruckerComponent },
    { path: 'setting', component: TruckerSettingComponent },
    { path: 'add-shipping', component: AddShippingComponent },
    { path: 'track', component: TrackComponent },
    { path: 'truck-add', component: TruckerAddComponent },
    { path: 'licence', component: TruckerLicenceComponent },
    { path: 'insurance', component: TruckerInsuranceComponent },
    { path: 'notification', component: NotificationComponent },
    { path: 'find', component: TruckerAvailableShipmentComponent },
    { path: 'shipmentdetail', component: TruckerShipmentDetailsComponent },
    { path: 'shipmentdetailaccepted', component: TruckerShipmentDetailsAcceptedComponent },
    { path: 'history', component: TruckerYourShipmentsComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'getquote', component: GetAQuoteComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
