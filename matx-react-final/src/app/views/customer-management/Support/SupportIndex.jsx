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
import { TRANG_THAI_CHAM_SOC_KH_OPTIONS } from "app/utils/constant-project";
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
// Styled Root component for layout
const Root = styled("div")(() => ({
  maxWidth: "90%",
  margin: "20px auto"
}));
const ButtonCustom = styled(Button)(() => ({
  borderRadius: 12
}));

const validationSchema = Yup.object({
  TrangThai: Yup.string().required("Trạng Thái không được để trống")
});

const initialValuesSupport = {
  TenKH: "",
  GioiTinh: "",
  NgaySinh: "",
  SDT: "",
  DiaChi: "",
  MaDVCSKH: 0,
  LoaiPhanHoi: "",
  TrangThai: "",
  TenNV: "",
  EmailNV: ""
};
const statusColor = (value) => {
  switch (value) {
    case "Đã ghi nhận":
      return "info";
    case "Đang xử lý":
      return "primary";
    case "Đã liên hệ khách hàng":
      return "success";
    case "Đã hoàn thành":
      return "secondary";
    case "Chưa xử lí":
      return "warning";
    default:
      return "default";
  }
};
const statusLabel = (value) => {
  const found = TRANG_THAI_CHAM_SOC_KH_OPTIONS?.find((o) => o.value === value);
  return found?.label || value || "—";
};

export default observer(function SupportIndex() {
  const { supportStore } = useStore();
  const { supportList } = supportStore;
  const [initialValues, setInitialValues] = useState(initialValuesSupport);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    supportStore.getSupportList();
  }, []);

  const handleOpenDialog = (row) => {
    console.log(row);
    setInitialValues(row);
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const handleSubmitForm = (values) => {
    const dataUpdate = { TrangThai: values.TrangThai };
    supportStore.updateSupport(values.MaDVCSKH, { TrangThai: values.TrangThai });
    handleCloseDialog();
  };
  return (
    <>
      <Dialog onClose={handleCloseDialog} open={openDialog}>
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
            Xem chi tiết
          </Typography>

          <IconButton
            aria-label="close"
            onClick={handleCloseDialog}
            sx={{ position: "absolute", right: 8, top: 8, color: "#fff" }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            handleSubmitForm(values);
          }}
        >
          {({ values }) => (
            <Form autoComplete="off">
              <DialogContent dividers sx={{ width: 600 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <ReusableTextField name="TenKH" label="Tên KH" disabled />
                  </Grid>
                  <Grid item xs={12}>
                    <ReusableTextField name="GioiTinh" label="Giới Tính" disabled />
                  </Grid>
                  <Grid item xs={12}>
                    <ReusableTextField name="LoaiPhanHoi" label="Loại Phản Hồi" disabled />
                  </Grid>

                  <Grid item xs={12}>
                    <ReusableDateTimePicker name="NgaySinh" label="Ngày Sinh" disabled />
                  </Grid>

                  <Grid item xs={12}>
                    <ReusableTextField name="SDT" label="Số Điện Thoại" disabled />
                  </Grid>

                  <Grid item xs={12}>
                    <ReusableTextField name="DiaChi" label="Địa Chỉ" disabled />
                  </Grid>
                  <Grid item xs={12}>
                    <ReusableAutocomplete
                      name="TrangThai"
                      label="Trạng Thái"
                      options={TRANG_THAI_CHAM_SOC_KH_OPTIONS}
                      isObject={false}
                      primitiveKey="value"
                      labelFormatter={(o) => o.label}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <ReusableTextField name="TenNV" label="Tên Nhân Viên" disabled />
                  </Grid>
                  <Grid item xs={12}>
                    <ReusableTextField name="EmailNV" label="Email Nhân Viên" disabled />
                  </Grid>
                </Grid>
              </DialogContent>

              <DialogActions sx={{ px: 2, py: 1 }}>
                <ButtonCustom variant="contained" color="primary" type="submit">
                  Chuyển trạng thái
                </ButtonCustom>
                <Button variant="contained" color="secondary" onClick={handleCloseDialog}>
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
            Danh sách chăm sóc khách hàng
          </Typography>
        </Box>

        {/* Grid Card */}
        <Grid container spacing={2}>
          {supportList.map((row) => (
            <Grid item xs={12} sm={6} md={4} key={row.MaDVCSKH}>
              <Card sx={{ height: "100%", borderRadius: 3 }}>
                <CardContent>
                  <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                      {"Mã DVCSKH: " + row.MaDVCSKH}
                    </Typography>
                    <Chip
                      size="small"
                      label={statusLabel(row.TrangThai)}
                      color={statusColor(row.TrangThai)}
                      variant="filled"
                    />
                  </Stack>

                  <Box sx={{ mt: 1.5 }}>
                    <Typography variant="body2">
                      <b>Tên KH:</b> {row.TenKH || "—"}
                    </Typography>
                    <Typography variant="body2">
                      <b>Loại Phản Hồi:</b> {row.LoaiPhanHoi || "—"}
                    </Typography>
                  </Box>
                </CardContent>

                <CardActions sx={{ px: 2, pb: 2 }}>
                  <ButtonCustom
                    size="small"
                    variant="contained"
                    onClick={() => handleOpenDialog(row)}
                  >
                    Xem chi tiết
                  </ButtonCustom>
                </CardActions>
              </Card>
            </Grid>
          ))}

          {!supportList?.length && (
            <Grid item xs={12}>
              <Box sx={{ py: 8, textAlign: "center", opacity: 0.7 }}>Không có dữ liệu.</Box>
            </Grid>
          )}
        </Grid>
      </Root>
    </>
  );
});
