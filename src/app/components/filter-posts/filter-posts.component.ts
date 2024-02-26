import { Component, OnInit } from '@angular/core';
import { map, tap } from 'rxjs';
import { DecService } from 'src/app/dec.service';

@Component({
  selector: 'app-filter-posts',
  templateUrl: './filter-posts.component.html',
  styleUrls: ['./filter-posts.component.css']
})
export class FilterPostsComponent implements OnInit{
  category:any;
  posts$=this.share.postwithCategories$
  categories$=this.share.categories$;
  filtercategory$=this.share.filtercategory$.pipe(tap(res=>{
    return this.share.loaderEnd();
  }));
  selectedCategory(){
    console.log(this.category);
    this.share.categoryId(this.category)
  }
  constructor(private share:DecService){}
  ngOnInit(): void {
    this.share.loaderStart();
  }
}
