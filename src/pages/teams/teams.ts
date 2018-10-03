import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { TeamDetailPage } from '../team-detail/team-detail';
import { TeamHomePage } from '../team-home/team-home';
import { EliteApiProvider } from '../../providers/elite-api/elite-api';
import  * as _ from 'lodash';
/**
 * Generated class for the TeamsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-teams',
  templateUrl: 'teams.html',
})
export class TeamsPage {

  public teams = [];
  private allTeams: any;
  private allTeamDivisions: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private eliteApi: EliteApiProvider, private loadingController: LoadingController) {
  }

  ionViewDidLoad() {

    let selectedTourney = this.navParams.data;

    let loader = this.loadingController.create({
      content: 'Getting data'
    });

    loader.present().then(() => {
      this.eliteApi.getTournamentData(selectedTourney.id).subscribe(data => {
        this.allTeams = data.teams;
        
        this.allTeamDivisions = 
        _.chain(data.teams)
        .groupBy('division')
        .toPairs()
        .map(item => _.zipObject(['divisionName','divisionTeams'],item))
        .value();

        this.teams = this.allTeamDivisions;
        loader.dismiss();
      });
    });
  
    

  }

  itemTapped($event, team){
    this.navCtrl.push(TeamHomePage, team);
  }

}
