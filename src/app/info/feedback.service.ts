import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

/**
 * Feedback service class.
 */
@Injectable()
export class FeedbackService {
  /**
   * HasContactSent subject.
   * @type {Subject<any>}
   */
  private contactSendSubject: Subject<void> = new Subject();

  constructor(private http: HttpClient) {}

  /**
   * HasContactSent event emitter.
   * @return {Observable<void>}
   */
  get hasContactSent$(): Observable<void> {
    return this.contactSendSubject.asObservable();
  }

  /**
   * Sends ContactUs form data to back-end.
   */
  contactUs(opts: {
    fullName: string,
    email: string,
    message: string,
    orderNumber?: number,
    reCaptchaValue?: string,
  }): Observable<void> {
    return this.http.post<void>('/contact-us', opts)
      .map(() => this.contactSendSubject.next());
  }

}
