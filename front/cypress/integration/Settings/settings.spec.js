import { SETTINGS } from '../../../src/routes';

describe('Settings page without login', () => {
  it('should redirect to HOME when not logged.', () => {
    cy.visit(SETTINGS);

    cy.url().should('equals', Cypress.config().baseUrl);
  });
});

describe('Settings page', () => {
  beforeEach(() => {
    cy
      .fixture('endpoints').then((endpoints) => {
        cy.wrap(endpoints).its('login').as('loginEndpoint');
        cy.wrap(endpoints).its('user').as('userEndpoint');
      });

    cy
      .fixture('login')
      .as('login');

    cy
      .get('@loginEndpoint')
      .then((loginEndpoint) => cy
        .get('@login')
        .then((login) => cy
          .request('POST', loginEndpoint, login)
          .its('body.user')
          .as('user')));

    cy
      .get('@user')
      .then((user) => cy
        .window()
        .its('setUser')
        .then((setUser) => setUser({ ...user, isLogged: true })));
  });

  it('should open when logged', () => {
    cy.get('@user').then((user) => {
      cy.visit(SETTINGS);

      cy.get('h1').contains('Your Settings');
      cy.get('input[name="image"]').should('have.value', user.image);
      cy.get('input[name="username"]').should('have.value', user.username);
      cy.get('textarea[name="bio"]').should('have.value', user.bio);
      cy.get('input[name="email"]').should('have.value', user.email);
    });
  });

  it('should update user when receiving click in Update Settings', () => {
    cy.get('@user').then((user) => {
      const newUser = {
        ...user,
        username: `new_${user.username}`,
        image: `new_${user.image}`,
        bio: `new_${user.bio}`,
        email: `new_${user.email}`,
        password: 'new_password',
      };

      cy.get('@userEndpoint').then((userEndpoint) => {
        cy.intercept({
          method: 'PUT',
          url: userEndpoint,
        }, { user: newUser }).as('updateUser');
      });

      cy.get('input[name="image"]').clear().type(newUser.image);
      cy.get('input[name="username"]').clear().type(newUser.username);
      cy.get('textarea[name="bio"]').clear().type(newUser.bio);
      cy.get('input[name="password"]').clear().type(newUser.password);
      cy.get('input[name="email"]').clear().type(newUser.email);
      cy.get('button[type="submit"]').click();

      cy.wait('@updateUser')
        .its('response')
        .should('have.property', 'statusCode', 200);
      cy.get('@updateUser')
        .its('response.body')
        .should('deep.equal', { user: newUser });
    });
  });
});
