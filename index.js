const express = require("express");
var multer = require("multer");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
var upload = multer({ storage: storage });
const app = express();
const port = 4000;

var listProduct = [
  {
    id: 0101,
    title: "Apple Book",
    price: 3000,
    description:
      "A very interesting book about so many even more interesting things!",
    imageURL: "book.jpeg",
  },
  {
    id: 0102,
    title: "Microsoft Book",
    price: 2000,
    description:
      "A very interesting book about so many even more interesting things!",
    imageURL: "book.jpeg",
  },
  {
    id: 0103,
    title: "VFast Book",
    price: 1000,
    description:
      "A very interesting book about so many even more interesting things!",
    imageURL: "book.jpeg",
  },
];

app.get("/", (req, res) => {
  var today = new Date();
  currentDay = today.getDay();
  var day = "";
  switch (currentDay) {
    case 0:
      day = "Chủ nhật";
      break;
    case 1:
      day = "Thứ hai";
      break;
    case 2:
      day = "Thứ ba";
      break;
    case 3:
      day = "Thứ tư";
      break;
    case 4:
      day = "Thứ năm";
      break;
    case 5:
      day = "Thứ sáu";
      break;
    case 6:
      day = "Thứ bảy";
      break;
    default:
      console.log(`Error: ${currentDay}`);
  }
  res.render("home", { kindOfDay: day });
});

app.get("/shop",(req,res)=>{
    res.render('shop',{products:listProduct});
   })
   

app.post("/addnew", upload.single("productImage"), (req, res) => {
  //lấy dữ liệu từ form sau khi upload anh
  const file = req.file;
  let title = req.body.productName;
  let price = req.body.price;
  let description = req.body.description;
  let nameImage = file.filename;
  //Thêm vào mảng json 1 cuối sách mới
  listProduct.push({
    id: 0110,
    title: title,
    price: price,
    description: description,
    imageURL: nameImage,
  });
  //chuyển về trang sản phẩm
  res.redirect("/add-product");
});
app.use(express.static("public"));

app.set("view engine", "ejs");
app.set("views", "./views");

app.get("/", (req, res) => {
  res.render("shop");
});
app.listen(port, () => {
  console.log(`dang chạy cổng ${port}`);
});
