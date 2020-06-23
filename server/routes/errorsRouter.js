const router = require("koa-router")();
const path = require("path");
const fs = require("fs");
const errorsController = require("../controllers/errorsController");
// const multer = require('koa-multer');
const delFile = require("./../utils/delFile");

router.prefix("/api/v1");
let curFileno = 0;
//配置
// var storage = multer.diskStorage({
//     //文件保存路径
//     destination: function (req, file, cb) {
//         cb(null, 'public/images/')  //注意路径必须存在
//     },
//     //修改文件名称
//     filename: function (req, file, cb) {
//         var fileFormat = (file.originalname).split(".");
//         cb(null, Date.now() + "." + fileFormat[fileFormat.length - 1]);
//     }
// })

// //加载配置
// var upload = multer({ storage: storage })

router.get("/allErrors", errorsController.getAllError);
router.post("/addError", errorsController.addError);
router.get("/getErrorById/:id", errorsController.getErrorById);
router.get(
  "/getErrorOrderByVisitCount",
  errorsController.getErrorOrderByVisitCount
);
router.get(
  "/getErrorByClassification/:id",
  errorsController.getErrorByClassification
);
router.post("/updateErrorById/", errorsController.updateErrorById);
router.post("/deleteErrorById/", errorsController.deleteErrorById);
router.post("/uploadSourceMap/", async (ctx, next) => {
  // console.log('123')
  // ctx.body = {
  //     'body': ctx.req.body
  // }
  const stream = ctx.req;
  console.log(ctx.query.curFileNo, "ctx.query.curFileNo");
  const filename = ctx.query.name;
  console.log(filename, "filename");
  const dir = path.join(__dirname, "../public/upload/sourcemap");
  // 判断upload目录是否存在
  if (ctx.query.curFileNo ==='1') {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    } else {
      delFile.delFile(dir);
    }
  }

  const target = path.join(dir, filename);
  const writeStream = fs.createWriteStream(target);
  stream.pipe(writeStream);
  data = {};
  try {
    ctx.response.status = 200;
    ctx.body = {
      code: 200,
      msg: "success",
      data
      // count: data.length
    };
  } catch (err) {
    console.log(err);
    ctx.response.status = 412;
    ctx.body = {
      code: 412,
      msg: "error",
      err
    };
  }
});
// router.put('/blog', articleController.updateError)
// router.post('/upload', upload.single('avatar'), async (ctx, next) => {
//     console.log('123')
//     ctx.body = {
//         'body': ctx.req.body
//     }
// })

module.exports = router;
