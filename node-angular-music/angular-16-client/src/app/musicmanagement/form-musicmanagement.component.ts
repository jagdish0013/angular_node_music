import { Component, OnInit, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MusicService } from '../_services/music.service';

@Component({
  selector: 'app-form-musicmanagement',
  templateUrl: './form-musicmanagement.component.html',
  
})
export class FormMusicManagementComponent implements OnInit {

  rForm: FormGroup;
  id: any;
  getOneMusic: any = [];
  inputEl: any;
  inputElMusic : any;
  imageFile: any;

  constructor(
    public router: Router,
    private el: ElementRef, 
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    public musicService: MusicService
  ) {
    this.rForm = fb.group({
      'music_name': [null, Validators.required],
      'description': [null, Validators.required],
      'image' : [null],
      'music' : [null]
    })
  }

  ngOnInit(): void {


      this.activatedRoute.params.subscribe((params: Params) => {
        this.id = params['id'];
        if (this.id != "new") {
            this.musicService.getOneMusic(this.id).subscribe(res => {
              console.log("res.data-------", res.data)
            this.getOneMusic = res.data;
          })
        }
      })

    

    
  }

  // // add data
  addMusicManagement(formdata : any) {
    console.log("this.id", this.id);
    if (this.rForm.valid) {
      if (this.id != "new") {
        formdata.id = this.id;
        delete formdata.image;
        delete formdata.music;
        console.log("formdata", formdata)
        this.musicService.updateMusic(formdata).subscribe(res => {
          if (res.success === true) {
            this.router.navigate(['/user/musicmanagement']);
          }
          else {
            console.log("error")
          }
        })
      }
      else {

        console.log("formdata", formdata);


        this.inputEl = HTMLInputElement = this.el.nativeElement.querySelector('#image');
        const imageCount: number = this.inputEl.files.length;

        this.inputElMusic = HTMLInputElement = this.el.nativeElement.querySelector('#music');
        const musicCount: number = this.inputElMusic.files.length;

        const formData = new FormData();
        formData.append('music_name', formdata['music_name']);
        formData.append('description', formdata['description']);
        

          console.log(this.inputEl.files.item(0))
          formData.append('image', this.inputEl.files.item(0));
          formData.append('music', this.inputElMusic.files.item(0));
        
          console.log("formData-------", formData);

        this.musicService.addMusic(formData).subscribe(res => {
          console.log(res)
          if (res.success === true) {
            this.router.navigate(['/user/musicmanagement']);
          }
          else {
            console.log("error")
          }
        });
      }
    }
  }
}
