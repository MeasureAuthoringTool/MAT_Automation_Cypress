import * as helper from "../../../support/helpers";

export const newLibraryBtn = '#newLibrary_button'
export const title = '.contentWithHeadingHeader > h1'

//Search
export const filterByMyLibrariesChkBox = '.searchWidgetCheckBox .customCheckBox'
export const searchBtn = '#SearchWidgetButton_forCqlLibrary'
export const searchInputBox = '#SearchFilterWidget_SearchInputHPanel_forCqlLibrary > tbody > tr > td > input'
export const modelTypeListBox = '#SearchFilterWidget_verticalPanel_forCqlLibrary #modelType'

//Recent Activity Table
export const row1RecentActivity = '#searchPanel_VerticalPanel [__gwt_row="0"]'

export const row1RecentActivityCheckbox = ':nth-child(3) > .GB-MJYKBPC > .GB-MJYKBBD > div > input'
export const row2RecentActivity = '#searchPanel_VerticalPanel [__gwt_row="1"]'
export const row2RecentActivityCheckbox = ':nth-child(3) > .GB-MJYKBPD > .GB-MJYKBBD > div > input'


//Library Search Table
export const row1CqlLibrarySearch = '#CQLLibrarySearchCellTable [__gwt_row="0"]'
export const row2CqlLibrarySearch = '#CQLLibrarySearchCellTable [__gwt_row="1"]'
export const row3CqlLibrarySearch = '#CQLLibrarySearchCellTable [__gwt_row="2"]'
export const row1CqlLibrarySearchCheckbox = '#CQLLibrarySearchCellTable [__gwt_row="0"] input'
export const row2CqlLibrarySearchCheckbox = '#CQLLibrarySearchCellTable [__gwt_row="1"] input'
export const row1CqlLibraryName = '#CQLLibrarySearchCellTable [__gwt_row="0"] #div2'
export const row2CqlLibraryName = '#CQLLibrarySearchCellTable [__gwt_row="1"] #div2'
export const row1Models = '#CQLLibrarySearchCellTable [__gwt_row="0"] > :nth-child(4)'
export const row2Models = '#CQLLibrarySearchCellTable [__gwt_row="1"] > :nth-child(4)'

//Recent Activity Button Bar
export const recentActivityButtonBar = '#recentActivitySummary_gridToolbar > [type="button"]'

export const createVersionDraftRecentActivityBtn = '#recentActivitySummary_gridToolbar > [title="Click to create version or draft"]'
export const historyRecentActivityBtn = '#recentActivitySummary_gridToolbar > [title="Click to view history"]'
export const viewRecentActivityBtn = '#recentActivitySummary_gridToolbar > [title="Read-Only"]'
export const editRecentActivityEnabledBtn = '#recentActivitySummary_gridToolbar > [title="Click to edit"]'
export const shareRecentActivityBtn = '#recentActivitySummary_gridToolbar > [title="Click to share"]'
export const deleteRecentActivityBtn = '#recentActivitySummary_gridToolbar > [title="Click to delete library"]'
export const createVersionRecentActivityBtn = '#recentActivitySummary_gridToolbar > [title="Click to create version"]'
export const createDraftRecentActivityBtn = '#recentActivitySummary_gridToolbar > [title="Click to create draft"]'


//All CQL Libraries Button Bar
export const createVersionDraftCqllibrariesBtn = '#cqlLibrarySearchCellTable_gridToolbar > [title="Click to create version or draft"]'
export const historyCqllibrariesBtn = '#cqlLibrarySearchCellTable_gridToolbar > [title="Click to view history"]'
export const viewCqllibrariesBtn = '#cqlLibrarySearchCellTable_gridToolbar > [title="Read-Only"]'
export const editCqllibrariesEnabledBtn = '#cqlLibrarySearchCellTable_gridToolbar > [title="Click to edit"]'
export const shareCqllibrariesBtn = '#cqlLibrarySearchCellTable_gridToolbar > [title="Click to share"]'
export const deleteCqllibrariesBtn = '#cqlLibrarySearchCellTable_gridToolbar > [title="Click to delete library"]'
export const confirmDeleteText = '#password_PasswordTextBox'
export const confirmDeleteBtn = '.modal-footer > :nth-child(2)'
export const createVersionCqllibrariesBtn = '#cqlLibrarySearchCellTable_gridToolbar > [title="Click to create version"]'
export const createDraftCqllibrariesBtn = '#cqlLibrarySearchCellTable_gridToolbar > [title="Click to create draft"]'
export const convertToFhirLibrarySearchBtn = '#cqlLibrarySearchCellTable_gridToolbar > [title="Click to convert"]'

//Draft Version
export const majorVersionTypeRadio = '#cqlmajorRadio_RadioButton'
export const minorVersionTypeRadio = '#cqlminorRadio_RadioButton'
export const versionSaveAndContinueBtn = '#SaveAndContinueButton_cqlVersion'
export const cancelBtn = '#CancelButton_cqlVersion'
export const draftCancelBtn = '#CancelButton_cqlDetail'

//Draft CQL Library
export const draftSaveAndContinueBtn = '#SaveAndContinueButton_cqlDetail'

//Draft Confirmation
export const confirmationContinue = '#yes_Button'

//return to CQL Library
export const returnToCqlLibrary = ':nth-child(6) > td > .gwt-Anchor'

//CQL Share
export const shareCancelBtn = '#CancelButton_cqlShare'

//modal dialog
export const modal = '.modal-dialog'
export const modalCloseBtn = '.close'


// FHIR Converstion Warning dialog
export const fhirConversionWarningMessage = '.modal-body'
export const fhirConversionReturnBtn = '#Yes_ConfirmDialogBox'

export const fhirConversionNoBtn = '#No_ConfirmDialogBox'