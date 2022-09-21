import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { PanelComponent } from './shared/panel/panel.component';
import { JwtHelperService, JWT_OPTIONS  } from '@auth0/angular-jwt';
import { SearchbarComponent } from './shared/searchbar/searchbar.component';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { BoldLettersPipe } from './pipes/bold-letters.pipe';
import { MyProfileComponent } from './shared/my-profile/my-profile.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { GoogleMapsModule } from '@angular/google-maps';
import { GoogleMapSeachbar } from './shared/googleMap-searchbar/googleMap-searchbar';
import { ToastrModule } from 'ngx-toastr';
import { LoaderComponent } from './shared/loader/loader.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    PanelComponent,
    SearchbarComponent,
    BoldLettersPipe,
    MyProfileComponent,
    GoogleMapSeachbar,
    LoaderComponent,
  ],
  imports: [
    FontAwesomeModule,
    MatSnackBarModule,
    GoogleMapsModule,
    ToastrModule.forRoot({
      preventDuplicates: false,
      progressBar: true,
      countDuplicates: true,
      extendedTimeOut: 3000,
      positionClass: 'toast-bottom-right',
    }),
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [{ provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
