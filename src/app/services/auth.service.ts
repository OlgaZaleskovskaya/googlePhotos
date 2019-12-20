import { Injectable } from "@angular/core";

@Injectable()
export class AuthService {
    accessToken: string;
    credentials: Object = {};
  
    MY_ID = '552075416639-s1488doqk301d87tbanv3tn8evd6rpa8.apps.googleusercontent.com';

    constructor() {
    }

    fetchAccessToken(fragment: string): string {
        const str1 = fragment.split('&');
        const res = str1.map(val => {
            let arr = val.split('=');
            let obj = {};
            obj[arr[0]] = arr[1];
            return obj;
        });
        res.forEach(val => {
            this.credentials = { ... this.credentials, ...val };
        });
        this.accessToken = this.credentials['access_token'];
        return this.credentials['access_token'];
    }

    toGoogle() {
        const MY_KEY = this.MY_ID;
        const CB_URL = 'http://localhost:4200/main';
        const scope = 'https://www.googleapis.com/auth/photoslibrary';
        var oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';

        // Create <form> element to submit parameters to OAuth 2.0 endpoint.
        var form = document.createElement('form');
        form.setAttribute('method', 'GET'); // Send as a GET request.
        form.setAttribute('action', oauth2Endpoint);
        var params = {
            'client_id': MY_KEY,
            'redirect_uri': CB_URL,
            'response_type': 'token',
            'scope': scope,
            'include_granted_scopes': 'true',
            'state': 'pass-through value'
        };
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