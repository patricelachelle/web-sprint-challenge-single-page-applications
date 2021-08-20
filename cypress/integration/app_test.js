describe('Testing form inputs', () => { // you can use context instead of describe
    beforeEach(() => {
        cy.visit('http://localhost:3000/pizzas-list/2/pizza-form')
    });
    it('adding text to inputs and submits the form', () => {
        cy.visit('http://localhost:3000/pizzas-list/2/pizza-form')
        cy.get('h1').contains('Lambda Eats')
        cy.get('[data-cy=name]')
        .type('Patrice')
        .should('have.value', 'Patrice');
        cy.get('[data-cy=pepperoni]')
        .check()
        .should('be.checked')
        cy.request('POST')
        cy.intercept('POST', '/name', 'name').as('userSuccess')
        cy.get('form').submit()
    })
})