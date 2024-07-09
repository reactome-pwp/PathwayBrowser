"use strict";
(self["webpackChunkpathway_browser"] = self["webpackChunkpathway_browser"] || []).push([["main"],{

/***/ 1355:
/*!***********************************************************************!*\
  !*** ./projects/reactome-cytoscape-style/src/lib/properties-utils.ts ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   defaultable: () => (/* binding */ defaultable),
/* harmony export */   extract: () => (/* binding */ extract),
/* harmony export */   isProvider: () => (/* binding */ isProvider),
/* harmony export */   propertyExtractor: () => (/* binding */ propertyExtractor),
/* harmony export */   propertyMapper: () => (/* binding */ propertyMapper)
/* harmony export */ });
/**
 * This is a guard function to check if a property is a Provider function, or a direct value
 *
 * @param property The value to check
 * @return true if is a Provider function
 */
function isProvider(property) {
  return property.apply !== undefined;
}
/**
 * This function extracts the value from a property, and if the property is a Provider<T>, it calls the property function to get the actual value.
 *
 * @param property A value of type Property<T>.
 */
function extract(property) {
  return isProvider(property) ? property() : property;
}
function defaultable(object) {
  const defaultable = object;
  defaultable.setDefault = function (key, defaultValue) {
    if (!object[key]) object[key] = defaultValue;
    return defaultable;
  };
  return defaultable;
}
const propertyExtractor = properties => (group, key) => properties[group][key];
const propertyMapper = properties => (group, key, mapper) => mapper(extract(properties[group][key]));

/***/ }),

/***/ 3966:
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AppRoutingModule: () => (/* binding */ AppRoutingModule),
/* harmony export */   routes: () => (/* binding */ routes)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 7947);
/* harmony import */ var _diagram_diagram_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./diagram/diagram.component */ 2731);
/* harmony import */ var _diagram_iterator_diagram_iterator_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./diagram-iterator/diagram-iterator.component */ 2388);
/* harmony import */ var _guard_legacy_guard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./guard/legacy.guard */ 9792);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 1699);






const routes = [{
  path: 'iterate',
  component: _diagram_iterator_diagram_iterator_component__WEBPACK_IMPORTED_MODULE_1__.DiagramIteratorComponent
}, {
  path: 'iterate/:id',
  component: _diagram_iterator_diagram_iterator_component__WEBPACK_IMPORTED_MODULE_1__.DiagramIteratorComponent
}, {
  path: ':id',
  component: _diagram_diagram_component__WEBPACK_IMPORTED_MODULE_0__.DiagramComponent
}, {
  path: '**',
  component: _diagram_diagram_component__WEBPACK_IMPORTED_MODULE_0__.DiagramComponent,
  canActivate: [_guard_legacy_guard__WEBPACK_IMPORTED_MODULE_2__.legacyGuard],
  runGuardsAndResolvers: 'always'
}];
class AppRoutingModule {
  static #_ = this.ɵfac = function AppRoutingModule_Factory(t) {
    return new (t || AppRoutingModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({
    type: AppRoutingModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule.forRoot(routes, {
      bindToComponentInputs: true
    }), _angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](AppRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule]
  });
})();

/***/ }),

/***/ 6401:
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AppComponent: () => (/* binding */ AppComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ 7947);


class AppComponent {
  constructor() {
    this.title = 'PathwayBrowser';
  }
  static #_ = this.ɵfac = function AppComponent_Factory(t) {
    return new (t || AppComponent)();
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
    type: AppComponent,
    selectors: [["cr-root"]],
    decls: 1,
    vars: 0,
    template: function AppComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "router-outlet");
      }
    },
    dependencies: [_angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterOutlet],
    styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 8629:
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AppModule: () => (/* binding */ AppModule)
/* harmony export */ });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/platform-browser */ 6480);
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app.component */ 6401);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ 8849);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ 6575);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common/http */ 4860);
/* harmony import */ var _diagram_diagram_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./diagram/diagram.component */ 2731);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @angular/router */ 7947);
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app-routing.module */ 3966);
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/platform-browser/animations */ 4987);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/button */ 895);
/* harmony import */ var _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/slide-toggle */ 9293);
/* harmony import */ var _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @angular/cdk/drag-drop */ 7792);
/* harmony import */ var _diagram_iterator_diagram_iterator_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./diagram-iterator/diagram-iterator.component */ 2388);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/input */ 26);
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/select */ 6355);
/* harmony import */ var _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/progress-spinner */ 3910);
/* harmony import */ var _interactors_custom_interactor_dialog_custom_interactor_dialog_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./interactors/custom-interactor-dialog/custom-interactor-dialog.component */ 2373);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/material/dialog */ 7401);
/* harmony import */ var _angular_material_tabs__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/material/tabs */ 989);
/* harmony import */ var _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/material/checkbox */ 6658);
/* harmony import */ var _angular_material_radio__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/material/radio */ 2106);
/* harmony import */ var _angular_material_components_file_input__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular-material-components/file-input */ 7892);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @angular/material/icon */ 6515);
/* harmony import */ var _angular_material_list__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @angular/material/list */ 3228);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 1699);

























class AppModule {
  static #_ = this.ɵfac = function AppModule_Factory(t) {
    return new (t || AppModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineNgModule"]({
    type: AppModule,
    bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_0__.AppComponent]
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjector"]({
    imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_6__.BrowserModule, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.FormsModule, _angular_common__WEBPACK_IMPORTED_MODULE_8__.CommonModule, _angular_common_http__WEBPACK_IMPORTED_MODULE_9__.HttpClientModule, _app_routing_module__WEBPACK_IMPORTED_MODULE_2__.AppRoutingModule,
    // NoopAnimationsModule,
    _angular_material_button__WEBPACK_IMPORTED_MODULE_10__.MatButtonModule, _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_11__.MatSlideToggleModule, _angular_material_input__WEBPACK_IMPORTED_MODULE_12__.MatInputModule, _angular_material_select__WEBPACK_IMPORTED_MODULE_13__.MatSelectModule, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.ReactiveFormsModule, _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_14__.MatProgressSpinnerModule, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_15__.BrowserAnimationsModule, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_16__.MatDialogModule, _angular_material_tabs__WEBPACK_IMPORTED_MODULE_17__.MatTabsModule, _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_18__.MatCheckboxModule, _angular_material_radio__WEBPACK_IMPORTED_MODULE_19__.MatRadioModule, _angular_material_components_file_input__WEBPACK_IMPORTED_MODULE_20__.NgxMatFileInputModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_21__.MatIconModule, _angular_material_list__WEBPACK_IMPORTED_MODULE_22__.MatListModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵsetNgModuleScope"](AppModule, {
    declarations: [_app_component__WEBPACK_IMPORTED_MODULE_0__.AppComponent, _diagram_diagram_component__WEBPACK_IMPORTED_MODULE_1__.DiagramComponent, _diagram_iterator_diagram_iterator_component__WEBPACK_IMPORTED_MODULE_3__.DiagramIteratorComponent, _interactors_custom_interactor_dialog_custom_interactor_dialog_component__WEBPACK_IMPORTED_MODULE_4__.CustomInteractorDialogComponent],
    imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_6__.BrowserModule, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.FormsModule, _angular_common__WEBPACK_IMPORTED_MODULE_8__.CommonModule, _angular_common_http__WEBPACK_IMPORTED_MODULE_9__.HttpClientModule, _angular_router__WEBPACK_IMPORTED_MODULE_23__.RouterOutlet, _app_routing_module__WEBPACK_IMPORTED_MODULE_2__.AppRoutingModule,
    // NoopAnimationsModule,
    _angular_material_button__WEBPACK_IMPORTED_MODULE_10__.MatButtonModule, _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_11__.MatSlideToggleModule, _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_24__.CdkDragHandle, _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_24__.CdkDrag, _angular_material_input__WEBPACK_IMPORTED_MODULE_12__.MatInputModule, _angular_material_select__WEBPACK_IMPORTED_MODULE_13__.MatSelectModule, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.ReactiveFormsModule, _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_14__.MatProgressSpinnerModule, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_15__.BrowserAnimationsModule, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_16__.MatDialogModule, _angular_material_tabs__WEBPACK_IMPORTED_MODULE_17__.MatTabsModule, _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_18__.MatCheckboxModule, _angular_material_radio__WEBPACK_IMPORTED_MODULE_19__.MatRadioModule, _angular_material_components_file_input__WEBPACK_IMPORTED_MODULE_20__.NgxMatFileInputModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_21__.MatIconModule, _angular_material_list__WEBPACK_IMPORTED_MODULE_22__.MatListModule]
  });
})();

/***/ }),

/***/ 2388:
/*!****************************************************************!*\
  !*** ./src/app/diagram-iterator/diagram-iterator.component.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DiagramIteratorComponent: () => (/* binding */ DiagramIteratorComponent)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 3839);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 7947);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common/http */ 4860);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 8849);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/button */ 895);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/input */ 26);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/form-field */ 1333);
/* harmony import */ var _diagram_diagram_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../diagram/diagram.component */ 2731);









const _c0 = ["diagram"];
class DiagramIteratorComponent {
  constructor(route, client, router) {
    this.route = route;
    this.client = client;
    this.router = router;
    this.diagramId = '';
    this.diagramIndex = 0;
    this.diagramIds = [];
  }
  ngAfterViewInit() {
    (0,rxjs__WEBPACK_IMPORTED_MODULE_1__.combineLatest)([this.route.params, this.client.get('/assets/data/diagrams-dev-no-ehld.txt', {
      responseType: "text"
    })]).subscribe(([params, diagrams]) => {
      this.diagramIds = diagrams.split('\n').filter(s => s.length !== 0);
      this.diagramId = this.diagramIds[0];
    });
  }
  next() {
    this.diagramIndex++;
    if (this.diagramIndex > this.diagramIds.length - 1) this.diagramIndex = 0;
    this.diagramId = this.diagramIds[this.diagramIndex];
  }
  previous() {
    this.diagramIndex--;
    if (this.diagramIndex < 0) this.diagramIndex = this.diagramIds.length - 1;
    this.diagramId = this.diagramIds[this.diagramIndex];
  }
  static #_ = this.ɵfac = function DiagramIteratorComponent_Factory(t) {
    return new (t || DiagramIteratorComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_4__.HttpClient), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__.Router));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
    type: DiagramIteratorComponent,
    selectors: [["cr-diagram-iterator"]],
    viewQuery: function DiagramIteratorComponent_Query(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵviewQuery"](_c0, 5);
      }
      if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵloadQuery"]()) && (ctx.diagram = _t.first);
      }
    },
    decls: 11,
    vars: 2,
    consts: [[3, "keydown.arrowLeft", "keydown.arrowRight"], [3, "id"], ["diagram", ""], ["mat-raised-button", "", 3, "click"], ["matInput", "", "placeholder", "R-HSA-XXXXXXXX", 3, "ngModel", "ngModelChange"]],
    template: function DiagramIteratorComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("keydown.arrowLeft", function DiagramIteratorComponent_Template_div_keydown_arrowLeft_0_listener() {
          return ctx.previous();
        })("keydown.arrowRight", function DiagramIteratorComponent_Template_div_keydown_arrowRight_0_listener() {
          return ctx.next();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](1, "cr-diagram", 1, 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "button", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function DiagramIteratorComponent_Template_button_click_3_listener() {
          return ctx.previous();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](4, "Previous");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "mat-form-field")(6, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](7, "Diagram ID");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](8, "input", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("ngModelChange", function DiagramIteratorComponent_Template_input_ngModelChange_8_listener($event) {
          return ctx.diagramId = $event;
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](9, "button", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function DiagramIteratorComponent_Template_button_click_9_listener() {
          return ctx.next();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](10, "Next");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("id", ctx.diagramId);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngModel", ctx.diagramId);
      }
    },
    dependencies: [_angular_forms__WEBPACK_IMPORTED_MODULE_5__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.NgModel, _angular_material_button__WEBPACK_IMPORTED_MODULE_6__.MatButton, _angular_material_input__WEBPACK_IMPORTED_MODULE_7__.MatInput, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_8__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_8__.MatLabel, _diagram_diagram_component__WEBPACK_IMPORTED_MODULE_0__.DiagramComponent],
    styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 2731:
/*!**********************************************!*\
  !*** ./src/app/diagram/diagram.component.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DiagramComponent: () => (/* binding */ DiagramComponent),
/* harmony export */   PaletteSummary: () => (/* binding */ PaletteSummary)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! tslib */ 2321);
/* harmony import */ var cytoscape__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cytoscape */ 5388);
/* harmony import */ var reactome_cytoscape_style__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! reactome-cytoscape-style */ 5595);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! rxjs */ 2513);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! rxjs */ 3317);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! rxjs */ 3738);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! rxjs */ 4520);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! rxjs */ 5584);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! rxjs */ 7592);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! rxjs */ 4300);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! rxjs */ 1527);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/forms */ 8849);
/* harmony import */ var _ngneat_until_destroy__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! @ngneat/until-destroy */ 2813);
/* harmony import */ var _interactors_custom_interactor_dialog_custom_interactor_dialog_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../interactors/custom-interactor-dialog/custom-interactor-dialog.component */ 2373);
/* harmony import */ var _interactors_common_overlay_resource__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../interactors/common/overlay-resource */ 9049);
/* harmony import */ var _projects_reactome_cytoscape_style_src_lib_properties_utils__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../../../projects/reactome-cytoscape-style/src/lib/properties-utils */ 1355);
/* harmony import */ var _services_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../services/utils */ 7038);
/* harmony import */ var chroma_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! chroma-js */ 3062);
/* harmony import */ var chroma_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(chroma_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _angular_animations__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/animations */ 2501);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/material/form-field */ 1333);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _services_diagram_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../services/diagram.service */ 378);
/* harmony import */ var _services_dark_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../services/dark.service */ 4393);
/* harmony import */ var _interactors_services_interactor_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../interactors/services/interactor.service */ 7364);
/* harmony import */ var _services_diagram_state_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../services/diagram-state.service */ 6742);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @angular/material/dialog */ 7401);
/* harmony import */ var _services_analysis_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../services/analysis.service */ 7139);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! @angular/router */ 7947);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! @angular/common */ 6575);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! @angular/material/button */ 895);
/* harmony import */ var _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! @angular/material/slide-toggle */ 9293);
/* harmony import */ var _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! @angular/cdk/drag-drop */ 7792);
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! @angular/material/select */ 6355);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! @angular/material/core */ 5309);
/* harmony import */ var _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! @angular/material/progress-spinner */ 3910);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! @angular/material/icon */ 6515);
/* harmony import */ var _angular_material_list__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! @angular/material/list */ 3228);
































const _c0 = ["cytoscape"];
const _c1 = ["cytoscapeCompare"];
const _c2 = ["legend"];
const _c3 = ["psicquicSelect"];
function DiagramComponent_ng_container_35_mat_optgroup_1_mat_option_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "mat-option", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](1, "div", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const palette_r12 = ctx.$implicit;
    const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"](3);
    let tmp_1_0;
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("value", ctx_r11.paletteOptions.get(palette_r12));
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵstyleProp"]("background", (tmp_1_0 = ctx_r11.paletteOptions.get(palette_r12)) == null ? null : tmp_1_0.gradient);
  }
}
function DiagramComponent_ng_container_35_mat_optgroup_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "mat-optgroup", 28)(1, "mat-label", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](3, DiagramComponent_ng_container_35_mat_optgroup_1_mat_option_3_Template, 2, 3, "mat-option", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const group_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate"](group_r9.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngForOf", group_r9.palettes);
  }
}
function DiagramComponent_ng_container_35_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](1, DiagramComponent_ng_container_35_mat_optgroup_1_Template, 4, 2, "mat-optgroup", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const group_r9 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", group_r9.valid);
  }
}
function DiagramComponent_mat_option_43_mat_spinner_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](0, "mat-spinner", 36);
  }
}
function DiagramComponent_mat_option_43_Template(rf, ctx) {
  if (rf & 1) {
    const _r17 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "mat-option", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("click", function DiagramComponent_mat_option_43_Template_mat_option_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r17);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();
      const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵreference"](40);
      return _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵresetView"](_r6.open());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](1, "div", 34)(2, "span")(3, "i");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](5, DiagramComponent_mat_option_43_mat_spinner_5_Template, 1, 0, "mat-spinner", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const resource_r14 = ctx.$implicit;
    const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("value", resource_r14.name)("disabled", !resource_r14.active);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate"](resource_r14.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", ctx_r7.isDataFromPsicquicLoading && ctx_r7.selectedPsicquicResource.value === resource_r14.name);
  }
}
function DiagramComponent_mat_selection_list_51_mat_list_option_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r21 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "mat-list-option", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("click", function DiagramComponent_mat_selection_list_51_mat_list_option_1_Template_mat_list_option_click_0_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r21);
      const resourceToken_r19 = restoredCtx.$implicit;
      const ctx_r20 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵresetView"](ctx_r20.onCustomResourceChange(resourceToken_r19));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](1, "div", 34)(2, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](4, "button", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("click", function DiagramComponent_mat_selection_list_51_mat_list_option_1_Template_button_click_4_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r21);
      const resourceToken_r19 = restoredCtx.$implicit;
      const ctx_r22 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵresetView"](ctx_r22.deleteResource(resourceToken_r19));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](5, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](6, "delete");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()()()();
  }
  if (rf & 2) {
    const resourceToken_r19 = ctx.$implicit;
    const ctx_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("value", resourceToken_r19)("selected", ctx_r18.isSelected(resourceToken_r19));
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate"](resourceToken_r19.token == null ? null : resourceToken_r19.token.summary == null ? null : resourceToken_r19.token.summary.name);
  }
}
function DiagramComponent_mat_selection_list_51_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "mat-selection-list", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](1, DiagramComponent_mat_selection_list_51_mat_list_option_1_Template, 7, 3, "mat-list-option", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("multiple", false);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngForOf", ctx_r8.resourceTokens);
  }
}
const _c4 = function (a0) {
  return {
    "--legend-width": a0
  };
};
// type PaletteSummary = { name: Palette, scale: Scale, gradient: string };
class PaletteSummary {
  constructor(name) {
    this.name = name;
    this._scale = (0,chroma_js__WEBPACK_IMPORTED_MODULE_4__.scale)(name).mode('oklab');
    this.scale = this._scale;
    this.gradient = `linear-gradient(to right in oklab, ${chroma_js__WEBPACK_IMPORTED_MODULE_4__.brewer[this.name].join(', ')})`;
  }
  classes(n) {
    if (n > 0) {
      this.scale = this._scale.classes(n);
      this.gradient = `linear-gradient(to right in oklab, ${this.scale.colors(n).map((c, i) => `${c} ${i / n * 100}%, ${c} ${(i + 1) / n * 100}%`).join(', ')})`;
    } else {
      this.scale = this._scale;
      this.gradient = `linear-gradient(to right in oklab, ${chroma_js__WEBPACK_IMPORTED_MODULE_4__.brewer[this.name].join(', ')})`;
    }
  }
  domain(min, max) {
    this.scale = this.scale.domain([min, max]);
  }
}
let DiagramComponent = class DiagramComponent {
  constructor(diagram, dark, interactorsService, state, dialog, cdr, analysis, router) {
    this.diagram = diagram;
    this.dark = dark;
    this.interactorsService = interactorsService;
    this.state = state;
    this.dialog = dialog;
    this.cdr = cdr;
    this.analysis = analysis;
    this.router = router;
    this.title = 'pathway-browser';
    this.comparing = false;
    this.fit = true;
    this.psicquicResources = [];
    this.selectedPsicquicResource = new _angular_forms__WEBPACK_IMPORTED_MODULE_11__.FormControl();
    this.isDataFromPsicquicLoading = false;
    this.resourceTokens = [];
    this.ResourceType = _interactors_common_overlay_resource__WEBPACK_IMPORTED_MODULE_2__.ResourceType;
    this.palettes = [{
      name: 'sequential',
      valid: false,
      palettes: ['Greys', 'Purples', 'Blues', 'Greens', 'Oranges', 'Reds', 'BuPu', 'RdPu', 'PuRd', 'GnBu', 'YlGnBu', 'PuBu', 'PuBuGn', 'BuGn', 'YlGn', 'YlOrBr', 'OrRd', 'YlOrRd']
    }, {
      name: 'diverging',
      valid: true,
      palettes: ['RdYlGn', 'RdYlBu', 'RdGy', 'RdBu', 'PuOr', 'PRGn', 'PiYG', 'BrBG']
    }, {
      name: 'continuous',
      valid: false,
      palettes: ['Spectral', 'Viridis']
    }];
    this.cys = [];
    this.paletteOptions = new Map(Object.keys(chroma_js__WEBPACK_IMPORTED_MODULE_4__.brewer).filter(name => name.toLowerCase() !== name).map(name => [name, new PaletteSummary(name)]));
    this.palette = this.paletteOptions.get('RdBu');
    this.diagramId = '';
    this.classRegex = /class:(\w+)([!.]drug)?/;
    this.ratio = 0.384;
    this.replacedElementsPosition = [];
    this.lastIndex = 0;
    this.underlayPadding = 0;
    this.syncing = false;
    this.syncViewports = (source, sourceContainer, target, targetContainer) => {
      if (this.syncing) return;
      this.syncing = true;
      this.updateReplacementVisibility();
      const position = {
        ...source.pan()
      };
      const sourceX = sourceContainer.getBoundingClientRect().x;
      const targetX = targetContainer.getBoundingClientRect().x;
      position.x += sourceX - targetX;
      target.viewport({
        zoom: source.zoom(),
        pan: position
      });
      this.syncing = false;
    };
    this.compareDragging = false;
    // ----- Event Syncing -----
    this._reactomeEvents$ = new rxjs__WEBPACK_IMPORTED_MODULE_12__.Subject();
    this._ignore = false;
    this.reactomeEvents$ = this._reactomeEvents$.asObservable().pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_13__.distinctUntilChanged)((prev, current) => prev.type === current.type && prev.detail.reactomeId === current.detail.reactomeId), (0,rxjs__WEBPACK_IMPORTED_MODULE_14__.tap)(e => console.log(e.type, e.detail, e.detail.element.data(), e.detail.cy.container()?.id)), (0,rxjs__WEBPACK_IMPORTED_MODULE_15__.filter)(() => !this._ignore), (0,rxjs__WEBPACK_IMPORTED_MODULE_16__.share)());
    this.flagging = this.state.onChange.flag$.subscribe(value => this.cys.forEach(cy => this.flag(value, cy)));
    this.selecting = this.state.onChange.select$.subscribe(value => this.cys.forEach(cy => this.select(value, cy)));
    this.interactoring = this.state.onChange.overlay$.subscribe(value => this.getInteractors(value));
    this.analysing = this.state.onChange.analysis$.subscribe(value => this.loadAnalysis(value));
    this.compareBackgroundSync = this.reactomeEvents$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_15__.filter)(() => this.comparing), (0,rxjs__WEBPACK_IMPORTED_MODULE_15__.filter)(e => e.detail.cy !== this.legend)).subscribe(event => {
      const src = event.detail.cy;
      const tgt = src === this.cy ? this.cyCompare : this.cy;
      let replacedBy = event.detail.element.data('replacedBy');
      replacedBy = replacedBy || event.detail.element.data('replacement');
      replacedBy = replacedBy || event.detail.element.data('isBackground') && !event.detail.element.data('isFadeOut') && event.detail.element.data('id');
      if (!replacedBy) return;
      let replacements = tgt.getElementById(replacedBy);
      if (event.detail.type === 'reaction') {
        replacements = replacements.add(tgt.elements(`[reactionId=${replacedBy}]`));
      }
      this.applyEvent(event, replacements);
    });
    this.interactorOpeningHandling = this.reactomeEvents$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_15__.filter)(e => e.detail.cy !== this.legend), (0,rxjs__WEBPACK_IMPORTED_MODULE_15__.filter)(e => [reactome_cytoscape_style__WEBPACK_IMPORTED_MODULE_17__.ReactomeEventTypes.open, reactome_cytoscape_style__WEBPACK_IMPORTED_MODULE_17__.ReactomeEventTypes.close].includes(e.type)), (0,rxjs__WEBPACK_IMPORTED_MODULE_15__.filter)(e => e.detail.type === 'Interactor')).subscribe(e => {
      [this.reactomeStyle, this.reactomeStyleCompare].filter(s => s !== undefined && e.detail.cy === s.cy).forEach(style => {
        const occurrenceNode = e.detail.element.nodes()[0];
        if (e.type === reactome_cytoscape_style__WEBPACK_IMPORTED_MODULE_17__.ReactomeEventTypes.open) this.interactorsService.addInteractorNodes(occurrenceNode, style.cy);else this.interactorsService.removeInteractorNodes(occurrenceNode);
        style.interactivity.updateProteins();
        style.interactivity.triggerZoom();
      });
      if (this.comparing) {
        this.initialiseReplaceElements();
      }
    });
    this.diagram2legend = this.reactomeEvents$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_15__.filter)(e => e.detail.cy !== this.legend)).subscribe(event => {
      const classes = event.detail.element.classes();
      let matchingElement = this.legend.elements(`.${classes[0]}`);
      if (event.detail.type === 'PhysicalEntity') {
        if (classes.includes('drug')) matchingElement = matchingElement.nodes('.drug');else matchingElement = matchingElement.not('.drug');
      } else if (event.detail.type === 'reaction') {
        const reaction = event.detail.element.nodes('.reaction');
        matchingElement = this.legend.nodes(`.${reaction.classes()[0]}`).first();
        matchingElement = matchingElement.add(matchingElement.connectedEdges());
      }
      this._ignore = true;
      this.applyEvent(event, matchingElement);
      this._ignore = false;
    });
    this.diagramSelect2state = this.reactomeEvents$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_15__.filter)(e => e.detail.cy !== this.legend), (0,rxjs__WEBPACK_IMPORTED_MODULE_18__.delay)(0)).subscribe(e => {
      if (e.type !== reactome_cytoscape_style__WEBPACK_IMPORTED_MODULE_17__.ReactomeEventTypes.select) return;
      let elements = e.detail.element;
      if (e.detail.type === 'reaction') {
        elements = e.detail.cy.elements('node.reaction:selected');
      }
      const reactomeIds = elements.map(el => el.data('graph.stId'));
      this.state.set('select', reactomeIds);
    });
    this.legend2state = this.reactomeEvents$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_15__.filter)(e => e.detail.cy === this.legend), (0,rxjs__WEBPACK_IMPORTED_MODULE_15__.filter)(() => !this._ignore)).subscribe(e => {
      const event = e;
      const classes = event.detail.element.classes();
      for (let cy of [this.cy, this.cyCompare].filter(_services_utils__WEBPACK_IMPORTED_MODULE_3__.isDefined)) {
        let matchingElement = cy.elements(`.${classes[0]}`);
        // TODO move everything to use state
        if (event.detail.type === 'PhysicalEntity' || event.detail.type === 'Pathway') {
          if (classes.includes('drug')) matchingElement = matchingElement.nodes('.drug');else matchingElement = matchingElement.not('.drug');
        } else if (event.detail.type === 'reaction') {
          const reaction = event.detail.element.nodes('.reaction');
          matchingElement = this.cy.nodes(`.${reaction.classes()[0]}`);
          matchingElement = matchingElement.add(matchingElement.connectedEdges());
        }
        switch (event.type) {
          case reactome_cytoscape_style__WEBPACK_IMPORTED_MODULE_17__.ReactomeEventTypes.select:
            this.state.set('flag', ['class:' + classes[0] + (event.detail.type === 'reaction' ? '' : (classes.includes('drug') ? '.' : '!') + 'drug')]);
            break;
          case reactome_cytoscape_style__WEBPACK_IMPORTED_MODULE_17__.ReactomeEventTypes.unselect:
            this.state.set('flag', []);
            break;
          case reactome_cytoscape_style__WEBPACK_IMPORTED_MODULE_17__.ReactomeEventTypes.hover:
            matchingElement.addClass('hover');
            break;
          case reactome_cytoscape_style__WEBPACK_IMPORTED_MODULE_17__.ReactomeEventTypes.leave:
            matchingElement.removeClass('hover');
            break;
        }
      }
    });
    this.style = _angular_animations__WEBPACK_IMPORTED_MODULE_19__.style;
    this.brewer = chroma_js__WEBPACK_IMPORTED_MODULE_4__.brewer;
    this.MatFormField = _angular_material_form_field__WEBPACK_IMPORTED_MODULE_20__.MatFormField;
    this.group = _angular_animations__WEBPACK_IMPORTED_MODULE_19__.group;
  }
  ngOnChanges(changes) {
    console.log(this.paletteOptions);
    if (changes['diagramId']) this.loadDiagram();
  }
  ngAfterViewInit() {
    this.dark.$dark.subscribe(this.updateStyle.bind(this));
    const container = this.cytoscapeContainer.nativeElement;
    const compareContainer = this.compareContainer.nativeElement;
    const legendContainer = this.legendContainer.nativeElement;
    Object.values(reactome_cytoscape_style__WEBPACK_IMPORTED_MODULE_17__.ReactomeEventTypes).forEach(type => {
      container.addEventListener(type, e => this._reactomeEvents$.next(e));
      compareContainer.addEventListener(type, e => this._reactomeEvents$.next(e));
      legendContainer.addEventListener(type, e => this._reactomeEvents$.next(e));
    });
    this.reactomeStyle = new reactome_cytoscape_style__WEBPACK_IMPORTED_MODULE_17__.Style(container);
    this.underlayPadding = (0,_projects_reactome_cytoscape_style_src_lib_properties_utils__WEBPACK_IMPORTED_MODULE_21__.extract)(this.reactomeStyle.properties.shadow.padding);
    this.diagram.getLegend().subscribe(legend => {
      this.legend = (0,cytoscape__WEBPACK_IMPORTED_MODULE_0__["default"])({
        container: legendContainer,
        elements: legend,
        style: this.reactomeStyle?.getStyleSheet(),
        layout: {
          name: "preset"
        },
        boxSelectionEnabled: false
      });
      this.reactomeStyle?.bindToCytoscape(this.legend);
      this.legend.zoomingEnabled(false);
      this.legend.panningEnabled(false);
      this.legend.minZoom(0);
      const bb = this.legend.elements().boundingBox();
      // this.ratio = bb.w / bb.h;
    });

    this.loadDiagram();
    this.getPsicquicResources();
  }
  loadDiagram() {
    if (!this.cytoscapeContainer) return;
    const container = this.cytoscapeContainer.nativeElement;
    this.diagram.getDiagram(this.diagramId).subscribe(elements => {
      this.comparing = elements.nodes.some(node => node.data['isFadeOut']) || elements.edges.some(edge => edge.data['isFadeOut']);
      this.cy = (0,cytoscape__WEBPACK_IMPORTED_MODULE_0__["default"])({
        container: container,
        elements: elements,
        style: this.reactomeStyle?.getStyleSheet(),
        layout: {
          name: "preset"
        }
      });
      this.cys[0] = this.cy;
      this.reactomeStyle.bindToCytoscape(this.cy);
      this.reactomeStyle.clearCache();
      this.cy.on('dblclick', '.Pathway', e => this.router.navigate([e.target.data('graph.stId')], {
        queryParamsHandling: "preserve"
      }));
      this.loadCompare(elements, container);
      this.stateToDiagram();
    });
  }
  initialiseReplaceElements() {
    if (this.comparing) this.cy.batch(() => {
      this.cy.elements('[!isBackground]').style('visibility', 'hidden');
      this.cy.edges('.shadow').style('underlay-padding', 0);
      this.lastIndex = 0;
      this.updateReplacementVisibility();
      this.cy.elements('.Compartment').style('visibility', 'visible');
    });
  }
  loadCompare(elements, container) {
    const getPosition = e => e.is('.Shadow') ? e.data('triggerPosition') : e.boundingBox().x1;
    if (this.comparing) {
      this.cy.elements('[!isBackground]').style('visibility', 'hidden');
      this.replacedElements = this.cy.elements('[?replacedBy]').add('[?isCrossed]').sort((a, b) => getPosition(a) - getPosition(b)).style('visibility', 'hidden').toArray();
      this.replacedElementsPosition = this.replacedElements.map(getPosition);
      this.cy.on('add', e => {
        const addedElement = e.target;
        if (addedElement.data('replacedBy') || addedElement.data('isCrossed')) {
          const x = getPosition(addedElement);
          let index = this.replacedElementsPosition.findIndex(x1 => x1 >= x);
          if (index === -1) index = this.replacedElements.length;
          this.replacedElements.splice(index, 0, addedElement);
          this.replacedElementsPosition.splice(index, 0, x);
          addedElement.style('visibility', 'hidden');
        }
      });
      this.cy.on('remove', e => {
        const removedElement = e.target;
        const index = this.replacedElements.indexOf(removedElement);
        if (index > -1) {
          this.replacedElements.splice(index, 1);
          this.replacedElementsPosition.splice(index, 1);
        }
      });
      const compareContainer = this.compareContainer.nativeElement;
      this.cyCompare = (0,cytoscape__WEBPACK_IMPORTED_MODULE_0__["default"])({
        container: compareContainer,
        elements: elements,
        style: this.reactomeStyle?.getStyleSheet(),
        layout: {
          name: "preset"
        }
      });
      this.cys[1] = this.cyCompare;
      this.cyCompare.elements('[?isFadeOut]').remove();
      this.cyCompare.elements('.Compartment').remove();
      this.cy.nodes('.crossed').removeClass('crossed');
      this.cyCompare.on('viewport', () => this.syncViewports(this.cyCompare, compareContainer, this.cy, container));
      this.cy.on('viewport', () => this.syncViewports(this.cy, container, this.cyCompare, compareContainer));
      this.reactomeStyleCompare = new reactome_cytoscape_style__WEBPACK_IMPORTED_MODULE_17__.Style(compareContainer);
      this.reactomeStyleCompare?.bindToCytoscape(this.cyCompare);
      this.cyCompare.minZoom(this.cy.minZoom());
      this.cyCompare.maxZoom(this.cy.maxZoom());
      setTimeout(() => {
        this.syncViewports(this.cy, container, this.cyCompare, compareContainer);
        this.initialiseReplaceElements();
      });
    }
  }
  getElements(tokens, cy) {
    let elements;
    elements = cy.collection();
    tokens.forEach(token => {
      if (typeof token === 'string') {
        if (token.startsWith('R-')) {
          elements = elements.or(`[graph.stId="${token}"]`);
        } else {
          const matchArray = token.match(this.classRegex);
          if (matchArray) {
            const [_, clazz, drug] = matchArray;
            if (drug === '.drug') {
              // Drug physical entity
              elements = elements.or(`.${clazz}`).and('.drug');
            } else if (drug === '!drug') {
              // Non drug physical entity
              elements = elements.or(`.${clazz}`).not('.drug');
            } else {
              // Reactions
              elements = elements.or(`.${clazz}`);
              elements = elements.or(elements.nodes('.reaction').connectedEdges());
            }
          } else {
            elements = elements.or(`[acc="${token}"]`);
          }
        }
      } else {
        elements = elements.or(`[acc="${token}"]`).or(`[reactomeId="${token}"]`);
      }
    });
    return elements;
  }
  select(tokens, cy) {
    let selected = this.getElements(tokens, cy);
    selected.select();
    if ("connectedNodes" in selected) {
      selected = selected.add(selected.connectedNodes());
    }
    if (this.fit) {
      cy.fit(selected, 100);
      this.fit = false;
    }
    return selected;
  }
  flag(accs, cy) {
    return this.flagElements(this.getElements(accs, cy), cy);
  }
  flagElements(toFlag, cy) {
    const shadowNodes = cy.nodes('.Shadow');
    const shadowEdges = cy.edges('[?color]');
    const trivials = cy.elements('.trivial');
    if (toFlag.nonempty()) {
      cy.batch(() => {
        this.setSubPathwayVisibility(false, cy);
        cy.elements().removeClass('flag');
        toFlag.addClass('flag').edges().style({
          'underlay-opacity': 1
        });
      });
      return toFlag;
    } else {
      cy.batch(() => {
        this.setSubPathwayVisibility(true, cy);
        cy.elements().removeClass('flag');
      });
      return cy.collection();
    }
  }
  setSubPathwayVisibility(visible, cy) {
    const shadowNodes = cy.nodes('.Shadow');
    const shadowEdges = cy.edges('[?color]');
    const trivials = cy.elements('.trivial');
    if (visible) {
      shadowNodes.style({
        opacity: 1
      });
      trivials.style({
        opacity: 1
      });
      shadowEdges.addClass('shadow');
      cy.on('zoom', cy.data('reactome').interactivity.onZoom.shadow);
      cy.data('reactome').interactivity.onZoom.shadow();
    } else {
      shadowNodes.style({
        opacity: 0
      });
      shadowEdges.removeClass('shadow');
      cy.off('zoom', cy.data('reactome').interactivity.onZoom.shadow);
      trivials.style({
        opacity: 1
      });
      cy.edges().style({
        'underlay-opacity': 0
      });
    }
  }
  applyEvent(event, affectedElements) {
    switch (event.type) {
      case reactome_cytoscape_style__WEBPACK_IMPORTED_MODULE_17__.ReactomeEventTypes.hover:
        affectedElements.addClass('hover');
        break;
      case reactome_cytoscape_style__WEBPACK_IMPORTED_MODULE_17__.ReactomeEventTypes.leave:
        affectedElements.removeClass('hover');
        break;
      case reactome_cytoscape_style__WEBPACK_IMPORTED_MODULE_17__.ReactomeEventTypes.select:
        affectedElements.select();
        break;
      case reactome_cytoscape_style__WEBPACK_IMPORTED_MODULE_17__.ReactomeEventTypes.unselect:
        affectedElements.unselect();
        break;
    }
  }
  updateReplacementVisibility() {
    // // Calculate the position of the element that is to the right of the separation
    const extent = this.cyCompare.extent();
    let limitIndex = this.replacedElementsPosition.findIndex(x1 => x1 >= extent.x1);
    if (limitIndex === -1) limitIndex = this.replacedElements.length;
    /// Alternative calculation. In theory more optimised, but seems worse when console is opened for some reason
    // const currentPos = this.cyCompare!.extent().x1;
    // let limitIndex = this.lastIndex;
    // let i = this.lastIndex;
    // if (currentPos > this.lastPosition) { // Dragging to the right
    //   while (i >= 0 && this.replacedElementsPosition[i] < currentPos) i++;
    //   limitIndex = i;
    // } else if (currentPos < this.lastPosition) { // Dragging to the left
    //   do i--;
    //   while (i < this.replacedElementsPosition.length  && this.replacedElementsPosition[i] >= currentPos)
    //   limitIndex = i+1;
    // }
    //
    // this.lastPosition = currentPos;
    // ---------
    if (this.lastIndex !== limitIndex) {
      // If at least one element is switched from left to right
      if (limitIndex < this.lastIndex) this.replacedElements.slice(limitIndex, this.lastIndex).map(e => e.style('visibility', 'hidden')) // Hide the range of elements
      .filter(e => e.is('.Shadow')) // And if it is an shadow
      .forEach(shadow => shadow.data('edges').style('underlay-padding', 0)); // Hide as well the associated reaction underlay
      // If at least one element is switched from right to left
      if (limitIndex > this.lastIndex) this.replacedElements.slice(this.lastIndex, limitIndex).map(e => e.style('visibility', 'visible')) // Show the range of elements
      .filter(e => e.is('.Shadow')) // And if it is an shadow
      .forEach(shadow => shadow.data('edges').style('underlay-padding', this.underlayPadding)); // Show as well the associated reaction underlay
    }

    this.lastIndex = limitIndex;
  }
  getInteractors(resource) {
    const isCustom = this.interactorsService.isCustomResource(resource, this.psicquicResources);
    const isPsicquic = this.psicquicResources.filter(pr => pr.name != _interactors_common_overlay_resource__WEBPACK_IMPORTED_MODULE_2__.ResourceType.STATIC).some(r => r.name === this.state.get('overlay'));
    this.cys.forEach(cy => {
      if (!resource) return;
      if (!isPsicquic) {
        this.selectedPsicquicResource.reset();
      }
      if (!isCustom) {
        this.interactorsService.getInteractorData(cy, resource).subscribe(interactors => {
          this.interactorsService.addInteractorOccurrenceNode(interactors, cy, resource);
          this.initialiseReplaceElements(); // Avoid floating occurrence nodes when in compare mode
        });
      }

      this.state.set('overlay', resource);
    });
  }
  getPsicquicResources() {
    this.interactorsService.getPsicquicResources().subscribe(resources => {
      this.psicquicResources = resources;
    });
  }
  onPsicquicResourceChange(selectedResource) {
    this.isDataFromPsicquicLoading = true;
    this.interactorsService.getInteractorData(this.cy, selectedResource).subscribe(interactors => {
      this.interactorsService.addInteractorOccurrenceNode(interactors, this.cy, selectedResource);
      this.isDataFromPsicquicLoading = false;
      this.psicquicSelect?.close();
      this.state.set('overlay', selectedResource);
    });
  }
  openCustomInteractorDialog() {
    const dialogRef = this.dialog.open(_interactors_custom_interactor_dialog_custom_interactor_dialog_component__WEBPACK_IMPORTED_MODULE_1__.CustomInteractorDialogComponent, {
      data: {
        cy: this.cy
      },
      restoreFocus: false // Deselect button when closing
    });

    dialogRef.afterClosed().subscribe(result => {
      const resource = dialogRef.componentInstance.resource;
      if (resource.token) {
        this.resourceTokens.push(resource);
        this.state.set('overlay', resource.token.summary.token);
      }
      this.cdr.detectChanges();
    });
  }
  deleteResource(resource) {
    const index = this.resourceTokens.indexOf(resource);
    if (index !== -1) {
      this.resourceTokens.splice(index, 1);
      this.cy.elements(`[resource = '${resource.token?.summary.token}']`).remove();
    }
  }
  onCustomResourceChange(resource) {
    this.interactorsService.sendPostRequest(resource.token, this.cy).subscribe(result => {
      this.cys.forEach(cy => {
        this.interactorsService.addInteractorOccurrenceNode(result.interactors, cy, result.interactors.resource);
        this.state.set('overlay', resource.token.summary.token);
      });
    });
  }
  isSelected(resource) {
    return this.resourceTokens.includes(resource);
  }
  loadAnalysis(token) {
    console.log(token, this.diagramId);
    if (!token || !this.diagramId) {
      this.cys.forEach(cy => {
        cy.batch(() => {
          cy.nodes().removeData('exp');
          cy.edges('[?color]').style({
            'underlay-padding': (0,_projects_reactome_cytoscape_style_src_lib_properties_utils__WEBPACK_IMPORTED_MODULE_21__.extract)(this.reactomeStyle.properties.shadow.padding)
          });
          cy.nodes('.Shadow').style({
            'font-size': (0,_projects_reactome_cytoscape_style_src_lib_properties_utils__WEBPACK_IMPORTED_MODULE_21__.extract)(this.reactomeStyle.properties.shadow.fontSize),
            'text-outline-width': (0,_projects_reactome_cytoscape_style_src_lib_properties_utils__WEBPACK_IMPORTED_MODULE_21__.extract)(this.reactomeStyle.properties.shadow.fontPadding)
          });
        });
      });
      return;
    }
    (0,rxjs__WEBPACK_IMPORTED_MODULE_22__.forkJoin)({
      entities: this.analysis.foundEntities(this.diagramId, token),
      pathways: this.analysis.pathwaysResults(this.cy.nodes('.Pathway').map(p => p.data('reactomeId')), token),
      result: this.analysis.result$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_15__.filter)(_services_utils__WEBPACK_IMPORTED_MODULE_3__.isDefined), (0,rxjs__WEBPACK_IMPORTED_MODULE_23__.take)(1))
    }).subscribe(({
      entities,
      result,
      pathways
    }) => {
      // TODO Make switching profile work without reloading whole data
      const analysisProfile = this.state.get('analysisProfile');
      let analysisIndex = analysisProfile ? entities.expNames.indexOf(analysisProfile) : 0;
      if (analysisIndex === -1) analysisIndex = 0;
      let analysisEntityMap = new Map(entities.entities.flatMap(entity => entity.mapsTo.flatMap(diagramEntity => diagramEntity.ids).map(id => [id, entity.exp[analysisIndex] || 1])));
      console.log(analysisEntityMap);
      let analysisPathwayMap = new Map(pathways.map(p => [p.dbId, p.entities]));
      console.log(analysisPathwayMap);
      const normalize = (x, min, max) => (x - min) / (max - min);
      this.cys.forEach(cy => {
        cy.batch(() => {
          const style = cy.data('reactome');
          const min = style.properties.analysis.min = result.expression.min || 0;
          const max = style.properties.analysis.max = result.expression.max || 1;
          const hasExpression = result.summary.type !== 'OVERREPRESENTATION';
          cy.nodes('.PhysicalEntity').forEach(node => {
            const leaves = node.data('graph.leaves');
            const exp = leaves.map(leaf => analysisEntityMap.get(leaf.identifier)).sort((a, b) => a !== undefined ? b !== undefined ? a - b : -1 : 1);
            console.log(node.data('reactomeId'), leaves, exp);
            // if (hasExpression) exp = exp.map(e => e !== undefined ? 1 - e : undefined);
            node.data('exp', exp);
          });
          cy.nodes('.Pathway').forEach(node => {
            const dbId = node.data('reactomeId');
            const pathwayData = analysisPathwayMap.get(dbId);
            if (!pathwayData) {
              node.data('exp', [undefined]);
            } else {
              console.log(dbId, normalize(pathwayData.exp[analysisIndex] || 1 - pathwayData.pValue, min, max));
              node.data('exp', [[pathwayData.exp[analysisIndex] || 1 - pathwayData.pValue, pathwayData.found], [undefined, pathwayData.total - pathwayData.found]]);
            }
          });
          cy.edges('[?color]').style({
            'underlay-padding': 8
          });
          cy.nodes('.Shadow').style({
            'font-size': (0,_projects_reactome_cytoscape_style_src_lib_properties_utils__WEBPACK_IMPORTED_MODULE_21__.extract)(style.properties.shadow.fontSize) / 2,
            'text-outline-width': (0,_projects_reactome_cytoscape_style_src_lib_properties_utils__WEBPACK_IMPORTED_MODULE_21__.extract)(style.properties.shadow.fontPadding) / 2
          });
          const validGroups = new Set();
          if (result.summary.type === 'GSA_REGULATION') {
            validGroups.add('diverging');
          } else if (result.summary.type === 'EXPRESSION') {
            validGroups.add('diverging');
            validGroups.add('sequential');
            validGroups.add('continuous');
          } else if (result.summary.type === 'OVERREPRESENTATION') {
            validGroups.add('sequential');
          }
          for (let summary of this.paletteOptions.values()) {
            summary.classes(result.summary.type === 'GSA_REGULATION' ? 5 : 0);
            summary.domain(min, max);
          }
          this.palettes.forEach(group => group.valid = validGroups.has(group.name));
          this.palette = this.paletteOptions.get(hasExpression ? 'RdBu' : 'GnBu');
          this.reactomeStyle.loadAnalysis(cy, this.palette.scale);
        });
      });
    });
  }
  changePalette() {
    console.log(this.palette);
    if (this.palette) this.reactomeStyle.loadAnalysis(this.cy, this.palette.scale);
  }
  updateStyle() {
    this.cy ? setTimeout(() => this.reactomeStyle?.update(this.cy), 5) : null;
    this.cyCompare ? setTimeout(() => this.reactomeStyle?.update(this.cyCompare), 5) : null;
    this.legend ? setTimeout(() => this.reactomeStyle?.update(this.legend), 5) : null;
  }
  dragStart() {
    this.compareDragging = true;
  }
  dragEnd() {
    this.compareDragging = false;
  }
  dragMove($event, compareContainer) {
    if (!this.compareDragging) return;
    compareContainer.style['left'] = $event.x + 'px';
    this.cyCompare.resize();
    this.syncViewports(this.cy, this.cytoscapeContainer.nativeElement, this.cyCompare, this.compareContainer.nativeElement);
  }
  updateLegend() {
    this.legend.resize();
    this.legend.panningEnabled(true);
    this.legend.zoomingEnabled(true);
    this.legend.fit(this.legend.elements(), 2);
    this.legend.panningEnabled(false);
    this.legend.zoomingEnabled(false);
  }
  // stateToDiagramSub = this.state.state$.subscribe(() => this.stateToDiagram());
  stateToDiagram() {
    for (let cy of this.cys) {
      this.flag(this.state.get('flag'), cy);
      this.select(this.state.get("select"), cy);
    }
    this.getInteractors(this.state.get("overlay"));
    this.loadAnalysis(this.state.get('analysis'));
  }
  logProteins() {
    console.debug(new Set(this.cy.nodes(".Protein").map(node => node.data("acc") || node.data("iAcc"))));
  }
  analyse(example) {
    this.analysis.example(example).subscribe();
  }
  static #_ = this.ɵfac = function DiagramComponent_Factory(t) {
    return new (t || DiagramComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_services_diagram_service__WEBPACK_IMPORTED_MODULE_5__.DiagramService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_services_dark_service__WEBPACK_IMPORTED_MODULE_6__.DarkService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_interactors_services_interactor_service__WEBPACK_IMPORTED_MODULE_7__.InteractorService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_services_diagram_state_service__WEBPACK_IMPORTED_MODULE_8__.DiagramStateService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_24__.MatDialog), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_10__.ChangeDetectorRef), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_services_analysis_service__WEBPACK_IMPORTED_MODULE_9__.AnalysisService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_25__.Router));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdefineComponent"]({
    type: DiagramComponent,
    selectors: [["cr-diagram"]],
    viewQuery: function DiagramComponent_Query(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵviewQuery"](_c0, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵviewQuery"](_c1, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵviewQuery"](_c2, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵviewQuery"](_c3, 5);
      }
      if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵloadQuery"]()) && (ctx.cytoscapeContainer = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵloadQuery"]()) && (ctx.compareContainer = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵloadQuery"]()) && (ctx.legendContainer = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵloadQuery"]()) && (ctx.psicquicSelect = _t.first);
      }
    },
    inputs: {
      diagramId: ["id", "diagramId"]
    },
    outputs: {
      reactomeEvents$: "reactomeEvents$"
    },
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵNgOnChangesFeature"]],
    decls: 52,
    vars: 25,
    consts: [[1, "variables"], ["container", ""], ["id", "cytoscape"], ["cytoscape", ""], ["id", "disease-container", 1, "drag-container"], ["compareContainer", ""], ["id", "handle-limits", 3, "mouseup", "mouseleave", "mousemove"], ["id", "disease-handle", 1, "drag-handle", 3, "mousedown"], ["id", "cytoscape-compare", 1, "drag-content"], ["cytoscapeCompare", ""], ["id", "legend-boundary", 3, "ngStyle"], ["cdkDrag", "", "cdkDragLockAxis", "x", "cdkDragBoundary", "#legend-boundary", "id", "legend-container", 3, "cdkDragMoved"], ["id", "legend-handle", "cdkDragHandle", ""], ["id", "legend"], ["legend", ""], ["id", "controls"], ["mat-raised-button", "", 3, "click"], ["appearance", "outline", 2, "width", "200px"], [3, "value", "hideSingleSelectionIndicator", "valueChange", "selectionChange"], [1, "palette", 2, "vertical-align", "center"], [4, "ngFor", "ngForOf"], ["appearance", "outline"], [3, "formControl", "hideSingleSelectionIndicator", "selectionChange"], ["psicquicSelect", ""], [3, "value", "disabled", "click", 4, "ngFor", "ngForOf"], ["name", "dark", 3, "ngModel", "ngModelChange"], ["style", "width: 260px", 3, "multiple", 4, "ngIf"], ["style", "align-self: center", 4, "ngIf"], [2, "align-self", "center"], ["align", "center"], [3, "value", 4, "ngFor", "ngForOf"], [3, "value"], [1, "palette", "option-content"], [3, "value", "disabled", "click"], [1, "option-content"], ["diameter", "20", 4, "ngIf"], ["diameter", "20"], [2, "width", "260px", 3, "multiple"], ["color", "primary", 3, "value", "selected", "click", 4, "ngFor", "ngForOf"], ["color", "primary", 3, "value", "selected", "click"], ["mat-icon-button", "", "color", "primary", 3, "click"]],
    template: function DiagramComponent_Template(rf, ctx) {
      if (rf & 1) {
        const _r23 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵgetCurrentView"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "div", 0, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](2, "div", 2, 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](4, "div", 4, 5)(6, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("mouseup", function DiagramComponent_Template_div_mouseup_6_listener() {
          return ctx.dragEnd();
        })("mouseleave", function DiagramComponent_Template_div_mouseleave_6_listener() {
          return ctx.dragEnd();
        })("mousemove", function DiagramComponent_Template_div_mousemove_6_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r23);
          const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵreference"](5);
          return _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵresetView"](ctx.dragMove($event, _r2));
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](7, "span", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("mousedown", function DiagramComponent_Template_span_mousedown_7_listener() {
          return ctx.dragStart();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](8, "div", 8, 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](10, "div", 10)(11, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("cdkDragMoved", function DiagramComponent_Template_div_cdkDragMoved_11_listener() {
          return ctx.updateLegend();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](12, "button", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](13, "LEGEND");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](14, "div", 13, 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](16, "form", 15)(17, "button", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("click", function DiagramComponent_Template_button_click_17_listener() {
          return ctx.getInteractors(ctx.ResourceType.STATIC);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](18, "IntAct");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](19, "button", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("click", function DiagramComponent_Template_button_click_19_listener() {
          return ctx.getInteractors(ctx.ResourceType.DISGENET);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](20, "DisGeNet");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](21, "button", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("click", function DiagramComponent_Template_button_click_21_listener() {
          return ctx.updateStyle();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](22, "Update Style");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](23, "button", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("click", function DiagramComponent_Template_button_click_23_listener() {
          return ctx.logProteins();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](24, "Log Proteins");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](25, "button", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("click", function DiagramComponent_Template_button_click_25_listener() {
          return ctx.analyse("uniprot");
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](26, "Uniprot");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](27, "button", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("click", function DiagramComponent_Template_button_click_27_listener() {
          return ctx.analyse("microarray");
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](28, "Microarray");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](29, "mat-form-field", 17)(30, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](31, "Palette");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](32, "mat-select", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("valueChange", function DiagramComponent_Template_mat_select_valueChange_32_listener($event) {
          return ctx.palette = $event;
        })("selectionChange", function DiagramComponent_Template_mat_select_selectionChange_32_listener() {
          return ctx.changePalette();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](33, "mat-select-trigger");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](34, "div", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](35, DiagramComponent_ng_container_35_Template, 2, 1, "ng-container", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](36, "mat-form-field", 21)(37, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](38, "PSICQUIC");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](39, "mat-select", 22, 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("selectionChange", function DiagramComponent_Template_mat_select_selectionChange_39_listener($event) {
          return ctx.onPsicquicResourceChange($event.value);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](41, "mat-select-trigger");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](42);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](43, DiagramComponent_mat_option_43_Template, 6, 4, "mat-option", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](44, "button", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("click", function DiagramComponent_Template_button_click_44_listener() {
          return ctx.openCustomInteractorDialog();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](45, "Custom resource");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](46, "mat-slide-toggle", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("ngModelChange", function DiagramComponent_Template_mat_slide_toggle_ngModelChange_46_listener($event) {
          return ctx.dark.isDark = $event;
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](47, "Dark mode");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](48, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](49);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](50, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](51, DiagramComponent_mat_selection_list_51_Template, 2, 2, "mat-selection-list", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
      }
      if (rf & 2) {
        const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵreference"](1);
        let tmp_14_0;
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵclassProp"]("dark", ctx.dark.isDark);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵstyleProp"]("display", ctx.comparing ? "flex" : "none");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵclassProp"]("active", ctx.compareDragging);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngStyle", _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpureFunction1"](23, _c4, ctx.ratio * _r0.clientHeight + "px"));
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵstyleProp"]("height", _r0.clientHeight + "px");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](21);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("value", ctx.palette)("hideSingleSelectionIndicator", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵstyleProp"]("background", ctx.palette.gradient);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngForOf", ctx.palettes);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("formControl", ctx.selectedPsicquicResource)("hideSingleSelectionIndicator", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate"](ctx.selectedPsicquicResource.value);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngForOf", ctx.psicquicResources);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngModel", ctx.dark.isDark);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate"]((tmp_14_0 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](50, 21, ctx.reactomeEvents$)) == null ? null : tmp_14_0.detail == null ? null : tmp_14_0.detail.reactomeId);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", (ctx.resourceTokens == null ? null : ctx.resourceTokens.length) != 0);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_26__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_26__.NgIf, _angular_common__WEBPACK_IMPORTED_MODULE_26__.NgStyle, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_11__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_11__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_11__.NgModel, _angular_forms__WEBPACK_IMPORTED_MODULE_11__.NgForm, _angular_material_button__WEBPACK_IMPORTED_MODULE_27__.MatButton, _angular_material_button__WEBPACK_IMPORTED_MODULE_27__.MatIconButton, _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_28__.MatSlideToggle, _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_29__.CdkDragHandle, _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_29__.CdkDrag, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_20__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_20__.MatLabel, _angular_material_select__WEBPACK_IMPORTED_MODULE_30__.MatSelect, _angular_material_select__WEBPACK_IMPORTED_MODULE_30__.MatSelectTrigger, _angular_material_core__WEBPACK_IMPORTED_MODULE_31__.MatOption, _angular_material_core__WEBPACK_IMPORTED_MODULE_31__.MatOptgroup, _angular_forms__WEBPACK_IMPORTED_MODULE_11__.FormControlDirective, _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_32__.MatProgressSpinner, _angular_material_icon__WEBPACK_IMPORTED_MODULE_33__.MatIcon, _angular_material_list__WEBPACK_IMPORTED_MODULE_34__.MatSelectionList, _angular_material_list__WEBPACK_IMPORTED_MODULE_34__.MatListOption, _angular_common__WEBPACK_IMPORTED_MODULE_26__.AsyncPipe],
    styles: [".variables[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0 0 40px 0;\n  --opacity: 0.08;\n  --structure-opacity: [[130,0], [150,100]];\n  --shadow-padding: 20;\n  --shadow-luminosity: 40;\n  --on-surface: #001F24;\n  --primary: #006782;\n  --on-primary: #FFFFFF;\n  --on-tertiary: #FFFFFF;\n  --positive: #0C9509;\n  --negative: #BA1A1A;\n  --negative-contrast: #ea7d7d;\n  --select-node: #6EB3E4;\n  --select-edge: #0561A6;\n  --hover-node: #78E076;\n  --hover-edge: #04B601;\n  --interactor-fill: #68297C;\n  --interactor-stroke: #9f5cb5;\n  --flag: #ff009a;\n  --compartment: #E5834A;\n  --primary-contrast-1: #001F29;\n  --primary-contrast-2: #003545;\n  --primary-contrast-3: #004D62;\n  --primary-contrast-4: #006782;\n  --tertiary-contrast-1: #00315C;\n  --tertiary-contrast-2: #004882;\n  --tertiary-contrast-3: #1660A5;\n  --drug-contrast-1: #3E001D;\n  --drug-contrast-2: #610B33;\n  --drug-contrast-3: #7E2549;\n  --drug-contrast-4: #BB557A;\n  --analysis-uni-palette: [\n    [0, \"#FFFFE0\"],\n    [1, \"#00429D\"]\n  ];\n  --analysis-bi-palette: \"viridis\";\n}\n.variables.dark[_ngcontent-%COMP%] {\n  --opacity: 0.08;\n  --shadow-luminosity: 70;\n  --shadow-opacity: [[20, 40], [40, 0]];\n  --on-surface: #97F0FF;\n  --primary: #5CD4FF;\n  --on-primary: #0D1617;\n  --on-tertiary: #0D1317;\n  --positive: #10d70b;\n  --negative: #ea2323;\n  --select-node: #00ffff;\n  --negative-contrast: #8f0000;\n  --select-edge: #1d85cc;\n  --hover-node: #ffff00;\n  --hover-edge: #ffff00;\n  --flag: #DA429E;\n  --compartment: #5e232d;\n  --primary-contrast-1: #5CD4FF;\n  --primary-contrast-2: #20B9E5;\n  --primary-contrast-3: #009DC4;\n  --primary-contrast-4: #0081A2;\n  --tertiary-contrast-1: #a48ee0;\n  --tertiary-contrast-2: #9b73d3;\n  --tertiary-contrast-3: #8c63c5;\n  --drug-contrast-1: #FFB1C8;\n  --drug-contrast-2: #F988AE;\n  --drug-contrast-3: #DA6E94;\n  --drug-contrast-4: #c4527b;\n}\n\n#controls[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: calc(100vh - 40px) 0 0 0;\n  background: var(--surface);\n}\n#controls[_ngcontent-%COMP%]   *[_ngcontent-%COMP%] {\n  background: var(--surface);\n  color: var(--on-surface);\n}\n\n#cytoscape[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0 0 0 0;\n  background: var(--surface);\n}\n\n#legend-boundary[_ngcontent-%COMP%] {\n  --legend-width: 400px;\n  --border-width: 2px;\n  --handle-width: 20px;\n  position: absolute;\n  pointer-events: none;\n  right: calc(-1 * var(--legend-width) - var(--border-width));\n  height: 100%;\n  width: calc(2 * var(--legend-width) + var(--handle-width));\n}\n#legend-boundary[_ngcontent-%COMP%]   #legend-container[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  display: flex;\n  align-items: center;\n  width: -moz-fit-content;\n  width: fit-content;\n  left: calc(var(--legend-width) - var(--border-width));\n  pointer-events: all;\n  height: 100%;\n}\n#legend-boundary[_ngcontent-%COMP%]   #legend-handle[_ngcontent-%COMP%] {\n  width: var(--handle-width);\n  text-orientation: upright;\n  writing-mode: vertical-lr;\n  border-radius: 8.5px 0 0 8.5px;\n  background: color-mix(in srgb, var(--surface) 80%, transparent);\n  -webkit-backdrop-filter: blur(5px);\n          backdrop-filter: blur(5px);\n  border-left: var(--border-width) solid var(--primary);\n  border-top: var(--border-width) solid var(--primary);\n  border-bottom: var(--border-width) solid var(--primary);\n  border-right: 0;\n  cursor: ew-resize;\n  color: var(--on-surface);\n}\n#legend-boundary[_ngcontent-%COMP%]   #legend[_ngcontent-%COMP%] {\n  width: var(--legend-width);\n  height: 100%;\n  background: color-mix(in srgb, var(--surface) 80%, transparent);\n  -webkit-backdrop-filter: blur(5px);\n          backdrop-filter: blur(5px);\n}\n#legend-boundary[_ngcontent-%COMP%]   #legend[_ngcontent-%COMP%]:before {\n  content: \"\";\n  height: 100%;\n  width: 2px;\n  background-color: var(--primary);\n  position: absolute;\n  left: -1px;\n  z-index: 4;\n}\n\n.drag-container[_ngcontent-%COMP%] {\n  position: absolute;\n  left: 10%;\n  width: 100%;\n  pointer-events: all;\n  z-index: 1;\n  display: flex;\n  align-items: center;\n  height: 100%;\n}\n\n#handle-limits[_ngcontent-%COMP%] {\n  --width: 500px;\n  --height: 500px;\n  position: absolute;\n  left: calc(-0.5 * var(--width));\n  top: calc(50% - 0.5 * var(--height));\n  width: var(--width);\n  height: var(--height);\n  z-index: 5;\n  pointer-events: none;\n}\n#handle-limits.active[_ngcontent-%COMP%] {\n  pointer-events: all;\n  cursor: ew-resize;\n}\n\n.drag-handle[_ngcontent-%COMP%] {\n  --width: 4px;\n  --height: 30px;\n  position: absolute;\n  left: calc(50% - 0.5 * var(--width) - 4px);\n  top: calc(50% - 0.5 * var(--height) - 4px);\n  border-radius: var(--height);\n  width: var(--width);\n  height: var(--height);\n  border: 4px solid var(--primary);\n  cursor: ew-resize;\n  color: var(--on-surface);\n  pointer-events: all;\n  filter: drop-shadow(-2px 0px 0px var(--primary-container)) drop-shadow(2px 0px 0px var(--error-container));\n  background: var(--surface);\n}\n\n#cytoscape-compare[_ngcontent-%COMP%] {\n  box-sizing: border-box;\n  position: absolute;\n  height: 100%;\n  width: 100%;\n  inset: 0 0 0 0;\n  background-color: color-mix(in srgb, var(--error) 5%, color-mix(in srgb, var(--surface) 50%, transparent));\n}\n#cytoscape-compare[_ngcontent-%COMP%]:before {\n  content: \"\";\n  height: 100%;\n  width: 4px;\n  background-color: var(--primary);\n  filter: drop-shadow(-2px 0px 0px var(--primary-container)) drop-shadow(2px 0px 0px var(--error-container));\n  position: absolute;\n  left: -2px;\n  z-index: 4;\n}\n\n.option-content[_ngcontent-%COMP%] {\n  width: 100%;\n  display: flex;\n  justify-content: space-between;\n  gap: 100px;\n  align-items: center;\n}\n\n.palette[_ngcontent-%COMP%] {\n  height: 20px;\n  min-width: 100px;\n  margin-right: 20px;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvZGlhZ3JhbS9kaWFncmFtLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0Usa0JBQUE7RUFDQSxpQkFBQTtFQUNBLGVBQUE7RUFDQSx5Q0FBQTtFQUNBLG9CQUFBO0VBRUEsdUJBQUE7RUFDQSxxQkFBQTtFQUNBLGtCQUFBO0VBQ0EscUJBQUE7RUFDQSxzQkFBQTtFQUNBLG1CQUFBO0VBQ0EsbUJBQUE7RUFDQSw0QkFBQTtFQUNBLHNCQUFBO0VBQ0Esc0JBQUE7RUFDQSxxQkFBQTtFQUNBLHFCQUFBO0VBQ0EsMEJBQUE7RUFDQSw0QkFBQTtFQUNBLGVBQUE7RUFHQSxzQkFBQTtFQUVBLDZCQUFBO0VBQ0EsNkJBQUE7RUFDQSw2QkFBQTtFQUNBLDZCQUFBO0VBRUEsOEJBQUE7RUFDQSw4QkFBQTtFQUNBLDhCQUFBO0VBRUEsMEJBQUE7RUFDQSwwQkFBQTtFQUNBLDBCQUFBO0VBQ0EsMEJBQUE7RUFFQTs7O0dBQUE7RUFXQSxnQ0FBQTtBQWJGO0FBZUU7RUFDRSxlQUFBO0VBQ0EsdUJBQUE7RUFDQSxxQ0FBQTtFQUdBLHFCQUFBO0VBQ0Esa0JBQUE7RUFDQSxxQkFBQTtFQUNBLHNCQUFBO0VBQ0EsbUJBQUE7RUFDQSxtQkFBQTtFQUNBLHNCQUFBO0VBQ0EsNEJBQUE7RUFDQSxzQkFBQTtFQUNBLHFCQUFBO0VBQ0EscUJBQUE7RUFHQSxlQUFBO0VBRUEsc0JBQUE7RUFFQSw2QkFBQTtFQUNBLDZCQUFBO0VBQ0EsNkJBQUE7RUFDQSw2QkFBQTtFQUVBLDhCQUFBO0VBQ0EsOEJBQUE7RUFDQSw4QkFBQTtFQUVBLDBCQUFBO0VBQ0EsMEJBQUE7RUFDQSwwQkFBQTtFQUNBLDBCQUFBO0FBckJKOztBQXlCQTtFQUNFLGtCQUFBO0VBQ0EsK0JBQUE7RUFPQSwwQkFBQTtBQTVCRjtBQXVCRTtFQUNFLDBCQUFBO0VBQ0Esd0JBQUE7QUFyQko7O0FBNEJBO0VBQ0Usa0JBQUE7RUFDQSxjQUFBO0VBQ0EsMEJBQUE7QUF6QkY7O0FBNkJBO0VBQ0UscUJBQUE7RUFDQSxtQkFBQTtFQUNBLG9CQUFBO0VBRUEsa0JBQUE7RUFDQSxvQkFBQTtFQUNBLDJEQUFBO0VBQ0EsWUFBQTtFQUNBLDBEQUFBO0FBM0JGO0FBNkJFO0VBQ0Usa0JBQUE7RUFDQSxVQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsdUJBQUE7RUFBQSxrQkFBQTtFQUNBLHFEQUFBO0VBQ0EsbUJBQUE7RUFDQSxZQUFBO0FBM0JKO0FBOEJFO0VBQ0UsMEJBQUE7RUFDQSx5QkFBQTtFQUNBLHlCQUFBO0VBRUEsOEJBQUE7RUFDQSwrREFBQTtFQUNBLGtDQUFBO1VBQUEsMEJBQUE7RUFDQSxxREFBQTtFQUNBLG9EQUFBO0VBQ0EsdURBQUE7RUFDQSxlQUFBO0VBQ0EsaUJBQUE7RUFDQSx3QkFBQTtBQTdCSjtBQWdDRTtFQUNFLDBCQUFBO0VBQ0EsWUFBQTtFQUVBLCtEQUFBO0VBQ0Esa0NBQUE7VUFBQSwwQkFBQTtBQS9CSjtBQWlDSTtFQUNFLFdBQUE7RUFDQSxZQUFBO0VBQ0EsVUFBQTtFQUNBLGdDQUFBO0VBQ0Esa0JBQUE7RUFDQSxVQUFBO0VBQ0EsVUFBQTtBQS9CTjs7QUFvQ0E7RUFDRSxrQkFBQTtFQUNBLFNBQUE7RUFDQSxXQUFBO0VBQ0EsbUJBQUE7RUFFQSxVQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsWUFBQTtBQWxDRjs7QUFxQ0E7RUFDRSxjQUFBO0VBQ0EsZUFBQTtFQUNBLGtCQUFBO0VBQ0EsK0JBQUE7RUFDQSxvQ0FBQTtFQUNBLG1CQUFBO0VBQ0EscUJBQUE7RUFFQSxVQUFBO0VBQ0Esb0JBQUE7QUFuQ0Y7QUFxQ0U7RUFDRSxtQkFBQTtFQUNBLGlCQUFBO0FBbkNKOztBQXVDQTtFQUNFLFlBQUE7RUFDQSxjQUFBO0VBRUEsa0JBQUE7RUFDQSwwQ0FBQTtFQUNBLDBDQUFBO0VBRUEsNEJBQUE7RUFDQSxtQkFBQTtFQUNBLHFCQUFBO0VBQ0EsZ0NBQUE7RUFDQSxpQkFBQTtFQUNBLHdCQUFBO0VBQ0EsbUJBQUE7RUFDQSwwR0FBQTtFQUNBLDBCQUFBO0FBdENGOztBQTJDQTtFQUNFLHNCQUFBO0VBQ0Esa0JBQUE7RUFFQSxZQUFBO0VBQ0EsV0FBQTtFQUNBLGNBQUE7RUFDQSwwR0FBQTtBQXpDRjtBQTJDRTtFQUNFLFdBQUE7RUFDQSxZQUFBO0VBQ0EsVUFBQTtFQUNBLGdDQUFBO0VBQ0EsMEdBQUE7RUFDQSxrQkFBQTtFQUNBLFVBQUE7RUFDQSxVQUFBO0FBekNKOztBQTZDQTtFQUNFLFdBQUE7RUFDQSxhQUFBO0VBQ0EsOEJBQUE7RUFDQSxVQUFBO0VBQ0EsbUJBQUE7QUExQ0Y7O0FBNkNBO0VBRUUsWUFBQTtFQUNBLGdCQUFBO0VBQ0Esa0JBQUE7QUEzQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIudmFyaWFibGVzIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBpbnNldDogMCAwIDQwcHggMDtcbiAgLS1vcGFjaXR5OiAwLjA4O1xuICAtLXN0cnVjdHVyZS1vcGFjaXR5OiBbWzEzMCwwXSwgWzE1MCwxMDBdXTtcbiAgLS1zaGFkb3ctcGFkZGluZzogMjA7XG5cbiAgLS1zaGFkb3ctbHVtaW5vc2l0eTogNDA7XG4gIC0tb24tc3VyZmFjZTogIzAwMUYyNDtcbiAgLS1wcmltYXJ5OiAjMDA2NzgyO1xuICAtLW9uLXByaW1hcnk6ICNGRkZGRkY7XG4gIC0tb24tdGVydGlhcnk6ICNGRkZGRkY7XG4gIC0tcG9zaXRpdmU6ICMwQzk1MDk7XG4gIC0tbmVnYXRpdmU6ICNCQTFBMUE7XG4gIC0tbmVnYXRpdmUtY29udHJhc3Q6ICNlYTdkN2Q7XG4gIC0tc2VsZWN0LW5vZGU6ICM2RUIzRTQ7XG4gIC0tc2VsZWN0LWVkZ2U6ICMwNTYxQTY7XG4gIC0taG92ZXItbm9kZTogIzc4RTA3NjtcbiAgLS1ob3Zlci1lZGdlOiAjMDRCNjAxO1xuICAtLWludGVyYWN0b3ItZmlsbDogIzY4Mjk3QztcbiAgLS1pbnRlcmFjdG9yLXN0cm9rZTogIzlmNWNiNTtcbiAgLS1mbGFnOiAjZmYwMDlhO1xuXG5cbiAgLS1jb21wYXJ0bWVudDogI0U1ODM0QTtcblxuICAtLXByaW1hcnktY29udHJhc3QtMTogIzAwMUYyOTtcbiAgLS1wcmltYXJ5LWNvbnRyYXN0LTI6ICMwMDM1NDU7XG4gIC0tcHJpbWFyeS1jb250cmFzdC0zOiAjMDA0RDYyO1xuICAtLXByaW1hcnktY29udHJhc3QtNDogIzAwNjc4MjtcblxuICAtLXRlcnRpYXJ5LWNvbnRyYXN0LTE6ICMwMDMxNUM7XG4gIC0tdGVydGlhcnktY29udHJhc3QtMjogIzAwNDg4MjtcbiAgLS10ZXJ0aWFyeS1jb250cmFzdC0zOiAjMTY2MEE1O1xuXG4gIC0tZHJ1Zy1jb250cmFzdC0xOiAjM0UwMDFEO1xuICAtLWRydWctY29udHJhc3QtMjogIzYxMEIzMztcbiAgLS1kcnVnLWNvbnRyYXN0LTM6ICM3RTI1NDk7XG4gIC0tZHJ1Zy1jb250cmFzdC00OiAjQkI1NTdBO1xuXG4gIC0tYW5hbHlzaXMtdW5pLXBhbGV0dGU6IFtcbiAgICBbMCwgJyNGRkZGRTAnXSxcbiAgICBbMSwgJyMwMDQyOUQnXVxuICBdO1xuXG4gIC8vLS1hbmFseXNpcy1iaS1wYWxldHRlOiBbXG4gIC8vICBbMC4wLCAnIzkzMDAzQSddLFxuICAvLyAgWzAuNSwgJyNGRkZGRTAnXSxcbiAgLy8gIFsxLjAsICcjMDA0MjlEJ11cbiAgLy9dO1xuXG4gIC0tYW5hbHlzaXMtYmktcGFsZXR0ZTogJ3ZpcmlkaXMnO1xuXG4gICYuZGFyayB7XG4gICAgLS1vcGFjaXR5OiAwLjA4O1xuICAgIC0tc2hhZG93LWx1bWlub3NpdHk6IDcwO1xuICAgIC0tc2hhZG93LW9wYWNpdHk6IFtbMjAsIDQwXSwgWzQwLCAwXV07XG5cblxuICAgIC0tb24tc3VyZmFjZTogIzk3RjBGRjtcbiAgICAtLXByaW1hcnk6ICM1Q0Q0RkY7XG4gICAgLS1vbi1wcmltYXJ5OiAjMEQxNjE3O1xuICAgIC0tb24tdGVydGlhcnk6ICMwRDEzMTc7XG4gICAgLS1wb3NpdGl2ZTogIzEwZDcwYjtcbiAgICAtLW5lZ2F0aXZlOiAjZWEyMzIzO1xuICAgIC0tc2VsZWN0LW5vZGU6ICMwMGZmZmY7XG4gICAgLS1uZWdhdGl2ZS1jb250cmFzdDogIzhmMDAwMDtcbiAgICAtLXNlbGVjdC1lZGdlOiAjMWQ4NWNjO1xuICAgIC0taG92ZXItbm9kZTogI2ZmZmYwMDtcbiAgICAtLWhvdmVyLWVkZ2U6ICNmZmZmMDA7XG4gICAgLy8tLWludGVyYWN0b3Itc3Ryb2tlOiAjNjgyOTdDO1xuICAgIC8vLS1pbnRlcmFjdG9yLWZpbGw6ICM5ZjVjYjU7XG4gICAgLS1mbGFnOiAjREE0MjlFO1xuXG4gICAgLS1jb21wYXJ0bWVudDogIzVlMjMyZDtcblxuICAgIC0tcHJpbWFyeS1jb250cmFzdC0xOiAjNUNENEZGO1xuICAgIC0tcHJpbWFyeS1jb250cmFzdC0yOiAjMjBCOUU1O1xuICAgIC0tcHJpbWFyeS1jb250cmFzdC0zOiAjMDA5REM0O1xuICAgIC0tcHJpbWFyeS1jb250cmFzdC00OiAjMDA4MUEyO1xuXG4gICAgLS10ZXJ0aWFyeS1jb250cmFzdC0xOiAjYTQ4ZWUwO1xuICAgIC0tdGVydGlhcnktY29udHJhc3QtMjogIzliNzNkMztcbiAgICAtLXRlcnRpYXJ5LWNvbnRyYXN0LTM6ICM4YzYzYzU7XG5cbiAgICAtLWRydWctY29udHJhc3QtMTogI0ZGQjFDODtcbiAgICAtLWRydWctY29udHJhc3QtMjogI0Y5ODhBRTtcbiAgICAtLWRydWctY29udHJhc3QtMzogI0RBNkU5NDtcbiAgICAtLWRydWctY29udHJhc3QtNDogI2M0NTI3YjtcbiAgfVxufVxuXG4jY29udHJvbHMge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGluc2V0OiBjYWxjKDEwMHZoIC0gNDBweCkgMCAwIDA7XG5cbiAgKiB7XG4gICAgYmFja2dyb3VuZDogdmFyKC0tc3VyZmFjZSk7XG4gICAgY29sb3I6IHZhcigtLW9uLXN1cmZhY2UpO1xuICB9XG5cbiAgYmFja2dyb3VuZDogdmFyKC0tc3VyZmFjZSk7XG5cbn1cblxuI2N5dG9zY2FwZSB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgaW5zZXQ6IDAgMCAwIDA7XG4gIGJhY2tncm91bmQ6IHZhcigtLXN1cmZhY2UpO1xufVxuXG5cbiNsZWdlbmQtYm91bmRhcnkge1xuICAtLWxlZ2VuZC13aWR0aDogNDAwcHg7XG4gIC0tYm9yZGVyLXdpZHRoOiAycHg7XG4gIC0taGFuZGxlLXdpZHRoOiAyMHB4O1xuXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG4gIHJpZ2h0OiBjYWxjKC0xICogdmFyKC0tbGVnZW5kLXdpZHRoKSAtIHZhcigtLWJvcmRlci13aWR0aCkpO1xuICBoZWlnaHQ6IDEwMCU7XG4gIHdpZHRoOiBjYWxjKDIgKiB2YXIoLS1sZWdlbmQtd2lkdGgpICsgdmFyKC0taGFuZGxlLXdpZHRoKSk7XG5cbiAgI2xlZ2VuZC1jb250YWluZXIge1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICB6LWluZGV4OiAxO1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICB3aWR0aDogZml0LWNvbnRlbnQ7XG4gICAgbGVmdDogY2FsYyh2YXIoLS1sZWdlbmQtd2lkdGgpIC0gdmFyKC0tYm9yZGVyLXdpZHRoKSk7XG4gICAgcG9pbnRlci1ldmVudHM6IGFsbDtcbiAgICBoZWlnaHQ6IDEwMCU7XG4gIH1cblxuICAjbGVnZW5kLWhhbmRsZSB7XG4gICAgd2lkdGg6IHZhcigtLWhhbmRsZS13aWR0aCk7XG4gICAgdGV4dC1vcmllbnRhdGlvbjogdXByaWdodDtcbiAgICB3cml0aW5nLW1vZGU6IHZlcnRpY2FsLWxyO1xuXG4gICAgYm9yZGVyLXJhZGl1czogOC41cHggMCAwIDguNXB4O1xuICAgIGJhY2tncm91bmQ6IGNvbG9yLW1peChpbiBzcmdiLCB2YXIoLS1zdXJmYWNlKSA4MCUsIHRyYW5zcGFyZW50KTtcbiAgICBiYWNrZHJvcC1maWx0ZXI6IGJsdXIoNXB4KTtcbiAgICBib3JkZXItbGVmdDogdmFyKC0tYm9yZGVyLXdpZHRoKSBzb2xpZCB2YXIoLS1wcmltYXJ5KTtcbiAgICBib3JkZXItdG9wOiB2YXIoLS1ib3JkZXItd2lkdGgpIHNvbGlkIHZhcigtLXByaW1hcnkpO1xuICAgIGJvcmRlci1ib3R0b206IHZhcigtLWJvcmRlci13aWR0aCkgc29saWQgdmFyKC0tcHJpbWFyeSk7XG4gICAgYm9yZGVyLXJpZ2h0OiAwO1xuICAgIGN1cnNvcjogZXctcmVzaXplO1xuICAgIGNvbG9yOiB2YXIoLS1vbi1zdXJmYWNlKTtcbiAgfVxuXG4gICNsZWdlbmQge1xuICAgIHdpZHRoOiB2YXIoLS1sZWdlbmQtd2lkdGgpO1xuICAgIGhlaWdodDogMTAwJTtcbiAgICAvL2JvcmRlci1sZWZ0OiB2YXIoLS1ib3JkZXItd2lkdGgpIHNvbGlkIHZhcigtLXByaW1hcnkpO1xuICAgIGJhY2tncm91bmQ6IGNvbG9yLW1peChpbiBzcmdiLCB2YXIoLS1zdXJmYWNlKSA4MCUsIHRyYW5zcGFyZW50KTtcbiAgICBiYWNrZHJvcC1maWx0ZXI6IGJsdXIoNXB4KTtcblxuICAgICY6YmVmb3JlIHtcbiAgICAgIGNvbnRlbnQ6IFwiXCI7XG4gICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICB3aWR0aDogMnB4O1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tcHJpbWFyeSk7XG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICBsZWZ0OiAtMXB4O1xuICAgICAgei1pbmRleDogNDtcbiAgICB9XG4gIH1cbn1cblxuLmRyYWctY29udGFpbmVyIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBsZWZ0OiAxMCU7IC8vIEltcG9ydGFudDogSW5pdGlhbCBwb3NpdGlvbiBvZiBjb21wYXJlIGRyYWcgaGFuZGxlXG4gIHdpZHRoOiAxMDAlO1xuICBwb2ludGVyLWV2ZW50czogYWxsO1xuICAvL3Bvc2l0aW9uOiByZWxhdGl2ZTtcbiAgei1pbmRleDogMTtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgaGVpZ2h0OiAxMDAlO1xufVxuXG4jaGFuZGxlLWxpbWl0cyB7XG4gIC0td2lkdGg6IDUwMHB4O1xuICAtLWhlaWdodDogNTAwcHg7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgbGVmdDogY2FsYygtMSAvIDIgKiB2YXIoLS13aWR0aCkpO1xuICB0b3A6IGNhbGMoNTAlIC0gMSAvIDIgKiB2YXIoLS1oZWlnaHQpKTtcbiAgd2lkdGg6IHZhcigtLXdpZHRoKTtcbiAgaGVpZ2h0OiB2YXIoLS1oZWlnaHQpO1xuICAvL2JhY2tncm91bmQ6IzAwMDAwMGFhO1xuICB6LWluZGV4OiA1O1xuICBwb2ludGVyLWV2ZW50czogbm9uZTtcblxuICAmLmFjdGl2ZSB7XG4gICAgcG9pbnRlci1ldmVudHM6IGFsbDtcbiAgICBjdXJzb3I6IGV3LXJlc2l6ZTtcbiAgfVxufVxuXG4uZHJhZy1oYW5kbGUge1xuICAtLXdpZHRoOiA0cHg7XG4gIC0taGVpZ2h0OiAzMHB4O1xuXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgbGVmdDogY2FsYyg1MCUgLSAxIC8gMiAqIHZhcigtLXdpZHRoKSAtIDRweCk7XG4gIHRvcDogY2FsYyg1MCUgLSAxIC8gMiAqIHZhcigtLWhlaWdodCkgLSA0cHgpO1xuXG4gIGJvcmRlci1yYWRpdXM6IHZhcigtLWhlaWdodCk7XG4gIHdpZHRoOiB2YXIoLS13aWR0aCk7XG4gIGhlaWdodDogdmFyKC0taGVpZ2h0KTtcbiAgYm9yZGVyOiA0cHggc29saWQgdmFyKC0tcHJpbWFyeSk7XG4gIGN1cnNvcjogZXctcmVzaXplO1xuICBjb2xvcjogdmFyKC0tb24tc3VyZmFjZSk7XG4gIHBvaW50ZXItZXZlbnRzOiBhbGw7XG4gIGZpbHRlcjogZHJvcC1zaGFkb3coLTJweCAwcHggMHB4IHZhcigtLXByaW1hcnktY29udGFpbmVyKSkgZHJvcC1zaGFkb3coMnB4IDBweCAwcHggdmFyKC0tZXJyb3ItY29udGFpbmVyKSk7XG4gIGJhY2tncm91bmQ6IHZhcigtLXN1cmZhY2UpO1xuXG59XG5cblxuI2N5dG9zY2FwZS1jb21wYXJlIHtcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICAvL2JvcmRlci1sZWZ0OiA0cHggc29saWQgdmFyKC0tZXJyb3IpO1xuICBoZWlnaHQ6IDEwMCU7XG4gIHdpZHRoOiAxMDAlO1xuICBpbnNldDogMCAwIDAgMDtcbiAgYmFja2dyb3VuZC1jb2xvcjogY29sb3ItbWl4KGluIHNyZ2IsIHZhcigtLWVycm9yKSA1JSwgY29sb3ItbWl4KGluIHNyZ2IsIHZhcigtLXN1cmZhY2UpIDUwJSwgdHJhbnNwYXJlbnQpKTtcblxuICAmOmJlZm9yZSB7XG4gICAgY29udGVudDogXCJcIjtcbiAgICBoZWlnaHQ6IDEwMCU7XG4gICAgd2lkdGg6IDRweDtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1wcmltYXJ5KTtcbiAgICBmaWx0ZXI6IGRyb3Atc2hhZG93KC0ycHggMHB4IDBweCB2YXIoLS1wcmltYXJ5LWNvbnRhaW5lcikpIGRyb3Atc2hhZG93KDJweCAwcHggMHB4IHZhcigtLWVycm9yLWNvbnRhaW5lcikpO1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBsZWZ0OiAtMnB4O1xuICAgIHotaW5kZXg6IDQ7XG4gIH1cbn1cblxuLm9wdGlvbi1jb250ZW50IHtcbiAgd2lkdGg6IDEwMCU7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgZ2FwOiAxMDBweDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbn1cblxuLnBhbGV0dGUge1xuICAvL3dpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDIwcHg7XG4gIG1pbi13aWR0aDogMTAwcHg7XG4gIG1hcmdpbi1yaWdodDogMjBweDtcbn1cblxuIl0sInNvdXJjZVJvb3QiOiIifQ== */"]
  });
};
DiagramComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_35__.__decorate)([(0,_ngneat_until_destroy__WEBPACK_IMPORTED_MODULE_36__.UntilDestroy)({
  checkProperties: true
})], DiagramComponent);

/***/ }),

/***/ 9792:
/*!***************************************!*\
  !*** ./src/app/guard/legacy.guard.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   legacyGuard: () => (/* binding */ legacyGuard)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ 7947);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 1699);


const URL_PATTERN = /\/?(?<id>R-[A-Z]{3}-\d+)&?(?<params>.*)/;
const legacyGuard = (route, state) => {
  const router = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(_angular_router__WEBPACK_IMPORTED_MODULE_1__.Router);
  const {
    fragment,
    queryParams
  } = route;
  let params = {
    ...queryParams
  };
  let id = 'R-HSA-453279'; // Default routing
  if (fragment) {
    const match = fragment.match(URL_PATTERN);
    if (match && match.groups && match.groups['id']) {
      if (match.groups['id']) {
        id = match.groups['id'];
      }
      if (match.groups['params']) {
        match.groups['params'].split("&").map(param => param.split("=")).forEach(([key, value]) => {
          params[key] = value || true;
        });
      }
    }
    return router.navigate([id], {
      fragment: undefined,
      queryParams: params
    });
  }
  return router.navigate([id]); // Default routing
};

/***/ }),

/***/ 9049:
/*!********************************************************!*\
  !*** ./src/app/interactors/common/overlay-resource.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ResourceType: () => (/* binding */ ResourceType)
/* harmony export */ });
var ResourceType;
(function (ResourceType) {
  ResourceType["STATIC"] = "IntAct";
  ResourceType["DISGENET"] = "DisGeNet";
  ResourceType["PSICQUIC"] = "PSICQUIC";
  ResourceType["CUSTOM"] = "custom";
})(ResourceType || (ResourceType = {}));

/***/ }),

/***/ 2373:
/*!********************************************************************************************!*\
  !*** ./src/app/interactors/custom-interactor-dialog/custom-interactor-dialog.component.ts ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CustomInteractorDialogComponent: () => (/* binding */ CustomInteractorDialogComponent)
/* harmony export */ });
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ 8849);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 7835);
/* harmony import */ var _angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core/rxjs-interop */ 839);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/dialog */ 7401);
/* harmony import */ var _model_interactor_entity_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../model/interactor-entity.model */ 2402);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _services_interactor_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/interactor.service */ 7364);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ 6575);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/button */ 895);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/input */ 26);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/form-field */ 1333);
/* harmony import */ var _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/progress-spinner */ 3910);
/* harmony import */ var _angular_material_tabs__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/tabs */ 989);
/* harmony import */ var _angular_material_radio__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/radio */ 2106);
/* harmony import */ var _angular_material_components_file_input__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular-material-components/file-input */ 7892);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/icon */ 6515);


















function CustomInteractorDialogComponent_mat_error_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx_r0.errorMessage);
  }
}
function CustomInteractorDialogComponent_mat_radio_button_14_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "mat-radio-button", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const item_r6 = ctx.$implicit;
    const i_r7 = ctx.index;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("value", item_r6.name)("checked", i_r7 === 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"]("", item_r6.content, " ");
  }
}
function CustomInteractorDialogComponent_mat_form_field_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "mat-form-field", 10)(1, "ngx-mat-file-input", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("change", function CustomInteractorDialogComponent_mat_form_field_15_Template_ngx_mat_file_input_change_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r9);
      const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r8.onFileChange($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "mat-icon", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3, "folder");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "mat-hint")(5, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](6, "Upload a file stored locally on your computer.");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("multiple", false);
  }
}
function CustomInteractorDialogComponent_mat_form_field_16_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "mat-form-field", 10)(1, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2, "Copy & paste your data here");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](3, "textarea", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "mat-hint")(5, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](6, "Copy and paste your data in columns.");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
  }
}
function CustomInteractorDialogComponent_mat_form_field_17_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "mat-form-field", 10)(1, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2, "URL");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](3, "input", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "mat-hint")(5, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](6, "Upload a publicly accessible data though its URL.");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
  }
}
function CustomInteractorDialogComponent_mat_spinner_32_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](0, "mat-spinner", 22);
  }
}
class CustomInteractorDialogComponent {
  constructor(interactorService, dialogRef, fb, data) {
    this.interactorService = interactorService;
    this.dialogRef = dialogRef;
    this.fb = fb;
    this.data = data;
    this.name = new _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormControl('', [_angular_forms__WEBPACK_IMPORTED_MODULE_3__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.Validators.pattern(/^[a-zA-Z_]+[a-zA-Z0-9_]*$/)]);
    this.errorMessage = '';
    this.tabId = 'data'; // Default value
    this.selectedValue = 'form'; // Default value
    this.isDataLoading = false;
    this.resource = new _model_interactor_entity_model__WEBPACK_IMPORTED_MODULE_0__.Resource();
    this.items = [{
      'name': 'form',
      'content': 'File'
    }, {
      'name': 'content',
      'content': 'Copy & Paste'
    }, {
      'name': 'url',
      'content': 'URL'
    }];
    this.formGroupValidator = control => {
      const fileValue = control.value.form;
      const contentValue = control.value.content;
      const urlValue = control.value.url;
      const psicquicUrlValue = control.value.psicquicUrl;
      if (fileValue || contentValue || urlValue || psicquicUrlValue) {
        return null;
      } else {
        return {
          invalid: true
        };
      }
    };
    this.resourceForm = this.fb.group({
      selectedValue: [''],
      form: [''],
      content: [''],
      url: [''],
      psicquicUrl: ['']
    }, {
      validators: this.formGroupValidator
    });
    (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.merge)(this.name.statusChanges, this.name.valueChanges).pipe((0,_angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_5__.takeUntilDestroyed)()).subscribe(() => this.updateErrorMessage());
  }
  ngOnInit() {
    this.cy = this.data.cy;
  }
  updateErrorMessage() {
    if (this.name.hasError('required')) {
      this.errorMessage = 'You must enter a name';
    } else if (this.name.hasError('pattern')) {
      this.errorMessage = 'Name can only contain letters';
    } else {
      this.errorMessage = '';
    }
  }
  onTabChange($event) {
    this.tabId = $event.tab.ariaLabelledby;
  }
  onItemChange($event) {
    this.selectedValue = $event.value;
  }
  onFileChange($event) {
    const inputElement = $event.target;
    if (inputElement.files && inputElement.files.length) {
      const file = inputElement.files[0]; // Single file upload
      this.resourceForm.patchValue({
        form: file
      });
    }
  }
  submit() {
    this.isDataLoading = true;
    const userInput = this.getInputs();
    if (userInput) {
      this.interactorService.getInteractorsFromToken(this.name.value, userInput.url, userInput.content, this.cy).subscribe(result => {
        this.interactorService.addInteractorOccurrenceNode(result.interactors, this.cy, result.interactors.resource);
        this.resource.token = result.token;
        this.isDataLoading = false;
        this.dialogRef.close();
      });
    }
  }
  getInputs() {
    const input = new _model_interactor_entity_model__WEBPACK_IMPORTED_MODULE_0__.InputCategory();
    const formValue = this.resourceForm.value;
    if (this.tabId === 'data') {
      input.url = this.interactorService.UPLOAD_URL + this.selectedValue;
      input.content = formValue[this.selectedValue];
      if (this.selectedValue === this.items[0].name) {
        // Prepare formdata when file is uploaded
        input.content = this.prepareFormData(formValue.form);
      }
    }
    if (this.tabId === 'psicquic') {
      input.url = this.interactorService.UPLOAD_PSICQUIC_URL;
      input.content = formValue.psicquicUrl;
    }
    return input;
  }
  prepareFormData(formControl) {
    const formData = new FormData();
    formData.append("file", formControl);
    return formData;
  }
  static #_ = this.ɵfac = function CustomInteractorDialogComponent_Factory(t) {
    return new (t || CustomInteractorDialogComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_services_interactor_service__WEBPACK_IMPORTED_MODULE_1__.InteractorService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_6__.MatDialogRef), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormBuilder), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_6__.MAT_DIALOG_DATA));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
    type: CustomInteractorDialogComponent,
    selectors: [["cr-custom-interactor-dialog"]],
    decls: 33,
    vars: 9,
    consts: [["mat-dialog-title", ""], [3, "formGroup"], ["matInput", "", "required", "", 3, "formControl", "blur"], [4, "ngIf"], [3, "selectedTabChange"], ["label", "Add your data", "aria-labelledby", "data"], [3, "change"], ["class", "margin", 3, "value", "checked", 4, "ngFor", "ngForOf"], ["class", "full-width", 4, "ngIf"], ["label", "Add your PSICQUIC service", "aria-labelledby", "psicquic"], [1, "full-width"], ["matInput", "", "formControlName", "psicquicUrl"], ["align", "end"], ["mat-flat-button", "", "color", "primary", "mat-dialog-close", ""], ["mat-flat-button", "", "color", "primary", "type", "submit", 3, "disabled", "click"], [1, "button-row"], ["class", "spinner-color", "diameter", "20", 4, "ngIf"], [1, "margin", 3, "value", "checked"], ["formControlName", "form", 3, "multiple", "change"], ["ngxMatFileInputIcon", ""], ["matInput", "", "formControlName", "content"], ["matInput", "", "formControlName", "url"], ["diameter", "20", 1, "spinner-color"]],
    template: function CustomInteractorDialogComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "h2", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "Add a new resource");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "mat-dialog-content")(3, "form", 1)(4, "div")(5, "mat-form-field")(6, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](7, "Name");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](8, "input", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("blur", function CustomInteractorDialogComponent_Template_input_blur_8_listener() {
          return ctx.updateErrorMessage();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](9, CustomInteractorDialogComponent_mat_error_9_Template, 2, 1, "mat-error", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](10, "mat-tab-group", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("selectedTabChange", function CustomInteractorDialogComponent_Template_mat_tab_group_selectedTabChange_10_listener($event) {
          return ctx.onTabChange($event);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](11, "mat-tab", 5)(12, "section")(13, "mat-radio-group", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("change", function CustomInteractorDialogComponent_Template_mat_radio_group_change_13_listener($event) {
          return ctx.onItemChange($event);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](14, CustomInteractorDialogComponent_mat_radio_button_14_Template, 2, 3, "mat-radio-button", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](15, CustomInteractorDialogComponent_mat_form_field_15_Template, 7, 1, "mat-form-field", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](16, CustomInteractorDialogComponent_mat_form_field_16_Template, 7, 0, "mat-form-field", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](17, CustomInteractorDialogComponent_mat_form_field_17_Template, 7, 0, "mat-form-field", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](18, "mat-tab", 9)(19, "mat-form-field", 10)(20, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](21, "URL");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](22, "input", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](23, "mat-hint")(24, "strong");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](25, "Add your custom PSICQUIC service through its URL.");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](26, "mat-dialog-actions", 12)(27, "button", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](28, "Close");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](29, "button", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function CustomInteractorDialogComponent_Template_button_click_29_listener() {
          return ctx.submit();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](30, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](31, " Submit ");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](32, CustomInteractorDialogComponent_mat_spinner_32_Template, 1, 0, "mat-spinner", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()()()();
      }
      if (rf & 2) {
        let tmp_2_0;
        let tmp_7_0;
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("formGroup", ctx.resourceForm);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("formControl", ctx.name);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", (tmp_2_0 = ctx.resourceForm.get("name")) == null ? null : tmp_2_0.invalid);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx.items);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.selectedValue === "form");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.selectedValue === "content");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.selectedValue === "url");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](12);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("disabled", ctx.resourceForm.invalid && !((tmp_7_0 = ctx.resourceForm.get("name")) == null ? null : tmp_7_0.invalid));
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.isDataLoading);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_7__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_7__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.RequiredValidator, _angular_material_button__WEBPACK_IMPORTED_MODULE_8__.MatButton, _angular_material_input__WEBPACK_IMPORTED_MODULE_9__.MatInput, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_10__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_10__.MatLabel, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_10__.MatHint, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_10__.MatError, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormControlDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormControlName, _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_11__.MatProgressSpinner, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_6__.MatDialogClose, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_6__.MatDialogTitle, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_6__.MatDialogContent, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_6__.MatDialogActions, _angular_material_tabs__WEBPACK_IMPORTED_MODULE_12__.MatTab, _angular_material_tabs__WEBPACK_IMPORTED_MODULE_12__.MatTabGroup, _angular_material_radio__WEBPACK_IMPORTED_MODULE_13__.MatRadioGroup, _angular_material_radio__WEBPACK_IMPORTED_MODULE_13__.MatRadioButton, _angular_material_components_file_input__WEBPACK_IMPORTED_MODULE_14__.NgxMatFileInputComponent, _angular_material_components_file_input__WEBPACK_IMPORTED_MODULE_14__.NgxMatFileInputIcon, _angular_material_icon__WEBPACK_IMPORTED_MODULE_15__.MatIcon],
    styles: [".margin[_ngcontent-%COMP%] {\n  margin: 0 10px;\n}\n\n.full-width[_ngcontent-%COMP%] {\n  width: 100%;\n}\n\n.button-row[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-around;\n  gap: 8px;\n}\n\n.spinner-color[_ngcontent-%COMP%]  circle {\n  stroke: var(--on-primary) !important;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvaW50ZXJhY3RvcnMvY3VzdG9tLWludGVyYWN0b3ItZGlhbG9nL2N1c3RvbS1pbnRlcmFjdG9yLWRpYWxvZy5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGNBQUE7QUFDRjs7QUFFQTtFQUNFLFdBQUE7QUFDRjs7QUFFQTtFQUNFLGFBQUE7RUFDQSw2QkFBQTtFQUNBLFFBQUE7QUFDRjs7QUFFQTtFQUNJLG9DQUFBO0FBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyIubWFyZ2luIHtcbiAgbWFyZ2luOiAwIDEwcHg7XG59XG5cbi5mdWxsLXdpZHRoIHtcbiAgd2lkdGg6IDEwMCU7XG59XG5cbi5idXR0b24tcm93IHtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XG4gIGdhcDogOHB4O1xufVxuXG4uc3Bpbm5lci1jb2xvcjo6bmctZGVlcCBjaXJjbGUge1xuICAgIHN0cm9rZTogdmFyKC0tb24tcHJpbWFyeSkgIWltcG9ydGFudDtcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0= */"]
  });
}

/***/ }),

/***/ 538:
/*!**********************************************************!*\
  !*** ./src/app/interactors/layout/interactors-layout.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class InteractorsLayout {
  static #_ = this.MAX_INTERACTORS = 18;
  static #_2 = this.BOX_WIDTH = 45;
  static #_3 = this.BOX_HEIGHT = 20;
  static #_4 = this.SEPARATION = Math.round(this.BOX_HEIGHT * 1.5);
  static #_5 = this.MIN_HEIGHT = 2 * (2 * this.BOX_HEIGHT + this.SEPARATION);
  static #_6 = this.MIN_WIDTH = 2 * (2 * this.BOX_WIDTH + this.SEPARATION);
  constructor() {}
  static getNumberOfInteractorsToDraw(interactors) {
    if (interactors == null) return 0;
    return Math.min(interactors.length, InteractorsLayout.MAX_INTERACTORS);
  }
  getSegmentOrigin(edgeIndex, center, width, height) {
    edgeIndex = edgeIndex % 4;
    return {
      x: center.x + width / 2 * (edgeIndex === 1 || edgeIndex === 2 ? 1 : -1),
      y: center.y + height / 2 * (edgeIndex > 1 ? 1 : -1)
    };
  }
  getCentre(minX, maxX, minY, maxY) {
    return {
      x: minX + (maxX - minX) / 2.0,
      y: minY + (maxY - minY) / 2.0
    };
  }
  interpolateInLayout(segment, pos, totalPositions) {
    const r = pos / totalPositions;
    return {
      x: segment.from.x + r * (segment.to.x - segment.from.x),
      y: segment.from.y + r * (segment.to.y - segment.from.y)
    };
  }
  getPosition(targetNode, interactorIndex, numberToDraw) {
    const centerPosition = targetNode.data('entity').position();
    const lp = LayoutParameter.calculate(numberToDraw);
    let edgeNodes = lp.nodeOnTop;
    let nodeCount = 0;
    let prevNodeCount = 0;
    let edgeIndex;
    const nodePerEdges = [lp.nodeOnTop, lp.nodeOnRight, lp.nodeOnBottom, lp.nodeOnLeft];
    for (edgeIndex = 0; edgeIndex < nodePerEdges.length; edgeIndex++) {
      edgeNodes = nodePerEdges[edgeIndex];
      prevNodeCount = nodeCount;
      nodeCount += edgeNodes - 1;
      if (interactorIndex < nodeCount) {
        break;
      }
    }
    const edgePos = interactorIndex - prevNodeCount;
    const pos = this.interpolateInLayout(
    // new Segment(
    {
      from: this.getSegmentOrigin(edgeIndex, centerPosition, lp.width, lp.height),
      to: this.getSegmentOrigin(edgeIndex + 1, centerPosition, lp.width, lp.height)
    },
    //  ),
    edgePos, edgeNodes - 1);
    const minX = pos.x - InteractorsLayout.BOX_WIDTH;
    const maxX = pos.x + InteractorsLayout.BOX_WIDTH;
    const minY = pos.y - InteractorsLayout.BOX_HEIGHT;
    const maxY = pos.y + InteractorsLayout.BOX_HEIGHT;
    return this.getCentre(minX, maxX, minY, maxY);
  }
}
class LayoutParameter {
  constructor(nodeOnLeft, nodeOnRight, nodeOnTop, nodeOnBottom, width, height) {
    this.nodeOnLeft = nodeOnLeft;
    this.nodeOnRight = nodeOnRight;
    this.nodeOnTop = nodeOnTop;
    this.nodeOnBottom = nodeOnBottom;
    this.width = width;
    this.height = height;
  }
  static calculate(n) {
    const rationalNodePerEdge = n / 4 + 1;
    const baseNodePerEdge = Math.floor(rationalNodePerEdge);
    const remaining = Math.round((rationalNodePerEdge - baseNodePerEdge) * 4);
    const nodeOnLeft = baseNodePerEdge + (remaining > 0 ? 1 : 0);
    const nodeOnRight = baseNodePerEdge + (remaining > 1 ? 1 : 0);
    const nodeOnTop = baseNodePerEdge + (remaining > 2 ? 1 : 0);
    const nodeOnBottom = baseNodePerEdge;
    const height = Math.max((2 * InteractorsLayout.BOX_HEIGHT + InteractorsLayout.SEPARATION) * (nodeOnLeft - 1), InteractorsLayout.MIN_HEIGHT);
    const width = Math.max((2 * InteractorsLayout.BOX_WIDTH + InteractorsLayout.SEPARATION) * (nodeOnTop - 1), InteractorsLayout.MIN_WIDTH);
    return new LayoutParameter(nodeOnLeft, nodeOnRight, nodeOnTop, nodeOnBottom, width, height);
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (InteractorsLayout);

/***/ }),

/***/ 2402:
/*!**************************************************************!*\
  !*** ./src/app/interactors/model/interactor-entity.model.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   InputCategory: () => (/* binding */ InputCategory),
/* harmony export */   Resource: () => (/* binding */ Resource)
/* harmony export */ });
class InputCategory {}
class Resource {}

/***/ }),

/***/ 7364:
/*!************************************************************!*\
  !*** ./src/app/interactors/services/interactor.service.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   InteractorService: () => (/* binding */ InteractorService)
/* harmony export */ });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common/http */ 4860);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ 1891);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ 9736);
/* harmony import */ var _layout_interactors_layout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../layout/interactors-layout */ 538);
/* harmony import */ var _common_overlay_resource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/overlay-resource */ 9049);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../environments/environment */ 553);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _services_diagram_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/diagram.service */ 378);








class InteractorService {
  constructor(http, diagramService) {
    this.http = http;
    this.diagramService = diagramService;
    this.PREFIX_INTERACTOR = `${_environments_environment__WEBPACK_IMPORTED_MODULE_2__.environment.host}/ContentService/interactors/`;
    this.PREFIX_DISEASE = `${_environments_environment__WEBPACK_IMPORTED_MODULE_2__.environment.host}/overlays/disgenet/`;
    this.STATIC_URL = this.PREFIX_INTERACTOR + 'static/molecules/details';
    this.PSICQUIC_RESOURCE_URL = this.PREFIX_INTERACTOR + 'psicquic/resources/';
    this.PSICQUIC_URL = this.PREFIX_INTERACTOR + 'psicquic/molecules/';
    this.UPLOAD_URL = this.PREFIX_INTERACTOR + 'upload/tuple/';
    this.UPLOAD_PSICQUIC_URL = this.PREFIX_INTERACTOR + 'upload/psicquic/url';
    this.TOKEN_URL = this.PREFIX_INTERACTOR + 'token/';
    this.DISGENET_URL = this.PREFIX_DISEASE + 'findByGenes';
    this.DEFAULT_INTERACTOR_WIDTH = 100;
    this.DEFAULT_DISGENET_WIDTH = 250;
    this.INTERACTOR_PADDING = 20;
    this.CHAR_WIDTH = 10;
    this.CHAR_HEIGHT = 12;
    this.GENE_DECORATION_HEIGHT = 20;
    this.identifiers = '';
    this.cyToSelectedResource = new Map();
  }
  getAllIdentifiers(cy) {
    this.identifiers = this.getIdentifiersFromGraph(cy);
  }
  updateIdentifiersIfNeeded(cy) {
    if (!this.identifiers) {
      this.getAllIdentifiers(cy);
    }
  }
  getIdentifiersFromGraph(cy) {
    const graphNodes = cy?.nodes(`[graph]`);
    const result = [];
    graphNodes?.forEach(entity => {
      const schemaClass = entity.data("graph").schemaClass;
      if (schemaClass === "EntityWithAccessionedSequence" || schemaClass === "SimpleEntity") {
        result.push(entity.data("acc"));
      }
    });
    // Concatenate elements from the set values into a single string
    return [...new Set(result)].join(',');
  }
  getInteractorData(cy, resource) {
    this.updateIdentifiersIfNeeded(cy);
    let url;
    if (resource === _common_overlay_resource__WEBPACK_IMPORTED_MODULE_1__.ResourceType.STATIC) {
      url = this.STATIC_URL;
    } else if (resource === _common_overlay_resource__WEBPACK_IMPORTED_MODULE_1__.ResourceType.DISGENET) {
      url = this.DISGENET_URL;
    } else {
      url = this.PSICQUIC_URL + resource.toLowerCase() + '/details';
    }
    return this.http.post(url, this.identifiers, {
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_4__.HttpHeaders({
        'Content-Type': 'text/plain'
      })
    });
  }
  addInteractorOccurrenceNode(interactors, cy, resource) {
    if (this.cyToSelectedResource.has(cy) && this.cyToSelectedResource.get(cy) !== resource) {
      const previousResource = this.cyToSelectedResource.get(cy);
      cy.elements(`[resource='${previousResource}']`).remove();
      this.createInteractorOccurrenceNode(interactors, cy, resource);
      this.cyToSelectedResource.set(cy, resource);
    } else if (!this.cyToSelectedResource.has(cy)) {
      this.createInteractorOccurrenceNode(interactors, cy, resource);
      this.cyToSelectedResource.set(cy, resource);
    }
  }
  createInteractorOccurrenceNode(interactors, cy, resource) {
    const classes = resource === _common_overlay_resource__WEBPACK_IMPORTED_MODULE_1__.ResourceType.DISGENET ? ['InteractorOccurrences', 'disease'] : ['InteractorOccurrences'];
    if (interactors.entities === undefined) return;
    interactors.entities.filter(interactorEntity => interactorEntity.count > 0).forEach(interactorEntity => {
      const entities = cy?.nodes(`[acc = '${interactorEntity.acc}']`);
      entities?.forEach(entityNode => {
        const pos = {
          ...entityNode.position()
        };
        pos.x += entityNode.width() / 2;
        pos.y -= entityNode.height() / 2;
        const id = entityNode.id() + '-occ' + '-' + resource.toLowerCase();
        if (!entityNode.classes().includes('Modification')) {
          const occurrenceNode = cy?.add({
            data: {
              ...entityNode.data(),
              id: id,
              displayName: interactorEntity.count,
              entity: entityNode,
              interactors: interactorEntity.interactors,
              resource: resource
            },
            classes: classes,
            pannable: true,
            grabbable: false,
            position: pos
          });
          entityNode.data('occurrence', occurrenceNode);
        }
      });
    });
  }
  removeInteractorNodes(occurrenceNode) {
    const entityNode = occurrenceNode.data('entity');
    const interactors = entityNode.closedNeighborhood('node.Interactor');
    entityNode.connectedEdges('.Interactor').remove();
    interactors.forEach(interactor => {
      if (interactor.connectedEdges().empty()) {
        interactor.remove();
      }
    });
  }
  addInteractorNodes(occurrenceNode, cy) {
    const interactorsData = occurrenceNode.data('interactors');
    const resource = occurrenceNode.data('resource');
    _layout_interactors_layout__WEBPACK_IMPORTED_MODULE_0__["default"].BOX_WIDTH = resource === _common_overlay_resource__WEBPACK_IMPORTED_MODULE_1__.ResourceType.DISGENET ? this.DEFAULT_DISGENET_WIDTH / 2 : this.DEFAULT_INTERACTOR_WIDTH / 2;
    const numberToAdd = _layout_interactors_layout__WEBPACK_IMPORTED_MODULE_0__["default"].getNumberOfInteractorsToDraw(interactorsData);
    const [dynamicInteractors, existingInteractors] = this.getAllInteractors(interactorsData, cy, numberToAdd);
    const allNodes = [...dynamicInteractors, ...existingInteractors];
    cy.batch(() => {
      const nodes = this.createInteractorNodes(dynamicInteractors, occurrenceNode, cy, dynamicInteractors.length, resource);
      this.createInteractorEdges(allNodes, occurrenceNode, cy, resource);
      this.displayInteractors(nodes, cy);
    });
  }
  getAllInteractors(interactorsData, cy, numberToAdd) {
    const dynamicInteractors = [];
    const existingInteractors = [];
    // get interactors to draw with a provided a number, collect existing interactors for creating edge
    for (const interactor of interactorsData) {
      const diagramNodes = cy?.nodes(`.PhysicalEntity[acc = '${interactor.acc}']`);
      if (!diagramNodes || diagramNodes.length === 0) {
        dynamicInteractors.push(interactor);
      } else {
        interactor.existingNodes = diagramNodes;
        existingInteractors.push(interactor);
      }
    }
    return [dynamicInteractors.slice(0, numberToAdd), existingInteractors];
  }
  createInteractorNodes(interactorsData, targetNode, cy, numberToAdd, resource) {
    const interactorNodes = [];
    const interactorLayout = new _layout_interactors_layout__WEBPACK_IMPORTED_MODULE_0__["default"]();
    interactorsData.forEach((interactor, index) => {
      const position = interactorLayout.getPosition(targetNode, index, numberToAdd);
      const displayName = interactor.alias ? interactor.alias : interactor.acc;
      const defaultType = ['Protein', 'PhysicalEntity']; // Default interactor type for custom resource when there is no type data provided
      const classes = resource === _common_overlay_resource__WEBPACK_IMPORTED_MODULE_1__.ResourceType.DISGENET ? ['PhysicalEntity', 'Interactor', 'disease'] : [...(this.diagramService.nodeTypeMap.get(interactor.type) || defaultType), 'Interactor'];
      let width = resource === _common_overlay_resource__WEBPACK_IMPORTED_MODULE_1__.ResourceType.DISGENET ? this.DEFAULT_DISGENET_WIDTH : this.DEFAULT_INTERACTOR_WIDTH;
      let height = this.CHAR_HEIGHT + 2 * this.INTERACTOR_PADDING;
      if (interactor.type === 'Gene') height += this.GENE_DECORATION_HEIGHT;
      const id = 'interactor-' + interactor.acc;
      interactorNodes.push({
        data: {
          ...targetNode.data(),
          id: id,
          displayName: displayName.replace(/([/,:;-])/g, "$1\u200b"),
          html: this.diagramService.getStructureVideoHtml({
            id,
            type: interactor.type
          }, width, height, interactor.acc),
          width: width,
          height: height,
          accURL: interactor.accURL,
          score: interactor.score,
          evidences: interactor.evidences,
          evidenceURLs: interactor.evidencesURL,
          resource: resource
        },
        classes: classes,
        position: position,
        selectable: false
      });
    });
    return cy?.add(interactorNodes);
  }
  createInteractorEdges(interactorsData, occurrenceNode, cy, resource) {
    if (!cy) return;
    const resourceClass = resource === _common_overlay_resource__WEBPACK_IMPORTED_MODULE_1__.ResourceType.DISGENET ? ['Interactor', 'disease'] : ['Interactor'];
    const interactorEdges = [];
    interactorsData.forEach(interactor => {
      const entity = occurrenceNode.data('entity');
      const targetNodes = interactor.existingNodes ? interactor.existingNodes : [cy.getElementById('interactor-' + interactor.acc)];
      targetNodes.forEach(targetNode => {
        interactorEdges.push({
          data: {
            ...targetNode.data(),
            id: interactor.acc + '-' + entity.id(),
            source: entity.id(),
            target: targetNode.id(),
            edgeToTarget: occurrenceNode.id(),
            evidenceURLs: interactor.evidencesURL,
            resource: resource
          },
          classes: resourceClass,
          selectable: false
        });
      });
    });
    cy?.add(interactorEdges);
  }
  displayInteractors(interactorsToDisplay, cy) {
    let layoutOptions = {
      name: 'preset',
      fit: false
    };
    interactorsToDisplay.layout(layoutOptions).run();
  }
  removeInteractorEdges(targetNode, cy) {
    const edgesToRemove = cy.edges(`[edgeToTarget = '${targetNode.id()}']`);
    edgesToRemove.remove();
  }
  getPsicquicResources() {
    return this.http.get(this.PSICQUIC_RESOURCE_URL, {
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_4__.HttpHeaders({
        'Content-Type': 'application/json;charset=UTF-8'
      })
    });
  }
  getInteractorToken(name, url, body) {
    return this.http.post(url, body, {
      params: new _angular_common_http__WEBPACK_IMPORTED_MODULE_4__.HttpParams().set('name', name)
    });
  }
  getInteractorsWithToken(name, url, body, cy) {
    this.updateIdentifiersIfNeeded(cy);
    return this.getInteractorToken(name, url, body).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_5__.switchMap)(token => {
      return this.http.post(this.TOKEN_URL + token.summary.token, this.identifiers, {
        headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_4__.HttpHeaders({
          'Content-Type': 'text/plain'
        })
      }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_6__.map)(interactors => ({
        token: token,
        interactors: interactors
      })));
    }));
  }
  getInteractorsFromToken(name, url, body, cy) {
    this.updateIdentifiersIfNeeded(cy);
    return this.getInteractorToken(name, url, body).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_5__.switchMap)(token => this.sendPostRequest(token, cy)));
  }
  sendPostRequest(token, cy) {
    this.updateIdentifiersIfNeeded(cy);
    return this.http.post(this.TOKEN_URL + token.summary.token, this.identifiers, {
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_4__.HttpHeaders({
        'Content-Type': 'text/plain'
      })
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_6__.map)(interactors => ({
      token: token,
      interactors: interactors
    })));
  }
  isCustomResource(resource, psiResource) {
    const isFromPSICQUIC = psiResource.filter(pr => pr.name != _common_overlay_resource__WEBPACK_IMPORTED_MODULE_1__.ResourceType.STATIC).some(r => r.name === resource);
    return resource != _common_overlay_resource__WEBPACK_IMPORTED_MODULE_1__.ResourceType.STATIC && resource != _common_overlay_resource__WEBPACK_IMPORTED_MODULE_1__.ResourceType.DISGENET && !isFromPSICQUIC;
  }
  static #_ = this.ɵfac = function InteractorService_Factory(t) {
    return new (t || InteractorService)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_4__.HttpClient), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_services_diagram_service__WEBPACK_IMPORTED_MODULE_3__.DiagramService));
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineInjectable"]({
    token: InteractorService,
    factory: InteractorService.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 7139:
/*!**********************************************!*\
  !*** ./src/app/services/analysis.service.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AnalysisService: () => (/* binding */ AnalysisService)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 9736);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 3317);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 1891);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ 4980);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ 3738);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs */ 2389);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../environments/environment */ 553);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common/http */ 4860);
/* harmony import */ var _diagram_state_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./diagram-state.service */ 6742);





class AnalysisService {
  constructor(http, state) {
    this.http = http;
    this.state = state;
    this.result$ = this.state.state$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.map)(state => state.analysis.value), (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.distinctUntilChanged)(), (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.switchMap)(token => token !== null ? token === this.result?.summary.token ? (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.of)(this.result) :
    // Same token as cache => use cache
    this.loadAnalysis(token) // Different token than cache => load result
    : (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.of)(undefined) // No tokens => No results
    ));
  }

  analyse(data, params) {
    return this.http.post(`${_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.host}/AnalysisService/identifiers/projection`, data, {
      params
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_6__.tap)(result => this.result = result), (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.tap)(result => this.state.set('analysis', result.summary.token)));
  }
  loadAnalysis(token, params) {
    console.log('load analysis');
    return this.http.get(`${_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.host}/AnalysisService/token/${token || this.state.get('analysis')}`, {
      params
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_6__.tap)(result => this.result = result));
  }
  foundEntities(pathway, token, resource = 'TOTAL') {
    return this.http.get(`${_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.host}/AnalysisService/token/${token || this.state.get('analysis')}/found/all/${pathway}`, {
      params: {
        resource
      }
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_7__.catchError)(() => (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.of)({
      pathway,
      foundEntities: 0,
      foundInteractors: 0,
      expNames: [],
      entities: [],
      interactors: [],
      resources: [resource]
    })));
  }
  pathwaysResults(pathwayIds, token, resource = 'TOTAL') {
    if (pathwayIds.length === 0) return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.of)([]);
    return this.http.post(`${_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.host}/AnalysisService/token/${token || this.state.get('analysis')}/filter/pathways`, pathwayIds.join(','), {
      params: {
        resource
      }
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_7__.catchError)(() => (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.of)([])));
  }
  example(name) {
    return this.http.get(`assets/data/analysis-examples/${name}.tsv`, {
      responseType: 'text'
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_4__.switchMap)(example => this.analyse(example)));
  }
  static #_ = this.ɵfac = function AnalysisService_Factory(t) {
    return new (t || AnalysisService)(_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_9__.HttpClient), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵinject"](_diagram_state_service__WEBPACK_IMPORTED_MODULE_1__.DiagramStateService));
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineInjectable"]({
    token: AnalysisService,
    factory: AnalysisService.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 4393:
/*!******************************************!*\
  !*** ./src/app/services/dark.service.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DarkService: () => (/* binding */ DarkService)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ 8071);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 1699);


class DarkService {
  constructor() {
    this._isDark = false;
    this.$_dark = new rxjs__WEBPACK_IMPORTED_MODULE_0__.BehaviorSubject(this._isDark);
    this.$dark = this.$_dark.asObservable();
    this._body = document.querySelector('body');
    // Update theme if other tabs are changing it
    // window.addEventListener('storage', (e) => {
    //   if (e.key === 'is-dark') this.isDark = JSON.parse(e.newValue || 'false');
    // });
    const localValue = localStorage.getItem('is-dark');
    if (localValue) this.isDark = JSON.parse(localValue);else if (window.matchMedia('(prefers-color-scheme)').media !== 'not all') {
      this.isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
  }
  get isDark() {
    return this._isDark;
  }
  set isDark(value) {
    this._isDark = value;
    localStorage.setItem('is-dark', JSON.stringify(value));
    if (value) this._body?.classList.add('dark');else this._body?.classList.remove('dark');
    this.$_dark.next(this._isDark);
  }
  static #_ = this.ɵfac = function DarkService_Factory(t) {
    return new (t || DarkService)();
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
    token: DarkService,
    factory: DarkService.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 6742:
/*!***************************************************!*\
  !*** ./src/app/services/diagram-state.service.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DiagramStateService: () => (/* binding */ DiagramStateService)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 8071);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 9736);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 3317);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 3738);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ 7178);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ 7947);




class DiagramStateService {
  constructor(route, router) {
    this.router = router;
    this.propagate = false;
    this.state = {
      select: {
        otherTokens: ['SEL'],
        value: []
      },
      flag: {
        otherTokens: ['FLG'],
        value: []
      },
      flagInteractors: {
        otherTokens: ['FLGINT'],
        value: false
      },
      overlay: {
        value: ''
      },
      analysis: {
        value: null,
        otherTokens: ['ANALYSIS']
      },
      analysisProfile: {
        value: null
      }
    };
    this._state$ = new rxjs__WEBPACK_IMPORTED_MODULE_1__.BehaviorSubject(this.state);
    this.state$ = this._state$.asObservable();
    this.onChange = Object.keys(this.state).reduce((properties, prop) => {
      properties[`${prop}$`] = this.state$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.map)(state => state[prop].value), (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.distinctUntilChanged)((v1, v2) => v1?.toString() === v2?.toString()), (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.tap)(v => console.log(`${prop} has been updated to ${v}`)));
      return properties;
    }, {});
    route.queryParamMap.subscribe(params => {
      for (const mainToken in this.state) {
        const param = this.state[mainToken];
        const tokens = [mainToken, ...(param.otherTokens || [])];
        const token = tokens.find(token => params.has(token));
        if (token) {
          const formerValue = param.value;
          if ((0,lodash__WEBPACK_IMPORTED_MODULE_0__.isArray)(param.value)) {
            const rawValue = params.get(token);
            param.value = rawValue.split(',').map(v => v.charAt(0).match(/d/) ? parseInt(v) : v);
          } else if ((0,lodash__WEBPACK_IMPORTED_MODULE_0__.isBoolean)(param.value)) {
            param.value = params.get(token) === 'true';
          } else {
            param.value = params.get(token);
          }
        }
      }
      if (this.propagate) this._state$.next(this.state);
    });
  }
  get(token) {
    return this.state[token].value;
  }
  set(token, value, propagate = true) {
    this.state[token].value = value;
    this.propagate = propagate;
    this.onPropertyModified();
  }
  // TODO make unselect remove select from state
  onPropertyModified() {
    return this.router.navigate([], {
      queryParams: {
        ...Object.entries(this.state).filter(([token, param]) => param.value && param.value.length !== 0).reduce((acc, [token, param]) => ({
          ...acc,
          [token]: Array.isArray(param.value) ? param.value.join(',') : param.value
        }), {})
      }
    });
  }
  static #_ = this.ɵfac = function DiagramStateService_Factory(t) {
    return new (t || DiagramStateService)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_6__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_6__.Router));
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjectable"]({
    token: DiagramStateService,
    factory: DiagramStateService.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 378:
/*!*********************************************!*\
  !*** ./src/app/services/diagram.service.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DiagramService: () => (/* binding */ DiagramService)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ 4980);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ 9736);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs */ 4300);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs */ 3738);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs */ 1891);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! rxjs */ 2389);
/* harmony import */ var reactome_cytoscape_style__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! reactome-cytoscape-style */ 5595);
/* harmony import */ var _assets_json_legend_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../assets/json/legend.json */ 3410);
/* harmony import */ var vectorious__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vectorious */ 5032);
/* harmony import */ var cytoscape__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! cytoscape */ 5388);
/* harmony import */ var cytoscape_fcose__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! cytoscape-fcose */ 7506);
/* harmony import */ var cytoscape_fcose__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(cytoscape_fcose__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../environments/environment */ 553);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/common/http */ 4860);









cytoscape__WEBPACK_IMPORTED_MODULE_2__["default"].use((cytoscape_fcose__WEBPACK_IMPORTED_MODULE_3___default()));
const posToStr = (edge, pos) => `${edge.id}-${pos.x},${pos.y}`;
const pointToStr = point => `${point.x};${point.y}`;
const scale = (pos, scale = 2) => {
  if (typeof pos === 'number') return pos * scale;
  return {
    x: pos.x * scale,
    y: pos.y * scale
  };
};
const equal = (pos1, pos2) => pos1.x === pos2.x && pos1.y === pos2.y;
const avg = positions => {
  const sum = {
    x: 0,
    y: 0
  };
  positions.forEach(pos => {
    sum.x += pos.x;
    sum.y += pos.y;
  });
  sum.x /= positions.length;
  sum.y /= positions.length;
  return sum;
};
const squaredDist = (pos1, pos2) => {
  return Math.pow(pos2.x - pos1.x, 2) + Math.pow(pos2.y - pos1.y, 2);
};
const dist = (pos1, pos2) => Math.sqrt(squaredDist(pos1, pos2));
const closestToAverage = positions => {
  const average = avg(positions);
  let closest = positions[0];
  let min = squaredDist(closest, average);
  for (let i = 1; i < positions.length; i++) {
    const pos = positions[i];
    const dist = squaredDist(pos, average);
    if (dist < min) {
      min = dist;
      closest = pos;
    }
  }
  return closest;
};
class DiagramService {
  constructor(http) {
    this.http = http;
    this.extraLine = new Map();
    this.reverseExtraLine = new Map();
    this.nodeTypeMap = new Map([['Gene', ['Gene', 'PhysicalEntity']], ['RNA', ['RNA', 'PhysicalEntity']], ['Protein', ['Protein', 'PhysicalEntity']], ['Entity', ['GenomeEncodedEntity', 'PhysicalEntity']], ['Complex', ['Complex', 'PhysicalEntity']], ['EntitySet', ['EntitySet', 'PhysicalEntity']], ['Chemical', ['Molecule', 'PhysicalEntity']], ['Cell', ['Cell', 'PhysicalEntity']], ['ProteinDrug', ['Protein', 'PhysicalEntity', 'drug']], ['ComplexDrug', ['Complex', 'PhysicalEntity', 'drug']], ['ChemicalDrug', ['Molecule', 'PhysicalEntity', 'drug']], ['EntitySetDrug', ['EntitySet', 'PhysicalEntity', 'drug']], ['ProcessNode', ['SUB', 'Pathway']], ['EncapsulatedNode', ['Interacting', 'Pathway']]]);
    this.reactionTypeMap = new Map([[undefined, ['transition', 'reaction']], ['transition', ['transition', 'reaction']], ['Transition', ['transition', 'reaction']], ['Process', ['transition', 'reaction']], ['binding', ['association', 'reaction']], ['Association', ['association', 'reaction']], ['dissociation', ['dissociation', 'reaction']], ['Dissociation', ['dissociation', 'reaction']], ['omitted', ['omitted', 'reaction']], ['Omitted Process', ['omitted', 'reaction']], ['uncertain', ['uncertain', 'reaction']], ['Uncertain Process', ['uncertain', 'reaction']]]);
    this.edgeTypeMap = new Map([['INPUT', ['consumption', 'incoming', 'reaction']], ['ACTIVATOR', ['positive-regulation', 'incoming', 'reaction']], ['REQUIRED', ['positive-regulation', 'incoming', 'reaction']], ['INHIBITOR', ['negative-regulation', 'incoming', 'reaction']], ['CATALYST', ['catalysis', 'incoming', 'reaction']], ['OUTPUT', ['production', 'outgoing', 'reaction']]]);
    this.edgeTypeToStr = new Map([['INPUT', '-'], ['ACTIVATOR', '+'], ['REQUIRED', '+>'], ['INHIBITOR', '|'], ['CATALYST', 'o'], ['OUTPUT', '>']]);
    this.linkClassMap = new Map([['EntitySetAndMemberLink', ['set-to-member', 'incoming']], ['EntitySetAndEntitySetLink', ['set-to-member', 'incoming']], ['Interaction', ['production', 'outgoing']], ['FlowLine', ['production', 'outgoing']]]);
    this.COMPARTMENT_SHIFT = 35;
  }
  random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  pick(values) {
    return values[this.random(0, values.length - 1)];
  }
  getLegend() {
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.of)(_assets_json_legend_json__WEBPACK_IMPORTED_MODULE_0__);
  }
  getNormalPathway(id) {
    return this.http.get(`https://dev.reactome.org/ContentService/data/query/${id}/normalPathway`, {
      responseType: "text"
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_6__.map)(data => data.split('\t')[0]));
  }
  getDiagram(id) {
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_7__.forkJoin)({
      diagram: this.http.get(`${_environments_environment__WEBPACK_IMPORTED_MODULE_4__.environment.host}/download/current/diagram/${id}.json`),
      graph: this.http.get(`${_environments_environment__WEBPACK_IMPORTED_MODULE_4__.environment.host}/download/current/diagram/${id}.graph.json`)
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_8__.tap)(({
      diagram,
      graph
    }) => console.log('Normal diagram:', diagram, 'Normal graph', graph)), (0,rxjs__WEBPACK_IMPORTED_MODULE_9__.switchMap)(({
      diagram,
      graph
    }) => {
      if (diagram.forNormalDraw !== undefined && !diagram.forNormalDraw) {
        return this.getNormalPathway(diagram.stableId).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_9__.switchMap)(normalPathwayId => (0,rxjs__WEBPACK_IMPORTED_MODULE_7__.forkJoin)({
          normalDiagram: this.http.get(`${_environments_environment__WEBPACK_IMPORTED_MODULE_4__.environment.host}/download/current/diagram/${normalPathwayId}.json`),
          normalGraph: this.http.get(`${_environments_environment__WEBPACK_IMPORTED_MODULE_4__.environment.host}/download/current/diagram/${normalPathwayId}.graph.json`)
        })), (0,rxjs__WEBPACK_IMPORTED_MODULE_8__.tap)(({
          normalGraph,
          normalDiagram
        }) => console.log('Normal diagram:', normalGraph, 'Normal graph', normalDiagram)), (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.map)(({
          normalGraph,
          normalDiagram
        }) => {
          graph.nodes.push(...normalGraph.nodes);
          graph.edges.push(...normalGraph.edges);
          if (normalDiagram.shadows) {
            normalDiagram.shadows.forEach(shadow => shadow.isFadeOut = true);
            diagram.shadows = diagram.shadows || [];
            diagram.shadows.push(...normalDiagram.shadows);
            graph.subpathways = graph.subpathways || [];
            graph.subpathways.push(...normalGraph.subpathways);
          }
          return {
            diagram,
            graph
          };
        }), (0,rxjs__WEBPACK_IMPORTED_MODULE_10__.catchError)(err => (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.of)({
          diagram,
          graph
        })));
      } else {
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.of)({
          diagram,
          graph
        });
      }
    }), (0,rxjs__WEBPACK_IMPORTED_MODULE_8__.tap)(mergedResponse => console.log('All responses:', mergedResponse)), (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.map)(({
      diagram,
      graph
    }) => {
      console.log("edge.reactionType", new Set(diagram.edges.flatMap(edge => edge.reactionType)));
      console.log("node.connectors.types", new Set(diagram.nodes.flatMap(node => node.connectors.flatMap(con => con.type))));
      console.log("node.renderableClass", new Set(diagram.nodes.flatMap(node => node.renderableClass)));
      console.log("links.renderableClass", new Set(diagram.links.flatMap(link => link.renderableClass)));
      console.log("shadow.renderableClass", new Set(diagram.shadows.flatMap(shadow => shadow.renderableClass)));
      const idToEdges = new Map(diagram.edges.map(edge => [edge.id, edge]));
      const idToNodes = new Map(diagram.nodes.map(node => [node.id, node]));
      const reactomeIdToEdge = new Map([
      // ...diagram.nodes.map(node => [node.reactomeId, node]),
      ...diagram.edges.map(edge => [edge.reactomeId, edge])]);
      const edgeIds = new Map();
      const forwardArray = diagram.edges.flatMap(edge => edge.segments.map(segment => [posToStr(edge, scale(segment.from)), scale(segment.to)]));
      this.extraLine = new Map(forwardArray);
      console.assert(forwardArray.length === this.extraLine.size, "Some edge diagram have been lost because 2 segments are starting from the same point");
      const backwardArray = diagram.edges.flatMap(edge => edge.segments.map(segment => [posToStr(edge, scale(segment.to)), scale(segment.from)]));
      this.reverseExtraLine = new Map(backwardArray);
      console.assert(backwardArray.length == this.reverseExtraLine.size, "Some edge diagram have been lost because 2 segments are ending at the same point");
      const subpathwayIds = new Set(diagram.shadows.map(shadow => shadow.reactomeId));
      const eventIdToSubPathwayId = new Map(graph.subpathways?.flatMap(subpathway => subpathway.events.map(event => [event, subpathway.dbId]).filter(entry => subpathwayIds.has(entry[1]))) || []);
      const subpathwayIdToEventIds = new Map(graph.subpathways?.map(subpathway => [subpathway.dbId, subpathway.events]));
      // create a node id - graph node mapping
      const dbIdToGraphNode = new Map(graph.nodes.map(node => [node.dbId, node] || 0));
      const mappingList = graph.nodes.flatMap(node => {
        if (node.children && node.children.length === 1) {
          // Consider homomer complex like their constituents for interactors
          return node.diagramIds?.map(id => [id, dbIdToGraphNode.get(node.children[0])]).filter(entry => entry[1] !== undefined);
        } else {
          return node.diagramIds?.map(id => [id, node]);
        }
      }).filter(entry => entry !== undefined);
      const idToGraphNodes = new Map([...mappingList]);
      const idToGraphEdges = new Map(graph.edges.map(edge => [edge.dbId, edge]));
      const getLeaves = (node, leaves) => {
        if (node.leaves && node.leaves.length > 0) {
          node.leaves.forEach(leave => leaves.add(leave));
        } else {
          if (node.children && node.children.length > 0) node.children.forEach(child => getLeaves(dbIdToGraphNode.get(child), leaves));else leaves.add(node);
        }
      };
      idToGraphNodes.forEach(node => {
        let leaves = new Set();
        getLeaves(node, leaves);
        node.leaves = [...leaves];
      });
      const dbIdToGraphEdge = new Map(graph.edges.map(edge => [edge.dbId, edge] || 0));
      const hasFadeOut = diagram.nodes.some(node => node.isFadeOut);
      const normalNodes = diagram.nodes.filter(node => node.isFadeOut);
      const specialNodes = diagram.nodes.filter(node => !node.isFadeOut);
      const posToNormalNode = new Map(normalNodes.map(node => [pointToStr(node.position), node]));
      const posToSpecialNode = new Map(specialNodes.map(node => [pointToStr(node.position), node]));
      const normalEdges = diagram.edges.filter(edge => edge.isFadeOut);
      const specialEdges = diagram.edges.filter(edge => !edge.isFadeOut);
      const posToNormalEdge = new Map(normalEdges.map(edge => [pointToStr(edge.position), edge]));
      const posToSpecialEdge = new Map(specialEdges.map(edge => [pointToStr(edge.position), edge]));
      //compartment nodes
      const compartmentNodes = diagram?.compartments.flatMap(item => {
        const propToRects = prop => ({
          left: scale(prop.x),
          top: scale(prop.y),
          right: scale(prop.x + prop.width),
          bottom: scale(prop.x + prop.height)
        });
        let innerCR = 10;
        let outerCR;
        if (item.insets) {
          const rects = [propToRects(item.prop), propToRects(item.insets)];
          outerCR = Object.keys(rects[0]).reduce((smallest, key) => Math.min(smallest, Math.abs(rects[0][key] - rects[1][key])), Number.MAX_SAFE_INTEGER);
          outerCR = innerCR + Math.min(outerCR, 100);
        }
        const layers = [{
          data: {
            id: item.id + '-outer',
            displayName: item.displayName,
            textX: scale(item.textPosition.x - (item.prop.x + item.prop.width)) + this.COMPARTMENT_SHIFT,
            textY: scale(item.textPosition.y - (item.prop.y + item.prop.height)) + this.COMPARTMENT_SHIFT,
            width: scale(item.prop.width),
            height: scale(item.prop.height),
            radius: outerCR
          },
          classes: ['Compartment', 'outer'],
          position: scale(item.position),
          selectable: false
        }];
        if (item.insets) {
          layers.push({
            data: {
              id: item.id + '-inner',
              width: scale(item.insets.width),
              height: scale(item.insets.height),
              radius: innerCR
            },
            classes: ['Compartment', 'inner'],
            position: scale({
              x: item.insets.x + item.insets.width / 2,
              y: item.insets.y + item.insets.height / 2
            }),
            selectable: false
          });
        }
        return layers;
      });
      const replacementMap = new Map();
      //reaction nodes
      const reactionNodes = diagram?.edges.map(item => {
        let replacement, replacedBy;
        if (item.isFadeOut) {
          replacedBy = posToSpecialEdge.get(pointToStr(item.position))?.id.toString() || specialEdges.find(edge => squaredDist(scale(edge.position), scale(item.position)) < 5 ** 2)?.id.toString();
          if (replacedBy) {
            replacementMap.set(item.id.toString(), replacedBy);
            replacementMap.set(replacedBy, item.id.toString());
          }
        }
        if (!item.isFadeOut) {
          replacement = posToNormalEdge.get(pointToStr(item.position))?.id.toString() || normalEdges.find(edge => squaredDist(scale(edge.position), scale(item.position)) < 5 ** 2)?.id.toString();
        }
        return {
          data: {
            id: item.id + '',
            // displayName: item.displayName,
            inputs: item.inputs,
            output: item.outputs,
            isFadeOut: item.isFadeOut,
            isBackground: item.isFadeOut,
            reactomeId: item.reactomeId,
            reactionId: item.id,
            graph: idToGraphEdges.get(item.reactomeId),
            replacement,
            replacedBy
          },
          classes: this.reactionTypeMap.get(item.reactionType),
          position: scale(item.position)
        };
      });
      //entity nodes
      const entityNodes = diagram?.nodes.flatMap(item => {
        const classes = [...this.nodeTypeMap.get(item.renderableClass)] || [item.renderableClass.toLowerCase()];
        let replacedBy;
        let replacement;
        if (item.isDisease) classes.push('disease');
        if (item.isCrossed) classes.push('crossed');
        if (item.trivial) classes.push('trivial');
        if (item.needDashedBorder) classes.push('loss-of-function');
        if (item.isFadeOut) {
          replacedBy = posToSpecialNode.get(pointToStr(item.position))?.id.toString();
          if (!replacedBy) {
            replacedBy = specialNodes.find(node => overlapLimited(item, node, 0.8))?.id.toString();
          }
          if (replacedBy) {
            replacementMap.set(item.id.toString(), replacedBy);
            replacementMap.set(replacedBy, item.id.toString());
          }
        }
        if (!item.isFadeOut) replacement = posToNormalNode.get(pointToStr(item.position))?.id.toString(); //|| normalNodes.find(node => overlap(item, node))?.id.toString();
        if (classes.some(clazz => clazz === 'RNA')) item.prop.height -= 10;
        if (classes.some(clazz => clazz === 'Cell')) item.prop.height /= 2;
        const isBackground = item.isFadeOut || classes.some(clazz => clazz === 'Pathway') || item.connectors.some(connector => connector.isFadeOut);
        item.isBackground = isBackground;
        let html = undefined;
        let width = scale(item.prop.width);
        let height = scale(item.prop.height);
        let preferredId = idToGraphNodes.get(item.id)?.identifier;
        if (classes.some(clazz => clazz === 'Protein')) {
          html = this.getStructureVideoHtml({
            ...item,
            type: 'Protein'
          }, width, height, preferredId);
        } else if (classes.some(clazz => clazz === 'Molecule')) {
          html = `<img src="https://www.ebi.ac.uk/chebi/displayImage.do?defaultImage=true&chebiId=${preferredId}&dimensions=1080&transbg=true" style="max-width: ${width / 2 - 4}px; max-height:${height}px" alt="">`;
        }
        if (isBackground && !item.isFadeOut) {
          replacementMap.set(item.id.toString(), item.id.toString());
        }
        const isFadeOut = !item.isCrossed && item.isFadeOut;
        const nodes = [{
          data: {
            id: item.id + '',
            reactomeId: item.reactomeId,
            displayName: item.displayName.replace(/([/,:;-])/g, "$1\u200b"),
            height: height,
            width: width,
            graph: idToGraphNodes.get(item.id),
            acc: preferredId,
            html,
            isFadeOut,
            isBackground,
            replacement,
            replacedBy
          },
          classes: classes,
          position: scale(item.position)
        }];
        if (item.nodeAttachments) {
          nodes.push(...item.nodeAttachments.map(ptm => ({
            data: {
              id: item.id + '-' + ptm.reactomeId,
              reactomeId: ptm.reactomeId,
              nodeId: item.id,
              nodeReactomeId: item.reactomeId,
              displayName: ptm.label,
              height: scale(ptm.shape.b.y - ptm.shape.a.y),
              width: scale(ptm.shape.b.x - ptm.shape.a.x),
              isFadeOut,
              isBackground,
              replacement,
              replacedBy
            },
            classes: "Modification",
            position: scale(ptm.shape.centre)
          })));
        }
        return nodes;
      });
      //sub pathways
      const shadowNodes = diagram?.shadows.map(item => {
        return {
          data: {
            id: item.id + '',
            displayName: item.displayName,
            height: scale(item.prop.height),
            width: scale(item.prop.width),
            reactomeId: item.reactomeId,
            isFadeOut: item.isFadeOut,
            replacedBy: item.isFadeOut,
            triggerPosition: scale(item.maxX)
          },
          classes: ['Shadow'],
          position: closestToAverage(subpathwayIdToEventIds.get(item.reactomeId).map(reactionId => reactomeIdToEdge.get(reactionId)).map(edge => scale(edge.position)))
        };
      });
      avoidOverlap(shadowNodes);
      const T = 4;
      const ARROW_MULT = 1.5;
      const EDGE_MARGIN = 6;
      const REACTION_RADIUS = 3 * T;
      const MIN_DIST = EDGE_MARGIN;
      /**
       * iterate nodes connectors to get all edges information based on the connector type.
       *
       */
      const edges = diagram.nodes.flatMap(node => {
        return node.connectors.map(connector => {
          const reaction = idToEdges.get(connector.edgeId);
          const reactionP = scale(reaction.position);
          const nodeP = scale(node.position);
          const [source, target] = connector.type !== 'OUTPUT' ? [node, reaction] : [reaction, node];
          const sourceP = scale(source.position);
          const targetP = scale(target.position);
          let points = connector.segments.flatMap((segment, i) => i === 0 ? [segment.from, segment.to] : [segment.to]).map(pos => scale(pos));
          if (connector.type === 'OUTPUT') points.reverse();
          if (points.length === 0) points.push(reactionP);
          this.addEdgeInfo(reaction, points, 'backward', sourceP);
          this.addEdgeInfo(reaction, points, 'forward', targetP);
          let [from, to] = [points.shift(), points.pop()];
          from = from ?? nodeP; // Quick fix to avoid problem with reaction without visible outputs like R-HSA-2424252 in R-HSA-1474244
          to = to ?? reactionP; // Quick fix to avoid problem with reaction without visible outputs like R-HSA-2424252 in R-HSA-1474244
          if (connector.type === 'CATALYST') {
            to = scale(connector.endShape.centre);
          }
          // points = addRoundness(from, to, points);
          const relatives = this.absoluteToRelative(from, to, points);
          const classes = [...this.edgeTypeMap.get(connector.type)];
          if (reaction.isDisease) classes.push('disease');
          if (node.trivial) classes.push('trivial');
          if (eventIdToSubPathwayId.has(reaction.reactomeId)) classes.push('shadow');
          let d = dist(from, to);
          if (equal(from, reactionP) || equal(to, reactionP)) d -= REACTION_RADIUS;
          if (classes.includes('positive-regulation') || classes.includes('catalysis') || classes.includes('production')) d -= ARROW_MULT * T;
          // console.assert(d > MIN_DIST, `The edge between reaction: R-HSA-${reaction.reactomeId} and entity: R-HSA-${node.reactomeId} in pathway ${id} has a visible length of ${d} which is shorter than ${MIN_DIST}`)
          console.assert(d > MIN_DIST, `${id}\t${diagram.displayName}\t${hasFadeOut}\tR-HSA-${reaction.reactomeId}\tR-HSA-${node.reactomeId}\thttps://release.reactome.org/PathwayBrowser/#/${id}&SEL=R-HSA-${reaction.reactomeId}&FLG=R-HSA-${node.reactomeId}\thttps://reactome-pwp.github.io/PathwayBrowser/${id}?select=${reaction.reactomeId}&flag=${node.reactomeId}`);
          let replacement, replacedBy;
          if (connector.isFadeOut) {
            // First case: same node is used both special and normal context
            // replacedBy = node.connectors.find(otherConnector => otherConnector !== connector && !otherConnector.isFadeOut && samePoint(idToEdges.get(otherConnector.edgeId)!.position, reaction.position))?.edgeId;
            // Second case: different nodes are used between special and normal context
            // replacedBy = replacedBy || (posToSpecialNode.get(pointToStr(node.position)) && posToSpecialEdge.get(pointToStr(reaction.position)))?.id;
            replacedBy = replacementMap.get(node.id.toString()) && replacementMap.get(reaction.id.toString());
          }
          if (!connector.isFadeOut) {
            // First case: same node is used both special and normal context
            replacement = node.connectors.find(otherConnector => otherConnector !== connector && otherConnector.isFadeOut && samePoint(idToEdges.get(otherConnector.edgeId).position, reaction.position))?.edgeId;
            // console.log("Reaction edge", replacement)
            // Second case: different nodes are used between special and normal context
            replacement = replacement || (posToNormalNode.get(pointToStr(node.position)) && posToNormalEdge.get(pointToStr(reaction.position)))?.id;
            // console.log("Reaction edge", replacement)
          }

          const edge = {
            data: {
              id: this.getEdgeId(source, connector, target, edgeIds),
              graph: dbIdToGraphEdge.get(reaction.reactomeId),
              source: source.id + '',
              target: target.id + '',
              stoichiometry: connector.stoichiometry.value,
              weights: relatives.weights.join(" "),
              distances: relatives.distances.join(" "),
              sourceEndpoint: this.endpoint(sourceP, from),
              targetEndpoint: this.endpoint(targetP, to),
              pathway: eventIdToSubPathwayId.get(reaction.reactomeId),
              reactomeId: reaction.reactomeId,
              reactionId: reaction.id,
              isFadeOut: reaction.isFadeOut,
              isBackground: reaction.isFadeOut,
              replacedBy,
              replacement
            },
            classes: classes
          };
          return edge;
        });
      });
      const linkEdges = diagram.links?.filter(link => !link.renderableClass.includes('EntitySet') || link.inputs[0].id !== link.outputs[0].id)?.map(link => {
        const source = idToNodes.get(link.inputs[0].id);
        const target = idToNodes.get(link.outputs[0].id);
        const sourceP = scale(source.position);
        const targetP = scale(target.position);
        let points = link.segments.flatMap((segment, i) => i === 0 ? [segment.from, segment.to] : [segment.to]).map(pos => scale(pos));
        let [from, to] = [points.shift(), points.pop()];
        from = from ?? sourceP; // Quick fix to avoid problem with reaction without visible outputs like R-HSA-2424252 in R-HSA-1474244
        to = to ?? targetP; // Quick fix to avoid problem with reaction without visible outputs like R-HSA-2424252 in R-HSA-1474244
        // points = addRoundness(from, to, points);
        const relatives = this.absoluteToRelative(from, to, points);
        const classes = [...this.linkClassMap.get(link.renderableClass)];
        if (link.isDisease) classes.push('disease');
        const isBackground = link.isFadeOut || idToNodes.get(link.inputs[0].id)?.isBackground && idToNodes.get(link.outputs[0].id)?.isBackground;
        return {
          data: {
            id: link.id + '',
            source: link.inputs[0].id + '',
            target: link.outputs[0].id + '',
            weights: relatives.weights.join(" "),
            distances: relatives.distances.join(" "),
            sourceEndpoint: this.endpoint(sourceP, from),
            targetEndpoint: this.endpoint(targetP, to),
            isFadeOut: link.isFadeOut,
            isBackground: isBackground
          },
          classes: classes,
          selectable: false
        };
      });
      return {
        nodes: [...compartmentNodes, ...reactionNodes, ...entityNodes, ...shadowNodes],
        edges: [...edges, ...linkEdges]
      };
    }), (0,rxjs__WEBPACK_IMPORTED_MODULE_8__.tap)(output => console.log('Output:', output)));
  }
  getStructureVideoHtml(item, width, height, uniprotId) {
    if (item.type === 'Protein') return `<video loop id="video-${item.id}" width="${width + 10}" height="${height + 10}"  preload="none">
                <source src="${_environments_environment__WEBPACK_IMPORTED_MODULE_4__.environment.s3}/structures/${uniprotId}.mov" type="video/quicktime">
                <source src="${_environments_environment__WEBPACK_IMPORTED_MODULE_4__.environment.s3}/structures/${uniprotId}.webm" type="video/webm">
              </video>`;
    return undefined;
  }
  getEdgeId(source, connector, target, edgeIds) {
    let edgeId = `${source.id} --${this.edgeTypeToStr.get(connector.type)} ${target.id}`;
    if (edgeIds.has(edgeId)) {
      let count = edgeIds.get(edgeId);
      edgeIds.set(edgeId, count++);
      edgeId += ` (${count})`;
      console.warn('Conflicting edge id: ', edgeId);
    } else {
      edgeIds.set(edgeId, 0);
    }
    return edgeId;
  }
  addEdgeInfo(edge, points, direction, stop) {
    const stopPos = posToStr(edge, stop);
    if (direction === 'forward') {
      const map = this.extraLine;
      let pos = posToStr(edge, points.at(-1));
      while (map.has(pos) && pos !== stopPos) {
        points.push(map.get(pos));
        pos = posToStr(edge, points.at(-1));
      }
    } else {
      const map = this.reverseExtraLine;
      let pos = posToStr(edge, points.at(0));
      while (map.has(pos) && pos !== stopPos) {
        points.unshift(map.get(pos));
        pos = posToStr(edge, points.at(0));
      }
    }
  }
  endpoint(source, point) {
    return `${point.x - source.x} ${point.y - source.y}`;
  }
  /**
   * Use Matrix power to convert points from an absolute coordinate system to an edge relative system
   *
   * Visually explained by https://youtu.be/kYB8IZa5AuE?si=vJKi-MUv2dCRQ5oA<br>
   * Short version ==> https://math.stackexchange.com/q/1855051/683621
   * @param source Position position of the edge source:  {x:number, y:number}
   * @param target Position position of the edge target:  {x:number, y:number}
   * @param toConvert Array of Position to convert to the edge-relative system
   * @return The points converted to relative coordinates {distances: number[], weights: number[]}
   */
  absoluteToRelative(source, target, toConvert) {
    const relatives = {
      distances: [],
      weights: []
    };
    if (toConvert.length === 0) return relatives;
    const mainVector = (0,vectorious__WEBPACK_IMPORTED_MODULE_1__.array)([target.x - source.x, target.y - source.y]); // Edge vector
    const orthoVector = (0,vectorious__WEBPACK_IMPORTED_MODULE_1__.array)([-mainVector.y, mainVector.x]) // Perpendicular vector
    .normalize(); //Normalized to have the distance expressed in pixels https://math.stackexchange.com/a/413235/683621
    let transform = (0,vectorious__WEBPACK_IMPORTED_MODULE_1__.array)([[mainVector.x, mainVector.y], [orthoVector.x, orthoVector.y]]).inv(); // Should always be invertible if the ortho vector is indeed perpendicular
    for (let coord of toConvert) {
      const absolute = (0,vectorious__WEBPACK_IMPORTED_MODULE_1__.array)([[coord.x - source.x, coord.y - source.y]]);
      const relative = absolute.multiply(transform);
      relatives.weights.push(relative.get(0, 0));
      relatives.distances.push(relative.get(0, 1));
    }
    return relatives;
  }
  randomNetwork() {
    const amount = 100;
    const peTypes = ['Protein', 'EntitySet', 'GenomeEncodedEntity', 'RNA', 'Gene', 'Complex', 'Molecule'];
    // const peTypes = ['Gene'];
    const reactionTypes = ['association', 'dissociation', 'transition', 'uncertain', 'omitted'];
    const physicalEntities = Array.from({
      length: amount
    }, (x, i) => {
      const clazz = this.pick(peTypes);
      return {
        group: 'nodes',
        data: {
          id: i.toString(),
          width: this.random(150, 300),
          height: this.random(50, 150),
          displayName: clazz,
          parent: 'Compartment'
        },
        classes: [clazz, "PhysicalEntity", this.pick(["drug", "", ""])]
      };
    });
    const reactions = physicalEntities.map((node, i) => ({
      group: 'nodes',
      data: {
        id: `${i}-react`,
        parent: 'Compartment'
      },
      classes: [this.pick(reactionTypes), 'reaction']
    }));
    const nodes = physicalEntities.flatMap((node, i) => [node, reactions[i]]);
    const inOut = physicalEntities.flatMap((node, i) => [{
      group: 'edges',
      data: {
        source: `${i}`,
        target: `${i}-react`,
        stoichiometry: this.pick([undefined, -1, 0, 1, 2])
      },
      classes: ['consumption']
    }, {
      group: 'edges',
      data: {
        source: `${i}-react`,
        target: `${(i + 1) % amount}`,
        stoichiometry: this.pick([undefined, -1, 0, 1, 2])
      },
      classes: ['production']
    }]);
    const additionalIn = Array.from({
      length: amount / 4
    }).map(() => ({
      group: 'edges',
      data: {
        source: this.pick(physicalEntities).data.id,
        target: this.pick(reactions).data.id
      },
      classes: this.pick(['catalysis', 'positive-regulation', 'negative-regulation', 'set-to-member'])
    }));
    const edges = [...inOut, ...additionalIn];
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.of)({
      nodes: [{
        data: {
          id: 'Compartment'
        },
        classes: ['Compartment'],
        pannable: true,
        grabbable: false,
        selectable: false
      }, ...nodes],
      edges
    });
  }
  static #_ = this.ɵfac = function DiagramService_Factory(t) {
    return new (t || DiagramService)(_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_12__.HttpClient));
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdefineInjectable"]({
    token: DiagramService,
    factory: DiagramService.ɵfac,
    providedIn: 'root'
  });
}
function samePoint(p1, p2) {
  return p1.x === p2.x && p1.y === p2.y;
}
function overlapLimited(nodeA, nodeB, limit = 0.8) {
  if (nodeA.position.x === nodeB.position.x && nodeA.position.y === nodeB.position.y) return true;
  const rectA = getRect(nodeA),
    rectB = getRect(nodeB);
  const o = {
    left: Math.max(rectA.left, rectB.left),
    right: Math.min(rectA.right, rectB.right),
    top: Math.max(rectA.top, rectB.top),
    bottom: Math.min(rectA.bottom, rectB.bottom)
  };
  return o.left < o.right && o.top < o.bottom && area(o) / area(rectA) > limit;
}
function overlap(nodeA, nodeB) {
  if (nodeA.position.x === nodeB.position.x && nodeA.position.y === nodeB.position.y) return true;
  const rectA = getRect(nodeA),
    rectB = getRect(nodeB);
  return Math.max(rectA.left, rectB.left) < Math.min(rectA.right, rectB.right) && Math.max(rectA.top, rectB.top) < Math.min(rectA.bottom, rectB.bottom);
}
function area(rect) {
  return (rect.right - rect.left) * (rect.bottom - rect.top);
}
function getRect(node) {
  if (node.rect) return node.rect;
  const halfWidth = node.prop.width / 2;
  const halfHeight = node.prop.height / 2;
  node.rect = {
    left: node.position.x - halfWidth,
    right: node.position.x + halfWidth,
    top: node.position.y - halfHeight,
    bottom: node.position.y + halfHeight
  };
  return node.rect;
}
/**
 * Create a temporary cytoscape session to apply a layout to the nodes in order to avoid them to overlap each others
 */
function avoidOverlap(definitions) {
  const container = document.createElement("div");
  const style = new reactome_cytoscape_style__WEBPACK_IMPORTED_MODULE_13__.Style(container, {});
  const cy = (0,cytoscape__WEBPACK_IMPORTED_MODULE_2__["default"])({
    container: container,
    style: style.getStyleSheet(),
    elements: definitions,
    layout: {
      name: 'preset'
    }
  });
  const nodes = cy.nodes();
  nodes.forEach(node => {
    const bb = node.boundingBox({
      includeLabels: true,
      includeNodes: false
    });
    node.style({
      width: bb.w,
      height: bb.h
    });
  });
  const layout = nodes.layout({
    name: 'fcose',
    nodeRepulsion: 15,
    animate: false,
    fit: true,
    packComponents: false,
    randomize: false,
    tile: false
  });
  layout.run();
  definitions.forEach(def => def.position = cy.getElementById(def.data.id).position());
  cy.destroy();
  container.remove();
}

/***/ }),

/***/ 7038:
/*!***********************************!*\
  !*** ./src/app/services/utils.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isDefined: () => (/* binding */ isDefined)
/* harmony export */ });
function isDefined(value) {
  return value !== undefined && value !== null;
}

/***/ }),

/***/ 553:
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   environment: () => (/* binding */ environment)
/* harmony export */ });
const environment = {
  production: false,
  host: "https://dev.reactome.org",
  s3: "https://s3.amazonaws.com/download.reactome.org"
};

/***/ }),

/***/ 4913:
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ 6480);
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app/app.module */ 8629);


_angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__.platformBrowser().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_0__.AppModule).catch(err => console.error(err));

/***/ }),

/***/ 5595:
/*!*****************************************************************************!*\
  !*** ./dist/reactome-cytoscape-style/fesm2022/reactome-cytoscape-style.mjs ***!
  \*****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Interactivity: () => (/* binding */ Interactivity),
/* harmony export */   ReactomeEvent: () => (/* binding */ ReactomeEvent),
/* harmony export */   ReactomeEventTypes: () => (/* binding */ ReactomeEventTypes),
/* harmony export */   Style: () => (/* binding */ Style),
/* harmony export */   Types: () => (/* binding */ types)
/* harmony export */ });
/* harmony import */ var _Users_eragueneau_WebstormProjects_pathway_browser_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 1670);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ 7178);
/* harmony import */ var cytoscape__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! cytoscape */ 5388);
/* harmony import */ var cytoscape_layers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! cytoscape-layers */ 7617);
/* harmony import */ var chroma_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! chroma-js */ 3062);







/**
 * This is a guard function to check if a property is a Provider function, or a direct value
 *
 * @param property The value to check
 * @return true if is a Provider function
 */
function isProvider(property) {
  return property.apply !== undefined;
}
/**
 * This function extracts the value from a property, and if the property is a Provider<T>, it calls the property function to get the actual value.
 *
 * @param property A value of type Property<T>.
 */
function extract(property) {
  return isProvider(property) ? property() : property;
}
function defaultable(object) {
  const defaultable = object;
  defaultable.setDefault = function (key, defaultValue) {
    if (!object[key]) object[key] = defaultValue;
    return defaultable;
  };
  return defaultable;
}
const propertyExtractor = properties => (group, key) => properties[group][key];
const propertyMapper = properties => (group, key, mapper) => mapper(extract(properties[group][key]));
const gene = (properties, {
  width,
  height,
  drug,
  interactor,
  disease,
  lossOfFunction
}) => {
  const t = extract(properties.global.thickness);
  const dHeight = extract(properties.gene.decorationHeight);
  const dWidth = extract(properties.gene.decorationExtraWidth);
  const headSize = extract(properties.gene.arrowHeadSize);
  const radius = extract(properties.gene.arrowRadius);
  const fill = extract(properties.gene.fill);
  const stroke = interactor ? extract(properties.interactor.fill) : disease ? extract(properties.global.negativeContrast) : null;
  const select = extract(properties.global.selectNode);
  const hover = extract(properties.global.hoverNode);
  const flag = extract(properties.global.flag);
  const hh = Math.sqrt(Math.pow(headSize, 2) * 3 / 4);
  const halfWidth = width / 2;
  const r = extract(properties.gene.borderRadius);
  const oR = r + t;
  const iR = r - t;
  const t_2 = t / 2;
  const t2 = t * 2;
  return {
    background: {
      "background-image": `
          <path fill="${fill}" class="gradient" stroke-linecap="round" transform="translate(${t_2} ${t_2})"
      ${stroke ? `stroke="${stroke}" stroke-width="${t}"` : ''}
      ${lossOfFunction ? `stroke-dasharray="${t} ${t2}"` : ''}  d="
            M ${0} ${dHeight}
            H ${width}
            v ${height - dHeight - radius}
            a ${radius} ${radius} 0 0 1 -${radius} ${radius}
            H ${radius}
            a ${radius} ${radius} 0 0 1 -${radius} -${radius}
            Z
          "/>`,
      "bounds-expansion": t_2,
      "background-clip": "none",
      "background-image-containment": "over",
      "background-position-x": -t / 2,
      "background-position-y": -t / 2,
      "background-width": width + t,
      "background-height": height + t,
      requireGradient: true
    },
    decorators: [{
      "background-image": `
          <path fill="none" stroke="${fill}" stroke-width="${t}"  d="
            M ${halfWidth} ${dHeight + 2 * t}
            v -${dHeight - radius - (headSize + t) / 2 + 2 * t}
            a ${radius} ${radius} 0 0 1 ${radius} -${radius}
            h ${halfWidth - t - radius + dWidth}
          "/>
            <path fill="${fill}" stroke="${fill}" stroke-width="${t}" stroke-linejoin="round"  d="
            M ${width - hh - t_2 + dWidth} ${headSize / 2 + t_2}
            v -${headSize / 2}
            l ${hh} ${headSize / 2}
            l -${hh} ${headSize / 2}
            v -${headSize / 2}
            z
          "/>`,
      "background-position-y": -t / 2,
      "bounds-expansion": dHeight,
      "background-height": dHeight + 1.5 * t,
      "background-width": width + dWidth,
      "background-clip": "none",
      "background-image-containment": "over"
    }],
    hover: {
      "background-image": `<rect x="0" y="0" width="${width}" height="${2 * t}" fill="${hover}"/>`,
      "background-position-y": dHeight - t,
      "bounds-expansion": t,
      "background-clip": "none",
      "background-image-containment": "over",
      "background-height": 2 * t
    },
    select: {
      "background-image": `
          <path fill="${select}" stroke-linejoin="round" stroke-linecap="round"  d="
            M 0 0
            a ${oR} ${oR} 0 0 0 ${oR} ${oR}
            h ${width - 2 * oR}
            a ${oR} ${oR} 0 0 0 ${oR} -${oR}
            a ${oR} ${iR} 0 0 1 -${oR} ${iR}
            h -${width - 2 * oR}
            a ${oR} ${iR} 0 0 1 -${oR} -${iR}
            Z"/>
`,
      "background-position-y": height - r,
      "bounds-expansion": t,
      "background-clip": "none",
      "background-image-containment": "over",
      "background-height": oR
    },
    flag: {
      "background-image": `
       <path fill="${flag}" d="
       M 0 0
       H ${width + 4 * t}
       V ${height - dHeight - r + t}
       a ${oR + t} ${oR} 0 0 1 -${oR + t} ${oR}
       H ${oR + t}
       a ${oR + t} ${oR} 0 0 1 -${oR + t} -${oR}
       Z
       "/>
`,
      "background-position-x": -2 * t,
      "background-position-y": dHeight - t,
      "bounds-expansion": 2 * t,
      "background-clip": "none",
      "background-image-containment": "over",
      "background-width": width + 4 * t,
      "background-height": height + 2 * t - dHeight
    }
    // analysis: {
    //   "background-image": `${gradient}
    //       <path fill="url(#gradient)" transform="translate(${t_2} ${t_2})"
    //       d="
    //         M ${0} ${dHeight}
    //         H ${width}
    //         v ${height - dHeight - radius}
    //         a ${radius} ${radius} 0 0 1 -${radius} ${radius}
    //         H ${radius}
    //         a ${radius} ${radius} 0 0 1 -${radius} -${radius}
    //         Z
    //       "/>`,
    //   "bounds-expansion": t_2,
    //   "background-clip": "none",
    //   "background-image-containment": "over",
    //   "background-position-x": -t / 2,
    //   "background-position-y": -t / 2,
    //   "background-width": width + t,
    //   "background-height": height + t,
    // }
  };
};

const molecule = (properties, {
  width,
  height,
  drug,
  interactor
}) => {
  const select = extract(properties.global.selectNode);
  const hover = extract(properties.global.hoverNode);
  const flag = extract(properties.global.flag);
  const thick = extract(properties.global.thickness);
  const stroke = !interactor ? !drug ? extract(properties.molecule.stroke) : extract(properties.molecule.drug) : extract(properties.interactor.fill);
  const fill = extract(properties.molecule.fill);
  const ht = thick / 2;
  const halfHeight = height / 2;
  const oR = halfHeight + thick;
  const iR = halfHeight - thick;
  const oRx = Math.min(oR, width / 2);
  return {
    hover: {
      "background-image": `
          <path fill="${hover}" stroke-linejoin="round" stroke-linecap="round"  d="
            M 0 ${oR}
            a ${oRx} ${oR} 0 0 1 ${oRx} -${oR}
            h ${width - 2 * oRx + thick}
            a ${oRx} ${oR} 0 0 1 ${oRx} ${oR}
            a ${oRx} ${iR} 0 0 0 -${oRx} -${iR}
            h -${width - 2 * oRx + thick}
            a ${oRx} ${iR} 0 0 0 -${oRx} ${iR}
            Z"/>
`,
      "background-position-y": -thick,
      "background-position-x": -thick / 2,
      "bounds-expansion": thick,
      "background-clip": "none",
      "background-image-containment": "over",
      "background-height": oR,
      "background-width": width + thick
    },
    select: {
      "background-image": `
          <path fill="${select}" stroke-linejoin="round" stroke-linecap="round"  d="
            M 0 0
            a ${oRx} ${oR} 0 0 0 ${oRx} ${oR}
            h ${width - 2 * oRx + thick}
            a ${oRx} ${oR} 0 0 0 ${oRx} -${oR}
            a ${oRx} ${iR} 0 0 1 -${oRx} ${iR}
            h -${width - 2 * oRx + thick}
            a ${oRx} ${iR} 0 0 1 -${oRx} -${iR}
            Z"/>
`,
      "background-position-y": halfHeight,
      "background-position-x": -thick / 2,
      "bounds-expansion": thick,
      "background-clip": "none",
      "background-image-containment": "over",
      "background-height": oR,
      "background-width": width + thick
    },
    flag: {
      "background-image": `
<rect width="${width + 4 * thick}" height="${height + 2 * thick}" rx="${oR + 2 * thick}" ry="${oR}" fill="${flag}"/>
<rect x="${2 * thick}" y="${thick}" width="${width}" height="${height}" rx="${oR}" fill="${fill}" stroke="${stroke}" stroke-width="${thick}"/>
`,
      "background-position-x": -2 * thick,
      "background-position-y": -thick,
      "bounds-expansion": 2 * thick,
      "background-clip": "none",
      "background-image-containment": "over",
      "background-width": width + 4 * thick,
      "background-height": height + 2 * thick
    },
    analysis: {
      "background-image": `<rect fill="url(#gradient)" width="${width}" height="${height}" rx="${halfHeight}" stroke-width="${thick}" stroke="${stroke}"/>`,
      requireGradient: true
    }
  };
};
const protein = (properties, {
  width,
  height,
  drug
}) => {
  const fill = extract(properties.protein.fill);
  const select = extract(properties.global.selectNode);
  const hover = extract(properties.global.hoverNode);
  const flag = extract(properties.global.flag);
  const thick = extract(properties.global.thickness);
  const radius = extract(properties.protein.radius);
  const oR = radius + thick;
  const iR = radius - thick;
  return {
    hover: {
      "background-image": `
          <path fill="${hover}" stroke-linejoin="round" stroke-linecap="round"  d="
            M 0 ${oR}
            a ${oR} ${oR} 0 0 1 ${oR} -${oR}
            h ${width - 2 * oR}
            a ${oR} ${oR} 0 0 1 ${oR} ${oR}
            a ${oR} ${iR} 0 0 0 -${oR} -${iR}
            h -${width - 2 * oR}
            a ${oR} ${iR} 0 0 0 -${oR} ${iR}
            Z"/>
`,
      "background-position-y": -thick,
      "bounds-expansion": thick,
      "background-clip": "none",
      "background-image-containment": "over",
      "background-height": oR
    },
    select: {
      "background-image": `
          <path fill="${select}" stroke-linejoin="round" stroke-linecap="round"  d="
            M 0 0
            a ${oR} ${oR} 0 0 0 ${oR} ${oR}
            h ${width - 2 * oR}
            a ${oR} ${oR} 0 0 0 ${oR} -${oR}
            a ${oR} ${iR} 0 0 1 -${oR} ${iR}
            h -${width - 2 * oR}
            a ${oR} ${iR} 0 0 1 -${oR} -${iR}
            Z"/>
`,
      "background-position-y": height - radius,
      "bounds-expansion": thick,
      "background-clip": "none",
      "background-image-containment": "over",
      "background-height": oR
    },
    flag: {
      "background-image": `
<rect width="${width + 4 * thick}" height="${height + 2 * thick}" rx="${oR}"  fill="${flag}"/>
<rect x="${2 * thick}" y="${thick}" width="${width}" height="${height}" rx="${radius}" fill="${fill}"/>
`,
      "background-position-x": -2 * thick,
      "background-position-y": -thick,
      "bounds-expansion": 2 * thick,
      "background-clip": "none",
      "background-image-containment": "over",
      "background-width": width + 4 * thick,
      "background-height": height + 2 * thick
    },
    analysis: {
      "background-image": `<rect width="${width}" height="${height}" class="gradient" rx="${radius}"/>`,
      requireGradient: true
    }
  };
};
const rna = (properties, {
  width,
  height
}) => {
  const thick = extract(properties.global.thickness);
  const select = extract(properties.global.selectNode);
  const hover = extract(properties.global.hoverNode);
  const flag = extract(properties.global.flag);
  const fill = extract(properties.rna.fill);
  const r = extract(properties.rna.radius);
  const oR = r + thick;
  const iR = r - thick;
  return {
    hover: {
      "background-image": `<rect x="0" y="0" width="${width}" height="${2 * thick}" fill="${hover}"/>`,
      "background-position-y": -thick,
      "bounds-expansion": thick,
      "background-clip": "none",
      "background-image-containment": "over",
      "background-height": 2 * thick
    },
    select: {
      "background-image": `
          <path fill="${select}" stroke-linejoin="round" stroke-linecap="round"  d="
            M 0 0
            a ${oR} ${oR} 0 0 0 ${oR} ${oR}
            h ${width - 2 * oR}
            a ${oR} ${oR} 0 0 0 ${oR} -${oR}
            a ${oR} ${iR} 0 0 1 -${oR} ${iR}
            h -${width - 2 * oR}
            a ${oR} ${iR} 0 0 1 -${oR} -${iR}
            Z"/>
`,
      "background-position-y": height - r,
      "bounds-expansion": thick,
      "background-clip": "none",
      "background-image-containment": "over",
      "background-height": oR
    },
    flag: {
      "background-image": `
       <path fill="${flag}" d="
       M 0 0
       H ${width + 4 * thick}
       V ${height - r + thick}
       a ${oR + thick} ${oR} 0 0 1 -${oR + thick} ${oR}
       H ${oR + thick}
       a ${oR + thick} ${oR} 0 0 1 -${oR + thick} -${oR}
       Z
       "/>
       <path fill="${fill}" d="
       M ${2 * thick} ${thick}
       H ${width + 2 * thick}
       V ${height - r + thick}
       a ${r} ${r} 0 0 1 -${r} ${r}
       H ${r + 2 * thick}
       a ${r} ${r} 0 0 1 -${r} -${r}
       Z"/>
`,
      "background-position-x": -2 * thick,
      "background-position-y": -thick,
      "bounds-expansion": 2 * thick,
      "background-clip": "none",
      "background-image-containment": "over",
      "background-width": width + 4 * thick,
      "background-height": height + 2 * thick
    },
    analysis: {
      "background-image": `
       <path class="gradient" d="
       M 0 0
       H ${width}
       V ${height - r}
       a ${r} ${r} 0 0 1 -${r} ${r}
       H ${r}
       a ${r} ${r} 0 0 1 -${r} -${r}
       Z"/>`,
      requireGradient: true
    }
  };
};
const genomeEncodedEntity = (properties, {
  width,
  height,
  drug,
  disease,
  interactor,
  lossOfFunction
}) => {
  const fill = !drug ? extract(properties.complex.fill) : extract(properties.genomeEncodedEntity.drug);
  const select = extract(properties.global.selectNode);
  const hover = extract(properties.global.hoverNode);
  const flag = extract(properties.global.flag);
  const t = extract(properties.global.thickness);
  const t_2 = t / 2;
  const bottomR = extract(properties.genomeEncodedEntity.bottomRadius);
  const stroke = !interactor ? !disease ? null : extract(properties.global.negativeContrast) : extract(properties.interactor.fill);
  const topR = Math.min(extract(properties.genomeEncodedEntity.topRadius), height - bottomR, width / 2 - t);
  const v = height - bottomR - topR;
  const topOR = topR + t;
  const topIR = topR - t;
  const bottomOR = bottomR + t;
  const bottomIR = bottomR - t;
  return {
    background: {
      "background-image": `
      <path fill="${fill}" class="gradient" stroke-linecap="round" transform="translate(${t_2} ${t_2})"
      ${stroke ? `stroke="${stroke}" stroke-width="${t}"` : ''}
      ${lossOfFunction ? `stroke-dasharray="${t} ${t * 2}"` : ''}
      d="
      M ${topR} 0
      H ${width - topR}
      a ${topR} ${topR} 0 0 1 ${topR} ${topR}
      v ${v}
      a ${bottomR} ${bottomR} 0 0 1 -${bottomR} ${bottomR}
      H ${bottomR}
      a ${bottomR} ${bottomR} 0 0 1 -${bottomR} -${bottomR}
      v -${v}
      a ${topR} ${topR} 0 0 1 ${topR} -${topR}
      Z
      "/>
      `,
      "bounds-expansion": t / 2,
      "background-clip": "none",
      "background-image-containment": "over",
      "background-position-x": -t_2,
      "background-position-y": -t_2,
      "background-width": width + t,
      "background-height": height + t,
      requireGradient: true
    },
    hover: {
      "background-image": `
          <path fill="${hover}" stroke-linejoin="round" stroke-linecap="round"  d="
            M 0 ${topOR}
            a ${topOR} ${topOR} 0 0 1 ${topOR} -${topOR}
            h ${width - 2 * topOR}
            a ${topOR} ${topOR} 0 0 1 ${topOR} ${topOR}
            a ${topOR} ${topIR} 0 0 0 -${topOR} -${topIR}
            h -${width - 2 * topOR}
            a ${topOR} ${topIR} 0 0 0 -${topOR} ${topIR}
            Z"/>
`,
      "background-position-y": -t,
      "bounds-expansion": t,
      "background-clip": "none",
      "background-image-containment": "over",
      "background-height": topOR
    },
    select: {
      "background-image": `
          <path fill="${select}" stroke-linejoin="round" stroke-linecap="round"  d="
            M 0 0
            a ${bottomOR} ${bottomOR} 0 0 0 ${bottomOR} ${bottomOR}
            h ${width - 2 * bottomOR}
            a ${bottomOR} ${bottomOR} 0 0 0 ${bottomOR} -${bottomOR}
            a ${bottomOR} ${bottomIR} 0 0 1 -${bottomOR} ${bottomIR}
            h -${width - 2 * bottomOR}
            a ${bottomOR} ${bottomIR} 0 0 1 -${bottomOR} -${bottomIR}
            Z"/>
`,
      "background-position-y": height - bottomR,
      "bounds-expansion": t,
      "background-clip": "none",
      "background-image-containment": "over",
      "background-height": bottomOR
    },
    flag: {
      "background-image": `
      <path fill="${flag}" d="
      M ${topOR} 0
      H ${width + 3 * t - topOR}
      a ${topOR + t} ${topOR} 0 0 1 ${topOR + t} ${topOR}
      v ${v}
      a ${bottomOR + t} ${bottomOR} 0 0 1 -${bottomOR + t} ${bottomOR}
      H ${bottomOR + t}
      a ${bottomOR + t} ${bottomOR} 0 0 1 -${bottomOR + t} -${bottomOR}
      v -${v}
      a ${topOR + t} ${topOR} 0 0 1 ${topOR + t} -${topOR}
      Z
      "/>
`,
      "background-position-x": -2 * t,
      "background-position-y": -t,
      "bounds-expansion": 2 * t,
      "background-clip": "none",
      "background-image-containment": "over",
      "background-width": width + 4 * t,
      "background-height": height + 2 * t
    }
  };
};
const complex = (properties, {
  width,
  height,
  drug,
  disease,
  interactor,
  lossOfFunction
}) => {
  const select = extract(properties.global.selectNode);
  const hover = extract(properties.global.hoverNode);
  const flag = extract(properties.global.flag);
  const t = extract(properties.global.thickness);
  const cut = extract(properties.complex.cut);
  const fill = !drug ? interactor ? extract(properties.interactor.fill) : extract(properties.complex.fill) : extract(properties.complex.drug);
  const stroke = !disease ? extract(properties.complex.stroke) : extract(properties.global.negativeContrast);
  const cut2 = cut * 2;
  const t2 = t * 2;
  const v = height - cut2 - 2 * t2; // Vertical
  const delta = 0;
  const stateHeight = height / 2 + t;
  const defs = `<defs>
  <path id="octogon" d="
      M ${cut + t2 + delta} ${t2}
      H ${width - cut - t2 - delta}
      l ${cut} ${cut}
      v ${v}
      l -${cut} ${cut}
      H ${cut + t2 + delta}
      l -${cut} -${cut}
      v -${v}
      l  ${cut} -${cut}
      Z
      "/>
  </defs>`;
  return {
    background: {
      "background-image": `
      ${defs}
      <use href="#octogon" fill="${fill}" stroke="${fill}" stroke-width="${2 * t2}" stroke-linejoin="round"/>
`
    },
    hover: {
      "background-image": `
      <path stroke="${hover}" fill="none" stroke-width="${2 * t2}" stroke-linejoin="round" d="
      M ${t2} ${stateHeight}
      v -${v / 2}
      l ${cut} -${cut + t}
      H ${width - cut - t2}
      l ${cut} ${cut + t}
      v ${v / 2}
      " />
      `,
      "background-position-y": -t,
      "background-height": stateHeight,
      "background-clip": "none",
      "bounds-expansion": t
    },
    select: {
      "background-image": `
      <path stroke="${select}" fill="none" stroke-width="${2 * t2}" stroke-linejoin="round" d="
      M ${t2} ${0}
      v ${v / 2}
      l ${cut} ${cut + t}
      H ${width - cut - t2}
      l ${cut} -${cut + t}
      v -${v / 2}
      " />
      `,
      "background-position-y": height / 2,
      "background-height": stateHeight,
      "background-clip": "none",
      "bounds-expansion": t
    },
    flag: {
      "background-image": `
<path id="octogon" d="
      M ${width / 2} ${3 * t}
      H ${width - cut - delta}
      l ${cut + t} ${cut}
      v ${v}
      l -${cut + t} ${cut}
      H ${cut + delta + 2 * t2}
      l -${cut + t} -${cut}
      v -${v}
      l  ${cut + t} -${cut}
      Z
      " stroke="${flag}" stroke-width="${3 * t2}" stroke-linejoin="round"/>
`,
      "background-position-x": -2 * t,
      "background-position-y": -t,
      "bounds-expansion": 2 * t,
      "background-clip": "none",
      "background-image-containment": "over",
      "background-width": width + 4 * t,
      "background-height": height + 2 * t
    },
    decorators: [{
      "background-image": `
         ${defs}
         <use href="#octogon" fill="none" stroke="${stroke}" stroke-width="${t2}" stroke-linejoin="round" ${lossOfFunction ? `stroke-dasharray="${t2}"` : ''} />
         <use href="#octogon" fill="${fill}" class="gradient"/>
         `,
      requireGradient: true
    }]
  };
};
const entitySet = (properties, {
  width,
  height,
  drug,
  disease,
  lossOfFunction,
  interactor
}) => {
  const select = extract(properties.global.selectNode);
  const hover = extract(properties.global.hoverNode);
  const flag = extract(properties.global.flag);
  const t = extract(properties.global.thickness);
  let r = extract(properties.entitySet.radius);
  if (2 * r > height / 2 - t) {
    r = height / 4 - t / 2;
  }
  width += 2 * r;
  const fill = !interactor ? !drug ? extract(properties.entitySet.fill) : extract(properties.entitySet.drug) : extract(properties.interactor.fill);
  const stroke = !disease ? extract(properties.entitySet.stroke) : extract(properties.global.negativeContrast);
  const r2 = r * 2;
  const t2 = t * 2;
  const v = height / 2 - r2 - t; // Vertical
  const stateHeight = height / 2 + t;
  const bracesOffset = r2 + t2;
  let realDashLength = width;
  if (lossOfFunction) {
    const hidingLength = width - 2 * bracesOffset;
    const idealDashLength = t2;
    const dashNumber = Math.round((hidingLength / idealDashLength + 1) / 2);
    realDashLength = hidingLength / (2 * dashNumber - 1);
  }
  const defs = `<defs>
   <path id="curly" d="
       M ${r2 + t} ${t}
       H ${width - r2 - t}
       a ${r} ${r} 0 0 1 ${r} ${r}

       v ${v}
       a ${r} ${r} 0 0 0 ${r} ${r}
       a ${r} ${r} 0 0 0 -${r} ${r}
       v ${v}

       a ${r} ${r} 0 0 1 -${r} ${r}
       H ${r2 + t}
       a ${r} ${r} 0 0 1 -${r} -${r}

       v -${v}
       a ${r} ${r} 0 0 0 -${r} -${r}
       a ${r} ${r} 0 0 0 ${r} -${r}
       v -${v}

       a ${r} ${r} 0 0 1 ${r} -${r}
       Z
       "/>
   <clipPath id="inside">
     <use href="#curly"/>
   </clipPath>
 </defs>`;
  const t1_5 = t * 1.5;
  return {
    background: {
      "background-image": `
       ${defs}
       <use href="#curly" fill="${fill}" stroke="${fill}" stroke-width="${t2}" stroke-linejoin="round"/>
       `,
      "background-position-x": -r,
      "background-width": width + 2 * r,
      "background-clip": "none",
      "bounds-expansion": 2 * t
    },
    hover: {
      "background-image": `
       <path stroke="${hover}" stroke-width="${t2}" fill="none" stroke-linejoin="round" d="
         M ${r + t} ${stateHeight + r}
         a ${r} ${r} 0 0 0 -${r} -${r}
         a ${r} ${r} 0 0 0 ${r} -${r}
         v -${v}
         a ${r} ${r + t} 0 0 1 ${r} -${r + t}
         H ${width - r2 - t}
         a ${r} ${r + t} 0 0 1 ${r} ${r + t}
         v ${v}
         a ${r} ${r} 0 0 0 ${r} ${r}
         a ${r} ${r} 0 0 0 -${r} ${r}
       "/>`,
      "background-position-x": -r,
      "background-width": width + 2 * r,
      "background-clip": "none",
      "bounds-expansion": 2 * t,
      "background-position-y": -t,
      "background-height": stateHeight
    },
    select: {
      "background-image": `
       <path stroke="${select}" stroke-width="${t2}" fill="none" stroke-linejoin="round" d="
         M ${r + t} ${-r}
         a ${r} ${r} 0 0 1 -${r} ${r}
         a ${r} ${r} 0 0 1 ${r} ${r}
         v ${v}
         a ${r} ${r + t} 0 0 0 ${r} ${r + t}
         H ${width - r2 - t}
         a ${r} ${r + t} 0 0 0 ${r} -${r + t}
         v -${v}
         a ${r} ${r} 0 0 1 ${r} -${r}
         a ${r} ${r} 0 0 1 -${r} -${r}
       "/>`,
      "background-position-x": -r,
      "background-width": width + 2 * r,
      "background-clip": "none",
      "bounds-expansion": 2 * t,
      "background-position-y": height / 2,
      "background-height": stateHeight
    },
    flag: {
      "background-image": `
<rect width="${width}" height="${height + 2 * t}" rx="${r + 3 * t}" ry="${r + t2}" fill="${flag}"/>
`,
      "background-position-x": -2 * t,
      "background-position-y": -t,
      "bounds-expansion": 2 * t,
      "background-clip": "none",
      "background-image-containment": "over",
      "background-width": width,
      "background-height": height + 2 * t
    },
    decorators: [{
      "background-image": `
       ${defs}
       <mask id="myMask">
         <rect fill="white" x="0" y="0" width="${width}" height="${height}"/>
         <rect fill="black" x="${bracesOffset}" y="${0}" width="${width - 2 * bracesOffset}" height="${height}"/>
       </mask>
       <use href="#curly" fill="none" stroke="${stroke}" stroke-width="${t2}" clip-path="url(#inside)" mask="url(#myMask)"/>
`,
      "background-position-x": -r,
      "bounds-expansion": r,
      "background-clip": "none",
      "background-width": width + 2 * r
    }],
    analysis: {
      'background-image': `<rect x="${r * 1.5}" y="${t}" width="${width - 2 * r * 1.5}" rx="${r}" height="${height - t2}" class="gradient"/>`,
      "background-position-x": -r,
      "background-width": width + 2 * r,
      "background-clip": "none",
      "bounds-expansion": 2 * t,
      requireGradient: true
    }
    // analysis: {
    //   'background-image': `${defs}${gradient}
    //   <use href="#curly" fill="url(#gradient)" clip-path="url(#inside)"/>
    //   <mask id="myMask">
    //      <rect fill="white" x="0" y="0" width="${width}" height="${height}"/>
    //      <rect fill="black" x="${bracesOffset}" y="${0}" width="${width - 2 * bracesOffset}" height="${height}"/>
    //    </mask>
    //    <use href="#curly" fill="none" stroke="${stroke}" stroke-width="${t2}" clip-path="url(#inside)" mask="url(#myMask)"/>`,
    //   "background-position-x": -r,
    //   "bounds-expansion": r,
    //   "background-clip": "none",
    //   "background-width": width + 2 * r,
    // }
  };
};

const cell = (properties, {
  width,
  height
}) => {
  const select = extract(properties.global.selectNode);
  const hover = extract(properties.global.hoverNode);
  const flag = extract(properties.global.flag);
  const thick = extract(properties.global.thickness);
  const cellThick = extract(properties.cell.thickness);
  const stroke = extract(properties.cell.stroke);
  const fill = extract(properties.cell.fill);
  const ht = thick / 2;
  const halfHeight = height / 2;
  const oR = halfHeight + thick;
  const iR = halfHeight - thick;
  const oRx = Math.min(oR, width / 2);
  return {
    background: {
      "background-image": `
      <rect x="${ht}" y="${ht}" width="${width - thick}" height="${height - thick}" rx="${halfHeight}" stroke="${fill}" fill="${stroke}" stroke-width="${thick}"/>
      <rect x="${ht + cellThick}" y="${2 * thick}" width="${width - 2 * cellThick - thick}" height="${height - 4 * thick}" ry="${halfHeight}" rx="${halfHeight - cellThick}" fill="${fill}" class="gradient" stroke-width="0"/>
      `,
      requireGradient: true
    },
    hover: {
      "background-image": `
          <path fill="${hover}" stroke-linejoin="round" stroke-linecap="round"  d="
            M 0 ${oR}
            a ${oRx} ${oR} 0 0 1 ${oRx} -${oR}
            h ${width - 2 * oRx}
            a ${oRx} ${oR} 0 0 1 ${oRx} ${oR}
            a ${oRx} ${iR} 0 0 0 -${oRx} -${iR}
            h -${width - 2 * oRx}
            a ${oRx} ${iR} 0 0 0 -${oRx} ${iR}
            Z"/>
`,
      "background-position-y": -thick,
      "bounds-expansion": thick,
      "background-clip": "none",
      "background-image-containment": "over",
      "background-height": oR
    },
    select: {
      "background-image": `
          <path fill="${select}" stroke-linejoin="round" stroke-linecap="round"  d="
            M 0 0
            a ${oRx} ${oR} 0 0 0 ${oRx} ${oR}
            h ${width - 2 * oRx}
            a ${oRx} ${oR} 0 0 0 ${oRx} -${oR}
            a ${oRx} ${iR} 0 0 1 -${oRx} ${iR}
            h -${width - 2 * oRx}
            a ${oRx} ${iR} 0 0 1 -${oRx} -${iR}
            Z"/>
`,
      "background-position-y": halfHeight,
      "bounds-expansion": thick,
      "background-clip": "none",
      "background-image-containment": "over",
      "background-height": oR
    },
    flag: {
      "background-image": `
<rect width="${width + 4 * thick}" height="${height + 2 * thick}" rx="${oR + 2 * thick}" ry="${oR}" fill="${flag}"/>
`,
      "background-position-x": -2 * thick,
      "background-position-y": -thick,
      "bounds-expansion": 2 * thick,
      "background-clip": "none",
      "background-image-containment": "over",
      "background-width": width + 4 * thick,
      "background-height": height + 2 * thick
    }
    // analysis: {
    //   'background-image': `${gradient}<rect x="${ht + cellThick}" y="${2 * thick}" width="${width - 2 * cellThick - thick}" height="${height - 4 * thick}" ry="${halfHeight}" rx="${halfHeight - cellThick}" fill="url(#gradient)" stroke-width="0"/>`
    // }
  };
};

const interactingPathway = (properties, {
  width,
  height,
  drug
}) => {
  const select = extract(properties.global.selectNode);
  const hover = extract(properties.global.hoverNode);
  const flag = extract(properties.global.flag);
  const thick = extract(properties.global.thickness);
  let realWidth = width;
  const t = 3 * thick;
  return {
    hover: {
      "background-image": `<rect fill="${hover}" width="${width}" height="${t}"/>`,
      "background-width": width,
      "background-height": t
    },
    select: {
      "background-image": `<rect fill="${select}" width="${width}" height="${t}"/>`,
      "background-position-y": height - t,
      "background-width": width,
      "background-height": t
    },
    flag: {
      "background-image": `
<rect fill="${flag}" width="${t}" height="${height}"/>
<rect fill="${flag}" width="${t}" height="${height}" x="${realWidth + t}"/>
`,
      "background-width": realWidth + 4 * t,
      "background-position-x": -t,
      "background-height": height,
      "bounds-expansion": 2 * t,
      "background-clip": "none",
      "background-image-containment": "over"
    },
    analysis: {
      "background-image": `<rect class="gradient" x="${t}" y="${t}" width="${width - 2 * t}" height="${height - 2 * t}"/>`,
      requireGradient: true
    }
  };
};
const diseaseInteractor = (properties, {
  width,
  height,
  drug,
  disease,
  interactor
}) => {
  const hover = extract(properties.global.hoverNode);
  const select = extract(properties.global.selectNode);
  const fill = extract(properties.global.negative);
  const t = extract(properties.global.thickness);
  const decorationWidth = extract(properties.interactor.decorationWidth);
  const t4 = t * 4;
  const t2 = t * 2;
  const h = height / 2 + t2;
  const midH = height / 2;
  return {
    decorators: [{
      "background-image": `
      <path fill="${fill}" stroke-linejoin="round" stroke-linecap="round" stroke-width="${t4}" stroke="${fill}"  d="
      M ${t2} ${midH}
      L ${decorationWidth + t2} ${t2}
      H ${width - (decorationWidth + t2)}
      L ${width - t2} ${midH}
      L ${width - (decorationWidth + t2)} ${height - t2}
      H ${decorationWidth + t2}
      Z
      " />
      `
    }],
    hover: {
      "background-image": `
      <path stroke="${hover}" stroke-linejoin="round" stroke-linecap="round" stroke-width="${t4}" d="
      M ${t2} ${midH + t2}
      L ${decorationWidth + t2} ${t2}
      H ${width - (decorationWidth + t2)}
      L ${width - t2} ${midH + t2}
      Z
      " />
      `,
      "background-position-y": -t2,
      "background-height": h,
      "background-clip": "none",
      "bounds-expansion": t2,
      "background-image-containment": "over"
    },
    select: {
      "background-image": `
      <path stroke="${select}" stroke-linejoin="round" stroke-linecap="round" stroke-width="${t4}" d="
      M ${t2} 0
      L ${decorationWidth + t2} ${midH}
      H ${width - (decorationWidth + t2)}
      L ${width - t2} 0
      Z
      " />
      `,
      "background-position-y": midH,
      "background-height": h,
      "background-clip": "none",
      "bounds-expansion": t2,
      "background-image-containment": "over"
    }
  };
};
const subPathway = (properties, {
  width,
  height,
  disease
}) => {
  const select = extract(properties.global.selectNode);
  const hover = extract(properties.global.hoverNode);
  const flag = extract(properties.global.flag);
  const thick = extract(properties.global.thickness) * 3;
  const stroke = !disease ? extract(properties.pathway.stroke) : extract(properties.global.negativeContrast);
  const halfHeight = height / 2;
  const oR = halfHeight;
  const iR = halfHeight - thick;
  const oRx = Math.min(oR, width / 2);
  return {
    hover: {
      "background-image": `
          <path fill="${hover}" stroke-linejoin="round" stroke-linecap="round"  d="
            M 0 ${oR}
            a ${oRx} ${oR} 0 0 1 ${oRx} -${oR}
            h ${width - 2 * oRx}
            a ${oRx} ${oR} 0 0 1 ${oRx} ${oR}
            a ${oRx} ${iR} 0 0 0 -${oRx} -${iR}
            h -${width - 2 * oRx}
            a ${oRx} ${iR} 0 0 0 -${oRx} ${iR}
            Z"/>
`,
      "background-clip": "none",
      "background-image-containment": "over",
      "background-height": oR
    },
    select: {
      "background-image": `
          <path fill="${select}" stroke-linejoin="round" stroke-linecap="round"  d="
            M 0 0
            a ${oRx} ${oR} 0 0 0 ${oRx} ${oR}
            h ${width - 2 * oRx}
            a ${oRx} ${oR} 0 0 0 ${oRx} -${oR}
            a ${oRx} ${iR} 0 0 1 -${oRx} ${iR}
            h -${width - 2 * oRx}
            a ${oRx} ${iR} 0 0 1 -${oRx} -${iR}
            Z"/>
`,
      "background-position-y": halfHeight,
      "background-clip": "none",
      "background-image-containment": "over",
      "background-height": oR
    },
    flag: {
      "background-image": `
<rect width="${width + 2 * thick}" height="${height}" rx="${oR + thick}" ry="${oR}" fill="${flag}"/>
`,
      "background-position-x": -thick,
      "bounds-expansion": 2 * thick,
      "background-clip": "none",
      "background-image-containment": "over",
      "background-width": width + 2 * thick
    },
    analysis: {
      "background-image": `<rect class="gradient" x="${thick}" y="${thick}" width="${width - 2 * thick}" height="${height - 2 * thick}" rx="${(height - 2 * thick) / 2}"/>`,
      requireGradient: true
    }
  };
};
const imageBuilder = (properties, style) => (0,lodash__WEBPACK_IMPORTED_MODULE_1__.memoize)(node => {
  // console.time(`build-image-${node.id()}`)
  let layers = [];
  const clazz = node.classes().find(clazz => classToDrawers.has(clazz));
  if (!clazz) return aggregate(layers, defaultBg);
  const provider = classToDrawers.get(clazz);
  const exps = node.data('exp');
  const drawerParams = {
    id: node.id(),
    width: node.data("width"),
    height: node.data("height"),
    drug: node.hasClass('drug'),
    disease: node.hasClass('disease'),
    interactor: node.hasClass('Interactor'),
    crossed: node.hasClass('crossed'),
    lossOfFunction: node.hasClass('loss-of-function')
  };
  const drawer = provider(properties, drawerParams);
  if (node.hasClass('flag') && drawer.flag) layers.push(drawer.flag);
  if (drawer.background) layers.push(drawer.background);
  if (exps && drawer.analysis) layers.push(drawer.analysis);
  if (node.selected() && drawer.select) layers.push(drawer.select);
  if (node.hasClass('hover') && drawer.hover) layers.push(drawer.hover);
  if (drawer.decorators) layers.push(...drawer.decorators);
  if (drawerParams.drug) {
    layers.push(RX(properties, drawerParams, clazz));
  }
  if (node.classes().includes('Pathway')) {
    layers.push(Pathway(properties, drawerParams));
  }
  if (drawerParams.crossed) layers.push(CROSS(properties, drawerParams));
  const gradient = expToGradient(node.id(), exps, properties, style.currentPalette);
  // Convert raw HTML to string encoded images
  layers = layers.map(l => {
    if (l.requireGradient && gradient) l["background-image"] = addGradient(l["background-image"], gradient);
    return l;
  }).map(l => ({
    ...l,
    "background-image": svgStr(l["background-image"], (0,lodash__WEBPACK_IMPORTED_MODULE_1__.isNumber)(l["background-width"]) ? l["background-width"] : drawerParams.width, (0,lodash__WEBPACK_IMPORTED_MODULE_1__.isNumber)(l["background-height"]) ? l["background-height"] : drawerParams.height)
  }));
  const aggregated = aggregate(layers, defaultBg);
  aggregated['bounds-expansion'] = [Math.max(...aggregated['bounds-expansion'], 0)];
  // console.timeEnd(`build-image-${node.id()}`)
  return aggregated;
}, node => `${node.id()}-${node.classes().toString()}-s:${node.selected()}`);
const defaultBg = {
  "background-image": "",
  "background-position-x": "0",
  "background-position-y": "0",
  "background-offset-x": "0",
  "background-offset-y": "0",
  "background-width": "100%",
  "background-height": "100%",
  "background-fit": "none",
  "background-clip": "none",
  "background-image-opacity": 1,
  "background-image-containment": "over",
  "background-image-smoothing": "yes",
  "background-height-relative-to": "inner",
  "background-width-relative-to": "inner",
  "background-repeat": "no-repeat",
  "background-image-crossorigin": "anonymous",
  "bounds-expansion": 0
};
function addGradient(svgText, gradient) {
  return `<style>.gradient{fill: url(#gradient)}</style>${gradient}${svgText}`;
}
function _expToGradient(id, exps, properties, palette) {
  if (!exps) return;
  // console.time('exp-to-gradient')
  const stops = [];
  const size = exps.reduce((l, e) => e !== undefined && (0,lodash__WEBPACK_IMPORTED_MODULE_1__.isArray)(e) ? l + e[1] : l + 1, 0);
  const delta = 1 / size;
  const notFoundColor = extract(properties.analysis.notFound);
  exps.forEach((exp, i) => {
    const p = stops.length - 1;
    if (stops.length !== 0 && stops[p].exp === exp) {
      stops[p].stop += delta;
      stops[p].width += delta;
    } else {
      if ((0,lodash__WEBPACK_IMPORTED_MODULE_1__.isArray)(exp)) {
        stops.push({
          start: stops[p]?.stop || 0,
          stop: (stops[p]?.stop || 0) + delta * exp[1],
          width: delta * exp[1],
          color: exp[0] !== undefined ? palette(exp[0]).hex() : notFoundColor,
          exp: exp[0]
        });
        // console.log(stops, exps)
      } else {
        stops.push({
          start: stops[p]?.stop || 0,
          stop: (stops[p]?.stop || 0) + delta,
          color: exp !== undefined ? palette(exp).hex() : notFoundColor,
          width: delta,
          exp: exp
        });
      }
    }
  });
  const pattern = '<defs><pattern id="gradient" patternUnits="objectBoundingBox" width="1" height="1" viewBox="0 0 1 1" preserveAspectRatio="none">' + stops.map((stop, i) => `<rect fill="${stop.color}" x="${stop.start}" height="1" width="${stop.width + 0.01}"/>`).join('') + '</pattern></defs>';
  // const gradient = '<defs><linearGradient id="gradient">' +
  //     stops
  //         .map(stop => `<stop stop-color="${stop.color}" offset="${stop.start}"/><stop stop-color="${stop.color}" offset="${stop.stop}"/>`)
  //         .join('') +
  //     '</linearGradient></defs>'
  // console.timeEnd('exp-to-gradient')
  // console.log(exps)
  return pattern;
}
const expToGradient = (0,lodash__WEBPACK_IMPORTED_MODULE_1__.memoize)(_expToGradient, id => id);
const resetGradients = () => expToGradient.cache.clear();
function svg(svgStr, width = 100, height = 100) {
  // const cleanedStr = svgStr.replaceAll(/  {2,}|\n/g, " "); // TODO examine performance impact
  return `<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE svg><svg xmlns='http://www.w3.org/2000/svg' version='1.1' width='${width}' height='${height}'>${svgStr}</svg>`;
}
function svgStr(svgText, viewPortWidth, viewPortHeight) {
  return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg(svgText, viewPortWidth, viewPortHeight));
}
const dim = (properties, {
  id
}) => id;
const classToDrawers = new Map([["Protein", (0,lodash__WEBPACK_IMPORTED_MODULE_1__.memoize)(protein, dim)], ["GenomeEncodedEntity", (0,lodash__WEBPACK_IMPORTED_MODULE_1__.memoize)(genomeEncodedEntity, dim)], ["RNA", (0,lodash__WEBPACK_IMPORTED_MODULE_1__.memoize)(rna, dim)], ["Gene", (0,lodash__WEBPACK_IMPORTED_MODULE_1__.memoize)(gene, dim)], ["Molecule", (0,lodash__WEBPACK_IMPORTED_MODULE_1__.memoize)(molecule, dim)], ["Complex", (0,lodash__WEBPACK_IMPORTED_MODULE_1__.memoize)(complex, dim)], ["EntitySet", (0,lodash__WEBPACK_IMPORTED_MODULE_1__.memoize)(entitySet, dim)], ["Cell", (0,lodash__WEBPACK_IMPORTED_MODULE_1__.memoize)(cell, dim)], ["Interacting", (0,lodash__WEBPACK_IMPORTED_MODULE_1__.memoize)(interactingPathway, dim)], ["SUB", (0,lodash__WEBPACK_IMPORTED_MODULE_1__.memoize)(subPathway, dim)], ["Interactor", (0,lodash__WEBPACK_IMPORTED_MODULE_1__.memoize)(diseaseInteractor, dim)]]);
function clearDrawersCache() {
  for (let value of classToDrawers.values()) {
    value.cache.clear();
  }
  OMMITED_ICON.cache.clear();
}
function aggregate(toAggregate, defaultValue) {
  const aggregate = {};
  //@ts-ignore
  const keys = new Set(Object.keys(defaultValue));
  keys.forEach(key => aggregate[key] = toAggregate.map(t => t[key] || defaultValue[key]));
  return aggregate;
}
const RX = (properties, {
  height
}, clazz) => {
  const t = extract(properties.global.thickness);
  const color = clazz !== 'Molecule' ? extract(properties.global.onPrimary) : extract(properties.molecule.drug);
  const x = (clazz !== 'EntitySet' ? 0 : extract(properties.entitySet.radius)) + 3 * t;
  return {
    "background-image": `
      <path style="transform: scale(2)" fill="${color}" stroke-width="0.4" stroke="${color}" d="M3.2 4C3.3 4 3.4 4 3.6 4L6.75 8.81L5.7 10.15C5.7 10.15 5.53985 10.3884 5.31824 10.6092C5.00434 10.922 4.6582 11.3 4.28711 11.3C4.19141 11.3 4.2 11.3 4.1 11.3V11.5H6.4V11.3C6.2 11.3 6 11.3 5.9 11.2C5.8 11.1 5.8 11 5.8 10.9C5.8 10.6301 5.9 10.5547 6.16055 10.226L7 9.2L7.65291 10.226C7.82889 10.5025 8 10.7344 8 10.9C8 11.0656 7.90095 11.3 7.65291 11.3C7.55291 11.3 7.6 11.3 7.4 11.3V11.5H10.2V11.3C9.9 11.3 9.7 11.2 9.5 11C9.24121 10.7412 9 10.5 8.6 10L7.6 8.5L8.48711 7.35309C8.55228 7.28792 8.61656 7.21558 8.68081 7.13924C9.09787 6.6437 9.64859 6 10.2 6.01309V5.81309H7.8V6.01309C8 6.01309 8.2 6.01309 8.3 6.01309C8.45586 6.01309 8.6 6.20329 8.6 6.31309C8.6 6.62136 8.43963 6.81922 8.2462 7.03337L7.3 8.1L4.5 3.9C5.1 3.8 5.4 3.61 5.7 3.31C6 3.01 6.2 2.6 6.2 2.2C6.2 1.8 6.08711 1.47 5.78711 1.17C5.52798 0.910875 5.3 0.8 5 0.7C4.6 0.6 4.1 0.5 3.4 0.5H1V0.7H1.2C1.82201 0.7 2 1.14292 2 1.7V6C2 6.59634 2 6.9 1.2 6.9H1V7.1H3.8V6.9H3.6C2.9041 6.9 2.9 6.61047 2.9 6V4H3H3.2ZM3 3.7C3 3.7 3 3.7 2.9 3.7L2.88711 1C3.18711 0.9 3.4 0.9 3.6 0.9C4.47782 0.9 5 1.42405 5 2.3C5 3.40743 4.15401 3.7 3.2 3.7H3Z"/>
    `,
    "background-position-x": x,
    "background-position-y": height / 2 - 11 + 'px',
    "background-width": 22,
    "background-height": 24
  };
};
const Pathway = (properties, {
  height,
  disease
}) => {
  const t = extract(properties.global.thickness);
  const color = !disease ? extract(properties.global.onPrimary) : extract(properties.global.negativeContrast);
  let x = 5 * t;
  return {
    "background-image": `
      <path style="transform: scale(1.5)" fill="${color}" stroke-width="0.4" stroke="${color}" d="M19.6864 21.0381C19.0364 21.0381 18.4531 20.8508 17.9364 20.4761C17.4197 20.1008 17.0614 19.6214 16.8614 19.0381H11.6864C10.5864 19.0381 9.64473 18.6464 8.8614 17.8631C8.07807 17.0798 7.6864 16.1381 7.6864 15.0381C7.6864 13.9381 8.07807 12.9964 8.8614 12.2131C9.64473 11.4298 10.5864 11.0381 11.6864 11.0381H13.6864C14.2364 11.0381 14.7074 10.8421 15.0994 10.4501C15.4907 10.0588 15.6864 9.58809 15.6864 9.03809C15.6864 8.48809 15.4907 8.01709 15.0994 7.62509C14.7074 7.23375 14.2364 7.03809 13.6864 7.03809H8.5114C8.29473 7.62142 7.9324 8.10075 7.4244 8.47609C6.91573 8.85075 6.3364 9.03809 5.6864 9.03809C4.85307 9.03809 4.14473 8.74642 3.5614 8.16309C2.97807 7.57975 2.6864 6.87142 2.6864 6.03809C2.6864 5.20475 2.97807 4.49642 3.5614 3.91309C4.14473 3.32975 4.85307 3.03809 5.6864 3.03809C6.3364 3.03809 6.91573 3.22542 7.4244 3.60009C7.9324 3.97542 8.29473 4.45475 8.5114 5.03809H13.6864C14.7864 5.03809 15.7281 5.42975 16.5114 6.21309C17.2947 6.99642 17.6864 7.93809 17.6864 9.03809C17.6864 10.1381 17.2947 11.0798 16.5114 11.8631C15.7281 12.6464 14.7864 13.0381 13.6864 13.0381H11.6864C11.1364 13.0381 10.6657 13.2338 10.2744 13.6251C9.8824 14.0171 9.6864 14.4881 9.6864 15.0381C9.6864 15.5881 9.8824 16.0591 10.2744 16.4511C10.6657 16.8424 11.1364 17.0381 11.6864 17.0381H16.8614C17.0781 16.4548 17.4407 15.9754 17.9494 15.6001C18.4574 15.2254 19.0364 15.0381 19.6864 15.0381C20.5197 15.0381 21.2281 15.3298 21.8114 15.9131C22.3947 16.4964 22.6864 17.2048 22.6864 18.0381C22.6864 18.8714 22.3947 19.5798 21.8114 20.1631C21.2281 20.7464 20.5197 21.0381 19.6864 21.0381ZM5.6864 7.03809C5.96973 7.03809 6.2074 6.94242 6.3994 6.75109C6.59073 6.55909 6.6864 6.32142 6.6864 6.03809C6.6864 5.75475 6.59073 5.51709 6.3994 5.32509C6.2074 5.13375 5.96973 5.03809 5.6864 5.03809C5.40307 5.03809 5.1654 5.13375 4.9734 5.32509C4.78207 5.51709 4.6864 5.75475 4.6864 6.03809C4.6864 6.32142 4.78207 6.55909 4.9734 6.75109C5.1654 6.94242 5.40307 7.03809 5.6864 7.03809Z" />
    `,
    "background-position-x": x,
    "background-position-y": height / 2 - 18 + 'px',
    "background-width": 36,
    "background-height": 36
  };
};
const CROSS = (0,lodash__WEBPACK_IMPORTED_MODULE_1__.memoize)((properties, {
  width,
  height
}) => {
  const s = extract(properties.global.negative);
  const t = extract(properties.global.thickness);
  return {
    "background-image": `<line x1="${t}" y1="${t}" x2="${width - t}" y2="${height - t}" stroke-width="${2 * t}" stroke-linecap="round" stroke="${s}"/><line x1="${t}" y1="${height - t}" x2="${width - t}" y2="${t}" stroke-width="${2 * t}" stroke-linecap="round" stroke="${s}"/>`,
    "background-image-opacity": 1
  };
}, (p, {
  width,
  height
}) => `${width}x${height}`);
const OMMITED_ICON = (0,lodash__WEBPACK_IMPORTED_MODULE_1__.memoize)(properties => {
  const s = extract(properties.global.onSurface);
  return svgStr(`<line x1="2.5" y1="3" x2="4.5" y2="7" stroke-width="1.5" stroke-linecap="round" stroke="${s}"/><line x1="5.5" y1="3" x2="7.5" y2="7" stroke-width="1.5" stroke-linecap="round" stroke="${s}"/>`, 10, 10);
}, p => '');
function setDefaults(properties = {}, css) {
  const global = defaultable(properties.global || {}).setDefault('thickness', 4).setDefault('surface', () => css.getPropertyValue('--surface') || '#F6FEFF').setDefault('onSurface', () => css.getPropertyValue('--on-surface') || '#001F24').setDefault('primary', () => css.getPropertyValue('--primary') || '#006782').setDefault('onPrimary', () => css.getPropertyValue('--on-primary') || '#FFFFFF').setDefault('positive', () => css.getPropertyValue('--positive') || '#0C9509').setDefault('negative', () => css.getPropertyValue('--negative') || '#BA1A1A').setDefault('negativeContrast', () => css.getPropertyValue('--negative-contrast') || '#ea7d7d').setDefault('selectNode', () => css.getPropertyValue('--select-node') || '#6EB3E4').setDefault('selectEdge', () => css.getPropertyValue('--select-edge') || '#0561A6').setDefault('hoverNode', () => css.getPropertyValue('--hover-node') || '#78E076').setDefault('hoverEdge', () => css.getPropertyValue('--hover-edge') || '#04B601').setDefault('flag', () => css.getPropertyValue('--flag') || '#DE75B4');
  const compartment = defaultable(properties.compartment || {}).setDefault('opacity', () => Number.parseFloat(css.getPropertyValue('--opacity')) || 0.06).setDefault('fill', () => css.getPropertyValue('--compartment') || '#E5834A');
  const shadow = defaultable(properties.shadow || {}).setDefault('luminosity', () => Number.parseFloat(css.getPropertyValue('--shadow-luminosity')) || 40).setDefault('padding', () => Number.parseFloat(css.getPropertyValue('--shadow-padding')) || 20).setDefault('fontSize', () => Number.parseFloat(css.getPropertyValue('--shadow-font-size')) || 80).setDefault('fontPadding', () => Number.parseFloat(css.getPropertyValue('--shadow-font-padding')) || 15).setDefault('opacity', () => {
    const p = css.getPropertyValue('--shadow-opacity');
    return p ? JSON.parse(p) : [[20, 20], [40, 0]];
  }).setDefault('labelOpacity', () => {
    const p = css.getPropertyValue('--shadow-label-opacity');
    return p ? JSON.parse(p) : [[20, 100], [40, 0]];
  });
  const protein = defaultable(properties.protein || {}).setDefault('fill', () => css.getPropertyValue('--primary-contrast-1') || '#001F29').setDefault('drug', () => css.getPropertyValue('--drug-contrast-1') || '#3E001D').setDefault('radius', 8);
  const genomeEncodedEntity = defaultable(properties.genomeEncodedEntity || {}).setDefault('fill', () => css.getPropertyValue('--primary-contrast-4') || '#006782').setDefault('drug', () => css.getPropertyValue('--drug-contrast-4') || '#BB557A').setDefault('bottomRadius', 6).setDefault('topRadius', 40);
  const rna = defaultable(properties.rna || {}).setDefault('fill', () => css.getPropertyValue('--primary-contrast-2') || '#003545').setDefault('drug', () => css.getPropertyValue('--drug-contrast-2') || '#610B33').setDefault('radius', 8);
  const gene = defaultable(properties.gene || {}).setDefault('decorationHeight', 20).setDefault('decorationExtraWidth', 17).setDefault("arrowHeadSize", 10).setDefault("borderRadius", 8).setDefault("arrowRadius", 8).setDefault("fill", () => css.getPropertyValue('--primary-contrast-3') || '#004D62');
  const molecule = defaultable(properties.molecule || {}).setDefault("fill", () => extract(global.surface)).setDefault("stroke", () => extract(global.onSurface)).setDefault('drug', () => css.getPropertyValue('--drug-contrast-3') || '#9C3D61');
  const complex = defaultable(properties.complex || {}).setDefault("cut", 8).setDefault("fill", () => css.getPropertyValue('--tertiary-contrast-1') || '#00315C').setDefault("stroke", () => css.getPropertyValue('--on-tertiary') || '#FFFFFF').setDefault('drug', () => css.getPropertyValue('--drug-contrast-3') || '#7E2549');
  const entitySet = defaultable(properties.entitySet || {}).setDefault("radius", 8).setDefault("fill", () => css.getPropertyValue('--tertiary-contrast-3') || '#1660A5').setDefault("stroke", () => css.getPropertyValue('--on-tertiary') || '#FFFFFF').setDefault('drug', () => css.getPropertyValue('--drug-contrast-4') || '#BB557A');
  const cell = defaultable(properties.cell || {}).setDefault('thickness', () => Number.parseFloat(css.getPropertyValue('--cell-thickness')) || 16).setDefault("fill", () => css.getPropertyValue('--tertiary-contrast-2') || '#004882').setDefault("stroke", () => css.getPropertyValue('--on-tertiary') || '#FFFFFF');
  const pathway = defaultable(properties.pathway || {}).setDefault("fill", () => css.getPropertyValue('--primary-contrast-4') || '#006782').setDefault("stroke", () => extract(global.onPrimary));
  const modification = defaultable(properties.modification || {}).setDefault("fill", () => css.getPropertyValue('--primary-contrast-2') || '#003545');
  const interactor = defaultable(properties.interactor || {}).setDefault("fill", () => css.getPropertyValue('--interactor-fill') || '#68297C').setDefault("stroke", () => css.getPropertyValue('--interactor-stroke') || '#9f5cb5').setDefault('decorationWidth', () => Number.parseFloat(css.getPropertyValue('--decorationWidth')) || 20);
  const trivial = defaultable(properties.trivial || {}).setDefault('opacity', () => {
    const p = css.getPropertyValue('--trivial-opacity');
    return p ? JSON.parse(p) : [[40, 0], [60, 100]];
  });
  const structure = defaultable(properties.structure || {}).setDefault('opacity', () => {
    const p = css.getPropertyValue('--structure-opacity');
    return p ? JSON.parse(p) : [[130, 0], [150, 100]];
  });
  const font = defaultable(properties.font || {}).setDefault('size', 12);
  const analysis = defaultable(properties.analysis || {}).setDefault("min", Number.parseFloat(css.getPropertyValue('--analysis-min')) || 0).setDefault("max", Number.parseFloat(css.getPropertyValue('--analysis-max')) || 1).setDefault("notFound", css.getPropertyValue('--analysis-not-found') || extract(global.onSurface)).setDefault("unidirectionalPalette", () => {
    const p = css.getPropertyValue('--analysis-uni-palette');
    console.error(p, typeof p);
    return p ? JSON.parse(p) : [[0.000, '#FFFFE0'], [1.000, '#00429D']];
  }).setDefault("bidirectionalPalette", () => {
    const p = css.getPropertyValue('--analysis-bi-palette');
    console.error(p, typeof p);
    return p ? JSON.parse(p) : [[0.000, '#93003A'], [0.500, '#FFFFE0'], [1.000, '#00429D']];
  });
  const features = defaultable(properties.features || {}).setDefault("edit", false).setDefault("compare", true).setDefault("analysis", true).setDefault("interactors", true);
  return {
    global,
    compartment,
    shadow,
    protein,
    genomeEncodedEntity,
    rna,
    gene,
    molecule,
    complex,
    entitySet,
    cell,
    pathway,
    modification,
    interactor,
    trivial,
    structure,
    font,
    analysis,
    features
  };
}
var ReactomeEventTypes;
(function (ReactomeEventTypes) {
  ReactomeEventTypes["hover"] = "reactome::hover";
  ReactomeEventTypes["leave"] = "reactome::leave";
  ReactomeEventTypes["select"] = "reactome::select";
  ReactomeEventTypes["unselect"] = "reactome::unselect";
  ReactomeEventTypes["open"] = "reactome::open";
  ReactomeEventTypes["close"] = "reactome::close";
})(ReactomeEventTypes || (ReactomeEventTypes = {}));
class ReactomeEvent extends CustomEvent {
  constructor(type, target) {
    super(type, {
      detail: target
    });
  }
}
cytoscape__WEBPACK_IMPORTED_MODULE_2__["default"].use(cytoscape_layers__WEBPACK_IMPORTED_MODULE_4__["default"]);
class Interactivity {
  constructor(cy, properties) {
    this.cy = cy;
    this.properties = properties;
    this.isMobile = [/Android/i, /webOS/i, /iPhone/i, /iPad/i, /iPod/i, /BlackBerry/i, /Windows Phone/i].some(toMatchItem => navigator.userAgent.match(toMatchItem));
    this.applyToReaction = (action, stateKey) => reactionNode => {
      if (state[stateKey]) return;
      state[stateKey] = true;
      action(this.expandReaction(reactionNode));
      state[stateKey] = false;
    };
    this.onZoom = {
      shadow: () => undefined,
      protein: () => undefined
    };
    this.margin = 0;
    // @ts-ignore
    cy.elements().ungrabify().panify();
    this.initHover(cy);
    this.initSelect(cy);
    this.initClick(cy);
    this.initStructureVideo(cy);
    this.initStructureMolecule(cy);
    this.initZoom(cy);
  }
  expandReaction(reactionNode) {
    return reactionNode.connectedEdges().add(reactionNode);
  }
  initHover(cy, mapper = x => x) {
    const hoverReaction = this.applyToReaction(col => col.addClass('hover'), 'hovering');
    const deHoverReaction = this.applyToReaction(col => col.removeClass('hover'), 'deHovering');
    const container = cy.container();
    cy.on('mouseover', 'node.PhysicalEntity', e => container.dispatchEvent(new ReactomeEvent(ReactomeEventTypes.hover, {
      element: e.target,
      type: "PhysicalEntity",
      reactomeId: e.target.data('reactomeId'),
      cy
    }))).on('mouseover', 'node.Pathway', e => container.dispatchEvent(new ReactomeEvent(ReactomeEventTypes.hover, {
      element: e.target,
      type: "Pathway",
      reactomeId: e.target.data('reactomeId'),
      cy
    }))).on('mouseover', 'node.reaction', e => container.dispatchEvent(new ReactomeEvent(ReactomeEventTypes.hover, {
      element: e.target,
      type: "reaction",
      reactomeId: e.target.data('reactomeId'),
      cy
    }))).on('mouseover', 'edge.reaction', e => container.dispatchEvent(new ReactomeEvent(ReactomeEventTypes.hover, {
      element: e.target.connectedNodes('.reaction'),
      type: "reaction",
      reactomeId: e.target.data('reactomeId'),
      cy
    }))).on('mouseout', 'node.PhysicalEntity', e => container.dispatchEvent(new ReactomeEvent(ReactomeEventTypes.leave, {
      element: e.target,
      type: "PhysicalEntity",
      reactomeId: e.target.data('reactomeId'),
      cy
    }))).on('mouseout', 'node.Pathway', e => container.dispatchEvent(new ReactomeEvent(ReactomeEventTypes.leave, {
      element: e.target,
      type: "Pathway",
      reactomeId: e.target.data('reactomeId'),
      cy
    }))).on('mouseout', 'node.reaction', e => container.dispatchEvent(new ReactomeEvent(ReactomeEventTypes.leave, {
      element: e.target,
      type: "reaction",
      reactomeId: e.target.data('reactomeId'),
      cy
    }))).on('mouseout', 'edge.reaction', e => container.dispatchEvent(new ReactomeEvent(ReactomeEventTypes.leave, {
      element: e.target.connectedNodes('.reaction'),
      type: "reaction",
      reactomeId: e.target.data('reactomeId'),
      cy
    }))).on('mouseover', 'node', e => mapper(e.target).addClass('hover')).on('mouseout', 'node', e => mapper(e.target).removeClass('hover')).on('mouseover', 'node.reaction', e => hoverReaction(mapper(e.target))).on('mouseout', 'node.reaction', e => deHoverReaction(mapper(e.target))).on('mouseover', 'edge', e => {
      const mapped = mapper(e.target);
      if (mapped !== e.target) console.log(mapped, mapped.connectedNodes('.reaction'));
      hoverReaction(mapped.connectedNodes('.reaction'));
    }).on('mouseout', 'edge', e => deHoverReaction(mapper(e.target).connectedNodes('.reaction'))).on('mouseover', 'node.Modification', e => mapper(cy.nodes(`#${e.target.data('nodeId')}`)).addClass('hover')).on('mouseout', 'node.Modification', e => mapper(cy.nodes(`#${e.target.data('nodeId')}`)).removeClass('hover')).on('mouseover', 'edge.Interactor', e => mapper(cy.edges(`#${e.target.data('id')}`)).addClass('hover')).on('mouseout', 'edge.Interactor', e => mapper(cy.edges(`#${e.target.data('id')}`)).removeClass('hover'));
  }
  initSelect(cy, mapper = x => x) {
    const selectReaction = this.applyToReaction(col => col.select(), 'selecting');
    const container = cy.container();
    cy.on('select', 'node.PhysicalEntity', e => container.dispatchEvent(new ReactomeEvent(ReactomeEventTypes.select, {
      element: e.target,
      type: "PhysicalEntity",
      reactomeId: e.target.data('reactomeId'),
      cy
    }))).on('select', 'node.Pathway', e => container.dispatchEvent(new ReactomeEvent(ReactomeEventTypes.select, {
      element: e.target,
      type: "Pathway",
      reactomeId: e.target.data('reactomeId'),
      cy
    }))).on('select', 'node.reaction', e => container.dispatchEvent(new ReactomeEvent(ReactomeEventTypes.select, {
      element: e.target,
      type: "reaction",
      reactomeId: e.target.data('reactomeId'),
      cy
    }))).on('select', 'edge.reaction', e => container.dispatchEvent(new ReactomeEvent(ReactomeEventTypes.select, {
      element: e.target.connectedNodes('.reaction'),
      type: "reaction",
      reactomeId: e.target.data('reactomeId'),
      cy
    }))).on('unselect', 'node.PhysicalEntity', e => container.dispatchEvent(new ReactomeEvent(ReactomeEventTypes.unselect, {
      element: e.target,
      type: "PhysicalEntity",
      reactomeId: e.target.data('reactomeId'),
      cy
    }))).on('unselect', 'node.Pathway', e => container.dispatchEvent(new ReactomeEvent(ReactomeEventTypes.unselect, {
      element: e.target,
      type: "Pathway",
      reactomeId: e.target.data('reactomeId'),
      cy
    }))).on('unselect', 'node.reaction', e => container.dispatchEvent(new ReactomeEvent(ReactomeEventTypes.unselect, {
      element: e.target,
      type: "reaction",
      reactomeId: e.target.data('reactomeId'),
      cy
    }))).on('unselect', 'edge.reaction', e => container.dispatchEvent(new ReactomeEvent(ReactomeEventTypes.unselect, {
      element: e.target.connectedNodes('.reaction'),
      type: "reaction",
      reactomeId: e.target.data('reactomeId'),
      cy
    }))).on('select', 'edge', e => selectReaction(mapper(e.target).connectedNodes('.reaction'))).on('unselect', 'edge', () => selectReaction(mapper(cy.edges(':selected').connectedNodes('.reaction').add(cy.nodes('.reaction:selected'))))) // Avoid single element selection when double-clicking
    .on('select', 'node.reaction', event => selectReaction(mapper(event.target))).on('select', 'node.Modification', e => mapper(cy.nodes(`#${e.target.data('nodeId')}`)).select());
  }
  initClick(cy) {
    const container = cy.container();
    cy.on('click', 'node.InteractorOccurrences', e => {
      const openClass = 'opened';
      let eventType = !e.target.hasClass(openClass) ? ReactomeEventTypes.open : ReactomeEventTypes.close;
      e.target.toggleClass(openClass);
      container.dispatchEvent(new ReactomeEvent(eventType, {
        element: e.target,
        type: "Interactor",
        reactomeId: e.target.data('reactomeId'),
        cy
      }));
    }).on('click', '.Interactor', e => {
      const prop = e.target.isNode() ? 'accURL' : 'evidenceURLs';
      const url = e.target.data(prop);
      if (url) window.open(url);
    }).on('click', '.DiseaseInteractor', e => {
      const prop = e.target.isNode() ? 'accURL' : 'evidenceURLs';
      const url = e.target.data(prop);
      if (url) window.open(url);
    });
    // .on('click', e => {
    //   const openClass = 'opened';
    //   let eventType = !e.target.hasClass(openClass) ? ReactomeEventTypes.open : ReactomeEventTypes.close;
    //   e.target.toggleClass(openClass);
    //   container.dispatchEvent(new ReactomeEvent(eventType, {
    //     element: e.target,
    //     type: "Any",
    //     reactomeId: e.target.data('reactomeId'),
    //     cy
    //   }))
    // });
  }

  initStructureVideo(cy) {
    var _this = this;
    const layersPlugin = (0,cytoscape_layers__WEBPACK_IMPORTED_MODULE_4__.layers)(cy);
    this.videoLayer = layersPlugin.append('html');
    if (this.videoLayer) this.videoLayer.node.style.opacity = '0';
    layersPlugin.renderPerNode(this.videoLayer, elem => {
      elem.render();
    }, {
      init: (elem, node) => {
        const name = node.data('displayName');
        elem.innerHTML = node.data('html') || '';
        elem.style.display = "flex";
        const video = elem.children[0];
        elem.render = lodash__WEBPACK_IMPORTED_MODULE_1__.throttle(() => {
          if (isElementInViewport(elem)) {
            // console.log('rendering', name)
            if (this.videoLayer?.node.style.opacity !== '0' && video.readyState === video.HAVE_NOTHING && video.networkState === video.NETWORK_IDLE) {
              video.classList.add('loading');
              video.oncanplay = e => video.classList.remove('loading');
              video.load();
            }
            elem.style.visibility = node.visible() ? 'visible' : 'hidden';
          }
        }, 500);
      },
      transform: `translate(-70%, -50%)`,
      position: 'center',
      uniqueElements: false,
      checkBounds: false,
      selector: '.Protein',
      updateOn: "render",
      queryEachTime: false
    });
    this.videoLayer?.node.classList.add('video');
    const handler = action => /*#__PURE__*/function () {
      var _ref = (0,_Users_eragueneau_WebstormProjects_pathway_browser_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (event) {
        const videoId = event.target.id();
        const videoElement = _this.videoLayer?.node.querySelector(`#video-${videoId}`);
        if (videoElement && videoElement.readyState >= videoElement.HAVE_ENOUGH_DATA) {
          action(videoElement);
        }
      });
      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }();
    if (this.isMobile) {
      this.cy.on('mouseover', 'node.Protein', handler(v => v.play())).on('mouseout', 'node.Protein', handler(v => v.pause()));
    } else {
      this.cy.on('select', 'node.Protein', handler(v => v.play())).on('unselect', 'node.Protein', handler(v => v.pause()));
    }
  }
  initStructureMolecule(cy) {
    // @ts-ignore
    const layers = cy.layers();
    this.moleculeLayer = layers.append('html');
    this.moleculeLayer.node.classList.add('molecule');
    layers.renderPerNode(this.moleculeLayer, (elem, node) => {
      elem.style.visibility = node.visible() ? 'visible' : 'hidden';
    }, {
      init: (elem, node) => {
        elem.innerHTML = node.data('html') || '';
        elem.style.display = "flex";
      },
      transform: `translate(-100%, -50%)`,
      position: 'center',
      uniqueElements: true,
      checkBounds: false,
      selector: '.Molecule',
      queryEachTime: false
    });
  }
  triggerZoom() {
    Object.values(this.onZoom).forEach(onZoom => onZoom());
  }
  updateProteins() {
    this.proteins = this.cy.nodes('.Protein').or('.Molecule');
  }
  initZoom(cy) {
    const shadows = cy.edges('[?pathway]');
    const shadowLabels = cy.nodes('.Shadow');
    const trivial = cy.elements('.trivial');
    this.updateProteins();
    cy.minZoom(Math.min(cy.zoom(), extract(this.properties.shadow.labelOpacity)[0][0] / 100));
    cy.maxZoom(15);
    let baseFontSize = extract(this.properties.font.size);
    const structureOpacityArray = extract(this.properties.structure.opacity);
    const zoomStart = structureOpacityArray[0][0];
    const zoomEnd = structureOpacityArray[structureOpacityArray.length - 1][0];
    this.onZoom.shadow = () => {
      const zoomLevel = cy.zoom();
      const z = zoomLevel * 100;
      const shadowLabelOpacity = this.interpolate(z, extract(this.properties.shadow.labelOpacity).map(v => this.p(...v))) / 100;
      const trivialOpacity = this.interpolate(z, extract(this.properties.trivial.opacity).map(v => this.p(...v))) / 100;
      const shadowOpacity = this.interpolate(z, extract(this.properties.shadow.opacity).map(v => this.p(...v))) / 100;
      shadows.style({
        'underlay-opacity': shadowOpacity
      });
      shadowLabels.style({
        'text-opacity': shadowLabelOpacity
      });
      trivial.style({
        'opacity': trivialOpacity,
        'underlay-opacity': Math.min(shadowOpacity, trivialOpacity)
      });
    };
    this.onZoom.protein = () => {
      const zoomLevel = cy.zoom();
      const z = zoomLevel * 100;
      const videoOpacity = this.interpolate(z, extract(this.properties.structure.opacity).map(v => this.p(...v))) / 100;
      const maxWidth = this.interpolate(z, [this.p(zoomStart, 100), this.p(zoomEnd, 50)]);
      this.margin = this.interpolate(z, [this.p(zoomStart, 0), this.p(zoomEnd, 0.25)]);
      const fontSize = this.interpolate(z, [this.p(zoomStart, baseFontSize), this.p(zoomEnd, baseFontSize / 2)]);
      this.proteins.style({
        'font-size': fontSize,
        'text-margin-x': n => this.margin * n.data("width"),
        'text-max-width': maxWidth + "%"
      });
      if (this.videoLayer) this.videoLayer.node.style.opacity = videoOpacity + '';
      if (this.moleculeLayer) this.moleculeLayer.node.style.opacity = videoOpacity + '';
    };
    cy.on('zoom', this.onZoom.shadow);
    cy.on('zoom', this.onZoom.protein);
    this.triggerZoom();
  }
  p(x, y) {
    return new P(x, y);
  }
  interpolate(x, points) {
    if (x < points.at(0).x) return points.at(0).y;
    if (x > points.at(-1).x) return points.at(-1).y;
    for (let i = 0; i + 1 < points.length; i++) {
      let y = this.lerp(x, points[i], points[i + 1]);
      if (y) return y;
    }
    console.assert(false, "Should not arrive here");
    return 0;
  }
  /**
   * Linear interpolation as described in https://en.wikipedia.org/wiki/Linear_interpolation
   * @param x : number number to determine corresponding value
   * @param p0 : P lower bound point for the linear interpolation
   * @param p1 : P upper bound point for the linear interpolation
   */
  lerp(x, p0, p1) {
    if (x < p0.x || x > p1.x) return undefined;
    return (p0.y * (p1.x - x) + p1.y * (x - p0.x)) / (p1.x - p0.x);
  }
}
const state = {
  selecting: false,
  hovering: false,
  deHovering: false
};
class P extends Array {
  constructor(x, y) {
    super(x, y);
  }
  get x() {
    return this[0];
  }
  get y() {
    return this[1];
  }
}
function isElementInViewport(el) {
  let rect = el.getBoundingClientRect();
  return rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && rect.right <= (window.innerWidth || document.documentElement.clientWidth);
}
class Style {
  constructor(container, properties = {}) {
    this.css = getComputedStyle(container);
    this.properties = setDefaults(properties, this.css);
    this.imageBuilder = imageBuilder(this.properties, this);
    this.p = propertyExtractor(this.properties);
    this.pm = propertyMapper(this.properties);
  }
  bindToCytoscape(cy) {
    this.cy = cy;
    cy.data('reactome', this);
    this.interactivity = new Interactivity(cy, this.properties);
    this.initSubPathwayColors();
  }
  initSubPathwayColors() {
    const subPathways = this.cy?.nodes('.Shadow');
    if (!subPathways) return;
    const dH = 360 / subPathways.length;
    subPathways.forEach((subPathway, i) => {
      const edges = this.cy.edges(`[pathway=${subPathway.data('reactomeId')}]`);
      subPathway.data('edges', edges);
      const color = chroma_js__WEBPACK_IMPORTED_MODULE_3__.hsl(dH * i, 1, extract(this.properties.shadow.luminosity) / 100);
      console.log(`hsl(${dH * i} 100 ${extract(this.properties.shadow.luminosity)})`, color, color.hex());
      const hex = color.hex();
      subPathway.data('color', hex);
      edges.forEach(edge => {
        edge.data('color', hex);
      });
    });
  }
  getStyleSheet() {
    return [{
      selector: "*",
      style: {
        "font-family": "Roboto",
        "font-weight": 600,
        "z-index": 1
      }
    }, {
      selector: 'node.Compartment',
      style: {
        "shape": "round-rectangle",
        "width": 'data(width)',
        "height": 'data(height)',
        "border-style": 'double',
        "z-index": 0,
        "z-compound-depth": "bottom",
        "overlay-opacity": 0,
        "color": this.p('compartment', 'fill'),
        "border-color": this.p('compartment', 'fill'),
        "background-color": this.p('compartment', 'fill'),
        "background-opacity": this.p('compartment', 'opacity'),
        "border-width": this.pm('global', 'thickness', t => 3 * t)
      }
    }, {
      selector: 'node.Compartment.inner, node.Compartment.outer',
      style: {
        "border-style": 'solid',
        "border-width": this.p('global', 'thickness')
      }
    }, {
      selector: 'node.Compartment.outer',
      style: {
        'label': 'data(displayName)',
        "text-opacity": 1,
        "text-valign": "bottom",
        "text-halign": "right",
        // @ts-ignore
        "text-margin-x": "data(textX)",
        // @ts-ignore
        "text-margin-y": "data(textY)"
      }
    }, {
      selector: 'node[?radius]',
      style: {
        // @ts-ignore
        'corner-radius': 'data(radius)'
      }
    }, {
      selector: 'node.Shadow',
      style: {
        'label': 'data(displayName)',
        "font-size": this.p('shadow', 'fontSize'),
        "background-opacity": 0,
        "shape": "rectangle",
        "text-valign": "center",
        "text-halign": "center",
        "text-outline-color": this.p('global', 'surface'),
        "text-outline-width": this.p('shadow', 'fontPadding'),
        "text-wrap": 'wrap',
        "text-max-width": "data(width)"
      }
    }, {
      selector: 'node.Shadow[?color]',
      style: {
        "color": 'data(color)'
      }
    }, {
      selector: 'node.drug',
      style: {
        "text-max-width": node => node.width() - 44 + 'px',
        "text-margin-x": 4,
        "font-style": "italic"
      }
    }, {
      selector: 'node.PhysicalEntity, node.Pathway, node.Modification, node.Interactor',
      style: {
        'font-size': this.p('font', 'size'),
        'text-margin-x': 0,
        'label': 'data(displayName)',
        'width': 'data(width)',
        'height': 'data(height)',
        "background-fit": "none",
        "text-halign": 'center',
        "text-valign": 'center',
        "text-wrap": 'wrap',
        "text-max-width": node => node.data('width') + 'px',
        // @ts-ignore
        "background-image-smoothing": "no no no no no no no no",
        // @ts-ignore
        "background-image": node => this.imageBuilder(node)["background-image"],
        // @ts-ignore
        "background-position-y": node => this.imageBuilder(node)["background-position-y"] || 0,
        // @ts-ignore
        "background-position-x": node => this.imageBuilder(node)["background-position-x"] || 0,
        // @ts-ignore
        "background-height": node => this.imageBuilder(node)["background-height"] || '100%',
        // @ts-ignore
        "background-width": node => this.imageBuilder(node)["background-width"] || '100%',
        // @ts-ignore
        "background-clip": node => this.imageBuilder(node)["background-clip"] || 'node',
        // @ts-ignore
        "background-image-containment": node => this.imageBuilder(node)["background-image-containment"] || 'inside',
        // @ts-ignore
        "background-image-opacity": node => this.imageBuilder(node)["background-image-opacity"] || 1,
        // @ts-ignore
        "bounds-expansion": node => this.imageBuilder(node)["bounds-expansion"][0] || 0,
        'color': this.p('global', 'onPrimary')
      }
    }, {
      selector: 'node.InteractorOccurrences',
      style: {
        'label': 'data(displayName)',
        'color': this.p('global', 'surface'),
        "shape": "ellipse",
        "text-valign": "center",
        "text-halign": "center",
        "text-wrap": 'wrap',
        "background-color": this.p('interactor', 'fill')
      }
    }, {
      selector: 'node.InteractorOccurrences.disease',
      style: {
        "background-color": this.p('global', 'negative')
      }
    }, {
      selector: 'node.InteractorOccurrences.hover',
      style: {
        "border-width": this.pm('global', 'thickness', t => t * 1),
        "border-color": this.p('global', 'hoverNode')
      }
    }, {
      selector: 'node.InteractorOccurrences.select',
      style: {
        "border-width": this.pm('global', 'thickness', t => t * 1),
        "border-color": this.p('global', 'selectNode')
      }
    }, {
      selector: 'node.Interactor',
      style: {
        "label": "data(displayName)",
        "font-family": "Roboto Mono, monospace",
        // "border-color": this.p('interactor', 'stroke'),
        "border-width": this.p('global', 'thickness'),
        "text-wrap": "ellipsis",
        "border-color": this.p('interactor', 'fill'),
        //@ts-ignore
        "border-position": 'inside'
      }
    }, {
      selector: 'node.PhysicalEntity.disease',
      style: {
        "border-color": this.p('global', 'negativeContrast'),
        "color": this.p('global', 'negativeContrast'),
        "border-width": this.p('global', 'thickness')
      }
    }, {
      selector: 'node.Interactor.disease',
      style: {
        "shape": "round-hexagon",
        "background-color": this.p('global', 'negative'),
        "background-opacity": 0,
        "border-width": 0,
        "font-family": "Roboto Mono, monospace",
        "color": this.p('global', 'onPrimary'),
        "text-wrap": "ellipsis",
        "text-max-width": node => node.width() - 40 + 'px'
      }
    }, {
      selector: 'node.Protein',
      style: {
        "shape": "round-rectangle",
        "background-color": this.p('protein', 'fill')
      }
    }, {
      selector: 'node.Protein.drug',
      style: {
        "background-color": this.p('protein', 'drug')
      }
    }, {
      selector: 'node.GenomeEncodedEntity',
      style: {
        "shape": "round-rectangle",
        "background-opacity": 0,
        "background-color": this.p('genomeEncodedEntity', 'fill'),
        "text-margin-y": this.pm('genomeEncodedEntity', 'topRadius', r => r / 10),
        "border-width": 0 // Avoid disease border
      }
    }, {
      selector: 'node.RNA',
      style: {
        "shape": "bottom-round-rectangle",
        "background-color": this.p('rna', 'fill')
      }
    }, {
      selector: 'node.RNA.drug',
      style: {
        "background-color": this.p('rna', 'drug')
      }
    }, {
      selector: 'node.Gene',
      style: {
        "shape": "bottom-round-rectangle",
        "background-opacity": 0,
        "background-color": this.p('gene', 'fill'),
        "bounds-expansion": this.p('gene', 'decorationExtraWidth'),
        "text-margin-y": this.pm('gene', 'decorationHeight', h => h / 2),
        "border-width": 0 // Avoid disease border
      }
    }, {
      selector: 'node.Molecule',
      style: {
        "shape": 'round-rectangle',
        "color": this.p("molecule", 'stroke'),
        "background-color": this.p("molecule", 'fill'),
        "border-color": this.p("molecule", 'stroke'),
        "border-width": this.p("global", 'thickness'),
        // @ts-ignore
        "corner-radius": node => Math.min(node.data('width'), node.data('height')) / 2
      }
    }, {
      selector: 'node.Molecule.drug',
      style: {
        "color": this.p("molecule", 'drug'),
        "border-color": this.p("molecule", 'drug')
      }
    }, {
      selector: 'node.Molecule.Interactor',
      style: {
        "border-color": this.p("interactor", 'fill')
      }
    }, {
      selector: 'node.EntitySet',
      style: {
        "background-opacity": 0,
        "shape": "round-rectangle",
        "border-width": 0,
        "text-max-width": node => this.pm('global', 'thickness', t => this.pm('entitySet', 'radius', r => `${node.width() - 2 * r - 6 * t}px`))
      }
    }, {
      selector: 'node.EntitySet.drug',
      style: {
        "text-max-width": node => this.pm('global', 'thickness', t => this.pm('entitySet', 'radius', r => `${node.width() - 2 * r - 6 * t - 44}px`))
      }
    }, {
      selector: 'node.Complex',
      style: {
        "shape": "cut-rectangle",
        "text-max-width": node => this.pm('global', 'thickness', t => node.width() - t * 6 + 'px'),
        "background-opacity": 0,
        "border-width": 0 // Avoid disease border
        // "background-color": this.p("complex", 'fill'),
        // "width": (node: cytoscape.NodeSingular) => this.pm('global', 'thickness', t => node.data('width') -  2 * t) ,
        // "height": (node: cytoscape.NodeSingular) => this.pm('global', 'thickness', t => node.data('height') -  2 * t) ,
        // // @ts-ignore
        // "corner-radius": this.pm('complex', 'cut', c => c),
        // "outline-width":  this.p('global', 'thickness'),
        // "outline-color":  this.p('complex', 'fill'),
        // "outline-offset":  this.pm('global', 'thickness', t => - t),
        // "outline-opacity":  1,
        //
        // // "border-position": 'inside',
        // "border-join": 'round',
        // "border-color": this.p('complex', 'stroke'),
        // "border-width": this.p('global', 'thickness'),
      }
    }, {
      selector: 'node.Complex.drug',
      style: {
        "text-margin-x": 4,
        "text-max-width": node => this.pm('global', 'thickness', t => node.width() - t * 6 - 44 + 'px')
      }
    }, {
      selector: 'node.Cell',
      style: {
        "background-opacity": 0,
        "shape": "round-rectangle",
        // @ts-ignore
        "corner-radius": 999999,
        "border-width": 0,
        "text-max-width": node => this.pm('global', 'thickness', t => this.pm('cell', 'thickness', ct => node.width() - t * 2 - ct * 2 + 'px'))
      }
    }, {
      selector: 'node.Pathway',
      style: {
        "background-color": this.p('pathway', 'fill'),
        "text-margin-x": 18,
        "border-color": this.p('pathway', 'stroke'),
        // @ts-ignore
        "border-position": "inside",
        "border-width": this.pm('global', 'thickness', t => 3 * t)
      }
    }, {
      selector: 'node.Interacting.Pathway',
      style: {
        "shape": "rectangle",
        "text-max-width": node => this.pm('global', 'thickness', t => `${node.width() - (6 * t + 36) * 2}px`)
      }
    }, {
      selector: 'node.SUB.Pathway',
      style: {
        //@ts-ignore
        "corner-radius": 99999,
        "shape": 'round-rectangle',
        "text-max-width": node => this.pm('global', 'thickness', t => `${node.width() - (6 * t + 36) * 2}px`)
      }
    }, {
      selector: 'node.Pathway.disease',
      style: {
        "border-color": this.p('global', 'negativeContrast'),
        "color": this.p('global', 'negativeContrast')
      }
    }, {
      selector: 'node.Modification',
      style: {
        "background-color": this.p('modification', 'fill'),
        "shape": 'round-rectangle'
      }
    }, {
      selector: 'node.reaction',
      style: {
        "width": this.pm('global', 'thickness', t => t * 6),
        "height": this.pm('global', 'thickness', t => t * 6),
        "shape": "round-rectangle",
        "text-halign": "center",
        "text-valign": "center",
        "border-width": this.p('global', 'thickness'),
        "border-color": this.p('global', 'onSurface'),
        "color": this.p('global', 'onSurface'),
        "background-color": this.p('global', 'surface')
      }
    }, {
      selector: 'node.reaction[?displayName]',
      style: {
        "label": "data(displayName)",
        "font-weight": 400,
        "text-valign": "top",
        "text-margin-y": -5
      }
    }, {
      selector: 'node.reaction.hover',
      style: {
        "border-width": this.pm('global', 'thickness', t => t * 1),
        "border-color": this.p('global', 'hoverEdge')
      }
    }, {
      selector: 'node.reaction:selected',
      style: {
        "border-width": this.pm('global', 'thickness', t => t * 1.5),
        "border-color": this.p('global', 'selectEdge')
      }
    }, {
      selector: 'node.reaction.flag',
      style: {
        // @ts-ignore
        "outline-width": this.pm('global', 'thickness', t => t * 1.5),
        "outline-color": this.p('global', 'flag')
      }
    }, {
      selector: 'node.association',
      style: {
        "shape": "ellipse",
        "background-color": this.p('global', 'onSurface')
      }
    }, {
      selector: 'node.dissociation',
      style: {
        "shape": "ellipse",
        "border-style": "double",
        "border-width": this.pm('global', 'thickness', t => 3 * t)
      }
    }, {
      selector: 'node.uncertain',
      style: {
        "label": "?",
        "text-valign": "center",
        "text-margin-y": 0,
        "font-weight": 600
      }
    }, {
      selector: 'node.omitted',
      style: {
        "background-image": OMMITED_ICON(this.properties),
        "background-fit": "cover",
        "background-height": "100%",
        "background-width": "100%"
      }
    }, {
      selector: 'node.loss-of-function',
      style: {
        "border-style": 'dashed',
        //@ts-ignore
        "border-dash-pattern": this.pm('global', 'thickness', t => [t, t * 2]),
        "border-cap": "round"
      }
    },
    // {
    //   selector: 'node.RNA.Interactor, node.Protein.Interactor',
    //   style: {
    //     "border-color": this.p('interactor', 'fill'),
    //     "border-width": this.p('global', 'thickness'),
    //
    //   }
    // },
    // {
    //   selector: 'node.Molecule.Interactor',
    //   style: {
    //     "color": this.p("molecule", 'stroke'),
    //     "background-color": this.p("molecule", 'fill'),
    //     "border-color": this.p("interactor", 'stroke'),
    //     "border-width": this.p("global", 'thickness'),
    //     // @ts-ignore
    //     "corner-radius": (node: cytoscape.NodeSingular) => Math.min(node.data('width'), node.data('height')) / 2,
    //   }
    // },
    {
      selector: 'edge',
      style: {
        "curve-style": "straight",
        "line-cap": "round",
        "source-endpoint": "outside-to-node",
        "arrow-scale": 1.5,
        'width': this.p('global', 'thickness'),
        'color': this.p('global', 'onSurface'),
        'line-color': this.p('global', 'onSurface'),
        'target-arrow-color': this.p('global', 'onSurface'),
        'mid-source-arrow-color': this.p('global', 'onSurface'),
        'mid-target-arrow-color': this.p('global', 'onSurface'),
        'source-arrow-color': this.p('global', 'onSurface'),
        // @ts-ignore
        'source-arrow-width': '100%',
        // @ts-ignore
        'target-arrow-width': '100%'
      }
    }, {
      selector: 'edge.disease',
      style: {
        "color": this.p('global', 'negative'),
        "line-color": this.p('global', 'negative'),
        "border-color": this.p('global', 'negative'),
        'target-arrow-color': this.p('global', 'negative'),
        'source-arrow-color': this.p('global', 'negative')
      }
    }, {
      selector: "edge.hover",
      style: {
        "line-color": this.p('global', 'hoverEdge'),
        "width": this.pm('global', 'thickness', t => t * 1.5),
        "arrow-scale": 1,
        "source-arrow-color": this.p('global', 'hoverEdge'),
        "target-arrow-color": this.p('global', 'hoverEdge'),
        // @ts-ignore
        'source-arrow-width': '50%',
        // @ts-ignore
        'target-arrow-width': '50%',
        "z-index": 2
      }
    }, {
      selector: "edge:selected",
      style: {
        "line-color": this.p('global', 'selectEdge'),
        "width": this.pm('global', 'thickness', t => t * 2),
        "arrow-scale": 1,
        "source-arrow-color": this.p('global', 'selectEdge'),
        "target-arrow-color": this.p('global', 'selectEdge'),
        // @ts-ignore
        'source-arrow-width': '50%',
        // @ts-ignore
        'target-arrow-width': '50%',
        "z-index": 3
      }
    }, {
      selector: 'edge.consumption',
      style: {
        "target-endpoint": "inside-to-node",
        "source-endpoint": "outside-to-node"
      }
    }, {
      selector: 'edge.production',
      style: {
        'target-arrow-shape': 'triangle'
      }
    }, {
      selector: 'edge.catalysis',
      style: {
        'target-arrow-shape': 'circle',
        "target-arrow-fill": "hollow",
        "target-arrow-color": this.p('global', 'positive')
      }
    }, {
      selector: 'edge.positive-regulation',
      style: {
        'target-arrow-shape': 'triangle',
        "target-arrow-fill": "hollow",
        "target-arrow-color": this.p('global', 'positive')
      }
    }, {
      selector: 'edge.negative-regulation',
      style: {
        'target-arrow-shape': 'tee',
        "line-cap": "butt",
        "source-endpoint": "inside-to-node",
        "target-arrow-color": this.p('global', 'negative')
      }
    }, {
      selector: 'edge.set-to-member',
      style: {
        'target-arrow-shape': 'circle',
        "line-style": "dashed",
        "line-dash-pattern": [6, 10],
        "opacity": 0.5
      }
    }, {
      selector: 'edge[stoichiometry > 1]',
      style: {
        "text-background-color": this.p('global', 'surface'),
        "text-background-opacity": 1,
        "text-border-width": this.pm('global', 'thickness', t => t / 2),
        "text-border-opacity": 1,
        "text-border-color": this.p('global', 'onSurface'),
        "text-background-shape": 'roundrectangle',
        "text-background-padding": this.pm('global', 'thickness', t => t + 'px')
      }
    }, {
      selector: 'edge[stoichiometry > 1].incoming',
      style: {
        "source-label": "data(stoichiometry)",
        "source-text-offset": 30
      }
    }, {
      selector: 'edge[stoichiometry > 1].outgoing',
      style: {
        "target-label": "data(stoichiometry)",
        "target-text-offset": 35
      }
    }, {
      selector: "edge.shadow[?color]",
      style: {
        // @ts-ignore
        "underlay-color": "data(color)",
        "underlay-padding": this.p('shadow', 'padding'),
        "underlay-opacity": this.pm('shadow', 'opacity', o => o[0][1] / 100)
      }
    }, {
      selector: "edge.flag",
      style: {
        // @ts-ignore
        "underlay-color": this.p('global', 'flag'),
        "underlay-padding": 10,
        "underlay-opacity": 1
      }
    }, {
      selector: "edge[?weights]",
      style: {
        // @ts-ignore
        "curve-style": "round-segments",
        "segment-distances": "data(distances)",
        "segment-weights": "data(weights)",
        "segment-radius": 30,
        "radius-type": 'influence-radius',
        // @ts-ignore
        "edge-distances": "endpoints"
      }
    }, {
      selector: "edge[?sourceEndpoint]",
      style: {
        "source-endpoint": "data(sourceEndpoint)"
      }
    }, {
      selector: "edge[?targetEndpoint]",
      style: {
        "target-endpoint": "data(targetEndpoint)"
      }
    }, {
      selector: "edge[?sourceLabel]",
      style: {
        "source-label": "data(sourceLabel)",
        "source-text-margin-y": -12,
        "font-weight": 400
      }
    }, {
      selector: "edge[?label]",
      style: {
        "label": "data(label)",
        "text-margin-y": 12,
        "font-weight": 400
      }
    }, {
      selector: 'edge.Interactor',
      style: {
        'line-color': this.p('interactor', 'stroke'),
        'line-style': 'dashed',
        'line-dash-pattern': [1, 8]
      }
    }, {
      selector: 'edge.Interactor.disease',
      style: {
        'line-color': this.p('global', 'negativeContrast')
      }
    }, {
      selector: 'edge.Interactor.hover',
      style: {
        "line-color": this.p('global', 'hoverEdge')
      }
    }, {
      selector: "edge[?sourceOffset]",
      style: {
        // @ts-ignore
        "source-text-offset": "data(sourceOffset)"
      }
    }, {
      selector: "[?labelColor]",
      style: {
        "color": e => extract(this.p('global', e.data("labelColor")))
      }
    }, {
      selector: "node.debug",
      style: {
        label: "data(id)",
        "text-outline-width": 4,
        "text-outline-color": 'black',
        "text-outline-opacity": 1,
        color: 'white'
      }
    }, {
      selector: "[?exp]",
      style: {
        "color": this.p('global', 'surface'),
        "text-outline-width": 2,
        "text-outline-color": this.p('global', 'onSurface'),
        "text-outline-opacity": 1
      }
    }, {
      selector: "[?exp].Molecule",
      style: {
        "background-color": this.p('global', 'onSurface')
      }
    }, {
      selector: "node.Legend.Label",
      style: {
        "label": "data(displayName)",
        "text-halign": "center",
        "text-valign": "center",
        "font-size": 24,
        "font-weight": 400,
        "background-opacity": 0,
        "color": this.p('global', 'onSurface')
      }
    }, {
      selector: "node.Legend.Placeholder",
      style: {
        "background-opacity": 0,
        "border-opacity": 0,
        width: 20,
        height: 20,
        shape: "rectangle"
      }
    }, {
      selector: "node.Legend.Placeholder[?displayName]",
      style: {
        "label": "data(displayName)",
        "font-weight": 400
      }
    }, {
      selector: '.trivial',
      style: {
        'opacity': 0
      }
    }];
  }
  clearCache() {
    this.imageBuilder.cache.clear();
    clearDrawersCache();
  }
  update(cy) {
    this.clearCache();
    cy.style(this.getStyleSheet());
    this.initSubPathwayColors();
    this.interactivity.triggerZoom();
  }
  loadAnalysis(cy, palette) {
    // const paletteDef: [number, string][] | string = paletteType === 'unidirectional' ? extract(this.properties.analysis.unidirectionalPalette) : extract(this.properties.analysis.bidirectionalPalette);
    // if (typeof paletteDef !== "string") {
    //   this.currentPalette = scale(paletteDef.map(e => e[1]))
    //     .domain(paletteDef.map(e => e[0]))
    //     .mode('oklab')
    // } else {
    this.currentPalette = palette;
    // }
    this.imageBuilder.cache.clear();
    resetGradients();
    cy.style(this.getStyleSheet());
  }
}
var types = /*#__PURE__*/Object.freeze({
  __proto__: null
});

/*
 * Public API Surface of reactome-cytoscape-style
 */

/**
 * Generated bundle index. Do not edit.
 */



/***/ }),

/***/ 3410:
/*!*************************************!*\
  !*** ./src/assets/json/legend.json ***!
  \*************************************/
/***/ ((module) => {

module.exports = JSON.parse('{"nodes":[{"data":{"id":"Label 1","displayName":"Molecules"},"classes":["Label","Legend"],"position":{"x":250,"y":-20}},{"data":{"id":"Gene","displayName":"Gene","height":80,"width":220},"classes":["Gene","PhysicalEntity"],"position":{"x":130,"y":40}},{"data":{"id":"Genome Encoded Entity","displayName":"Genome Encoded Entity","height":60,"width":220},"classes":["GenomeEncodedEntity","PhysicalEntity"],"position":{"x":370,"y":50}},{"data":{"id":"RNA","displayName":"RNA","height":60,"width":220},"classes":["RNA","PhysicalEntity"],"position":{"x":130,"y":130}},{"data":{"id":"RNA-drug","displayName":"RNA Drug","height":60,"width":220},"classes":["RNA","PhysicalEntity","drug"],"position":{"x":370,"y":130}},{"data":{"id":"Protein","displayName":"Protein","height":60,"width":220},"classes":["Protein","PhysicalEntity"],"position":{"x":130,"y":210}},{"data":{"id":"Protein-drug","displayName":"Protein Drug","height":60,"width":220},"classes":["Protein","PhysicalEntity","drug"],"position":{"x":370,"y":210}},{"data":{"id":"Molecule","displayName":"Molecule","height":60,"width":220},"classes":["Molecule","PhysicalEntity"],"position":{"x":130,"y":290}},{"data":{"id":"Molecule-drug","displayName":"Molecule Drug","height":60,"width":220},"classes":["Molecule","PhysicalEntity","drug"],"position":{"x":370,"y":290}},{"data":{"id":"Complex","displayName":"Complex","height":60,"width":220},"classes":["Complex","PhysicalEntity"],"position":{"x":130,"y":370}},{"data":{"id":"Complex-drug","displayName":"Complex Drug","height":60,"width":220},"classes":["Complex","PhysicalEntity","drug"],"position":{"x":370,"y":370}},{"data":{"id":"EntitySet","displayName":"Set","height":60,"width":220},"classes":["EntitySet","PhysicalEntity"],"position":{"x":130,"y":450}},{"data":{"id":"EntitySet-drug","displayName":"Set Drug","height":60,"width":220},"classes":["EntitySet","PhysicalEntity","drug"],"position":{"x":370,"y":450}},{"data":{"id":"Cell","displayName":"Cell","height":60,"width":220},"classes":["Cell","PhysicalEntity"],"position":{"x":250,"y":530}},{"data":{"id":"SubPathway","displayName":"SubPathway","height":80,"width":220},"classes":["SUB","Pathway"],"position":{"x":130,"y":610}},{"data":{"id":"interacting pathway","displayName":"Interacting Pathway","height":80,"width":220},"classes":["Interacting","Pathway"],"position":{"x":370,"y":610}},{"data":{"id":"Label 2","displayName":"Reaction Types"},"classes":["Label","Legend"],"position":{"x":250,"y":690}},{"data":{"id":"a"},"classes":["Placeholder","Legend"],"position":{"x":15,"y":760}},{"data":{"id":"dissociation","displayName":"Dissociation"},"classes":["dissociation","reaction"],"position":{"x":130,"y":760}},{"data":{"id":"b"},"classes":["Placeholder","Legend"],"position":{"x":250,"y":740}},{"data":{"id":"c"},"classes":["Placeholder","Legend"],"position":{"x":250,"y":780}},{"data":{"id":"association","displayName":"Association"},"classes":["association","reaction"],"position":{"x":370,"y":760}},{"data":{"id":"d"},"classes":["Placeholder","Legend"],"position":{"x":485,"y":760}},{"data":{"id":"e"},"classes":["Placeholder","Legend"],"position":{"x":15,"y":840}},{"data":{"id":"transition","displayName":"Transition"},"classes":["transition","reaction"],"position":{"x":130,"y":840}},{"data":{"id":"f"},"classes":["Placeholder","Legend"],"position":{"x":250,"y":840}},{"data":{"id":"omitted","displayName":"Omitted"},"classes":["omitted","reaction"],"position":{"x":370,"y":840}},{"data":{"id":"g"},"classes":["Placeholder","Legend"],"position":{"x":485,"y":840}},{"data":{"id":"h"},"classes":["Placeholder","Legend"],"position":{"x":15,"y":920}},{"data":{"id":"uncertain-l","displayName":"Uncertain"},"classes":["Placeholder","reaction","Legend"],"position":{"x":250,"y":916}},{"data":{"id":"uncertain"},"classes":["uncertain","reaction"],"position":{"x":250,"y":920}},{"data":{"id":"i"},"classes":["Placeholder","Legend"],"position":{"x":485,"y":920}},{"data":{"id":"Label 3","displayName":"Reaction Attributes"},"classes":["Label","Legend"],"position":{"x":250,"y":980}},{"data":{"id":"attr-catalysis"},"classes":["Placeholder","Legend"],"position":{"x":15,"y":1020}},{"data":{"id":"attr-reg+"},"classes":["Placeholder","Legend"],"position":{"x":485,"y":1020}},{"data":{"id":"attr-a"},"classes":["Placeholder","Legend"],"position":{"x":15,"y":1060}},{"data":{"id":"attr-b"},"classes":["Placeholder","Legend"],"position":{"x":15,"y":1100}},{"data":{"id":"attr-reaction"},"classes":["association","reaction"],"position":{"x":250,"y":1080}},{"data":{"id":"attr-c"},"classes":["Placeholder","Legend"],"position":{"x":485,"y":1080}},{"data":{"id":"attr-reg-"},"classes":["Placeholder","Legend"],"position":{"x":485,"y":1145}},{"data":{"id":"attr-s-l","displayName":"Stoichiometry","labelColor":"onSurface"},"classes":["Placeholder","Legend"],"position":{"x":73,"y":1150}},{"data":{"id":"line-a"},"classes":["Placeholder","Legend"],"position":{"x":15,"y":1185}},{"data":{"id":"line-b"},"classes":["Placeholder","Legend"],"position":{"x":250,"y":1185}},{"data":{"id":"line-c"},"classes":["Placeholder","Legend"],"position":{"x":485,"y":1185}},{"data":{"id":"line-d"},"classes":["Placeholder","Legend"],"position":{"x":15,"y":1225}},{"data":{"id":"line-e"},"classes":["Placeholder","Legend"],"position":{"x":485,"y":1225}}],"edges":[{"data":{"source":"a","target":"dissociation"},"classes":["consumption","incoming"]},{"data":{"source":"dissociation","target":"b","weights":"0.270 0.523","distances":"5.535 -9.976","sourceEndpoint":"18 0","targetEndpoint":"-10 0"},"classes":["production","outgoing"]},{"data":{"source":"dissociation","target":"c","weights":"0.270 0.523","distances":"-5.535 9.976","sourceEndpoint":"18 0","targetEndpoint":"-10 0"},"classes":["production","outgoing"]},{"data":{"source":"b","target":"association","weights":"0.285 0.521","distances":"-5.82 9.777","sourceEndpoint":"10 0","targetEndpoint":"-10 0"},"classes":["consumption","outgoing"]},{"data":{"source":"c","target":"association","weights":"0.285 0.521","distances":"5.82 -9.777","sourceEndpoint":"10 0","targetEndpoint":"-10 0"},"classes":["consumption","outgoing"]},{"data":{"source":"association","target":"d"},"classes":["production","outgoing"]},{"data":{"source":"e","target":"transition"},"classes":["consumption","incoming"]},{"data":{"source":"transition","target":"f"},"classes":["production","outgoing"]},{"data":{"source":"f","target":"omitted"},"classes":["consumption","incoming"]},{"data":{"source":"omitted","target":"g"},"classes":["production","outgoing"]},{"data":{"source":"h","target":"uncertain"},"classes":["consumption","incoming"]},{"data":{"source":"uncertain","target":"i"},"classes":["production","outgoing"]},{"data":{"source":"attr-a","target":"attr-reaction","weights":"0.582 0.683","distances":"-11.686 6.357","sourceEndpoint":"10 0","targetEndpoint":"-12 0"},"classes":["consumption","incoming"]},{"data":{"source":"attr-b","target":"attr-reaction","weights":"0.582 0.683","distances":"11.686 -6.357","sourceEndpoint":"10 0","targetEndpoint":"-12 0","stoichiometry":3,"sourceOffset":50},"classes":["consumption","incoming"]},{"data":{"source":"attr-reaction","target":"attr-c","sourceEndpoint":"12 0","targetEndpoint":"-10 0"},"classes":["production","outgoing"]},{"data":{"source":"attr-catalysis","target":"attr-reaction","weights":"0.754","distances":"-34.250","sourceEndpoint":"10 0","targetEndpoint":"-15.556 -15.556","sourceLabel":"Catalysis","sourceOffset":30,"labelColor":"positive"},"classes":["catalysis","incoming"]},{"data":{"source":"attr-reg+","target":"attr-reaction","weights":"0.754","distances":"34.250","sourceEndpoint":"-10 0","targetEndpoint":"15.556 -15.556","sourceLabel":"Positive Regulation","sourceOffset":70,"labelColor":"positive"},"classes":["positive-regulation","incoming"]},{"data":{"source":"attr-reg-","target":"attr-reaction","sourceEndpoint":"-10 0","targetEndpoint":"0 22","weights":"0.966","distances":"-41.287","sourceLabel":"Negative regulation","sourceOffset":72,"labelColor":"negative"},"classes":["negative-regulation","incoming"]},{"data":{"source":"line-a","target":"line-b","sourceEndpoint":"12 0","targetEndpoint":"-12 0","label":"Wild Type"},"classes":["consumption","incoming"]},{"data":{"source":"line-b","target":"line-c","sourceEndpoint":"12 0","targetEndpoint":"-12 0","label":"Disease Associated","labelColor":"negative"},"classes":["consumption","incoming","disease"]},{"data":{"source":"line-d","target":"line-e","sourceEndpoint":"12 0","targetEndpoint":"-12 0","label":"Member of Set","labelColor":"onSurface"},"classes":["set-to-member"]}],"Reaction Types GeoGebra":"https://www.geogebra.org/calculator/bydd8bz5","Reaction Attributes GeoGebra":"https://www.geogebra.org/calculator/hgu6afmu"}');

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendor"], () => (__webpack_exec__(4913)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=main.js.map