# ERP Project

## Giới thiệu

Dự án ERP (Enterprise Resource Planning) là một hệ thống quản lý tài nguyên doanh nghiệp, tập trung vào quản lý nhân sự, quản lý nhà cung cấp, quản lý khách hàng;

Dự án được xây dựng với:
- **Backend 1 (ERP_API_2)**: Sử dụng Node.js + Express + SQL Server (MSSQL) để xử lý API quản lý nhân sự. 
- **Backend 2 (ERP_API_3_4)**: Sử dụng Node.js + Express + MySQL để xử lý API quản lý nhà cung cấp, quản lý khách hàng;
- **Frontend (matx-react-final)**: Giao diện người dùng được xây dựng bằng React.js (dựa trên template MatX), hỗ trợ tương tác với backend.

Dự án hỗ trợ phát triển và triển khai linh hoạt, với hai lựa chọn backend để phù hợp với môi trường cơ sở dữ liệu khác nhau.

## Cấu trúc dự án

```
ERP_PROJECT/
├── ERP_API_2/                 # Backend với SQL Server
│   ├── package.json           # Dependencies: express, mssql, cors, dotenv
│   ├── src/
│   │   └── app.js             # Entry point chính
│   └── ...
├── ERP_API_3_4/               # Backend với MySQL
│   ├── package.json           # Dependencies: express, mysql2, cors
│   ├── index.js               # Entry point chính
│   └── ...
├── matx-react-final/          # Frontend React
│   ├── yarn.lock              # Lock file cho Yarn
│   ├── package.json           # Scripts và dependencies React
│   └── ...
├── .gitignore
└── README.md                  # Tài liệu này
```

## Yêu cầu hệ thống

- **Node.js**: Phiên bản >= 18.0.0 (kiểm tra bằng `node -v`).
- **SQL Server**: Cho ERP_API_2 (cài đặt SQL Server Management Studio hoặc tương đương để quản lý DB).
- **MySQL**: Cho ERP_API_3_4 (cài đặt MySQL Server và MySQL Workbench).
- **Yarn**: Cho frontend (cài đặt bằng `npm install -g yarn`).
- **Git**: Để clone và quản lý mã nguồn.

## Cài đặt

### Backend ERP_API_2 (SQL Server)
1. Di chuyển vào thư mục: `cd ERP_API_2`
2. Cài đặt dependencies: `npm install`
3. Cấu hình biến môi trường (`.env`):
   ```
   DB_HOST=your_sql_server_host
   DB_USER=your_username
   DB_PASSWORD=your_password
   DB_NAME=your_database_name
   PORT=3000  # Hoặc cổng mong muốn
   ```
4. Tạo cơ sở dữ liệu SQL Server và chạy các script migration (nếu có) để thiết lập schema.

### Backend ERP_API_3_4 (MySQL)
1. Di chuyển vào thư mục: `cd ERP_API_3_4`
2. Cài đặt dependencies: `npm install`
3. Cấu hình biến môi trường (`.env`):
   ```
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=erp_db
   PORT=3001  # Hoặc cổng mong muốn (tránh trùng với backend khác)
   ```
4. Tạo cơ sở dữ liệu MySQL và chạy các script migration (nếu có) để thiết lập schema.

### Frontend (matx-react-final)
1. Di chuyển vào thư mục: `cd matx-react-final`
2. Cài đặt dependencies (sử dụng Yarn được khuyến nghị vì có `yarn.lock`): `yarn install`
   - Nếu dùng npm: `npm install` (nhưng có thể gặp xung đột lock file).
3. Cấu hình API endpoints trong file config (thường là `src/config.js` hoặc tương tự):
   ```
   API_BASE_URL = 'http://localhost:3000'  // Cho ERP_API_2
   // Hoặc 'http://localhost:3001' cho ERP_API_3_4
   ```

## Chạy ứng dụng

### Backend ERP_API_2
- Chạy ở chế độ development: `npm run dev` (sử dụng Nodemon để tự động reload).
- Chạy production: `npm start`.

### Backend ERP_API_3_4
- Chạy ứng dụng: `npm start`.

### Frontend
- Chạy development server: `yarn start` (mở trình duyệt tại `http://localhost:3000`).
- Build production: `yarn build`.

**Lưu ý**: 
- Chạy backend trước khi khởi động frontend để đảm bảo API sẵn sàng.
- Sử dụng các cổng khác nhau cho các backend nếu chạy song song (ví dụ: 3000 cho ERP_API_2, 3001 cho ERP_API_3_4).
- Kiểm tra logs console để debug lỗi kết nối DB hoặc API.

## Scripts hữu ích

- **Lint code** (cho backend): `npm run lint` (nếu có ESLint config).
- **Test** (nếu có): `npm test`.

## Đóng góp

- Fork repo và tạo Pull Request.
- Đảm bảo code tuân thủ ESLint và test trước khi commit.

## License

ISC License. Xem file `LICENSE` (nếu có) hoặc liên hệ tác giả.

## Liên hệ

- Tác giả: [Your Name]
- Email: [your.email@example.com]

Cảm ơn bạn đã sử dụng dự án! Nếu có vấn đề, hãy mở issue trên GitHub.
