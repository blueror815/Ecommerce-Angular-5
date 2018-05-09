import {AfterContentInit, Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-faq-en',
  templateUrl: './faq.en.html',
})
export class FaqEn implements AfterContentInit {

  @Output() offset: EventEmitter<number> = new EventEmitter();

  ngAfterContentInit() {
    const content = document.getElementById('faq-content');
    const rect = content.getBoundingClientRect();
    const bodyRect = document.body.getBoundingClientRect();
    this.offset.emit(rect.bottom - bodyRect.top);
  }

}
