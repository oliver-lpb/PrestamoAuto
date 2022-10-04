import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validator, Validators} from '@angular/forms';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {

  registerUser:FormGroup;

  constructor(private fb:FormBuilder) { 
    this.registerUser = this.fb.group({
      email:['', Validators.required],
      password:['', Validators.required],
      repetirPassword:['', Validators.required],
    })
  }

  ngOnInit(): void {
  }

}
