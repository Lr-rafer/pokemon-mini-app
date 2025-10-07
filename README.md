# Ứng dụng Pokémon Mini App

Dự án này là một ứng dụng web đơn giản được xây dựng bằng HTML, CSS, và JavaScript thuần túy, sử dụng PokéAPI để hiển thị thông tin về Pokémon. Ứng dụng bao gồm nhiều tính năng tương tác như tìm kiếm, xem Pokémon ngẫu nhiên, một trò chơi quiz, và một mô phỏng trận đấu đơn giản.

---

### Cách Cài Đặt và Chạy Ứng Dụng

Ứng dụng này được thiết kế để chạy hoàn toàn ở phía client, vì vậy bạn không cần một server phức tạp.
* **Cách 1 (Khuyến nghị):**
    * Sử dụng một web server cục bộ như **Live Server** trên Visual Studio Code. Chỉ cần nhấp chuột phải vào file `index.html` và chọn "Open with Live Server".
* **Cách 2:**
    * Mở Terminal hoặc Command Prompt, điều hướng đến thư mục dự án và chạy lệnh sau (yêu cầu Python đã được cài đặt):
        ```bash
        python -m http.server
        ```
    * Mở trình duyệt và truy cập địa chỉ `http://localhost:8000`.
* **Cách 3 (Đơn giản nhất):**
    * Chỉ cần nhấp đúp vào file `index.html` để mở nó trong trình duyệt của bạn. **Lưu ý:** Cách này có thể không hoạt động với một số trình duyệt do hạn chế về bảo mật khi gọi API từ file cục bộ.

---

### AI Usage (Sử dụng AI)

Tôi đã sử dụng **ChatGPT** và **GitHub Copilot** để hỗ trợ trong quá trình phát triển dự án này.
* **AI đã hỗ trợ:**
    * **ChatGPT:** Được dùng để tư duy và lên ý tưởng cho cấu trúc tệp ban đầu, đặc biệt là cách tổ chức HTML để chứa nhiều tính năng khác nhau. ChatGPT cũng hỗ trợ tôi trong việc tạo ra các chức năng cơ bản như hàm `fetch` để gọi API và các hàm hiển thị dữ liệu ban đầu.
    * **GitHub Copilot:** Đã cung cấp các gợi ý code trong thời gian thực, giúp tôi viết các đoạn mã lặp lại nhanh hơn, ví dụ như tạo các thẻ HTML động trong JavaScript.
* **Cách tôi đã thích nghi và gỡ lỗi:**
    * Ban đầu, code do AI tạo ra chỉ tập trung vào một tính năng duy nhất. Tôi đã phải tự mình điều chỉnh lại cấu trúc HTML và JavaScript để có thể quản lý và chuyển đổi giữa nhiều tính năng khác nhau (Tìm kiếm, Quiz, Đấu) bằng cách sử dụng các class như `.active` và `.hidden`.
    * Tôi đã phải tự mình xử lý các trường hợp lỗi như khi API trả về lỗi 404 (không tìm thấy Pokémon), và thêm thông báo lỗi thân thiện cho người dùng.

---

### Các Quyết định Thiết kế

* **Lựa chọn Công nghệ:** Tôi đã chọn HTML, CSS và JavaScript thuần túy để giữ dự án ở mức đơn giản và đúng với yêu cầu "không làm quá phức tạp".
* **Cấu trúc Giao diện:** Tôi đã sử dụng một thanh điều hướng đơn giản ở trên cùng để người dùng dễ dàng chuyển đổi giữa các tính năng. Mỗi tính năng được đặt trong một thẻ `<section>` riêng biệt, và chỉ một thẻ được hiển thị tại một thời điểm.
* **Các tính năng tương tác:**
    * **Ngẫu nhiên và Tìm kiếm:** Đây là các tính năng cơ bản, thể hiện khả năng lấy và hiển thị dữ liệu từ API.
    * **Quiz:** Tính năng này thêm yếu tố trò chơi, đòi hỏi việc lấy ngẫu nhiên Pokémon và các loại (types) khác để tạo các lựa chọn.
    * **Mô phỏng trận đấu:** Đây là tính năng phức tạp nhất. Thay vì xây dựng một hệ thống đấu phức tạp, tôi đã đơn giản hóa bằng cách chỉ so sánh tổng chỉ số tấn công và phòng thủ (attack/defense) để xác định người chiến thắng.