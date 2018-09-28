import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import  'rxjs/add/operator/map'
import { Observable } from 'rxjs/Observable';
@Injectable()
export class EliteApiProvider {

  private baseUrl:string = "https://elite-schedule-app-c2489.firebaseio.com/";
  private currentTourney:any = {};

  constructor(public http: HttpClient) {
  }

  getTournaments(){
    return new Promise(resolve => {
      this.http.get(`${this.baseUrl}/tournaments.json`).subscribe(res => resolve(res))
    })
  }

  getTournamentData(tourneyId): Observable<any>{
    return this.http.get(`${this.baseUrl}/tournaments-data/${tourneyId}.json`).map(res => {
        this.currentTourney = res;
        return this.currentTourney;
    })
  }

}
