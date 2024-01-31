import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MusicManagementComponent } from './musicmanagement.component';
import { FormMusicManagementComponent } from './form-musicmanagement.component';

const routes: Routes = [
  {
    path: '',
    component: MusicManagementComponent,
  },
  {
    path: 'add/:id',
    component: FormMusicManagementComponent
  },
  {
    path: 'update/:id',
    component: FormMusicManagementComponent
  }
];

@NgModule({
  declarations: [
    MusicManagementComponent,
    FormMusicManagementComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
})
export class MusicManagementModule { }
