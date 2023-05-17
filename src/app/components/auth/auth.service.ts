import { Injectable } from '@angular/core';
import {Auth, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from '@angular/fire/auth';
import {from, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser$ = authState(this.auth);
  constructor(private auth:Auth) { }

  Signup(username:string,email:string,password:string){
    return from(createUserWithEmailAndPassword(this.auth,email,password))
    .pipe(
      switchMap(({user}) => updateProfile(user,{displayName: username}))
    )
  }

  Login(email:string,password:string) {
    return from(signInWithEmailAndPassword(this.auth,email,password).then(()=>{
      this.auth.currentUser.getIdToken(true).then((token)=>{localStorage.setItem('token',token);})
    }))
  }

  Logout() {
    localStorage.removeItem('token');
    return from(this.auth.signOut());
  }

}
