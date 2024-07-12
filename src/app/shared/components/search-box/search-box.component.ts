import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { debounceTime, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styleUrl: './search-box.component.css'
})
export class SearchBoxComponent implements OnInit, OnDestroy {
  private debouncer:Subject<string> = new Subject();
  private debouncerSubscription?: Subscription;

  @ViewChild('txtInput')
  public txtInput!:ElementRef<HTMLInputElement>;

  @Input()
  public placeholder:string = '';

  @Output()
  public onValue:EventEmitter<string> = new EventEmitter();

  @Output()
  public onDebounce:EventEmitter<string> = new EventEmitter();

  @Input()
  public initialValue:string = '';

  ngOnInit(): void {
    this.debouncerSubscription = this.debouncer
    .pipe(
      debounceTime(300)
    )
    .subscribe(value => {
      this.onDebounce.emit(value);
    })
  }

  ngOnDestroy(): void {
    this.debouncerSubscription?.unsubscribe();
  }

  emitValue():void{
    this.onValue.emit(this.txtInput.nativeElement.value)
  }

  onKeyPress():void{
    this.debouncer.next(this.txtInput.nativeElement.value);
  }
}
