import {ElementRef, Component, Inject, OnInit, Input, Output, EventEmitter} from '@angular/core';
declare var jQuery:any;
@Component({
    selector: 'Circular-Knob',
    template: `<input type="text" class="dial" value="25" data-width="180" min="0" max="100" data-displayinput="true" data-thickness=".05">`,
    host: {
    '(mouseenter)': 'onMouseEnter()',
    '(mouseleave)': 'onMouseLeave()'
  }
})
export class CircularKnob implements OnInit{


  private elementRef:ElementRef;
  @Input() min: number;
  @Input() max: number;
  @Input() myHighlight: string;

  @Output() currentVal: EventEmitter<any> = new EventEmitter();

  constructor(@Inject(ElementRef) elementRef: ElementRef){
      this.elementRef = elementRef;
  }

  onMouseEnter() {
      console.log("mouseEnter:: "+ this.myHighlight);
  }
  onMouseLeave() { console.log('asda sdadd sdasd'); }

    ngOnInit() {
      //  jQuery(this.elementRef.nativeElement).find('.moving-box').draggable({containment:'#draggable-parent'});
        // this.elementRef.nativeElement.style.color = '#FF0000';
        // this.elementRef.nativeElement.style.backgroundColor = '#FF0000';
        // console.log('hi');
        // console.log(this.elementRef.nativeElement);
        var that = this;
          console.log(this.myHighlight);
            console.log(this.min);
        jQuery(".dial").knob({
            'min': this.min,
            'max': this.max,
            'change' : function (v) {
              console.log(v);
              that.currentVal.next('33');
            }
        });


    }
}
