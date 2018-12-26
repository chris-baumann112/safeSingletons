const mocha = require("mocha");
const expect = require("chai").expect;
const safeSingletons = require("../index");

describe("safeSingletons Unit Tests", () => {
  describe("Test calling safeSingletons without arguments", () => {
    it("Returns empty array", () => {
      let expectedArray = [];
      let actualArray = safeSingletons();
      expect(expectedArray).to.eql(actualArray);
    });

    it('Returns array with key "test"', () => {
      safeSingletons("test", { foo: "bar" });
      let expectedArray = ["test"];
      let actualArray = safeSingletons();
      expect(expectedArray[0]).to.eql(actualArray[0]);
    });
  });

  describe("Test setting and getting singleton instances", () => {
    it('Returns error when trying to set key "test"', () => {
      let expectedErrorMessage = "test is already defined";
      let actualErrorMessage = null;
      let instanceOfSingleton = null;

      try {
        instanceOfSingleton = safeSingletons("test", {});
      } catch (exception) {
        actualErrorMessage = exception.message;
      }

      expect(expectedErrorMessage).to.eql(actualErrorMessage);
      expect(instanceOfSingleton).to.be.null;
    });

    it('Sets new singleton instance "test2"', () => {
      safeSingletons("test2", { foo2: "bar2" });

      let expectedObjectPropertyValue = "bar2";
      let actualObjectPropertyValue = safeSingletons("test2").foo2;

      expect(expectedObjectPropertyValue).to.eql(actualObjectPropertyValue);
    });
  });

  describe("Test mutation of singleton instances", () => {
    it('Should not mutate singleton "test" when called and manipualted', () => {
      let singletonInstance = safeSingletons("test");
      singletonInstance.foo =
        "try to mess up master singleton instance by reference!";

      let originalSingltonInstance = safeSingletons("test");
      expect(originalSingltonInstance.foo).to.eql("bar");
    });
  });
});
