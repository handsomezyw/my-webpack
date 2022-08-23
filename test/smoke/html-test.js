const glob = require("glob-all");

describe("检查是否生成了html文件", () => {
  it("生成html文件", (done) => {
    const files = glob.sync(["./dist/index.html"]);

    if (files.length > 0) {
      done();
    } else {
      throw new Error("生成html文件失败");
    }
  });
});
