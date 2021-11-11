describe('Dashboard Route', () => {
  it('should visit the dashboard route', () => {
    cy.visit('/');
    cy.get('app-dashboard-tile').should('exist');
  });
});
