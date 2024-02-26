import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { FilterPostsComponent } from './components/filter-posts/filter-posts.component';
import { SinglePostComponent } from './components/single-post/single-post.component';
import { AllPostsComponent } from './components/all-posts/all-posts.component';

export const routes:Routes=[
  {path:'',component:HomeComponent},
  {path:'allposts',component:AllPostsComponent},
  {path:'singlepost',component:SinglePostComponent},
  {path:'filterposts',component:FilterPostsComponent},
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }
