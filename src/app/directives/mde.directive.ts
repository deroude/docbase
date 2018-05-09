import { Directive, ElementRef, Input, OnInit } from '@angular/core';
// import * as SimpleMDE  from "simplemde";

@Directive({
  selector: '[mde]'
})
export class MarkdownEditorDirective implements OnInit{
  
  @Input("source")
  value:string;

  constructor(private element: ElementRef) {
    // this.mde=new SimpleMDE({element:element.nativeElement});
  }

  ngOnInit(): void {
    // this.mde.value(this.value);
  }

}
