import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { environment } from '../environments/environment';
import { HotToastModule } from '@ngneat/hot-toast';
import { MatCardModule } from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import { HeaderComponent } from './components/header/header.component';
import {AngularFireModule} from '@angular/fire/compat';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FlowersComponent } from './components/flowers/flowers.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductDescriptionComponent } from './components/product-description/product-description.component';
import { MatOption, MatOptionModule } from '@angular/material/core';
import { CartComponent } from './components/cart/cart.component';
import { CartItemComponent } from './components/cart-item/cart-item.component';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { CartService } from 'src/app/services/cart.service';
import { ImageHoverDirective } from './directive/image-hover.directive';
import { FooterComponent } from './components/footer/footer.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthenticationService } from './services/authentication.service';





@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    HomeComponent,
    HeaderComponent,
    FlowersComponent,
    ProductDescriptionComponent,
    CartComponent,
    CartItemComponent,
    ImageHoverDirective,
    FooterComponent,
    NotFoundComponent,
  ],
  imports: [
    
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    ReactiveFormsModule,
    MatCardModule,
    MatGridListModule,
    FormsModule,CommonModule,HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    
    //provideAuth(() => getAuth()),
    HotToastModule.forRoot(),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore())
  ],
  providers: [ CartService,AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }