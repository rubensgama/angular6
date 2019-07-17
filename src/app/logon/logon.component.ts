import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { User } from 'src/model/User';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthUser } from 'src/model/AuthUser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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
  public logonForm: FormGroup;
  public submitted: boolean = false;

  /**
   * Constructor
   * @param auth AuthService instance.
   * @param formBuilder Angular reactive form builder.
   * @param router Navigation router.
   */
  constructor(private auth: AuthService, private formBuilder: FormBuilder,
    private router: Router, private toastr: ToastrService) {
    this.logonForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  /**
   * Execute authentication procedure.
   */
  authenticate(): void {
    this.submitted = true;
    if (this.logonForm.valid) {
      this.auth.authenticate(new User(this.logonForm.controls['username'].value, this.logonForm.controls['password'].value)).subscribe(user => {
        this.toastr.success('User authorized. Be welcome.');
        this.auth.setAuthUser(new AuthUser(user.username, user.roles, user.access_token));
        this.router.navigate(['todos']);
      }, error => {
        if (error.status === 401) {
          this.toastr.error('User not authorized. Try again.');
        } else {
          this.toastr.error('An unknown error ocurred. Contact the administrator.');
        }
      });
    } else {
      this.toastr.error('Enter the username and password.');
    }
  }

  hasUserNameError(): boolean {
    return this.submitted && this.logonForm.controls['username'].errors !== null;
  }
  hasPasswordError(): boolean {
    return this.submitted && this.logonForm.controls['password'].errors !== null;
  }
}
