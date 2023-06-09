describe('Posts View', () => {

  beforeEach(() => {
    cy.visit('http://localhost:3000/posts');
  })

  it('the h3 contains the correct text', () => {
    cy.getByData("site heading").contains("Realtime Rebbit");
  })

  let numPostsBefore;

  let idToBeDeleted;

  let title = "Sample title 2";
  let content = "Sample content";

  it("successfuly creates a post", () => {
    cy.getByData("post-card").its("length").then( (length) => {
      numPostsBefore = length;
      cy.log("The number of posts before creation is " + numPostsBefore);
    });
    cy.getByData("create-new-post-button").click();
    cy.get("#new-post-title-input").type(title);
    cy.get("#new-post-content-input").type(content, {force: true});
    cy.get("#new-post-submit-button").click();
    cy.wait(2000);
    cy.url().should("be.equal", "http://localhost:3000/posts");
    cy.get("[data-test=post-card-title]").contains(title);
    cy.get("[data-test=post-card-content]").contains(content);
  });

  it("successfully deletes a post", () => {
    cy.getByData("post-card").filter(`:contains("${title}")`).children('.ant-card-body').children('.button-box').children('button').eq(1).click();
    cy.wait(1000);
    cy.contains(title).should("not.exist");
  });

  let commentText = "This is a test comment! 1234"

  it("successfully makes a comment and returns to post page", () => {
    cy.getByData("post-card-id").first().click();
    cy.getByData("post-comment-input").type(commentText);
    cy.getByData("post-comment-submit").click();
    cy.contains(commentText);
    cy.contains("Back").first().click();
    cy.url().should("be.equal", "http://localhost:3000/posts");
  });

})