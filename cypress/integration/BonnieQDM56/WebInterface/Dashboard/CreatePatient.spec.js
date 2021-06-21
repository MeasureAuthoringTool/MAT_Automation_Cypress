import * as helper from '../../../../support/helpers'
import * as bonnieLogin from '../../../../support/Bonnie/BonnieQDM/BonnieLoginLogout'
import * as CreatePatient from '../../../../pom/Bonnie/WI/CreatePatient'

describe('Create Patient From Dashboard', () => {
  before('Login', () => {

    bonnieLogin.login()

  })
  after('Log Out', () => {

    //bonnieLogin.logout()

  })

  it('Create Patient For Top Level Maesure', () => {
    //helper.enabledWithTimeout(CreatePatient.createNewPatientButton)

    cy.get(CreatePatient.createNewPatientButton).contains('add new patient to measure').click({ force: true })

    helper.enabledWithTimeout(CreatePatient.patientLastNameInputField)
    let time = new Date()
    let append = time.getMonth() + '_' + time.getDay() + '_' + time.getFullYear() + '_' + time.getHours() + '_' + time.getMinutes() + '_' + time.getSeconds()
    helper.enterText(CreatePatient.patientLastNameInputField, 'TestLastName' + append)
    helper.enterText(CreatePatient.patientFirstNameInputField, 'TestFirstName' + append)
    helper.enterText(CreatePatient.patientBirthDateField, '01/01/1981')
    helper.enterText(CreatePatient.patientDescriptionNotesField, 'This is Test Patient ' + append)

  })
})
