import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  email: string = '';
  password: string = ''

  constructor(private auth : AuthService) { }

  ngOnInit(): void {
  }

  register() {

    if (this.email == '') {
      alert('Please Enter the values')
      return;
    }

    if (this.password == '') {
      alert('Please Enter the values')
      return;
    }

    this.auth.register(this.email,this.password);
    this.email = '';
    this.password = '';
  }

}
