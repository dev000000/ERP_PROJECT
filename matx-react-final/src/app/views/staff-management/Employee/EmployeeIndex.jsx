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
import { GIOI_TINH_OPTIONS } from "app/utils/constant-project";
import * as Yup from "yup";
import ReusableAutocomplete from "app/components/ReusableComponent/ReusableAutocomplete";
import omit from "lodash/omit";
import { parseISO } from "date-fns";
import { mapEmployeeData } from "app/utils/mapEmployData";
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
  HoTen: Yup.string()
    .required("Họ tên không được để trống")
    .max(100, "Họ tên không được vượt quá 100 ký tự"),
  GioiTinh: Yup.string().required("Giới tính không được để trống"),
  NgaySinh: Yup.date()
    .transform((value, originalValue) => {
      if (typeof originalValue === "string") {
        const d = parseISO(originalValue);
        return isNaN(d) ? value : d;
      }
      return value;
    })
    .required("Ngày sinh không được để trống")
    .max(new Date(), "Ngày sinh không hợp lệ"),
  ThuongTru: Yup.string().required("Thường trú không được để trống"),
  TamTru: Yup.string().required("Tạm trú không được để trống"),
  SoCMND: Yup.string()
    .required("Số CMND/CCCD không được để trống")
    .matches(/^(\d{9}|\d{12})$/, "CMND/CCCD phải 9 hoặc 12 số"),
  SDT: Yup.string()
    .required("Số điện thoại không được để trống")
    .matches(/^(0[0-9]{9})$/, "Số điện thoại không hợp lệ (phải có 10 chữ số)"),
  Email: Yup.string().required("Email không được để trống").email("Email không hợp lệ"),
  MaChucVu: Yup.string().required("Chức vụ không được để trống"),
  MaPhong: Yup.string().required("Phòng ban không được để trống"),
  MaTDHV: Yup.string().required("Trình độ học vấn không được để trống"),
  MaTDNN: Yup.string().required("Trình độ ngoại ngữ không được để trống"),
  MaBac: Yup.string().required("Bậc lương không được để trống"),
  SoTaiKhoan: Yup.string()
    .required("Số tài khoản không được để trống")
    .matches(/^\d{10,20}$/, "Số tài khoản phải từ 10–20 chữ số"),
  NganHang: Yup.string().required("Ngân hàng không được để trống")
});
const initialValuesEmployee = {
  MaNV: "",
  HoTen: "",
  GioiTinh: "",
  NgaySinh: "",
  ThuongTru: "",
  TamTru: "",
  SoCMND: "",
  SDT: "",
  Email: "",
  MaChucVu: null,
  MaPhong: null,
  MaTDHV: null,
  MaTDNN: null,
  MaBac: null,
  SoTaiKhoan: "",
  NganHang: ""
};

export default observer(function EmployeeIndex() {
  const {
    employeeStore,
    positionStore,
    educationLevelStore,
    foreignLanguageLevelStore,
    departmentStore,
    salaryRankStore
  } = useStore();
  // state cua dialog xac nhan
  const [confirmOpen, setConfirmOpen] = useState(false);
  // state cua row duoc chon
  const [rowState, setRowState] = useState("");
  const [initialValues, setInitialValues] = useState(initialValuesEmployee);
  // state dialog add
  const [openDialogAdd, setOpenDialogAdd] = useState(false);

  // --- SCHEMA: gom cau hinh + ham (function reference) ---
  const schema = useMemo(
    () => ({
      idKey: "MaNV",
      field1: "HoTen",
      field2: "GioiTinh",
      field3: "NgaySinh",
      field4: "ThuongTru",
      field5: "TamTru",
      field6: "SoCMND",
      field7: "SDT",
      field8: "Email",
      field9: "TenChucVu",
      idText: "Mã Nhân Viên",
      text1: "Họ và Tên",
      text2: "Giới Tính",
      text3: "Ngày Sinh",
      text4: "Thường Trú",
      text5: "Tạm Trú",
      text6: "CMND",
      text7: "Số Điện Thoại",
      text8: "Email",
      text9: "Chức Vụ",

      optionsField2: GIOI_TINH_OPTIONS,

      api: {
        list: () => employeeStore.getEmployeeList(),
        getList: () => employeeStore.employeeList || [],
        create: (payload) => employeeStore.addEmployee(payload),
        update: (id, payload) => employeeStore.updateEmployee(id, payload),
        remove: (id) => employeeStore.deleteEmployee(id)
      }
    }),
    [employeeStore]
  );

  // --- Load list qua schema ---
  useEffect(() => {
    const LoadAllData = async () => {
      await schema.api.list();
      if (!positionStore.isLoaded) {
        await positionStore.getPositionList();
      }
      if (!educationLevelStore.isLoaded) {
        await educationLevelStore.getEducationLevelList();
      }
      if (!foreignLanguageLevelStore.isLoaded) {
        await foreignLanguageLevelStore.getForeignLanguageLevelList();
      }
      if (!departmentStore.isLoaded) {
        await departmentStore.getDepartmentList();
      }
      if (!salaryRankStore.isLoaded) {
        await salaryRankStore.getSalaryRankList();
      }
    };
    LoadAllData();
  }, [schema]);

  // lay rows tu schema (ko dung tt bien store rai tac)
  const rows = schema.api.getList();

  // --- Toolbar: them ban ghi moi ---
  const EditToolbar = () => {
    const handleClick = () => {
      setInitialValues(initialValuesEmployee);
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
    await schema.api.remove(initialValues[schema.idKey]);
    handleConfirmClose();
  };
  // close dialog add
  const handleCloseDialogAdd = () => {
    setRowState("");
    setOpenDialogAdd(false);
  };
  const handleSubmitForm = (values) => {
    // Loai bo MaNV ra truoc khi gui
    console.log(values);
    if(rowState == "edit") {
      const id = values[schema.idKey];
      const payload = omit(values, ["MaNV"]);
      employeeStore.updateEmployee(id,payload);

    }else {
      const payload = omit(values, ["MaNV"]);
      employeeStore.addEmployee(payload);
    }
    
    handleCloseDialogAdd();
  };

  // nhan nut edit
  const handleEditClick = (id) => () => {
    const row = employeeStore.employeeList.find((r) => r?.[schema.idKey] === id);
    
    const mapped = mapEmployeeData(row, {
      positionStore,
      departmentStore,
      educationLevelStore,
      foreignLanguageLevelStore,
      salaryRankStore
    });
    setInitialValues(mapped);
    setOpenDialogAdd(true);
    setRowState("edit");
  };
  // nhan nut delete
  const handleDeleteClick = (id) => () => {
    const row = employeeStore.employeeList.find((r) => r[schema.idKey] == id);
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
        minWidth: 100,
        renderCell: (params) => {
          const s = String(params.value ?? "");
          return s.startsWith(schema.tempPrefix) ? "" : s;
        }
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
        editable: true,
        type: "singleSelect",
        valueOptions: schema.optionsField2
      },
      {
        field: schema.field3,
        headerName: schema.text3,
        flex: 0.8,
        minWidth: 110,
        editable: true,
        renderCell: (params) => {
          if (!params.value) return "";
          const date = new Date(params.value);
          return date.toLocaleDateString("vi-VN");
        }
      },
      {
        field: schema.field4,
        headerName: schema.text4,
        flex: 1,
        minWidth: 150,
        editable: true
      },
      {
        field: schema.field5,
        headerName: schema.text5,
        flex: 1,
        minWidth: 150,
        editable: true
      },
      {
        field: schema.field6,
        headerName: schema.text6,
        flex: 0.8,
        minWidth: 120,
        editable: true
      },
      {
        field: schema.field7,
        headerName: schema.text7,
        flex: 0.7,
        minWidth: 110,
        editable: true
      },
      {
        field: schema.field8,
        headerName: schema.text8,
        flex: 1.2,
        minWidth: 180,
        editable: true
      },
      {
        field: schema.field9,
        headerName: schema.text9,
        flex: 0.8,
        minWidth: 120,
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
            {rowState == "edit" ? "Chỉnh sửa nhân viên" : "Thêm mới nhân viên"}
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
                    <ReusableTextField name="MaNV" label="Mã Nhân Viên" disabled />
                  </Grid>

                  <Grid item xs={12}>
                    <ReusableTextField name="HoTen" label="Họ và Tên" />
                  </Grid>

                  <Grid item xs={12}>
                    <ReusableAutocomplete
                      name="GioiTinh"
                      label="Giới Tính"
                      options={GIOI_TINH_OPTIONS}
                      isObject={false}
                      primitiveKey="value"
                      labelFormatter={(o) => o.label}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <ReusableDateTimePicker name="NgaySinh" label="Ngày Sinh" />
                  </Grid>

                  <Grid item xs={12}>
                    <ReusableTextField name="ThuongTru" label="Thường Trú" />
                  </Grid>

                  <Grid item xs={12}>
                    <ReusableTextField name="TamTru" label="Tạm Trú" />
                  </Grid>

                  <Grid item xs={12}>
                    <ReusableTextField name="SoCMND" label="Số CMND" />
                  </Grid>

                  <Grid item xs={12}>
                    <ReusableTextField name="Email" label="Email" />
                  </Grid>
                  <Grid item xs={12}>
                    <ReusableAutocomplete
                      name="MaChucVu"
                      label="Chức Vụ"
                      options={positionStore.positionList}
                      isObject={false}
                      primitiveKey="MaChucVu"
                      labelFormatter={(o) => `${o.MaChucVu} - ${o.TenChucVu}`}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <ReusableAutocomplete
                      name="MaPhong"
                      label="Phòng ban"
                      options={departmentStore.departmentList}
                      isObject={false}
                      primitiveKey="MaPhongBan"
                      labelFormatter={(o) => `${o.MaPhongBan} - ${o.TenPhongBan}`}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <ReusableAutocomplete
                      name="MaTDHV"
                      label="Trình độ học vấn"
                      options={educationLevelStore.educationLevelList}
                      isObject={false}
                      primitiveKey="MaTDHV"
                      labelFormatter={(o) => `${o.LoaiTrinhDo} - ${o.TenTrinhDo}`}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <ReusableAutocomplete
                      name="MaTDNN"
                      label="Trình Độ Ngoại Ngữ"
                      options={foreignLanguageLevelStore.foreignLanguageLevelList}
                      isObject={false}
                      primitiveKey="MaTDNN"
                      labelFormatter={(o) => `${o.LoaiNgoaiNgu} - ${o.CapDoNgoaiNgu}`}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <ReusableAutocomplete
                      name="MaBac"
                      label="Mã Bậc"
                      options={salaryRankStore.salaryRankList}
                      isObject={false}
                      primitiveKey="MaBac"
                      labelFormatter={(o) => `${o.TenBac} - ${o.BacLuong}`}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <ReusableTextField name="SoTaiKhoan" label="Số Tài Khoản" />
                  </Grid>
                  <Grid item xs={12}>
                    <ReusableTextField name="NganHang" label="Ngân Hàng" />
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
