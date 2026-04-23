import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { from } from 'rxjs';
import { IUser } from 'src/app/modules/auth/auth-models/user';
import { AuthService } from 'src/app/modules/auth/auth.service';
import { SettingsService } from '../settings.service';

@Component({
  selector: 'app-form-profile-info',
  templateUrl: './form-profile-info.component.html',
  styleUrls: ['./form-profile-info.component.css']
})
export class FormProfileInfoComponent implements OnInit {

  form!: FormGroup;
  profileInfo: IUser;
  isPending: boolean = false;

  constructor(
    private authService: AuthService,
    private settingsService: SettingsService
  ) { }

  ngOnInit() {
    this.createForm();
    this.authService.currentUser$.subscribe((res: IUser) => {
      if (res) {
        this.profileInfo = res;
        this.form.get('firstName')!.patchValue(this.profileInfo.firstName);
        this.form.get('secondName')!.patchValue(this.profileInfo.secondName);
        this.form.get('userDescription')!.patchValue(this.profileInfo.userDescription);
      }
    })

  }


  createForm() {
    this.form = new FormGroup({
          firstName: new FormControl(null, [Validators.required]),
          secondName: new FormControl(null),
          userDescription: new FormControl(null, [Validators.required]),
        });
  }

  updateData() {
    if(this.isPending)
      return;

    this.isPending = true;
    console.log(this.form.value);
    this.settingsService.updateProfileInfo(this.form.value).subscribe((res: IUser) => {
      if (res) {
        setTimeout(() => {
          this.isPending = false;
          const user = this.authService.getCurrentUserValue();
          user.firstName = res.firstName;
          user.secondName = res.secondName;
          user.userDescription = res.userDescription;
          this.authService.patchUserValue(user)
        }, 1000);
      }
    })
  }

}
