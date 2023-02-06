// login spec
//  - should display login page correctly
//  - should display alert when username is empty
//  - should display alert when password is empty
//  - should display alert when username and password are wrong
//  - should display homepage when username and password are correct

describe('Login spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });

  it('should display login page correctly', () => {
    // verifikasi elelemn wajib di page
    cy.get('input[placeholder="Username"]').should('be.visible');
    cy.get('input[placeholder="Password"]').should('be.visible');
    cy.get('button').contains(/^Login$/).should('be.visible');
  });

  it('should display alert when username is empty', () => {
    // klik tombol login tanpa isi username
    cy.get('button').contains(/^Login$/).click();

    // memverifikasi window.alert untuk menampilkan pesan dari API
    cy.on('window:alert', (str) => {
      expect(str).to.equal('"id" is not allowed to be empty');
    });
  });

  it('should display alert when password is empty', () => {
    // isi username
    cy.get('input[placeholder="Username"]').type('testuser');

    // klik tombol tanpa isi password
    cy.get('button').contains(/^Login$/).click();

    // verisikasi window alert pesan dari API
    cy.on('window:alert', (str) => {
      expect(str).to.equal('"password" is not allowed to be empty');
    });
  });

  it('should display alert when username and password are wrong', () => {
    cy.get('input[placeholder="Username"]').type('testuser');
    cy.get('input[placeholder="Password"]').type('wrong_password');

    cy.get('button').contains(/^Login$/).click();

    cy.on('window:alert', (str) => {
      expect(str).tp.equal('User ID or password is wrong');
    });
  });

  it('should display homepage when username and password are correct', () => {
    cy.get('input[placeholder="Username"]').type('testuser');
    cy.get('input[placeholder="Password"]').type('test123456');

    cy.get('button').contains(/^Login$/).click();

    // verif kalau elemen home uda muncul
    cy.get('nav').contains(/^Home$/).should('be.visible');
  });
});
