import * as Yup from 'yup';
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
// material
import { Stack, TextField, IconButton, InputAdornment } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import LoginService from '../../../services/LoginServices';
// ----------------------------------------------------------------------

export default function LoginForm() {
  const initialUserState = {
    username: '',
    password: ''
  };
  const [submitted, setSubmitted] = useState(false);

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState(initialUserState);
  const LoginSchema = Yup.object().shape({
    password: Yup.string().required('Password is required')
  });

  const saveElevage = () => {
    const data = {
      username: user.username,
      password: user.password
    };

    LoginService.logIn(data)
      .then((response) => {
        setUser({
          username: response.data.username,
          password: response.data.password
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    validationSchema: LoginSchema,
    onSubmit: () => {
      saveElevage();
      navigate('/dashboard', { replace: true });
    }
  });

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            autoComplete="username"
            type="text"
            label="Username"
            value={user.username}
            onChange={handleInputChange}
            name="username"
            id="username"
          />
          <TextField
            fullWidth
            autoComplete="password"
            type="text"
            label="Password"
            value={user.password}
            onChange={handleInputChange}
            name="password"
            id="password"
          />

          <TextField
            fullWidth
            name="password"
            id="password"
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }} />

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Login
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}
