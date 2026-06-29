const test = require("node:test");
const assert = require("node:assert/strict");

const {
  isAllowedImageUrl,
  _private
} = require("../api/_crowdfunding");

test("image proxy rejects local and private network URLs", () => {
  assert.equal(isAllowedImageUrl("http://127.0.0.1:5173/index.html"), false);
  assert.equal(isAllowedImageUrl("http://localhost:5173/index.html"), false);
  assert.equal(isAllowedImageUrl("http://192.168.0.1/image.jpg"), false);
  assert.equal(isAllowedImageUrl("file:///C:/secret.txt"), false);
});

test("image proxy allows known crowdfunding image hosts", () => {
  assert.equal(isAllowedImageUrl("https://cdn.wadiz.kr/images/example.jpg"), true);
  assert.equal(isAllowedImageUrl("https://tumblbug-assets.imgix.net/example.png"), true);
});

test("extractFirstJsonValue handles wrapped object output", () => {
  const json = _private.extractFirstJsonValue('prefix {"items":[{"name":"A"}]} suffix');
  assert.deepEqual(JSON.parse(json), { items: [{ name: "A" }] });
});

test("extractFirstJsonValue handles arrays with brackets inside strings", () => {
  const json = _private.extractFirstJsonValue('noise [{"name":"A [test]","url":"https://wadiz.kr/x"}]');
  assert.deepEqual(JSON.parse(json), [{ name: "A [test]", url: "https://wadiz.kr/x" }]);
});
