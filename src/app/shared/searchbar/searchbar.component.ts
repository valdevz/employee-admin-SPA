import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { ProfileViewService } from 'src/app/services/auth/profile-view.service';
import { SearchService } from 'src/app/services/shared/search.service';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent implements OnInit, OnDestroy  {
  show : boolean = false;
  results: any[] = [];
  input: string = '';
  keyPress$ = new Subject();
  @ViewChild('yourInput') inputName: any; 

  constructor( private searchService: SearchService,
               private profileView : ProfileViewService ) {
    this.keyPress$.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      tap( () => {
        if( this.input.length > 0 ){
          this.searchService.search( this.input ).subscribe({
            next: res =>{
              this.results = res.results
            },
            error: err => console.log(err)
          })
        }
      }),
    ).subscribe();
   }

  selectUser( user:Object ){
    this.inputName.nativeElement.value = ''
    this.profileView.changeProfile( user )
  }
   onFocus(){
    this.show = true;
   }

   onFocusOutEvent(){
    setTimeout(() => this.show = false, 100);
   }

  ngOnInit(): void {
  }

  async search(e: any){
    this.input = e;
    this.keyPress$.next(e);
    if( e.length == 0) this.results = []
  }

 ngOnDestroy(): void {
  this.keyPress$.unsubscribe();
 }

}