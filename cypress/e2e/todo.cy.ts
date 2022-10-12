describe('Todo app', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
  })
  it('show a placeholder when no todos are found', () => {
    localStorage.setItem('todos', "[]");


    cy.visit('/');

    cy.contains('No hay notas');
  });

  it('show a todo for each todo in localStorage', () => {
    const todos = [
      {
        id: "nota",
        title: "Primera nota",
        lastEdited: "10/10/10",
        archived: false,
        content: "Algun contenido",
        categories: ["random"],
      },
      {
        id: "nota2",
        title: "Segunda nota",
        lastEdited: "10/10/10",
        archived: false,
        content: "Algun contenido",
        categories: ["random"],
      }
    ]
    localStorage.setItem('todos', JSON.stringify(todos));


    cy.visit('/');

    cy.get('[data-testid^="note-"]').should("have.length", todos.length)
  });

  it('remove a todo', () => {
    const todos = [
      {
        id: "nota",
        title: "Primera nota",
        lastEdited: "10/10/10",
        archived: false,
        content: "Algun contenido",
        categories: ["random"],
      },
      {
        id: "nota2",
        title: "Segunda nota",
        lastEdited: "10/10/10",
        archived: false,
        content: "Algun contenido",
        categories: ["random"],
      }
    ]
    localStorage.setItem('todos', JSON.stringify(todos));


    cy.visit('/');

    cy.get('[data-testid="note-nota"] [data-testid="delete"]').click()
    cy.get('[data-testid^="note-"]').should("have.length", todos.length - 1)
  });
});