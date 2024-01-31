import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MusicService } from '../_services/music.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  getProductManagement: any = [];
  count : any = 0

  constructor(
    private router: Router,
    private musicService : MusicService
    // private ProductManagementService : ProductManagementService
    ) { }

  ngOnInit(): void {
    this.getAllMusic();
  }

  getAllMusic() {
    this.musicService.getAllMusicCount().subscribe(res => {
      console.log(res)
      this.count = res.count;
    });
  }

}
