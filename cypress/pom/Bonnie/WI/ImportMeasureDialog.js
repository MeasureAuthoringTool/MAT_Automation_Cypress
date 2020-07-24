//Import Measure dialog element definitions

export const importMeasureDialog = '#importMeasureDialog'
export const fileImportInput = '#measureFileInput'
export const vsacUserField = '#vsacUser'
export const vsacPasswordField = '#vsacPassword'
export const importLoadBtn = '#loadButton'
export const closeBtn = '.col-sm-offset-3 > .btn-default'

export const vsacUser = Cypress.env('CYPRESS_MAT_UMLS_USERNAME')
export const vsacPassword = Cypress.env('CYPRESS_MAT_UMLS_PASSWORD')