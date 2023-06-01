// lấy ra từng nút ở bên menu
// lặp qua sự kiện event được gán trong nút
// set các link đã được gán cứng ở từng nút thông qua data-set lên local
// khi lưu xong chuyển người dùng qua link bằng thẻ a.href
const menuButtons = document.querySelectorAll(".menu-btn");
const loadmore = document.querySelector(".main-button2");
const menubox = document.querySelector(".menu-box");

const burger = document.querySelector("#burger");
const menu_mobile = document.querySelector(".menu-mobile");

burger.addEventListener("click", () => {
  menu_mobile.classList.toggle("show");
});

loadmore.addEventListener("click", (e) => {
  menubox.style.height = "100%";
  e.preventDefault();
});

menuButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    // Lấy đường dẫn ảnh mới từ thuộc tính "data-image" của nút button
    const newImageSrc = event.currentTarget.dataset.image;
    const title = event.currentTarget.dataset.title;
    const prices = event.currentTarget.dataset.price;
    // Lưu đường dẫn ảnh mới vào localStorage
    localStorage.setItem("imageSrc", newImageSrc);
    localStorage.setItem("title", title);
    localStorage.setItem("price", prices);
    // Chuyển đến trang web giỏ hàng bằng thẻ a đã lưu sẵn href trước đó
    window.location.href = button.href;
  });
});
