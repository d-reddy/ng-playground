import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { referenceDataReducer } from './reducers/reference-data.reducer';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common'
import { EffectsModule } from '@ngrx/effects';
import { ReferenceDataEffects } from './effects/reference-data.effects';
import { ReferenceDataService } from './services/reference-data.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    //https://offering.solutions/blog/articles/2018/02/10/separating-state-into-angular-modules-with-ngrx
    //https://toddmotto.com/ngrx-store-understanding-state-selectors
    StoreModule.forFeature('referenceData', referenceDataReducer),
    EffectsModule.forFeature([ReferenceDataEffects])
  ],
  declarations: [
  ],
  providers: [
    ReferenceDataService
  ],
  exports:[
  ]
})
export class ReferenceDataModule {}