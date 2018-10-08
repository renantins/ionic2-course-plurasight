import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';

@Injectable()
export class UserSettingsProvider {

  constructor(private storage: Storage, private events:Events) {
  }

  favoriteTeam(team, tournamentId, tournamentName){
    let item = {team: team, tournamentId: tournamentId, tournamentName: tournamentName};
    this.storage.set(team.id.toString(), JSON.stringify(item));
    this.events.publish("favorites:changed");
  }

  unfavoriteTeam(team){
    this.storage.remove(team.id.toString());
    this.events.publish("favorites:changed");
  }

  isFavoriteTeam(teamId: string): Promise<boolean>{
    return this.storage.get(teamId).then(value => value ? true : false);
  }

  getAllFavorites(){
    let results = [];
    this.storage.forEach(data => {
        console.log("**inside foreach**",data);
        results.push(JSON.parse(data));
    });
    return results;
  }

}
