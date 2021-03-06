import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';

import { AppUser } from '../models/app-user';

@Injectable()
export class UserService {
    constructor(private http: Http) { }

    getAll() {

        /*
        var ret: AppUser[] = [];
 
        this.http.get('http://localhost:54042/api/AppUsers').
            map(res => res.json())
            .subscribe(res => {
                console.log("res: " + res[0].Username);
                ret = res;
            });
        return ret;
         */
        return this.http.get('http://localhost:54042/api/AppUsers', this.jwt()).map((response: Response) => response.json());
}

    getById(id: number) {
        return this.http.get('http://localhost:54042/api/' + id, this.jwt()).map((response: Response) => response.json());
    }

    create(user: AppUser) {
        console.log("user: " + user);
        return this.http.post('http://localhost:54042/api/AppUsers/', user, this.jwt()).map((response: Response) => response.json());
    }

    update(user: AppUser) {
        return this.http.put('http://localhost:54042/api/AppUsers/' + user.id, user, this.jwt()).map((response: Response) => response.json());
    }

    delete(id: number) {
        return this.http.delete('http://localhost:54042/api/AppUsers/' + id, this.jwt()).map((response: Response) => response.json());
    }

    // private helper methods

    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUsername'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }
}