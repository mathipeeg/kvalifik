import { Component, OnInit } from '@angular/core';
import {CollectionService} from '../services/collection.service';
import {Collection} from '../models';
import {ActivatedRoute, Router} from '@angular/router';
import {CollectionActions} from '../store/actions/CollectionActions';
import {NgRedux} from '@angular-redux/store';
import {AppState} from '../store/Store';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.scss']
})
export class CollectionsComponent implements OnInit {

  collections: Collection[] = [];
  displayedColumns: string[] = ['title', 'created', 'contents', 'status', 'edit'];

  constructor(private collectionActions: CollectionActions,
              private router: Router,
              private ngRedux: NgRedux<AppState>,
              private route: ActivatedRoute,
              private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    const published: string = this.route.snapshot.paramMap.get('published');
    if (published && published === 'true') {
      this.openSnackBar('Your event/post was successfully published!', 'x');
    }
    this.collectionActions.readCollections();

    this.ngRedux.select(state => state.collections).subscribe(res => { // holder øje med state af posts og får dem fra select()
      this.collections = res.collections;
    });
  }

  editCollection(id: any) {
    // console.log(id);
    this.router.navigate(['/managecollection', {id}])
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      panelClass: ['snackbar'],
      verticalPosition: 'top',
      horizontalPosition: 'end'
    });
  }

}
