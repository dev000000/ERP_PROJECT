import { useEffect, useMemo, useState } from "react";
import { observer } from "mobx-react";
import styled from "@mui/material/styles/styled";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import CancelIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { Formik, Form } from "formik";
import ReusableTextField from "app/components/ReusableComponent/ReusableTextField";
import { useStore } from "app/stores";
import {
  DataGrid,
  GridActionsCellItem,
  GridRowModes,
  GridRowEditStopReasons,
  GridToolbarContainer
} from "@mui/x-data-grid";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Grid from "@mui/material/Grid";
import { omit } from "lodash";
import * as Yup from "yup";
import { toYMD } from "app/utils/utils";
// Styled Root component for layout
const Root = styled("div")(() => ({
  maxWidth: "90%",
  margin: "20px auto"
}));
const ButtonCustom = styled(Button)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
}));
const initialValuesSupplier = {
  MaNhaCungCap: "",
  TenNCC: "",
  DiaChi: "",
  Email: "",
  SDT: ""
};
const validationSchema = Yup.object({
  TenNCC: Yup.string()
    .required("Tên NCC không được để trống")
    .max(100, "Tên NCC không được vượt quá 100 ký tự"),
  DiaChi: Yup.string().required("Địa chỉ không được để trống"),
  SDT: Yup.string()
    .required("Số điện thoại không được để trống")
    .matches(/^(0[0-9]{9})$/, "Số điện thoại không hợp lệ (phải có 10 chữ số)"),
  Email: Yup.string().required("Email không được để trống").email("Email không hợp lệ")
});
export default observer(function SupplierIndex() {
  const { supplierStore } = useStore();
  const [rowState, setRowState] = useState("");
  const [initialValues, setInitialValues] = useState(initialValuesSupplier);
  const [openDialogAdd, setOpenDialogAdd] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState(false);

  // --- SCHEMA: gom cau hinh + ham (function reference) ---
  const schema = useMemo(
    () => ({
      idKey: "MaNhaCungCap",
      field1: "TenNCC",
      field2: "DiaChi",
      field3: "Email",
      field4: "SDT",
      idText: "Mã Nhà Cung Cấp",
      text1: "Tên NCC",
      text2: "Địa Chỉ",
      text3: "Email",
      text4: "Số Điện Thoại",
      api: {
        list: () => supplierStore.getSupplierList(),
        getList: () => supplierStore.supplierList || [],
        create: (payload) => supplierStore.addSupplier(payload),
        update: (id, payload) => supplierStore.updateSupplier(id, payload),
        delete: (id) => supplierStore.deleteSupplier(id)
      }
    }),
    [supplierStore]
  );

  // --- Load list qua schema ---
  useEffect(() => {
    schema.api.list();
  }, [schema]);

  // --- Toolbar: them ban ghi moi (tao row tam dong) ---
  const EditToolbar = () => {
    const handleClick = () => {
      setInitialValues(initialValuesSupplier);
      setOpenDialogAdd(true);
    };

    return (
      <GridToolbarContainer>
        <Button startIcon={<AddIcon />} onClick={handleClick}>
          Thêm mới
        </Button>
      </GridToolbarContainer>
    );
  };
  const handleSubmitForm = (values) => {
    console.log(values);
    if (rowState == "edit") {
      const id = values[schema.idKey];
      const payloadBase = omit(values, ["MaNhaCungCap"]);
      schema.api.update(id, payloadBase);
      setOpenDialogAdd(false);
    } else {
      const payloadBase = omit(values, ["MaNhaCungCap"]);
      schema.api.create(payloadBase);
      setOpenDialogAdd(false);
    }
  };
  // Actions tung hang
  const handleEditClick = (id) => () => {
    const row = supplierStore.supplierList.find((r) => r[schema.idKey] == id);
    setInitialValues(row);
    setOpenDialogAdd(true);
    setRowState("edit");
  };
  const handleDeleteClick = (id) => () => {
    const row = supplierStore.supplierList.find((r) => r[schema.idKey] == id);
    setInitialValues(row);
    setConfirmDialog(true);
    setRowState("delete");
  };
  const handleConfirmDelete = () => {
    supplierStore.deleteSupplier(initialValues.MaNhaCungCap);
    handleConfirmClose();
  };
  const handleConfirmClose = () => {
    setConfirmDialog(false);
  };
  const handleCloseDialogAdd = () => {
    setRowState("");
    setInitialValues(initialValuesSupplier);
    setOpenDialogAdd(false);
  };
  // cot DataGrid: doc tu schema
  const columns = useMemo(
    () => [
      {
        field: schema.idKey,
        headerName: schema.idText,
        flex: 1,
        minWidth: 200
      },
      {
        field: schema.field1,
        headerName: schema.text1,
        flex: 1,
        minWidth: 350
      },
      {
        field: schema.field2,
        headerName: schema.text2,
        flex: 1.4,
        minWidth: 150
      },
      {
        field: schema.field3,
        headerName: schema.text3,
        flex: 1.4,
        minWidth: 300
      },
      {
        field: schema.field4,
        headerName: schema.text4,
        flex: 1.4,
        minWidth: 100
      },
      {
        field: "actions",
        type: "actions",
        headerName: "Thao Tác",
        width: 100,
        cellClassName: "actions",
        getActions: ({ id }) => {
          return [
            <GridActionsCellItem
              key="edit"
              icon={<EditIcon />}
              label="Edit"
              onClick={handleEditClick(id)}
              color="inherit"
            />,
            <GridActionsCellItem
              key="delete"
              icon={<DeleteIcon />}
              label="Delete"
              onClick={handleDeleteClick(id)}
              color="inherit"
            />
          ];
        }
      }
    ],
    [schema]
  );

  return (
    <>
      <Dialog
        open={confirmDialog}
        onClose={handleConfirmClose}
        aria-labelledby="confirm-delete-title"
      >
        <DialogTitle id="confirm-delete-title">Xác nhận xóa</DialogTitle>
        <DialogContent dividers>
          <Typography variant="body2">
            Bạn có chắc chắn muốn xóa
            {initialValues?.[schema.field1] ? (
              <>
                {" "}
                “<b>{initialValues?.[schema.field1]}</b>”
              </>
            ) : (
              " bản ghi này"
            )}
            không? Hành động này không thể hoàn tác.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmClose} startIcon={<CancelIcon />}>
            Hủy
          </Button>
          <Button
            color="error"
            variant="contained"
            onClick={handleConfirmDelete}
            startIcon={<DeleteIcon />}
          >
            Xóa
          </Button>
        </DialogActions>
      </Dialog>
      {/* Dialog them, sua  */}
      <Dialog onClose={handleCloseDialogAdd} open={openDialogAdd}>
        {/* Dialog Title tùy biến với sx */}
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
            {rowState == "edit" ? "Chỉnh sửa Nhà Cung Cấp" : "Thêm mới Nhà Cung Cấp"}
          </Typography>

          <IconButton
            aria-label="close"
            onClick={handleCloseDialogAdd}
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
                    <ReusableTextField name="MaNhaCungCap" label="Mã Nhà Cung Cấp" disabled />
                  </Grid>

                  <Grid item xs={12}>
                    <ReusableTextField name="TenNCC" label="Tên NCC" />
                  </Grid>
                  <Grid item xs={12}>
                    <ReusableTextField name="DiaChi" label="Địa Chỉ" />
                  </Grid>

                  <Grid item xs={12}>
                    <ReusableTextField name="Email" label="Email" />
                  </Grid>

                  <Grid item xs={12}>
                    <ReusableTextField name="SDT" label="Số điện thoại" />
                  </Grid>
                </Grid>
              </DialogContent>

              <DialogActions sx={{ px: 2, py: 1 }}>
                <ButtonCustom variant="contained" color="primary" type="submit">
                  Lưu lại
                </ButtonCustom>
                <Button variant="contained" color="secondary" onClick={handleCloseDialogAdd}>
                  Thoát
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </Dialog>
      <Root>
        {/* Form tim kiem (placeholder) */}
        <Formik initialValues={{ keyword: "" }} onSubmit={() => {}}>
          <Form autoComplete="off">
            <ReusableTextField
              name="keyword"
              sx={{
                margin: "20px 0",
                width: "400px",
                "& .MuiOutlinedInput-root": { borderRadius: "4px 0 0 4px" }
              }}
              placeholder="Nhập từ khóa..."
              size="small"
            />
            <Button
              variant="contained"
              color="primary"
              size="medium"
              sx={{ borderRadius: "0 4px 4px 0", py: "6.8px", margin: "20px 0" }}
              type="submit"
            >
              <SearchIcon />
            </Button>
          </Form>
        </Formik>

        {/* DataGrid */}
        <Box sx={{ height: 520 }}>
          <DataGrid
            rows={supplierStore.supplierList}
            getRowId={(row) => row[schema.idKey]}
            columns={columns}
            pageSizeOptions={[5, 10, 20]}
            initialState={{
              pagination: { paginationModel: { pageSize: 20, page: 0 } },
              sorting: { sortModel: [{ field: schema.idKey, sort: "desc" }] }
            }}
            disableRowSelectionOnClick
            showToolbar
            slots={{ toolbar: EditToolbar }}
          />
        </Box>
      </Root>
    </>
  );
});
