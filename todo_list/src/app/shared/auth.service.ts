import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireauth: AngularFireAuth, private router: Router) { }

  //login method
  login(email: string, password: string) {
    this.fireauth.signInWithEmailAndPassword(email, password).then((res) => {
      console.log('user', res)
      localStorage.setItem('token', 'true');
      this.router.navigate(['listdata']);
    }, err => {
      alert('Something Went Wrong!');
      this.router.navigate(['/login']);
    })
  }

  //register method
  register(email: string, password: string) {
    this.fireauth.createUserWithEmailAndPassword(email, password).then(() => {
      alert('Registration Successful');
      this.router.navigate(['/login'])
    }, err => {
      alert('Something Went Wrong!');
      this.router.navigate(['/register']);
    })
  }

  //Google SignIn
  googleSignIn(){
    return this.fireauth.signInWithPopup(new GoogleAuthProvider).then(res=>{
      this.router.navigate(['/listdata']);
      localStorage.setItem('token',JSON.stringify(res.user?.uid));
    }, err => {
      alert(err.message);
    })
  }
}
