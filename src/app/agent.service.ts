import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable, of, first } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Contract, Method } from './contract';

@Injectable({
  providedIn: 'root'
})
export class AgentService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient) { }

  listen(server: string, identity: string, contract: string): EventSource {
    return new EventSource(`${server}/stream?agent=${identity}&contract=${contract}`);
  }

  write(server: string, identity: string, contract: string, method: Method): Observable<any> {
    const url = `${server}/ibc/app/${identity}/${contract}/${method.name}`;
    let params = new HttpParams().set('action', 'contract_write');
    console.log(url);
    return this.http.post<any>(url, method, {...this.httpOptions, params: params}).pipe(
      tap(_ => console.log('wrote something')),
      catchError(_ => of(console.error('failed to write something'))),
      first()
    );
  }

  read(server: string, identity: string, contract: string, method: Method): Observable<any> {
    const url = `${server}/ibc/app/${identity}/${contract}/${method.name}`;
    let params = new HttpParams().set('action', 'contract_read');
    return this.http.post<any>(url, method, {...this.httpOptions, params: params}).pipe(
      tap(_ => console.log('read something')),
      catchError(_ => of(console.error('failed to read something'))),
      first()
    );
  }

  getContracts(server: string, identity: string): Observable<Contract[]> {
    let params = new HttpParams().set('action', 'get_contracts');
    return this.http.get<Contract[]>(`${server}/ibc/app/${identity}`, {params: params}).pipe(
        tap(_ => console.log('fetched contracts')),
        catchError(this.handleError<Contract[]>('getContracts', [])),
        first()
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      //  send the error to remote logging infrastructure
      console.log(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}