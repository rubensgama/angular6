import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { User } from 'src/model/User';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthUser } from 'src/model/AuthUser';
import { Router } from '@angular/router';

/**
 * Front controller of user logon.
 */
@Component({
  selector: 'app-logon',
  templateUrl: './logon.component.html',
  styleUrls: ['./logon.component.css']
})
export class LogonComponent {
  /**
   * Logon form.
   */
  private logonForm: FormGroup;

  /**
   * Constructor
   * @param auth AuthService instance.
   * @param formBuilder Angular reactive form builder.
   * @param router Navigation router.
   */
  constructor(private auth: AuthService, private formBuilder: FormBuilder,
    private router: Router) {
    this.logonForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  /**
   * Execute authentication procedure.
   */
  authenticate(): void {
    if (this.logonForm.valid) {
      this.auth.authenticate(new User(this.logonForm.controls['username'].value, this.logonForm.controls['password'].value)).subscribe(user => {
        this.auth.setAuthUser(new AuthUser(user.username, user.roles, user.access_token));
        this.router.navigate(['todos']);
      }, error => console.log(error));
    } else {
      console.log('Erro');
    }
  }
}
