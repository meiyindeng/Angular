import { Component, OnInit, ViewChild, Inject} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Feedback, ContactType } from '../shared/feedback';
import { FeedbackService } from '../services/feedback.service';
import { visibility, flyInOut, expand } from '../animations/app.animation';
import { v } from '@angular/core/src/render3';





@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    visibility(),
    flyInOut(),
    expand()
  ]

})
export class ContactComponent implements OnInit {

  feedbackForm: FormGroup;
  feedback: Feedback;
  contactType = ContactType;
  @ViewChild('fform') feedbackFormDirective;
  errMess: string;
  feedbackcopy: Feedback;
  visibility= 'shown';
  showSpinner = false;
  
  

  formErrors = {
      'firstname': '',
      'lastname': '',
      'telnum': '',
      'email': ''
  };

  validationMessages = {
    'firstname': {
      'required': 'First name is required',
      'minlength': 'First name must be at least 2 characters long',
      'maxlength': 'First name cannot be more than 25 characters'
    },
    'lastname': {
      'required': 'Last name is required',
      'minlength': 'Last name must be at least 2 characters long',
      'maxlength': 'Last name cannot be more than 25 characters'
    },
    'telnum':{
      'required': 'Telephone number is required.',
      'pattern': 'Telephone number must contain only numbers.'
    },
    'email':{
      'required': 'Email is required.',
      'email': 'Email not in valid format.'
    }
  };


  constructor(
    private fb: FormBuilder,
    private feedbackService: FeedbackService, 
    @Inject('BaseURL') private baseURL){
      this.createForm();
    }

  ngOnInit() {

  }

  createForm(){
    this.feedbackForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      lastname: ['', [Validators.minLength(2), Validators.maxLength(25)]],
      telnum: [0, [Validators.required, Validators.pattern]],
      email: ['', [Validators.required, Validators.email]],
      agree: false,
      contacttype: 'None',
      message: ''
    });

    this.feedbackForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

      this.onValueChanged();  //reset form validation messages

  }

  onValueChanged(data?: any){
    if(!this.feedbackForm){ return;}
    const form = this.feedbackForm;
    for (const field in this.formErrors){
      if (this.formErrors.hasOwnProperty(field)){
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        //check if the control is there, if the control is touched, and if the control is not valid
        if (control && control.dirty && !control.valid){
          const message = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += message[key] + ' ';
            }
          }
        }
      }
    }
  }

  onSubmit() {
    
    this.visibility = "hidden";
    this.showSpinner = true;

    this.feedbackcopy = this.feedbackForm.value;
    setTimeout(()=>
      this.feedbackService.submitFeedback(this.feedbackcopy)
      .subscribe( confirmedFeedback => {
        this.feedback = confirmedFeedback;
        this.showSpinner = false;
        this.feedbackcopy = confirmedFeedback;
      },
      errmess => {this.feedback = null; this.feedbackcopy = null; this.errMess = <any>errmess; }), 3000);
    

       
    


    this.feedbackForm.reset({
      firstname: '',
      lastname: '',
      telnum: '',
      email: '',
      agree: false,
      contacttype: 'None',
      message: ''
    });

    this.feedbackFormDirective.resetForm();

    setTimeout(()=>this.feedback=null, 8000);
    

    setTimeout(()=>this.visibility="shown", 10000);
  
    
  }
  
  
  
  

  




}
