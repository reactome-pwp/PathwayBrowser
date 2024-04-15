import {Component} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {merge} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {MatTabChangeEvent} from "@angular/material/tabs";
import {MatRadioChange} from "@angular/material/radio";
import {InteractorService} from "../../services/interactor.service";

@Component({
  selector: 'cr-custom-interactor-dialog',
  templateUrl: './custom-interactor-dialog.component.html',
  styleUrls: ['./custom-interactor-dialog.component.scss']
})
export class CustomInteractorDialogComponent {
  name = new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z_]+[a-zA-Z0-9_]*$/)]);
  fileControl = new FormControl;
  contentControl = new FormControl;
  urlControl = new FormControl;
  psicquicUrl = new FormControl

  errorMessage = '';
  selectedValue = 'form';
  accept!: string
  tabId = 'add-data';
  postUrl = '';
  items = [
    {'name': 'form', 'content': 'File'},
    {'name': 'content', 'content': 'Copy & Paste'},
    {'name': 'URL', 'content': 'URL'}]

  constructor(private interactors: InteractorService) {
    merge(this.name.statusChanges, this.name.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }


  updateErrorMessage() {
    if (this.name.hasError('required')) {
      this.errorMessage = 'You must enter a name';
    } else if (this.name.hasError('pattern')) {
      this.errorMessage = 'Name can only contain letters'
    } else {
      this.errorMessage = '';
    }
  }

//todo remove below
  selectedFile: any = null;
  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] ?? null;
  }


  onTabChange($event: MatTabChangeEvent) {
    this.tabId = $event.tab.ariaLabelledby;
  }

  onItemChange($event: MatRadioChange) {
    this.selectedValue = $event.value;
  }

  submit() {
    if (this.tabId === 'add-data') {

      switch (this.selectedValue) {
        case 'form': {
          this.postUrl = this.interactors.uploadUrl + "form"
          break;
        }
        case 'content': {
          this.postUrl = this.interactors.uploadUrl + "content"
          break;
        }
        case 'URL': {
          this.postUrl = this.interactors.uploadUrl + "url"
          break;
        }
      }

    }

    if (this.tabId === 'psicquic') {
      this.postUrl = this.interactors.uplpadPsicquicUrl + "url";
    }

    console.log("URL is  " + this.postUrl)

  }


}
