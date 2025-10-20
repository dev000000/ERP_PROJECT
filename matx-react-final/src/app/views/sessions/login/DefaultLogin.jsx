import { NavLink, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";

import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid2";
import styled from "@mui/material/styles/styled";
import useTheme from "@mui/material/styles/useTheme";
import LoadingButton from "@mui/lab/LoadingButton";

import useAuth from "app/hooks/useAuth";
import { Paragraph } from "app/components/Typography";

// STYLED COMPONENTS
const FlexBox = styled(Box)(() => ({
  display: "flex"
}));

const ContentBox = styled("div")(() => ({
  height: "100%",
  padding: "32px",
  position: "relative",
  background: "rgba(0, 0, 0, 0.01)"
}));

const StyledRoot = styled("div")(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#1A2038",
  minHeight: "100% !important",
  "& .card": {
    maxWidth: 800,
    minHeight: 400,
    margin: "1rem",
    display: "flex",
    borderRadius: 12,
    alignItems: "center"
  },

  ".img-wrapper": {
    height: "100%",
    minWidth: 320,
    display: "flex",
    padding: "2rem",
    alignItems: "center",
    justifyContent: "center"
  }
}));

// initial login credentials
const initialValues = {
  Username: "admin",
  Pass: "admin",
  remember: true
};

// form field validation schema
const validationSchema = Yup.object().shape({
  Pass: Yup.string()
    .required("Pass is required!"),
  Username: Yup.string().required("Username is required!")
});

export default function DefaultLogin() {
  const theme = useTheme();
  const navigate = useNavigate();

  const { login } = useAuth();

  const handleFormSubmit = async (values) => {
    try {
      await login(values.Username, values.Pass);
      navigate("/");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <StyledRoot>
      <Card className="card">
        <Grid container>
          <Grid size={{ sm: 6, xs: 12 }}>
            <div className="img-wrapper">
              <img src="/assets/images/illustrations/dreamer.svg" width="100%" alt="" />
            </div>
          </Grid>

          <Grid size={{ sm: 6, xs: 12 }}>
            <ContentBox>
              <Formik
                onSubmit={handleFormSubmit}
                initialValues={initialValues}
                validationSchema={validationSchema}>
                {({
                  values,
                  errors,
                  touched,
                  isSubmitting,
                  handleChange,
                  handleBlur,
                  handleSubmit
                }) => (
                  <form onSubmit={handleSubmit}>
                    <TextField
                      fullWidth
                      size="small"
                      name="Username"
                      label="Username"
                      variant="outlined"
                      onBlur={handleBlur}
                      value={values.Username}
                      onChange={handleChange}
                      helperText={touched.Username && errors.Username}
                      error={Boolean(errors.Username && touched.Username)}
                      sx={{ mb: 3 }}
                    />

                    <TextField
                      fullWidth
                      size="small"
                      name="Pass"
                      type="password"
                      label="Pass"
                      variant="outlined"
                      onBlur={handleBlur}
                      value={values.Pass}
                      onChange={handleChange}
                      helperText={touched.Pass && errors.Pass}
                      error={Boolean(errors.Pass && touched.Pass)}
                      sx={{ mb: 1.5 }}
                    />

                    <FlexBox justifyContent="space-between">
                      <FlexBox gap={1}>
                        <Checkbox
                          size="small"
                          name="remember"
                          onChange={handleChange}
                          checked={values.remember}
                          sx={{ padding: 0 }}
                        />

                        <Paragraph>Remember Me</Paragraph>
                      </FlexBox>

                      <NavLink
                        to="/session/forgot-password"
                        style={{ color: theme.palette.primary.main }}>
                        Forgot password?
                      </NavLink>
                    </FlexBox>

                    <LoadingButton
                      type="submit"
                      color="primary"
                      loading={isSubmitting}
                      variant="contained"
                      sx={{ my: 2 }}>
                      Login
                    </LoadingButton>

                    <Paragraph>
                      Don't have an account?
                      <NavLink
                        to="/session/signup"
                        style={{ color: theme.palette.primary.main, marginLeft: 5 }}>
                        Register
                      </NavLink>
                    </Paragraph>
                  </form>
                )}
              </Formik>
            </ContentBox>
          </Grid>
        </Grid>
      </Card>
    </StyledRoot>
  );
}
