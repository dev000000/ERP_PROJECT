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
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Grid from "@mui/material/Grid";
import { omit } from "lodash";
import * as Yup from "yup";
import { toYMD } from "app/utils/utils";
import ReusableAutocomplete from "app/components/ReusableComponent/ReusableAutocomplete";
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
const initialValuesMaterials = {
  MaNVL: "",
  TenNVL: "",
  DonViTinh: "",
  DonGia: "",
  MaNhaCungCap: ""
};
const validationSchema = Yup.object({
  TenNVL: Yup.string()
    .required("Tên nguyên vật liệu không được để trống")
    .max(100, "Tên nguyên vật liệu không được vượt quá 100 ký tự"),

  DonViTinh: Yup.string()
    .required("Đơn vị tính không được để trống")
    .max(50, "Đơn vị tính không được vượt quá 50 ký tự"),

  DonGia: Yup.number()
    .typeError("Đơn giá phải là số")
    .integer("Đơn giá phải là số nguyên")
    .min(0, "Đơn giá không được âm")
    .required("Đơn giá không được để trống"),

  MaNhaCungCap: Yup.string().required("Mã nhà cung cấp không được để trống")
});
export default observer(function MaterialsIndex() {
  const { materialsStore, supplierStore } = useStore();
  const [rowState, setRowState] = useState("");
  const [initialValues, setInitialValues] = useState(initialValuesMaterials);
  const [openDialogAdd, setOpenDialogAdd] = useState(false);

  // --- SCHEMA: gom cau hinh + ham (function reference) ---
  const schema = useMemo(
    () => ({
      idKey: "MaNVL",
      field1: "TenNVL",
      field2: "DonViTinh",
      field3: "DonGia",
      field4: "TenNCC",
      idText: "Mã Nguyên Vật Liệu",
      text1: "Tên Nguyên Vật Liệu",
      text2: "Đơn vị tính",
      text3: "Đơn Giá",
      text4: "Tên Nhà Cung Cấp",
      api: {
        list: () => materialsStore.getMaterialsList(),
        getList: () => materialsStore.materialsList || [],
        create: (payload) => materialsStore.addMaterials(payload),
        update: (id, payload) => materialsStore.updateMaterials(id, payload),
        delete: (id) => materialsStore.deleteMaterials(id)
      }
    }),
    [materialsStore]
  );

  // --- Load list qua schema ---
  useEffect(() => {
    (async () => {
      await schema.api.list();
      if (!supplierStore.isLoaded) {
        await supplierStore.getSupplierList();
      }
    })();
  }, [schema]);

  // --- Toolbar: them ban ghi moi (tao row tam dong) ---
  const EditToolbar = () => {
    const handleClick = () => {
      setInitialValues(initialValuesMaterials);
      setRowState("add");
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
      const payloadBase = omit(values, ["MaNVL"]);
      schema.api.update(id, payloadBase);
      setOpenDialogAdd(false);
    } else {
      const payloadBase = omit(values, ["MaNVL"]);
      schema.api.create(payloadBase);
      setOpenDialogAdd(false);
    }
  };
  // Actions tung hang
  const handleEditClick = (id) => () => {
    const row = materialsStore.materialsList.find((r) => r[schema.idKey] == id);
    const supplier = supplierStore.supplierList.find((s) => s.TenNCC === row.TenNCC);
    const updateRow = {
      MaNVL: row.MaNVL,
      TenNVL: row.TenNVL,
      DonViTinh: row.DonViTinh,
      DonGia: row.DonGia,
      MaNhaCungCap: supplier.MaNhaCungCap ,
    }
    console.log(updateRow);
    setInitialValues(updateRow);
    setOpenDialogAdd(true);
    setRowState("edit");
  };
  const handleDeleteClick = (id) => () => {
    materialsStore.deleteMaterials(id);
    setRowState("delete");
  };
  const handleCloseDialogAdd = () => {
    setRowState("");
    setInitialValues(initialValuesMaterials);
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
        minWidth: 100,
        renderCell: (params) => {
          const value = Number(params.value || 0);
          return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND"
          }).format(value);
        }
      },
      {
        field: schema.field4,
        headerName: schema.text4,
        flex: 1.4,
        minWidth: 300
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
            {rowState == "edit" ? "Chỉnh sửa Nguyên Vật Liệu" : "Thêm mới Nguyên Vật Liệu"}
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
                    <ReusableTextField name="MaNVL" label="Mã Nguyên Vật Liệu" disabled />
                  </Grid>

                  <Grid item xs={12}>
                    <ReusableTextField name="TenNVL" label="Tên Nguyên Vật Liệu" />
                  </Grid>
                  <Grid item xs={12}>
                    <ReusableTextField name="DonViTinh" label="Đơn vị Tính" />
                  </Grid>

                  <Grid item xs={12}>
                    <ReusableTextField name="DonGia" label="Đơn giá" />
                  </Grid>

                  <Grid item xs={12}>
                    <ReusableAutocomplete
                      name="MaNhaCungCap"
                      label="Tên Nhà Cung Cấp"
                      options={supplierStore.supplierList}
                      isObject={false}
                      primitiveKey="MaNhaCungCap"
                      labelFormatter={(o) => `${o.TenNCC} (id: ${o.MaNhaCungCap})`}
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
          </Form>
        </Formik>

        {/* DataGrid */}
        <Box sx={{ height: 520 }}>
          <DataGrid
            rows={materialsStore.materialsList}
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
