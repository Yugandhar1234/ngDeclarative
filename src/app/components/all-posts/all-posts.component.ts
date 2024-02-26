import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BehaviorSubject, EMPTY, EmptyError, Subject, catchError, combineLatest, map, tap } from 'rxjs';
import { DecService, Iposts } from 'src/app/dec.service';

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.css'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class AllPostsComponent {
  selectedCategoryId$='';

  error:string='';
  errorSubject=new BehaviorSubject<string>('');
  errorSubject$=this.errorSubject.asObservable();

  allposts$=this.share.postwithCategories$.pipe(tap(posts=>{
    posts[0].categoryId && this.share.singlecategory(posts[0].categoryId)
  }));

  singlePost$=this.share.post$;

  vm$=combineLatest([this.singlePost$,this.allposts$])
  .pipe(map(([singlePost,allPosts])=>{
    return {singlePost,allPosts}
  }),catchError((error:string)=>{
    // If chanfeDection not there

    // this.error=error;
    // return EMPTY;

    // If ChangeDetection is there
    this.errorSubject.next(error);
    return EMPTY;
  }))

  constructor(private share:DecService) {}

  selectedPost(event:Event,post:Iposts){
    event.preventDefault();
    this.share.singlecategory(post.categoryId);
  }

}
