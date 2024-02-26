import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, catchError, combineLatest, map, mergeMap, share, shareReplay, tap, throwError } from 'rxjs';

export interface Iposts {
  key?: string
  categoryId: string,
  description: string,
  title: string
}
export interface Icategory {
  title: string,
  key: string
}

@Injectable({
  providedIn: 'root'
})

export class DecService {

  selectedCategory=new BehaviorSubject<string>('');
  selectedCategory$=this.selectedCategory.asObservable();
  
  singleCategory=new BehaviorSubject<string>('');
  singleCategory$=this.singleCategory.asObservable();
  categoryId(id:string){
    this.selectedCategory.next(id);
  }
  singlecategory(id:string){
    this.singleCategory.next(id);
  }
  posts$ = this.http.get<{ [id: string]: Iposts }>('https://declaretive-default-rtdb.firebaseio.com/post.json')
    .pipe(map(posts => {
      const postsArray: Iposts[] = [];
      for (let key in posts) {
        postsArray.push({ ...posts[key], key });
      }
      return postsArray;
    }), tap(res => {
      //console.log(res)
   }
  ),catchError(this.handleError),share())

  categories$ = this.http.get<{ [id: string]: Icategory }>('https://declaretive-default-rtdb.firebaseio.com/categories.json')
    .pipe(map((categories) => {
      const categoryArray: Icategory[] = [];
      for (let key in categories) {
        categoryArray.push({ ...categories[key], key });
      }
      return categoryArray;
    }), tap(res => {
      //console.log(res);
    }),catchError(this.handleError),share());
  
  // postwithCategories$ = this.post$.pipe(mergeMap((posts: Iposts[]) => {
  //   return this.categories$.pipe(map((categories: Icategory[]) => {
  //     return posts.map((post: Iposts) => {
  //       return { ...post, category: categories.find(cat => cat.key == post.categoryId)?.title };
  //     })
  //   }))
  // }), tap(res => {
  //   console.log(res);
  // }));
  
  postwithCategories$= combineLatest(([this.posts$,this.categories$]))
  .pipe(map(([posts,categories])=>{
    return posts.map(post=>({
      ...post,
      category:categories.find(cat=>cat.key==post.categoryId)?.title}
      ))
  }), catchError(this.handleError));

  filtercategory$=combineLatest([this.postwithCategories$,this.selectedCategory$])
  .pipe(map(([posts,category])=>{
    return posts.filter(post=>{
      return category? post.categoryId==category : true;
    })
  }),catchError(this.handleError));

  post$=combineLatest([this.postwithCategories$,this.singleCategory$])
  .pipe(map(([posts,category])=>{
    return posts.find(post=>{
      return post.categoryId==category;
    });
  }),catchError(this.handleError),share());

  loader=new BehaviorSubject<boolean>(false);
  loderAction$=this.loader.asObservable();

  loaderStart(){
    this.loader.next(true);
  }
  loaderEnd(){
    this.loader.next(false);
  }

  handleError(error:Error){
    return throwError(()=>{
      console.log(error);
      return 'unkonwn error 404';
    })
  }
  constructor(private http: HttpClient) { }

}
