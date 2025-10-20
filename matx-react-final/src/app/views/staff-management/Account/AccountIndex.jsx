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
import ReusableDateTimePicker from "app/components/ReusableComponent/ReusableDateTimePicker";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import CloseIcon from "@mui/icons-material/Close";
import { useStore } from "app/stores";
import { DataGrid, GridActionsCellItem, GridToolbarContainer } from "@mui/x-data-grid";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Typography from "@mui/material/Typography";
import * as Yup from "yup";
import omit from "lodash/omit";
import { toast } from "react-toastify";
import ReusableAutocomplete from "app/components/ReusableComponent/ReusableAutocomplete";
import { ROLE_OPTIONS } from "app/utils/constant-project";
// Styled Root component for layout
const Root = styled("div")(() => ({
  maxWidth: "90%",
  margin: "20px auto"
}));
// Styled Button component
const ButtonCustom = styled(Button)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
}));

// Validation cho form
const validationSchema = Yup.object({
  MaNV: Yup.number()
    .min(1, "Mã nhân viên không hợp lệ")
    .required("Mã nhân viên không được để trống"),

  Username: Yup.string()
    .required("Tên đăng nhập không được để trống")
    .min(4, "Tên đăng nhập phải có ít nhất 4 ký tự")
    .max(50, "Tên đăng nhập không được vượt quá 50 ký tự"),

  Pass: Yup.string()
    .required("Mật khẩu không được để trống")
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
    .max(100, "Mật khẩu không được vượt quá 100 ký tự"),

  QuyenTruyCap: Yup.string()
    .required("Quyền truy cập không được để trống"),
});
const initialValuesAccount = {
  MaNV: "",
  Username: "",
  Pass: "",
  QuyenTruyCap: "",
  TenNhanVien: ""
};

export default observer(function AccountIndex() {
  const { accountStore, employeeStore } = useStore();
  // state cua dialog xac nhan
  const [confirmOpen, setConfirmOpen] = useState(false);
  // state cua row duoc chon
  const [rowState, setRowState] = useState("");
  const [initialValues, setInitialValues] = useState(initialValuesAccount);
  // state dialog add
  const [openDialogAdd, setOpenDialogAdd] = useState(false);

  // --- SCHEMA: gom cau hinh + ham (function reference) ---
  const schema = useMemo(
    () => ({
      idKey: "MaNV",
      field1: "Username",
      field2: "Pass",
      field3: "QuyenTruyCap",
      field4: "TenNhanVien",
      idText: "Mã Nhân Viên",
      text1: "Tên đăng nhập",
      text2: "Mật Khẩu",
      text3: "Quyền Truy Cập",
      text4: "Tên Nhân Viên",

      api: {
        list: () => accountStore.getAccountList(),
        getList: () => accountStore.accountList || [],
        create: (payload) => accountStore.addAccount(payload),
        update: (id, payload) => accountStore.updateAccount(id, payload),
        remove: (id) => accountStore.deleteAccount(id)
      }
    }),
    [accountStore]
  );

  // --- Load list qua schema ---
  useEffect(() => {
    const LoadAllData = async () => {
      await schema.api.list();
      if (!employeeStore.isLoaded) {
        await employeeStore.getEmployeeList();
      }
    };
    LoadAllData();
  }, [schema]);

  // lay rows tu schema (ko dung tt bien store rai tac)
  const rows = schema.api.getList();

  // --- Toolbar: them ban ghi moi ---
  const EditToolbar = () => {
    const handleClick = () => {
      setInitialValues(initialValuesAccount);
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

  // close dialog confirm
  const handleConfirmClose = () => {
    setConfirmOpen(false);
    setRowState("");
  };
  // confirm dialog
  const handleConfirmDelete = async () => {
    console.log(initialValues);
    if (initialValues.QuyenTruyCap == "Quản trị viên") {
      toast.error("Không thể xóa tài khoản Quản trị viên");
    } else {
      await schema.api.remove(initialValues[schema.idKey]);
    }

    handleConfirmClose();
  };
  // close dialog add
  const handleCloseDialogAdd = () => {
    setRowState("");
    setOpenDialogAdd(false);
  };
  const handleSubmitForm = (values) => {
    console.log(values);
    if (accountStore.accountList.some((acc) => acc.MaNV == values.MaNV)) {
      toast.error("Nhân viên này đã có tài khoản");
    } else {
      const payload = omit(values, ["TenNhanVien"]);
      accountStore.addAccount(payload);
    }

    handleCloseDialogAdd();
  };

  // nhan nut edit
  const handleEditClick = (id) => () => {
    const row = accountStore.accountList.find((r) => r?.[schema.idKey] === id);
    setInitialValues(row);
    setOpenDialogAdd(true);
    setRowState("edit");
  };
  // nhan nut delete
  const handleDeleteClick = (id) => () => {
    const row = accountStore.accountList.find((r) => r[schema.idKey] == id);
    setRowState("delete");
    setInitialValues(row);
    setConfirmOpen(true);
  };

  // cot DataGrid: doc tu schema
  const columns = useMemo(
    () => [
      {
        field: schema.idKey,
        headerName: schema.idText,
        flex: 0.5,
        minWidth: 100
      },
      {
        field: schema.field1,
        headerName: schema.text1,
        flex: 1.2,
        minWidth: 200,
        editable: true
      },
      {
        field: schema.field2,
        headerName: schema.text2,
        flex: 0.4,
        minWidth: 50,
        editable: true
      },
      {
        field: schema.field3,
        headerName: schema.text3,
        flex: 0.8,
        minWidth: 110,
        editable: true
      },
      {
        field: schema.field4,
        headerName: schema.text4,
        flex: 1,
        minWidth: 150,
        editable: true
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
      {/* Dialog xac nhan xoa */}
      <Dialog
        open={confirmOpen}
        onClose={handleConfirmClose}
        aria-labelledby="confirm-delete-title"
      >
        <DialogTitle id="confirm-delete-title">Xác nhận xóa</DialogTitle>
        <DialogContent dividers>
          <Typography variant="body2">
            Bạn có chắc chắn muốn xóa Nhân Viên
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
            {rowState == "edit" ? "Chỉnh sửa tài khoản" : "Thêm mới tài khoản"}
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
          // innerRef={formikRef}
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
                    <ReusableAutocomplete
                      name="MaNV"
                      label="Mã Nhân Viên"
                      options={employeeStore.employeeList}
                      isObject={false}
                      primitiveKey="MaNV"
                      labelFormatter={(o) => `${o.MaNV} - ${o.HoTen}`}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <ReusableTextField name="Username" label="Tên đăng nhập" />
                  </Grid>
                  <Grid item xs={12}>
                    <ReusableTextField name="Pass" label="Mật Khẩu" />
                  </Grid>

                  <Grid item xs={12}>
                    <ReusableAutocomplete
                      name="QuyenTruyCap"
                      label="Quyền Truy Cập"
                      options={ROLE_OPTIONS}
                      isObject={false}
                      primitiveKey="value"
                      labelFormatter={(o) => o.label}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <ReusableTextField name="TenNhanVien" label="Tên Nhân Viên" disabled />
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
            rows={rows}
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
