import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import  'rxjs/add/operator/map';
import { Observable} from 'rxjs';

@Injectable()
export class EliteApiProvider {

  private baseUrl:string = "https://elite-schedule-app-c2489.firebaseio.com/";
  private currentTourney:any = {};
  private tourneyData = {};

  constructor(public http: HttpClient) {
  }

  getTournaments(){
    return new Promise(resolve => {
      this.http.get(`${this.baseUrl}/tournaments.json`).subscribe(res => resolve(res))
    })
  }

  /*getTournamentData(tourneyId): Observable<any>{
    return this.http.get(`${this.baseUrl}/tournaments-data/${tourneyId}.json`).map(res => {
        this.currentTourney = res;
        return this.currentTourney;
    })
  }*/

  getTournamentData(tourneyId, forceRefresh): Observable<any>{
    if(!forceRefresh && this.tourneyData[tourneyId]){
      this.currentTourney = this.tourneyData[tourneyId];
      console.log("** no need to make HTTP call, just return the data");
      return Observable.of(this.currentTourney);
    }

    console.log("** about to make HTTP Call")
    return this.http.get(`${this.baseUrl}/tournaments-data/${tourneyId}.json`).map(res => {
      this.tourneyData[tourneyId] = res;
      this.currentTourney = this.tourneyData[tourneyId];
        return this.currentTourney;
    })
    
  }

  refreshCurrentTourney(){
    return this.getTournamentData(this.currentTourney.tournament.id, true);
  }

  getCurrentTourney(){
    return this.currentTourney;
  }

}
