import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TournamentsPage } from '../tournaments/tournaments';

/**
 * Generated class for the MyTeamsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-my-teams',
  templateUrl: 'my-teams.html',
})
export class MyTeamsPage {

  favorites: any = [{
    team: {
      id: 6182,
      name: "HC Elite 7th",
      coach: "Steve Michelotti",
    },
    tournamentId: "89e13aa2-ba6d-4f55-9cc2-61eba6172c63",
    tournamentName: "March Madness Tournament"
  }, {
    team: {
      id: 805,
      name: "HC Elite",
      coach: "Michelotti",
    },
    tournamentId: "98c6857e-b0d1-4295-b89e-2d95a45437f2",
    tournamentName: "Holiday Hoops Challenge"
  }];

  constructor(public nav: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyTeamsPage');
  }

  goToTournaments() {
    this.nav.push(TournamentsPage);
  }

}
