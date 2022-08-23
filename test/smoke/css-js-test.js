const glob = require("glob-all");

describe("检查是否生成js，css文件", () => {
  it("生成了js，css文件", (done) => {
    const files = glob.sync(["./dist/*.js", "./dist/*.css"]);

    if (files.length > 0) {
      done();
    } else {
      throw new Error("生成文件失败");
    }
  });
});
