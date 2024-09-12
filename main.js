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
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ 7947);
/* harmony import */ var _diagram_iterator_diagram_iterator_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./diagram-iterator/diagram-iterator.component */ 2388);
/* harmony import */ var _guard_legacy_guard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./guard/legacy.guard */ 9792);
/* harmony import */ var _viewport_viewport_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./viewport/viewport.component */ 2191);
/* harmony import */ var _diagram_home_diagram_home_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./diagram-home/diagram-home.component */ 1139);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 1699);







const routes = [{
  path: 'iterate',
  component: _diagram_iterator_diagram_iterator_component__WEBPACK_IMPORTED_MODULE_0__.DiagramIteratorComponent
}, {
  path: 'iterate/:id',
  component: _diagram_iterator_diagram_iterator_component__WEBPACK_IMPORTED_MODULE_0__.DiagramIteratorComponent
}, {
  path: 'diagram/:id',
  component: _diagram_home_diagram_home_component__WEBPACK_IMPORTED_MODULE_3__.DiagramHomeComponent
}, {
  path: 'PathwayBrowser/:id',
  component: _viewport_viewport_component__WEBPACK_IMPORTED_MODULE_2__.ViewportComponent
}, {
  path: ':id',
  component: _viewport_viewport_component__WEBPACK_IMPORTED_MODULE_2__.ViewportComponent
}, {
  path: '**',
  component: _viewport_viewport_component__WEBPACK_IMPORTED_MODULE_2__.ViewportComponent,
  canActivate: [_guard_legacy_guard__WEBPACK_IMPORTED_MODULE_1__.legacyGuard],
  runGuardsAndResolvers: 'always'
}];
class AppRoutingModule {
  static #_ = this.ɵfac = function AppRoutingModule_Factory(t) {
    return new (t || AppRoutingModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineNgModule"]({
    type: AppRoutingModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjector"]({
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterModule.forRoot(routes, {
      bindToComponentInputs: true
    }), _angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsetNgModuleScope"](AppRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterModule]
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
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material/icon */ 6515);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser */ 6480);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 7947);




class AppComponent {
  constructor(matIconRegistry, domSanitizer) {
    this.matIconRegistry = matIconRegistry;
    this.domSanitizer = domSanitizer;
    this.title = 'PathwayBrowser';
    this.icons = [{
      name: 'species',
      route: 'species-icon'
    }, {
      name: 'overlay',
      route: 'overlay-icon'
    }, {
      name: 'arrow-down',
      route: 'arrow-down'
    }, {
      name: 'arrow-right',
      route: 'arrow-right'
    }, {
      name: 'pathway-ehld',
      route: 'pathway-ehld'
    }, {
      name: 'pathway',
      route: 'pathway'
    }, {
      name: 'reaction',
      route: 'reaction'
    }, {
      name: 'transition',
      route: 'transition'
    }, {
      name: 'home',
      route: 'home'
    }];
    this.species = [{
      name: '9913',
      route: 'bos-taurus'
    }, {
      name: '6239',
      route: 'caenorhabditis-elegans'
    }, {
      name: '9615',
      route: 'canis-familiaris'
    }, {
      name: '7955',
      route: 'danio-rerio'
    }, {
      name: '44689',
      route: 'dictyostelium-discoideum'
    }, {
      name: '7227',
      route: 'drosophila-melanogaster'
    }, {
      name: '9031',
      route: 'gallus-gallus'
    }, {
      name: '9606',
      route: 'homo-sapiens'
    }, {
      name: '10090',
      route: 'mus-musculus'
    }, {
      name: '1773',
      route: 'mycobacterium-tuberculosis'
    }, {
      name: '5833',
      route: 'plasmodium-falciparum'
    }, {
      name: '10116',
      route: 'rattus-norvegicus'
    }, {
      name: '4932',
      route: 'saccharomyces-cerevisiae'
    }, {
      name: '4896',
      route: 'schizosaccharomyces-pombe'
    }, {
      name: '9823',
      route: 'sus-scrofa'
    }, {
      name: '8364',
      route: 'xenopus-tropicalis'
    }];
    this.loadIcons();
  }
  loadIcons() {
    this.icons.forEach(icon => {
      this.matIconRegistry.addSvgIcon(icon.name, this.domSanitizer.bypassSecurityTrustResourceUrl(`assets/icons/${icon.route}.svg`));
    });
    this.species.forEach(icon => {
      this.matIconRegistry.addSvgIcon(icon.name, this.domSanitizer.bypassSecurityTrustResourceUrl(`assets/icons/species/${icon.route}.svg`));
    });
  }
  static #_ = this.ɵfac = function AppComponent_Factory(t) {
    return new (t || AppComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_material_icon__WEBPACK_IMPORTED_MODULE_1__.MatIconRegistry), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__.DomSanitizer));
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
    dependencies: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterOutlet],
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
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/platform-browser */ 6480);
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app.component */ 6401);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/forms */ 8849);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/common */ 6575);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/common/http */ 4860);
/* harmony import */ var _diagram_diagram_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./diagram/diagram.component */ 2731);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! @angular/router */ 7947);
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app-routing.module */ 3966);
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @angular/platform-browser/animations */ 4987);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/material/button */ 895);
/* harmony import */ var _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/material/slide-toggle */ 9293);
/* harmony import */ var _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! @angular/cdk/drag-drop */ 7792);
/* harmony import */ var _diagram_iterator_diagram_iterator_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./diagram-iterator/diagram-iterator.component */ 2388);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/material/input */ 26);
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/material/select */ 6355);
/* harmony import */ var _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/material/progress-spinner */ 3910);
/* harmony import */ var _interactors_custom_interactor_dialog_custom_interactor_dialog_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./interactors/custom-interactor-dialog/custom-interactor-dialog.component */ 2373);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @angular/material/dialog */ 7401);
/* harmony import */ var _angular_material_tabs__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @angular/material/tabs */ 989);
/* harmony import */ var _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @angular/material/checkbox */ 6658);
/* harmony import */ var _angular_material_radio__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! @angular/material/radio */ 2106);
/* harmony import */ var _angular_material_components_file_input__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! @angular-material-components/file-input */ 7892);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! @angular/material/icon */ 6515);
/* harmony import */ var _angular_material_list__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! @angular/material/list */ 3228);
/* harmony import */ var _angular_material_expansion__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! @angular/material/expansion */ 8060);
/* harmony import */ var _angular_material_grid_list__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! @angular/material/grid-list */ 647);
/* harmony import */ var _interactors_interactors_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./interactors/interactors.component */ 9563);
/* harmony import */ var _viewport_viewport_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./viewport/viewport.component */ 2191);
/* harmony import */ var angular_split__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! angular-split */ 6944);
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! @angular/material/card */ 8497);
/* harmony import */ var _species_species_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./species/species.component */ 9853);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! @angular/material/core */ 5309);
/* harmony import */ var _event_hierarchy_event_hierarchy_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./event-hierarchy/event-hierarchy.component */ 3081);
/* harmony import */ var _angular_material_tree__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! @angular/material/tree */ 7321);
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! @angular/material/tooltip */ 702);
/* harmony import */ var _details_details_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./details/details.component */ 4712);
/* harmony import */ var _angular_material_menu__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! @angular/material/menu */ 8128);
/* harmony import */ var _diagram_home_diagram_home_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./diagram-home/diagram-home.component */ 1139);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/core */ 1699);







































class AppModule {
  static #_ = this.ɵfac = function AppModule_Factory(t) {
    return new (t || AppModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdefineNgModule"]({
    type: AppModule,
    bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_0__.AppComponent]
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdefineInjector"]({
    imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_12__.BrowserModule, _angular_forms__WEBPACK_IMPORTED_MODULE_13__.FormsModule, _angular_common__WEBPACK_IMPORTED_MODULE_14__.CommonModule, _angular_common_http__WEBPACK_IMPORTED_MODULE_15__.HttpClientModule, _app_routing_module__WEBPACK_IMPORTED_MODULE_2__.AppRoutingModule,
    // NoopAnimationsModule,
    _angular_material_button__WEBPACK_IMPORTED_MODULE_16__.MatButtonModule, _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_17__.MatSlideToggleModule, _angular_material_input__WEBPACK_IMPORTED_MODULE_18__.MatInputModule, _angular_material_select__WEBPACK_IMPORTED_MODULE_19__.MatSelectModule, _angular_forms__WEBPACK_IMPORTED_MODULE_13__.ReactiveFormsModule, _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_20__.MatProgressSpinnerModule, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_21__.BrowserAnimationsModule, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_22__.MatDialogModule, _angular_material_tabs__WEBPACK_IMPORTED_MODULE_23__.MatTabsModule, _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_24__.MatCheckboxModule, _angular_material_radio__WEBPACK_IMPORTED_MODULE_25__.MatRadioModule, _angular_material_components_file_input__WEBPACK_IMPORTED_MODULE_26__.NgxMatFileInputModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_27__.MatIconModule, _angular_material_list__WEBPACK_IMPORTED_MODULE_28__.MatListModule, _angular_material_expansion__WEBPACK_IMPORTED_MODULE_29__.MatExpansionModule, _angular_material_grid_list__WEBPACK_IMPORTED_MODULE_30__.MatGridListModule, angular_split__WEBPACK_IMPORTED_MODULE_31__.AngularSplitModule, _angular_material_card__WEBPACK_IMPORTED_MODULE_32__.MatCardModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_27__.MatIconModule, _angular_material_core__WEBPACK_IMPORTED_MODULE_33__.MatRippleModule, _angular_material_tree__WEBPACK_IMPORTED_MODULE_34__.MatTreeModule, _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_35__.MatTooltipModule, _angular_material_menu__WEBPACK_IMPORTED_MODULE_36__.MatMenuModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵsetNgModuleScope"](AppModule, {
    declarations: [_app_component__WEBPACK_IMPORTED_MODULE_0__.AppComponent, _diagram_diagram_component__WEBPACK_IMPORTED_MODULE_1__.DiagramComponent, _diagram_iterator_diagram_iterator_component__WEBPACK_IMPORTED_MODULE_3__.DiagramIteratorComponent, _interactors_custom_interactor_dialog_custom_interactor_dialog_component__WEBPACK_IMPORTED_MODULE_4__.CustomInteractorDialogComponent, _interactors_interactors_component__WEBPACK_IMPORTED_MODULE_5__.InteractorsComponent, _viewport_viewport_component__WEBPACK_IMPORTED_MODULE_6__.ViewportComponent, _species_species_component__WEBPACK_IMPORTED_MODULE_7__.SpeciesComponent, _event_hierarchy_event_hierarchy_component__WEBPACK_IMPORTED_MODULE_8__.EventHierarchyComponent, _details_details_component__WEBPACK_IMPORTED_MODULE_9__.DetailsComponent, _diagram_home_diagram_home_component__WEBPACK_IMPORTED_MODULE_10__.DiagramHomeComponent],
    imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_12__.BrowserModule, _angular_forms__WEBPACK_IMPORTED_MODULE_13__.FormsModule, _angular_common__WEBPACK_IMPORTED_MODULE_14__.CommonModule, _angular_common_http__WEBPACK_IMPORTED_MODULE_15__.HttpClientModule, _angular_router__WEBPACK_IMPORTED_MODULE_37__.RouterOutlet, _app_routing_module__WEBPACK_IMPORTED_MODULE_2__.AppRoutingModule,
    // NoopAnimationsModule,
    _angular_material_button__WEBPACK_IMPORTED_MODULE_16__.MatButtonModule, _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_17__.MatSlideToggleModule, _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_38__.CdkDragHandle, _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_38__.CdkDrag, _angular_material_input__WEBPACK_IMPORTED_MODULE_18__.MatInputModule, _angular_material_select__WEBPACK_IMPORTED_MODULE_19__.MatSelectModule, _angular_forms__WEBPACK_IMPORTED_MODULE_13__.ReactiveFormsModule, _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_20__.MatProgressSpinnerModule, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_21__.BrowserAnimationsModule, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_22__.MatDialogModule, _angular_material_tabs__WEBPACK_IMPORTED_MODULE_23__.MatTabsModule, _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_24__.MatCheckboxModule, _angular_material_radio__WEBPACK_IMPORTED_MODULE_25__.MatRadioModule, _angular_material_components_file_input__WEBPACK_IMPORTED_MODULE_26__.NgxMatFileInputModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_27__.MatIconModule, _angular_material_list__WEBPACK_IMPORTED_MODULE_28__.MatListModule, _angular_material_expansion__WEBPACK_IMPORTED_MODULE_29__.MatExpansionModule, _angular_material_grid_list__WEBPACK_IMPORTED_MODULE_30__.MatGridListModule, angular_split__WEBPACK_IMPORTED_MODULE_31__.AngularSplitModule, _angular_material_card__WEBPACK_IMPORTED_MODULE_32__.MatCardModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_27__.MatIconModule, _angular_material_core__WEBPACK_IMPORTED_MODULE_33__.MatRippleModule, _angular_material_tree__WEBPACK_IMPORTED_MODULE_34__.MatTreeModule, _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_35__.MatTooltipModule, _angular_material_menu__WEBPACK_IMPORTED_MODULE_36__.MatMenuModule]
  });
})();

/***/ }),

/***/ 4712:
/*!**********************************************!*\
  !*** ./src/app/details/details.component.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DetailsComponent: () => (/* binding */ DetailsComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! tslib */ 2321);
/* harmony import */ var _ngneat_until_destroy__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ngneat/until-destroy */ 2813);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _services_event_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/event.service */ 1457);
/* harmony import */ var _services_diagram_state_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/diagram-state.service */ 6742);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 6575);






function DetailsComponent_div_0_p_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "p", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", ctx_r1.obj.summation[0].displayName, "");
  }
}
function DetailsComponent_div_0_p_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "p", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", ctx_r2.obj.created.displayName, "");
  }
}
function DetailsComponent_div_0_p_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "p", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", ctx_r3.obj.created.dateTime, "");
  }
}
function DetailsComponent_div_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div")(1, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](4, "Enhanced data testing\uFF1A summation data");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](5, DetailsComponent_div_0_p_5_Template, 2, 1, "p", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](7, "Enhanced data testing\uFF1A created data");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](8, DetailsComponent_div_0_p_8_Template, 2, 1, "p", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](9, DetailsComponent_div_0_p_9_Template, 2, 1, "p", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate3"]("", ctx_r0.obj.dbId, " ", ctx_r0.obj.displayName, " ", ctx_r0.obj.schemaClass, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx_r0.obj.summation);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx_r0.obj.created);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx_r0.obj.created);
  }
}
let DetailsComponent = class DetailsComponent {
  constructor(eventService, state) {
    this.eventService = eventService;
    this.state = state;
  }
  ngAfterViewInit() {
    this.eventService.selectedObj$.pipe((0,_ngneat_until_destroy__WEBPACK_IMPORTED_MODULE_3__.untilDestroyed)(this)).subscribe(event => {
      this.obj = event;
    });
  }
  static #_ = this.ɵfac = function DetailsComponent_Factory(t) {
    return new (t || DetailsComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_services_event_service__WEBPACK_IMPORTED_MODULE_0__.EventService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_services_diagram_state_service__WEBPACK_IMPORTED_MODULE_1__.DiagramStateService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
    type: DetailsComponent,
    selectors: [["cr-details"]],
    decls: 1,
    vars: 1,
    consts: [[4, "ngIf"], ["style", "color: #2d518d", 4, "ngIf"], ["style", "color: #0C9509", 4, "ngIf"], [2, "color", "#2d518d"], [2, "color", "#0C9509"]],
    template: function DetailsComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](0, DetailsComponent_div_0_Template, 10, 6, "div", 0);
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.obj);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.NgIf],
    styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
  });
};
DetailsComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_5__.__decorate)([(0,_ngneat_until_destroy__WEBPACK_IMPORTED_MODULE_3__.UntilDestroy)()], DetailsComponent);

/***/ }),

/***/ 1139:
/*!********************************************************!*\
  !*** ./src/app/diagram-home/diagram-home.component.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DiagramHomeComponent: () => (/* binding */ DiagramHomeComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _services_analysis_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/analysis.service */ 7139);
/* harmony import */ var _services_dark_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/dark.service */ 4393);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 6575);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ 8849);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/button */ 895);
/* harmony import */ var _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/slide-toggle */ 9293);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/form-field */ 1333);
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/select */ 6355);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/core */ 5309);
/* harmony import */ var _angular_material_menu__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/menu */ 8128);
/* harmony import */ var _diagram_diagram_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../diagram/diagram.component */ 2731);
/* harmony import */ var _interactors_interactors_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../interactors/interactors.component */ 9563);













function DiagramHomeComponent_button_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "button", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function DiagramHomeComponent_button_10_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r7);
      const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r6.clearAnalysis());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, "Remove analysis");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
function DiagramHomeComponent_ng_container_19_ng_container_7_mat_optgroup_1_mat_option_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "mat-option", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](2, "div", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const palette_r12 = ctx.$implicit;
    const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](4);
    let tmp_2_0;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("value", ctx_r11.analysis.paletteOptions.get(palette_r12));
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", palette_r12, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵstyleProp"]("background", (tmp_2_0 = ctx_r11.analysis.paletteOptions.get(palette_r12)) == null ? null : tmp_2_0.gradient);
  }
}
function DiagramHomeComponent_ng_container_19_ng_container_7_mat_optgroup_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "mat-optgroup", 19)(1, "mat-label", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](3, DiagramHomeComponent_ng_container_19_ng_container_7_mat_optgroup_1_mat_option_3_Template, 3, 4, "mat-option", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const group_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](group_r9.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngForOf", group_r9.palettes);
  }
}
function DiagramHomeComponent_ng_container_19_ng_container_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](1, DiagramHomeComponent_ng_container_19_ng_container_7_mat_optgroup_1_Template, 4, 2, "mat-optgroup", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const group_r9 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", group_r9.valid);
  }
}
function DiagramHomeComponent_ng_container_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "mat-form-field", 14)(2, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](3, "Palette");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](4, "mat-select", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("valueChange", function DiagramHomeComponent_ng_container_19_Template_mat_select_valueChange_4_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r15);
      const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r14.analysis.palette = $event);
    })("selectionChange", function DiagramHomeComponent_ng_container_19_Template_mat_select_selectionChange_4_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r15);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵreference"](22);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](_r5.changePalette());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](5, "mat-select-trigger");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](6, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](7, DiagramHomeComponent_ng_container_19_ng_container_7_Template, 2, 1, "ng-container", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("subscriptSizing", "dynamic");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("value", ctx_r4.analysis.palette)("hideSingleSelectionIndicator", true);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵstyleProp"]("background", ctx_r4.analysis.palette.gradient);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngForOf", ctx_r4.analysis.palettes);
  }
}
class DiagramHomeComponent {
  constructor(analysis, dark) {
    this.analysis = analysis;
    this.dark = dark;
    this.diagramId = '';
  }
  clearAnalysis() {
    this.analysis.clearAnalysis();
  }
  static #_ = this.ɵfac = function DiagramHomeComponent_Factory(t) {
    return new (t || DiagramHomeComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_services_analysis_service__WEBPACK_IMPORTED_MODULE_0__.AnalysisService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_services_dark_service__WEBPACK_IMPORTED_MODULE_1__.DarkService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({
    type: DiagramHomeComponent,
    selectors: [["cr-diagram-home"]],
    inputs: {
      diagramId: ["id", "diagramId"]
    },
    decls: 23,
    vars: 9,
    consts: [[1, "container"], [1, "controls"], ["mat-stroked-button", "", 3, "matMenuTriggerFor"], ["an", "matMenu"], ["mat-menu-item", "", 3, "click"], ["mat-menu-item", "", 3, "click", 4, "ngIf"], ["overlay", "matMenu"], [3, "cy", "cys"], ["interactorsComponent", ""], ["color", "primary", 3, "ngModel", "ngModelChange"], [4, "ngIf"], [1, "diagram-container"], [3, "id", "interactor"], ["diagram", ""], ["appearance", "outline", 2, "width", "200px", 3, "subscriptSizing"], [3, "value", "hideSingleSelectionIndicator", "valueChange", "selectionChange"], [1, "palette", 2, "vertical-align", "center"], [4, "ngFor", "ngForOf"], ["style", "align-self: center", 4, "ngIf"], [2, "align-self", "center"], ["align", "center"], [3, "value", 4, "ngFor", "ngForOf"], [3, "value"], [1, "palette", "option-content"]],
    template: function DiagramHomeComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "button", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](3, "Analysis");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](4, "mat-menu", null, 3)(6, "button", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function DiagramHomeComponent_Template_button_click_6_listener() {
          return ctx.analysis.example("uniprot").subscribe();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](7, "UniProt");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](8, "button", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function DiagramHomeComponent_Template_button_click_8_listener() {
          return ctx.analysis.example("microarray").subscribe();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](9, "Expression");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](10, DiagramHomeComponent_button_10_Template, 2, 0, "button", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](11, "button", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](12, "Overlay");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](13, "mat-menu", null, 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](15, "cr-interactors", 7, 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](17, "mat-slide-toggle", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("ngModelChange", function DiagramHomeComponent_Template_mat_slide_toggle_ngModelChange_17_listener($event) {
          return ctx.dark.isDark = $event;
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](18, "Dark mode");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](19, DiagramHomeComponent_ng_container_19_Template, 8, 6, "ng-container", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](20, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](21, "cr-diagram", 12, 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
      }
      if (rf & 2) {
        const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵreference"](5);
        const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵreference"](14);
        const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵreference"](16);
        const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵreference"](22);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("matMenuTriggerFor", _r0);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.analysis.result);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("matMenuTriggerFor", _r2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("cy", _r5.cy)("cys", _r5.cys);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngModel", ctx.dark.isDark);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.analysis.result);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("id", ctx.diagramId)("interactor", _r3);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_5__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.NgModel, _angular_material_button__WEBPACK_IMPORTED_MODULE_7__.MatButton, _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_8__.MatSlideToggle, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_9__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_9__.MatLabel, _angular_material_select__WEBPACK_IMPORTED_MODULE_10__.MatSelect, _angular_material_select__WEBPACK_IMPORTED_MODULE_10__.MatSelectTrigger, _angular_material_core__WEBPACK_IMPORTED_MODULE_11__.MatOption, _angular_material_core__WEBPACK_IMPORTED_MODULE_11__.MatOptgroup, _angular_material_menu__WEBPACK_IMPORTED_MODULE_12__.MatMenu, _angular_material_menu__WEBPACK_IMPORTED_MODULE_12__.MatMenuItem, _angular_material_menu__WEBPACK_IMPORTED_MODULE_12__.MatMenuTrigger, _diagram_diagram_component__WEBPACK_IMPORTED_MODULE_2__.DiagramComponent, _interactors_interactors_component__WEBPACK_IMPORTED_MODULE_3__.InteractorsComponent],
    styles: [".container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  position: absolute;\n  inset: 0 0 0 0;\n  height: 100%;\n}\n.container[_ngcontent-%COMP%]   .controls[_ngcontent-%COMP%] {\n  padding: 0.5em;\n  display: flex;\n  flex-direction: row;\n  gap: 0.5em;\n  align-items: baseline;\n  border-bottom: 1px solid var(--on-surface-variant);\n}\n.container[_ngcontent-%COMP%]   .diagram-container[_ngcontent-%COMP%] {\n  flex: 1;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvZGlhZ3JhbS1ob21lL2RpYWdyYW0taG9tZS5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGFBQUE7RUFDQSxzQkFBQTtFQUNBLGtCQUFBO0VBQ0EsY0FBQTtFQUNBLFlBQUE7QUFDRjtBQUVFO0VBQ0UsY0FBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLFVBQUE7RUFDQSxxQkFBQTtFQUVBLGtEQUFBO0FBREo7QUFJRTtFQUNFLE9BQUE7QUFGSiIsInNvdXJjZXNDb250ZW50IjpbIi5jb250YWluZXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGluc2V0OiAwIDAgMCAwO1xuICBoZWlnaHQ6IDEwMCU7XG5cblxuICAuY29udHJvbHMge1xuICAgIHBhZGRpbmc6IC41ZW07XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICAgIGdhcDogLjVlbTtcbiAgICBhbGlnbi1pdGVtczogYmFzZWxpbmU7XG5cbiAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgdmFyKC0tb24tc3VyZmFjZS12YXJpYW50KTtcbiAgfVxuXG4gIC5kaWFncmFtLWNvbnRhaW5lciB7XG4gICAgZmxleDogMTtcblxuICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9 */"]
  });
}

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
    decls: 12,
    vars: 2,
    consts: [[1, "diagram-container"], [3, "id"], ["diagram", ""], [3, "keydown.arrowLeft", "keydown.arrowRight"], ["mat-raised-button", "", 3, "click"], ["matInput", "", "placeholder", "R-HSA-XXXXXXXX", 3, "ngModel", "ngModelChange"]],
    template: function DiagramIteratorComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](1, "cr-diagram", 1, 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("keydown.arrowLeft", function DiagramIteratorComponent_Template_div_keydown_arrowLeft_3_listener() {
          return ctx.previous();
        })("keydown.arrowRight", function DiagramIteratorComponent_Template_div_keydown_arrowRight_3_listener() {
          return ctx.next();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "button", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function DiagramIteratorComponent_Template_button_click_4_listener() {
          return ctx.previous();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](5, "Previous");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "mat-form-field")(7, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](8, "Diagram ID");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](9, "input", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("ngModelChange", function DiagramIteratorComponent_Template_input_ngModelChange_9_listener($event) {
          return ctx.diagramId = $event;
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](10, "button", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function DiagramIteratorComponent_Template_button_click_10_listener() {
          return ctx.next();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](11, "Next");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("id", ctx.diagramId);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngModel", ctx.diagramId);
      }
    },
    dependencies: [_angular_forms__WEBPACK_IMPORTED_MODULE_5__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.NgModel, _angular_material_button__WEBPACK_IMPORTED_MODULE_6__.MatButton, _angular_material_input__WEBPACK_IMPORTED_MODULE_7__.MatInput, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_8__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_8__.MatLabel, _diagram_diagram_component__WEBPACK_IMPORTED_MODULE_0__.DiagramComponent],
    styles: [".diagram-container[_ngcontent-%COMP%] {\n  width: calc(100vw - 6px);\n  height: 75vh;\n  border: 1px solid black;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvZGlhZ3JhbS1pdGVyYXRvci9kaWFncmFtLWl0ZXJhdG9yLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0Usd0JBQUE7RUFDQSxZQUFBO0VBQ0EsdUJBQUE7QUFDRiIsInNvdXJjZXNDb250ZW50IjpbIi5kaWFncmFtLWNvbnRhaW5lciB7XG4gIHdpZHRoOiBjYWxjKDEwMHZ3IC0gNnB4KTtcbiAgaGVpZ2h0OiA3NXZoO1xuICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0= */"]
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
/* harmony export */   DiagramComponent: () => (/* binding */ DiagramComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! tslib */ 2321);
/* harmony import */ var cytoscape__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cytoscape */ 5388);
/* harmony import */ var reactome_cytoscape_style__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! reactome-cytoscape-style */ 5595);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs */ 2513);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! rxjs */ 3317);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! rxjs */ 4520);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! rxjs */ 5584);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! rxjs */ 7592);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! rxjs */ 4300);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! rxjs */ 1527);
/* harmony import */ var _ngneat_until_destroy__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @ngneat/until-destroy */ 2813);
/* harmony import */ var _projects_reactome_cytoscape_style_src_lib_properties_utils__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../../projects/reactome-cytoscape-style/src/lib/properties-utils */ 1355);
/* harmony import */ var _services_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/utils */ 7038);
/* harmony import */ var chroma_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! chroma-js */ 3062);
/* harmony import */ var chroma_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(chroma_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _angular_animations__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/animations */ 2501);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/material/form-field */ 1333);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _services_diagram_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../services/diagram.service */ 378);
/* harmony import */ var _services_dark_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../services/dark.service */ 4393);
/* harmony import */ var _interactors_services_interactor_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../interactors/services/interactor.service */ 7364);
/* harmony import */ var _services_diagram_state_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../services/diagram-state.service */ 6742);
/* harmony import */ var _services_analysis_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../services/analysis.service */ 7139);
/* harmony import */ var _services_event_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../services/event.service */ 1457);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @angular/router */ 7947);
/* harmony import */ var _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @angular/cdk/drag-drop */ 7792);



















const _c0 = ["cytoscape"];
const _c1 = ["cytoscapeCompare"];
const _c2 = ["legend"];
let DiagramComponent = class DiagramComponent {
  constructor(diagram, dark, interactorsService, state, analysis, event, router, route) {
    this.diagram = diagram;
    this.dark = dark;
    this.interactorsService = interactorsService;
    this.state = state;
    this.analysis = analysis;
    this.event = event;
    this.router = router;
    this.route = route;
    this.title = 'pathway-browser';
    this.comparing = false;
    this.cys = [];
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
    this._reactomeEvents$ = new rxjs__WEBPACK_IMPORTED_MODULE_9__.Subject();
    this._ignore = false;
    this.reactomeEvents$ = this._reactomeEvents$.asObservable().pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_10__.distinctUntilChanged)((prev, current) => prev.type === current.type && prev.detail.reactomeId === current.detail.reactomeId),
    // tap(e => console.log(e.type, e.detail, e.detail.element.data(), e.detail.cy.container()?.id)),
    (0,rxjs__WEBPACK_IMPORTED_MODULE_11__.filter)(() => !this._ignore), (0,rxjs__WEBPACK_IMPORTED_MODULE_12__.share)());
    this.flagging = this.state.onChange.flag$.subscribe(value => this.avoidSideEffect(() => this.cys.forEach(cy => this.flag(value, cy))));
    this.selecting = this.state.onChange.select$.subscribe(value => this.avoidSideEffect(() => this.cys.forEach(cy => this.select(value, cy))));
    //interactoring = this.state.onChange.overlay$.subscribe((value) => this.interactorsComponent?.getInteractors(value));
    this.analysing = this.state.onChange.analysis$.subscribe(value => this.avoidSideEffect(() => this.loadAnalysis(value)));
    this.compareBackgroundSync = this.reactomeEvents$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_11__.filter)(() => this.comparing), (0,rxjs__WEBPACK_IMPORTED_MODULE_11__.filter)(e => e.detail.cy !== this.legend)).subscribe(event => {
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
    this.interactorOpeningHandling = this.reactomeEvents$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_11__.filter)(e => e.detail.cy !== this.legend), (0,rxjs__WEBPACK_IMPORTED_MODULE_11__.filter)(e => [reactome_cytoscape_style__WEBPACK_IMPORTED_MODULE_13__.ReactomeEventTypes.open, reactome_cytoscape_style__WEBPACK_IMPORTED_MODULE_13__.ReactomeEventTypes.close].includes(e.type)), (0,rxjs__WEBPACK_IMPORTED_MODULE_11__.filter)(e => e.detail.type === 'Interactor')).subscribe(e => {
      [this.reactomeStyle, this.reactomeStyleCompare].filter(s => s !== undefined && e.detail.cy === s.cy).forEach(style => {
        const occurrenceNode = e.detail.element.nodes()[0];
        if (e.type === reactome_cytoscape_style__WEBPACK_IMPORTED_MODULE_13__.ReactomeEventTypes.open) this.interactorsService.addInteractorNodes(occurrenceNode, style.cy);else this.interactorsService.removeInteractorNodes(occurrenceNode);
        style.interactivity.updateProteins();
        style.interactivity.triggerZoom();
      });
      if (this.comparing) {
        this.initialiseReplaceElements();
      }
    });
    this.diagram2legend = this.reactomeEvents$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_11__.filter)(e => e.detail.cy !== this.legend)).subscribe(event => {
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
    this.diagramSelect2state = this.reactomeEvents$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_11__.filter)(e => e.detail.cy !== this.legend), (0,rxjs__WEBPACK_IMPORTED_MODULE_14__.delay)(0)).subscribe(e => {
      if (e.type !== reactome_cytoscape_style__WEBPACK_IMPORTED_MODULE_13__.ReactomeEventTypes.select) return;
      let elements = e.detail.element;
      if (e.detail.type === 'reaction') {
        elements = e.detail.cy.elements('node.reaction:selected');
      }
      const reactomeIds = elements.map(el => el.data('graph.stId'));
      this.state.set('select', reactomeIds[0]);
    });
    this.legend2state = this.reactomeEvents$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_11__.filter)(e => e.detail.cy === this.legend), (0,rxjs__WEBPACK_IMPORTED_MODULE_11__.filter)(() => !this._ignore)).subscribe(e => {
      const event = e;
      const classes = event.detail.element.classes();
      for (let cy of [this.cy, this.cyCompare].filter(_services_utils__WEBPACK_IMPORTED_MODULE_1__.isDefined)) {
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
          case reactome_cytoscape_style__WEBPACK_IMPORTED_MODULE_13__.ReactomeEventTypes.select:
            this.state.set('flag', ['class:' + classes[0] + (event.detail.type === 'reaction' ? '' : (classes.includes('drug') ? '.' : '!') + 'drug')]);
            break;
          case reactome_cytoscape_style__WEBPACK_IMPORTED_MODULE_13__.ReactomeEventTypes.unselect:
            this.state.set('flag', []);
            break;
          case reactome_cytoscape_style__WEBPACK_IMPORTED_MODULE_13__.ReactomeEventTypes.hover:
            matchingElement.addClass('hover');
            break;
          case reactome_cytoscape_style__WEBPACK_IMPORTED_MODULE_13__.ReactomeEventTypes.leave:
            matchingElement.removeClass('hover');
            break;
        }
      }
    });
    this.style = _angular_animations__WEBPACK_IMPORTED_MODULE_15__.style;
    this.brewer = chroma_js__WEBPACK_IMPORTED_MODULE_2__.brewer;
    this.MatFormField = _angular_material_form_field__WEBPACK_IMPORTED_MODULE_16__.MatFormField;
    this.group = _angular_animations__WEBPACK_IMPORTED_MODULE_15__.group;
  }
  ngOnChanges(changes) {
    if (changes['diagramId']) this.loadDiagram();
  }
  ngAfterViewInit() {
    this.dark.$dark.subscribe(this.updateStyle.bind(this));
    const container = this.cytoscapeContainer.nativeElement;
    const compareContainer = this.compareContainer.nativeElement;
    const legendContainer = this.legendContainer.nativeElement;
    Object.values(reactome_cytoscape_style__WEBPACK_IMPORTED_MODULE_13__.ReactomeEventTypes).forEach(type => {
      container.addEventListener(type, e => this._reactomeEvents$.next(e));
      compareContainer.addEventListener(type, e => this._reactomeEvents$.next(e));
      legendContainer.addEventListener(type, e => this._reactomeEvents$.next(e));
    });
    this.reactomeStyle = new reactome_cytoscape_style__WEBPACK_IMPORTED_MODULE_13__.Style(container);
    this.underlayPadding = (0,_projects_reactome_cytoscape_style_src_lib_properties_utils__WEBPACK_IMPORTED_MODULE_17__.extract)(this.reactomeStyle.properties.shadow.padding);
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
      this.cy.on('dblclick', '.Pathway', e => this.router.navigate([`../${e.target.data('graph.stId')}`], {
        queryParamsHandling: "preserve",
        relativeTo: this.route
      }));
      this.event.setSubpathwaysColors(new Map(this.cy?.nodes('.Shadow').map(node => [node.data('reactomeId'), node.data('color')])));
      this.loadCompare(elements, container);
      this.avoidSideEffect(() => this.stateToDiagram());
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
      this.reactomeStyleCompare = new reactome_cytoscape_style__WEBPACK_IMPORTED_MODULE_13__.Style(compareContainer);
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
          // Consider it as a subpathway when there are no elements found and get all reactions
          if (elements.length === 0) {
            let allSubpathwaysElements = elements.or('[subpathways]');
            allSubpathwaysElements.forEach(ele => {
              let pathwayList = ele.data('subpathways');
              if (pathwayList.includes(token)) {
                elements.merge(ele);
              }
            });
          }
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
    cy.elements(':selected').unselect();
    let selected = this.getElements([tokens], cy);
    selected.select();
    if ("connectedNodes" in selected) {
      selected = selected.add(selected.connectedNodes());
    }
    if (this._ignore) {
      cy.animate({
        fit: {
          eles: selected,
          padding: 100
        },
        duration: 1000,
        easing: "ease-in-out"
      });
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
      case reactome_cytoscape_style__WEBPACK_IMPORTED_MODULE_13__.ReactomeEventTypes.hover:
        affectedElements.addClass('hover');
        break;
      case reactome_cytoscape_style__WEBPACK_IMPORTED_MODULE_13__.ReactomeEventTypes.leave:
        affectedElements.removeClass('hover');
        break;
      case reactome_cytoscape_style__WEBPACK_IMPORTED_MODULE_13__.ReactomeEventTypes.select:
        affectedElements.select();
        break;
      case reactome_cytoscape_style__WEBPACK_IMPORTED_MODULE_13__.ReactomeEventTypes.unselect:
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
  loadAnalysis(token) {
    console.log(token, this.diagramId);
    if (!token || !this.diagramId) {
      this.cys.forEach(cy => {
        cy.batch(() => {
          cy.nodes().removeData('exp');
          cy.edges('[?color]').style({
            'underlay-padding': (0,_projects_reactome_cytoscape_style_src_lib_properties_utils__WEBPACK_IMPORTED_MODULE_17__.extract)(this.reactomeStyle.properties.shadow.padding)
          });
          cy.nodes('.Shadow').style({
            'font-size': (0,_projects_reactome_cytoscape_style_src_lib_properties_utils__WEBPACK_IMPORTED_MODULE_17__.extract)(this.reactomeStyle.properties.shadow.fontSize),
            'text-outline-width': (0,_projects_reactome_cytoscape_style_src_lib_properties_utils__WEBPACK_IMPORTED_MODULE_17__.extract)(this.reactomeStyle.properties.shadow.fontPadding)
          });
        });
      });
      this.reactomeStyle?.loadAnalysis(this.cy, this.analysis.palette.scale);
      return;
    }
    (0,rxjs__WEBPACK_IMPORTED_MODULE_18__.forkJoin)({
      entities: this.analysis.foundEntities(this.diagramId, token),
      pathways: this.analysis.pathwaysResults(this.cy.nodes('.Pathway').map(p => p.data('reactomeId')), token),
      result: this.analysis.result$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_11__.filter)(_services_utils__WEBPACK_IMPORTED_MODULE_1__.isDefined), (0,rxjs__WEBPACK_IMPORTED_MODULE_19__.take)(1))
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
            // console.log(node.data('reactomeId'), leaves, exp)
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
            'font-size': (0,_projects_reactome_cytoscape_style_src_lib_properties_utils__WEBPACK_IMPORTED_MODULE_17__.extract)(style.properties.shadow.fontSize) / 2,
            'text-outline-width': (0,_projects_reactome_cytoscape_style_src_lib_properties_utils__WEBPACK_IMPORTED_MODULE_17__.extract)(style.properties.shadow.fontPadding) / 2
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
          for (let summary of this.analysis.paletteOptions.values()) {
            summary.scale.padding(0.1);
            summary.classes(result.summary.type === 'GSA_REGULATION' ? 5 : 0);
            summary.domain(min, max);
          }
          this.analysis.palettes.forEach(group => group.valid = validGroups.has(group.name));
          this.analysis.palette = this.analysis.paletteOptions.get(hasExpression ? 'RdBu' : 'GnBu');
          this.reactomeStyle.loadAnalysis(cy, this.analysis.palette.scale);
        });
      });
    });
  }
  changePalette() {
    console.log(this.analysis.palette);
    if (this.analysis.palette) this.reactomeStyle.loadAnalysis(this.cy, this.analysis.palette.scale);
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
  dragMove($event, compareContainer, container) {
    if (!this.compareDragging) return;
    compareContainer.style['left'] = $event.x - container.getBoundingClientRect().x + 'px';
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
  avoidSideEffect(m) {
    this._ignore = true;
    m();
    this._ignore = false;
  }
  // stateToDiagramSub = this.state.state$.subscribe(() => this.stateToDiagram());
  stateToDiagram() {
    for (let cy of this.cys) {
      this.flag(this.state.get('flag'), cy);
      this.select(this.state.get("select"), cy);
    }
    const resource = this.state.get('overlay');
    if (resource) {
      console.log('Resource not null', resource);
      this.interactorsComponent?.getInteractors(resource);
    }
    this.loadAnalysis(this.state.get('analysis'));
  }
  logProteins() {
    console.debug(new Set(this.cy.nodes(".Protein").map(node => node.data("acc") || node.data("iAcc"))));
  }
  analyse(example) {
    this.analysis.example(example).subscribe();
  }
  static #_ = this.ɵfac = function DiagramComponent_Factory(t) {
    return new (t || DiagramComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵdirectiveInject"](_services_diagram_service__WEBPACK_IMPORTED_MODULE_3__.DiagramService), _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵdirectiveInject"](_services_dark_service__WEBPACK_IMPORTED_MODULE_4__.DarkService), _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵdirectiveInject"](_interactors_services_interactor_service__WEBPACK_IMPORTED_MODULE_5__.InteractorService), _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵdirectiveInject"](_services_diagram_state_service__WEBPACK_IMPORTED_MODULE_6__.DiagramStateService), _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵdirectiveInject"](_services_analysis_service__WEBPACK_IMPORTED_MODULE_7__.AnalysisService), _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵdirectiveInject"](_services_event_service__WEBPACK_IMPORTED_MODULE_8__.EventService), _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_21__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_21__.ActivatedRoute));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵdefineComponent"]({
    type: DiagramComponent,
    selectors: [["cr-diagram"]],
    viewQuery: function DiagramComponent_Query(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵviewQuery"](_c0, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵviewQuery"](_c1, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵviewQuery"](_c2, 5);
      }
      if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵloadQuery"]()) && (ctx.cytoscapeContainer = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵloadQuery"]()) && (ctx.compareContainer = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵloadQuery"]()) && (ctx.legendContainer = _t.first);
      }
    },
    inputs: {
      interactorsComponent: ["interactor", "interactorsComponent"],
      diagramId: ["id", "diagramId"]
    },
    outputs: {
      reactomeEvents$: "reactomeEvents$"
    },
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵNgOnChangesFeature"]],
    decls: 16,
    vars: 10,
    consts: [[1, "variables"], ["container", ""], ["id", "cytoscape"], ["cytoscape", ""], ["id", "disease-container", 1, "drag-container"], ["compareContainer", ""], ["id", "handle-limits", 3, "mouseup", "mouseleave", "mousemove"], ["id", "disease-handle", 1, "drag-handle", 3, "mousedown"], ["id", "cytoscape-compare", 1, "drag-content"], ["cytoscapeCompare", ""], ["id", "legend-boundary"], ["cdkDrag", "", "cdkDragLockAxis", "x", "cdkDragBoundary", "#legend-boundary", "id", "legend-container", 3, "cdkDragMoved"], ["id", "legend-handle", "cdkDragHandle", ""], ["id", "legend"], ["legend", ""]],
    template: function DiagramComponent_Template(rf, ctx) {
      if (rf & 1) {
        const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵgetCurrentView"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](0, "div", 0, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelement"](2, "div", 2, 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](4, "div", 4, 5)(6, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵlistener"]("mouseup", function DiagramComponent_Template_div_mouseup_6_listener() {
          return ctx.dragEnd();
        })("mouseleave", function DiagramComponent_Template_div_mouseleave_6_listener() {
          return ctx.dragEnd();
        })("mousemove", function DiagramComponent_Template_div_mousemove_6_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵrestoreView"](_r5);
          const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵreference"](5);
          const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵreference"](1);
          return _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵresetView"](ctx.dragMove($event, _r2, _r0));
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](7, "span", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵlistener"]("mousedown", function DiagramComponent_Template_span_mousedown_7_listener() {
          return ctx.dragStart();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelement"](8, "div", 8, 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](10, "div", 10)(11, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵlistener"]("cdkDragMoved", function DiagramComponent_Template_div_cdkDragMoved_11_listener() {
          return ctx.updateLegend();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](12, "button", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtext"](13, "LEGEND");
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelement"](14, "div", 13, 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]()()();
      }
      if (rf & 2) {
        const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵreference"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵclassProp"]("dark", ctx.dark.isDark);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵstyleProp"]("display", ctx.comparing ? "flex" : "none");
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵclassProp"]("active", ctx.compareDragging);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵstyleProp"]("--legend-width", ctx.ratio * _r0.clientHeight, "px");
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵstyleProp"]("height", _r0.clientHeight + "px");
      }
    },
    dependencies: [_angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_22__.CdkDragHandle, _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_22__.CdkDrag],
    styles: [".variables[_ngcontent-%COMP%] {\n  position: relative;\n  height: 100%;\n  --opacity: 0.08;\n  --structure-opacity: [[130,0], [150,100]];\n  --shadow-padding: 20;\n  --shadow-luminosity: 40;\n  --on-surface: #001F24;\n  --primary: #006782;\n  --on-primary: #FFFFFF;\n  --on-tertiary: #FFFFFF;\n  --positive: #0C9509;\n  --negative: #BA1A1A;\n  --negative-contrast: #ea7d7d;\n  --select-node: #6EB3E4;\n  --select-edge: #0561A6;\n  --hover-node: #78E076;\n  --hover-edge: #04B601;\n  --interactor-fill: #68297C;\n  --interactor-stroke: #9f5cb5;\n  --flag: #ff009a;\n  --compartment: #E5834A;\n  --primary-contrast-1: #001F29;\n  --primary-contrast-2: #003545;\n  --primary-contrast-3: #004D62;\n  --primary-contrast-4: #006782;\n  --tertiary-contrast-1: #00315C;\n  --tertiary-contrast-2: #004882;\n  --tertiary-contrast-3: #1660A5;\n  --drug-contrast-1: #3E001D;\n  --drug-contrast-2: #610B33;\n  --drug-contrast-3: #7E2549;\n  --drug-contrast-4: #BB557A;\n  --analysis-uni-palette: [\n    [0, \"#FFFFE0\"],\n    [1, \"#00429D\"]\n  ];\n  --analysis-bi-palette: \"viridis\";\n  --analysis-not-found: #001F24;\n}\n.variables.dark[_ngcontent-%COMP%] {\n  --opacity: 0.08;\n  --shadow-luminosity: 70;\n  --shadow-opacity: [[20, 40], [40, 0]];\n  --on-surface: #97F0FF;\n  --primary: #5CD4FF;\n  --on-primary: #0D1617;\n  --on-tertiary: #0D1317;\n  --positive: #10d70b;\n  --negative: #ea2323;\n  --select-node: #00ffff;\n  --negative-contrast: #8f0000;\n  --select-edge: #1d85cc;\n  --hover-node: #ffff00;\n  --hover-edge: #ffff00;\n  --flag: #DA429E;\n  --compartment: #5e232d;\n  --primary-contrast-1: #5CD4FF;\n  --primary-contrast-2: #20B9E5;\n  --primary-contrast-3: #009DC4;\n  --primary-contrast-4: #0081A2;\n  --tertiary-contrast-1: #a48ee0;\n  --tertiary-contrast-2: #9b73d3;\n  --tertiary-contrast-3: #8c63c5;\n  --drug-contrast-1: #FFB1C8;\n  --drug-contrast-2: #F988AE;\n  --drug-contrast-3: #DA6E94;\n  --drug-contrast-4: #c4527b;\n}\n\n#cytoscape[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0 0 0 0;\n  background: var(--surface);\n}\n\n#legend-boundary[_ngcontent-%COMP%] {\n  --legend-width: 400px;\n  --border-width: 2px;\n  --handle-width: 20px;\n  position: absolute;\n  pointer-events: none;\n  right: calc(-1 * var(--legend-width) - var(--border-width));\n  height: 100%;\n  width: calc(2 * var(--legend-width) + var(--handle-width));\n}\n#legend-boundary[_ngcontent-%COMP%]   #legend-container[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  display: flex;\n  align-items: center;\n  width: -moz-fit-content;\n  width: fit-content;\n  left: calc(var(--legend-width) - var(--border-width));\n  pointer-events: all;\n  height: 100%;\n}\n#legend-boundary[_ngcontent-%COMP%]   #legend-handle[_ngcontent-%COMP%] {\n  width: var(--handle-width);\n  text-orientation: upright;\n  writing-mode: vertical-lr;\n  border-radius: 8.5px 0 0 8.5px;\n  background: color-mix(in srgb, var(--surface) 80%, transparent);\n  -webkit-backdrop-filter: blur(5px);\n          backdrop-filter: blur(5px);\n  border-left: var(--border-width) solid var(--primary);\n  border-top: var(--border-width) solid var(--primary);\n  border-bottom: var(--border-width) solid var(--primary);\n  border-right: 0;\n  cursor: ew-resize;\n  color: var(--on-surface);\n}\n#legend-boundary[_ngcontent-%COMP%]   #legend[_ngcontent-%COMP%] {\n  width: var(--legend-width);\n  height: 100%;\n  background: color-mix(in srgb, var(--surface) 80%, transparent);\n  -webkit-backdrop-filter: blur(5px);\n          backdrop-filter: blur(5px);\n}\n#legend-boundary[_ngcontent-%COMP%]   #legend[_ngcontent-%COMP%]:before {\n  content: \"\";\n  height: 100%;\n  width: 2px;\n  background-color: var(--primary);\n  position: absolute;\n  left: -1px;\n  z-index: 4;\n}\n\n.drag-container[_ngcontent-%COMP%] {\n  position: absolute;\n  left: 10%;\n  width: 100%;\n  pointer-events: all;\n  z-index: 1;\n  display: flex;\n  align-items: center;\n  height: 100%;\n}\n\n#handle-limits[_ngcontent-%COMP%] {\n  --width: 500px;\n  --height: 500px;\n  position: absolute;\n  left: calc(-0.5 * var(--width));\n  top: calc(50% - 0.5 * var(--height));\n  width: var(--width);\n  height: var(--height);\n  z-index: 5;\n  pointer-events: none;\n}\n#handle-limits.active[_ngcontent-%COMP%] {\n  pointer-events: all;\n  cursor: ew-resize;\n}\n\n.drag-handle[_ngcontent-%COMP%] {\n  --width: 4px;\n  --height: 30px;\n  position: absolute;\n  left: calc(50% - 0.5 * var(--width) - 4px);\n  top: calc(50% - 0.5 * var(--height) - 4px);\n  border-radius: var(--height);\n  width: var(--width);\n  height: var(--height);\n  border: 4px solid var(--primary);\n  cursor: ew-resize;\n  color: var(--on-surface);\n  pointer-events: all;\n  filter: drop-shadow(-2px 0px 0px var(--primary-container)) drop-shadow(2px 0px 0px var(--error-container));\n  background: var(--surface);\n}\n\n#cytoscape-compare[_ngcontent-%COMP%] {\n  box-sizing: border-box;\n  position: absolute;\n  height: 100%;\n  width: 100%;\n  inset: 0 0 0 0;\n  background-color: color-mix(in srgb, var(--error) 5%, color-mix(in srgb, var(--surface) 50%, transparent));\n}\n#cytoscape-compare[_ngcontent-%COMP%]:before {\n  content: \"\";\n  height: 100%;\n  width: 4px;\n  background-color: var(--primary);\n  filter: drop-shadow(-2px 0px 0px var(--primary-container)) drop-shadow(2px 0px 0px var(--error-container));\n  position: absolute;\n  left: -2px;\n  z-index: 4;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvZGlhZ3JhbS9kaWFncmFtLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0Usa0JBQUE7RUFDQSxZQUFBO0VBQ0EsZUFBQTtFQUNBLHlDQUFBO0VBQ0Esb0JBQUE7RUFFQSx1QkFBQTtFQUNBLHFCQUFBO0VBQ0Esa0JBQUE7RUFDQSxxQkFBQTtFQUNBLHNCQUFBO0VBQ0EsbUJBQUE7RUFDQSxtQkFBQTtFQUNBLDRCQUFBO0VBQ0Esc0JBQUE7RUFDQSxzQkFBQTtFQUNBLHFCQUFBO0VBQ0EscUJBQUE7RUFDQSwwQkFBQTtFQUNBLDRCQUFBO0VBQ0EsZUFBQTtFQUdBLHNCQUFBO0VBRUEsNkJBQUE7RUFDQSw2QkFBQTtFQUNBLDZCQUFBO0VBQ0EsNkJBQUE7RUFFQSw4QkFBQTtFQUNBLDhCQUFBO0VBQ0EsOEJBQUE7RUFFQSwwQkFBQTtFQUNBLDBCQUFBO0VBQ0EsMEJBQUE7RUFDQSwwQkFBQTtFQUVBOzs7R0FBQTtFQVdBLGdDQUFBO0VBQ0EsNkJBQUE7QUFiRjtBQWVFO0VBQ0UsZUFBQTtFQUNBLHVCQUFBO0VBQ0EscUNBQUE7RUFHQSxxQkFBQTtFQUNBLGtCQUFBO0VBQ0EscUJBQUE7RUFDQSxzQkFBQTtFQUNBLG1CQUFBO0VBQ0EsbUJBQUE7RUFDQSxzQkFBQTtFQUNBLDRCQUFBO0VBQ0Esc0JBQUE7RUFDQSxxQkFBQTtFQUNBLHFCQUFBO0VBR0EsZUFBQTtFQUVBLHNCQUFBO0VBRUEsNkJBQUE7RUFDQSw2QkFBQTtFQUNBLDZCQUFBO0VBQ0EsNkJBQUE7RUFFQSw4QkFBQTtFQUNBLDhCQUFBO0VBQ0EsOEJBQUE7RUFFQSwwQkFBQTtFQUNBLDBCQUFBO0VBQ0EsMEJBQUE7RUFDQSwwQkFBQTtBQXJCSjs7QUFzQ0E7RUFDRSxrQkFBQTtFQUNBLGNBQUE7RUFDQSwwQkFBQTtBQW5DRjs7QUF1Q0E7RUFDRSxxQkFBQTtFQUNBLG1CQUFBO0VBQ0Esb0JBQUE7RUFFQSxrQkFBQTtFQUNBLG9CQUFBO0VBQ0EsMkRBQUE7RUFDQSxZQUFBO0VBQ0EsMERBQUE7QUFyQ0Y7QUF1Q0U7RUFDRSxrQkFBQTtFQUNBLFVBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSx1QkFBQTtFQUFBLGtCQUFBO0VBQ0EscURBQUE7RUFDQSxtQkFBQTtFQUNBLFlBQUE7QUFyQ0o7QUF3Q0U7RUFDRSwwQkFBQTtFQUNBLHlCQUFBO0VBQ0EseUJBQUE7RUFFQSw4QkFBQTtFQUNBLCtEQUFBO0VBQ0Esa0NBQUE7VUFBQSwwQkFBQTtFQUNBLHFEQUFBO0VBQ0Esb0RBQUE7RUFDQSx1REFBQTtFQUNBLGVBQUE7RUFDQSxpQkFBQTtFQUNBLHdCQUFBO0FBdkNKO0FBMENFO0VBQ0UsMEJBQUE7RUFDQSxZQUFBO0VBRUEsK0RBQUE7RUFDQSxrQ0FBQTtVQUFBLDBCQUFBO0FBekNKO0FBMkNJO0VBQ0UsV0FBQTtFQUNBLFlBQUE7RUFDQSxVQUFBO0VBQ0EsZ0NBQUE7RUFDQSxrQkFBQTtFQUNBLFVBQUE7RUFDQSxVQUFBO0FBekNOOztBQThDQTtFQUNFLGtCQUFBO0VBQ0EsU0FBQTtFQUNBLFdBQUE7RUFDQSxtQkFBQTtFQUVBLFVBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxZQUFBO0FBNUNGOztBQStDQTtFQUNFLGNBQUE7RUFDQSxlQUFBO0VBQ0Esa0JBQUE7RUFDQSwrQkFBQTtFQUNBLG9DQUFBO0VBQ0EsbUJBQUE7RUFDQSxxQkFBQTtFQUVBLFVBQUE7RUFDQSxvQkFBQTtBQTdDRjtBQStDRTtFQUNFLG1CQUFBO0VBQ0EsaUJBQUE7QUE3Q0o7O0FBaURBO0VBQ0UsWUFBQTtFQUNBLGNBQUE7RUFFQSxrQkFBQTtFQUNBLDBDQUFBO0VBQ0EsMENBQUE7RUFFQSw0QkFBQTtFQUNBLG1CQUFBO0VBQ0EscUJBQUE7RUFDQSxnQ0FBQTtFQUNBLGlCQUFBO0VBQ0Esd0JBQUE7RUFDQSxtQkFBQTtFQUNBLDBHQUFBO0VBQ0EsMEJBQUE7QUFoREY7O0FBcURBO0VBQ0Usc0JBQUE7RUFDQSxrQkFBQTtFQUVBLFlBQUE7RUFDQSxXQUFBO0VBQ0EsY0FBQTtFQUNBLDBHQUFBO0FBbkRGO0FBcURFO0VBQ0UsV0FBQTtFQUNBLFlBQUE7RUFDQSxVQUFBO0VBQ0EsZ0NBQUE7RUFDQSwwR0FBQTtFQUNBLGtCQUFBO0VBQ0EsVUFBQTtFQUNBLFVBQUE7QUFuREoiLCJzb3VyY2VzQ29udGVudCI6WyIudmFyaWFibGVzIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBoZWlnaHQ6IDEwMCU7XG4gIC0tb3BhY2l0eTogMC4wODtcbiAgLS1zdHJ1Y3R1cmUtb3BhY2l0eTogW1sxMzAsMF0sIFsxNTAsMTAwXV07XG4gIC0tc2hhZG93LXBhZGRpbmc6IDIwO1xuXG4gIC0tc2hhZG93LWx1bWlub3NpdHk6IDQwO1xuICAtLW9uLXN1cmZhY2U6ICMwMDFGMjQ7XG4gIC0tcHJpbWFyeTogIzAwNjc4MjtcbiAgLS1vbi1wcmltYXJ5OiAjRkZGRkZGO1xuICAtLW9uLXRlcnRpYXJ5OiAjRkZGRkZGO1xuICAtLXBvc2l0aXZlOiAjMEM5NTA5O1xuICAtLW5lZ2F0aXZlOiAjQkExQTFBO1xuICAtLW5lZ2F0aXZlLWNvbnRyYXN0OiAjZWE3ZDdkO1xuICAtLXNlbGVjdC1ub2RlOiAjNkVCM0U0O1xuICAtLXNlbGVjdC1lZGdlOiAjMDU2MUE2O1xuICAtLWhvdmVyLW5vZGU6ICM3OEUwNzY7XG4gIC0taG92ZXItZWRnZTogIzA0QjYwMTtcbiAgLS1pbnRlcmFjdG9yLWZpbGw6ICM2ODI5N0M7XG4gIC0taW50ZXJhY3Rvci1zdHJva2U6ICM5ZjVjYjU7XG4gIC0tZmxhZzogI2ZmMDA5YTtcblxuXG4gIC0tY29tcGFydG1lbnQ6ICNFNTgzNEE7XG5cbiAgLS1wcmltYXJ5LWNvbnRyYXN0LTE6ICMwMDFGMjk7XG4gIC0tcHJpbWFyeS1jb250cmFzdC0yOiAjMDAzNTQ1O1xuICAtLXByaW1hcnktY29udHJhc3QtMzogIzAwNEQ2MjtcbiAgLS1wcmltYXJ5LWNvbnRyYXN0LTQ6ICMwMDY3ODI7XG5cbiAgLS10ZXJ0aWFyeS1jb250cmFzdC0xOiAjMDAzMTVDO1xuICAtLXRlcnRpYXJ5LWNvbnRyYXN0LTI6ICMwMDQ4ODI7XG4gIC0tdGVydGlhcnktY29udHJhc3QtMzogIzE2NjBBNTtcblxuICAtLWRydWctY29udHJhc3QtMTogIzNFMDAxRDtcbiAgLS1kcnVnLWNvbnRyYXN0LTI6ICM2MTBCMzM7XG4gIC0tZHJ1Zy1jb250cmFzdC0zOiAjN0UyNTQ5O1xuICAtLWRydWctY29udHJhc3QtNDogI0JCNTU3QTtcblxuICAtLWFuYWx5c2lzLXVuaS1wYWxldHRlOiBbXG4gICAgWzAsICcjRkZGRkUwJ10sXG4gICAgWzEsICcjMDA0MjlEJ11cbiAgXTtcblxuICAvLy0tYW5hbHlzaXMtYmktcGFsZXR0ZTogW1xuICAvLyAgWzAuMCwgJyM5MzAwM0EnXSxcbiAgLy8gIFswLjUsICcjRkZGRkUwJ10sXG4gIC8vICBbMS4wLCAnIzAwNDI5RCddXG4gIC8vXTtcblxuICAtLWFuYWx5c2lzLWJpLXBhbGV0dGU6ICd2aXJpZGlzJztcbiAgLS1hbmFseXNpcy1ub3QtZm91bmQ6ICMwMDFGMjQ7XG5cbiAgJi5kYXJrIHtcbiAgICAtLW9wYWNpdHk6IDAuMDg7XG4gICAgLS1zaGFkb3ctbHVtaW5vc2l0eTogNzA7XG4gICAgLS1zaGFkb3ctb3BhY2l0eTogW1syMCwgNDBdLCBbNDAsIDBdXTtcblxuXG4gICAgLS1vbi1zdXJmYWNlOiAjOTdGMEZGO1xuICAgIC0tcHJpbWFyeTogIzVDRDRGRjtcbiAgICAtLW9uLXByaW1hcnk6ICMwRDE2MTc7XG4gICAgLS1vbi10ZXJ0aWFyeTogIzBEMTMxNztcbiAgICAtLXBvc2l0aXZlOiAjMTBkNzBiO1xuICAgIC0tbmVnYXRpdmU6ICNlYTIzMjM7XG4gICAgLS1zZWxlY3Qtbm9kZTogIzAwZmZmZjtcbiAgICAtLW5lZ2F0aXZlLWNvbnRyYXN0OiAjOGYwMDAwO1xuICAgIC0tc2VsZWN0LWVkZ2U6ICMxZDg1Y2M7XG4gICAgLS1ob3Zlci1ub2RlOiAjZmZmZjAwO1xuICAgIC0taG92ZXItZWRnZTogI2ZmZmYwMDtcbiAgICAvLy0taW50ZXJhY3Rvci1zdHJva2U6ICM2ODI5N0M7XG4gICAgLy8tLWludGVyYWN0b3ItZmlsbDogIzlmNWNiNTtcbiAgICAtLWZsYWc6ICNEQTQyOUU7XG5cbiAgICAtLWNvbXBhcnRtZW50OiAjNWUyMzJkO1xuXG4gICAgLS1wcmltYXJ5LWNvbnRyYXN0LTE6ICM1Q0Q0RkY7XG4gICAgLS1wcmltYXJ5LWNvbnRyYXN0LTI6ICMyMEI5RTU7XG4gICAgLS1wcmltYXJ5LWNvbnRyYXN0LTM6ICMwMDlEQzQ7XG4gICAgLS1wcmltYXJ5LWNvbnRyYXN0LTQ6ICMwMDgxQTI7XG5cbiAgICAtLXRlcnRpYXJ5LWNvbnRyYXN0LTE6ICNhNDhlZTA7XG4gICAgLS10ZXJ0aWFyeS1jb250cmFzdC0yOiAjOWI3M2QzO1xuICAgIC0tdGVydGlhcnktY29udHJhc3QtMzogIzhjNjNjNTtcblxuICAgIC0tZHJ1Zy1jb250cmFzdC0xOiAjRkZCMUM4O1xuICAgIC0tZHJ1Zy1jb250cmFzdC0yOiAjRjk4OEFFO1xuICAgIC0tZHJ1Zy1jb250cmFzdC0zOiAjREE2RTk0O1xuICAgIC0tZHJ1Zy1jb250cmFzdC00OiAjYzQ1MjdiO1xuICB9XG59XG5cbi8vI2NvbnRyb2xzIHtcbi8vICBwb3NpdGlvbjogYWJzb2x1dGU7XG4vLyAgaW5zZXQ6IGNhbGMoMTAwJSAtIDQwcHgpIDAgMCAwO1xuLy9cbi8vICAqIHtcbi8vICAgIGJhY2tncm91bmQ6IHZhcigtLXN1cmZhY2UpO1xuLy8gICAgY29sb3I6IHZhcigtLW9uLXN1cmZhY2UpO1xuLy8gIH1cbi8vXG4vLyAgYmFja2dyb3VuZDogdmFyKC0tc3VyZmFjZSk7XG4vL1xuLy99XG5cbiNjeXRvc2NhcGUge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGluc2V0OiAwIDAgMCAwO1xuICBiYWNrZ3JvdW5kOiB2YXIoLS1zdXJmYWNlKTtcbn1cblxuXG4jbGVnZW5kLWJvdW5kYXJ5IHtcbiAgLS1sZWdlbmQtd2lkdGg6IDQwMHB4O1xuICAtLWJvcmRlci13aWR0aDogMnB4O1xuICAtLWhhbmRsZS13aWR0aDogMjBweDtcblxuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHBvaW50ZXItZXZlbnRzOiBub25lO1xuICByaWdodDogY2FsYygtMSAqIHZhcigtLWxlZ2VuZC13aWR0aCkgLSB2YXIoLS1ib3JkZXItd2lkdGgpKTtcbiAgaGVpZ2h0OiAxMDAlO1xuICB3aWR0aDogY2FsYygyICogdmFyKC0tbGVnZW5kLXdpZHRoKSArIHZhcigtLWhhbmRsZS13aWR0aCkpO1xuXG4gICNsZWdlbmQtY29udGFpbmVyIHtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgei1pbmRleDogMTtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgd2lkdGg6IGZpdC1jb250ZW50O1xuICAgIGxlZnQ6IGNhbGModmFyKC0tbGVnZW5kLXdpZHRoKSAtIHZhcigtLWJvcmRlci13aWR0aCkpO1xuICAgIHBvaW50ZXItZXZlbnRzOiBhbGw7XG4gICAgaGVpZ2h0OiAxMDAlO1xuICB9XG5cbiAgI2xlZ2VuZC1oYW5kbGUge1xuICAgIHdpZHRoOiB2YXIoLS1oYW5kbGUtd2lkdGgpO1xuICAgIHRleHQtb3JpZW50YXRpb246IHVwcmlnaHQ7XG4gICAgd3JpdGluZy1tb2RlOiB2ZXJ0aWNhbC1scjtcblxuICAgIGJvcmRlci1yYWRpdXM6IDguNXB4IDAgMCA4LjVweDtcbiAgICBiYWNrZ3JvdW5kOiBjb2xvci1taXgoaW4gc3JnYiwgdmFyKC0tc3VyZmFjZSkgODAlLCB0cmFuc3BhcmVudCk7XG4gICAgYmFja2Ryb3AtZmlsdGVyOiBibHVyKDVweCk7XG4gICAgYm9yZGVyLWxlZnQ6IHZhcigtLWJvcmRlci13aWR0aCkgc29saWQgdmFyKC0tcHJpbWFyeSk7XG4gICAgYm9yZGVyLXRvcDogdmFyKC0tYm9yZGVyLXdpZHRoKSBzb2xpZCB2YXIoLS1wcmltYXJ5KTtcbiAgICBib3JkZXItYm90dG9tOiB2YXIoLS1ib3JkZXItd2lkdGgpIHNvbGlkIHZhcigtLXByaW1hcnkpO1xuICAgIGJvcmRlci1yaWdodDogMDtcbiAgICBjdXJzb3I6IGV3LXJlc2l6ZTtcbiAgICBjb2xvcjogdmFyKC0tb24tc3VyZmFjZSk7XG4gIH1cblxuICAjbGVnZW5kIHtcbiAgICB3aWR0aDogdmFyKC0tbGVnZW5kLXdpZHRoKTtcbiAgICBoZWlnaHQ6IDEwMCU7XG4gICAgLy9ib3JkZXItbGVmdDogdmFyKC0tYm9yZGVyLXdpZHRoKSBzb2xpZCB2YXIoLS1wcmltYXJ5KTtcbiAgICBiYWNrZ3JvdW5kOiBjb2xvci1taXgoaW4gc3JnYiwgdmFyKC0tc3VyZmFjZSkgODAlLCB0cmFuc3BhcmVudCk7XG4gICAgYmFja2Ryb3AtZmlsdGVyOiBibHVyKDVweCk7XG5cbiAgICAmOmJlZm9yZSB7XG4gICAgICBjb250ZW50OiBcIlwiO1xuICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgd2lkdGg6IDJweDtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXByaW1hcnkpO1xuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgbGVmdDogLTFweDtcbiAgICAgIHotaW5kZXg6IDQ7XG4gICAgfVxuICB9XG59XG5cbi5kcmFnLWNvbnRhaW5lciB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgbGVmdDogMTAlOyAvLyBJbXBvcnRhbnQ6IEluaXRpYWwgcG9zaXRpb24gb2YgY29tcGFyZSBkcmFnIGhhbmRsZVxuICB3aWR0aDogMTAwJTtcbiAgcG9pbnRlci1ldmVudHM6IGFsbDtcbiAgLy9wb3NpdGlvbjogcmVsYXRpdmU7XG4gIHotaW5kZXg6IDE7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGhlaWdodDogMTAwJTtcbn1cblxuI2hhbmRsZS1saW1pdHMge1xuICAtLXdpZHRoOiA1MDBweDtcbiAgLS1oZWlnaHQ6IDUwMHB4O1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGxlZnQ6IGNhbGMoLTEgLyAyICogdmFyKC0td2lkdGgpKTtcbiAgdG9wOiBjYWxjKDUwJSAtIDEgLyAyICogdmFyKC0taGVpZ2h0KSk7XG4gIHdpZHRoOiB2YXIoLS13aWR0aCk7XG4gIGhlaWdodDogdmFyKC0taGVpZ2h0KTtcbiAgLy9iYWNrZ3JvdW5kOiMwMDAwMDBhYTtcbiAgei1pbmRleDogNTtcbiAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG5cbiAgJi5hY3RpdmUge1xuICAgIHBvaW50ZXItZXZlbnRzOiBhbGw7XG4gICAgY3Vyc29yOiBldy1yZXNpemU7XG4gIH1cbn1cblxuLmRyYWctaGFuZGxlIHtcbiAgLS13aWR0aDogNHB4O1xuICAtLWhlaWdodDogMzBweDtcblxuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGxlZnQ6IGNhbGMoNTAlIC0gMSAvIDIgKiB2YXIoLS13aWR0aCkgLSA0cHgpO1xuICB0b3A6IGNhbGMoNTAlIC0gMSAvIDIgKiB2YXIoLS1oZWlnaHQpIC0gNHB4KTtcblxuICBib3JkZXItcmFkaXVzOiB2YXIoLS1oZWlnaHQpO1xuICB3aWR0aDogdmFyKC0td2lkdGgpO1xuICBoZWlnaHQ6IHZhcigtLWhlaWdodCk7XG4gIGJvcmRlcjogNHB4IHNvbGlkIHZhcigtLXByaW1hcnkpO1xuICBjdXJzb3I6IGV3LXJlc2l6ZTtcbiAgY29sb3I6IHZhcigtLW9uLXN1cmZhY2UpO1xuICBwb2ludGVyLWV2ZW50czogYWxsO1xuICBmaWx0ZXI6IGRyb3Atc2hhZG93KC0ycHggMHB4IDBweCB2YXIoLS1wcmltYXJ5LWNvbnRhaW5lcikpIGRyb3Atc2hhZG93KDJweCAwcHggMHB4IHZhcigtLWVycm9yLWNvbnRhaW5lcikpO1xuICBiYWNrZ3JvdW5kOiB2YXIoLS1zdXJmYWNlKTtcblxufVxuXG5cbiNjeXRvc2NhcGUtY29tcGFyZSB7XG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgLy9ib3JkZXItbGVmdDogNHB4IHNvbGlkIHZhcigtLWVycm9yKTtcbiAgaGVpZ2h0OiAxMDAlO1xuICB3aWR0aDogMTAwJTtcbiAgaW5zZXQ6IDAgMCAwIDA7XG4gIGJhY2tncm91bmQtY29sb3I6IGNvbG9yLW1peChpbiBzcmdiLCB2YXIoLS1lcnJvcikgNSUsIGNvbG9yLW1peChpbiBzcmdiLCB2YXIoLS1zdXJmYWNlKSA1MCUsIHRyYW5zcGFyZW50KSk7XG5cbiAgJjpiZWZvcmUge1xuICAgIGNvbnRlbnQ6IFwiXCI7XG4gICAgaGVpZ2h0OiAxMDAlO1xuICAgIHdpZHRoOiA0cHg7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tcHJpbWFyeSk7XG4gICAgZmlsdGVyOiBkcm9wLXNoYWRvdygtMnB4IDBweCAwcHggdmFyKC0tcHJpbWFyeS1jb250YWluZXIpKSBkcm9wLXNoYWRvdygycHggMHB4IDBweCB2YXIoLS1lcnJvci1jb250YWluZXIpKTtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgbGVmdDogLTJweDtcbiAgICB6LWluZGV4OiA0O1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9 */"]
  });
};
DiagramComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_23__.__decorate)([(0,_ngneat_until_destroy__WEBPACK_IMPORTED_MODULE_24__.UntilDestroy)({
  checkProperties: true
})], DiagramComponent);

/***/ }),

/***/ 3081:
/*!**************************************************************!*\
  !*** ./src/app/event-hierarchy/event-hierarchy.component.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EventHierarchyComponent: () => (/* binding */ EventHierarchyComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! tslib */ 2321);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ 3738);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs */ 4520);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs */ 1891);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! rxjs */ 9016);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! rxjs */ 1527);
/* harmony import */ var _angular_cdk_tree__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/cdk/tree */ 6747);
/* harmony import */ var _angular_material_tree__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/tree */ 7321);
/* harmony import */ var _ngneat_until_destroy__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ngneat/until-destroy */ 2813);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/router */ 7947);
/* harmony import */ var _services_event_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/event.service */ 1457);
/* harmony import */ var _services_species_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/species.service */ 4828);
/* harmony import */ var _services_diagram_state_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/diagram-state.service */ 6742);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/common */ 6575);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/button */ 895);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/icon */ 6515);
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/material/tooltip */ 702);

















const _c0 = ["treeControlButton"];
const _c1 = ["eventIcon"];
const _c2 = function (a1) {
  return ["/PathwayBrowser", a1];
};
function EventHierarchyComponent_div_1_ng_container_5_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "a", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function EventHierarchyComponent_div_1_ng_container_5_ng_container_1_Template_a_click_1_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r10);
      const breadcrumb_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]().$implicit;
      const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r8.onBreadcrumbSelect(breadcrumb_r4));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](2, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const breadcrumb_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]().$implicit;
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction1"](2, _c2, ctx_r6.diagramId));
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](breadcrumb_r4.displayName);
  }
}
function EventHierarchyComponent_div_1_ng_container_5_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "span", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const breadcrumb_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", breadcrumb_r4.displayName, "");
  }
}
function EventHierarchyComponent_div_1_ng_container_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](1, EventHierarchyComponent_div_1_ng_container_5_ng_container_1_Template, 4, 4, "ng-container", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](2, EventHierarchyComponent_div_1_ng_container_5_ng_container_2_Template, 3, 1, "ng-container", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const last_r5 = ctx.last;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", !last_r5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", last_r5);
  }
}
function EventHierarchyComponent_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerStart"](1, 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](2, "mat-icon", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](3, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "nav", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](5, EventHierarchyComponent_div_1_ng_container_5_Template, 3, 2, "ng-container", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](6, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx_r0.breadcrumbs);
  }
}
function EventHierarchyComponent_mat_tree_node_4_div_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r20 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("mouseover", function EventHierarchyComponent_mat_tree_node_4_div_9_Template_div_mouseover_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r20);
      const node_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]().$implicit;
      const ctx_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r18.onTagHover(node_r13));
    })("mouseleave", function EventHierarchyComponent_mat_tree_node_4_div_9_Template_div_mouseleave_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r20);
      const node_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]().$implicit;
      const ctx_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r21.onTagHoverLeave(node_r13));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "span", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2, "U");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "span", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](4, "PDATED");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
  }
}
function EventHierarchyComponent_mat_tree_node_4_div_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r25 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("mouseover", function EventHierarchyComponent_mat_tree_node_4_div_10_Template_div_mouseover_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r25);
      const node_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]().$implicit;
      const ctx_r23 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r23.onTagHover(node_r13));
    })("mouseleave", function EventHierarchyComponent_mat_tree_node_4_div_10_Template_div_mouseleave_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r25);
      const node_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]().$implicit;
      const ctx_r26 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r26.onTagHoverLeave(node_r13));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "span", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2, "N");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "span", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](4, "EW");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
  }
}
function EventHierarchyComponent_mat_tree_node_4_div_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r30 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("mouseover", function EventHierarchyComponent_mat_tree_node_4_div_11_Template_div_mouseover_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r30);
      const node_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]().$implicit;
      const ctx_r28 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r28.onTagHover(node_r13));
    })("mouseleave", function EventHierarchyComponent_mat_tree_node_4_div_11_Template_div_mouseleave_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r30);
      const node_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]().$implicit;
      const ctx_r31 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r31.onTagHoverLeave(node_r13));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "span", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2, "D");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "span", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](4, "ISEASE");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const node_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵclassProp"]("disease", node_r13.isInDisease);
  }
}
function EventHierarchyComponent_mat_tree_node_4_div_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r36 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("mouseover", function EventHierarchyComponent_mat_tree_node_4_div_12_Template_div_mouseover_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r36);
      const node_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]().$implicit;
      const ctx_r34 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r34.onTagHover(node_r13));
    })("mouseleave", function EventHierarchyComponent_mat_tree_node_4_div_12_Template_div_mouseleave_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r36);
      const node_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]().$implicit;
      const ctx_r37 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r37.onTagHoverLeave(node_r13));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "span", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2, "I");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "span", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](4, "NFERRED");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
  }
}
const _c3 = function (a0) {
  return {
    "has-sibling": a0
  };
};
const _c4 = function (a0, a1) {
  return {
    "highlight": a0,
    "hovered": a1
  };
};
function EventHierarchyComponent_mat_tree_node_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r40 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "mat-tree-node", 16)(1, "div", 17)(2, "button", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function EventHierarchyComponent_mat_tree_node_4_Template_button_click_2_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r40);
      const node_r13 = restoredCtx.$implicit;
      const ctx_r39 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r39.onTreeEventSelect(node_r13));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](3, "mat-icon", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "div", 20)(5, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("mouseover", function EventHierarchyComponent_mat_tree_node_4_Template_div_mouseover_5_listener($event) {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r40);
      const node_r13 = restoredCtx.$implicit;
      const ctx_r41 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r41.onNameHover($event, node_r13));
    })("mouseleave", function EventHierarchyComponent_mat_tree_node_4_Template_div_mouseleave_5_listener($event) {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r40);
      const node_r13 = restoredCtx.$implicit;
      const ctx_r42 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r42.onNameHoverLeave($event, node_r13));
    })("wheel", function EventHierarchyComponent_mat_tree_node_4_Template_div_wheel_5_listener($event) {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r40);
      const node_r13 = restoredCtx.$implicit;
      const ctx_r43 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r43.onScroll($event, node_r13));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](7, "div", 22)(8, "div", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](9, EventHierarchyComponent_mat_tree_node_4_div_9_Template, 5, 0, "div", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](10, EventHierarchyComponent_mat_tree_node_4_div_10_Template, 5, 0, "div", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](11, EventHierarchyComponent_mat_tree_node_4_div_11_Template, 5, 2, "div", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](12, EventHierarchyComponent_mat_tree_node_4_div_12_Template, 5, 0, "div", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const node_r13 = ctx.$implicit;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction1"](9, _c3, ctx_r1.hasRootSiblingForLeafNode(node_r13)));
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction2"](11, _c4, node_r13.isSelected, node_r13.isHovered));
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("matTooltip", node_r13.schemaClass === "Reaction" ? "Reaction" : "Black Box Event")("svgIcon", node_r13.schemaClass === "Reaction" ? "reaction" : "transition");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", node_r13.displayName, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", node_r13.releaseStatus === "UPDATED");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", node_r13.releaseStatus === "NEW");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", node_r13.isInDisease);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", node_r13.isInferred);
  }
}
function EventHierarchyComponent_mat_nested_tree_node_5_div_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r54 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("mouseover", function EventHierarchyComponent_mat_nested_tree_node_5_div_14_Template_div_mouseover_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r54);
      const node_r44 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]().$implicit;
      const ctx_r52 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r52.onTagHover(node_r44));
    })("mouseleave", function EventHierarchyComponent_mat_nested_tree_node_5_div_14_Template_div_mouseleave_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r54);
      const node_r44 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]().$implicit;
      const ctx_r55 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r55.onTagHoverLeave(node_r44));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "span", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2, "U");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "span", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](4, "PDATED");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
  }
}
function EventHierarchyComponent_mat_nested_tree_node_5_div_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r59 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("mouseover", function EventHierarchyComponent_mat_nested_tree_node_5_div_15_Template_div_mouseover_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r59);
      const node_r44 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]().$implicit;
      const ctx_r57 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r57.onTagHover(node_r44));
    })("mouseleave", function EventHierarchyComponent_mat_nested_tree_node_5_div_15_Template_div_mouseleave_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r59);
      const node_r44 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]().$implicit;
      const ctx_r60 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r60.onTagHoverLeave(node_r44));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "span", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2, "N");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "span", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](4, "EW");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
  }
}
function EventHierarchyComponent_mat_nested_tree_node_5_div_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r64 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("mouseover", function EventHierarchyComponent_mat_nested_tree_node_5_div_16_Template_div_mouseover_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r64);
      const node_r44 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]().$implicit;
      const ctx_r62 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r62.onTagHover(node_r44));
    })("mouseleave", function EventHierarchyComponent_mat_nested_tree_node_5_div_16_Template_div_mouseleave_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r64);
      const node_r44 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]().$implicit;
      const ctx_r65 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r65.onTagHoverLeave(node_r44));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "span", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2, "D");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "span", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](4, "ISEASE");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const node_r44 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵclassProp"]("disease", node_r44.isInDisease);
  }
}
function EventHierarchyComponent_mat_nested_tree_node_5_div_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r70 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("mouseover", function EventHierarchyComponent_mat_nested_tree_node_5_div_17_Template_div_mouseover_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r70);
      const node_r44 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]().$implicit;
      const ctx_r68 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r68.onTagHover(node_r44));
    })("mouseleave", function EventHierarchyComponent_mat_nested_tree_node_5_div_17_Template_div_mouseleave_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r70);
      const node_r44 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]().$implicit;
      const ctx_r71 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r71.onTagHoverLeave(node_r44));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "span", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2, "I");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "span", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](4, "NFERRED");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
  }
}
function EventHierarchyComponent_mat_nested_tree_node_5_div_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r75 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("mouseover", function EventHierarchyComponent_mat_nested_tree_node_5_div_18_Template_div_mouseover_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r75);
      const node_r44 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]().$implicit;
      const ctx_r73 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r73.onTagHover(node_r44));
    })("mouseleave", function EventHierarchyComponent_mat_nested_tree_node_5_div_18_Template_div_mouseleave_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r75);
      const node_r44 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]().$implicit;
      const ctx_r76 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r76.onTagHoverLeave(node_r44));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const node_r44 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵstyleProp"]("background", node_r44.color);
  }
}
function EventHierarchyComponent_mat_nested_tree_node_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r80 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "mat-nested-tree-node")(1, "div", 29)(2, "div", 17)(3, "button", 30, 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function EventHierarchyComponent_mat_nested_tree_node_5_Template_button_click_3_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r80);
      const node_r44 = restoredCtx.$implicit;
      const ctx_r79 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r79.onTreeEventSelect(node_r44));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](5, "mat-icon", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](6, "button", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function EventHierarchyComponent_mat_nested_tree_node_5_Template_button_click_6_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r80);
      const node_r44 = restoredCtx.$implicit;
      const ctx_r81 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r81.onTreeEventSelect(node_r44));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](7, "mat-icon", 19, 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](9, "div", 20)(10, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("mouseover", function EventHierarchyComponent_mat_nested_tree_node_5_Template_div_mouseover_10_listener($event) {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r80);
      const node_r44 = restoredCtx.$implicit;
      const ctx_r82 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r82.onNameHover($event, node_r44));
    })("mouseleave", function EventHierarchyComponent_mat_nested_tree_node_5_Template_div_mouseleave_10_listener($event) {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r80);
      const node_r44 = restoredCtx.$implicit;
      const ctx_r83 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r83.onNameHoverLeave($event, node_r44));
    })("wheel", function EventHierarchyComponent_mat_nested_tree_node_5_Template_div_wheel_10_listener($event) {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r80);
      const node_r44 = restoredCtx.$implicit;
      const ctx_r84 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r84.onScroll($event, node_r44));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](12, "div", 22)(13, "div", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](14, EventHierarchyComponent_mat_nested_tree_node_5_div_14_Template, 5, 0, "div", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](15, EventHierarchyComponent_mat_nested_tree_node_5_div_15_Template, 5, 0, "div", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](16, EventHierarchyComponent_mat_nested_tree_node_5_div_16_Template, 5, 2, "div", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](17, EventHierarchyComponent_mat_nested_tree_node_5_div_17_Template, 5, 0, "div", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](18, EventHierarchyComponent_mat_nested_tree_node_5_div_18_Template, 1, 2, "div", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](19, "ul")(20, "div", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainer"](21, 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const node_r44 = ctx.$implicit;
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵattribute"]("aria-label", "Toggle " + node_r44.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("svgIcon", ctx_r2.treeControl.isExpanded(node_r44) ? "arrow-down" : "arrow-right");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction2"](13, _c4, node_r44.isSelected, node_r44.isHovered));
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("matTooltip", node_r44.hasEHLD ? "Pathway with an enhanced diagram " : "Pathway")("svgIcon", node_r44.hasEHLD ? "pathway-ehld" : "pathway");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", node_r44.displayName, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", node_r44.releaseStatus === "UPDATED");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", node_r44.releaseStatus === "NEW");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", node_r44.isInDisease);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", node_r44.isInferred);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", !node_r44.hasDiagram && node_r44.parent.stId === ctx_r2.diagramId);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵclassProp"]("example-tree-invisible", !ctx_r2.treeControl.isExpanded(node_r44));
  }
}
let EventHierarchyComponent = class EventHierarchyComponent {
  constructor(eventService, speciesService, state, el, router) {
    this.eventService = eventService;
    this.speciesService = speciesService;
    this.state = state;
    this.el = el;
    this.router = router;
    this.diagramId = '';
    this._SCROLL_SPEED = 50; // pixels per second
    this._ICON_PADDING = 16;
    this._GRADIENT_WIDTH = 10;
    this._ignore = false; // ignore the changes from the tree
    this._isInitialLoad = true; // skip the first load
    this.treeControl = new _angular_cdk_tree__WEBPACK_IMPORTED_MODULE_4__.NestedTreeControl(event => event.hasEvent, {
      trackBy: event => event.stId
    });
    this.treeDataSource = new _angular_material_tree__WEBPACK_IMPORTED_MODULE_5__.MatTreeNestedDataSource();
    this.breadcrumbs = [];
    this.selectedIdFromUrl = '';
    this.subpathwayColors = new Map();
    this.ancestors = [];
    this.selecting = this.state.onChange.select$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_6__.tap)(value => this.selectedIdFromUrl = value), (0,rxjs__WEBPACK_IMPORTED_MODULE_7__.filter)(value => !this._ignore && !this._isInitialLoad && !this.speciesService.getIgnore()),
    // Ignore the changes from Tree itself , first load and species changes
    (0,rxjs__WEBPACK_IMPORTED_MODULE_8__.switchMap)(id => {
      const idToUse = id ? id : this.diagramId;
      return this.eventService.fetchEnhancedEventData(idToUse);
    }), (0,rxjs__WEBPACK_IMPORTED_MODULE_8__.switchMap)(enhancedEvent => {
      return this.eventService.adjustTreeFromDiagramSelection(enhancedEvent, this.diagramId, this.subpathwayColors, this.treeControl, this.treeDataSource.data);
    }), (0,_ngneat_until_destroy__WEBPACK_IMPORTED_MODULE_9__.untilDestroyed)(this)).subscribe();
  }
  ngAfterViewInit() {
    setTimeout(() => {
      this._isInitialLoad = false; // Allow future changes to be processed after first load
    }, 100);
    this.speciesService.currentSpecies$.pipe((0,_ngneat_until_destroy__WEBPACK_IMPORTED_MODULE_9__.untilDestroyed)(this)).subscribe(species => {
      const taxId = species ? species.taxId : '9606';
      this.getTopLevelPathways(taxId);
    });
    this.eventService.treeData$.pipe((0,_ngneat_until_destroy__WEBPACK_IMPORTED_MODULE_9__.untilDestroyed)(this)).subscribe(events => {
      // @ts-ignore
      // Mat tree has a bug causing children to not be rendered in the UI without first setting the data to null
      // This is a workaround to add child data to tree and update the view. see details: https://github.com/angular/components/issues/11381
      this.treeDataSource.data = null; //todo: check performance issue
      this.treeDataSource.data = events;
      this.adjustWidths();
    });
    this.eventService.selectedTreeEvent$.pipe((0,_ngneat_until_destroy__WEBPACK_IMPORTED_MODULE_9__.untilDestroyed)(this)).subscribe(event => {
      this.selectedTreeEvent = event;
    });
    this.eventService.selectedObj$.pipe((0,_ngneat_until_destroy__WEBPACK_IMPORTED_MODULE_9__.untilDestroyed)(this)).subscribe(event => {
      this.selectedObj = event;
    });
    this.eventService.breadcrumbs$.pipe((0,_ngneat_until_destroy__WEBPACK_IMPORTED_MODULE_9__.untilDestroyed)(this)).subscribe(events => {
      this.breadcrumbs = events;
    });
    this.split.dragProgress$.pipe((0,_ngneat_until_destroy__WEBPACK_IMPORTED_MODULE_9__.untilDestroyed)(this)).subscribe(data => {
      this.adjustWidths();
    });
    (0,rxjs__WEBPACK_IMPORTED_MODULE_10__.fromEvent)(window, 'resize').pipe((0,_ngneat_until_destroy__WEBPACK_IMPORTED_MODULE_9__.untilDestroyed)(this)).subscribe(() => {
      this.adjustWidths();
    });
    this.eventService.subpathwaysColors$.pipe((0,_ngneat_until_destroy__WEBPACK_IMPORTED_MODULE_9__.untilDestroyed)(this)).subscribe(colors => {
      this.subpathwayColors = colors;
    });
    this.eventService.loadTreeEvent$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_8__.switchMap)(treeEvent => {
      this.collapseSiblingEvent(treeEvent);
      return this.eventService.fetchChildrenEvents(treeEvent, this.treeDataSource.data);
    }), (0,_ngneat_until_destroy__WEBPACK_IMPORTED_MODULE_9__.untilDestroyed)(this)).subscribe(([event, enhancedResult, colors]) => {
      this.eventService.setCurrentEventAndObj(event, enhancedResult);
      this.eventService.setSubpathwayColors(event, colors);
    });
  }
  getTopLevelPathways(taxId) {
    this.eventService.fetchTlpBySpecies(taxId).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_6__.tap)(results => this.eventService.setTreeData(results)), (0,rxjs__WEBPACK_IMPORTED_MODULE_8__.switchMap)(() => {
      const idToUse = this.selectedIdFromUrl ? this.selectedIdFromUrl : this.diagramId;
      return this.eventService.fetchEnhancedEventData(idToUse);
    }), (0,rxjs__WEBPACK_IMPORTED_MODULE_8__.switchMap)(event => this.eventService.buildTree(event, this.diagramId, this.treeControl, this.subpathwayColors))).subscribe();
  }
  // if a leaf node has sibling which is a root node
  hasRootSiblingForLeafNode(event) {
    if (!event.ancestors || event.ancestors.length === 0) {
      return false;
    }
    const parent = event.parent;
    return !!parent.hasEvent && parent.hasEvent.some(sibling => sibling !== event && this.eventService.eventHasChild(sibling));
  }
  loadChildrenTreeEvents(treeEvent) {
    this.eventService.loadTreeEvent(treeEvent);
  }
  ngOnDestroy() {
    clearTimeout(this.scrollTimeout);
  }
  onTreeEventSelect(treeEvent) {
    const isTLP = treeEvent.schemaClass === 'TopLevelPathway';
    const hasChild = this.eventService.eventHasChild(treeEvent);
    // Toggle isSelected property if it has children for pathway
    //event.isSelected = hasChild && !isTLP ? !event.isSelected : true;
    const isSelected = !treeEvent.isSelected;
    this.handleTreeEventSelection(treeEvent, isSelected);
  }
  handleTreeEventSelection(event, isSelected) {
    if (isSelected) {
      this.handleSelectionFromTree(event);
    } else {
      this.handleDeselectionFromTree(event);
    }
  }
  onBreadcrumbSelect(navEvent) {
    this.clearAllSelectedEvents(this.treeDataSource.data);
    this.selectAllParents(navEvent, this.treeDataSource.data);
    navEvent.isSelected = true;
    // Collapse all descendant nodes except the selected path if it has child events
    this.treeControl.collapseDescendants(navEvent);
    // Expand the path to the selected event
    this.treeControl.expand(navEvent);
    this.updateBreadcrumbs(navEvent);
    this.setDiagramId(navEvent);
    const selectedEventId = this.eventService.eventHasChild(navEvent) && navEvent.hasDiagram ? '' : navEvent.stId;
    this._ignore = true;
    this.state.set('select', selectedEventId);
    this._ignore = false;
    const ancestors = navEvent.ancestors ? navEvent.ancestors : [];
    this.eventService.setPath(this.diagramId, ancestors);
    this.eventService.fetchEnhancedEventData(navEvent.stId).pipe((0,_ngneat_until_destroy__WEBPACK_IMPORTED_MODULE_9__.untilDestroyed)(this)).subscribe(result => {
      this.eventService.setCurrentEventAndObj(navEvent, result);
    });
  }
  handleSelectionFromTree(event) {
    // First click
    this.clearAllSelectedEvents(this.treeDataSource.data);
    this.selectAllParents(event, this.treeDataSource.data);
    this.toggleEventExpansion(event, true);
    this.updateBreadcrumbs(event);
    this.setDiagramId(event);
    this.navigateToPathway(event);
  }
  handleDeselectionFromTree(event) {
    // Second click (deselect)
    // Disable unselected status for TLP for having a selected obj in details panel
    if (event.schemaClass === 'TopLevelPathway') return;
    this.selectAllParents(event, this.treeDataSource.data);
    this.toggleEventExpansion(event, false);
    this.updateBreadcrumbsForEventDeselection(event);
    this.handlePathwayNavigationOnDeselection(event);
  }
  toggleEventExpansion(event, isSelected) {
    // Collapse all events when selecting any tlps
    if (event.schemaClass === 'TopLevelPathway') {
      this.treeControl.collapseAll();
    }
    if (isSelected) {
      event.isSelected = true;
      this.loadChildrenTreeEvents(event);
      this.treeControl.toggle(event);
    } else {
      event.isSelected = false;
      this.treeControl.toggle(event);
      this.treeControl.collapseDescendants(event);
      this.eventService.fetchEnhancedEventData(event.parent.stId).pipe((0,_ngneat_until_destroy__WEBPACK_IMPORTED_MODULE_9__.untilDestroyed)(this)).subscribe(result => {
        this.eventService.setCurrentObj(result);
      });
    }
    this.collapseSiblingEvent(event);
  }
  collapseSiblingEvent(event) {
    if (event.ancestors) {
      // Get 1st parent
      let eventParent = event.parent;
      // Loop through the parent's children to collapse any expanded siblings
      eventParent.hasEvent?.forEach(childEvent => {
        if (childEvent !== event && this.treeControl.isExpanded(childEvent)) {
          this.treeControl.collapse(childEvent);
          this.treeControl.collapseDescendants(childEvent);
          childEvent.isSelected = false;
        }
      });
    }
  }
  selectAllParents(selectedEvent, events) {
    events.forEach(event => {
      event.isSelected = selectedEvent.ancestors?.some(parent => parent.stId === event.stId) || false;
      if (event.hasEvent) {
        this.selectAllParents(selectedEvent, event.hasEvent);
      }
    });
  }
  clearAllSelectedEvents(events) {
    events.forEach(event => {
      event.isSelected = false;
      if (event.hasEvent) {
        this.clearAllSelectedEvents(event.hasEvent);
      }
    });
  }
  updateBreadcrumbs(event) {
    if (event.schemaClass === 'TopLevelPathway') {
      // If the event is a 'TopLevelPathway', set breadcrumbs to an empty array
      this.eventService.setBreadcrumbs([event]);
    } else if (event.ancestors) {
      // Set breadcrumbs including the event and its parents
      this.eventService.setBreadcrumbs([...event.ancestors, event]);
    }
  }
  updateBreadcrumbsForEventDeselection(event) {
    if (event.schemaClass === "TopLevelPathway") {
      this.eventService.setBreadcrumbs([]);
    } else if (event.ancestors?.length) {
      // Update breadcrumb based on the last parent in the parents
      this.updateBreadcrumbs(event.ancestors[event.ancestors.length - 1]);
    }
  }
  handlePathwayNavigationOnDeselection(event) {
    // pathway and subpathway
    if (this.eventService.eventHasChild(event)) {
      if (event.schemaClass !== 'TopLevelPathway') {
        const eventParent = event.parent;
        const parentWithDiagram = this.getPathwayWithDiagram(event);
        this.diagramId = parentWithDiagram.stId;
        this.navigateToPathway(eventParent);
      } else {
        this.diagramId = event.stId;
        this.navigateToPathway(event);
      }
    }
  }
  setDiagramId(event) {
    // Pathway
    if (this.eventService.eventHasChild(event) && event.hasDiagram) {
      this.diagramId = event.stId;
    } else {
      // Subpathway and reaction
      const parentWithDiagram = this.getPathwayWithDiagram(event);
      this.diagramId = parentWithDiagram.stId;
    }
  }
  getPathwayWithDiagram(event) {
    const parents = [...event.ancestors].reverse();
    return parents.find(p => p.hasDiagram);
  }
  navigateToPathway(treeEvent) {
    const ancestors = treeEvent.ancestors ? treeEvent.ancestors : [];
    this.eventService.setPath(this.diagramId, ancestors);
    // Determine if we should include the selectedEventId in the URL
    const selectedEventId = this.eventService.eventHasChild(treeEvent) && treeEvent.hasDiagram ? '' : treeEvent.stId;
    this._ignore = true;
    this.router.navigate(['PathwayBrowser', this.diagramId], {
      queryParamsHandling: "preserve" // Keep existing query params
    }).then(() => {
      this.state.set('select', selectedEventId);
      this.eventService.setCurrentTreeEvent(treeEvent);
      // Listen for NavigationEnd event to reset _ignore
      this.router.events.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_7__.filter)(routerEvent => routerEvent instanceof _angular_router__WEBPACK_IMPORTED_MODULE_11__.NavigationEnd), (0,rxjs__WEBPACK_IMPORTED_MODULE_12__.take)(1) // Take the first NavigationEnd event and unsubscribe automatically
      ).subscribe(() => {
        this._ignore = false;
      });
    }).catch(err => {
      throw new Error('Navigation error:', err);
    });
  }
  trackById(index, event) {
    return event.stId;
  }
  /**
   * Adjust widths when loading mat tree data at the initialization.
   */
  adjustWidths() {
    const treeNodes = this.el.nativeElement.querySelectorAll('.mat-tree-node');
    treeNodes.forEach(node => {
      this.adjustWidth(node);
    });
  }
  adjustWidth(node) {
    const left = node.querySelector('.left');
    const hasEvents = left.children.length > 1;
    this.calculateAndSetWidth(node, hasEvents);
  }
  getLeftDivElWidth(node, event) {
    const hasEvents = this.eventService.eventHasChild(event);
    return this.calculateAndSetWidth(node, hasEvents);
  }
  calculateAndSetWidth(node, hasEvents) {
    const left = node.querySelector('.left');
    const right = node.querySelector('.right');
    const parentWidth = node.clientWidth; // inner width of mat tree node in pixels
    const rightWidth = hasEvents ? right.offsetWidth : right.offsetWidth + this._GRADIENT_WIDTH; // 10 is the width of the gradient
    left.style.width = `calc(${parentWidth}px - ${rightWidth}px)`;
    return parentWidth - rightWidth;
  }
  onTagHover(event) {
    if (event.isSelected || this.treeControl.isExpanded(event) && event.hasEvent) return;
    event.isHovered = true;
  }
  onTagHoverLeave(event) {
    event.isHovered = false;
  }
  onNameHover($event, event) {
    const targetParentNode = $event.target.closest('.mat-tree-node');
    const leftDivWidth = this.getLeftDivElWidth(targetParentNode, event);
    const nameElement = $event.target;
    const contentWidth = this.calculateContentWidth(nameElement, event);
    // Allow animation if this element has been scrolling before
    nameElement.classList.remove('no-transition');
    // Check if there is space between the left and content span
    if (contentWidth > leftDivWidth) {
      let distanceToScroll = contentWidth - leftDivWidth;
      this.setScrollStyles(nameElement, distanceToScroll);
    }
  }
  calculateContentWidth(targetElement, event) {
    const iconWidth = this.eventIcon.nativeElement.getBoundingClientRect().width + this._ICON_PADDING; // width and padding
    const treeControlButtonWidth = this.treeControlButton.nativeElement.getBoundingClientRect().width;
    const baseWidth = targetElement.offsetWidth + iconWidth;
    return this.eventService.eventHasChild(event) ? baseWidth + treeControlButtonWidth : baseWidth;
  }
  setScrollStyles(targetElement, distanceToScroll) {
    // Calculate the transition duration based on the distance and the constant speed
    const duration = distanceToScroll / this._SCROLL_SPEED;
    targetElement.style.transition = `left ${duration}s linear`;
    // Set the distance to scroll
    targetElement.style.left = `-${distanceToScroll}px`;
  }
  onNameHoverLeave($event, event) {
    const nameElement = $event.target;
    nameElement.style.left = '0'; // Reset position
  }

  onScroll($event, node) {
    const nameElement = $event.target;
    this.onScrollStart(nameElement);
    clearTimeout(this.scrollTimeout);
    this.scrollTimeout = setTimeout(() => {
      this.onScrollStop(nameElement);
    }, 500); // Debounce time
  }
  /**
   * Not working with mat tree node
   */
  // private initializeScrollEvent(): void {
  //   this.scrollSubscription = fromEvent(this.displayNameDiv.nativeElement, 'scroll').pipe(
  //     tap(() => this.onScrollStart(this.displayNameDiv.nativeElement)),
  //     debounceTime(200)
  //   ).subscribe(() => {
  //     this.onScrollStop(this.displayNameDiv.nativeElement)
  //   });
  // }
  onScrollStart(el) {
    // Need to make it scrollable to enable the scrolling
    const labelSpan = el.closest('.mdc-button__label');
    labelSpan.classList.add('add-overflowX');
    el.classList.add('no-transition');
  }
  onScrollStop(el) {
    const labelSpan = el.closest('.mdc-button__label');
    labelSpan.classList.remove('add-overflowX');
    el.classList.remove('no-transition');
  }
  static #_ = this.ɵfac = function EventHierarchyComponent_Factory(t) {
    return new (t || EventHierarchyComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_services_event_service__WEBPACK_IMPORTED_MODULE_0__.EventService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_services_species_service__WEBPACK_IMPORTED_MODULE_1__.SpeciesService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_services_diagram_state_service__WEBPACK_IMPORTED_MODULE_2__.DiagramStateService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_3__.ElementRef), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_11__.Router));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
    type: EventHierarchyComponent,
    selectors: [["cr-event-hierarchy"]],
    viewQuery: function EventHierarchyComponent_Query(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵviewQuery"](_c0, 5, _angular_core__WEBPACK_IMPORTED_MODULE_3__.ElementRef);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵviewQuery"](_c1, 5, _angular_core__WEBPACK_IMPORTED_MODULE_3__.ElementRef);
      }
      if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵloadQuery"]()) && (ctx.treeControlButton = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵloadQuery"]()) && (ctx.eventIcon = _t.first);
      }
    },
    inputs: {
      diagramId: ["id", "diagramId"],
      split: ["eventSplit", "split"]
    },
    decls: 6,
    vars: 5,
    consts: [["id", "hierarchy-container"], ["id", "breadcrumb-container", 4, "ngIf"], ["id", "events-container"], [1, "example-tree", 3, "dataSource", "treeControl", "trackBy"], ["class", "leaf-node", 3, "ngClass", 4, "matTreeNodeDef"], [4, "matTreeNodeDef", "matTreeNodeDefWhen"], ["id", "breadcrumb-container"], [1, "icon-container"], ["svgIcon", "home", 1, "home-icon"], [1, "gradient-holder-left"], [1, "breadcrumb"], [4, "ngFor", "ngForOf"], [1, "gradient-holder-right"], [4, "ngIf"], ["queryParamsHandling", "preserve", 1, "breadcrumb-item", 3, "routerLink", "click"], [1, "breadcrumb-item"], [1, "leaf-node", 3, "ngClass"], [1, "left"], ["mat-button", "", 1, "button", 3, "ngClass", "click"], [1, "custom-icon", 3, "matTooltip", "svgIcon"], [1, "name-container"], [1, "font", "name", 3, "mouseover", "mouseleave", "wheel"], [1, "right"], [1, "tag-container"], ["class", "tag", 3, "mouseover", "mouseleave", 4, "ngIf"], ["class", "tag", 3, "disease", "mouseover", "mouseleave", 4, "ngIf"], [1, "tag", 3, "mouseover", "mouseleave"], [1, "initial"], [1, "body"], [1, "mat-tree-node"], ["mat-icon-button", "", 1, "button-size", "no-hover-effect", 3, "click"], ["treeControlButton", ""], [1, "mat-icon-rtl-mirror", 3, "svgIcon"], ["eventIcon", ""], ["class", "subpathway", 3, "background", "mouseover", "mouseleave", 4, "ngIf"], ["role", "group", 1, "group"], ["matTreeNodeOutlet", ""], [1, "subpathway", 3, "mouseover", "mouseleave"]],
    template: function EventHierarchyComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](1, EventHierarchyComponent_div_1_Template, 7, 1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](2, "div", 2)(3, "mat-tree", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](4, EventHierarchyComponent_mat_tree_node_4_Template, 13, 14, "mat-tree-node", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](5, EventHierarchyComponent_mat_nested_tree_node_5_Template, 22, 16, "mat-nested-tree-node", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.breadcrumbs.length > 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("dataSource", ctx.treeDataSource)("treeControl", ctx.treeControl)("trackBy", ctx.trackById);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("matTreeNodeDefWhen", ctx.eventService.hasChild);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_13__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_13__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_13__.NgIf, _angular_router__WEBPACK_IMPORTED_MODULE_11__.RouterLink, _angular_material_button__WEBPACK_IMPORTED_MODULE_14__.MatButton, _angular_material_button__WEBPACK_IMPORTED_MODULE_14__.MatIconButton, _angular_material_icon__WEBPACK_IMPORTED_MODULE_15__.MatIcon, _angular_material_tree__WEBPACK_IMPORTED_MODULE_5__.MatNestedTreeNode, _angular_material_tree__WEBPACK_IMPORTED_MODULE_5__.MatTreeNodeDef, _angular_material_tree__WEBPACK_IMPORTED_MODULE_5__.MatTree, _angular_material_tree__WEBPACK_IMPORTED_MODULE_5__.MatTreeNode, _angular_material_tree__WEBPACK_IMPORTED_MODULE_5__.MatTreeNodeOutlet, _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_16__.MatTooltip],
    styles: ["#hierarchy-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n}\n\n#breadcrumb-container[_ngcontent-%COMP%] {\n  background: var(--on-primary);\n  height: 34px;\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  padding: 5px 10px 5px 0;\n  \n\n  position: sticky;\n  top: 0;\n  z-index: 999;\n  overflow-y: hidden;\n  white-space: nowrap;\n}\n#breadcrumb-container[_ngcontent-%COMP%]   .breadcrumb[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  padding: 2px 0 2px 7px;\n  width: 100%;\n  height: 24px;\n  overflow-x: scroll;\n  gap: 5px;\n  \n\n  -ms-overflow-style: none; \n\n  scrollbar-width: none; \n\n  \n\n}\n#breadcrumb-container[_ngcontent-%COMP%]   .breadcrumb[_ngcontent-%COMP%]::-webkit-scrollbar {\n  display: none;\n}\n#breadcrumb-container[_ngcontent-%COMP%]   .breadcrumb[_ngcontent-%COMP%]   .breadcrumb-item[_ngcontent-%COMP%] {\n  color: var(--primary);\n  font-family: \"Roboto Flex\", sans-serif;\n  font-style: normal;\n  font-weight: 600;\n  font-size: 12px;\n  line-height: 16px;\n  padding: 2px 0 0;\n  text-decoration: none;\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  padding: 2px 0 0;\n  color: var(--primary);\n  gap: 5px;\n  text-align: center;\n  justify-content: center;\n}\n#breadcrumb-container[_ngcontent-%COMP%]   .breadcrumb[_ngcontent-%COMP%]   .breadcrumb-item[_ngcontent-%COMP%]::before {\n  content: \">\";\n  color: var(--primary);\n  display: flex;\n  flex-direction: row;\n  align-items: flex-start;\n  padding: 2px 0 0;\n}\n#breadcrumb-container[_ngcontent-%COMP%]   .breadcrumb[_ngcontent-%COMP%]   .breadcrumb-item[_ngcontent-%COMP%]:hover    > span[_ngcontent-%COMP%] {\n  text-decoration: underline;\n  text-decoration-color: var(--primary);\n  text-decoration-thickness: 1px;\n  text-underline-offset: 2px;\n  -webkit-text-decoration-skip-ink: none;\n          text-decoration-skip-ink: none;\n}\n#breadcrumb-container[_ngcontent-%COMP%]   .breadcrumb[_ngcontent-%COMP%]   .breadcrumb-item[_ngcontent-%COMP%]:hover::before {\n  text-decoration: none;\n}\n#breadcrumb-container[_ngcontent-%COMP%]   .gradient-holder-left[_ngcontent-%COMP%] {\n  position: absolute;\n  width: 10px;\n  left: 22px;\n  top: 0;\n  bottom: 0;\n  background: linear-gradient(270deg, var(--surface) 0%, rgba(255, 255, 255, 0) 100%);\n  transform: rotate(-180deg);\n  z-index: 1;\n}\n#breadcrumb-container[_ngcontent-%COMP%]   .gradient-holder-right[_ngcontent-%COMP%] {\n  position: absolute;\n  width: 10px;\n  right: 10px;\n  top: 0;\n  bottom: 0;\n  background: linear-gradient(270deg, var(--surface) 0%, rgba(255, 255, 255, 0) 100%);\n}\n\n.icon-container[_ngcontent-%COMP%] {\n  width: 24px;\n  height: 24px;\n}\n\n.home-icon[_ngcontent-%COMP%] {\n  width: 16px;\n  height: 18px;\n  padding: 0 3.5px 0 4px;\n}\n\n#events-container[_ngcontent-%COMP%] {\n  overflow-y: scroll;\n  height: 100%;\n  overflow-x: hidden;\n}\n\n\n\n\n\n.example-tree-invisible[_ngcontent-%COMP%] {\n  display: none;\n}\n\n.example-tree[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%], .example-tree[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  margin-top: 0;\n  margin-bottom: 0;\n  list-style-type: none;\n  margin-right: 6px;\n}\n\n\n\n\n\n.example-tree[_ngcontent-%COMP%]   .mat-nested-tree-node[_ngcontent-%COMP%]   div[role=group][_ngcontent-%COMP%] {\n  padding-left: 6px;\n}\n\n\n\n\n\n\n\n.example-tree[_ngcontent-%COMP%]   div[role=group][_ngcontent-%COMP%]    > .mat-tree-node[_ngcontent-%COMP%] {\n  padding-left: 8px;\n}\n\n.mat-tree-node[_ngcontent-%COMP%] {\n  height: 26px;\n  position: relative;\n  width: auto;\n}\n.mat-tree-node[_ngcontent-%COMP%]   .left[_ngcontent-%COMP%] {\n  display: flex;\n  overflow: hidden;\n}\n.mat-tree-node[_ngcontent-%COMP%]   .right[_ngcontent-%COMP%] {\n  z-index: 99;\n  position: absolute;\n  right: 0;\n  height: 100%;\n  display: flex;\n}\n\n.leaf-node[_ngcontent-%COMP%] {\n  height: 24px;\n}\n\n.highlight[_ngcontent-%COMP%] {\n  background: var(--primary);\n  border-radius: 50px;\n  color: var(--on-primary) !important;\n}\n\n.highlight[_ngcontent-%COMP%]   .custom-icon[_ngcontent-%COMP%]  svg * {\n  fill: var(--on-primary);\n}\n\n.custom-icon[_ngcontent-%COMP%] {\n  z-index: 1;\n  height: 17px !important;\n  width: 17px !important;\n  flex-shrink: 0;\n}\n\n.button-size[_ngcontent-%COMP%] {\n  width: 20px;\n  height: 24px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.button-size[_ngcontent-%COMP%]   .mat-icon[_ngcontent-%COMP%] {\n  overflow: visible;\n}\n\n.font[_ngcontent-%COMP%] {\n  font-family: \"Roboto Flex\", sans-serif;\n  font-style: normal;\n  font-weight: 400;\n  font-size: 14px;\n  line-height: 20px;\n  white-space: nowrap;\n  letter-spacing: 0.25px;\n}\n\n.button[_ngcontent-%COMP%] {\n  height: 24px;\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  padding: 0 6px;\n  border-radius: 50px;\n  color: var(--on-surface);\n  justify-content: flex-start;\n  width: 100%;\n  max-width: -moz-fit-content;\n  max-width: fit-content;\n}\n\n\n\n\n\nul[_ngcontent-%COMP%] {\n  margin: 8px;\n  padding: 0;\n  border-left: 1px solid var(--outline-variant);\n}\n\n.group[_ngcontent-%COMP%] {\n  width: 100%;\n}\n\n\n\n\n\n.tag-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: row;\n  justify-content: end;\n  align-items: center;\n  padding: 0 3px;\n  gap: 3px;\n  isolation: isolate;\n  margin: 0 auto;\n  width: 100%;\n  background: var(--surface);\n}\n.tag-container[_ngcontent-%COMP%]:before {\n  content: \"\";\n  position: absolute;\n  width: 10px;\n  left: -9px;\n  height: 100%;\n  background: linear-gradient(270deg, var(--surface) 0%, rgba(255, 255, 255, 0) 100%);\n}\n.tag-container[_ngcontent-%COMP%]   .tag[_ngcontent-%COMP%] {\n  --diameter: 16px;\n  --padding: 4px;\n  background: var(--primary);\n  width: calc(var(--diameter) - 2 * var(--padding));\n  height: var(--diameter);\n  max-height: var(--diameter);\n  border-radius: var(--diameter);\n  line-height: normal;\n  color: var(--on-primary);\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  padding: 0 var(--padding);\n  transition: 1s;\n  font-family: \"Roboto Flex\", sans-serif;\n  font-style: normal;\n  font-weight: 500;\n  letter-spacing: 0.5px;\n  text-align: center;\n  font-size: 11px;\n}\n.tag-container[_ngcontent-%COMP%]   .tag[_ngcontent-%COMP%]   .body[_ngcontent-%COMP%] {\n  transition: 1s;\n  width: 0;\n  overflow: hidden;\n  white-space: nowrap;\n  visibility: hidden;\n  display: flex;\n}\n.tag-container[_ngcontent-%COMP%]   .tag[_ngcontent-%COMP%]:hover {\n  width: 100%;\n  max-width: max-content; \n\n}\n.tag-container[_ngcontent-%COMP%]   .tag[_ngcontent-%COMP%]:hover   .body[_ngcontent-%COMP%] {\n  visibility: visible;\n  width: 100%;\n}\n.tag-container[_ngcontent-%COMP%]   .disease[_ngcontent-%COMP%] {\n  background: var(--error) !important;\n}\n.tag-container[_ngcontent-%COMP%]   .subpathway[_ngcontent-%COMP%] {\n  --diameter: 16px;\n  --padding: 4px;\n  width: calc(var(--diameter) - 2 * var(--padding));\n  height: var(--diameter);\n  max-height: var(--diameter);\n  border-radius: var(--diameter);\n  padding: 0 var(--padding);\n  opacity: 0.4;\n}\n\n.tag-font[_ngcontent-%COMP%] {\n  font-family: \"Roboto Flex\", sans-serif;\n  font-style: normal;\n  font-weight: 500;\n  font-size: 11px;\n  line-height: 16px;\n  letter-spacing: 0.5px;\n}\n\n.tag.disease[_ngcontent-%COMP%] {\n  background: var(--error) !important;\n}\n\n\n\n\n\n.hovered[_ngcontent-%COMP%] {\n  background: #f0f3f5;\n  border-radius: 50px;\n}\n\n\n\n.no-hover-effect.mat-mdc-icon-button[_ngcontent-%COMP%]     .mat-mdc-button-persistent-ripple, .no-hover-effect.mat-mdc-icon-button[_ngcontent-%COMP%]     .mat-mdc-button-ripple {\n  display: none;\n}\n\n\n\n\n\n\n.name-container[_ngcontent-%COMP%] {\n  overflow: hidden;\n}\n\n.name[_ngcontent-%COMP%] {\n  position: relative;\n  left: 0;\n  width: 100%;\n}\n\n.name.no-transition[_ngcontent-%COMP%] {\n  transition: none !important;\n  overflow-x: scroll;\n  white-space: nowrap;\n  left: 0 !important;\n  \n\n  -ms-overflow-style: none; \n\n  scrollbar-width: none; \n\n  \n\n}\n.name.no-transition[_ngcontent-%COMP%]::-webkit-scrollbar {\n  display: none;\n}\n\n  .mat-mdc-button .mdc-button__label.add-overflowX {\n  overflow-x: scroll;\n  -ms-overflow-style: none; \n\n  scrollbar-width: none; \n\n}\n\n.has-sibling[_ngcontent-%COMP%] {\n  margin-left: 12px;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvZXZlbnQtaGllcmFyY2h5L2V2ZW50LWhpZXJhcmNoeS5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGFBQUE7RUFDQSxzQkFBQTtFQUNBLFlBQUE7QUFDRjs7QUFFQTtFQUNFLDZCQUFBO0VBQ0EsWUFBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLG1CQUFBO0VBQ0EsdUJBQUE7RUFFQSxlQUFBO0VBQ0EsZ0JBQUE7RUFDQSxNQUFBO0VBQ0EsWUFBQTtFQUNBLGtCQUFBO0VBQ0EsbUJBQUE7QUFBRjtBQUVFO0VBQ0UsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsbUJBQUE7RUFDQSxzQkFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0VBQ0Esa0JBQUE7RUFDQSxRQUFBO0VBQ0EsK0RBQUE7RUFDQSx3QkFBQSxFQUFBLCtCQUFBO0VBQ0EscUJBQUEsRUFBQSxZQUFBO0VBQ0Esb0RBQUE7QUFBSjtBQUNJO0VBQ0UsYUFBQTtBQUNOO0FBVUk7RUFDRSxxQkFBQTtFQUNBLHNDQUFBO0VBQ0Esa0JBQUE7RUFDQSxnQkFBQTtFQUNBLGVBQUE7RUFDQSxpQkFBQTtFQUNBLGdCQUFBO0VBQ0EscUJBQUE7RUFHQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxtQkFBQTtFQUNBLGdCQUFBO0VBQ0EscUJBQUE7RUFDQSxRQUFBO0VBQ0Esa0JBQUE7RUFDQSx1QkFBQTtBQVZOO0FBYUk7RUFDRSxZQUFBO0VBQ0EscUJBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSx1QkFBQTtFQUNBLGdCQUFBO0FBWE47QUFjSTtFQUNFLDBCQUFBO0VBQ0EscUNBQUE7RUFDQSw4QkFBQTtFQUNBLDBCQUFBO0VBQ0Esc0NBQUE7VUFBQSw4QkFBQTtBQVpOO0FBY0k7RUFDRSxxQkFBQTtBQVpOO0FBa0JFO0VBQ0Usa0JBQUE7RUFDQSxXQUFBO0VBQ0EsVUFBQTtFQUNBLE1BQUE7RUFDQSxTQUFBO0VBQ0EsbUZBQUE7RUFDQSwwQkFBQTtFQUNBLFVBQUE7QUFoQko7QUFvQkU7RUFDRSxrQkFBQTtFQUNBLFdBQUE7RUFDQSxXQUFBO0VBQ0EsTUFBQTtFQUNBLFNBQUE7RUFDQSxtRkFBQTtBQWxCSjs7QUFzQkE7RUFDRSxXQUFBO0VBQ0EsWUFBQTtBQW5CRjs7QUFzQkE7RUFDRSxXQUFBO0VBQ0EsWUFBQTtFQUNBLHNCQUFBO0FBbkJGOztBQXVCQTtFQUNFLGtCQUFBO0VBQ0EsWUFBQTtFQUNBLGtCQUFBO0FBcEJGOztBQXdCQTs7RUFBQTtBQUdBO0VBQ0UsYUFBQTtBQXJCRjs7QUF3QkE7O0VBRUUsYUFBQTtFQUNBLGdCQUFBO0VBQ0EscUJBQUE7RUFDQSxpQkFBQTtBQXJCRjs7QUF3QkE7O0VBQUE7QUFHQTtFQUNFLGlCQUFBO0FBckJGOztBQXdCQTs7OztFQUFBO0FBS0E7RUFDRSxpQkFBQTtBQXJCRjs7QUF5QkE7RUFDRSxZQUFBO0VBQ0Esa0JBQUE7RUFDQSxXQUFBO0FBdEJGO0FBd0JFO0VBQ0UsYUFBQTtFQUNBLGdCQUFBO0FBdEJKO0FBeUJFO0VBQ0UsV0FBQTtFQUNBLGtCQUFBO0VBQ0EsUUFBQTtFQUNBLFlBQUE7RUFDQSxhQUFBO0FBdkJKOztBQTJCQTtFQUNFLFlBQUE7QUF4QkY7O0FBMkJBO0VBQ0UsMEJBQUE7RUFDQSxtQkFBQTtFQUNBLG1DQUFBO0FBeEJGOztBQTJCQTtFQUNFLHVCQUFBO0FBeEJGOztBQTRCQTtFQUNFLFVBQUE7RUFDQSx1QkFBQTtFQUNBLHNCQUFBO0VBQ0EsY0FBQTtBQXpCRjs7QUE0QkE7RUFDRSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0FBekJGOztBQTRCQTtFQUNFLGlCQUFBO0FBekJGOztBQTZCQTtFQUNFLHNDQUFBO0VBQ0Esa0JBQUE7RUFDQSxnQkFBQTtFQUNBLGVBQUE7RUFDQSxpQkFBQTtFQUNBLG1CQUFBO0VBQ0Esc0JBQUE7QUExQkY7O0FBNkJBO0VBQ0UsWUFBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLG1CQUFBO0VBQ0EsY0FBQTtFQUVBLG1CQUFBO0VBQ0Esd0JBQUE7RUFDQSwyQkFBQTtFQUNBLFdBQUE7RUFDQSwyQkFBQTtFQUFBLHNCQUFBO0FBM0JGOztBQThCQTs7RUFBQTtBQUdBO0VBQ0UsV0FBQTtFQUNBLFVBQUE7RUFDQSw2Q0FBQTtBQTNCRjs7QUE4QkE7RUFDRSxXQUFBO0FBM0JGOztBQThCQTs7RUFBQTtBQUdBO0VBQ0UsYUFBQTtFQUNBLG1CQUFBO0VBQ0Esb0JBQUE7RUFDQSxtQkFBQTtFQUNBLGNBQUE7RUFDQSxRQUFBO0VBQ0Esa0JBQUE7RUFDQSxjQUFBO0VBQ0EsV0FBQTtFQUNBLDBCQUFBO0FBM0JGO0FBNkJFO0VBQ0UsV0FBQTtFQUNBLGtCQUFBO0VBQ0EsV0FBQTtFQUNBLFVBQUE7RUFDQSxZQUFBO0VBQ0EsbUZBQUE7QUEzQko7QUE4QkU7RUFDRSxnQkFBQTtFQUNBLGNBQUE7RUFDQSwwQkFBQTtFQUNBLGlEQUFBO0VBQ0EsdUJBQUE7RUFFQSwyQkFBQTtFQUNBLDhCQUFBO0VBQ0EsbUJBQUE7RUFDQSx3QkFBQTtFQUNBLGFBQUE7RUFDQSx1QkFBQTtFQUNBLG1CQUFBO0VBQ0EseUJBQUE7RUFDQSxjQUFBO0VBRUEsc0NBQUE7RUFDQSxrQkFBQTtFQUNBLGdCQUFBO0VBQ0EscUJBQUE7RUFDQSxrQkFBQTtFQUNBLGVBQUE7QUE5Qko7QUFvQ0k7RUFDRSxjQUFBO0VBQ0EsUUFBQTtFQUNBLGdCQUFBO0VBQ0EsbUJBQUE7RUFDQSxrQkFBQTtFQUNBLGFBQUE7QUFsQ047QUFxQ0k7RUFDRSxXQUFBO0VBQ0Esc0JBQUEsRUFBQSxvREFBQTtBQW5DTjtBQXFDTTtFQUNFLG1CQUFBO0VBQ0EsV0FBQTtBQW5DUjtBQXdDRTtFQUNFLG1DQUFBO0FBdENKO0FBeUNFO0VBQ0UsZ0JBQUE7RUFDQSxjQUFBO0VBQ0EsaURBQUE7RUFDQSx1QkFBQTtFQUNBLDJCQUFBO0VBQ0EsOEJBQUE7RUFDQSx5QkFBQTtFQUNBLFlBQUE7QUF2Q0o7O0FBMkNBO0VBQ0Usc0NBQUE7RUFDQSxrQkFBQTtFQUNBLGdCQUFBO0VBQ0EsZUFBQTtFQUNBLGlCQUFBO0VBQ0EscUJBQUE7QUF4Q0Y7O0FBMkNBO0VBQ0UsbUNBQUE7QUF4Q0Y7O0FBMkNBOztFQUFBO0FBR0E7RUFDRSxtQkFBQTtFQUNBLG1CQUFBO0FBeENGOztBQTRDQSw0RkFBQTtBQUlNO0VBQ0UsYUFBQTtBQTVDUjs7QUFrREE7OztFQUFBO0FBSUE7RUFDRSxnQkFBQTtBQS9DRjs7QUFrREE7RUFDRSxrQkFBQTtFQUNBLE9BQUE7RUFDQSxXQUFBO0FBL0NGOztBQW1EQTtFQUNFLDJCQUFBO0VBQ0Esa0JBQUE7RUFDQSxtQkFBQTtFQUNBLGtCQUFBO0VBRUEsK0RBQUE7RUFDQSx3QkFBQSxFQUFBLCtCQUFBO0VBQ0EscUJBQUEsRUFBQSxZQUFBO0VBRUEsb0RBQUE7QUFsREY7QUFtREU7RUFDRSxhQUFBO0FBakRKOztBQXFEQTtFQUNFLGtCQUFBO0VBQ0Esd0JBQUEsRUFBQSwwQkFBQTtFQUNBLHFCQUFBLEVBQUEsWUFBQTtBQWxERjs7QUFxREE7RUFDRSxpQkFBQTtBQWxERiIsInNvdXJjZXNDb250ZW50IjpbIiNoaWVyYXJjaHktY29udGFpbmVyIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgaGVpZ2h0OiAxMDAlO1xufVxuXG4jYnJlYWRjcnVtYi1jb250YWluZXIge1xuICBiYWNrZ3JvdW5kOiB2YXIoLS1vbi1wcmltYXJ5KTtcbiAgaGVpZ2h0OiAzNHB4O1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBwYWRkaW5nOiA1cHggMTBweCA1cHggMDtcblxuICAvKiBzdGlja3kgZGl2ICovXG4gIHBvc2l0aW9uOiBzdGlja3k7XG4gIHRvcDogMDtcbiAgei1pbmRleDogOTk5O1xuICBvdmVyZmxvdy15OiBoaWRkZW47XG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XG5cbiAgLmJyZWFkY3J1bWIge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IHJvdztcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIHBhZGRpbmc6IDJweCAwIDJweCA3cHg7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgaGVpZ2h0OiAyNHB4O1xuICAgIG92ZXJmbG93LXg6IHNjcm9sbDtcbiAgICBnYXA6IDVweDtcbiAgICAvKiBIaWRlIHRoZSBzY3JvbGxiYXIgZm9yIEludGVybmV0IEV4cGxvcmVyLCBFZGdlIGFuZCBGaXJlZm94ICovXG4gICAgLW1zLW92ZXJmbG93LXN0eWxlOiBub25lOyAvKiBJbnRlcm5ldCBFeHBsb3JlciBhbmQgRWRnZSAqL1xuICAgIHNjcm9sbGJhci13aWR0aDogbm9uZTsgLyogRmlyZWZveCAqL1xuICAgIC8qIEhpZGUgdGhlIHNjcm9sbGJhciBmb3IgQ2hyb21lLCBTYWZhcmkgYW5kIE9wZXJhICovXG4gICAgJjo6LXdlYmtpdC1zY3JvbGxiYXIge1xuICAgICAgZGlzcGxheTogbm9uZTtcbiAgICB9XG5cbiAgICAvLy5ndXR0ZXIge1xuICAgIC8vICBkaXNwbGF5OiBmbGV4O1xuICAgIC8vICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICAgIC8vICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcbiAgICAvLyAgcGFkZGluZzogMnB4IDAgMDtcbiAgICAvLyAgY29sb3I6IHZhcigtLXByaW1hcnkpO1xuICAgIC8vfVxuXG4gICAgLmJyZWFkY3J1bWItaXRlbSB7XG4gICAgICBjb2xvcjogdmFyKC0tcHJpbWFyeSk7XG4gICAgICBmb250LWZhbWlseTogJ1JvYm90byBGbGV4Jywgc2Fucy1zZXJpZjtcbiAgICAgIGZvbnQtc3R5bGU6IG5vcm1hbDtcbiAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgICBmb250LXNpemU6IDEycHg7XG4gICAgICBsaW5lLWhlaWdodDogMTZweDtcbiAgICAgIHBhZGRpbmc6IDJweCAwIDA7XG4gICAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG5cblxuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgcGFkZGluZzogMnB4IDAgMDtcbiAgICAgIGNvbG9yOiB2YXIoLS1wcmltYXJ5KTtcbiAgICAgIGdhcDogNXB4O1xuICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgfVxuXG4gICAgLmJyZWFkY3J1bWItaXRlbTo6YmVmb3Jle1xuICAgICAgY29udGVudDogJz4nO1xuICAgICAgY29sb3I6IHZhcigtLXByaW1hcnkpO1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gICAgICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcbiAgICAgIHBhZGRpbmc6IDJweCAwIDA7XG4gICAgfVxuXG4gICAgLmJyZWFkY3J1bWItaXRlbTpob3ZlciA+IHNwYW57XG4gICAgICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcbiAgICAgIHRleHQtZGVjb3JhdGlvbi1jb2xvcjogdmFyKC0tcHJpbWFyeSk7XG4gICAgICB0ZXh0LWRlY29yYXRpb24tdGhpY2tuZXNzOiAxcHg7XG4gICAgICB0ZXh0LXVuZGVybGluZS1vZmZzZXQ6IDJweDtcbiAgICAgIHRleHQtZGVjb3JhdGlvbi1za2lwLWluazogbm9uZTsgLy8gRm9yY2UgdGhlIHVuZGVybGluZSB0byBnbyB0aHJvdWdoIHRoZSBjaGFyYWN0ZXJcbiAgICB9XG4gICAgLmJyZWFkY3J1bWItaXRlbTpob3Zlcjo6YmVmb3JlIHtcbiAgICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbiAgICB9XG5cblxuICB9XG5cbiAgLmdyYWRpZW50LWhvbGRlci1sZWZ0IHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgd2lkdGg6IDEwcHg7XG4gICAgbGVmdDogMjJweDtcbiAgICB0b3A6IDA7XG4gICAgYm90dG9tOiAwO1xuICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgyNzBkZWcsIHZhcigtLXN1cmZhY2UpIDAlLCByZ2JhKDI1NSwgMjU1LCAyNTUsIDApIDEwMCUpO1xuICAgIHRyYW5zZm9ybTogcm90YXRlKC0xODBkZWcpO1xuICAgIHotaW5kZXg6IDE7XG5cbiAgfVxuXG4gIC5ncmFkaWVudC1ob2xkZXItcmlnaHQge1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB3aWR0aDogMTBweDtcbiAgICByaWdodDogMTBweDtcbiAgICB0b3A6IDA7XG4gICAgYm90dG9tOiAwO1xuICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgyNzBkZWcsIHZhcigtLXN1cmZhY2UpIDAlLCByZ2JhKDI1NSwgMjU1LCAyNTUsIDApIDEwMCUpO1xuICB9XG59XG5cbi5pY29uLWNvbnRhaW5lciB7XG4gIHdpZHRoOiAyNHB4O1xuICBoZWlnaHQ6IDI0cHg7XG59XG5cbi5ob21lLWljb24ge1xuICB3aWR0aDogMTZweDtcbiAgaGVpZ2h0OiAxOHB4O1xuICBwYWRkaW5nOiAwIDMuNXB4IDAgNHB4O1xufVxuXG5cbiNldmVudHMtY29udGFpbmVyIHtcbiAgb3ZlcmZsb3cteTogc2Nyb2xsO1xuICBoZWlnaHQ6IDEwMCU7XG4gIG92ZXJmbG93LXg6IGhpZGRlbjtcbn1cblxuXG4vKlxuICogUmVuYW1lIGV4YW1wbGUtdHJlZSBjbGFzcyB3aWxsIGNhdXNlIGV4cGFuZC9jb2xsYXBzZSBub3Qgd29ya2luZ1xuICovXG4uZXhhbXBsZS10cmVlLWludmlzaWJsZSB7XG4gIGRpc3BsYXk6IG5vbmU7XG59XG5cbi5leGFtcGxlLXRyZWUgdWwsXG4uZXhhbXBsZS10cmVlIGxpIHtcbiAgbWFyZ2luLXRvcDogMDtcbiAgbWFyZ2luLWJvdHRvbTogMDtcbiAgbGlzdC1zdHlsZS10eXBlOiBub25lO1xuICBtYXJnaW4tcmlnaHQ6IDZweDtcbn1cblxuLypcbiAqIFRoaXMgcGFkZGluZyBzZXRzIGFsaWdubWVudCBvZiB0aGUgbmVzdGVkIG5vZGVzLlxuICovXG4uZXhhbXBsZS10cmVlIC5tYXQtbmVzdGVkLXRyZWUtbm9kZSBkaXZbcm9sZT1ncm91cF0ge1xuICBwYWRkaW5nLWxlZnQ6IDZweDtcbn1cblxuLypcbiAqIFBhZGRpbmcgZm9yIGxlYWYgbm9kZXMuXG4gKiBMZWFmIG5vZGVzIG5lZWQgdG8gaGF2ZSBwYWRkaW5nIHNvIGFzIHRvIGFsaWduIHdpdGggb3RoZXIgbm9uLWxlYWYgbm9kZXNcbiAqIHVuZGVyIHRoZSBzYW1lIHBhcmVudC5cbiAqL1xuLmV4YW1wbGUtdHJlZSBkaXZbcm9sZT1ncm91cF0gPiAubWF0LXRyZWUtbm9kZSB7XG4gIHBhZGRpbmctbGVmdDogOHB4O1xufVxuXG5cbi5tYXQtdHJlZS1ub2RlIHtcbiAgaGVpZ2h0OiAyNnB4O1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIHdpZHRoOiBhdXRvO1xuXG4gIC5sZWZ0IHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIG92ZXJmbG93OiBoaWRkZW47XG4gIH1cblxuICAucmlnaHQge1xuICAgIHotaW5kZXg6IDk5O1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICByaWdodDogMDtcbiAgICBoZWlnaHQ6IDEwMCU7XG4gICAgZGlzcGxheTogZmxleDtcbiAgfVxufVxuXG4ubGVhZi1ub2RlIHtcbiAgaGVpZ2h0OiAyNHB4O1xufVxuXG4uaGlnaGxpZ2h0IHtcbiAgYmFja2dyb3VuZDogdmFyKC0tcHJpbWFyeSk7XG4gIGJvcmRlci1yYWRpdXM6IDUwcHg7O1xuICBjb2xvcjogdmFyKC0tb24tcHJpbWFyeSkgIWltcG9ydGFudDtcbn1cblxuLmhpZ2hsaWdodCAuY3VzdG9tLWljb246Om5nLWRlZXAgc3ZnICoge1xuICBmaWxsOiB2YXIoLS1vbi1wcmltYXJ5KTtcbn1cblxuXG4uY3VzdG9tLWljb24ge1xuICB6LWluZGV4OiAxOyAvLyBFbnN1cmUgdG8gZGlzcGxheSB0b29sdGlwIDogaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvY29tcG9uZW50cy9pc3N1ZXMvMjg4ODhcbiAgaGVpZ2h0OiAxN3B4ICFpbXBvcnRhbnQ7XG4gIHdpZHRoOiAxN3B4ICFpbXBvcnRhbnQ7XG4gIGZsZXgtc2hyaW5rOiAwOyAvLyBFbnN1cmUgdGhlIGljb24gZG9lcyBub3Qgc2hyaW5rXG59XG5cbi5idXR0b24tc2l6ZSB7XG4gIHdpZHRoOiAyMHB4O1xuICBoZWlnaHQ6IDI0cHg7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xufVxuXG4uYnV0dG9uLXNpemUgLm1hdC1pY29uIHtcbiAgb3ZlcmZsb3c6IHZpc2libGU7XG59XG5cblxuLmZvbnQge1xuICBmb250LWZhbWlseTogJ1JvYm90byBGbGV4Jywgc2Fucy1zZXJpZjtcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xuICBmb250LXdlaWdodDogNDAwO1xuICBmb250LXNpemU6IDE0cHg7XG4gIGxpbmUtaGVpZ2h0OiAyMHB4O1xuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICBsZXR0ZXItc3BhY2luZzogMC4yNXB4O1xufVxuXG4uYnV0dG9uIHtcbiAgaGVpZ2h0OiAyNHB4O1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBwYWRkaW5nOiAwIDZweDtcbiAgLy9nYXA6IDVweDtcbiAgYm9yZGVyLXJhZGl1czogNTBweDtcbiAgY29sb3I6IHZhcigtLW9uLXN1cmZhY2UpO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XG4gIHdpZHRoOiAxMDAlO1xuICBtYXgtd2lkdGg6IGZpdC1jb250ZW50O1xufVxuXG4vKlxuICogQnJhbmNoIGxpbmUgaGVscGVyXG4gKi9cbnVsIHtcbiAgbWFyZ2luOiA4cHg7XG4gIHBhZGRpbmc6IDA7XG4gIGJvcmRlci1sZWZ0OiAxcHggc29saWQgdmFyKC0tb3V0bGluZS12YXJpYW50KTtcbn1cblxuLmdyb3VwIHtcbiAgd2lkdGg6IDEwMCU7XG59XG5cbi8qKlxuICAgVEFHU1xuICovXG4udGFnLWNvbnRhaW5lciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gIGp1c3RpZnktY29udGVudDogZW5kO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBwYWRkaW5nOiAwIDNweDtcbiAgZ2FwOiAzcHg7XG4gIGlzb2xhdGlvbjogaXNvbGF0ZTtcbiAgbWFyZ2luOiAwIGF1dG87XG4gIHdpZHRoOiAxMDAlO1xuICBiYWNrZ3JvdW5kOiB2YXIoLS1zdXJmYWNlKTtcblxuICAmOmJlZm9yZSB7XG4gICAgY29udGVudDogJyc7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHdpZHRoOiAxMHB4OyAvLyBUaGlzIHZhbHVlZCBpcyB1c2VkIHRvIGNhbGN1bGF0ZSBsZWZ0IERJViB3aWR0aCwgcmVtZW1iZXIgdG8gdXBkYXRlIGl0IGluIHRoZSBjb21wb25lbnQgYWRqdXN0V2lkdGggbWV0aG9kIHdoZW4geW91IGNoYW5nZSBpdFxuICAgIGxlZnQ6IC05cHg7XG4gICAgaGVpZ2h0OiAxMDAlO1xuICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgyNzBkZWcsIHZhcigtLXN1cmZhY2UpIDAlLCByZ2JhKDI1NSwgMjU1LCAyNTUsIDApIDEwMCUpO1xuICB9XG5cbiAgLnRhZyB7XG4gICAgLS1kaWFtZXRlcjogMTZweDtcbiAgICAtLXBhZGRpbmc6IDRweDtcbiAgICBiYWNrZ3JvdW5kOiB2YXIoLS1wcmltYXJ5KTtcbiAgICB3aWR0aDogY2FsYyh2YXIoLS1kaWFtZXRlcikgLSAyICogdmFyKC0tcGFkZGluZykpO1xuICAgIGhlaWdodDogdmFyKC0tZGlhbWV0ZXIpO1xuICAgIC8vbWF4LXdpZHRoOiB2YXIoLS1kaWFtZXRlcik7XG4gICAgbWF4LWhlaWdodDogdmFyKC0tZGlhbWV0ZXIpO1xuICAgIGJvcmRlci1yYWRpdXM6IHZhcigtLWRpYW1ldGVyKTtcbiAgICBsaW5lLWhlaWdodDogbm9ybWFsO1xuICAgIGNvbG9yOiB2YXIoLS1vbi1wcmltYXJ5KTtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgcGFkZGluZzogMCB2YXIoLS1wYWRkaW5nKTtcbiAgICB0cmFuc2l0aW9uOiAxcztcblxuICAgIGZvbnQtZmFtaWx5OiAnUm9ib3RvIEZsZXgnLCBzYW5zLXNlcmlmO1xuICAgIGZvbnQtc3R5bGU6IG5vcm1hbDtcbiAgICBmb250LXdlaWdodDogNTAwO1xuICAgIGxldHRlci1zcGFjaW5nOiAwLjVweDtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgZm9udC1zaXplOiAxMXB4O1xuXG5cbiAgICAuaW5pdGlhbCB7XG4gICAgfVxuXG4gICAgLmJvZHkge1xuICAgICAgdHJhbnNpdGlvbjogMXM7XG4gICAgICB3aWR0aDogMDtcbiAgICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICAgICAgdmlzaWJpbGl0eTogaGlkZGVuO1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICB9XG5cbiAgICAmOmhvdmVyIHtcbiAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgbWF4LXdpZHRoOiBtYXgtY29udGVudDsgLyogRml4IGluY3JlYXNpbmcgd2lkdGggd2hlbiBob3ZlciBiZXR3ZWVuIHR3byB0YWdzKi9cblxuICAgICAgLmJvZHkge1xuICAgICAgICB2aXNpYmlsaXR5OiB2aXNpYmxlO1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAuZGlzZWFzZSB7XG4gICAgYmFja2dyb3VuZDogdmFyKC0tZXJyb3IpICFpbXBvcnRhbnQ7XG4gIH1cblxuICAuc3VicGF0aHdheSB7XG4gICAgLS1kaWFtZXRlcjogMTZweDtcbiAgICAtLXBhZGRpbmc6IDRweDtcbiAgICB3aWR0aDogY2FsYyh2YXIoLS1kaWFtZXRlcikgLSAyICogdmFyKC0tcGFkZGluZykpO1xuICAgIGhlaWdodDogdmFyKC0tZGlhbWV0ZXIpO1xuICAgIG1heC1oZWlnaHQ6IHZhcigtLWRpYW1ldGVyKTtcbiAgICBib3JkZXItcmFkaXVzOiB2YXIoLS1kaWFtZXRlcik7XG4gICAgcGFkZGluZzogMCB2YXIoLS1wYWRkaW5nKTtcbiAgICBvcGFjaXR5OiAwLjQ7XG4gIH1cbn1cblxuLnRhZy1mb250IHtcbiAgZm9udC1mYW1pbHk6ICdSb2JvdG8gRmxleCcsIHNhbnMtc2VyaWY7XG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcbiAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgZm9udC1zaXplOiAxMXB4O1xuICBsaW5lLWhlaWdodDogMTZweDtcbiAgbGV0dGVyLXNwYWNpbmc6IDAuNXB4O1xufVxuXG4udGFnLmRpc2Vhc2Uge1xuICBiYWNrZ3JvdW5kOiB2YXIoLS1lcnJvcikgIWltcG9ydGFudDtcbn1cblxuLypcbiAqIEFkZCBob3ZlciB0byBub2RlIGJ1dHRvbiB3aGVuIGhvdmVyaW5nIHRoZSB0YWdcbiAqL1xuLmhvdmVyZWQge1xuICBiYWNrZ3JvdW5kOiAjZjBmM2Y1O1xuICBib3JkZXItcmFkaXVzOiA1MHB4O1xufVxuXG5cbi8qIERpc2FibGUgdGhlIGhvdmVyIGZvciB0aGUgbWF0IHRyZWUgZXhwYW5kYWJsZSBpY29uLCB0aGUgZGlzYWJsZVJpcHBsZSBkb2Vzbid0IHdvcmsgaGVyZSAqL1xuLm5vLWhvdmVyLWVmZmVjdCB7XG4gICYubWF0LW1kYy1pY29uLWJ1dHRvbiB7XG4gICAgOjpuZy1kZWVwIHtcbiAgICAgIC5tYXQtbWRjLWJ1dHRvbi1wZXJzaXN0ZW50LXJpcHBsZSwgLm1hdC1tZGMtYnV0dG9uLXJpcHBsZSB7XG4gICAgICAgIGRpc3BsYXk6IG5vbmU7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbi8qXG4gKiBEaXNwbGF5TmFtZVxuICogV29ya3Mgd2l0aCBkeW5hbWljIHNjcm9sbGluZyBuYW1lIHdoZW4gaG92ZXJpbmdcbiAqL1xuLm5hbWUtY29udGFpbmVyIHtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbn1cblxuLm5hbWUge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIGxlZnQ6IDA7XG4gIHdpZHRoOiAxMDAlO1xufVxuXG5cbi5uYW1lLm5vLXRyYW5zaXRpb24ge1xuICB0cmFuc2l0aW9uOiBub25lICFpbXBvcnRhbnQ7XG4gIG92ZXJmbG93LXg6IHNjcm9sbDtcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgbGVmdDogMCAhaW1wb3J0YW50O1xuXG4gIC8qIEhpZGUgdGhlIHNjcm9sbGJhciBmb3IgSW50ZXJuZXQgRXhwbG9yZXIsIEVkZ2UgYW5kIEZpcmVmb3ggKi9cbiAgLW1zLW92ZXJmbG93LXN0eWxlOiBub25lOyAvKiBJbnRlcm5ldCBFeHBsb3JlciBhbmQgRWRnZSAqL1xuICBzY3JvbGxiYXItd2lkdGg6IG5vbmU7IC8qIEZpcmVmb3ggKi9cblxuICAvKiBIaWRlIHRoZSBzY3JvbGxiYXIgZm9yIENocm9tZSwgU2FmYXJpIGFuZCBPcGVyYSAqL1xuICAmOjotd2Via2l0LXNjcm9sbGJhciB7XG4gICAgZGlzcGxheTogbm9uZTtcbiAgfVxufVxuXG46Om5nLWRlZXAgLm1hdC1tZGMtYnV0dG9uIC5tZGMtYnV0dG9uX19sYWJlbC5hZGQtb3ZlcmZsb3dYIHtcbiAgb3ZlcmZsb3cteDogc2Nyb2xsO1xuICAtbXMtb3ZlcmZsb3ctc3R5bGU6IG5vbmU7ICAvKiBJbnRlcm5ldCBFeHBsb3JlciAxMCsgKi9cbiAgc2Nyb2xsYmFyLXdpZHRoOiBub25lOyAgLyogRmlyZWZveCAqL1xufVxuXG4uaGFzLXNpYmxpbmcge1xuICBtYXJnaW4tbGVmdDogMTJweDtcbn1cblxuLy8uaGFzLW5vLXNpYmxpbmcge1xuLy8gICBtYXJnaW4tbGVmdDogNHB4O1xuLy99XG4iXSwic291cmNlUm9vdCI6IiJ9 */"]
  });
};
EventHierarchyComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_17__.__decorate)([(0,_ngneat_until_destroy__WEBPACK_IMPORTED_MODULE_9__.UntilDestroy)()], EventHierarchyComponent);

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
    return router.navigate([`PathwayBrowser`, id], {
      fragment: undefined,
      queryParams: params
    });
  }
  return router.navigate([`PathwayBrowser`, id]); // Default routing
};

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
/* harmony import */ var _model_interactor_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../model/interactor.model */ 4804);
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
        this.token = result.token;
        this.isDataLoading = false;
        this.dialogRef.close();
      });
    }
  }
  getInputs() {
    const input = new _model_interactor_model__WEBPACK_IMPORTED_MODULE_0__.InputCategory();
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

/***/ 9563:
/*!******************************************************!*\
  !*** ./src/app/interactors/interactors.component.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   InteractorsComponent: () => (/* binding */ InteractorsComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _model_interactor_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./model/interactor.model */ 4804);
/* harmony import */ var _custom_interactor_dialog_custom_interactor_dialog_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./custom-interactor-dialog/custom-interactor-dialog.component */ 2373);
/* harmony import */ var _services_diagram_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/diagram.service */ 378);
/* harmony import */ var _services_dark_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../services/dark.service */ 4393);
/* harmony import */ var _services_interactor_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./services/interactor.service */ 7364);
/* harmony import */ var _services_diagram_state_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../services/diagram-state.service */ 6742);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/dialog */ 7401);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ 6575);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/button */ 895);
/* harmony import */ var _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/progress-spinner */ 3910);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/icon */ 6515);
/* harmony import */ var _angular_material_list__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/list */ 3228);
/* harmony import */ var _angular_material_divider__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/divider */ 9400);
/* harmony import */ var _angular_material_grid_list__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/grid-list */ 647);
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/card */ 8497);

















function InteractorsComponent_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 14)(1, "div", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](2, "mat-divider", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](3, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](5, "div", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](6, "mat-divider", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const text_r7 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](text_r7);
  }
}
function InteractorsComponent_ng_container_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainer"](0);
  }
}
function InteractorsComponent_ng_container_16_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainer"](0);
  }
}
function InteractorsComponent_mat_grid_tile_18_mat_spinner_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](0, "mat-spinner", 22);
  }
}
const _c0 = function (a0) {
  return {
    "active-button": a0
  };
};
function InteractorsComponent_mat_grid_tile_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "mat-grid-tile", 18)(1, "button", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function InteractorsComponent_mat_grid_tile_18_Template_button_click_1_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r11);
      const resource_r8 = restoredCtx.$implicit;
      const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r10.getInteractors(resource_r8.name));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](2, "div", 20)(3, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](5, InteractorsComponent_mat_grid_tile_18_mat_spinner_5_Template, 1, 0, "mat-spinner", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const resource_r8 = ctx.$implicit;
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction1"](3, _c0, (ctx_r4.currentResource == null ? null : ctx_r4.currentResource.name) === resource_r8.name));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](resource_r8.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r4.isDataFromPsicquicLoading && (ctx_r4.currentResource == null ? null : ctx_r4.currentResource.name) === resource_r8.name);
  }
}
function InteractorsComponent_ng_container_19_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainer"](0);
  }
}
function InteractorsComponent_mat_selection_list_20_mat_list_option_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "mat-list-option", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function InteractorsComponent_mat_selection_list_20_mat_list_option_1_Template_mat_list_option_click_0_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r15);
      const resourceToken_r13 = restoredCtx.$implicit;
      const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r14.getInteractors(resourceToken_r13));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "div", 26)(2, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](4, "button", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function InteractorsComponent_mat_selection_list_20_mat_list_option_1_Template_button_click_4_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r15);
      const resourceToken_r13 = restoredCtx.$implicit;
      const ctx_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r16.deleteCustomResource(resourceToken_r13));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](5, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](6, "delete");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()()();
  }
  if (rf & 2) {
    const resourceToken_r13 = ctx.$implicit;
    const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("value", resourceToken_r13)("selected", ctx_r12.isSelected(resourceToken_r13))("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction1"](4, _c0, (ctx_r12.currentResource == null ? null : ctx_r12.currentResource.name) === resourceToken_r13.summary.name));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](resourceToken_r13.summary.name);
  }
}
function InteractorsComponent_mat_selection_list_20_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "mat-selection-list", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](1, InteractorsComponent_mat_selection_list_20_mat_list_option_1_Template, 7, 6, "mat-list-option", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("multiple", false);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngForOf", ctx_r6.resourceTokens);
  }
}
const _c1 = function (a0) {
  return {
    "active-icon": a0
  };
};
const _c2 = function () {
  return {
    $implicit: "Main"
  };
};
const _c3 = function () {
  return {
    $implicit: "PSICQUIC"
  };
};
const _c4 = function () {
  return {
    $implicit: "Custom"
  };
};
class InteractorsComponent {
  constructor(diagram, dark, interactorsService, state, dialog, cdr) {
    this.diagram = diagram;
    this.dark = dark;
    this.interactorsService = interactorsService;
    this.state = state;
    this.dialog = dialog;
    this.cdr = cdr;
    this.isDataFromPsicquicLoading = false;
    this.resourceTokens = [];
    this.clear = false;
    this.psicquicResources = [];
    this.currentResource = {
      name: null,
      type: null
    };
    this.DISEASE_RESOURCE = 'DisGeNet';
    this.INTACT_RESOURCE = 'IntAct';
    this.ResourceType = _model_interactor_model__WEBPACK_IMPORTED_MODULE_0__.ResourceType;
    this.cys = [];
    this.initialiseReplaceElements = new _angular_core__WEBPACK_IMPORTED_MODULE_6__.EventEmitter();
  }
  ngAfterViewInit() {
    this.getPsicquicResources();
    this.currentResourceSubscription = this.interactorsService.currentInteractorResource$.subscribe(resource => {
      this.currentResource = resource;
    });
  }
  ngOnDestroy() {
    this.currentResourceSubscription.unsubscribe();
  }
  getInteractors(resource) {
    if (!resource) return;
    this.interactorsService.getResourceType(resource).subscribe({
      next: resourceType => {
        switch (resourceType) {
          case _model_interactor_model__WEBPACK_IMPORTED_MODULE_0__.ResourceType.STATIC:
          case _model_interactor_model__WEBPACK_IMPORTED_MODULE_0__.ResourceType.DISGENET:
            this.getStaticInteractors(resource);
            break;
          case _model_interactor_model__WEBPACK_IMPORTED_MODULE_0__.ResourceType.PSICQUIC:
            this.getPsicquicResourceInteractors(resource);
            break;
          case _model_interactor_model__WEBPACK_IMPORTED_MODULE_0__.ResourceType.CUSTOM:
            this.getCustomResourceInteractors(resource);
            break;
          default:
            throw new Error("Unknown resource type encountered: " + resourceType);
        }
      },
      error: error => {
        console.error("Error determining resource type:", error);
        throw new Error("Error determining resource type: " + error);
      }
    });
  }
  getStaticInteractors(resource) {
    if (resource) {
      this.clear = false;
      let type = resource === _model_interactor_model__WEBPACK_IMPORTED_MODULE_0__.ResourceType.STATIC ? _model_interactor_model__WEBPACK_IMPORTED_MODULE_0__.ResourceType.STATIC : _model_interactor_model__WEBPACK_IMPORTED_MODULE_0__.ResourceType.DISGENET;
      this.updateCurrentResource(resource, type);
    } else {
      return;
    }
    this.cys.forEach(cy => {
      this.interactorsService.getInteractorData(cy, resource).subscribe(interactors => {
        this.interactorsService.addInteractorOccurrenceNode(interactors, cy, resource);
        this.initialiseReplaceElements.emit();
      });
      this.state.set('overlay', resource);
    });
  }
  getPsicquicResourceInteractors(selectedResource) {
    this.isDataFromPsicquicLoading = true;
    this.clear = false;
    this.updateCurrentResource(selectedResource, _model_interactor_model__WEBPACK_IMPORTED_MODULE_0__.ResourceType.PSICQUIC);
    this.cys.forEach(cy => {
      this.interactorsService.getInteractorData(cy, selectedResource).subscribe(interactors => {
        this.interactorsService.addInteractorOccurrenceNode(interactors, cy, selectedResource);
        this.isDataFromPsicquicLoading = false;
        this.state.set('overlay', selectedResource);
      });
    });
  }
  openCustomInteractorDialog() {
    this.cys.forEach(cy => {
      // Avoid multiple opening dialogs
      if (this.dialog.openDialogs.length === 1) {
        return;
      }
      const dialogRef = this.dialog.open(_custom_interactor_dialog_custom_interactor_dialog_component__WEBPACK_IMPORTED_MODULE_1__.CustomInteractorDialogComponent, {
        data: {
          cy: cy
        },
        restoreFocus: false // Deselect button when closing
      });

      dialogRef.afterClosed().subscribe(result => {
        const resource = dialogRef.componentInstance.token;
        if (resource) {
          this.resourceTokens.push(resource);
          this.clear = false;
          this.updateCurrentResource(resource.summary.name, _model_interactor_model__WEBPACK_IMPORTED_MODULE_0__.ResourceType.CUSTOM);
          this.state.set('overlay', resource.summary.token);
        }
        this.cdr.detectChanges();
      });
    });
  }
  isSelected(resource) {
    return this.resourceTokens.includes(resource);
  }
  getCustomResourceInteractors(resource) {
    if (!resource.summary) return;
    this.cys.forEach(cy => {
      this.interactorsService.fetchCustomInteractors(resource, cy).subscribe(result => {
        this.interactorsService.addInteractorOccurrenceNode(result.interactors, cy, result.interactors.resource);
        this.clear = false;
        this.updateCurrentResource(resource.summary.name, _model_interactor_model__WEBPACK_IMPORTED_MODULE_0__.ResourceType.CUSTOM);
        this.state.set('overlay', resource.summary.token);
      });
    });
  }
  deleteCustomResource(resource) {
    const index = this.resourceTokens.indexOf(resource);
    if (index !== -1) {
      this.resourceTokens.splice(index, 1);
      this.cys.forEach(cy => {
        cy.elements(`[resource = '${resource}']`).remove();
        this.state.set('overlay', null);
      });
    }
  }
  clearInteractors() {
    this.cys.forEach(cy => {
      this.interactorsService.clearAllInteractorNodes(cy);
      this.clear = true;
      this.updateCurrentResource(null, null);
      this.state.set('overlay', null);
    });
  }
  updateCurrentResource(name, type) {
    if (name && type) {
      const resource = {
        name,
        type
      };
      this.interactorsService.setCurrentResource(resource);
    } else {
      this.interactorsService.setCurrentResource({
        name: null,
        type: null
      });
    }
  }
  getPsicquicResources() {
    this.interactorsService.getPsicquicResources().subscribe(resources => {
      this.psicquicResources = resources;
    });
  }
  static #_ = this.ɵfac = function InteractorsComponent_Factory(t) {
    return new (t || InteractorsComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_services_diagram_service__WEBPACK_IMPORTED_MODULE_2__.DiagramService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_services_dark_service__WEBPACK_IMPORTED_MODULE_3__.DarkService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_services_interactor_service__WEBPACK_IMPORTED_MODULE_4__.InteractorService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_services_diagram_state_service__WEBPACK_IMPORTED_MODULE_5__.DiagramStateService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_7__.MatDialog), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_6__.ChangeDetectorRef));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineComponent"]({
    type: InteractorsComponent,
    selectors: [["cr-interactors"]],
    inputs: {
      cy: "cy",
      cys: "cys"
    },
    outputs: {
      initialiseReplaceElements: "initialiseReplaceElements"
    },
    decls: 26,
    vars: 24,
    consts: [["dividerTemplate", ""], ["id", "interactor-container", 1, "variables"], [1, "card"], [1, "button-container"], ["mat-raised-button", "", 1, "raised-full-width-button", 3, "ngClass", "click"], ["color", "primary", 3, "ngClass"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"], [1, "main-resource"], ["mat-button", "", 1, "full-width", 3, "ngClass", "click"], ["cols", "2", "rowHeight", "28px", 3, "gutterSize"], ["class", "rounded-corner", 4, "ngFor", "ngForOf"], ["hideSingleSelectionIndicator", "true", 3, "multiple", 4, "ngIf"], ["mat-raised-button", "", 1, "raised-full-width-button", 3, "click"], ["color", "primary"], [1, "divider-container"], [1, "line"], [1, "divider"], [1, "text"], [1, "rounded-corner"], ["mat-button", "", 1, "full-width", "psicquic-button", 3, "ngClass", "click"], [1, "resource-name"], ["class", "spinner-color", "diameter", "20", 4, "ngIf"], ["diameter", "20", 1, "spinner-color"], ["hideSingleSelectionIndicator", "true", 3, "multiple"], ["class", "full-width", 3, "value", "selected", "ngClass", "click", 4, "ngFor", "ngForOf"], [1, "full-width", 3, "value", "selected", "ngClass", "click"], [1, "resource-name", "surface-variant"], ["mat-icon-button", "", 3, "click"]],
    template: function InteractorsComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](0, InteractorsComponent_ng_template_0_Template, 7, 1, "ng-template", null, 0, _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](2, "div", 1)(3, "mat-card", 2)(4, "mat-card-content")(5, "div", 3)(6, "button", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function InteractorsComponent_Template_button_click_6_listener() {
          return ctx.clearInteractors();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](7, "mat-icon", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](8, "clear");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](9, " Clear overlays ");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](10, InteractorsComponent_ng_container_10_Template, 1, 0, "ng-container", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](11, "div", 7)(12, "button", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function InteractorsComponent_Template_button_click_12_listener() {
          return ctx.getInteractors(ctx.INTACT_RESOURCE);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](13, "IntAct ");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](14, "button", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function InteractorsComponent_Template_button_click_14_listener() {
          return ctx.getInteractors(ctx.DISEASE_RESOURCE);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](15, "DisGeNet ");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](16, InteractorsComponent_ng_container_16_Template, 1, 0, "ng-container", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](17, "mat-grid-list", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](18, InteractorsComponent_mat_grid_tile_18_Template, 6, 5, "mat-grid-tile", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](19, InteractorsComponent_ng_container_19_Template, 1, 0, "ng-container", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](20, InteractorsComponent_mat_selection_list_20_Template, 2, 2, "mat-selection-list", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](21, "div", 3)(22, "button", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function InteractorsComponent_Template_button_click_22_listener() {
          return ctx.openCustomInteractorDialog();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](23, "mat-icon", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](24, "add");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](25, " Add overlay resource ");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()()()();
      }
      if (rf & 2) {
        const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵreference"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction1"](13, _c0, ctx.clear));
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction1"](15, _c1, ctx.clear));
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngTemplateOutlet", _r0)("ngTemplateOutletContext", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction0"](17, _c2));
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction1"](18, _c0, (ctx.currentResource == null ? null : ctx.currentResource.type) === ctx.ResourceType.STATIC));
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction1"](20, _c0, (ctx.currentResource == null ? null : ctx.currentResource.type) === ctx.ResourceType.DISGENET));
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngTemplateOutlet", _r0)("ngTemplateOutletContext", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction0"](22, _c3));
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("gutterSize", "5px");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngForOf", ctx.psicquicResources);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngTemplateOutlet", _r0)("ngTemplateOutletContext", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction0"](23, _c4));
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", (ctx.resourceTokens == null ? null : ctx.resourceTokens.length) != 0);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_8__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_8__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_8__.NgIf, _angular_common__WEBPACK_IMPORTED_MODULE_8__.NgTemplateOutlet, _angular_material_button__WEBPACK_IMPORTED_MODULE_9__.MatButton, _angular_material_button__WEBPACK_IMPORTED_MODULE_9__.MatIconButton, _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_10__.MatProgressSpinner, _angular_material_icon__WEBPACK_IMPORTED_MODULE_11__.MatIcon, _angular_material_list__WEBPACK_IMPORTED_MODULE_12__.MatSelectionList, _angular_material_list__WEBPACK_IMPORTED_MODULE_12__.MatListOption, _angular_material_divider__WEBPACK_IMPORTED_MODULE_13__.MatDivider, _angular_material_grid_list__WEBPACK_IMPORTED_MODULE_14__.MatGridList, _angular_material_grid_list__WEBPACK_IMPORTED_MODULE_14__.MatGridTile, _angular_material_card__WEBPACK_IMPORTED_MODULE_15__.MatCard, _angular_material_card__WEBPACK_IMPORTED_MODULE_15__.MatCardContent],
    styles: ["#interactor-container[_ngcontent-%COMP%] {\n  width: 100%;\n  background: var(--surface-variant);\n}\n\n.button-container[_ngcontent-%COMP%] {\n  padding: 4px 0;\n}\n\n.card[_ngcontent-%COMP%] {\n  background: var(--surface-variant);\n}\n\n.main-resource[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: row;\n  align-items: flex-start;\n  padding: 0px;\n  gap: 5px;\n}\n\n.full-width[_ngcontent-%COMP%] {\n  width: 100%;\n  color: var(--on-surface-variant) !important;\n  border-radius: 100px;\n  justify-content: flex-start;\n  height: 28px !important;\n}\n\n.raised-full-width-button[_ngcontent-%COMP%] {\n  width: 100%;\n  background: var(--surface);\n  color: var(--on-secondary-container);\n  border-radius: 100px;\n}\n\n  .psicquic-button .mdc-button__label {\n  display: flex;\n  justify-content: space-between;\n  width: 100%;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n}\n\n.resource-name[_ngcontent-%COMP%] {\n  width: 100%;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n\n\n\n.divider-container[_ngcontent-%COMP%] {\n  width: 100%;\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n  align-items: center;\n  padding-top: 6px;\n  padding-bottom: 6px;\n}\n\n.divider[_ngcontent-%COMP%] {\n  background: var(--outline);\n  --mat-divider-width: 2px;\n}\n\n.line[_ngcontent-%COMP%] {\n  flex: 1;\n}\n\n.text[_ngcontent-%COMP%] {\n  padding-left: 10px;\n  padding-right: 10px;\n  color: var(--on-surface-variant);\n}\n\n\n\n.spinner-color[_ngcontent-%COMP%]  circle {\n  stroke: var(--on-primary) !important;\n}\n\n\n\n\n\n.active-button[_ngcontent-%COMP%] {\n  background: var(--primary) !important;\n  color: var(--on-primary) !important;\n}\n\n.active-button[aria-selected=true][_ngcontent-%COMP%] {\n  background: var(--primary) !important;\n  color: var(--on-primary) !important;\n}\n\n\n\n.active-button[aria-selected=true][_ngcontent-%COMP%]   .resource-name[_ngcontent-%COMP%], .active-button[aria-selected=true][_ngcontent-%COMP%]   .resource-name[_ngcontent-%COMP%]   div[_ngcontent-%COMP%] {\n  color: var(--on-primary) !important;\n}\n\n\n\n.active-icon[_ngcontent-%COMP%] {\n  color: var(--on-primary);\n}\n\n.surface-variant[_ngcontent-%COMP%], .surface-variant[_ngcontent-%COMP%]   div[_ngcontent-%COMP%] {\n  color: var(--on-surface-variant) !important;\n}\n\n.rounded-corner[_ngcontent-%COMP%] {\n  border-radius: 100px;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvaW50ZXJhY3RvcnMvaW50ZXJhY3RvcnMuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxXQUFBO0VBQ0Esa0NBQUE7QUFDRjs7QUFFQTtFQUNFLGNBQUE7QUFDRjs7QUFFQTtFQUNFLGtDQUFBO0FBQ0Y7O0FBRUE7RUFDRSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSx1QkFBQTtFQUNBLFlBQUE7RUFDQSxRQUFBO0FBQ0Y7O0FBRUE7RUFDRSxXQUFBO0VBQ0EsMkNBQUE7RUFDQSxvQkFBQTtFQUNBLDJCQUFBO0VBQ0EsdUJBQUE7QUFDRjs7QUFFQTtFQUNFLFdBQUE7RUFDQSwwQkFBQTtFQUNBLG9DQUFBO0VBQ0Esb0JBQUE7QUFDRjs7QUFFQTtFQUNFLGFBQUE7RUFDQSw4QkFBQTtFQUNBLFdBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0FBQ0Y7O0FBRUE7RUFDRSxXQUFBO0VBQ0EsYUFBQTtFQUNBLDhCQUFBO0VBQ0EsbUJBQUE7QUFDRjs7QUFHQSxhQUFBO0FBQ0E7RUFDRSxXQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsdUJBQUE7RUFDQSxtQkFBQTtFQUNBLGdCQUFBO0VBQ0EsbUJBQUE7QUFBRjs7QUFHQTtFQUNFLDBCQUFBO0VBQ0Esd0JBQUE7QUFBRjs7QUFHQTtFQUNFLE9BQUE7QUFBRjs7QUFHQTtFQUNFLGtCQUFBO0VBQ0EsbUJBQUE7RUFDQSxnQ0FBQTtBQUFGOztBQUdBLGFBQUE7QUFDQTtFQUNFLG9DQUFBO0FBQUY7O0FBR0E7O0VBQUE7QUFHQTtFQUNFLHFDQUFBO0VBQ0EsbUNBQUE7QUFBRjs7QUFHQTtFQUNFLHFDQUFBO0VBQ0EsbUNBQUE7QUFBRjs7QUFHQSwrR0FBQTtBQUNBOztFQUVFLG1DQUFBO0FBQUY7O0FBR0Esb0dBQUE7QUFNQTtFQUNFLHdCQUFBO0FBTEY7O0FBUUE7O0VBRUUsMkNBQUE7QUFMRjs7QUFRQTtFQUNFLG9CQUFBO0FBTEYiLCJzb3VyY2VzQ29udGVudCI6WyIjaW50ZXJhY3Rvci1jb250YWluZXIge1xuICB3aWR0aDogMTAwJTtcbiAgYmFja2dyb3VuZDogdmFyKC0tc3VyZmFjZS12YXJpYW50KTtcbn1cblxuLmJ1dHRvbi1jb250YWluZXIge1xuICBwYWRkaW5nOiA0cHggMDtcbn1cblxuLmNhcmQge1xuICBiYWNrZ3JvdW5kOiB2YXIoLS1zdXJmYWNlLXZhcmlhbnQpO1xufVxuXG4ubWFpbi1yZXNvdXJjZXtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcbiAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XG4gIHBhZGRpbmc6IDBweDtcbiAgZ2FwOiA1cHg7XG59XG5cbi5mdWxsLXdpZHRoIHtcbiAgd2lkdGg6IDEwMCU7XG4gIGNvbG9yOiB2YXIoLS1vbi1zdXJmYWNlLXZhcmlhbnQpICFpbXBvcnRhbnQ7XG4gIGJvcmRlci1yYWRpdXM6IDEwMHB4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XG4gIGhlaWdodDogMjhweCAhaW1wb3J0YW50O1xufVxuXG4ucmFpc2VkLWZ1bGwtd2lkdGgtYnV0dG9uIHtcbiAgd2lkdGg6IDEwMCU7XG4gIGJhY2tncm91bmQ6IHZhcigtLXN1cmZhY2UpO1xuICBjb2xvcjogdmFyKC0tb24tc2Vjb25kYXJ5LWNvbnRhaW5lcik7XG4gIGJvcmRlci1yYWRpdXM6IDEwMHB4O1xufVxuXG46Om5nLWRlZXAgLnBzaWNxdWljLWJ1dHRvbiAubWRjLWJ1dHRvbl9fbGFiZWwge1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIHdpZHRoOiAxMDAlO1xuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcbn1cblxuLnJlc291cmNlLW5hbWUge1xuICB3aWR0aDogMTAwJTtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxuXG5cbi8qKiBEaXZpZGVyICovXG4uZGl2aWRlci1jb250YWluZXIge1xuICB3aWR0aDogMTAwJTtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIHBhZGRpbmctdG9wOiA2cHg7XG4gIHBhZGRpbmctYm90dG9tOiA2cHg7XG59XG5cbi5kaXZpZGVyIHtcbiAgYmFja2dyb3VuZDogdmFyKC0tb3V0bGluZSk7XG4gIC0tbWF0LWRpdmlkZXItd2lkdGg6IDJweDtcbn1cblxuLmxpbmUge1xuICBmbGV4OiAxO1xufVxuXG4udGV4dCB7XG4gIHBhZGRpbmctbGVmdDogMTBweDtcbiAgcGFkZGluZy1yaWdodDogMTBweDtcbiAgY29sb3I6IHZhcigtLW9uLXN1cmZhY2UtdmFyaWFudCk7XG59XG5cbi8qKiBTcGlubmVyICovXG4uc3Bpbm5lci1jb2xvcjo6bmctZGVlcCBjaXJjbGUge1xuICBzdHJva2U6IHZhcigtLW9uLXByaW1hcnkpICFpbXBvcnRhbnQ7XG59XG5cbi8qKlxuICAgSGlnaGxpZ2h0IHNlbGVjdGlvbiBieSBnaXZpbmcgYSBiYWNrZ3JvdW5kIGNvbG9yXG4gKi9cbi5hY3RpdmUtYnV0dG9uIHtcbiAgYmFja2dyb3VuZDogdmFyKC0tcHJpbWFyeSkgIWltcG9ydGFudDtcbiAgY29sb3I6IHZhcigtLW9uLXByaW1hcnkpICFpbXBvcnRhbnRcbn1cblxuLmFjdGl2ZS1idXR0b25bYXJpYS1zZWxlY3RlZD1cInRydWVcIl0ge1xuICBiYWNrZ3JvdW5kOiB2YXIoLS1wcmltYXJ5KSAhaW1wb3J0YW50O1xuICBjb2xvcjogdmFyKC0tb24tcHJpbWFyeSkgIWltcG9ydGFudDtcbn1cblxuLyogQ2hhbmdlIGJhY2tncm91bmQgY29sb3IgZm9yIG1hdCBsaXN0IG9wdGlvbiBieSB1c2luZyBhdHRyaWJ1dGUgYXJpYS1zZWxlY3RlZCBmb3IgY3VzdG9tIGludGVyYWN0b3IgcmVzb3VyY2UqL1xuLmFjdGl2ZS1idXR0b25bYXJpYS1zZWxlY3RlZD1cInRydWVcIl0gLnJlc291cmNlLW5hbWUsXG4uYWN0aXZlLWJ1dHRvblthcmlhLXNlbGVjdGVkPVwidHJ1ZVwiXSAucmVzb3VyY2UtbmFtZSBkaXYge1xuICBjb2xvcjogdmFyKC0tb24tcHJpbWFyeSkgIWltcG9ydGFudDtcbn1cblxuLyogUmVtb3ZlIHNlbGVjdGVkIGNvbG9yIGJ5IG92ZXJ3cml0aW5nIGRlZmF1bHQgcHJpbWFyeSBjb2xvciB3aGVuIHRoZXJlIGlzIG5vIGFjdGl2ZSBidXR0b24gY2xhc3MgKi9cbi8vbWF0LWxpc3Qtb3B0aW9uW2FyaWEtc2VsZWN0ZWQ9XCJ0cnVlXCJdIC5yZXNvdXJjZS1uYW1lLFxuLy9tYXQtbGlzdC1vcHRpb25bYXJpYS1zZWxlY3RlZD1cInRydWVcIl0gLnJlc291cmNlLW5hbWUgZGl2IHtcbi8vICBjb2xvcjogIzAwMFxuLy99XG5cbi5hY3RpdmUtaWNvbiB7XG4gIGNvbG9yOiB2YXIoLS1vbi1wcmltYXJ5KVxufVxuXG4uc3VyZmFjZS12YXJpYW50LFxuLnN1cmZhY2UtdmFyaWFudCBkaXYge1xuICBjb2xvcjogdmFyKC0tb24tc3VyZmFjZS12YXJpYW50KSAhaW1wb3J0YW50O1xufVxuXG4ucm91bmRlZC1jb3JuZXIge1xuICBib3JkZXItcmFkaXVzOiAxMDBweDtcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0= */"]
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

/***/ 4804:
/*!*******************************************************!*\
  !*** ./src/app/interactors/model/interactor.model.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   InputCategory: () => (/* binding */ InputCategory),
/* harmony export */   ResourceType: () => (/* binding */ ResourceType)
/* harmony export */ });
class InputCategory {}
var ResourceType;
(function (ResourceType) {
  ResourceType["STATIC"] = "IntAct";
  ResourceType["DISGENET"] = "DisGeNet";
  ResourceType["PSICQUIC"] = "PSICQUIC";
  ResourceType["CUSTOM"] = "custom";
})(ResourceType || (ResourceType = {}));

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
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common/http */ 4860);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 2513);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ 9736);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs */ 1891);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs */ 4980);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs */ 2389);
/* harmony import */ var _model_interactor_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../model/interactor.model */ 4804);
/* harmony import */ var _layout_interactors_layout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../layout/interactors-layout */ 538);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../environments/environment */ 553);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _services_diagram_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/diagram.service */ 378);








class InteractorService {
  constructor(http, diagramService) {
    this.http = http;
    this.diagramService = diagramService;
    this._PREFIX_INTERACTOR = `${_environments_environment__WEBPACK_IMPORTED_MODULE_2__.environment.host}/ContentService/interactors/`;
    this._PREFIX_DISEASE = `${_environments_environment__WEBPACK_IMPORTED_MODULE_2__.environment.host}/overlays/disgenet/`;
    this._STATIC_URL = this._PREFIX_INTERACTOR + 'static/molecules/details';
    this._PSICQUIC_RESOURCE_URL = this._PREFIX_INTERACTOR + 'psicquic/resources/';
    this._PSICQUIC_URL = this._PREFIX_INTERACTOR + 'psicquic/molecules/';
    this.UPLOAD_URL = this._PREFIX_INTERACTOR + 'upload/tuple/';
    this.UPLOAD_PSICQUIC_URL = this._PREFIX_INTERACTOR + 'upload/psicquic/url';
    this._TOKEN_URL = this._PREFIX_INTERACTOR + 'token/';
    this.DISGENET_URL = this._PREFIX_DISEASE + 'findByGenes';
    this.DEFAULT_INTERACTOR_WIDTH = 100;
    this.DEFAULT_DISGENET_WIDTH = 250;
    this.INTERACTOR_PADDING = 20;
    this.CHAR_WIDTH = 10;
    this.CHAR_HEIGHT = 12;
    this.GENE_DECORATION_HEIGHT = 20;
    this.identifiers = '';
    this.cyToSelectedResource = new Map();
    this.currentInteractorResourceSubject = new rxjs__WEBPACK_IMPORTED_MODULE_4__.Subject();
    this.currentInteractorResource$ = this.currentInteractorResourceSubject.asObservable();
  }
  setCurrentResource(r) {
    this.currentInteractorResourceSubject.next(r);
  }
  getIdentifiers(cy) {
    this.identifiers = this.getIdentifiersFromGraph(cy);
  }
  updateIdentifiers(cy) {
    const currentIdentifiers = this.getIdentifiersFromGraph(cy);
    if (!this.identifiers || !this.areSame(this.identifiers, currentIdentifiers)) {
      this.identifiers = currentIdentifiers;
    } else {
      this.getIdentifiers(cy);
    }
  }
  areSame(idsA, idsB) {
    const normalize = str => str.split(',').sort().join(',');
    return normalize(idsA) === normalize(idsB);
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
    this.updateIdentifiers(cy);
    let url;
    if (resource === _model_interactor_model__WEBPACK_IMPORTED_MODULE_0__.ResourceType.STATIC) {
      url = this._STATIC_URL;
    } else if (resource === _model_interactor_model__WEBPACK_IMPORTED_MODULE_0__.ResourceType.DISGENET) {
      url = this.DISGENET_URL;
    } else {
      url = this._PSICQUIC_URL + resource.toLowerCase() + '/details';
    }
    return this.http.post(url, this.identifiers, {
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_5__.HttpHeaders({
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
    const classes = resource === _model_interactor_model__WEBPACK_IMPORTED_MODULE_0__.ResourceType.DISGENET ? ['InteractorOccurrences', 'disease'] : ['InteractorOccurrences'];
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
  addInteractorNodes(occurrenceNode, cy) {
    const interactorsData = occurrenceNode.data('interactors');
    const resource = occurrenceNode.data('resource');
    _layout_interactors_layout__WEBPACK_IMPORTED_MODULE_1__["default"].BOX_WIDTH = resource === _model_interactor_model__WEBPACK_IMPORTED_MODULE_0__.ResourceType.DISGENET ? this.DEFAULT_DISGENET_WIDTH / 2 : this.DEFAULT_INTERACTOR_WIDTH / 2;
    const numberToAdd = _layout_interactors_layout__WEBPACK_IMPORTED_MODULE_1__["default"].getNumberOfInteractorsToDraw(interactorsData);
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
    for (let interactor of interactorsData) {
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
    const interactorLayout = new _layout_interactors_layout__WEBPACK_IMPORTED_MODULE_1__["default"]();
    interactorsData.forEach((interactor, index) => {
      const position = interactorLayout.getPosition(targetNode, index, numberToAdd);
      const displayName = interactor.alias ? interactor.alias : interactor.acc;
      const defaultType = ['Protein', 'PhysicalEntity']; // Default interactor type for custom resource when there is no type data provided
      const classes = resource === _model_interactor_model__WEBPACK_IMPORTED_MODULE_0__.ResourceType.DISGENET ? ['PhysicalEntity', 'Interactor', 'disease'] : [...(this.diagramService.nodeTypeMap.get(interactor.type) || defaultType), 'Interactor'];
      let width = resource === _model_interactor_model__WEBPACK_IMPORTED_MODULE_0__.ResourceType.DISGENET ? this.DEFAULT_DISGENET_WIDTH : this.DEFAULT_INTERACTOR_WIDTH;
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
            type: interactor.type || "Protein"
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
    const resourceClass = resource === _model_interactor_model__WEBPACK_IMPORTED_MODULE_0__.ResourceType.DISGENET ? ['Interactor', 'disease'] : ['Interactor'];
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
  clearAllInteractorNodes(cy) {
    this.cyToSelectedResource.clear();
    const interactorOcc = cy.elements(`.InteractorOccurrences`).remove();
    interactorOcc.forEach(node => {
      if (node.hasClass('opened')) {
        this.removeInteractorNodes(node);
      }
    });
  }
  getPsicquicResources() {
    return this.http.get(this._PSICQUIC_RESOURCE_URL, {
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_5__.HttpHeaders({
        'Content-Type': 'application/json;charset=UTF-8'
      })
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_6__.map)(psicquicResources => {
      return psicquicResources.filter(r => r.name !== _model_interactor_model__WEBPACK_IMPORTED_MODULE_0__.ResourceType.STATIC && r.active);
    }));
  }
  getInteractorsToken(name, url, body) {
    return this.http.post(url, body, {
      params: new _angular_common_http__WEBPACK_IMPORTED_MODULE_5__.HttpParams().set('name', name)
    });
  }
  /**
   * This method is used in custom dialog for retrieving interactors with a token , it first generates a token then
   * get interactors data from that token. There are different API calls based on user's selection to generate tokens.
   *
   * @param name custom resource name
   * @param url  different URLs, for instance, add data from a local file, the url will be UPLOAD_URL
   * @param body content
   * @param cy   cytoscape container
   */
  getInteractorsFromToken(name, url, body, cy) {
    this.updateIdentifiers(cy);
    return this.getInteractorsToken(name, url, body).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_7__.switchMap)(token => this.fetchCustomInteractors(token, cy)));
  }
  fetchCustomInteractors(token, cy) {
    this.updateIdentifiers(cy);
    return this.http.post(this._TOKEN_URL + token.summary.token, this.identifiers, {
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_5__.HttpHeaders({
        'Content-Type': 'text/plain'
      })
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_6__.map)(interactors => ({
      token: token,
      interactors: interactors
    })));
  }
  getResourceTypeStatic(resource) {
    if (resource === _model_interactor_model__WEBPACK_IMPORTED_MODULE_0__.ResourceType.STATIC) {
      return _model_interactor_model__WEBPACK_IMPORTED_MODULE_0__.ResourceType.STATIC;
    }
    if (resource === _model_interactor_model__WEBPACK_IMPORTED_MODULE_0__.ResourceType.DISGENET) {
      return _model_interactor_model__WEBPACK_IMPORTED_MODULE_0__.ResourceType.DISGENET;
    }
    // isFromPSICQUIC will be a function with a static dictionary to map to result, not Observable
    if (this.isFromPSICQUIC(resource)) {
      return _model_interactor_model__WEBPACK_IMPORTED_MODULE_0__.ResourceType.PSICQUIC;
    }
    // none of above then is custom
    if (this.isCustomResource(resource)) {
      return _model_interactor_model__WEBPACK_IMPORTED_MODULE_0__.ResourceType.CUSTOM;
    }
    return null;
  }
  getResourceType(resource) {
    if (resource === _model_interactor_model__WEBPACK_IMPORTED_MODULE_0__.ResourceType.STATIC) {
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_8__.of)(_model_interactor_model__WEBPACK_IMPORTED_MODULE_0__.ResourceType.STATIC);
    }
    if (resource === _model_interactor_model__WEBPACK_IMPORTED_MODULE_0__.ResourceType.DISGENET) {
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_8__.of)(_model_interactor_model__WEBPACK_IMPORTED_MODULE_0__.ResourceType.DISGENET);
    }
    return this.isFromPSICQUIC(resource).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_7__.switchMap)(isPsicquic => {
      if (isPsicquic) {
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_8__.of)(_model_interactor_model__WEBPACK_IMPORTED_MODULE_0__.ResourceType.PSICQUIC);
      }
      return this.isCustomResource(resource).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_6__.map)(isCustom => isCustom ? _model_interactor_model__WEBPACK_IMPORTED_MODULE_0__.ResourceType.CUSTOM : null));
    }), (0,rxjs__WEBPACK_IMPORTED_MODULE_9__.catchError)(() => (0,rxjs__WEBPACK_IMPORTED_MODULE_8__.of)(null)));
  }
  isFromPSICQUIC(resource) {
    if (!resource) {
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_8__.of)(false);
    }
    return this.getPsicquicResources().pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_6__.map)(psicquicResources => psicquicResources.some(pr => pr.name === resource && pr.name !== _model_interactor_model__WEBPACK_IMPORTED_MODULE_0__.ResourceType.STATIC)));
  }
  isCustomResource(resource) {
    if (!resource) {
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_8__.of)(false);
    }
    return this.getPsicquicResources().pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_6__.map)(psicquicResources => {
      const isPsicquic = psicquicResources.some(pr => pr.name === resource && pr.name !== _model_interactor_model__WEBPACK_IMPORTED_MODULE_0__.ResourceType.STATIC);
      return resource !== _model_interactor_model__WEBPACK_IMPORTED_MODULE_0__.ResourceType.STATIC && resource !== _model_interactor_model__WEBPACK_IMPORTED_MODULE_0__.ResourceType.DISGENET && !isPsicquic;
    }));
  }
  static #_ = this.ɵfac = function InteractorService_Factory(t) {
    return new (t || InteractorService)(_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_5__.HttpClient), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵinject"](_services_diagram_service__WEBPACK_IMPORTED_MODULE_3__.DiagramService));
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdefineInjectable"]({
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
/* harmony export */   AnalysisService: () => (/* binding */ AnalysisService),
/* harmony export */   PaletteSummary: () => (/* binding */ PaletteSummary)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 1891);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 4980);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ 3738);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ 2389);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../environments/environment */ 553);
/* harmony import */ var chroma_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! chroma-js */ 3062);
/* harmony import */ var chroma_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(chroma_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common/http */ 4860);
/* harmony import */ var _diagram_state_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./diagram-state.service */ 6742);






// type PaletteSummary = { name: Palette, scale: Scale, gradient: string };
class PaletteSummary {
  constructor(name) {
    this.name = name;
    this._scale = (0,chroma_js__WEBPACK_IMPORTED_MODULE_1__.scale)(name).mode('oklab');
    this.scale = this._scale;
    this.gradient = `linear-gradient(to right in oklab, ${chroma_js__WEBPACK_IMPORTED_MODULE_1__.brewer[this.name].join(', ')})`;
  }
  classes(n) {
    if (n > 0) {
      this.scale = this._scale.classes(n);
      this.gradient = `linear-gradient(to right in oklab, ${this.scale.colors(n).map((c, i) => `${c} ${i / n * 100}%, ${c} ${(i + 1) / n * 100}%`).join(', ')})`;
    } else {
      this.scale = this._scale;
      this.gradient = `linear-gradient(to right in oklab, ${chroma_js__WEBPACK_IMPORTED_MODULE_1__.brewer[this.name].join(', ')})`;
    }
  }
  domain(min, max) {
    this.scale = this.scale.domain([min, max]);
  }
}
class AnalysisService {
  constructor(http, state) {
    this.http = http;
    this.state = state;
    this.paletteOptions = new Map(Object.keys(chroma_js__WEBPACK_IMPORTED_MODULE_1__.brewer).filter(name => name.toLowerCase() !== name).map(name => [name, new PaletteSummary(name)]));
    this.palette = this.paletteOptions.get('RdBu');
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
    this.result$ = this.state.onChange.analysis$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.switchMap)(token => token !== null ? token === this.result?.summary.token ? (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.of)(this.result) :
    // Same token as cache => use cache
    this.loadAnalysis(token) // Different token than cache => load result
    : (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.of)(undefined) // No tokens => No results
    ));
  }

  clearAnalysis() {
    this.result = undefined;
    this.state.set('analysis', null);
  }
  analyse(data, params) {
    return this.http.post(`${_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.host}/AnalysisService/identifiers/projection`, data, {
      params
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_5__.tap)(result => this.result = result), (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.tap)(result => this.state.set('analysis', result.summary.token)));
  }
  loadAnalysis(token, params) {
    console.log('load analysis');
    return this.http.get(`${_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.host}/AnalysisService/token/${token || this.state.get('analysis')}`, {
      params
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_5__.tap)(result => this.result = result));
  }
  foundEntities(pathway, token, resource = 'TOTAL') {
    return this.http.get(`${_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.host}/AnalysisService/token/${token || this.state.get('analysis')}/found/all/${pathway}`, {
      params: {
        resource
      }
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_6__.catchError)(() => (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.of)({
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
    if (pathwayIds.length === 0) return (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.of)([]);
    return this.http.post(`${_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.host}/AnalysisService/token/${token || this.state.get('analysis')}/filter/pathways`, pathwayIds.join(','), {
      params: {
        resource
      }
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_6__.catchError)(() => (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.of)([])));
  }
  example(name) {
    return this.http.get(`assets/data/analysis-examples/${name}.tsv`, {
      responseType: 'text'
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.switchMap)(example => this.analyse(example)));
  }
  static #_ = this.ɵfac = function AnalysisService_Factory(t) {
    return new (t || AnalysisService)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_8__.HttpClient), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_diagram_state_service__WEBPACK_IMPORTED_MODULE_2__.DiagramStateService));
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineInjectable"]({
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
/* harmony import */ var _Users_eragueneau_WebstormProjects_pathway_browser_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 1670);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 8071);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 9736);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ 3317);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ 3738);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs */ 331);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ 7178);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../environments/environment */ 553);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/router */ 7947);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/common/http */ 4860);







class DiagramStateService {
  constructor(route, router, http) {
    var _this = this;
    this.router = router;
    this.http = http;
    this.propagate = false;
    this.state = {
      select: {
        otherTokens: ['SEL'],
        value: ''
      },
      flag: {
        otherTokens: ['FLG'],
        value: []
      },
      path: {
        otherTokens: ['PATH'],
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
    this._state$ = new rxjs__WEBPACK_IMPORTED_MODULE_3__.BehaviorSubject(this.state);
    this.state$ = this._state$.asObservable();
    this.onChange = Object.keys(this.state).reduce((properties, prop) => {
      properties[`${prop}$`] = this.state$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_4__.map)(state => state[prop].value), (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.distinctUntilChanged)((v1, v2) => v1?.toString() === v2?.toString()), (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.tap)(v => console.log(`${prop} has been updated to ${v}`)));
      return properties;
    }, {});
    route.queryParamMap.subscribe( /*#__PURE__*/function () {
      var _ref = (0,_Users_eragueneau_WebstormProjects_pathway_browser_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (params) {
        for (const mainToken in _this.state) {
          const param = _this.state[mainToken];
          const tokens = [mainToken, ...(param.otherTokens || [])];
          const token = tokens.find(token => params.has(token));
          if (token) {
            const formerValue = param.value;
            let value = params.get(token);
            if ((0,lodash__WEBPACK_IMPORTED_MODULE_1__.isArray)(param.value)) {
              const rawValue = value;
              param.value = rawValue.split(',').map(v => v.charAt(0).match(/\d/) ? parseInt(v) : v);
              const hasDbIds = param.value.some(lodash__WEBPACK_IMPORTED_MODULE_1__.isNumber);
              if (hasDbIds) {
                param.value = yield Promise.all(param.value.map(v => _this.ensureStId(v)));
                _this.set(mainToken, param.value);
              }
            } else if ((0,lodash__WEBPACK_IMPORTED_MODULE_1__.isBoolean)(param.value)) {
              param.value = value === 'true';
            } else if (value.charAt(0).match(/\d/)) {
              _this.set(mainToken, yield _this.dbIdToStId(parseInt(value)));
            } else {
              param.value = value;
            }
          }
        }
        if (_this.propagate) _this._state$.next(_this.state);
      });
      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());
  }
  ensureStId(id) {
    var _this2 = this;
    return (0,_Users_eragueneau_WebstormProjects_pathway_browser_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      return (0,lodash__WEBPACK_IMPORTED_MODULE_1__.isNumber)(id) ? _this2.dbIdToStId(id) : id;
    })();
  }
  dbIdToStId(dbId) {
    var _this3 = this;
    return (0,_Users_eragueneau_WebstormProjects_pathway_browser_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_7__.firstValueFrom)(_this3.http.get(`${_environments_environment__WEBPACK_IMPORTED_MODULE_2__.environment.host}/ContentService/data/query/${dbId}/stId`, {
        responseType: "text"
      }));
    })();
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
    return new (t || DiagramStateService)(_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_10__.HttpClient));
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineInjectable"]({
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
      const subpathwayStIdToEventIds = new Map(graph.subpathways?.map(subpathway => [subpathway.stId, subpathway.events]));
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
        let subpathways = [...subpathwayStIdToEventIds.entries()].flatMap(([subpathwayId, events]) => events.includes(item.reactomeId) ? [subpathwayId] : []);
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
            subpathways: subpathways,
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

/***/ 1457:
/*!*******************************************!*\
  !*** ./src/app/services/event.service.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EventService: () => (/* binding */ EventService)
/* harmony export */ });
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../environments/environment */ 553);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 8071);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 2513);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ 9736);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ 1891);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs */ 4980);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs */ 3839);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs */ 2607);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! rxjs */ 4300);
/* harmony import */ var _utils_JSOGDeserializer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/JSOGDeserializer */ 5047);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/common/http */ 4860);
/* harmony import */ var _diagram_state_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./diagram-state.service */ 6742);






class EventService {
  constructor(http, state) {
    this.http = http;
    this.state = state;
    this._TOP_LEVEL_PATHWAYS = `${_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.host}/ContentService/data/pathways/top/`;
    this._ENHANCED_QUERY = `${_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.host}/ContentService/data/query/enhanced/`;
    this._DATA_QUERY = `${_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.host}/ContentService/data/query/`;
    this._ANCESTORS = `${_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.host}/ContentService/data/event/`;
    this.treeData$ = new rxjs__WEBPACK_IMPORTED_MODULE_3__.BehaviorSubject([]);
    this._selectedTreeEvent = new rxjs__WEBPACK_IMPORTED_MODULE_4__.Subject();
    this.selectedTreeEvent$ = this._selectedTreeEvent.asObservable();
    this._selectedObj = new rxjs__WEBPACK_IMPORTED_MODULE_4__.Subject();
    this.selectedObj$ = this._selectedObj.asObservable();
    this._breadcrumbsSubject = new rxjs__WEBPACK_IMPORTED_MODULE_4__.Subject();
    this.breadcrumbs$ = this._breadcrumbsSubject.asObservable();
    this._subpathwaysColors = new rxjs__WEBPACK_IMPORTED_MODULE_3__.BehaviorSubject(new Map());
    this.subpathwaysColors$ = this._subpathwaysColors.asObservable();
    this._loadTreeEvent = new rxjs__WEBPACK_IMPORTED_MODULE_4__.Subject();
    this.loadTreeEvent$ = this._loadTreeEvent.asObservable();
    this.hasChild = (_, event) => !!event.hasEvent && event.hasEvent.length > 0 || ['TopLevelPathway', 'Pathway', 'CellLineagePath'].includes(event.schemaClass);
  }
  setTreeData(events) {
    this.treeData$.next(events);
  }
  setCurrentTreeEvent(event) {
    this._selectedTreeEvent.next(event);
  }
  setCurrentObj(event) {
    this._selectedObj.next(event);
  }
  setCurrentEventAndObj(event, obj) {
    this.setCurrentTreeEvent(event);
    this.setCurrentObj(obj);
  }
  setBreadcrumbs(events) {
    this._breadcrumbsSubject.next(events);
  }
  setSubpathwaysColors(colorMap) {
    this._subpathwaysColors.next(colorMap);
  }
  loadTreeEvent(event) {
    this._loadTreeEvent.next(event);
  }
  fetchTlpBySpecies(taxId) {
    let url = `${this._TOP_LEVEL_PATHWAYS}${taxId}`;
    return this.http.get(url);
  }
  fetchEventAncestors(stId) {
    let url = `${this._ANCESTORS}${stId}/ancestors`;
    return this.http.get(url);
  }
  fetchEnhancedEventData(stId) {
    let url = `${this._ENHANCED_QUERY}${stId}?includeRef=true`;
    return this.http.get(url).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_5__.map)(response => {
      const deserializer = new _utils_JSOGDeserializer__WEBPACK_IMPORTED_MODULE_1__.JSOGDeserializer();
      const resolvedResponse = deserializer.deserialize(response);
      return resolvedResponse;
    }));
  }
  fetchEventData(stId) {
    let url = `${this._DATA_QUERY}${stId}`;
    return this.http.get(url).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_5__.map)(response => {
      const deserializer = new _utils_JSOGDeserializer__WEBPACK_IMPORTED_MODULE_1__.JSOGDeserializer();
      const resolvedResponse = deserializer.deserialize(response);
      return resolvedResponse;
    }));
  }
  fetchChildrenEvents(event, treeNodes) {
    return this.fetchEnhancedEventData(event.stId).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_6__.switchMap)(result => {
      if (result.hasEvent) {
        event.hasEvent = result.hasEvent.map(child => {
          child.ancestors = [...(event.ancestors || []), event];
          child.parent = event;
          return child;
        });
        this.setTreeData(treeNodes); // Update tree data
        return this.subpathwaysColors$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_5__.map)(colors => [event, result, colors || new Map()]));
      } else {
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_7__.of)([event, result, new Map()]);
      }
    }));
  }
  /** Adjust tree structure based on selection from diagram
   *
   *  Entity
   *  - No need to rebuild the tree, but requires to update the currentTreeEvent(diagram tree event) and currentObj (entity), selection and expandedTree status
   *
   *  Reaction
   *  - No need to rebuild the tree it is viable, if not we have to rebuild the tree to include it, update currentTreeEvent(Reaction) and currentObj (Reaction). selection and expandedTree status
   *
   *  Pathway
   *  - Subpathway, no need to build the tree, update currentTreeEvent(subpathway) and currentObj(subpathway)
   *  - Interacting pathway, rebuild the tree, clear previous selection, update currentTreeEvent(interacting pathway) and currentObj(interacting pathway), selection and expandedTree status
   *
   */
  adjustTreeFromDiagramSelection(enhancedEvent, diagramId, subpathwayColors, treeControl, treeNodes) {
    // All visible tree nodes
    const allVisibleTreeNodes = this.getAllVisibleTreeNodes(treeControl, treeNodes);
    if (this.isEntity(enhancedEvent)) {
      return this.handleEntitySelectionFromDiagram(enhancedEvent, diagramId, allVisibleTreeNodes, treeControl);
    } else if (this.isReaction(enhancedEvent)) {
      return this.handleReactionSelectionFromDiagram(enhancedEvent, diagramId, allVisibleTreeNodes, treeControl, subpathwayColors);
    } else if (this.isPathwayWithDiagram(enhancedEvent)) {
      // treeControl.collapseAll(); //todo: should we collapse all?
      return this.handlePathwaySelectionFromDiagram(enhancedEvent, diagramId, allVisibleTreeNodes, treeControl, subpathwayColors, allVisibleTreeNodes);
    } else {
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_7__.of)(this.treeData$.value);
    }
  }
  handleEntitySelectionFromDiagram(event, diagramId, allVisibleTreeNodes, treeControl) {
    const diagramTreeEvent = allVisibleTreeNodes.find(node => node.stId === diagramId);
    if (diagramTreeEvent) {
      return this.handleExistingEventSelection(diagramTreeEvent, treeControl, allVisibleTreeNodes).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_5__.map)(([treeData, treeEvent]) => {
        this.setCurrentEventAndObj(diagramTreeEvent, event);
        return treeData;
      }));
    } else {
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_7__.of)(this.treeData$.value);
    }
  }
  handleReactionSelectionFromDiagram(event, diagramId, allVisibleTreeNodes, treeControl, subpathwayColors) {
    if (!this.isEventVisible(event, allVisibleTreeNodes)) {
      return this.buildTreeWithSelectedEvent(event, diagramId, true, treeControl, subpathwayColors).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_5__.map)(treeData => {
        this.setCurrentEventAndObj(event, event);
        return treeData;
      }));
    } else {
      return this.handleExistingEventSelection(event, treeControl, allVisibleTreeNodes).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_5__.map)(([treeData, event]) => {
        this.setCurrentEventAndObj(event, event); //todo: this.setCurrentEventAndObj(treeEvent, event)?
        return treeData;
      }));
    }
  }
  handlePathwaySelectionFromDiagram(event, diagramId, allVisibleTreeNodes, treeControl, subpathwayColors, treeNodes) {
    // Interacting pathway, not visible in the tree view
    if (!this.isEventVisible(event, allVisibleTreeNodes)) {
      this.clearAllSelectedEvents(treeNodes);
      return this.buildTreeWithSelectedEvent(event, diagramId, true, treeControl, subpathwayColors).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_5__.map)(treeData => {
        return treeData;
      }));
    } else {
      // Subpathway, already in the tree view
      return this.handleExistingEventSelection(event, treeControl, allVisibleTreeNodes).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_5__.map)(([treeData, event]) => {
        this.setCurrentEventAndObj(event, event); //todo: this.setCurrentEventAndObj(treeEvent, event)?
        return treeData;
      }));
    }
  }
  isEventVisible(event, allVisibleTreeNodes) {
    return allVisibleTreeNodes.map(e => e.stId).includes(event.stId);
  }
  isPathwayWithDiagram(event) {
    return this.eventHasChild(event) && event.hasDiagram;
  }
  clearAllSelectedEvents(events) {
    events.forEach(event => {
      event.isSelected = false;
      if (event.hasEvent) {
        this.clearAllSelectedEvents(event.hasEvent);
      }
    });
  }
  buildTree(event, diagramId, treeControl, subpathwayColors) {
    if (this.isEntity(event)) {
      return this.buildTreeWithSelectedEntity(event, diagramId, treeControl, subpathwayColors);
    } else {
      return this.buildTreeWithSelectedEvent(event, diagramId, false, treeControl, subpathwayColors);
    }
  }
  // Build tree with diagram event ancestors
  buildTreeWithSelectedEntity(event, diagramId, treeControl, subpathwayColors) {
    this.setCurrentObj(event);
    return this.fetchEnhancedEventData(diagramId).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_6__.switchMap)(() => this.fetchEventAncestors(diagramId)), (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.map)(ancestors => this.getAndExpandAncestors(ancestors, treeControl)), (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.switchMap)(ancestors => this.buildTreeWithAncestors(ancestors, diagramId, event.stId, subpathwayColors)), (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.map)(([colors, tree]) => {
      this.setTreeData(tree);
      return tree;
    }));
  }
  /**?
   * Build tree with event ancestors
   * @param event
   * @param diagramId
   * @param isFromDiagram  Behaves differently based on the calling method, avoid the check for isPathwayWithDiagram(event) when calling it from handlePathwaySelectionFromDiagram,
   *                       we want to open the ancestors in the tree view when select an interacting pathway in diagram, but not when first load for an interacting pathway from URL.
   */
  buildTreeWithSelectedEvent(event, diagramId, isFromDiagram, treeControl, subpathwayColors) {
    // When selected event is a subpathway or interacting pathway
    const idToBuild = isFromDiagram ? event.stId : this.isPathwayWithDiagram(event) ? diagramId : event.stId;
    this.setCurrentObj(event);
    return this.fetchEventAncestors(idToBuild).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_5__.map)(ancestors => this.getAndExpandAncestors(ancestors, treeControl)), (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.switchMap)(ancestors => this.buildTreeWithAncestors(ancestors, diagramId, event.stId, subpathwayColors)), (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.map)(([colors, tree]) => {
      this.setTreeData(tree);
      return tree;
    }));
  }
  // Select any reaction, subpathway and interacting pathway from diagram
  handleExistingEventSelection(event, treeControl, flatTreeNodes) {
    return this.fetchEventAncestors(event.stId).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_5__.map)(ancestors => {
      console.log('ancestors in handleExisting Event selection', ancestors);
      const finalAncestor = this.getAndExpandAncestors(ancestors, treeControl);
      // Create a Set to store the stIds from ancestors for quick lookup
      const ancestorStIds = new Set(finalAncestor.map(ancestor => ancestor.stId));
      console.log('ancestorStIds ', ancestorStIds);
      // Loop through the treeNodes and check if the stId exists in the Set
      flatTreeNodes.forEach(treeNode => {
        treeNode.isSelected = ancestorStIds.has(treeNode.stId);
      });
      event.ancestors = finalAncestor;
      event.parent = finalAncestor[finalAncestor.length - 2];
      this.setTreeData(this.treeData$.value);
      this.setBreadcrumbs(finalAncestor);
      return [this.treeData$.value, event];
    }));
  }
  buildTreeWithAncestors(ancestors, diagramId, selectedIdFromUrl, subpathwayColors) {
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_8__.combineLatest)([this.subpathwaysColors$, this.buildNestedTree(this.treeData$.value, ancestors, diagramId, selectedIdFromUrl, subpathwayColors)]);
  }
  /**
   * This method is building a nested tree dynamically by giving the roots and ancestors,
   * the currentLevel will always be the TLPs at very beginning,and we find the matched event in ancestors,
   * build the hierarchy structure from parent to child. At the same time, it sends another API call to get children for each item in
   * ancestors.
   * @param roots  TLPs
   * @param ancestors A list of lists of Events, it only contains one list, so we take [0].
   *                  The ancestors is a list of events from child to parent in the API calls,
   *                  But here is from parent to child,no need to use reverse() with ancestors[0]
   * @param diagramId The diagramId which is used for adding subpathway colors
   * @param selectedIdFromUrl The selected event id
   * @param subpathwayColors colors maps, dbId as key, colors as value, `{69481 => "#cc0000"}`
   *
   */
  buildNestedTree(roots, ancestors, diagramId, selectedIdFromUrl, subpathwayColors) {
    console.log('BuildNestedTree with data ', roots, 'and ancestors ', ancestors);
    const tree = [...roots];
    const nestedTree = ancestors.reduce((acc, event, index, array) => {
      const isLast = index === array.length - 1;
      return acc.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_9__.mergeMap)(currentLevel => {
        const existingEvent = currentLevel.find(e => e.dbId === event.dbId);
        if (existingEvent) {
          return this.fetchEnhancedEventData(event.stId).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_5__.map)(children => {
            existingEvent.hasEvent = children.hasEvent?.map(child => {
              child.ancestors = [...(existingEvent.ancestors || []), existingEvent];
              child.parent = existingEvent;
              this.setBreadcrumbs([...child.ancestors]);
              return child;
            });
            // Highlight selected event
            if (selectedIdFromUrl) {
              existingEvent.hasEvent?.forEach(child => {
                if (selectedIdFromUrl === child.stId) {
                  child.isSelected = true;
                  this.setBreadcrumbs([...child.ancestors, child]);
                }
              });
            }
            // Highlight selected event's parent when loading from URL
            existingEvent.isSelected = true;
            if (existingEvent.stId === diagramId) {
              this.setSubpathwayColors(existingEvent, subpathwayColors);
            }
            if (isLast) {
              this.setCurrentTreeEvent(existingEvent);
            }
            return existingEvent.hasEvent;
          }));
        } else {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_7__.of)([]);
        }
      }));
    }, (0,rxjs__WEBPACK_IMPORTED_MODULE_7__.of)(tree));
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_10__.forkJoin)([nestedTree]).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_5__.map)(() => {
      return tree;
    }));
  }
  setSubpathwayColors(event, colors) {
    if (colors && event.hasEvent) {
      event.hasEvent.forEach(e => {
        if (e.schemaClass === 'Pathway' && !e.hasDiagram) {
          e.color = colors.get(e.dbId);
        }
      });
    }
  }
  getAndExpandAncestors(ancestors, treeControl) {
    const pathIds = this.state.get('path');
    let finalAncestor;
    // When path is given through URL, this link is from Location in PWB on detail page
    if (pathIds && ancestors.length > 1) {
      finalAncestor = this.findMatchingAncestor(ancestors, pathIds);
      if (finalAncestor) {
        this.expandAllAncestors(finalAncestor, treeControl);
      }
    } else {
      // take the first ancestor if no path is given
      finalAncestor = ancestors[0];
      this.expandAllAncestors(ancestors[0], treeControl);
    }
    return finalAncestor;
  }
  findMatchingAncestor(ancestors, pathIds) {
    for (const ancestorArray of ancestors) {
      const allIdsFromAncestor = ancestorArray.map(event => event.stId);
      // Check if pathIds are in the current ancestor array
      const containsAll = pathIds.every(id => allIdsFromAncestor.includes(id));
      if (containsAll) {
        return ancestorArray;
      }
    }
    // Use first ancestor if returns null
    return ancestors[0];
  }
  expandAllAncestors(ancestors, treeControl) {
    ancestors.reverse().forEach(ancestor => treeControl.expand(ancestor));
  }
  getPathIds(diagramId, ancestors) {
    const stIds = [];
    for (const a of ancestors) {
      if (a.stId === diagramId) {
        break; // Stop before adding the target event to the result
      }

      stIds.push(a.stId);
    }
    return stIds;
  }
  setPath(diagramId, ancestors) {
    const ids = this.getPathIds(diagramId, ancestors);
    this.state.set('path', ids);
  }
  // Flatten tree and return all visible tree nodes
  getAllVisibleTreeNodes(treeControl, treeNodes) {
    const visibleTreeNodes = [];
    const addVisibleNodes = node => {
      // Add the current node to the visible nodes
      visibleTreeNodes.push(node);
      // If the node is expanded, recursively check its children
      if (treeControl.isExpanded(node) && node.hasEvent) {
        node.hasEvent.forEach(child => addVisibleNodes(child));
      }
    };
    // Start from the root nodes
    treeNodes.forEach(rootNode => addVisibleNodes(rootNode));
    return visibleTreeNodes;
  }
  // A collection of all expanded tree node and its children
  getExpandedTreeWithChildrenNodes(treeControl, treeNodes) {
    const expandedTreeNodes = [];
    const tlpStId = treeControl.expansionModel.selected[0];
    const addVisibleNodes = node => {
      expandedTreeNodes.push(node);
      if (treeControl.isExpanded(node) && node.hasEvent) {
        node.hasEvent.forEach(child => addVisibleNodes(child));
      }
    };
    const rootTree = treeNodes.find(node => node.stId === tlpStId);
    if (rootTree) {
      addVisibleNodes(rootTree);
    }
    return expandedTreeNodes;
  }
  flattenTree(data) {
    const flatTreeData = [];
    const flatten = nodes => {
      nodes.forEach(node => {
        flatTreeData.push(node);
        if (node.hasEvent) {
          flatten(node.hasEvent);
        }
      });
    };
    flatten(data);
    return flatTreeData;
  }
  findEvent(stId, events) {
    const flatData = this.flattenTree(events);
    return flatData.find(node => node.stId === stId);
  }
  //todo : rename it
  eventHasChild(event) {
    return this.hasChild(0, event);
  }
  isEntity(event) {
    return !this.eventHasChild(event) && !this.isReaction(event);
  }
  isReaction(event) {
    return ['Reaction', 'BlackBoxEvent', 'CellDevelopmentStep'].includes(event.schemaClass);
  }
  static #_ = this.ɵfac = function EventService_Factory(t) {
    return new (t || EventService)(_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_12__.HttpClient), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵinject"](_diagram_state_service__WEBPACK_IMPORTED_MODULE_2__.DiagramStateService));
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdefineInjectable"]({
    token: EventService,
    factory: EventService.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 4828:
/*!*********************************************!*\
  !*** ./src/app/services/species.service.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SpeciesService: () => (/* binding */ SpeciesService)
/* harmony export */ });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ 4860);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 8071);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 3738);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ 9736);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../environments/environment */ 553);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _diagram_state_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./diagram-state.service */ 6742);






class SpeciesService {
  constructor(http, state) {
    this.http = http;
    this.state = state;
    this._MAIN_SPECIES = `${_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.host}/ContentService/data/species/main`;
    this._ORTHOLOGIES = `${_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.host}/ContentService/data/orthologies/ids/species/`;
    this.defaultSpecies = {
      displayName: 'Homo sapiens',
      taxId: '9606',
      dbId: 48887,
      shortName: 'H.sapiens'
    };
    this._currentSpeciesSubject = new rxjs__WEBPACK_IMPORTED_MODULE_2__.BehaviorSubject(this.defaultSpecies);
    this.currentSpecies$ = this._currentSpeciesSubject.asObservable();
    this.orthologousMap = {};
    this._ignore = false; // ignore the changes from species
    /**
     * This map is to help get current species value from the diagramId string when loading data. For instance:
     *  diagramId = R-HSA-4090294 then current species is H.sapiens, and then it will be selected in the species list
     */
    this.abbreviationToSpecies = new Map([['HSA', {
      displayName: 'Homo sapiens',
      taxId: '9606',
      dbId: 48887,
      shortName: 'H.sapiens'
    }], ['BTA', {
      displayName: 'Bos taurus',
      taxId: '9913',
      dbId: 48898,
      shortName: 'B.taurus'
    }], ['CEL', {
      displayName: 'Caenorhabditis elegans',
      taxId: '6239',
      dbId: 68320,
      shortName: 'C.elegans'
    }], ['CFA', {
      displayName: 'Canis familiaris',
      taxId: '9615',
      dbId: 49646,
      shortName: 'C.familiaris'
    }], ['DRE', {
      displayName: 'Danio rerio',
      taxId: '7955',
      dbId: 68323,
      shortName: 'D.rerio'
    }], ['DDI', {
      displayName: 'Dictyostelium discoideum',
      taxId: '44689',
      dbId: 170941,
      shortName: 'D.discoideum'
    }], ['DME', {
      displayName: 'Drosophila melanogaster',
      taxId: '7227',
      dbId: 56210,
      shortName: 'D.melanogaster'
    }], ['GGA', {
      displayName: 'Gallus gallus',
      taxId: '9031',
      dbId: 49591,
      shortName: 'G.gallus'
    }], ['MMU', {
      displayName: 'Mus musculus',
      taxId: '10090',
      dbId: 48892,
      shortName: 'M.musculus'
    }], ['MTU', {
      displayName: 'Mycobacterium tuberculosis',
      taxId: '1773',
      dbId: 176806,
      shortName: 'M.tuberculosis'
    }], ['PFA', {
      displayName: 'Plasmodium falciparum',
      taxId: '5833',
      dbId: 170928,
      shortName: 'P.falciparum'
    }], ['RNO', {
      displayName: 'Rattus norvegicus',
      taxId: '10116',
      dbId: 48895,
      shortName: 'R.Rorvegicus'
    }], ['SCE', {
      displayName: 'Saccharomyces cerevisiae',
      taxId: '4932',
      dbId: 68322,
      shortName: 'S.cerevisiae'
    }], ['SPO', {
      displayName: 'Schizosaccharomyces pombe',
      taxId: '4896',
      dbId: 68324,
      shortName: 'S.pombe'
    }], ['SSC', {
      displayName: 'Sus scrofa',
      taxId: '99823',
      dbId: 49633,
      shortName: 'S.scrofa'
    }], ['XTR', {
      displayName: 'Xenopus tropicalis',
      taxId: '8364',
      dbId: 205621,
      shortName: 'X.tropicalis'
    }]]);
  }
  setIgnore(value) {
    this._ignore = value;
  }
  getIgnore() {
    return this._ignore;
  }
  getSpecies() {
    return this.http.get(this._MAIN_SPECIES, {
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_3__.HttpHeaders({
        'Content-Type': 'application/json;charset=UTF-8'
      })
    });
  }
  getOrthologousMap(identifiers, speciesDbId) {
    const url = `${this._ORTHOLOGIES}${speciesDbId}`;
    return this.http.post(url, identifiers, {
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_3__.HttpHeaders({
        'Content-Type': 'text/plain'
      })
    });
  }
  setShortName(s) {
    const parts = s.displayName.split(' ');
    // If there are not exactly two parts, return the original string
    if (parts.length !== 2) {
      throw new Error('Invalid species name format. Expected "Genus species".');
    }
    const genus = parts[0];
    const species = parts[1];
    s.shortName = `${genus.charAt(0)}.${species}`;
  }
  setCurrentSpecies(species) {
    this._currentSpeciesSubject.next(species);
  }
  setSpeciesFromDiagramId(diagramId) {
    // Find the value between the hyphens
    const speciesTerm = diagramId.match(/-(.*?)-/);
    let species;
    if (speciesTerm) {
      // speciesTerm[0] = -HSA-, speciesTerm[0] = HSA
      species = this.abbreviationToSpecies.get(`${speciesTerm[1]}`);
      if (species) {
        this.setCurrentSpecies(species);
      }
    }
  }
  getOrthologyEventStId(species, selectedId, ancestors, ids) {
    // Only need to post all ids from URL, however the API call requires dbId as content, that's why ancestors is here
    const idsToPost = [];
    ancestors.forEach(a => {
      if (ids.includes(a.stId)) {
        idsToPost.push(a.dbId);
      }
    });
    const speciesDbId = species.dbId;
    let newSelectedId = '';
    return this.getOrthologousMap(idsToPost.join(','), speciesDbId).pipe(
    // can't send array to API call
    (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.tap)(response => {
      this.orthologousMap = response;
      if (this.orthologousMap[selectedId]) {
        newSelectedId = this.orthologousMap[selectedId].stId;
      } else {
        newSelectedId = '';
      }
    }), (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.map)(() => newSelectedId));
  }
  getIdsFromURL(diagramId) {
    let ids = [];
    ids.push(diagramId);
    if (this.state.get('select')) {
      ids.push(this.state.get('select'));
    }
    if (this.state.get('path')) {
      ids = ids.concat(this.state.get('path'));
    }
    return ids;
  }
  updateQueryParams(paramNames, selectedId, abbreviation, route) {
    // Create a new params object from the current query parameters
    const newParams = {
      ...route.snapshot.queryParams
    };
    paramNames.forEach(param => {
      const value = newParams[param];
      const updateValue = str => str.replace(/-(.*?)-/, `-${abbreviation}-`);
      if (value) {
        if (param === 'select') {
          if (selectedId) {
            newParams[param] = updateValue(value);
          } else {
            // Remove 'select' if selectedId is empty
            // delete newParams[param];
            newParams[param] = '';
          }
        } else if (param === 'path') {
          newParams[param] = value.split(',').map(s => updateValue(s)).join(',');
        } else {
          newParams[param] = updateValue(value);
        }
      }
    });
    return newParams;
  }
  static #_ = this.ɵfac = function SpeciesService_Factory(t) {
    return new (t || SpeciesService)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_3__.HttpClient), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_diagram_state_service__WEBPACK_IMPORTED_MODULE_1__.DiagramStateService));
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineInjectable"]({
    token: SpeciesService,
    factory: SpeciesService.ɵfac,
    providedIn: 'root'
  });
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

/***/ 9853:
/*!**********************************************!*\
  !*** ./src/app/species/species.component.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SpeciesComponent: () => (/* binding */ SpeciesComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! tslib */ 2321);
/* harmony import */ var _ngneat_until_destroy__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ngneat/until-destroy */ 2813);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _services_species_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/species.service */ 4828);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ 7947);
/* harmony import */ var _services_diagram_state_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/diagram-state.service */ 6742);
/* harmony import */ var _services_event_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/event.service */ 1457);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ 6575);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/icon */ 6515);
/* harmony import */ var _angular_material_list__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/list */ 3228);










function SpeciesComponent_mat_list_option_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "mat-list-option", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function SpeciesComponent_mat_list_option_2_Template_mat_list_option_click_0_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r3);
      const s_r1 = restoredCtx.$implicit;
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r2.onSpeciesChange(s_r1));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](2, "mat-icon", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const s_r1 = ctx.$implicit;
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("value", s_r1)("selected", s_r1.taxId === ctx_r0.currentSpecies.taxId);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpropertyInterpolate"]("svgIcon", s_r1.taxId);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](s_r1.displayName);
  }
}
let SpeciesComponent = class SpeciesComponent {
  constructor(speciesService, router, route, state, eventService) {
    this.speciesService = speciesService;
    this.router = router;
    this.route = route;
    this.state = state;
    this.eventService = eventService;
    this.allSpecies = [];
    this.diagramId = '';
    this.visibility = {
      species: false,
      interactor: false
    };
  }
  ngAfterViewInit() {
    this.getSpecies();
    if (this.diagramId) {
      this.speciesService.setSpeciesFromDiagramId(this.diagramId);
    }
    this.speciesService.currentSpecies$.pipe((0,_ngneat_until_destroy__WEBPACK_IMPORTED_MODULE_4__.untilDestroyed)(this)).subscribe(species => {
      this.currentSpecies = species;
    });
    this.eventService.selectedTreeEvent$.pipe((0,_ngneat_until_destroy__WEBPACK_IMPORTED_MODULE_4__.untilDestroyed)(this)).subscribe(event => {
      this.selectedTreeEvent = event;
    });
    this.eventService.selectedObj$.pipe((0,_ngneat_until_destroy__WEBPACK_IMPORTED_MODULE_4__.untilDestroyed)(this)).subscribe(event => {
      this.selectedObj = event;
    });
  }
  getSpecies() {
    this.speciesService.getSpecies().subscribe(species => {
      // Alphabetical order
      const sortedSpecies = [...species].sort((a, b) => a.displayName.localeCompare(b.displayName));
      sortedSpecies.forEach(s => this.speciesService.setShortName(s));
      this.allSpecies = sortedSpecies;
    });
  }
  onSpeciesChange(species) {
    const ids = this.speciesService.getIdsFromURL(this.diagramId);
    this.currentSpecies = species;
    this.speciesService.setCurrentSpecies(species);
    const abbreviation = species.abbreviation;
    this.diagramId = this.diagramId.replace(/-(.*?)-/, `-${abbreviation}-`);
    // Include entity to ancestors list when selecting entity in the URL
    const ancestors = this.selectedTreeEvent.ancestors;
    const stIdSet = new Set(ancestors.map(obj => obj.stId));
    if (!stIdSet.has(this.selectedObj.stId)) {
      ancestors.push(this.selectedObj);
    }
    this.speciesService.getOrthologyEventStId(species, this.selectedObj.dbId, ancestors, ids).subscribe(newSelectedStId => {
      const updatedParams = this.speciesService.updateQueryParams(['select', 'flag', 'path'], newSelectedStId, abbreviation, this.route);
      this.speciesService.setIgnore(true);
      this.router.navigate(['PathwayBrowser', this.diagramId], {
        queryParamsHandling: "preserve"
      }).then(() => {
        if (updatedParams['select']) {
          this.state.set('select', updatedParams['select']);
        } else {
          this.state.set('select', '');
        }
        this.speciesService.setIgnore(true);
        if (updatedParams['flag']) this.state.set('flag', updatedParams['flag']);
        if (updatedParams['path']) this.state.set('path', updatedParams['path'].split(','));
        // Close the species panel after navigating
        setTimeout(() => this.visibility.species = false, 600);
      });
    });
  }
  static #_ = this.ɵfac = function SpeciesComponent_Factory(t) {
    return new (t || SpeciesComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_services_species_service__WEBPACK_IMPORTED_MODULE_0__.SpeciesService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_5__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_5__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_services_diagram_state_service__WEBPACK_IMPORTED_MODULE_1__.DiagramStateService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_services_event_service__WEBPACK_IMPORTED_MODULE_2__.EventService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
    type: SpeciesComponent,
    selectors: [["cr-species"]],
    inputs: {
      diagramId: ["id", "diagramId"],
      visibility: "visibility"
    },
    decls: 3,
    vars: 2,
    consts: [["id", "species-container", 1, "variables"], ["hideSingleSelectionIndicator", "true", 1, "selection-list", 3, "multiple"], [3, "value", "selected", "click", 4, "ngFor", "ngForOf"], [3, "value", "selected", "click"], [1, "species"], [1, "custom-icon", 3, "svgIcon"]],
    template: function SpeciesComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 0)(1, "mat-selection-list", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](2, SpeciesComponent_mat_list_option_2_Template, 5, 4, "mat-list-option", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("multiple", false);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx.allSpecies);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_6__.NgForOf, _angular_material_icon__WEBPACK_IMPORTED_MODULE_7__.MatIcon, _angular_material_list__WEBPACK_IMPORTED_MODULE_8__.MatSelectionList, _angular_material_list__WEBPACK_IMPORTED_MODULE_8__.MatListOption],
    styles: ["#species-container[_ngcontent-%COMP%] {\n  width: 100%;\n  background: var(--surface-variant);\n}\n\n.species[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  padding: 2px;\n  gap: 8px;\n  border-radius: 10px;\n  color: var(--on-surface-variant);\n}\n\n.selection-list[_ngcontent-%COMP%] {\n  padding: 10px;\n}\n\nmat-list-option[_ngcontent-%COMP%] {\n  padding: 2px;\n  border-radius: 10px;\n}\n\nmat-list-option[aria-selected=true][_ngcontent-%COMP%], mat-list-option[aria-selected=true][_ngcontent-%COMP%]   .species[_ngcontent-%COMP%], mat-list-option[aria-selected=true][_ngcontent-%COMP%]   .species[_ngcontent-%COMP%]  svg * {\n  background: var(--primary);\n  color: var(--on-primary);\n  fill: var(--on-primary);\n}\n\n.custom-icon[_ngcontent-%COMP%] {\n  height: 32px;\n  width: 32px;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvc3BlY2llcy9zcGVjaWVzLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsV0FBQTtFQUNBLGtDQUFBO0FBQ0Y7O0FBR0E7RUFDRSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxtQkFBQTtFQUNBLFlBQUE7RUFDQSxRQUFBO0VBQ0EsbUJBQUE7RUFDQSxnQ0FBQTtBQUFGOztBQUdBO0VBQ0UsYUFBQTtBQUFGOztBQUdBO0VBQ0UsWUFBQTtFQUNBLG1CQUFBO0FBQUY7O0FBR0E7OztFQUdFLDBCQUFBO0VBQ0Esd0JBQUE7RUFDQSx1QkFBQTtBQUFGOztBQUdBO0VBQ0UsWUFBQTtFQUNBLFdBQUE7QUFBRiIsInNvdXJjZXNDb250ZW50IjpbIiNzcGVjaWVzLWNvbnRhaW5lciB7XG4gIHdpZHRoOiAxMDAlO1xuICBiYWNrZ3JvdW5kOiB2YXIoLS1zdXJmYWNlLXZhcmlhbnQpO1xuXG59XG5cbi5zcGVjaWVzIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgcGFkZGluZzogMnB4O1xuICBnYXA6IDhweDtcbiAgYm9yZGVyLXJhZGl1czogMTBweDtcbiAgY29sb3I6IHZhcigtLW9uLXN1cmZhY2UtdmFyaWFudCk7XG59XG5cbi5zZWxlY3Rpb24tbGlzdCB7XG4gIHBhZGRpbmc6IDEwcHg7XG59XG5cbm1hdC1saXN0LW9wdGlvbntcbiAgcGFkZGluZzogMnB4O1xuICBib3JkZXItcmFkaXVzOiAxMHB4O1xufVxuXG5tYXQtbGlzdC1vcHRpb25bYXJpYS1zZWxlY3RlZD1cInRydWVcIl0sXG5tYXQtbGlzdC1vcHRpb25bYXJpYS1zZWxlY3RlZD1cInRydWVcIl0gLnNwZWNpZXMsXG5tYXQtbGlzdC1vcHRpb25bYXJpYS1zZWxlY3RlZD1cInRydWVcIl0gLnNwZWNpZXM6Om5nLWRlZXAgc3ZnICoge1xuICBiYWNrZ3JvdW5kOiB2YXIoLS1wcmltYXJ5KTtcbiAgY29sb3I6IHZhcigtLW9uLXByaW1hcnkpO1xuICBmaWxsOiB2YXIoLS1vbi1wcmltYXJ5KTtcbn1cblxuLmN1c3RvbS1pY29uIHtcbiAgaGVpZ2h0OiAzMnB4O1xuICB3aWR0aDogMzJweDtcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0= */"]
  });
};
SpeciesComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_9__.__decorate)([(0,_ngneat_until_destroy__WEBPACK_IMPORTED_MODULE_4__.UntilDestroy)()], SpeciesComponent);

/***/ }),

/***/ 5047:
/*!*******************************************!*\
  !*** ./src/app/utils/JSOGDeserializer.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   JSOGDeserializer: () => (/* binding */ JSOGDeserializer)
/* harmony export */ });
/**?
 *  JavaScript Object Graph
 *  [
 *  {
 *    "@id": "1",
 *    "name": "Sally",
 *    "secretSanta": {
 *      "@id": "2",
 *      "name": "Bob",
 *      "secretSanta": {
 *        "@id": "3",
 *        "name": "Fred",
 *        "secretSanta": { "@ref": "1" }
 *      }
 *    }
 *  },
 *  { "@ref": "2" },
 *  { "@ref": "3" }
 * ]
 * @id values are arbitrary strings.
 * @id definitions must come before @ref references.
 *
 * This class is to help deserialize JSOG object to Event.
 * Track the @id of every object deserialized. When a @ref is encountered, replace it with the object referenced.
 *
 */
class JSOGDeserializer {
  constructor() {
    this.objectMap = {};
  }
  deserialize(jsog) {
    // Build @id and object map
    this.buildIdToObjectMap(jsog);
    // Resolve all @ref
    return this.resolveReferences(jsog);
  }
  buildIdToObjectMap(jsogObject) {
    if (jsogObject['@id']) {
      this.objectMap[jsogObject['@id']] = jsogObject;
    }
    for (const key in jsogObject) {
      if (typeof jsogObject[key] === 'object' && jsogObject[key] !== null) {
        this.buildIdToObjectMap(jsogObject[key]);
      }
    }
  }
  resolveReferences(obj) {
    if (obj['@ref']) {
      return this.objectMap[obj['@ref']];
    }
    for (const key in obj) {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        obj[key] = this.resolveReferences(obj[key]);
      }
    }
    return obj;
  }
}

/***/ }),

/***/ 2191:
/*!************************************************!*\
  !*** ./src/app/viewport/viewport.component.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ViewportComponent: () => (/* binding */ ViewportComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/router */ 7947);
/* harmony import */ var _services_species_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/species.service */ 4828);
/* harmony import */ var _interactors_services_interactor_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../interactors/services/interactor.service */ 7364);
/* harmony import */ var _services_analysis_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/analysis.service */ 7139);
/* harmony import */ var _services_dark_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../services/dark.service */ 4393);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/common */ 6575);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/forms */ 8849);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/button */ 895);
/* harmony import */ var _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/slide-toggle */ 9293);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/icon */ 6515);
/* harmony import */ var angular_split__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! angular-split */ 6944);
/* harmony import */ var _angular_material_menu__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/material/menu */ 8128);
/* harmony import */ var _diagram_diagram_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../diagram/diagram.component */ 2731);
/* harmony import */ var _interactors_interactors_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../interactors/interactors.component */ 9563);
/* harmony import */ var _species_species_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../species/species.component */ 9853);
/* harmony import */ var _event_hierarchy_event_hierarchy_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../event-hierarchy/event-hierarchy.component */ 3081);
/* harmony import */ var _details_details_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../details/details.component */ 4712);


















const _c0 = ["diagram"];
const _c1 = ["interactors"];
function ViewportComponent_div_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](0, "div", 33);
  }
  if (rf & 2) {
    const isDragged_r7 = ctx.isDragged;
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵclassProp"]("dragged", isDragged_r7);
  }
}
function ViewportComponent_span_24_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](ctx_r2.currentInteractorResource == null ? null : ctx_r2.currentInteractorResource.name);
  }
}
function ViewportComponent_div_51_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](0, "div", 34);
  }
  if (rf & 2) {
    const isDragged_r8 = ctx.isDragged;
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵclassProp"]("dragged", isDragged_r8);
  }
}
const _c2 = function (a0) {
  return {
    "selected": a0
  };
};
class ViewportComponent {
  constructor(router, route, speciesService, interactorService, cdRef, analysis, dark) {
    this.router = router;
    this.route = route;
    this.speciesService = speciesService;
    this.interactorService = interactorService;
    this.cdRef = cdRef;
    this.analysis = analysis;
    this.dark = dark;
    this.diagramId = '';
    this.currentInteractorResource = {
      name: null,
      type: null
    };
    this.currentSpecies = undefined;
    this.visibility = {
      species: false,
      interactor: false
    };
    this.console = console;
  }
  ngAfterViewInit() {
    this.currentSpeciesSubscription = this.speciesService.currentSpecies$.subscribe(species => {
      this.currentSpecies = species;
      // Updated the content after ngAfterContentChecked to avoid ExpressionChangedAfterItHasBeenCheckedError
      this.cdRef.detectChanges();
    });
    this.currentResourceSubscription = this.interactorService.currentInteractorResource$.subscribe(resource => {
      this.currentInteractorResource = resource;
    });
  }
  ngOnDestroy() {
    this.currentSpeciesSubscription.unsubscribe();
    this.currentResourceSubscription.unsubscribe();
  }
  toggleVisibility(type) {
    if (type === 'species') {
      this.visibility.species = !this.visibility.species;
      this.visibility.interactor = false;
    } else if (type === 'interactor') {
      this.visibility.interactor = !this.visibility.interactor;
      this.visibility.species = false;
    }
  }
  static #_ = this.ɵfac = function ViewportComponent_Factory(t) {
    return new (t || ViewportComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_10__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_10__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_services_species_service__WEBPACK_IMPORTED_MODULE_0__.SpeciesService), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_interactors_services_interactor_service__WEBPACK_IMPORTED_MODULE_1__.InteractorService), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_9__.ChangeDetectorRef), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_services_analysis_service__WEBPACK_IMPORTED_MODULE_2__.AnalysisService), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_services_dark_service__WEBPACK_IMPORTED_MODULE_3__.DarkService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdefineComponent"]({
    type: ViewportComponent,
    selectors: [["cr-viewport"]],
    viewQuery: function ViewportComponent_Query(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵviewQuery"](_c0, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵviewQuery"](_c1, 5);
      }
      if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵloadQuery"]()) && (ctx.diagram = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵloadQuery"]()) && (ctx.interactors = _t.first);
      }
    },
    inputs: {
      diagramId: ["id", "diagramId"]
    },
    decls: 57,
    vars: 26,
    consts: [["id", "container", 1, "variables"], ["direction", "horizontal", "gutterSize", "4"], ["sideSplit", ""], ["class", "custom-left-gutter", 3, "dragged", 4, "asSplitGutter"], [3, "size"], [1, "left-panel"], [1, "search"], [1, "species-interactor-container"], [1, "species", 3, "ngClass", "click"], ["svgIcon", "species", 1, "custom-icon"], [1, "species-content"], [1, "custom-icon"], [1, "interactor", 3, "ngClass", "click"], ["svgIcon", "overlay", 1, "custom-icon"], [1, "overlay-content"], [4, "ngIf"], [3, "id", "visibility"], [3, "cy", "cys", "initialiseReplaceElements"], ["interactors", ""], [1, "event-hierarchy"], [3, "id", "eventSplit"], [1, "right-panel"], [1, "top"], ["mat-button", "", 3, "matMenuTriggerFor"], ["an", "matMenu"], ["mat-menu-item", "", 3, "click"], ["mat-menu-item", ""], ["color", "primary", 3, "ngModel", "ngModelChange"], [1, "content"], ["direction", "vertical", "gutterSize", "4"], ["class", "custom-gutter", 3, "dragged", 4, "asSplitGutter"], [3, "id", "interactor"], ["diagram", ""], [1, "custom-left-gutter"], [1, "custom-gutter"]],
    template: function ViewportComponent_Template(rf, ctx) {
      if (rf & 1) {
        const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵgetCurrentView"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "div", 0)(1, "as-split", 1, 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](3, ViewportComponent_div_3_Template, 1, 2, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](4, "as-split-area", 4)(5, "div", 5)(6, "div", 6)(7, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](8, "search-box");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](9, "div", 7)(10, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("click", function ViewportComponent_Template_div_click_10_listener() {
          return ctx.toggleVisibility("species");
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](11, "mat-icon", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](12, "div", 10)(13, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](14, "Species");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](15, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](16);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](17, "mat-icon", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](18, "arrow_drop_down");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](19, "div", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("click", function ViewportComponent_Template_div_click_19_listener() {
          return ctx.toggleVisibility("interactor");
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](20, "mat-icon", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](21, "div", 14)(22, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](23, "Overlay");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](24, ViewportComponent_span_24_Template, 2, 1, "span", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](25, "mat-icon", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](26, "arrow_drop_down");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](27, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](28, "cr-species", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](29, "div")(30, "cr-interactors", 17, 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("initialiseReplaceElements", function ViewportComponent_Template_cr_interactors_initialiseReplaceElements_30_listener() {
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r9);
          const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵreference"](54);
          return _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵresetView"](_r6.initialiseReplaceElements());
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](32, "div", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](33, "cr-event-hierarchy", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](34, "as-split-area", 4)(35, "div", 21)(36, "div", 22)(37, "button", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](38, "Analysis");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](39, "mat-menu", null, 24)(41, "button", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("click", function ViewportComponent_Template_button_click_41_listener() {
          return ctx.analysis.example("uniprot").subscribe();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](42, "UniProt");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](43, "button", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("click", function ViewportComponent_Template_button_click_43_listener() {
          return ctx.analysis.example("microarray").subscribe();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](44, "Expression");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](45, "button", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](46, "GSA");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](47, "mat-slide-toggle", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("ngModelChange", function ViewportComponent_Template_mat_slide_toggle_ngModelChange_47_listener($event) {
          return ctx.dark.isDark = $event;
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](48, "Dark mode");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](49, "div", 28)(50, "as-split", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](51, ViewportComponent_div_51_Template, 1, 2, "div", 30);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](52, "as-split-area", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](53, "cr-diagram", 31, 32);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](55, "as-split-area", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](56, "cr-details");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()()()()()()();
      }
      if (rf & 2) {
        const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵreference"](2);
        const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵreference"](31);
        const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵreference"](40);
        const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵreference"](54);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("size", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpureFunction1"](22, _c2, ctx.visibility.species));
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](ctx.currentSpecies == null ? null : ctx.currentSpecies.shortName);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpureFunction1"](24, _c2, ctx.visibility.interactor));
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", ctx.currentInteractorResource == null ? null : ctx.currentInteractorResource.name);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵstyleProp"]("display", ctx.visibility.species ? "block" : "none");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("id", ctx.diagramId)("visibility", ctx.visibility);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵstyleProp"]("display", ctx.visibility.interactor ? "block" : "none");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("cy", _r6.cy)("cys", _r6.cys);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("id", ctx.diagramId)("eventSplit", _r0);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("size", 80);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("matMenuTriggerFor", _r4);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](10);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngModel", ctx.dark.isDark);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("size", 80);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("id", ctx.diagramId)("interactor", _r3);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("size", 20);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_11__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_11__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_12__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_12__.NgModel, _angular_material_button__WEBPACK_IMPORTED_MODULE_13__.MatButton, _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_14__.MatSlideToggle, _angular_material_icon__WEBPACK_IMPORTED_MODULE_15__.MatIcon, angular_split__WEBPACK_IMPORTED_MODULE_16__.SplitComponent, angular_split__WEBPACK_IMPORTED_MODULE_16__.SplitAreaDirective, angular_split__WEBPACK_IMPORTED_MODULE_16__.SplitGutterDirective, _angular_material_menu__WEBPACK_IMPORTED_MODULE_17__.MatMenu, _angular_material_menu__WEBPACK_IMPORTED_MODULE_17__.MatMenuItem, _angular_material_menu__WEBPACK_IMPORTED_MODULE_17__.MatMenuTrigger, _diagram_diagram_component__WEBPACK_IMPORTED_MODULE_4__.DiagramComponent, _interactors_interactors_component__WEBPACK_IMPORTED_MODULE_5__.InteractorsComponent, _species_species_component__WEBPACK_IMPORTED_MODULE_6__.SpeciesComponent, _event_hierarchy_event_hierarchy_component__WEBPACK_IMPORTED_MODULE_7__.EventHierarchyComponent, _details_details_component__WEBPACK_IMPORTED_MODULE_8__.DetailsComponent],
    styles: [".variables[_ngcontent-%COMP%] {\n  --surface: #FAFDFF;\n  --surface-variant: #E9F2F6;\n  --on-surface-variant: #40484C;\n  --outline: #70787D;\n  --on-secondary-container: #001F29;\n}\n\n#container[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0 0 0 0;\n  height: 100%;\n}\n\n.left-panel[_ngcontent-%COMP%] {\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n}\n\n.search[_ngcontent-%COMP%] {\n  height: 59px;\n  background: var(--primary);\n  \n\n  position: sticky;\n  top: 0;\n  z-index: 10;\n  flex-shrink: 0;\n}\n\n.right-panel[_ngcontent-%COMP%] {\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n}\n\n.top[_ngcontent-%COMP%] {\n  height: 59px;\n  background: var(--primary);\n  flex-shrink: 0;\n}\n\n.content[_ngcontent-%COMP%] {\n  height: 90%;\n}\n\n.custom-gutter[_ngcontent-%COMP%] {\n  background: var(--primary);\n  width: 100%;\n  height: 100%;\n}\n\n.custom-left-gutter[_ngcontent-%COMP%] {\n  background: linear-gradient(to bottom, var(--on-primary) 60px, var(--primary) 60px);\n  width: 100%;\n  height: 100%;\n}\n\n.species-interactor-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: row;\n  width: 100%;\n  gap: 2px;\n  height: 56px;\n  \n\n  position: sticky;\n  top: 0;\n  z-index: 10;\n}\n\n.species[_ngcontent-%COMP%], .interactor[_ngcontent-%COMP%] {\n  width: 50%;\n  background: var(--surface-variant);\n  color: var(--on-surface-variant);\n  border-bottom: 1px solid var(--on-surface-variant);\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  justify-content: space-around;\n}\n\n.custom-icon[_ngcontent-%COMP%] {\n  height: 48px;\n  width: 48px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n.selected[_ngcontent-%COMP%]   .custom-icon[_ngcontent-%COMP%]  svg * {\n  fill: var(--primary);\n}\n\n.selected[_ngcontent-%COMP%] {\n  background: var(--surface5);\n  border-bottom: 2px solid var(--primary);\n  color: var(--primary);\n}\n\n.species-content[_ngcontent-%COMP%], .overlay-content[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: flex-start;\n  padding: 0;\n  width: 72px;\n}\n.species-content[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:first-child, .overlay-content[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:first-child {\n  font-size: 10px;\n  height: 16px;\n}\n.species-content[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:last-child, .overlay-content[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:last-child {\n  font-size: 14px;\n  height: 20px;\n}\n\n.event-hierarchy[_ngcontent-%COMP%] {\n  height: 100%;\n  overflow-x: hidden;\n  \n\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvdmlld3BvcnQvdmlld3BvcnQuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxrQkFBQTtFQUNBLDBCQUFBO0VBQ0EsNkJBQUE7RUFDQSxrQkFBQTtFQUNBLGlDQUFBO0FBQ0Y7O0FBRUE7RUFDRSxrQkFBQTtFQUNBLGNBQUE7RUFDQSxZQUFBO0FBQ0Y7O0FBRUE7RUFDRSxZQUFBO0VBQ0EsYUFBQTtFQUNBLHNCQUFBO0FBQ0Y7O0FBRUE7RUFDRSxZQUFBO0VBQ0EsMEJBQUE7RUFFQSxlQUFBO0VBQ0EsZ0JBQUE7RUFDQSxNQUFBO0VBQ0EsV0FBQTtFQUNBLGNBQUE7QUFBRjs7QUFVQTtFQUNFLFlBQUE7RUFDQSxhQUFBO0VBQ0Esc0JBQUE7QUFQRjs7QUFVQTtFQUNFLFlBQUE7RUFDQSwwQkFBQTtFQUNBLGNBQUE7QUFQRjs7QUFVQTtFQUNFLFdBQUE7QUFQRjs7QUFXQTtFQUNFLDBCQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7QUFSRjs7QUFXQTtFQUVFLG1GQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7QUFURjs7QUFZQTtFQUNFLGFBQUE7RUFDQSxtQkFBQTtFQUNBLFdBQUE7RUFFQSxRQUFBO0VBQ0EsWUFBQTtFQUVBLGVBQUE7RUFDQSxnQkFBQTtFQUNBLE1BQUE7RUFDQSxXQUFBO0FBWEY7O0FBY0E7O0VBRUUsVUFBQTtFQUNBLGtDQUFBO0VBQ0EsZ0NBQUE7RUFDQSxrREFBQTtFQUVBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLG1CQUFBO0VBQ0EsNkJBQUE7QUFaRjs7QUFlQTtFQUNFLFlBQUE7RUFDQSxXQUFBO0VBQ0EsYUFBQTtFQUNBLHVCQUFBO0VBQ0EsbUJBQUE7QUFaRjs7QUFlQTtFQUNFLG9CQUFBO0FBWkY7O0FBZUE7RUFDRSwyQkFBQTtFQUNBLHVDQUFBO0VBQ0EscUJBQUE7QUFaRjs7QUFlQTs7RUFFRSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSx1QkFBQTtFQUNBLHVCQUFBO0VBQ0EsVUFBQTtFQUNBLFdBQUE7QUFaRjtBQWNFOztFQUNFLGVBQUE7RUFDQSxZQUFBO0FBWEo7QUFjRTs7RUFDRSxlQUFBO0VBQ0EsWUFBQTtBQVhKOztBQWVBO0VBQ0UsWUFBQTtFQUNBLGtCQUFBO0VBRUEsc0JBQUE7QUFiRiIsInNvdXJjZXNDb250ZW50IjpbIi52YXJpYWJsZXMge1xuICAtLXN1cmZhY2U6ICNGQUZERkY7XG4gIC0tc3VyZmFjZS12YXJpYW50OiAjRTlGMkY2O1xuICAtLW9uLXN1cmZhY2UtdmFyaWFudDogIzQwNDg0QztcbiAgLS1vdXRsaW5lOiAjNzA3ODdEO1xuICAtLW9uLXNlY29uZGFyeS1jb250YWluZXI6ICMwMDFGMjk7XG59XG5cbiNjb250YWluZXIge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGluc2V0OiAwIDAgMCAwO1xuICBoZWlnaHQ6IDEwMCU7XG59XG5cbi5sZWZ0LXBhbmVsIHtcbiAgaGVpZ2h0OiAxMDAlO1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xufVxuXG4uc2VhcmNoIHtcbiAgaGVpZ2h0OiA1OXB4O1xuICBiYWNrZ3JvdW5kOiB2YXIoLS1wcmltYXJ5KTtcblxuICAvKiBzdGlja3kgZGl2ICovXG4gIHBvc2l0aW9uOiBzdGlja3k7XG4gIHRvcDogMDtcbiAgei1pbmRleDogMTA7XG4gIGZsZXgtc2hyaW5rOiAwO1xufVxuXG5cbi8vLnNpZGViYXIge1xuLy8gIGhlaWdodDogOTAlO1xuLy8gIG92ZXJmbG93OiBoaWRkZW47XG4vL31cblxuXG4ucmlnaHQtcGFuZWwge1xuICBoZWlnaHQ6IDEwMCU7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG59XG5cbi50b3Age1xuICBoZWlnaHQ6IDU5cHg7XG4gIGJhY2tncm91bmQ6IHZhcigtLXByaW1hcnkpO1xuICBmbGV4LXNocmluazogMDtcbn1cblxuLmNvbnRlbnQge1xuICBoZWlnaHQ6IDkwJTtcbn1cblxuXG4uY3VzdG9tLWd1dHRlciB7XG4gIGJhY2tncm91bmQ6IHZhcigtLXByaW1hcnkpO1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDAlO1xufVxuXG4uY3VzdG9tLWxlZnQtZ3V0dGVyIHtcbiAgLy9UaGlzIGNyZWF0ZXMgYSBsaW5lYXIgZ3JhZGllbnQgdGhhdCB0cmFuc2l0aW9ucyBmcm9tIC0tb24tcHJpbWFyeSB0byB0aGUgLS1wcmltYXJ5IGNvbG9yIGF0IHRoZSA2MHB4IG1hcmsgZnJvbSB0b3AgdG8gYm90dG9tLlxuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQodG8gYm90dG9tLCB2YXIoLS1vbi1wcmltYXJ5KSA2MHB4LCB2YXIoLS1wcmltYXJ5KSA2MHB4KTtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogMTAwJTtcbn1cblxuLnNwZWNpZXMtaW50ZXJhY3Rvci1jb250YWluZXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICB3aWR0aDogMTAwJTtcbiAgLy93aWR0aDogY2FsYygxMDAlIC0gMnB4KTsgLyogQWRqdXN0IHdpZHRoIHRvIGFjY291bnQgZm9yIHRoZSBnYXAgKi9cbiAgZ2FwOiAycHg7XG4gIGhlaWdodDogNTZweDtcblxuICAvKiBzdGlja3kgZGl2ICovXG4gIHBvc2l0aW9uOiBzdGlja3k7XG4gIHRvcDogMDtcbiAgei1pbmRleDogMTA7XG59XG5cbi5zcGVjaWVzLFxuLmludGVyYWN0b3Ige1xuICB3aWR0aDogNTAlO1xuICBiYWNrZ3JvdW5kOiB2YXIoLS1zdXJmYWNlLXZhcmlhbnQpO1xuICBjb2xvcjogdmFyKC0tb24tc3VyZmFjZS12YXJpYW50KTtcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIHZhcigtLW9uLXN1cmZhY2UtdmFyaWFudCk7XG5cbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XG59XG5cbi5jdXN0b20taWNvbiB7XG4gIGhlaWdodDogNDhweDtcbiAgd2lkdGg6IDQ4cHg7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxuXG4uc2VsZWN0ZWQgLmN1c3RvbS1pY29uOjpuZy1kZWVwIHN2ZyAqIHtcbiAgZmlsbDogdmFyKC0tcHJpbWFyeSk7XG59XG5cbi5zZWxlY3RlZCB7XG4gIGJhY2tncm91bmQ6IHZhcigtLXN1cmZhY2U1KTtcbiAgYm9yZGVyLWJvdHRvbTogMnB4IHNvbGlkIHZhcigtLXByaW1hcnkpO1xuICBjb2xvcjogdmFyKC0tcHJpbWFyeSk7XG59XG5cbi5zcGVjaWVzLWNvbnRlbnQsXG4ub3ZlcmxheS1jb250ZW50IHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xuICBwYWRkaW5nOiAwO1xuICB3aWR0aDogNzJweDtcblxuICBzcGFuOmZpcnN0LWNoaWxkIHtcbiAgICBmb250LXNpemU6IDEwcHg7XG4gICAgaGVpZ2h0OiAxNnB4XG4gIH1cblxuICBzcGFuOmxhc3QtY2hpbGQge1xuICAgIGZvbnQtc2l6ZTogMTRweDtcbiAgICBoZWlnaHQ6IDIwcHhcbiAgfVxufVxuXG4uZXZlbnQtaGllcmFyY2h5IHtcbiAgaGVpZ2h0OiAxMDAlO1xuICBvdmVyZmxvdy14OiBoaWRkZW47XG5cbiAgLyogc3RpY2t5IGRpdiBoZWxwZXIgKi9cbiAgLy9vdmVyZmxvdy15OiBhdXRvOyAvL0Vuc3VyZSB0aGUgc2lkZWJhciBjYW4gc2Nyb2xsIGlmIGNvbnRlbnQgb3ZlcmZsb3dzXG59XG4iXSwic291cmNlUm9vdCI6IiJ9 */"]
  });
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
function addGradient(svgText, gradient, single = false) {
  // if (single) {
  //   const s = `<style>.gradient{fill: ${gradient}!important;}</style>${svgText}`;
  //   console.log(s)
  //   return s;
  // }
  // else
  // return gradient + svgText.replaceAll('class="gradient"', 'fill="url(#gradient)"');
  return `<style>.gradient{fill: url(#gradient)};</style>${gradient}${svgText}`;
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
  // if (stops.length === 1) {
  //   console.log(stops)
  //   return stops[0].color;
  // }
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
  const s = `<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE svg><svg xmlns='http://www.w3.org/2000/svg' version='1.1' width='${width}' height='${height}'>${svgStr}</svg>`;
  // console.log(s)
  return s;
}
function svgStr(svgText, viewPortWidth, viewPortHeight) {
  // return svg(svgText, viewPortWidth, viewPortHeight);
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
  const analysis = defaultable(properties.analysis || {}).setDefault("min", Number.parseFloat(css.getPropertyValue('--analysis-min')) || 0).setDefault("max", Number.parseFloat(css.getPropertyValue('--analysis-max')) || 1).setDefault("notFound", () => css.getPropertyValue('--analysis-not-found') || extract(global.onSurface)).setDefault("unidirectionalPalette", () => {
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
    this.isMobile = 'ontouchstart' in document || navigator.maxTouchPoints > 0;
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
    console.log('is mobile', this.isMobile);
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
    cy.on('tap', 'node.InteractorOccurrences', e => {
      const openClass = 'opened';
      let eventType = !e.target.hasClass(openClass) ? ReactomeEventTypes.open : ReactomeEventTypes.close;
      e.target.toggleClass(openClass);
      container.dispatchEvent(new ReactomeEvent(eventType, {
        element: e.target,
        type: "Interactor",
        reactomeId: e.target.data('reactomeId'),
        cy
      }));
    }).on('tap', '.Interactor', e => {
      const prop = e.target.isNode() ? 'accURL' : 'evidenceURLs';
      const url = e.target.data(prop);
      if (url) window.open(url);
    }).on('tap', '.DiseaseInteractor', e => {
      const prop = e.target.isNode() ? 'accURL' : 'evidenceURLs';
      const url = e.target.data(prop);
      if (url) window.open(url);
    });
    // .on('tap', e => {
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
              let errors = 0;
              const sources = video.querySelectorAll('source');
              sources.forEach(source => source.addEventListener('error', e => {
                errors++;
                if (errors === sources.length) this.removeProteinVideo(video, node);
              }));
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
      this.cy.on('select', 'node.Protein', handler(v => v.play())).on('unselect', 'node.Protein', handler(v => v.pause()));
    }
    this.cy.on('mouseover', 'node.Protein', handler(v => v.play())).on('mouseout', 'node.Protein', handler(v => v.pause()));
  }
  removeProteinVideo(video, node) {
    video.classList.remove('loading');
    let baseFontSize = extract(this.properties.font.size);
    node.style({
      'font-size': baseFontSize,
      'text-margin-x': 0,
      'text-max-width': "100%"
    });
    this.proteins = this.proteins.not(node);
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
    this.currentPalette = palette;
    resetGradients();
    this.update(cy);
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