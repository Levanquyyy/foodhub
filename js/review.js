// sau khi lưu xong trên local thì qua đây lấy xuống dựa theo key đã đặt
// xét điều kiện nếu trên local có dữ liệu hình ảnh thì mới xảy ra điều kiện if
// tạo ra 1 object lưu tất cả data đã set cứng cho từng nút
// tạo ra 1 local để lưu kiểu object đã tạo sẵn
// sau khi dữ liệu đã được thêm vào cartItems thì sẽ set dữ liệu trên local nếu cần thì sẽ lấy xuống

const imageSrc = localStorage.getItem("imageSrc");
const title = localStorage.getItem("title");
const price = localStorage.getItem("price");
const btn_add = document.querySelector(".add-cart");

if (imageSrc && title) {
  const imageElement = document.querySelector("#cartItemImage");
  const titleElement = document.querySelector(".review-title");
  imageElement.src = imageSrc;
  titleElement.textContent = title;

  const product = {
    img: imageSrc,
    title: title,
    price: price,
    quantity: 1,
  };

  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  cartItems.push(product);
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
}
