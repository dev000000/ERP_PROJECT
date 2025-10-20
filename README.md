# ERP Project

## Giới thiệu
Dự án ERP (Enterprise Resource Planning) là một hệ thống quản lý tài nguyên doanh nghiệp, tập trung vào quản lý nhân sự, quản lý nhà cung cấp, quản lý khách hàng;
Với sự giúp đỡ của : https://github.com/dinhgiang1-git (ERP_API_3_4)  vs https://github.com/cranix-ed (ERP_API_2)

Dự án được xây dựng với:
- **Backend 1 (ERP_API_2)**: Sử dụng Node.js + Express + SQL Server (MSSQL) để xử lý API quản lý nhân sự. 
- **Backend 2 (ERP_API_3_4)**: Sử dụng Node.js + Express + MySQL để xử lý API quản lý nhà cung cấp, quản lý khách hàng;
- **Frontend (matx-react-final)**: Giao diện người dùng được xây dựng bằng React.js (dựa trên template MatX), hỗ trợ tương tác với backend.

Dự án được viết vội vàng (3 days) với mục đích kịp tiến độ nên còn nhiều thiếu sót: 

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
## Giao diện cơ bản
#1:

<img width="1002" height="605" alt="image" src="https://github.com/user-attachments/assets/212b351a-b31c-4197-8aa9-9966254b98b1" />
#2:

<img width="1324" height="828" alt="image" src="https://github.com/user-attachments/assets/d8f6e5bd-9609-4fe6-8237-549918365263" />
#3:

<img width="1329" height="747" alt="image" src="https://github.com/user-attachments/assets/f00c4163-b961-44b8-bf7c-4d7d7e5ac3d0" />
#4:

<img width="1326" height="747" alt="image" src="https://github.com/user-attachments/assets/2d38890b-eab8-4297-b35b-5f12ca26f815" />
#5:

<img width="1332" height="746" alt="image" src="https://github.com/user-attachments/assets/3c9fdcea-4974-4fed-87a8-5a7de18fe601" />
#6:

<img width="1332" height="740" alt="image" src="https://github.com/user-attachments/assets/bb4a35de-cab4-4a31-b522-46533003e637" />
#7:

<img width="1336" height="745" alt="image" src="https://github.com/user-attachments/assets/c9263a11-d1e8-431c-866e-25df66c2d55f" />



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
   PORT=[PORT_BACKEND]
   DB_HOST=[HOST_DB]
   DB_PORT=[PORT_DB]
   DB_USER=[USER_DB]
   DB_PASS=[PASSWORD_DB]
   DB_NAME_NHANSU=QuanLyNhanSu
   DB_NAME_KHACHHANG=QuanLyKhachHang
   DB_NAME_NHACUNGCAP=QuanLyNhaCungCap
   ```
4. Tạo cơ sở dữ liệu SQL Server và chạy các script để thiết lập schema : run ERP_API_2/SQLQueryERP.sql trong SQL server
5. Check config: https://github.com/dev000000/ERP_PROJECT/blob/main/ERP_API_2/README.md

### Backend ERP_API_3_4 (MySQL)
1. Di chuyển vào thư mục: `cd ERP_API_3_4`
2. Cài đặt dependencies: `npm install`
3. Cấu hình file (`db.js`): ERP_API_3_4\src\config\db.js
   ```
   host: [HOST_DB],
   port: [PORT_DB],
   user: [USER_DB],
   password: [PASSWORD_DB],
   database: 'ERP',
   
   ```
4. Tạo cơ sở dữ liệu MySQL là `ERP` và chạy các script để thiết lập schema : ERP_API_3_4\ERP.sql
   
### Frontend (matx-react-final)
1. Di chuyển vào thư mục: `cd matx-react-final`
2. Cài đặt dependencies (sử dụng Yarn được khuyến nghị vì có `yarn.lock`): `yarn install`
   - Nếu dùng npm: `npm install` (nhưng có thể gặp xung đột lock file).
3. Cấu hình API endpoints trong .env:
   ```
   VITE_API_ENDPOINT=http://localhost:9717 (cho ERP_2)
   VITE_API_ENDPOINT_2=http://localhost:3001 (cho ERP_3_4)
   ```

## Chạy ứng dụng

### Backend ERP_API_2
- Chạy ở chế độ development: `npm run dev` 
### Backend ERP_API_3_4
- Chạy ứng dụng: `npm start`.

### Frontend
- Chạy development server: `yarn dev` (mở trình duyệt tại `http://localhost:5173`).
- Sử dụng tk : admin , mk : admin

**Lưu ý**: 
- Chạy backend trước khi khởi động frontend để đảm bảo API sẵn sàng.
- Sử dụng các cổng khác nhau cho các backend nếu chạy song song (ví dụ: 3000 cho ERP_API_2, 3001 cho ERP_API_3_4).
- Kiểm tra logs console để debug lỗi kết nối DB hoặc API.


Cảm ơn bạn đã sử dụng dự án! Nếu có vấn đề, hãy mở issue trên GitHub.
