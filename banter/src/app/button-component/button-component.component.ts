import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-button-component',
  templateUrl: './button-component.component.html',
  styleUrls: ['./button-component.component.scss']
})
export class ButtonComponent implements OnInit {

  @Input() buttonName: string = "";
  @Input() disabled: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
