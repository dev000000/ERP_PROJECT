import { useEffect, useMemo, useState } from "react";
import { observer } from "mobx-react";
import { runInAction } from "mobx";
import styled from "@mui/material/styles/styled";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
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
import { toast } from "react-toastify";
import {TRANG_THAI_PHONG_BAN_OPTIONS} from "app/utils/constant-project";
import { existsByFields } from "app/utils/existsByFields";

// Styled Root component for layout
const Root = styled("div")(() => ({
  maxWidth: "90%",
  margin: "20px auto"
}));

// Prefix cho id tam (row moi chua co id that su tu server)
const TEMP_PREFIX = "NEW-";

export default observer(function DepartmentIndex() {
  const { departmentStore } = useStore();

  const [rowModesModel, setRowModesModel] = useState({});
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [deletingRow, setDeletingRow] = useState(null);

  // --- SCHEMA: gom cau hinh + ham (function reference) ---
  const schema = useMemo(
    () => ({
      idKey: "MaPhongBan",
      field1: "TenPhongBan",
      field2: "DiaChi",
      field3:"TrangThai",
      idText: "Mã Phòng Ban",
      text1: "Tên Phòng Ban",
      text2: "Địa Chỉ",
      text3: "Trạng Thái",
      tempPrefix: TEMP_PREFIX,
      optionsField3: TRANG_THAI_PHONG_BAN_OPTIONS,

      api: {
        list: () => departmentStore.getDepartmentList(),
        getList: () => departmentStore.departmentList || [],
        create: (payload) => departmentStore.addDepartment(payload),
        update: (id, payload) => departmentStore.updateDepartment(id, payload),
        remove: (id) => departmentStore.deleteDepartment(id),

        // them row tam
        pushTempRow: (row) => {
          runInAction(() => {
            departmentStore.departmentList = [row, ...(departmentStore.departmentList || [])];
          });
        },
        // xoa row tam theo id
        removeTempRow: (id) => {
          runInAction(() => {
            departmentStore.departmentList = (departmentStore.departmentList || []).filter(
              (r) => r?.[schema.idKey] !== id
            );
          });
        }
      }
    }),
    [departmentStore]
  );

  // --- Load list qua schema ---
  useEffect(() => {
    schema.api.list();
  }, [schema]);

  // lay rows tu schema (ko dung tt bien store rai tac)
  const rows = schema.api.getList();

  // --- Toolbar: them ban ghi moi (tao row tam dong) ---
  const EditToolbar = () => {
    const handleClick = () => {
      const tempId = `${schema.tempPrefix}${Date.now()}`;
      const newRow = {
        [schema.idKey]: tempId,
        [schema.field1]: "",
        [schema.field2]: "",
        [schema.field3]: "",
        isNew: true
      };
      schema.api.pushTempRow(newRow);
      setRowModesModel((oldModel) => ({
        ...oldModel,
        [tempId]: { mode: GridRowModes.Edit, fieldToFocus: schema.field1 }
      }));
    };

    return (
      <GridToolbarContainer>
        <Button startIcon={<AddIcon />} onClick={handleClick}>
          Thêm mới
        </Button>
      </GridToolbarContainer>
    );
  };

  // Ngan commit khi blur ra ngoai
  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  // Commit du lieu sau khi chinh sua xong
  const processRowUpdate = async (newRow) => {
    // Validate don gian theo schema
    if (!newRow[schema.field1].trim()) {
      throw new Error(`Không được để trống cột ${schema.text1}`);
    }
    if (String(newRow?.[schema.field2]).length == 0) {
      throw new Error(`Không được để trống cột ${schema.text2}`);
    }
    if (String(newRow?.[schema.field3]).length == 0) {
      throw new Error(`Không được để trống cột ${schema.text3}`);
    }

    if (
          existsByFields(departmentStore.departmentList, newRow, ["TenPhongBan"])
        ) {
          throw new Error("Tên phòng ban này đã có rồi!");
        }
    
    const isTemp = String(newRow?.[schema.idKey] ?? "").startsWith(schema.tempPrefix);
    const payload = {
      [schema.field1]: newRow?.[schema.field1],
      [schema.field2]: newRow?.[schema.field2],
      [schema.field3]: newRow?.[schema.field3]

    };

    if (isTemp || newRow?.isNew) {
      await schema.api.create(payload);
      return undefined;
    } else {
      await schema.api.update(newRow?.[schema.idKey], payload);
      return newRow;
    }
  };

  // Dialog xoa
  const handleConfirmClose = () => {
    setConfirmOpen(false);
    setDeletingId(null);
    setDeletingRow(null);
  };
  const handleConfirmDelete = async () => {
    await schema.api.remove(deletingId);
    handleConfirmClose();
  };

  // Actions tung hang
  const handleEditClick = (id) => () => {
    setRowModesModel((m) => ({ ...m, [id]: { mode: GridRowModes.Edit } }));
  };
  const handleSaveClick = (id) => () => {
    setRowModesModel((m) => ({ ...m, [id]: { mode: GridRowModes.View } }));
  };
  const handleDeleteClick = (id) => () => {
    const row = rows.find((r) => r?.[schema.idKey] === id);
    setDeletingId(id);
    setDeletingRow(row || null);
    setConfirmOpen(true);
  };
  const handleCancelClick = (id) => () => {
    setRowModesModel((m) => ({
      ...m,
      [id]: { mode: GridRowModes.View, ignoreModifications: true }
    }));
    const row = rows.find((r) => r?.[schema.idKey] === id);
    if (row?.isNew || String(id).startsWith(schema.tempPrefix)) {
      schema.api.removeTempRow(id);
    }
  };

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
        minWidth: 160,
        editable: true,
      },
      {
        field: schema.field2,
        headerName: schema.text2,
        flex: 1.4,
        minWidth: 300,
        editable: true,
      },
      {
        field: schema.field3,
        headerName: schema.text3,
        flex: 1,
        minWidth: 100,
        editable: true,
        type: "singleSelect",
        valueOptions: schema.optionsField3
      },
      {
        field: "actions",
        type: "actions",
        headerName: "Thao Tác",
        width: 100,
        cellClassName: "actions",
        getActions: ({ id }) => {
          const isInEditMode = rowModesModel?.[id]?.mode === GridRowModes.Edit;

          if (isInEditMode) {
            return [
              <GridActionsCellItem
                key="save"
                icon={<SaveIcon />}
                label="Save"
                sx={{ color: "primary.main" }}
                onClick={handleSaveClick(id)}
              />,
              <GridActionsCellItem
                key="cancel"
                icon={<CancelIcon />}
                label="Cancel"
                onClick={handleCancelClick(id)}
                color="inherit"
              />
            ];
          }

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
    [rowModesModel, schema]
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
            Bạn có chắc chắn muốn xóa
            {deletingRow?.[schema.field1] ? (
              <>
                {" "}
                “<b>{deletingRow?.[schema.field1]}</b>”
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
            editMode="row"
            showToolbar
            slots={{ toolbar: EditToolbar }}
            rowModesModel={rowModesModel}
            onRowModesModelChange={setRowModesModel}
            onRowEditStop={handleRowEditStop}
            processRowUpdate={processRowUpdate}
            onProcessRowUpdateError={(err) => {
              if (!String(err?.message || "").startsWith("Cannot read properties of undefined")) {
                toast.error(err?.message || "Lỗi cập nhật dữ liệu");
              }
            }}
          />
        </Box>
      </Root>
    </>
  );
});
