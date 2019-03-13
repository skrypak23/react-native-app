import { ajax } from 'rxjs/ajax';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

const HOST = 'https://api.invoice-app.2muchcoffee.com/api';
export const URL_ALL_CUSTOMERS = `${HOST}/customers`;
export const URL_ALL_INVOICES = `${HOST}/invoices`;
export const URL_ALL_PRODUCTS = `${HOST}/products`;

const HEADERS = {
  'Content-Type': 'application/json'
};

export const getAll = <T>(url: string): Observable<T[]> => ajax.getJSON(url);
export const getOne = <T>(url: string): Observable<T> => ajax.getJSON(url);
export const deleteData = <T>(url: string): Observable<T> =>
  ajax.delete(url).pipe(
    map(rs => rs.response),
    catchError(err => throwError(err.response))
  );
export const createData = <T>(url: string, body: T): Observable<T> =>
  ajax.post(url, JSON.stringify(body), HEADERS).pipe(
    map(rs => rs.response),
    catchError(err => throwError(err.response))
  );
export const editData = <T>(url: string, body: T): Observable<T> =>
  ajax.put(url, JSON.stringify(body), HEADERS).pipe(
    map(rs => rs.response),
    catchError(err => throwError(err.response))
  );
