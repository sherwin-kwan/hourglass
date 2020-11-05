describe('Appointments', () => {

  beforeEach(() => {
    // Reset database with initial seeds
    cy.request('GET', '/api/debug/reset');
    cy.visit('/');
  })

  it("should book an interview successfully", () => {

    // Find an empty timeslot
    cy.get('section.schedule article')
      .find('[title="Add appointment"]')
      .first()
      .click();

    // Choose an interviewer from the Show view
    cy.contains('main', 'Save')
      .as('myAppointment')
      .find('[title="2"]')
      .click();

    // Enter a student name
    cy.get('@myAppointment')
      .find('input')
      .clear()
      .type('Forrest Gump');

    // Save
    cy.get('@myAppointment')
      .contains('button', 'Save')
      .click();

    // Wait for the shown card to appear
    cy.contains('.appointment__card--show', 'Forrest Gump');
    cy.contains('.appointment__card--show', 'Tori Malcolm');

    // Expect days remaining to change
    cy.contains('[data-testid="Monday"]', 'No spots remaining', { matchCase: false });
  });

  it("should edit an interview successfully", () => {

    // Find an existing timeslot and open the form
    cy.contains('section.schedule article', 'Interviewer')
      .first()
      .find('[title="Edit"]')
      .click({ force: true });

    // Change the interviewer to No. 2, Tori Malcolm
    cy.contains('main', 'Save')
      .as('myAppointment')
      .find('[title="2"]')
      .click();

    // Enter a new student name
    cy.get('@myAppointment')
      .find('input')
      .clear()
      .type('Gump Worsley');

    // Save
    cy.get('@myAppointment')
      .contains('button', 'Save')
      .click();

    // Expect saving animation
    cy.contains('main', 'saving', {matchCase: false});

    // Wait for the shown card to appear
    cy.contains('.appointment__card--show', 'Gump Worsley');
    cy.contains('.appointment__card--show', 'Tori Malcolm');

    // Expect days remaining not to change
    cy.contains('[data-testid="Monday"]', '1 spot remaining', { matchCase: false });
  });

  it("should delete an appointment successfully", () => {

    // Find an existing timeslot and open the confirm screen
    cy.contains('section.schedule article', 'Interviewer')
      .first()
      .find('[title="Delete"]')
      .click({ force: true });

    // Check that a "No" option exists, then click "Yes"
    cy.contains('main', 'No')
      .as('confirm-screen')
      .contains('Yes')
      .click();

    // Expect deleting animation to appear and disappear
    cy.contains('main', 'cancelling', {matchCase: false});
    cy.contains('main', 'cancelling', {matchCase: false}).should('not.be.visible');

    // Expect the card to no longer appear
    cy.contains('section.schedule article', 'Archie')
      .should('not.be.visible');

    // Expect number of remaining appointments to increment
    cy.contains('[data-testid="Monday"]', '2 spots remaining', { matchCase: false });

  })

})