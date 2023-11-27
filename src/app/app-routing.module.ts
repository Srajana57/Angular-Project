import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { SignUpComponent } from './components/signup/signup.component';
import { CommonModule } from '@angular/common';
import { FlowersComponent } from './components/flowers/flowers.component';
import { ProductDescriptionComponent } from './components/product-description/product-description.component';
import { CartComponent } from './components/cart/cart.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { authGuard } from './auth/auth.guard';

const routes: Routes = [

  {
    path:'',
    pathMatch:'full',
    redirectTo:'login'
  },
  {
    path:'login',
   component:LoginComponent
 },

  {
     path:'signup',
    component:SignUpComponent
  },

  {
    path:'home',
    component:HomeComponent,
    canActivate:[authGuard]
  },
  {
     path: 'flowers', 
     component: FlowersComponent,
     canActivate:[authGuard] },
 
  {
    path:'cart',
    component:CartComponent,
    canActivate:[authGuard]
  },

  { path: 'description/:productId', 
    component: ProductDescriptionComponent,
    canActivate:[authGuard] },

  { path: '', 
    redirectTo: '/flowers',
    pathMatch: 'full' },

  { path: 'not-found',
    component: NotFoundComponent },
    
  { path: '**',
    redirectTo: '/not-found',
    pathMatch: 'full' },
  
   
];
  

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
