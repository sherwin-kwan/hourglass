describe('Appointments', () => {

  beforeEach(() => {
    // Reset database with initial seeds
    cy.request('GET', '/api/debug/reset');
    cy.visit('/');
  })

  // it("should book an interview successfully", () => {

  //   // Find an empty timeslot
  //   cy.get('section.schedule article')
  //     .find('[title="Add appointment"]')
  //     .first()
  //     .click();

  //   // Choose an interviewer from the Show view
  //   cy.contains('main', 'Save')
  //     .as('myAppointment')
  //     .find('[title="2"]')
  //     .click();

  //   // Enter a student name
  //   cy.get('@myAppointment')
  //     .find('input')
  //     .clear()
  //     .type('Forrest Gump');

  //   // Save
  //   cy.get('@myAppointment')
  //     .contains('button', 'Save')
  //     .click();

  //   // Wait for the shown card to appear
  //   cy.contains('.appointment__card--show', 'Forrest Gump');
  //   cy.contains('.appointment__card--show', 'Tori Malcolm');

  //   // Expect days remaining to change
  //   cy.contains('[data-testid="Monday"]', 'No spots remaining', {matchCase: false});
  // });

  it("should edit an interview successfully", () => {

    // Find an existing timeslot
    cy.contains('section.schedule article', 'Interviewer')
      .first()
      .find('[title="Edit"]')
      .click({force: true});

    
  })
  
})