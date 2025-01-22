beforeEach(() => {
  cy.visit("cypress/fixtures/registration_form_2.html");
});

/*
Assignment 4:
*/

describe("Section 1: Functional tests", () => {
  it("User can use only same both first and validation passwords", () => {
    cy.get("#username").type("Superman6");
    cy.get("#email").type("testing89@gmail.com");
    cy.get('input[name="name"]').type("Emily");
    cy.get("#lastName").type("Superb");
    cy.get('[data-testid="phoneNumberTestId"]').type("56567899");
    cy.get("#password").type("Differentpass1");
    cy.get("#confirm").type("Differentpass1212");
    cy.get("h2").contains("Password").click();
    cy.get(".submit_button").should("be.disabled");
    cy.get("#success_message").should("not.be.visible");
    cy.get("#password_error_message")
      .should("be.visible")
      .should("contain", "Passwords do not match!");
    cy.get("#confirm").should(
      "have.attr",
      "title",
      "Both passwords should match"
    );

    // Changing the test, so the passwords are matching
    cy.get("#confirm").clear();
    cy.get("#confirm").type("Differentpass1");
    cy.get("h2").contains("Password").click();
    cy.get("#password_error_message").should("not.be.visible");
    cy.get(".submit_button").should("be.enabled");
  });

  it("User can submit form with all fields added", () => {
    cy.get("#username").type("Superman7");
    cy.get("#email").type("testing89@gmail.com");
    cy.get('input[name="name"]').type("Emily");
    cy.get("#lastName").type("Superb");
    cy.get('[data-testid="phoneNumberTestId"]').type("56567899");
    cy.get("#phpFavLanguage").click().should("be.checked");
    cy.get("#vehicle1").click().should("be.checked");
    cy.get("#cars").select("audi");
    cy.get("#animal").select("cat");
    cy.get("#password").type("Sneakybusiness1");
    cy.get("#confirm").type("Sneakybusiness1");
    cy.get("h2").contains("Password").click();
    cy.get(".submit_button").should("be.enabled");
    cy.get(".submit_button").click();
    cy.get("#success_message")
      .should("be.visible")
      .should("contain", "User successfully submitted registration");
  });

  it("User can submit form with valid data and only mandatory fields added", () => {
    inputValidData("TestUser12");
    cy.get(".submit_button").should("be.enabled");
    cy.get(".submit_button").click();
    cy.get("#success_message")
      .should("be.visible")
      .should("contain", "User successfully submitted registration");
    cy.get("#input_error_message").should("not.be.visible");
  });

  it("User cannot submit data when username is absent", () => {
    inputValidData("TestUser12");
    cy.get("#username").clear();
    cy.get("h2").contains("Password").click();
    cy.get(".submit_button").should("be.disabled");
    cy.get("#success_message").should("not.be.visible");
    cy.get("#input_error_message")
      .should("be.visible")
      .should("contain", "Mandatory input field is not valid or empty!");
    cy.get("#username")
      .should("have.css", "box-shadow")
      .should("contain", "rgb(255, 0, 0)");
    cy.get("#username")
      .should("have.attr", "title")
      .should("contain", "Input field");
  });

  it("User cannot submit data when phone number is absent", () => {
    inputValidData("TestUser12");
    cy.get('[data-testid="phoneNumberTestId"]').clear();
    cy.get("h2").contains("Password").click();
    cy.get(".submit_button").should("be.disabled");
    cy.get("#success_message").should("not.be.visible");
    cy.get('[data-testid="phoneNumberTestId"]')
      .should("have.css", "box-shadow")
      .should("contain", "rgb(255, 0, 0)");
  });

  it("User cannot submit data when email is absent", () => {
    inputValidData("TestUser12");
    cy.get("#email").clear();
    cy.get("h2").contains("Password").click();
    cy.get(".submit_button").should("be.disabled");
    cy.get("#success_message").should("not.be.visible");
    cy.get("#input_error_message")
      .should("be.visible")
      .should("contain", "Mandatory input field is not valid or empty!");
    cy.get("#email")
      .should("have.css", "box-shadow")
      .should("contain", "rgb(255, 0, 0)");
    cy.get("#email")
      .should("have.attr", "title")
      .should("contain", "Input field");
  });

  it("User cannot submit data when first name is absent", () => {
    inputValidData("TestUser12");
    cy.get('input[name="name"]').clear();
    cy.get("h2").contains("Password").click();
    cy.get(".submit_button").should("be.disabled");
    cy.get("#success_message").should("not.be.visible");
    cy.get("#input_error_message")
      .should("be.visible")
      .should("contain", "Mandatory input field is not valid or empty!");
    cy.get('input[name="name"]')
      .should("have.css", "box-shadow")
      .should("contain", "rgb(255, 0, 0)");
  });

  it("User cannot submit data when last name is absent", () => {
    inputValidData("TestUser12");
    cy.get("#lastName").clear();
    cy.get("h2").contains("Password").click();
    cy.get(".submit_button").should("be.disabled");
    cy.get("#success_message").should("not.be.visible");
    cy.get("#input_error_message")
      .should("be.visible")
      .should("contain", "Mandatory input field is not valid or empty!");
    cy.get("#lastName")
      .should("have.css", "box-shadow")
      .should("contain", "rgb(255, 0, 0)");
  });
});

/*
Assignment 5: Visual tests
*/

describe("Section 2: Visual tests", () => {
  it("Check that first logo is correct and has correct size", () => {
    cy.log("Will check Cerebrum Hub logo source and size");
    cy.get("img")
      .eq(0)
      .should("have.attr", "src")
      .should("include", "cerebrum_hub_logo");
    cy.get("img")
      .eq(0)
      .invoke("height")
      .should("be.lessThan", 178)
      .and("be.greaterThan", 100);
  });

  it("Check that second logo picture is correct and has correct size", () => {
    cy.log("Will check Cypress logo source and size");
    cy.get("img")
      .eq(1)
      .should("have.attr", "src")
      .should("include", "cypress_logo");
    cy.get("img").eq(1).invoke("height").should("equal", 88);
    cy.get("img").eq(1).invoke("width").should("equal", 116);
  });

  it("Check navigation to first link", () => {
    cy.get("nav").children().should("have.length", 2);
    cy.get("nav")
      .siblings("h1")
      .should("have.text", "Registration form number 2");
    cy.get("nav")
      .children()
      .eq(0)
      .should("be.visible")
      .and("have.attr", "href", "registration_form_1.html")
      .click();
    cy.url().should("contain", "/registration_form_1.html");
    cy.go("back");
    cy.log("Back again in registration form 2");
  });

  it("Check navigation to second link", () => {
    cy.get("nav").children().should("have.length", 2);
    cy.get("nav")
      .siblings("h1")
      .should("have.text", "Registration form number 2");
    cy.get("nav")
      .children()
      .eq(1)
      .should("be.visible")
      .and("have.attr", "href", "registration_form_3.html")
      .click();
    cy.url().should("contain", "/registration_form_3.html");
    cy.go("back");
    cy.log("Back again in registration form 2");
  });

  it("Check that radio button list is correct", () => {
    cy.get('input[type="radio"]').should("have.length", 4);
    cy.get('input[type="radio"]').next().eq(0).should("have.text", "HTML");
    cy.get('input[type="radio"]').next().eq(1).should("have.text", "CSS");
    cy.get('input[type="radio"]')
      .next()
      .eq(2)
      .should("have.text", "JavaScript");
    cy.get('input[type="radio"]').next().eq(3).should("have.text", "PHP");
    cy.get('input[type="radio"]').eq(0).should("not.be.checked");
    cy.get('input[type="radio"]').eq(1).should("not.be.checked");
    cy.get('input[type="radio"]').eq(2).should("not.be.checked");
    cy.get('input[type="radio"]').eq(3).should("not.be.checked");
    cy.get('input[type="radio"]').eq(0).check().should("be.checked");
    cy.get('input[type="radio"]').eq(1).check().should("be.checked");
    cy.get('input[type="radio"]').eq(0).should("not.be.checked");
  });

  it("Check that checkbox list is correct", () => {
    cy.get('input[type="checkbox"]').should("have.length", 3);
    cy.get('input[type="checkbox"]')
      .next()
      .eq(0)
      .should("have.text", "I have a bike");
    cy.get('input[type="checkbox"]')
      .next()
      .eq(1)
      .should("have.text", "I have a car");
    cy.get('input[type="checkbox"]')
      .next()
      .eq(2)
      .should("have.text", "I have a boat");
    cy.get('input[type="checkbox"]').eq(0).should("not.be.checked");
    cy.get('input[type="checkbox"]').eq(1).should("not.be.checked");
    cy.get('input[type="checkbox"]').eq(2).should("not.be.checked");
    cy.get('input[type="checkbox"]').eq(0).check().should("be.checked");
    cy.get('input[type="checkbox"]').eq(1).check().should("be.checked");
    cy.get('input[type="checkbox"]').eq(0).should("be.checked");
  });

  it("Car dropdown is correct", () => {
    cy.get("#cars").select(1).screenshot("Cars drop-down");
    cy.screenshot("Full page screenshot");
    cy.get("#cars").find("option").should("have.length", 4);
    cy.get("#cars").find("option").eq(0).should("have.text", "Volvo");
    cy.get("#cars")
      .find("option")
      .then((options) => {
        const actual = [...options].map((option) => option.value);
        expect(actual).to.deep.eq(["volvo", "saab", "opel", "audi"]);
      });
  });

  it("Favourite animal dropdown is correct", () => {
    cy.get("#animal").select(1).screenshot("Animals drop-down");
    cy.screenshot("Full page screenshot");
    cy.get("#animal").find("option").should("have.length", 6);
    cy.get("#animal").find("option").eq(0).should("have.text", "Dog");
    cy.get("#animal")
      .find("option")
      .then((options) => {
        const actual = [...options].map((option) => option.value);
        expect(actual).to.deep.eq([
          "dog",
          "cat",
          "snake",
          "hippo",
          "cow",
          "mouse",
        ]);
      });
  });
});

// Function that fills in all mandatory fields
function inputValidData(username) {
  cy.log("Username will be filled");
  cy.get('input[data-testid="user"]').type(username);
  cy.get("#email").type("carrot455@yahoo.com");
  cy.get('[data-cy="name"]').type("Misty");
  cy.get("#lastName").type("Mae");
  cy.get('[data-testid="phoneNumberTestId"]').type("56784933");
  cy.get("h2").contains("Password").click();
}
