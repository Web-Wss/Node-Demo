var express = require("express");
var router = express.Router();

const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync(__dirname + "/../data/db.json");
const db = low(adapter);
// 导入shortid
const shortid = require("shortid");

// 记账本列表
router.get("/account", function (req, res, next) {
  // 获取所有账单信息
  let accounts = db.get("accounts").value();
  res.render("list", { accounts: accounts });
});

// 添加记录
router.get("/account/create", function (req, res, next) {
  res.render("create");
});

// 新增记录
router.post("/account", (req, res) => {
  // 生成id
  let id = shortid.generate();
  db.get("accounts")
    .unshift({ id: id, ...req.body })
    .write();
  // 成功提醒
  res.render("success", { msg: "添加成功了哦~", url: "/account" });
});

// 删除记录
router.get("/account/:id", function (req, res, next) {
  // 获取params的id
  let id = req.params.id;
  // 删除
  db.get("accounts").remove({ id: id }).write();
  res.render("success", { msg: "删除成功了~", url: "/account" });
});

module.exports = router;
