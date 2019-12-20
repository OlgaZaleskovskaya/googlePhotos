import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-initial',
  templateUrl: './initial.component.html',
  styleUrls: ['./initial.component.scss'],
   animations: [
    trigger('flyInOut', [
    
      transition(':enter', [
        style({ backgroundColor: 'red', transform: 'translateX(-100%)' }),
        animate(4000,  style({ backgroundColor: 'yellow', transform: 'translateX(-50%)' }) )
      ]),
      transition(':leave', [
        animate(4000, style({backgroundColor: 'green', transform: 'translateX(100%)' }))
      ])
    ]),
  ]
})
export class InitialComponent implements OnInit {
  switch: boolean;
  constructor() { }

  ngOnInit() {
    this.switch = false;
  }

  try() {
    this.switch = !this.switch;
  };


  toGoogle() {
    const MY_KEY = '552075416639-s1488doqk301d87tbanv3tn8evd6rpa8.apps.googleusercontent.com';
    const CB_URL = 'http://localhost:4200/main';
    const scope = 'https://www.googleapis.com/auth/photoslibrary';
    var oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';

    // Create <form> element to submit parameters to OAuth 2.0 endpoint.
    var form = document.createElement('form');
    form.setAttribute('method', 'GET'); // Send as a GET request.
    form.setAttribute('action', oauth2Endpoint);

    // Parameters to pass to OAuth 2.0 endpoint.
    var params = {
      'client_id': MY_KEY,
      'redirect_uri': CB_URL,
      'response_type': 'token',
      'scope': scope,
      'include_granted_scopes': 'true',
      'state': 'pass-through value'
    };

    // Add form parameters as hidden input values.
    for (var p in params) {
      var input = document.createElement('input');
      input.setAttribute('type', 'hidden');
      input.setAttribute('name', p);
      input.setAttribute('value', params[p]);
      form.appendChild(input);
    }

    document.body.appendChild(form);
    form.submit();

  }

}
