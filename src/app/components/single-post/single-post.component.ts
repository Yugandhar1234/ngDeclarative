import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { DecService } from 'src/app/dec.service';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css']
})
export class SinglePostComponent implements OnInit{
  post$=this.share.post$.pipe(tap(data=>{
    this.share.loaderEnd()
  }));
  constructor(private share:DecService){}
  ngOnInit(): void {
    this.share.loaderStart();
  }
}
