import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { restrictNumbers } from 'src/app/shared/validators/restrict-numbers.validator';
import { restrictSpecCharacters } from 'src/app/shared/validators/restrict-spec-characters.validator';
import { IUser } from '../auth-models/user';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-onbording',
  templateUrl: './auth-onbording.component.html',
  styleUrls: ['./auth-onbording.component.scss']
})
export class AuthOnbordingComponent implements OnInit {

  errors: string[];
  email: string;
  user: IUser;
  form!: FormGroup;
  isActive: boolean;
  returnUrl: string;
  isPending: boolean;
  isError: boolean = false;

  show: boolean = true;
  statSec: number = 60;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public authService: AuthService,
    ) {
  }



  ngOnInit(): void {
    this.createRegisterForm();
    this.isActive = true;
  }

  createRegisterForm() {
    this.form = new FormGroup({
      firstName: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(200), restrictSpecCharacters(), restrictNumbers()]),
      secondName: new FormControl(null, [Validators.minLength(2), Validators.maxLength(200), restrictSpecCharacters(), restrictNumbers()]),
    });
  }

  clearForm(): void {
    this.isError=false;
    this.form.get('firstName')!.patchValue('');
    this.form.get('secondName')!.patchValue('');

  }


  openSnackBar(message: string) {
    // this.snackBar.open(message, '', {duration: 2500});
  }

  
  goToList(): void {
    let user: IUser = this.authService.getCurrentUserValue();
    user.firstName = this.form.get('firstName').value;
    user.secondName = this.form.get('secondName').value;

    this.authService.updateUserProfile(user).subscribe((res: any) => {
      if (res.status_code === 200) {
        
        this.authService.patchUserValue(user);
        this.router.navigate(['dashboard/items']);
      }
    })

  }





}
