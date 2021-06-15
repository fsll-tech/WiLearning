/*
 * Copyright (c) 2020 liwei<linewei@gmail.com>
 *
 * This program is free software: you can use, redistribute, and/or modify
 * it under the terms of the GNU Affero General Public License, version 3
 * or later ("AGPL"), as published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */
import { Component, OnInit } from '@angular/core';
import { I18nService } from '../service/i18n.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import {HttpClient, HttpParams} from '@angular/common/http';
import {getHost} from '../define';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  userForm: FormGroup;
  selectedLang = 'cn';
  username;
  password;

  constructor(
    public i18n: I18nService,
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthService,
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      user: ['admin', Validators.required],
      password: [
        'admin',
        [
          Validators.minLength(3),
          Validators.maxLength(10)
        ]
      ],
    });
  }

  login() {
    this.username = this.userForm.get('user');
    this.password = this.userForm.get('password');
    this.http.post(getHost() + '/api/admin/login', JSON.stringify({
      username: this.username.value,
      password: this.password.value
    }), {
      headers: {'Content-Type': 'application/json'}
    }).subscribe((data) => {
      this.auth.isLoggedIn = true;
      this.router.navigate(['/nav']);
    }, (error) => {
      this.snackBar.open(error.error, 'Undo');
    });
  }

  langSelect() {
    this.i18n.setLocale(this.selectedLang);
  }
}
