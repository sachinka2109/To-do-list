import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { TodoFormComponent } from './components/todo-list/todo-form/todo-form.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { HeaderComponent } from './components/header/header.component';
import { TodoDetailsComponent } from './components/todo-list/todo-details/todo-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TodoEditComponent } from './components/todo-list/todo-details/todo-edit/todo-edit.component';
import { AuthComponent } from './components/auth/auth.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { HotToastModule } from '@ngneat/hot-toast';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { HttpClientModule } from '@angular/common/http';
import { AlertComponent } from './components/alert/alert.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    TodoFormComponent,
    TodoListComponent,
    HeaderComponent,
    TodoDetailsComponent,
    TodoEditComponent,
    AuthComponent,
    AlertComponent
  ],
  imports: [
    AppRoutingModule,
    HttpClientModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    HotToastModule.forRoot(),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
