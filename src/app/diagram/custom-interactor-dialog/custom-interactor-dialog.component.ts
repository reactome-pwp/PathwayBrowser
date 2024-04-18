import {Component, Inject, OnInit} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {merge} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {MatTabChangeEvent} from "@angular/material/tabs";
import {MatRadioChange} from "@angular/material/radio";
import {InteractorService} from "../../services/interactor.service";
import cytoscape from "cytoscape";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {InteractorToken, ResourceCategory} from "../../model/interactor-entity.model";
import {HttpClient, HttpParams} from "@angular/common/http";


@Component({
  selector: 'cr-custom-interactor-dialog',
  templateUrl: './custom-interactor-dialog.component.html',
  styleUrls: ['./custom-interactor-dialog.component.scss']
})
export class CustomInteractorDialogComponent implements OnInit {

  cy!: cytoscape.Core;
  name = new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z_]+[a-zA-Z0-9_]*$/)]);
  resourceForm!: FormGroup;
  errorMessage = '';
  selectedValue = 'form';
  file : File | null = null
  tabId = 'add-data';
  items = [
    {'name': 'form', 'content': 'File'},
    {'name': 'content', 'content': 'Copy & Paste'},
    {'name': 'URL', 'content': 'URL'}]

  constructor(private http: HttpClient,private interactorService: InteractorService, private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: {
    cy: cytoscape.Core
  }) {

    this.resourceForm = this.fb.group({
      selectedValue: [this.items[0].name], //Default value form
      fileControl: [''],
      contentControl: [''],
      urlControl: [''],
      psicquicUrlControl: ['']
    }, {validators: this.formGroupValidator});

    merge(this.name.statusChanges, this.name.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }


  ngOnInit() {
    this.cy = this.data.cy;
  }

  formGroupValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const fileControlValue = control.value.fileControl;
    const contentControlValue = control.value.contentControl;
    const urlControlValue = control.value.urlControl;
    const psicquicUrlControl = control.value.psicquicUrlControl;
    if (fileControlValue || contentControlValue || urlControlValue || psicquicUrlControl) {
      return null
    } else {
      return {invalid: true};
    }
  };

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

  onFileChange($event: Event) {
    const inputElement =$event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length) {
      const file = inputElement.files[0]; //Single file upload
      this.resourceForm.patchValue({ fileControl: file });
    }
  }

  onTabChange($event: MatTabChangeEvent) {
    this.tabId = $event.tab.ariaLabelledby;
  }

  onItemChange($event: MatRadioChange) {
    this.selectedValue = $event.value;
  }

  submit() {
    const category = this.getInputs();
    if(category){
      this.interactorService.getInteractorsFromToken(this.name.value!, category.url!, category.input!, this.cy).subscribe(interactors => {
        this.interactorService.addInteractorOccurrenceNode(interactors, this.cy, interactors.resource)
      })
    }
  }

  private getInputs(): ResourceCategory {
    const category = new ResourceCategory();
    const formValue = this.resourceForm.value;
    console.log(formValue.fileControl)
    if (this.tabId === 'add-data') {
      switch (this.selectedValue) {
        case 'form': {
          category.url = this.interactorService.uploadUrl + "form";
          category.input = this.prepareFormData(formValue.fileControl)
          break;
        }
        case 'content': {
          category.url = this.interactorService.uploadUrl + "content";
          category.input = formValue.contentControl;
          break;
        }
        case 'URL': {
          category.url = this.interactorService.uploadUrl + "url";
          category.input = formValue.urlControl;
          break;
        }
      }

      // category.url = this.interactorService.uploadUrl + this.selectedValue.toLowerCase();
     //  category.input = formValue[this.selectedValue.toLowerCase() + 'Control'];

    }

    if (this.tabId === 'psicquic') {
      category.url = this.interactorService.uplpadPsicquicUrl;
      category.input = formValue.psicquicUrlControl;
    }
    return category
  }


  private prepareFormData(fileControl: string | Blob): FormData {
    const formData = new FormData();
    formData.append("file", fileControl);
    return formData;
  }

  submitFile() {

    const formData = new FormData();
    const formValue = this.resourceForm.value;
    formData.append('file',formValue.fileControl)
    console.log(formValue.fileControl)
    formData.forEach((value,key) => {
      console.log("print")
      console.log(key+" "+value)
    });


      this.http.post<InteractorToken>("https://dev.reactome.org/ContentService/interactors/upload/tuple/form", formData, {
        params: new HttpParams().set('name', this.name.value!),
      //  headers: new HttpHeaders({'Content-Type': 'multipart/form-data'})
      }).subscribe((result) => {
        // worked
        console.log(result.summary.token)
      }, err => {
        console.log(err);
      });
  }

}
