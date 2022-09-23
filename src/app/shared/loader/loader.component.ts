import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/services/shared/loader.service';


@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  loader: boolean = false;
  constructor(private loaderService: LoaderService) { }

  ngOnInit(): void {
    this.loaderService.loaderChanges$.subscribe({
      next: status => this.loader = status ? true: false,
      error: err => {
        console.log(err);
        this.loader = false;
      }
    })
  }

}
