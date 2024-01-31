import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MusicService } from '../_services/music.service';
declare var $: any;

@Component({
  selector: 'app-musicmanagement',
  templateUrl: './musicmanagement.component.html',
  styleUrls: ['./musicmanagement.component.css']
})
export class MusicManagementComponent implements OnInit {

  getMusicData: any = [];
  musicUrl : any

  constructor(
    public router: Router,
    private musicService : MusicService
  ) { }

  ngOnInit() {
    this.getAllMusicData();
    this.musicUrl = "1706645938444-milne-hai-mujhse-aayi-aashiqui-2-ringtone-pagalworld-com-1454-61650.mp3"
}

  addMusicManagement(id : any) {
    if (id != 'new') {
      this.router.navigate(['/user/musicmanagement/update', id]);
    }
    else {
      this.router.navigate(['/user/musicmanagement/add', id]);
    }
  }

  getAllMusicData() {
    var data = {
      typr: 'data'
    };
    this.musicService.getAllMusic(data).subscribe(res => {
      console.log("res.data", res.data)

      this.getMusicData = res.data;
    });
  }

  deleteMusic(id : any)
  {
    console.log(id);
   this.musicService.deletemusic(id).subscribe(res => {
      this.getAllMusicData();
    })
  }

  searchfun(event : any)
  {
    console.log(event.target.value);
    if(!!event.target.value)
    {
      var data = {
        search : event.target.value
      };
      this.musicService.getSearchMusic(data).subscribe(res  => {
        this.getMusicData = res.data;
      });
    }else{
      this.getAllMusicData();
    }
    

  }
  
}
