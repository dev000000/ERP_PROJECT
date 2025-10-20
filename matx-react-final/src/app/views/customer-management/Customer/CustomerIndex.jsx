import { useEffect, useMemo, useState } from "react";
import { observer } from "mobx-react";
import styled from "@mui/material/styles/styled";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";

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
import { GIOI_TINH_OPTIONS, TRANG_THAI_KHACH_HANG_OPTIONS } from "app/utils/constant-project";
import { GIOI_TINH_OPTIONS_2 } from "app/utils/constant-project";
import ButtonGroup from "@mui/material/ButtonGroup";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Grid from "@mui/material/Grid";
import ReusableAutocomplete from "app/components/ReusableComponent/ReusableAutocomplete";
import ReusableDateTimePicker from "app/components/ReusableComponent/ReusableDateTimePicker";
import { omit } from "lodash";
import * as Yup from "yup";
import { parseISO } from "date-fns";
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
const initialValuesCustomer = {
  MaKH: "",
  TenKH: "",
  GioiTinh: "",
  NgaySinh: "",
  SDT: "",
  DiaChi: "",
  TrangThai: ""
};
const validationSchema = Yup.object({
  TenKH: Yup.string()
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
  SDT: Yup.string()
    .required("Số điện thoại không được để trống")
    .matches(/^(0[0-9]{9})$/, "Số điện thoại không hợp lệ (phải có 10 chữ số)"),
  DiaChi: Yup.string().required("Địa chỉ không được để trống"),
  TrangThai: Yup.string().required("Trạng Thái không được để trống")
});
export default observer(function CustomerIndex() {
  const { customerStore } = useStore();
  const [rows, setRows] = useState([]);
  const [rowState, setRowState] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [initialValues, setInitialValues] = useState(initialValuesCustomer);
  const [openDialogAdd, setOpenDialogAdd] = useState(false);

  // --- SCHEMA: gom cau hinh + ham (function reference) ---
  const schema = useMemo(
    () => ({
      idKey: "MaKH",
      field1: "TenKH",
      field2: "GioiTinh",
      field3: "NgaySinh",
      field4: "SDT",
      field5: "DiaChi",
      field6: "TrangThai",
      idText: "Mã Khách Hàng",
      text1: "Tên KH",
      text2: "Giới Tính",
      text3: "Ngày Sinh",
      text4: "Số Điện Thoại",
      text5: "Địa Chỉ",
      text6: "Trạng Thái",
      optionsField2: GIOI_TINH_OPTIONS_2,
      optionsField6: TRANG_THAI_KHACH_HANG_OPTIONS,
      api: {
        list: () => customerStore.getCustomerList(),
        getList: () => customerStore.customerList || [],
        create: (payload) => customerStore.addCustomer(payload),
        update: (id, payload) => customerStore.updateCustomer(id, payload)
      }
    }),
    [customerStore]
  );

  // --- Load list qua schema ---
  useEffect(() => {
    (async () => {
      await schema.api.list();
      setRows(customerStore.customerList);
    })();
  }, [schema]);
  useEffect(() => {
    setRows(customerStore.customerList);
  },[customerStore.customerList])

  // --- Toolbar: them ban ghi moi (tao row tam dong) ---
  const EditToolbar = () => {
    const handleClick = () => {
      setInitialValues(initialValuesCustomer);
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
      const payloadBase  = omit(values, ["MaKH"]);
      const payload = {
        ...payloadBase,
        NgaySinh: toYMD(values.NgaySinh) 
      };

      schema.api.update(id, payload);
      setOpenDialogAdd(false);
    } else {
      const payloadBase = omit(values, ["MaKH"]);
      const payload = {
        ...payloadBase,
        NgaySinh: toYMD(values.NgaySinh) 
      };
      schema.api.create(payload);
      setOpenDialogAdd(false);
    }
  };
  // Actions tung hang
  const handleEditClick = (id) => () => {
    const row = customerStore.customerList.find((r) => r[schema.idKey] == id);
    setInitialValues(row);
    setOpenDialogAdd(true);
    setRowState("edit");
  };
  const handleCloseDialogAdd = () => {
    setRowState("");
    setOpenDialogAdd(false);
  };
  const handleRow = useMemo(() => {
    // Nếu chưa có dữ liệu rows thì trả mảng rỗng
    if (!rows || rows.length === 0) return [];

    // Nếu chọn "ALL" thì trả về toàn bộ
    if (statusFilter === "ALL") return rows;

    // Ngược lại thì lọc theo trạng thái
    return rows.filter((row) => row?.[schema.field6] === statusFilter);
  }, [rows, statusFilter]);

  // cot DataGrid: doc tu schema
  const columns = useMemo(
    () => [
      {
        field: schema.idKey,
        headerName: schema.idText,
        flex: 0.8,
        minWidth: 140,
        renderCell: (params) => {
          const s = String(params.value ?? "");
          return s.startsWith(schema.tempPrefix) ? "" : s;
        }
      },
      {
        field: schema.field1,
        headerName: schema.text1,
        flex: 1,
        minWidth: 160
      },
      {
        field: schema.field2,
        headerName: schema.text2,
        flex: 1.4,
        minWidth: 300
      },
      {
        field: schema.field3,
        headerName: schema.text3,
        flex: 1,
        minWidth: 100,
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
        minWidth: 100
      },
      {
        field: schema.field5,
        headerName: schema.text5,
        flex: 1,
        minWidth: 100
      },
      {
        field: schema.field6,
        headerName: schema.text6,
        flex: 1,
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
            />
          ];
        }
      }
    ],
    [schema]
  );

  return (
    <>
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
            {rowState == "edit" ? "Chỉnh sửa khách hàng" : "Thêm mới khách hàng"}
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
                    <ReusableTextField name="MaKH" label="Mã Khách Hàng" disabled />
                  </Grid>

                  <Grid item xs={12}>
                    <ReusableTextField name="TenKH" label="Tên KH" />
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
                    <ReusableTextField name="SDT" label="Số Điện Thoại" />
                  </Grid>

                  <Grid item xs={12}>
                    <ReusableTextField name="DiaChi" label="Địa Chỉ" />
                  </Grid>
                  <Grid item xs={12}>
                    <ReusableAutocomplete
                      name="TrangThai"
                      label="Trạng Thái"
                      options={TRANG_THAI_KHACH_HANG_OPTIONS}
                      isObject={false}
                      primitiveKey="value"
                      labelFormatter={(o) => o.label}
                    />
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
            <ButtonGroup sx={{ ml: 2, mt: "20px" }}>
              <Button
                variant={statusFilter === "ALL" ? "contained" : "outlined"}
                onClick={() => setStatusFilter("ALL")}
              >
                Tất cả
              </Button>
              <Button
                variant={statusFilter === "Active" ? "contained" : "outlined"}
                onClick={() => setStatusFilter("Active")}
              >
                Active
              </Button>
              <Button
                variant={statusFilter === "Block" ? "contained" : "outlined"}
                onClick={() => setStatusFilter("Block")}
              >
                Block
              </Button>
              +{" "}
            </ButtonGroup>
          </Form>
        </Formik>

        {/* DataGrid */}
        <Box sx={{ height: 520 }}>
          <DataGrid
            rows={handleRow}
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
