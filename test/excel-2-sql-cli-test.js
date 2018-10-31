let assert = require("assert");
let exec = require("child_process");
let fs = require("fs");

describe("excel-2-sql", function() {
  describe("insert", function() {
    it("expected ./excel-2-sql example.xslx example to be the same as test/expected-output/insert-default-options.output", function() {
      let expectedOutput = fs.readFileSync(
        "./test/expected-output/insert-default-options.output",
        "utf8"
      );
      result = exec.execSync("./excel-2-sql example.xlsx example", {
        encoding: "utf8"
      });
      assert.equal(result, expectedOutput);
    });
  });
});
