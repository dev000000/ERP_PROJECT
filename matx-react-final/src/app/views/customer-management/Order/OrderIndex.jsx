import { useEffect, useState } from "react";
import { observer } from "mobx-react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Typography from "@mui/material/Typography";
import { Formik, Form } from "formik";
import styled from "@mui/material/styles/styled";
import ReusableTextField from "app/components/ReusableComponent/ReusableTextField";
import ReusableDateTimePicker from "app/components/ReusableComponent/ReusableDateTimePicker";
import ReusableAutocomplete from "app/components/ReusableComponent/ReusableAutocomplete";
import {
  TRANG_THAI_CHAM_SOC_KH_OPTIONS,
  TRANG_THAI_DON_HANG_OPTIONS
} from "app/utils/constant-project";
import { useStore } from "app/stores";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import * as Yup from "yup";
import { formatCurrencyVND, formatDateToDDMMYYYY } from "app/utils/utils";
// Styled Root component for layout
const Root = styled("div")(() => ({
  maxWidth: "90%",
  margin: "20px auto"
}));
const ButtonCustom = styled(Button)(() => ({
  borderRadius: 12
}));

const validationOrderSchema = Yup.object({
  Status: Yup.string().required("Trạng Thái không được để trống")
});
const validationOrderDetailSchema = Yup.object({
  SoLuong: Yup.number()
    .typeError("Số lượng phải là một số")
    .integer("Số lượng phải là số nguyên")
    .min(0, "Số lượng không được âm")
    .required("Vui lòng nhập số lượng")
});

const initialOrderValuesDefault = {
  MaDonHang: 0,
  Status: ""
};
const initialOrderDetailValuesDefault = {
  MaCTDH: "",
  TenSanPham: "",
  SoLuong: 0
};

const statusColor = (value) => {
  switch (value) {
    case "Chờ xử lí":
      return "info";
    case "Đã xử lí":
      return "success";
    default:
      return "default";
  }
};
const statusLabel = (value) => {
  const found = TRANG_THAI_DON_HANG_OPTIONS?.find((o) => o.value === value);
  return found?.label || value || "—";
};

export default observer(function OrderIndex() {
  const { orderStore } = useStore();
  const { orderList, orderDetailList } = orderStore;
  const [initialOrderValues, setInitialOrderValues] = useState(initialOrderValuesDefault);
  const [initialOrderDeitalValues, setInitialOrderDetailValues] = useState(
    initialOrderDetailValuesDefault
  );
  const [openOrderDialog, setOpenOrderDialog] = useState(false);
  const [openOrderDetailDialog, setOpenOrderDetailDialog] = useState(false);
  const [openCountDialog, setOpenCountDialog] = useState(false);
  useEffect(() => {
    orderStore.getOrderList();
  }, []);

  const handleOpenOrderDialog = (row) => {
    console.log(row);
    setInitialOrderValues(row);
    setOpenOrderDialog(true);
  };
  const handleOpenOrderDetailDialog = (maDonHang) => {
    orderStore.getOrderDetailList(maDonHang);
    setOpenOrderDetailDialog(true);
  };
  const handleOpenCountDialog = (row) => {
    setInitialOrderDetailValues({
      MaCTDH: row.MaCTDH,
      TenSanPham: row.TenSanPham,
      SoLuong: row.SoLuong
    });
    setOpenCountDialog(true);
  };
  const handleCloseOrderDialog = () => {
    setOpenOrderDialog(false);
  };
  const handleCloseOrderDetailDialog = () => {
    setOpenOrderDetailDialog(false);
  };
  const handleCloseCountDialog = () => {
    setOpenCountDialog(false);
  };
  const handleSubmitOrderForm = (values) => {
    const dataUpdate = { Status: values.Status };
    orderStore.updateOrder(values.MaDonHang, dataUpdate);
    handleCloseOrderDialog();
  };
  const handleSubmitCountForm = (values) => {
    console.log(values);
    const dataUpdate = { SoLuong: values.SoLuong };
    orderStore.updateOrderDetail(values.MaCTDH, dataUpdate);
    handleCloseCountDialog();
    handleCloseOrderDetailDialog();
    };
  const handleDeleteOrderDetail = (MaCTDH) => {
    orderStore.deleteOrderDetail(MaCTDH);
    handleCloseCountDialog();
    handleCloseOrderDetailDialog();
  };

  return (
    <>
      {/* Dialog sua trang thai don hang */}
      <Dialog onClose={handleCloseOrderDialog} open={openOrderDialog}>
        <DialogTitle
          sx={{
            m: 0,
            py: 2,
            px: 2,
            position: "sticky",
            top: 0,
            bgcolor: "#01C0C8",
            color: "#fff"
          }}
        >
          <Typography sx={{ color: "#fff", fontSize: 16, fontWeight: 500 }}>
            Chuyển trạng thái
          </Typography>

          <IconButton
            aria-label="close"
            onClick={handleCloseOrderDialog}
            sx={{ position: "absolute", right: 8, top: 8, color: "#fff" }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <Formik
          initialValues={initialOrderValues}
          validationSchema={validationOrderSchema}
          onSubmit={(values) => {
            handleSubmitOrderForm(values);
          }}
        >
          {({ values }) => (
            <Form autoComplete="off">
              <DialogContent dividers sx={{ width: 600 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <ReusableTextField name="MaDonHang" label="Mã Đơn Hàng" disabled />
                  </Grid>
                  <Grid item xs={12}>
                    <ReusableAutocomplete
                      name="Status"
                      label="Trạng Thái"
                      options={TRANG_THAI_DON_HANG_OPTIONS}
                      isObject={false}
                      primitiveKey="value"
                      labelFormatter={(o) => o.label}
                    />
                  </Grid>
                </Grid>
              </DialogContent>

              <DialogActions sx={{ px: 2, py: 1 }}>
                <ButtonCustom variant="contained" color="primary" type="submit">
                  Chuyển trạng thái
                </ButtonCustom>
                <Button variant="contained" color="secondary" onClick={handleCloseOrderDialog}>
                  Thoát
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </Dialog>
      {/* Dialog chi tiet don hang */}
      <Dialog onClose={handleCloseOrderDetailDialog} open={openOrderDetailDialog}>
        <DialogTitle
          sx={{
            m: 0,
            py: 2,
            px: 2,
            position: "sticky",
            top: 0,
            bgcolor: "#01C0C8",
            color: "#fff"
          }}
        >
          <Typography sx={{ color: "#fff", fontSize: 16, fontWeight: 500 }}>
            Chi tiết đơn hàng
          </Typography>

          <IconButton
            aria-label="close"
            onClick={handleCloseOrderDetailDialog}
            sx={{ position: "absolute", right: 8, top: 8, color: "#fff" }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <Grid container spacing={2}>
          {orderDetailList.map((row) => (
            <Grid item xs={12} key={row.MaCTDH}>
              <Card sx={{ height: "100%", borderRadius: 3, m: 2 }}>
                <CardContent>
                  <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                      {"Tên Sản Phẩm: " + row.TenSanPham}
                    </Typography>
                  </Stack>

                  <Box sx={{ mt: 1.5 }}>
                    <Typography variant="body2">
                      <b>Đơn giá: </b> {formatCurrencyVND(row.DonGia) || "—"}
                    </Typography>
                    <Typography variant="body2">
                      <b>Số Lượng: </b> {row.SoLuong || "—"}
                    </Typography>
                    <Typography variant="body2">
                      <b>Thành Tiền: </b> {formatCurrencyVND(row.ThanhTien) || "—"}
                    </Typography>
                  </Box>
                </CardContent>

                <CardActions sx={{ px: 2, pb: 2 }}>
                  <ButtonCustom
                    size="small"
                    variant="contained"
                    onClick={() => handleDeleteOrderDetail(row.MaCTDH)}
                  >
                    Xóa Sản Phẩm
                  </ButtonCustom>
                  <ButtonCustom
                    size="small"
                    variant="contained"
                    color="secondary"
                    onClick={() => handleOpenCountDialog(row)}
                  >
                    Sửa Sản Phẩm
                  </ButtonCustom>
                </CardActions>
              </Card>
            </Grid>
          ))}

          {!orderDetailList?.length && (
            <Grid item xs={12}>
              <Box sx={{ py: 8, textAlign: "center", opacity: 0.7 }}>Không có dữ liệu.</Box>
            </Grid>
          )}
        </Grid>
        <DialogActions sx={{ px: 2, py: 1 }}>
          <Button variant="contained" color="secondary" onClick={handleCloseOrderDetailDialog}>
            Thoát
          </Button>
        </DialogActions>
      </Dialog>
      {/* Dialog hien thi so luong san pham*/}
      <Dialog onClose={handleCloseCountDialog} open={openCountDialog}>
        <DialogTitle
          sx={{
            m: 0,
            py: 2,
            px: 2,
            position: "sticky",
            top: 0,
            bgcolor: "#01C0C8",
            color: "#fff"
          }}
        >
          <Typography sx={{ color: "#fff", fontSize: 16, fontWeight: 500 }}>
            Chỉnh sửa số lượng
          </Typography>

          <IconButton
            aria-label="close"
            onClick={handleCloseCountDialog}
            sx={{ position: "absolute", right: 8, top: 8, color: "#fff" }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <Formik
          initialValues={initialOrderDeitalValues}
          validationSchema={validationOrderDetailSchema}
          onSubmit={(values) => {
            handleSubmitCountForm(values);
          }}
        >
          {({ values }) => (
            <Form autoComplete="off">
              <DialogContent dividers sx={{ width: 600 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <ReusableTextField name="MaCTDH" label="Mã CTĐH" disabled />
                  </Grid>
                  <Grid item xs={12}>
                    <ReusableTextField name="TenSanPham" label="Tên Sản Phẩm" disabled />
                  </Grid>
                  <Grid item xs={12}>
                    <ReusableTextField name="SoLuong" label="Số Lượng" />
                  </Grid>
                </Grid>
              </DialogContent>

              <DialogActions sx={{ px: 2, py: 1 }}>
                <ButtonCustom variant="contained" color="primary" type="submit">
                  Ok
                </ButtonCustom>
                <Button variant="contained" color="secondary" onClick={handleCloseCountDialog}>
                  Thoát
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </Dialog>

      <Root>
        <Box
          sx={{
            mb: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Danh sách đơn hàng
          </Typography>
        </Box>

        {/* Grid Card */}
        <Grid container spacing={2}>
          {orderList.map((row) => (
            <Grid item xs={12} sm={6} md={4} key={row.MaDonHang}>
              <Card sx={{ height: "100%", borderRadius: 3 }}>
                <CardContent>
                  <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                      {"Mã Đơn hàng: " + row.MaDonHang}
                    </Typography>
                    <Chip
                      size="small"
                      label={statusLabel(row.Status)}
                      color={statusColor(row.Status)}
                      variant="filled"
                    />
                  </Stack>

                  <Box sx={{ mt: 1.5 }}>
                    <Typography variant="body2">
                      <b>Ngày Mua</b> {formatDateToDDMMYYYY(row.NgayMua) || "—"}
                    </Typography>
                    <Typography variant="body2">
                      <b>Tên KH</b> {row.TenKH || "—"}
                    </Typography>
                    <Typography variant="body2">
                      <b>SDT</b> {row.SDT || "—"}
                    </Typography>
                    <Typography variant="body2">
                      <b>Tổng Tiền</b> {formatCurrencyVND(row.TongTien) || "—"}
                    </Typography>
                    <Typography variant="body2">
                      <b>Ưu đãi</b> {row.UuDai || "—"}
                    </Typography>
                    <Typography variant="body2">
                      <b>Ghi chú</b> {row.GhiChu || "—"}
                    </Typography>
                  </Box>
                </CardContent>

                <CardActions sx={{ px: 2, pb: 2 }}>
                  <ButtonCustom
                    size="small"
                    variant="contained"
                    onClick={() => handleOpenOrderDetailDialog(row.MaDonHang)}
                  >
                    Xem chi tiết
                  </ButtonCustom>
                  <ButtonCustom
                    size="small"
                    variant="contained"
                    color="secondary"
                    onClick={() => handleOpenOrderDialog(row)}
                  >
                    Sửa
                  </ButtonCustom>
                </CardActions>
              </Card>
            </Grid>
          ))}

          {!orderList?.length && (
            <Grid item xs={12}>
              <Box sx={{ py: 8, textAlign: "center", opacity: 0.7 }}>Không có dữ liệu.</Box>
            </Grid>
          )}
        </Grid>
      </Root>
    </>
  );
});
