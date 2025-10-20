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
import { LOAI_TRINH_DO_OPTIONS } from "app/utils/constant-project";
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
import { existsByFields } from "app/utils/existsByFields";

// Styled Root component for layout
const Root = styled("div")(() => ({
  maxWidth: "90%",
  margin: "20px auto"
}));

// Prefix cho id tạm (row mới chưa có id thật từ server)
const TEMP_PREFIX = "NEW-";

export default observer(function EducationLevelIndex() {
  const { educationLevelStore } = useStore();
  const { educationLevelList } = educationLevelStore;
  const [rowModesModel, setRowModesModel] = useState({}); // trang thai cua tung hang
  const [confirmOpen, setConfirmOpen] = useState(false); // trang thai dialog xac nhan xoa
  const [deletingId, setDeletingId] = useState(null); // luu id dang xoa
  const [deletingRow, setDeletingRow] = useState(null); // luu row dang xoa

  // Tai danh sach tu store
  useEffect(() => {
    educationLevelStore.getEducationLevelList();
  }, [educationLevelStore]);

  // Toolbar them ban ghi moi
  const EditToolbar = () => {
    const handleClick = () => {
      const tempId = `${TEMP_PREFIX}${Date.now()}`;
      // Them row tam truc tiep vao store (action)
      runInAction(() => {
        educationLevelStore.educationLevelList = [
          {
            MaTDHV: tempId, // id tam
            LoaiTrinhDo: "",
            TenTrinhDo: "",
            isNew: true
          },
          ...(educationLevelStore.educationLevelList || [])
        ];
      });
      setRowModesModel((oldModel) => ({
        ...oldModel,
        [tempId]: { mode: GridRowModes.Edit, fieldToFocus: "LoaiTrinhDo" }
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

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true; // khong commit khi click ngoai hang
    }
  };
  // Commit du lieu sau khi chinh sua xong
  const processRowUpdate = async (newRow) => {
    // Validate
    if (!newRow.TenTrinhDo || !newRow.TenTrinhDo.trim()) {
      throw new Error("Tên trình độ không được để trống");
    }
    if (!newRow.LoaiTrinhDo || !newRow.LoaiTrinhDo.trim()) {
      throw new Error("Loại trình độ không được để trống");
    }
    if (
      existsByFields(educationLevelStore.educationLevelList, newRow, ["LoaiTrinhDo", "TenTrinhDo"])
    ) {
      throw new Error("Loại trình độ và tên trình độ này đã có rồi!");
    }

    const isTemp = String(newRow.MaTDHV).startsWith(TEMP_PREFIX);

    try {
      if (isTemp || newRow.isNew) {
        // CREATE
        const payload = {
          LoaiTrinhDo: newRow.LoaiTrinhDo,
          TenTrinhDo: newRow.TenTrinhDo
        };
        await educationLevelStore.addEducationLevel(payload);

        return undefined;
      } else {
        // UPDATE
        const payload = {
          LoaiTrinhDo: newRow.LoaiTrinhDo,
          TenTrinhDo: newRow.TenTrinhDo
        };
        await educationLevelStore.updateEducationLevel(newRow.MaTDHV, payload);

        return newRow;
      }
    } catch (err) {
      throw err;
    }
  };
  // Khi an cancel confirm delete hoac dong dialog
  const handleConfirmClose = () => {
    setConfirmOpen(false);
    setDeletingId(null);
    setDeletingRow(null);
  };
  // Khi xac nhan xoa
  const handleConfirmDelete = async () => {
    console.log("id", deletingId);
    await educationLevelStore.deleteEducationLevel(deletingId);
    handleConfirmClose();
  };
  // Khi bam nut edit tren tung hang
  const handleEditClick = (id) => () => {
    setRowModesModel((m) => ({ ...m, [id]: { mode: GridRowModes.Edit } }));
  };
  // Khi bam nut save tren tung hang
  const handleSaveClick = (id) => () => {
    setRowModesModel((m) => ({ ...m, [id]: { mode: GridRowModes.View } }));
  };
  // khi bam nut delete tren tung hang
  const handleDeleteClick = (id) => () => {
    const row = educationLevelList.find((r) => r.MaTDHV === id);
    setDeletingId(id);
    setDeletingRow(row || null);
    setConfirmOpen(true);
  };
  // Khi bam nut cancel tren tung hang
  const handleCancelClick = (id) => () => {
    // Quay ve trang thai view
    setRowModesModel((m) => ({
      ...m,
      [id]: { mode: GridRowModes.View, ignoreModifications: true }
    }));
    const row = educationLevelList.find((r) => r.MaTDHV === id);
    if (row?.isNew || String(id).startsWith(TEMP_PREFIX)) {
      runInAction(() => {
        educationLevelStore.educationLevelList = educationLevelStore.educationLevelList.filter(
          (r) => r.MaTDHV !== id
        );
      });
    }
  };

  // Dinh nghia columns cho table
  const columns = useMemo(
    () => [
      {
        field: "MaTDHV",
        headerName: "Mã Trình Độ",
        flex: 0.8,
        minWidth: 140,
        renderCell: (params) => {
          const s = String(params.value ?? "");
          return s.startsWith(TEMP_PREFIX) ? "" : s;
        }
      },
      {
        field: "LoaiTrinhDo",
        headerName: "Loại Trình Độ",
        flex: 1,
        minWidth: 160,
        editable: true,
        type: "singleSelect",
        valueOptions: LOAI_TRINH_DO_OPTIONS
      },
      {
        field: "TenTrinhDo",
        headerName: "Tên Trình Độ",
        flex: 1.4,
        minWidth: 220,
        editable: true
      },
      {
        field: "actions",
        type: "actions",
        headerName: "Thao Tác",
        width: 100,
        cellClassName: "actions",
        getActions: ({ id }) => {
          const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

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
    [rowModesModel, educationLevelList]
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
            {deletingRow?.TenTrinhDo ? (
              <>
                {" "}
                “<b>{`${deletingRow?.LoaiTrinhDo}-${deletingRow?.TenTrinhDo}`}</b>”
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
        {/* Form tim kiem */}
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

        {/* Table */}
        <Box sx={{ height: 520 }}>
          <DataGrid
            rows={educationLevelList || []}
            getRowId={(row) => row.MaTDHV}
            columns={columns}
            pageSizeOptions={[5, 10, 20]}
            initialState={{
              pagination: { paginationModel: { pageSize: 20, page: 0 } },
              sorting: {
                sortModel: [{ field: "MaTDHV", sort: "desc" }]
              }
            }}
            disableRowSelectionOnClick // loai bo viec chon row khi click
            editMode="row" // kich hoat chinh sua theo hang
            showToolbar // hien thi toolbar
            slots={{ toolbar: EditToolbar }} // thay the toolbar mac dinh
            rowModesModel={rowModesModel} // luu trang thai cua tung hang
            /**
             * {
                  1: { mode: "Edit" },
                  2: { mode: "View" }
                }
             */
            onRowModesModelChange={setRowModesModel} // goi ham nay moi khi trang thai edit/ view thay doi
            onRowEditStop={handleRowEditStop}
            processRowUpdate={processRowUpdate} // ham duoc goi khi commit du lieu (bam save)
            onProcessRowUpdateError={(err) => {
              // khi processRowUpdate bi loi , ham nay duoc goi
              if (!String(err.message).startsWith("Cannot read properties of undefined")) {
                toast.error(err.message || "Lỗi cập nhật dữ liệu");
              }
            }}
          />
        </Box>
      </Root>
    </>
  );
});
