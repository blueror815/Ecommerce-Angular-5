import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/catch';

import {Product} from '../interfaces/product';

/**
 * Product service class.
 */
@Injectable()
export class ProductService {

  /**
   * Product subject.
   * Used for emitting events on actions on products.
   * @type {ReplaySubject<any>}
   */
  private productSubject: ReplaySubject<Product[]> = new ReplaySubject(1);

  constructor(private http: HttpClient) {}

  /**
   * Performs product search by category request to back-end.
   * @param {number} id target category ID
   * @return {Observable<Product[]>}
   */
  public searchByCategory(id: number): Observable<Product[]> {
    const params = new HttpParams().set('id', `${id}`);
    return this.http.get<Product[]>(`/category`, { params });
  }

  /**
   * Performs product search by keywords request to back-end.
   * @param {string} keywords search keywords
   * @return {Observable<Product[]>}
   */
  public searchByKeywords(keywords: string): Observable<Product[]> {
    this.productSubject.next(null);
    const params = new HttpParams().set('keywords', keywords);
    return this.http.get<Product[]>(`/search`, { params });
  }

  /**
   * Emits new products array as event.
   * Used in search by keywords by header search bar.
   * @param {Product[]} products
   */
  public transmitProducts(products: Product[]): void {
    this.productSubject.next(products);
  }

  /**
   * Gets current products array. Used in product search.
   * @return {Observable<Product[]>}
   */
  public get products$(): Observable<Product[]> {
    return this.productSubject.asObservable();
  }

  /**
   * Retrieves a product by ID from back-end.
   * @param {string} id target product ID.
   * @return {Observable<Product>}
   */
  public getProduct(id: string): Observable<Product> {
    const params = new HttpParams().set('id', `${id}`);
    return this.http.get<Product>(`/product`, { params });
  }

  /*public translateDescription(text: string, targetLanguage: string): Observable<string> {
    const body = { text, targetLanguage };
    return this.http.post<any>('/translate-description', body)
      .map(res => res.text);
  }*/

}
