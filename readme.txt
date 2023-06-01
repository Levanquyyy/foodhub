LINK FIGMA :
 https://www.figma.com/file/yt06I5N1T7wE4v8iGUK5hL/Untitled?type=design&node-id=0%3A1&t=7BgEGleIGnvIV53h-1
LINK WEB: https://levanquyyy.github.io/foodhub/

 --- giải thích về trang web ---
 + về phần trang chủ sẽ có thanh menu_burger được position fixed ngay trên 
 đầu để người dùng tiện hơn trong việc sử dụng

 + tiếp theo là phần menu của web sẽ có button loadmore để xem được nhiều món hơn 
 và đây sẽ là nơi order chính của khách hàng => với nút button odernow ngay dưới sản phẩm sẽ 
 lấy dữ liệu trong arr và lưu trên bộ nhớ của web và bất cứ món nào đc order thì món đó sẽ được thay bằng hình ảnh ngay lập tức 

+ và sau khi bấm order thì khách hàng sẽ được chuyển qua trang review để xem thông tin món ăn - nguyên liệu - đánh giá của người dùng trước
+ và sẽ có 2 nút btn để đưa kháchs hàng đến trang thanh toán là odernow và add to cart 
+ và sau đó sẽ đưa người dùng tới trang thanh toán - và ở đây trang thanh toán sẽ lấy tất cả dữ liệu đã lưu trước đó ở trang web và show ra cho người dùng thấy - ở đây người dùng có thể tùy chỉnh số lượng và sản phẩm sẽ biến mất khi số lượng = 0 - giá tiền sẽ được cập nhật ngay bên dưới thẻ "<span> total(USD)</span>" ở đây sẽ lấy giá tiền * với số lượng và cộng lại với sản phẩm đang có 

*+ tiếp đến người dùng sẽ điền đầy đủ thông tin => nếu k đầy đủ thì sẽ không tới bước in hóa đơn được - và nếu ngày tháng nhận món ăn < hơn ngày hiện tại thì hệ thống sẽ báo lỗi vì không thể giao đồ ăn trc ngày hiện tại 
+ sau khi bấm confirm order thì người dùng sẽ nhận được 1 cái bill với thông tin đã nhập trước đó - hình ảnh món ăn - và giá tiền => sau khi xác nhận thì dữ liệu trong trang web sẽ xóa hết

+ trên thanh menu-burger còn có mục news sẽ là nơi chứa video và hình ảnh của món ăn - khí kéo xuống sẽ gặp các nứt btn "review"sẽ được xem thành phần và người dùng đánh giá
+ về phần about trong menu-burger sẽ đưa người dùng đến lịch sử của nhà hàng và món ăn đặc trưng nhất của nhà hàng 
+ tiếp ở dưới sẽ là địa chỉ của nhà hàng được gắn qua gg maps