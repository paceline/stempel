import { Injectable } from '@angular/core';
import { Seal } from './seal';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SealService {

  constructor(private http: HttpClient) { }

  // POST /api/seal
  createSeal(newSeal: Seal): Promise<void | Seal> {
    return this.http.post('/api/seal', newSeal)
               .toPromise()
               .then(response => response as Seal)
               .catch(this.handleError);
  }

  private handleError (error: any) {
    let errMsg = (error.message) ? error.message :
    error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
  }
}
