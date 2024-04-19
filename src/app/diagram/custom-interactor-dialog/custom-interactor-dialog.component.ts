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
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ResourceCategory} from "../../model/interactor-entity.model";


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
  tabId = 'data'; // Default value
  selectedValue = 'form'; // Default value
  isDataLoading: boolean =false;
  items = [
    {'name': 'form', 'content': 'File'},
    {'name': 'content', 'content': 'Copy & Paste'},
    {'name': 'url', 'content': 'URL'}]

  constructor(private interactorService: InteractorService, private dialogRef: MatDialogRef<CustomInteractorDialogComponent>,private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: {
    cy: cytoscape.Core
  }) {

    this.resourceForm = this.fb.group({
      selectedValue: [''],
      form: [''], // file uploader
      content: [''],
      url: [''],
      psicquicUrl: ['']
    }, {validators: this.formGroupValidator});

    merge(this.name.statusChanges, this.name.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }


  ngOnInit() {
    this.cy = this.data.cy;
  }

  formGroupValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const fileValue = control.value.form;
    const contentValue = control.value.content;
    const urlValue = control.value.url;
    const psicquicUrlValue = control.value.psicquicUrl;
    if (fileValue || contentValue || urlValue || psicquicUrlValue) {
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

  onTabChange($event: MatTabChangeEvent) {
    this.tabId = $event.tab.ariaLabelledby;
  }

  onItemChange($event: MatRadioChange) {
    this.selectedValue = $event.value;
  }

  onFileChange($event: Event) {
    const inputElement =$event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length) {
      const file = inputElement.files[0]; // Single file upload
      this.resourceForm.patchValue({ form: file });
    }
  }

  submit() {
    this.isDataLoading = true;
    const category = this.getInputs();
    if(category){
      this.interactorService.getInteractorsFromToken(this.name.value!, category.url!, category.input!, this.cy).subscribe(interactors => {
        this.interactorService.addInteractorOccurrenceNode(interactors, this.cy, interactors.resource)
        this.isDataLoading = false;
        this.dialogRef.close();
      })
    }
  }

  private getInputs(): ResourceCategory {
    const category = new ResourceCategory();
    const formValue = this.resourceForm.value;

    if (this.tabId === 'data') {
       category.url = this.interactorService.uploadUrl + this.selectedValue.toLowerCase();
       category.input = formValue[this.selectedValue.toLowerCase()];
       if(this.selectedValue.toLowerCase() === this.items[0].name){
         category.input= this.prepareFormData(formValue.form)
       }
    }

    if (this.tabId === 'psicquic') {
      category.url = this.interactorService.uplpadPsicquicUrl;
      category.input = formValue.psicquicUrl;
    }
    return category
  }

  private prepareFormData(formControl: string | Blob): FormData {
    const formData = new FormData();
    formData.append("file", formControl);
    return formData;
  }

}
