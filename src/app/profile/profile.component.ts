import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '../services/auth.service';
import { Location } from '@angular/common'
import {UsersService} from '../services/users.service';
import {User} from '../models';
import {UserActions} from '../store/actions/UserActions';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  idToken: string;
  title = 'Create your profile';
  user: User | undefined;
  imgFile: string;

  uploadForm = new FormGroup({
    file: new FormControl('', [Validators.required]),
  });

  constructor(private route: ActivatedRoute,
              private userService: UsersService,
              private authService: AuthService,
              private location: Location) { }

  ngOnInit(): void {
    this.idToken = sessionStorage.getItem('googleToken');
    if(this.idToken) {
      this.authService.getUserInfo(atob(JSON.parse(this.idToken))).subscribe(googleUser => {
        const localId = googleUser['users'][0].localId;
        this.userService.getUserByReferenceKey(localId).subscribe(user => {
          for (const id in user) {
            this.user = user[id];
          }
          console.log(this.user)
        })
      });
    }
  }

  // onImageChange(e) {
  //   const reader = new FileReader();
  //
  //   if(e.target.files && e.target.files.length) {
  //     const [file] = e.target.files;
  //     reader.readAsDataURL(file);
  //
  //     reader.onload = () => {
  //       this.imgFile = reader.result as string;
  //       this.uploadForm.patchValue({
  //         imgSrc: reader.result
  //       });
  //
  //     };
  //   }
  // }
  //
  // upload() {
  //   console.log(this.uploadForm.value);
  // }

  back(): void {
    this.location.back();
  }

  newBlock() {
    if (document.getElementById('about-div-hidden').style.display === 'flex') {
      document.getElementById('about-div-hidden').style.display = 'none';
    } else {
      document.getElementById('about-div-hidden').style.display = 'flex';
    }
  }

}
