import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {AgmCoreModule} from '@agm/core';
import {AgmDirectionModule} from 'agm-direction';
import {AngularDateTimePickerModule} from 'angular2-datetimepicker';
import {AccordionModule} from 'ng2-accordion';
import {ToastrModule} from 'ngx-toastr';
import {GooglePlaceModule} from 'ngx-google-places-autocomplete';
import { LoadingModule } from 'ngx-loading';

import {AppComponent} from './app.component';
import {routing} from './app.routing';
import {DropzoneModule} from 'ngx-dropzone-wrapper';
import {DROPZONE_CONFIG} from 'ngx-dropzone-wrapper';
import {DropzoneConfigInterface} from 'ngx-dropzone-wrapper';
import { ScrollToModule } from 'ng2-scroll-to-el';


const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  // Change this to your upload POST address:
  url: 'https://httpbin.org/post',
  maxFilesize: 50,
  acceptedFiles: 'image/*'
};

import {
  AlertComponent,
  NavBarFrontComponent,
  FooterComponent,
  NavBarComponent,
  NavBarTComponent
} from './_directives/index';
import {AuthGuard} from './_guards/index';
import {JwtInterceptor} from './_helpers/index';
import {
  AlertService,
  AuthenticationService,
  UserService,
  ShippingService,
  TruckerService,
  ConfigService,
  QuoteService
} from './_services/index';
import {HomeComponent, HomeTComponent} from './home/index';
import {LoginComponent} from './login/index';
import {RegisterComponent} from './register/index';
import {ProfileComponent} from './profile/profile.component';
import {LandingPageComponent} from './landing/landing.component';
import {ShippingComponent, AddShippingComponent, TrackComponent} from './shipping/index';
import {AboutPageComponent} from './about/about.component';
import {ForgetPasswordComponent} from './forgetPassword/forgot.component';
import {
  TruckerComponent, TruckerSettingComponent, TruckerAddComponent,
  TruckerInsuranceComponent, TruckerLicenceComponent, TruckerAvailableShipmentComponent,
  TruckerShipmentDetailsAcceptedComponent, TruckerShipmentDetailsComponent,
  TruckerYourShipmentsComponent
} from './trucker/index';
import {PrivacyComponent, TermComponent} from './static/index';
import {NotificationComponent} from './notification/notification.component';
import {ContactComponent} from './contactUs/contact.component';
import {GetAQuoteComponent} from './getAQuote/getAQuote.component';


@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    routing,
    GooglePlaceModule,
    ToastrModule.forRoot(),
    AccordionModule,
    AngularDateTimePickerModule,
    DropzoneModule,
    AgmDirectionModule,
    LoadingModule,
    ScrollToModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBACbcQmVK1bXTnIGZVCPewFGWLP9j1fWU',
      libraries: ['places']
    })
  ],
  declarations: [
    AppComponent,
    AlertComponent,
    HomeComponent,
    HomeTComponent,
    LoginComponent,
    RegisterComponent,
    NavBarComponent,
    NavBarFrontComponent,
    NavBarTComponent,
    FooterComponent,
    ProfileComponent,
    LandingPageComponent,
    ShippingComponent,
    AddShippingComponent,
    AboutPageComponent,
    TruckerComponent,
    TruckerSettingComponent,
    ForgetPasswordComponent,
    PrivacyComponent,
    TermComponent,
    TrackComponent,
    TruckerAddComponent,
    TruckerInsuranceComponent,
    TruckerLicenceComponent,
    NotificationComponent,
    TruckerAvailableShipmentComponent,
    TruckerShipmentDetailsAcceptedComponent,
    TruckerShipmentDetailsComponent,
    TruckerYourShipmentsComponent,
    ContactComponent,
    GetAQuoteComponent
  ],
  providers: [
    AuthGuard,
    AlertService,
    AuthenticationService,
    ShippingService,
    TruckerService,
    ConfigService,
    UserService,
    QuoteService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    {
      provide: DROPZONE_CONFIG,
      useValue: DEFAULT_DROPZONE_CONFIG
    },
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
