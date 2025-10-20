import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

// STYLED COMPONENTS
const StyledImage = styled("img")({
  width: "100%",
  marginBottom: "32px"
});

const MaintenanceRoot = styled("div")({
  width: "100%",
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  "& .content": {
    maxWidth: 340,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  "& h2": {
    marginBottom: "16px",
    fontWeight: 600,
    color: "#333"
  },
  "& p": {
    marginBottom: "24px",
    color: "#666"
  }
});

export default function Maintenance() {
  const navigate = useNavigate();

  return (
    <MaintenanceRoot>
      <div className="content">
        <StyledImage
          src="/assets/images/construction-1024x819.jpg"
          alt="Service Maintenance"
        />
        <h2>Dịch vụ đang được nâng cấp</h2>
        <p>Chúng tôi đang bảo trì hệ thống. Vui lòng quay lại sau.</p>

        <Button color="primary" variant="contained" onClick={() => navigate(-1)}>
          Quay lại
        </Button>
      </div>
    </MaintenanceRoot>
  );
}
