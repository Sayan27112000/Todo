import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: string = '';
  password: string = ''

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }

  login() {

    if (this.email == '') {
      alert('Please Enter the values')
      return;
    }

    if (this.password == '') {
      alert('Please Enter the values')
      return;
    }

    this.auth.login(this.email,this.password);
    this.email = '';
    this.password = '';
  }

  signInWithGoogle(){
    this.auth.googleSignIn();
  }


}
