import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ResetpwdService } from './resetpwd.service';
import { config } from '../../config/config';
import swal from 'sweetalert2';
@Component({
  selector: 'app-resetpwd',
  templateUrl: './resetpwd.component.html',
  styleUrls: ['./resetpwd.component.css']
})
export class ResetpwdComponent implements OnInit {

  tkn: any;
  config = config;

  constructor(private ResetpwdService: ResetpwdService, private route: ActivatedRoute, private Router: Router) {

    this.route.params.subscribe(params => this.tkn = (params.token));
  }

  hero = { pwd: '', cpwd: '' };

  mydata = {}

  form: FormGroup;

  ngOnInit(): void {
    this.form = new FormGroup({
      'pwd': new FormControl(this.hero.pwd, [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(8)
      ]),
      'cpwd': new FormControl(this.hero.cpwd, [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(8)
      ]),
    });
  }
  get pwd() { return this.form.get('pwd'); }
  get cpwd() { return this.form.get('cpwd'); }


  // Function to reset password
  reset(resetpwd) {
    this.mydata = {
      password: resetpwd
    }
    this.ResetpwdService.resetPassword(this.mydata, this.tkn)
      .subscribe((res) => {
        if (res) {
          //alert("password has been changed")
          swal({
            timer: 3000,
            title: "Personalised Mailer!",
            text: "your password has been changed",
            type: 'success',
            showConfirmButton: false,
          }).then(() => {},
            (dismiss) => {
              if (dismiss === 'timer') {
                //navigate here to reset
                this.Router.navigateByUrl('reset')
              }
            });
        } else {
          this.Router.navigateByUrl('login')
        }
      }, error => {
        console.log("Error" + error)
      })


  }

}
