-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: localhost
-- Thời gian đã tạo: Th10 18, 2025 lúc 10:38 AM
-- Phiên bản máy phục vụ: 10.4.28-MariaDB
-- Phiên bản PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

--
-- Cơ sở dữ liệu: `ERP`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `ChiTietDonHang`
--

CREATE TABLE `ChiTietDonHang` (
  `MaCTDH` int(11) NOT NULL,
  `MaDonHang` int(11) DEFAULT NULL,
  `TenSanPham` varchar(100) DEFAULT NULL,
  `SoLuong` int(11) DEFAULT NULL,
  `DonGia` decimal(10,2) DEFAULT NULL,
  `ThanhTien` decimal(18,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `ChiTietDonHang`
--

INSERT INTO `ChiTietDonHang` (`MaCTDH`, `MaDonHang`, `TenSanPham`, `SoLuong`, `DonGia`, `ThanhTien`) VALUES
(2, 1, 'Fami Ít Đường 200ml', 10, 7500.00, 75000.00),
(3, 1, 'Fami Canxi 200ml', 5, 10000.00, 50000.00),
(4, 2, 'Fami Nguyên Chất 1L', 2, 32000.00, 64000.00),
(5, 2, 'Fami Hương Dâu 200ml', 4, 8500.00, 34000.00),
(6, 3, 'Fami Ít Đường 1L', 3, 35000.00, 105000.00),
(7, 3, 'Fami Hương Chuối 200ml', 10, 8000.00, 80000.00),
(8, 3, 'Fami Canxi 200ml', 5, 9000.00, 45000.00),
(9, 4, 'Fami Nguyên Chất 200ml', 10, 8500.00, 85000.00),
(10, 5, 'Fami Canxi 1L', 3, 40000.00, 120000.00),
(11, 5, 'Fami Hương Dâu 200ml', 1, 5000.00, 5000.00),
(12, 6, 'Fami Hương Dâu 200ml', 5, 8000.00, 40000.00),
(13, 6, 'Fami Ít Đường 200ml', 10, 7500.00, 75000.00),
(14, 6, 'Fami Canxi 200ml', 4, 8750.00, 35000.00),
(15, 7, 'Fami Nguyên Chất 1L', 4, 32000.00, 128000.00),
(16, 7, 'Fami Hương Dâu 200ml', 6, 8300.00, 49800.00),
(17, 8, 'Fami Canxi 200ml', 10, 8000.00, 80000.00),
(18, 8, 'Fami Hương Chuối 200ml', 5, 8000.00, 40000.00),
(19, 9, 'Fami Nguyên Chất 200ml', 10, 8000.00, 80000.00),
(20, 9, 'Fami Ít Đường 1L', 2, 35000.00, 70000.00),
(21, 9, 'Fami Hương Dâu 200ml', 7, 8500.00, 59500.00),
(22, 10, 'Fami Canxi 200ml', 5, 9000.00, 45000.00),
(23, 10, 'Fami Hương Chuối 200ml', 6, 8300.00, 49800.00);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `DonHang`
--

CREATE TABLE `DonHang` (
  `MaDonHang` int(11) NOT NULL,
  `MaKH` int(11) DEFAULT NULL,
  `NgayMua` date DEFAULT NULL,
  `TongTien` decimal(18,2) DEFAULT NULL,
  `UuDai` varchar(100) DEFAULT NULL,
  `GhiChu` varchar(255) DEFAULT NULL,
  `Status` varchar(255) NOT NULL DEFAULT 'Chờ xử lí'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `DonHang`
--

INSERT INTO `DonHang` (`MaDonHang`, `MaKH`, `NgayMua`, `TongTien`, `UuDai`, `GhiChu`, `Status`) VALUES
(1, 1, '2025-10-01', 165000.00, 'Giảm 10%', 'Khách thân thiết', 'Đã xử lí'),
(2, 2, '2025-10-02', 98000.00, NULL, NULL, 'Chờ xử lí'),
(3, 3, '2025-10-03', 230000.00, 'Giảm 10%', 'Mua combo', 'Chờ xử lí'),
(4, 4, '2025-10-03', 85000.00, NULL, NULL, 'Chờ xử lí'),
(5, 5, '2025-10-04', 125000.00, NULL, 'Thanh toán Momo', 'Chờ xử lí'),
(6, 6, '2025-10-05', 150000.00, NULL, NULL, 'Chờ xử lí'),
(7, 7, '2025-10-06', 178000.00, 'Giảm 5%', NULL, 'Chờ xử lí'),
(8, 8, '2025-10-07', 120000.00, NULL, NULL, 'Chờ xử lí'),
(9, 9, '2025-10-08', 210000.00, 'Tặng voucher', NULL, 'Chờ xử lí'),
(10, 10, '2025-10-09', 95000.00, NULL, NULL, 'Chờ xử lí');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `DVChamSocKhachHang`
--

CREATE TABLE `DVChamSocKhachHang` (
  `MaDVCSKH` int(11) NOT NULL,
  `MaKH` int(11) DEFAULT NULL,
  `MaNV` int(11) DEFAULT NULL,
  `LoaiPhanHoi` varchar(255) DEFAULT NULL,
  `TrangThai` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `DVChamSocKhachHang`
--

INSERT INTO `DVChamSocKhachHang` (`MaDVCSKH`, `MaKH`, `MaNV`, `LoaiPhanHoi`, `TrangThai`) VALUES
(1, 1, 2, 'Phản hồi về chất lượng sữa có vị hơi nhạt', 'Chưa xử lí'),
(2, 2, 3, 'Yêu cầu đổi sản phẩm do vỏ hộp bị móp', 'Đã hoàn thành'),
(3, 3, 1, 'Hỏi về chương trình khuyến mãi tháng này', 'Đang xử lý'),
(4, 4, 4, 'Phàn nàn giao hàng trễ 2 ngày', 'Đã liên hệ khách hàng'),
(5, 5, 2, 'Góp ý muốn có thêm hương vị socola', 'Đã ghi nhận');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `HoaDonNhap`
--

CREATE TABLE `HoaDonNhap` (
  `MaHDN` int(11) NOT NULL,
  `MaNV` int(11) DEFAULT NULL,
  `MaNVL` int(11) DEFAULT NULL,
  `SoLuongYeuCau` int(11) DEFAULT NULL,
  `SoLuongThucNhan` int(11) DEFAULT NULL,
  `NgayNhap` date NOT NULL,
  `HSD` date DEFAULT NULL,
  `LoSX` varchar(50) DEFAULT NULL,
  `TrangThai` varchar(255) DEFAULT NULL,
  `ThanhTien` decimal(18,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `HoaDonNhap`
--

INSERT INTO `HoaDonNhap` (`MaHDN`, `MaNV`, `MaNVL`, `SoLuongYeuCau`, `SoLuongThucNhan`, `NgayNhap`, `HSD`, `LoSX`, `TrangThai`, `ThanhTien`) VALUES
(1, 1, 1, 1000, 950, '2025-10-05', '2026-04-05', 'FAMI-DAUNANH-01', 'Chưa nhập đủ hàng', 28000000.00),
(2, 2, 2, 500, 480, '2025-10-06', '2026-04-06', 'FAMI-DUONG-02', 'Thiếu hàng', 9120000.00),
(3, 3, 4, 200, 200, '2025-10-07', '2026-03-07', 'FAMI-HUONGLIEU-03', 'Nhập đủ hàng', 300000.00),
(4, 4, 7, 2000, 2000, '2025-10-08', '2026-04-08', 'FAMI-BAOBI-04', 'Nhập đủ hàng', 2400000.00),
(5, 5, 5, 150, 140, '2025-10-09', '2026-04-09', 'FAMI-CHATONDINH-05', 'Thiếu hàng', 11900000.00);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `KhachHang`
--

CREATE TABLE `KhachHang` (
  `MaKH` int(11) NOT NULL,
  `TenKH` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `GioiTinh` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `NgaySinh` date DEFAULT NULL,
  `SDT` varchar(15) DEFAULT NULL,
  `DiaChi` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `TrangThai` varchar(255) NOT NULL DEFAULT 'Active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `KhachHang`
--

INSERT INTO `KhachHang` (`MaKH`, `TenKH`, `GioiTinh`, `NgaySinh`, `SDT`, `DiaChi`, `TrangThai`) VALUES
(1, 'Toi Thu Test', 'Nam', '1995-02-12', '0905123456', 'Hà Nội', 'Active'),
(2, 'Trần Thị Bình', 'Nữ', '1998-07-25', '0906234567', 'Hồ Chí Minh', 'Active'),
(3, 'Lê Hoàng Cường', 'Nam', '1990-11-05', '0911222333', 'Đà Nẵng', 'Active'),
(4, 'Phạm Thị Dung', 'Nữ', '1997-09-17', '0923344556', 'Cần Thơ', 'Active'),
(5, 'Vũ Minh Đức', 'Nam', '1989-03-20', '0934455667', 'Hải Phòng', 'Active'),
(6, 'Nguyễn Văn A', 'Nam', '1995-04-15', '0905123456', '25 Trần Hưng Đạo, Q.1, TP.HCM', 'Active'),
(7, 'Trần Thị Bích Ngọc', 'Nữ', '1998-09-20', '0912345678', '12 Nguyễn Thị Minh Khai, Q.3, TP.HCM', 'Active'),
(8, 'Lê Hoàng Nam', 'Nam', '2000-02-10', '0938123988', '45 Lê Duẩn, TP. Đà Nẵng', 'Active'),
(9, 'Phạm Minh Anh', 'Nữ', '1997-12-05', '0977556677', '78 Nguyễn Huệ, TP. Huế', 'Active'),
(10, 'Vũ Đức Huy', 'Nam', '1996-08-21', '0988111222', '33 Hai Bà Trưng, Q.1, TP.HCM', 'Active'),
(11, 'Ngô Thị Mai', 'Nữ', '1999-03-28', '0909334455', '10 Lý Thường Kiệt, TP. Hà Nội', 'Active'),
(12, 'Đặng Quang Khải', 'Nam', '1994-06-18', '0936778899', '58 Phan Chu Trinh, TP. Hải Phòng', 'Active'),
(13, 'Hoàng Thị Lan', 'Nữ', '2001-01-11', '0945887766', '17 Lê Lợi, TP. Vinh', 'Active'),
(14, 'Phan Minh Tuấn', 'Nam', '1995-10-09', '0967998877', '23 Võ Văn Kiệt, TP. Cần Thơ', 'Active'),
(15, 'Lưu Thị Hương', 'Nữ', '1998-07-14', '0977554433', '40 Nguyễn Văn Cừ, TP. Bắc Ninh', 'Active');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `NguyenVatLieu`
--

CREATE TABLE `NguyenVatLieu` (
  `MaNVL` int(11) NOT NULL,
  `TenNVL` varchar(100) DEFAULT NULL,
  `DonViTinh` varchar(20) DEFAULT NULL,
  `DonGia` decimal(18,2) DEFAULT NULL,
  `MaNhaCungCap` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `NguyenVatLieu`
--

INSERT INTO `NguyenVatLieu` (`MaNVL`, `TenNVL`, `DonViTinh`, `DonGia`, `MaNhaCungCap`) VALUES
(1, 'Đậu nành hạt ướt', 'kg', 28000.00, 1),
(2, 'Đường tinh luyện', 'kg', 19000.00, 3),
(3, 'Nước tinh khiết', 'lít', 2000.00, 7),
(4, 'Hương liệu sữa đậu nành', 'ml', 1500.00, 9),
(5, 'Chất ổn định (E412 - Gum Guar)', 'kg', 85000.00, 4),
(6, 'Chất tạo ngọt tự nhiên (Stevia)', 'g', 120.00, 4),
(7, 'Bao bì hộp giấy 200ml', 'cái', 1200.00, 2),
(8, 'Bao bì hộp 1 lít', 'cái', 2500.00, 5),
(9, 'Tem nhãn Fami', 'cái', 300.00, 8),
(10, 'Nắp nhựa đóng hộp', 'cái', 150.00, 10);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `NhaCungCap`
--

CREATE TABLE `NhaCungCap` (
  `MaNhaCungCap` int(11) NOT NULL,
  `TenNCC` varchar(100) NOT NULL,
  `DiaChi` varchar(255) DEFAULT NULL,
  `Email` varchar(100) DEFAULT NULL,
  `SDT` varchar(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `NhaCungCap`
--

INSERT INTO `NhaCungCap` (`MaNhaCungCap`, `TenNCC`, `DiaChi`, `Email`, `SDT`) VALUES
(1, 'Công ty TNHH Đậu Nành Việt Xanh', 'KCN Sóng Thần, Dĩ An, Bình Dương', 'contact@daunanhvietxanh.vn', '0903123456'),
(2, 'Công ty Cổ phần Bao Bì Bình Minh', 'Quận 12, TP. Hồ Chí Minh', 'info@baobibinhminh.vn', '0914567890'),
(3, 'Công ty TNHH Đường Mía Hòa Bình', 'TP. Hòa Bình, Tỉnh Hòa Bình', 'sales@duonghoabinh.vn', '0987456123'),
(4, 'Công ty TNHH Sữa & Dinh Dưỡng Ánh Dương', 'KCN Tân Tạo, Bình Tân, TP. HCM', 'info@anhduongmilk.vn', '0936789123'),
(5, 'Công ty TNHH Bao Bì Việt Nhật', 'Hải Phòng', 'support@vietnhatpack.vn', '0978123456'),
(6, 'Công ty TNHH Đậu Nành Tân Phú', 'Nam Định', 'contact@daunanh-tanphu.vn', '0909876543'),
(7, 'Công ty Cổ phần Nông Sản Miền Tây', 'Cần Thơ', 'info@nongsanmientay.vn', '0912333444'),
(8, 'Công ty TNHH Đóng Gói An Phát', 'Long An', 'sales@anphatpacking.vn', '0944556677'),
(9, 'Công ty TNHH Hương Liệu & Thực Phẩm Đại Việt', 'Hà Nội', 'info@daivietflavor.vn', '0966888999'),
(10, 'Công ty TNHH Vận Tải & Phân Phối Hưng Thịnh', 'Bình Dương', 'logistics@hungthinhtrans.vn', '0905667788');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `NhanVien`
--

CREATE TABLE `NhanVien` (
  `MaNV` int(11) NOT NULL,
  `TenNV` varchar(100) NOT NULL,
  `GioiTinh` varchar(10) DEFAULT NULL,
  `SDT` varchar(15) DEFAULT NULL,
  `Email` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `NhanVien`
--

INSERT INTO `NhanVien` (`MaNV`, `TenNV`, `GioiTinh`, `SDT`, `Email`) VALUES
(1, 'Nguyễn Văn An', 'Nam', '0901234567', 'an.nguyen@fami.com'),
(2, 'Trần Thị Bình', 'Nữ', '0912345678', 'binh.tran@fami.com'),
(3, 'Lê Quốc Dũng', 'Nam', '0923456789', 'dung.le@fami.com'),
(4, 'Phạm Hồng Nhung', 'Nữ', '0934567890', 'nhung.pham@fami.com'),
(5, 'Hoàng Minh Tuấn', 'Nam', '0945678901', 'tuan.hoang@fami.com');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `ChiTietDonHang`
--
ALTER TABLE `ChiTietDonHang`
  ADD PRIMARY KEY (`MaCTDH`),
  ADD KEY `MaDonHang` (`MaDonHang`);

--
-- Chỉ mục cho bảng `DonHang`
--
ALTER TABLE `DonHang`
  ADD PRIMARY KEY (`MaDonHang`);

--
-- Chỉ mục cho bảng `DVChamSocKhachHang`
--
ALTER TABLE `DVChamSocKhachHang`
  ADD PRIMARY KEY (`MaDVCSKH`),
  ADD KEY `MaKH` (`MaKH`);

--
-- Chỉ mục cho bảng `HoaDonNhap`
--
ALTER TABLE `HoaDonNhap`
  ADD PRIMARY KEY (`MaHDN`);

--
-- Chỉ mục cho bảng `KhachHang`
--
ALTER TABLE `KhachHang`
  ADD PRIMARY KEY (`MaKH`);

--
-- Chỉ mục cho bảng `NguyenVatLieu`
--
ALTER TABLE `NguyenVatLieu`
  ADD PRIMARY KEY (`MaNVL`);

--
-- Chỉ mục cho bảng `NhaCungCap`
--
ALTER TABLE `NhaCungCap`
  ADD PRIMARY KEY (`MaNhaCungCap`);

--
-- Chỉ mục cho bảng `NhanVien`
--
ALTER TABLE `NhanVien`
  ADD PRIMARY KEY (`MaNV`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `ChiTietDonHang`
--
ALTER TABLE `ChiTietDonHang`
  MODIFY `MaCTDH` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT cho bảng `DonHang`
--
ALTER TABLE `DonHang`
  MODIFY `MaDonHang` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT cho bảng `DVChamSocKhachHang`
--
ALTER TABLE `DVChamSocKhachHang`
  MODIFY `MaDVCSKH` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT cho bảng `HoaDonNhap`
--
ALTER TABLE `HoaDonNhap`
  MODIFY `MaHDN` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT cho bảng `KhachHang`
--
ALTER TABLE `KhachHang`
  MODIFY `MaKH` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT cho bảng `NguyenVatLieu`
--
ALTER TABLE `NguyenVatLieu`
  MODIFY `MaNVL` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT cho bảng `NhaCungCap`
--
ALTER TABLE `NhaCungCap`
  MODIFY `MaNhaCungCap` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT cho bảng `NhanVien`
--
ALTER TABLE `NhanVien`
  MODIFY `MaNV` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `ChiTietDonHang`
--
ALTER TABLE `ChiTietDonHang`
  ADD CONSTRAINT `chitietdonhang_ibfk_1` FOREIGN KEY (`MaDonHang`) REFERENCES `DonHang` (`MaDonHang`);

--
-- Các ràng buộc cho bảng `DVChamSocKhachHang`
--
ALTER TABLE `DVChamSocKhachHang`
  ADD CONSTRAINT `dvchamsockhachhang_ibfk_1` FOREIGN KEY (`MaKH`) REFERENCES `KhachHang` (`MaKH`);
COMMIT;


