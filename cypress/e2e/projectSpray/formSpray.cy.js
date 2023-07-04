
describe('Form Filling', () => {
  beforeEach(() => {
    // Visit the website before each test
    cy.visit('https://www.spray.com/contact/contact-us')
  })

  it('should fill out and submit the form', () => {
    // Fill out the form fields
    cy.get('[data-sc-field-name="first-name"]').type('John')
    cy.get('[data-sc-field-name="last-name"]').type('Doe')
    cy.get('[data-sc-field-name="title"]').type('Title1')
    cy.get('[data-sc-field-name="company"]').type('Company1')
    cy.get('[data-sc-field-name="country-dropdown"]').select('United States')
    cy.get('[data-sc-field-name="address"]').type('4328 Gregory Lane')
    cy.get('[data-sc-field-name="city"]').type('Louisville')
    cy.get('[data-sc-field-name="us-state"]').select('Kentucky')
    cy.get('[data-sc-field-name="postal-code"]').type('40299')
    cy.get('[data-sc-field-name="Telephone"]').type('5025254270')
    cy.get('[data-sc-field-name="Email"]').type('johndoe1@test.com')
    cy.get('label[for="fxb_d56667eb-babe-4f1c-b16e-df9e58d9d978_Fields_e28217ea-8e52-402d-9e6c-184c4293801a__Value"] strong').click()

    const iframeBody = cy.get('iframe[title="reCAPTCHA"]')
    .its('0.contentDocument')
    .should('exist')
    .its('body')
    .should('not.be.undefined')
    .then(cy.wrap);
    iframeBody.find('.recaptcha-checkbox-borderAnimation').click({force:true})
    
   cy.wait(3000)
   const iframe2 = cy.get('iframe[title="recaptcha challenge expires in two minutes"]')
   .its('0.contentDocument')
   .should('exist')
   .its('body')
   .should('not.be.undefined')
   .then(cy.wrap);
   iframe2.find('div[class="button-holder help-button-holder"]')
   .wait(2000)
   .realPress("Tab").realPress("Tab")
   .realPress("Enter")
   .wait(6000)
   .realPress("Enter")
   cy.get('button[type="submit"]').realClick({force:true})

    // Assert that the form submission was successful
    //cy.get('#success-message').should('be.visible')

  })
})