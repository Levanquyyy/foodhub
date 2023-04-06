// xử lý trường giá và hiển thị sản phẩm
// nhận lại giá trị cartItems đã lưu trên local lưu vào hằng products
const delivery_r = document.querySelector(".delivery-r--container");
const delivery_total = document.querySelector(".delivery-total");
const products = JSON.parse(localStorage.getItem("cartItems")) || [];
console.log(products);
if (true) {
  // lặp qua từng hằng products để lấy từng dữ liệu theo thứ tự và in ra
  products.forEach((product, index) => {
    const delivery_card = document.createElement("div");
    delivery_card.classList.add("delivery-card");
    const productE = document.createElement("div");
    productE.classList.add("delivery-img");
    productE.innerHTML = `
      <img src="${product.img}" alt="cake" id="delivery-img" />
    `;
    const productEl = document.createElement("div");
    productEl.classList.add("delivery-intro");
    productEl.innerHTML = `
            <h2 id="delivery-intro">${product.title}</h2>
                <p>Size M</p>
                <strong id="delivery-price">${product.price}</strong>
                <div class="delivery-control">
                  <button class="minus-btn" type="button" name="button">
                    -
                  </button>
                  <input
                    type="number"
                    delivery-r
                    name="quantity"
                    min="1"
                    max="10"
                    value="01"
                    data-index ="${index}"
                  />
                  <button class="plus-btn" type="button" name="button">
                    +
                  </button>
                </div>
    `;

    // append vào chính xác nơi muốn hiển thị
    delivery_card.appendChild(productE);
    delivery_card.appendChild(productEl);
    delivery_r.appendChild(delivery_card);
  });

  // làm chức năng giảm số lượng trong ô input & giảm giá tiền
  // lấy ra tất cả nút trừ của mỗi sản phẩm được hiển thị thông qua class
  const minuss_btn = document.querySelectorAll(".minus-btn");
  minuss_btn.forEach((minus_btn) => {
    // làm từng chức năng cho từng nút -
    // giảm value trong ô input  bằng cách lấy chính xác từng ô inout bằng parentNode vì nếu bấm vào dấu - của sản phẩm thứ 2 thì nút trừ ở sản phẩm thứ 2 sẽ tìm ô input gần nó nhất chính là ô inout ở dấu - thứ 2
    // để giảm được value thì .value nhưng lúc này kiểu dữ liệu có thể sẽ là string hoặc Nan nên phải chắc chắn rằng parseInt trc khi nhận được value trong ô input

    minus_btn.addEventListener("click", () => {
      const input = minus_btn.parentNode.querySelector("input");
      let value = parseInt(input.value);
      value--;

      input.value = value;

      // xét thêm một giá trị index cho ô input vì lúc này chúng ta muốn lấy chính xác số tiền của từng sản phẩm bằng cách thông qua từng dấu - ta click vào thì ta sẽ biết được số index của nó chúng ta đã innerHtml ở trên
      // sau khi lấy được chính xác từng giá tiền thì chúng ta phải chắc chắn rằng nó là số và k dính bất cứ giá trị khác
      // ví dụ $ , %, ^ nên phải có bước replace các giá trị đó

      const index = parseInt(input.dataset.index);
      const product_price = products[index].price;
      const price = parseFloat(product_price.replace(/[^0-9.-]+/g, ""));

      // tạo ra 1 biên total để giữ giá trị thực của giá tiền không có kí tự đặc biệt

      let total = parseFloat(
        delivery_total.textContent.replace(/[^0-9.-]+/g, "")
      );

      // tạo ra 1 điều kiện nếu người dùng đưa số lượng sản phẩm về 0 thì sẽ xóa sản phẩm đó khỏi local
      // bằng cách dùng splice ta sẽ truyền vào index của sản phẩm đó thông qua nút dấu - ta vừa click và tham số thứ 2 truyền vào là 1 để xác nhận chỉ xóa 1 phần tử duy nhất
      // sau khi xóa chúng ta cập nhật lại sản phẩm trên local
      // dùng closest để tìm ra class cha gần nhất cụ thể là spile ở vị trí nào thì chúng ta sẽ lấy phần tử cha ngay vị trí nhờ closet và xóa luôn cả 1 class ra khỏi DOM

      if (value <= 0) {
        products.splice(index, 1);
        localStorage.setItem("cartItems", JSON.stringify(products)); // lưu lại vào localStorage
        const product = minus_btn.closest(".delivery-card");
        product.remove(); // xóa sản phẩm ra khỏi DOM
      } else {
        // nếu value sau khi bấm dấu - vẫn lớn hơn không chúng ta sẽ set quantity bằng với value ngay tại vị trí đó
        products[index].quantity = value;
      }

      // kiểm tra xem các biến này có phải là số hay không bằng cách sử dụng isNaN nếu tất cả là số thì chúng ta sẽ lấy giá trị tiền tổng trừ đi giá hiện tại
      // vì khi chuyển giá trị bằng parseInt thì giá trị sẽ có xu hướng thành Nan và gây ra lỗi khi cập nhật giá tiền
      if (!isNaN(price) && !isNaN(value) && !isNaN(total)) {
        total -= price;
        delivery_total.textContent = total + "$";
      }
    });
  });

  // vẫn y như cũ lấy từng dấu + của mỗi phần tử được import qua local vào DOM
  // tạo ra biên cộng như cũ
  // tạo ra thêm savetoatal để lưu giá trị tiền cuối cùng sau khi * giữa tiền và số lượng để => sau này để in ra hóa đơn cho người dùng biết số tiền cần phải thanh toán
  const pluss_btn = document.querySelectorAll(".plus-btn");
  pluss_btn.forEach((plus_btn) => {
    plus_btn.addEventListener("click", () => {
      const input = plus_btn.parentNode.querySelector("input");
      let value = parseInt(input.value);
      value++;
      input.value = value;

      // Cập nhật quantity của sản phẩm tương ứng
      const index = input.dataset.index;
      products[index].quantity = value;

      // Tính lại tổng giá trị
      let total = 0;

      for (const product of products) {
        const price = parseFloat(product.price.replace(/[^0-9.-]+/g, ""));
        const quantity = parseInt(product.quantity);
        if (!isNaN(price) && !isNaN(quantity)) {
          total += price * quantity;
        }
      }
      delivery_total.textContent = total + `$`;
      // vì totak đang giữ giá tiền cuối cùng nên push total vào key là total trên local

      const savetoatal = JSON.parse(localStorage.getItem("total")) || [];
      savetoatal.push(total);
      localStorage.setItem("total", JSON.stringify(savetoatal));
    });
  });
}
// trường xử lý form
// lấy ra từng ô input để chắc người dùng không bỏ qua ô input nào thì sẽ border đỏ nếu thiếu
const ipname = document.querySelector("input[name ='name']");
const ipnumb = document.querySelector('input[name="number"]');
const ipemail = document.querySelector("input[name = 'email']");
const ipcity = document.querySelector("input[name='city']");
const ipstate = document.querySelector("input[name='state']");
const ipzip = document.querySelector("input[name='zip']");
const ipfield = document.querySelector("select[name='fruit']");
const ipaddress = document.querySelector("input[name='address']");
const payments = document.querySelectorAll(
  "input[type='radio'][name = choice]"
);
const ipdates = document.querySelector("input[name='date']");

// lấy class của hóa đơn sau khi người dùng bấm confirm order

const card = document.querySelector(".card");
const card_food__wrap = document.querySelector(".card_food__wrap");

// để chắc người dùng đã nhập @ vào dữ liệu vào .com sau dód thì tạo ra 1 pattern để kiểm tra
var pattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

// chắc chắn người dùng phải chọn phương thức thanh toán nên kiểm tra bằng hàm checked
const checkpayment = () => {
  let select = false;
  payments.forEach((payment) => {
    if (payment.checked) {
      select = true;
    }
  });
  return select;
};

// tạo ra 1 hàm để kiểm tra xem ô input của người dùng nhập vào có trống cái gì không
function checkEmpty(input) {
  if (input.value.trim() === "") {
    input.classList.add("error");
    return false;
  } else {
    input.classList.remove("error");
    return true;
  }
}
// kiểm tra sự thay đổi của người dùng về ngày muốn nhận món ăn nếu người dùng chọn ngày ít hơn ngày hiện tại thì sẽ báo lỗi
ipdates.addEventListener("change", () => {
  if (new Date(ipdates.value) > new Date()) {
    ipdates.classList.remove("error");
  } else {
    alert("Ngày tháng năm nhập vào phải lớn hơn hoặc bằng thời gian hiện tại!");
    ipdates.classList.add("error");
  }
});

function submit() {
  // lấy ra class của hóa đơn để in ra thông tin người dùng đã nhập
  const card__content = document.querySelector(".card__content");
  const printf_price = document.querySelector(".printf_price");

  // lấy xuống giá trị savetoatal đã lưu trên local bằng key là total
  const savetoatal = JSON.parse(localStorage.getItem("total"));
  // vì giá trị luốn được cập nhật liên tục sau khi bấm dấu + hoặc -  chúng ta chỉ cần giá trị cuối cùng trong mảng đó nên
  const last_savetoatal = savetoatal[savetoatal.length - 1];

  // kiểm tra tất cả thông tin người dùng bằng hàm checkEmpty() vừa tạo ở trên
  checkEmpty(ipname);
  checkEmpty(ipnumb);
  checkEmpty(ipemail);
  checkEmpty(ipcity);
  checkEmpty(ipstate);
  checkEmpty(ipzip);
  checkEmpty(ipfield);
  checkEmpty(ipaddress);
  checkEmpty(ipdates);

  // sử dụng hàm checkpayment đã tạo ở trên để xem người dùng đã chọn phương thức tt chưa
  // nếu chưa alert ra cho người dùng biết
  if (!checkpayment()) {
    alert("Vui lòng chọn phương thức thanh toán");
  }

  // kiểm tra người dùng có để trống cái gì không
  ipname.addEventListener("change", () => {
    if (ipname.value.trim() !== "") {
      ipname.classList.remove("error");
    }
  });
  // số điện thoại phải lớn hơn 10 số
  ipnumb.addEventListener("change", () => {
    if (ipnumb.value.length < 10) {
      ipnumb.classList.add("error");
      alert("số điện thoại không hợp lệ");
    } else {
      ipnumb.classList.remove("error");
    }
  });

  // kiêm tra người dùng đã nhập @ vào email chưa = indexof nếu giá trị !== 0 thì giá trị là false và sẽ alert ra
  ipemail.addEventListener("change", () => {
    if (ipemail.value.trim() !== "") {
      ipemail.classList.remove("error");
    }
  });
  if (ipemail.value.indexOf("@") === -1) {
    alert("Vui lòng nhập @ vào trường dữ liệu email");

    return false;
  }
  // kiểm tra trường hợp người dùng đã nhập email nhưng k đúng định dạng vidu quy@ thiếu .com thì sẽ báo lỗi chưa nhập đúng định dạng
  if (!pattern.test(ipemail.value)) {
    alert("Vui lòng nhập địa chỉ email hợp lệ");
    return false;
  }

  ipcity.addEventListener("change", () => {
    if (ipcity.value.trim() !== "") {
      ipcity.classList.remove("error");
    }
  });
  ipstate.addEventListener("change", () => {
    if (ipstate.value.trim() !== "") {
      ipstate.classList.remove("error");
    }
  });
  ipzip.addEventListener("change", () => {
    if (ipzip.value.trim() !== "") {
      ipzip.classList.remove("error");
    }
  });
  ipfield.addEventListener("change", () => {
    if (ipfield.value.trim() !== "") {
      ipfield.classList.remove("error");
    }
  });
  ipaddress.addEventListener("change", () => {
    if (ipaddress.value.trim() !== "") {
      ipaddress.classList.remove("error");
    }
  });

  // kiểm tra người dùng đã nhập đầy đủ thông tin thì mới cho bấm confirm order
  if (
    checkEmpty(ipname) &&
    checkEmpty(ipnumb) &&
    checkEmpty(ipemail) &&
    checkEmpty(ipcity) &&
    checkEmpty(ipstate) &&
    checkEmpty(ipzip) &&
    checkEmpty(ipaddress) &&
    checkEmpty(ipdates) &&
    checkpayment()
  ) {
    // lưu value của người dùng vừa nhập vào form  vào 1 arr
    const data_cus = [
      {
        label: "Tên ",
        value: ipname.value,
      },
      {
        label: "Số điện thoại ",
        value: ipnumb.value,
      },
      {
        label: "Email ",
        value: ipemail.value,
      },
      {
        label: "Thành phố  ",
        value: ipcity.value,
      },
      {
        label: "State ",
        value: ipstate.value,
      },
      {
        label: "Zip ",
        value: ipzip.value,
      },
      {
        label: "Địa chỉ ",
        value: ipaddress.value,
      },
      {
        label: "Ngày nhận ",
        value: ipdates.value,
      },
    ];

    // card được hiển thị khi người dùng confirm oder
    card.style.display = "block";

    // lấy ra 2 key vừa lưu vào arr nhớ là lưu key sao thì truyền vào tham số đúng key đó
    // in ra trên hóa đơn
    data_cus.forEach(({ label, value }) => {
      const card__content__name = document.createElement("div");
      card__content__name.classList.add("card__content-name");
      card__content__name.innerHTML = `
     <h3  style="color: gray" >${label}</h3>
     <p> ${value}</p>

    `;

      card__content.appendChild(card__content__name);
    });
    // in ra hình ảnh, giá tiền,tiêu đề ,số lượng có trong products

    products.forEach((product) => {
      const card_food__l = document.createElement("div");
      card_food__l.classList.add("card_food__l");
      card_food__l.innerHTML = `
      <div class="card_food__img">
                  <img src=" ${product.img} " />
                </div>
                <div class="card_food__title">
                  <p>${product.title}</p>
                  <p>${product.price}</p>
                </div>
                <!-- đếm số lượng -->
                <p class="count">${product.quantity}</p>
      `;

      card_food__wrap.appendChild(card_food__l);
      card__content.appendChild(card_food__wrap);
    });

    printf_price.textContent = last_savetoatal + "$";
  }
}

// nếu người dùng bấm vào btn trên hóa đơn sẽ đóng lại và xóa hết sp đang có trong local
// reload lại trang
function closee() {
  if (card.style.display === "none") {
    card.style.display = "block";
  } else {
    card.style.display = "none";
    localStorage.clear();
    location.reload();
  }
}
