// src/components/FormUserProfile.js
import {useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth, instance } from '../../contexts/authContext';
import { useSnackbar } from '../../contexts/notificationContext';
import { TextField, ButtonGroup, Grid } from '@mui/material';
import { IUser } from '../../contexts/type';
import { useTranslation } from 'react-i18next';

interface IAuthContext {
    user: IUser | null;
    setUser: (user: IUser | null) => void;
}


interface ErrorResponse extends Error {
  response?: {
    data?: {
      label?: string;
      error?: string;
    };
  };
}

const FormUserProfile = ({ user, onSubmitSuccess }: { user: IUser, onSubmitSuccess: () => void }) => {
  const { t } = useTranslation();
  const { setUser } = useAuth() as IAuthContext;
  const [initialValues, setInitialValues] = useState({
    username: user.username || '',
    lastname: user.lastname || '',
    email: user.email || '',
    old_password: '',
    password: ''
  });
  const { notification } = useSnackbar();

  const validationSchema = Yup.object({
    username: Yup.string().required(t('forms.profile.usernameRequired')),
    lastname: Yup.string().required(t('forms.profile.lastNameRequired')),
    email: Yup.string().email(t('forms.profile.invalidEmail')).required(t('forms.profile.emailRequired')),
    old_password: Yup.string().min(8, t('forms.profile.passwordMinCharacters')),
    password: Yup.string().when('old_password', (old_password, schema) => {
        if (old_password && old_password[0] && old_password[0].length >= 8) {
          return schema.required(t('forms.profile.newPasswordRequired')).min(8, t('forms.profile.passwordMinCharacters'));
        }
        
        return schema.notRequired();
      }),
    });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { resetForm, setErrors }) => {
      if (values.old_password && values.old_password.length < 8) {
        setErrors({ old_password: t('forms.profile.oldPasswordMinCharacters') });
        notification('error', t('forms.profile.oldPasswordMinCharacters'));
        return;
      }
      if (values.old_password && !values.password) {
        setErrors({ password: t('forms.profile.newPasswordRequired') });
        notification('error', t('forms.profile.newPasswordRequired'));
        return;
      }
      try {    
        const response = await instance.put('/user', values);
        console.log("response", response);
        if (response?.status === 200) {
          onSubmitSuccess();
          notification('success', t('forms.profile.profileUpdated'));
          setInitialValues({
            ...initialValues,
            username: values.username,
            lastname: values.lastname,
            email: values.email,
            password: '',
            old_password: ''
          });
          setUser({
            email: values.email,
            username: values.username,
            lastname: values.lastname,
          });
          resetForm();
        } else {
          const errorLabel = response?.data?.label || t('forms.profile.unknown');
          const errorMessage = response?.data?.error || t('forms.profile.unknown');
          setErrors({ [errorLabel]: errorMessage });
          notification('error', errorMessage);

        }
      } catch (error:unknown) {
        console.log("error", error);
        if ((error as ErrorResponse).response) {
          const errorLabel = (error as ErrorResponse).response?.data?.label || t('forms.profile.unknown');
          const errorMessage = (error as ErrorResponse).response?.data?.error || t('forms.profile.unknown');
          setErrors({ [errorLabel]: errorMessage });
        } else {
          notification('error', t('forms.profile.errorUnknown'));
        }
      }
    }
  });

  const hasChanges = JSON.stringify(formik.values) !== JSON.stringify(initialValues);

  return (
    <div>
      <form onSubmit={formik.handleSubmit} style={{ gap: "1em", display: "grid", margin: "auto", width: "80%" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="username"
              name="username"
              label={t('forms.profile.username')}
              placeholder={t('forms.profile.username')}
              value={formik.values.username}
              onChange={formik.handleChange}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
              InputLabelProps={{
                className: 'text-black dark:text-white',
                sx: {
                  color: 'rgb(62, 75, 107)',
                  '&.Mui-focused': {
                    color: 'rgb(62, 75, 107)',
                  }
                }
              }}
              InputProps={{
                sx: {
                    "&.Mui-focused": {
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'rgb(62, 75, 107)',
                          border: 'solid 1px',
                        }
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'rgb(62, 75, 107)',
                      border: 'solid 1px',
                    }    
                  },
                  className: 'text-black dark:text-white border-black dark:border-white'
              }}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="lastname"
              name="lastname"
              label={t('forms.profile.lastName')}
              placeholder={t('forms.profile.lastName')}
              value={formik.values.lastname}
              onChange={formik.handleChange}
              error={formik.touched.lastname && Boolean(formik.errors.lastname)}
              helperText={formik.touched.lastname && formik.errors.lastname}
              InputLabelProps={{
                className: 'text-black dark:text-white',
                sx: {
                  color: 'rgb(62, 75, 107)',
                  '&.Mui-focused': {
                    color: 'rgb(62, 75, 107)',
                  }
                }
              }}
              InputProps={{
                sx: {
                    "&.Mui-focused": {
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'rgb(62, 75, 107)',
                          border: 'solid 1px',
                        }
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'rgb(62, 75, 107)',
                      border: 'solid 1px',
                    }    
                  },
                  className: 'text-black dark:text-white border-black dark:border-white'
              }}
              required
            />
          </Grid>
        </Grid>
        <TextField
            fullWidth
            id="email"
            name="email"
            label={t('forms.profile.email')}
            placeholder={t('forms.profile.email')}
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            InputLabelProps={{
              className: 'text-black dark:text-white',
              sx: {
                color: 'rgb(62, 75, 107)',
                '&.Mui-focused': {
                  color: 'rgb(62, 75, 107)',
                }
              }
            }}
            InputProps={{
              sx: {
                  "&.Mui-focused": {
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgb(62, 75, 107)',
                        border: 'solid 1px',
                      }
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgb(62, 75, 107)',
                    border: 'solid 1px',
                  }    
                },
                className: 'text-black dark:text-white border-black dark:border-white'
            }}
            required
        />
        <TextField
          fullWidth
          id="old_password"
          name="old_password"
          label={t('forms.profile.password')}
          placeholder={t('forms.profile.password')}
          type="password"
          value={formik.values.old_password}
          onChange={(event) => {
            formik.handleChange(event);
            if (formik.errors.old_password || event.target.value === '' || event.target.value.length < 8) {
              formik.setFieldValue('password', '', false);
            }
          }}
          error={formik.touched.old_password && (Boolean(formik.errors.old_password) && formik.values.old_password.length >= 8)}
          helperText={formik.touched.old_password && formik.errors.old_password}
          InputLabelProps={{
            className: 'text-black dark:text-white',
            sx: {
              color: 'rgb(62, 75, 107)',
              '&.Mui-focused': {
                color: 'rgb(62, 75, 107)',
              }
            }
          }}
          InputProps={{
            sx: {
                "&.Mui-focused": {
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'rgb(62, 75, 107)',
                      border: 'solid 1px',
                    }
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgb(62, 75, 107)',
                  border: 'solid 1px',
                }    
              },
              className: 'text-black dark:text-white border-black dark:border-white'
          }}
        />
        <TextField
            disabled={!!formik.errors.old_password || formik.values.old_password === '' || formik.values.old_password.length < 8}
            fullWidth
            id="password"
            name="password"
            label={t('forms.profile.newPassword')}
            placeholder={t('forms.profile.newPassword')}
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password) && (formik.values.password.length >= 8 )}
            helperText={formik.touched.password && formik.errors.password}
            InputLabelProps={{
              className: 'text-black dark:text-white',
              sx: {
                color: 'rgb(62, 75, 107)',
                '&.Mui-focused': {
                  color: 'rgb(62, 75, 107)',
                }
              }
            }}
            InputProps={{
              sx: {
                  "&.Mui-focused": {
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgb(62, 75, 107)',
                        border: 'solid 1px',
                      }
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgb(62, 75, 107)',
                    border: 'solid 1px',
                  }    
                },
                className: 'text-black dark:text-white border-black dark:border-white'
            }}
            required={formik.values.old_password !== ''}
        />
        <ButtonGroup fullWidth>
          <button 
            type="submit" 
            // variant="contained"
            className="bg-white text-dark-gray border-dark-gray w-full p-2 rounded border border-solid hover:bg-dark-gray hover:text-white dark:bg-dark-gray dark:text-white dark:hover:bg-dark-gray-light dark:hover:text-white dark:hover:border-white"
            // sx={{
            //   backgroundColor: 'rgb(62, 75, 107)',
            //   '&:hover': {
            //     backgroundColor: 'rgb(82, 95, 127)',
            //   }
            // }}
          >
            {t('forms.profile.update')}&nbsp;<span aria-hidden="true">&rarr;</span>
          </button>
          <button
            type="button"
            onClick={() => formik.setValues(initialValues)}
            // variant="outlined"
            disabled={!hasChanges}
            // sx={{
            //   borderColor: 'rgb(62, 75, 107)',
            //   color: 'rgb(62, 75, 107)',
            //   '&:hover': {
            //     borderColor: 'rgb(82, 95, 127)',
            //     color: 'rgb(82, 95, 127)',
            //   }
            // }}
            className='bg-white text-dark-gray border-dark-gray w-full p-2 rounded border border-solid hover:bg-dark-gray hover:text-white dark:bg-dark-gray dark:text-white dark:hover:bg-dark-gray-light dark:hover:text-white dark:hover:border-white'
          >
            {t('forms.profile.cancel')}
          </button>
        </ButtonGroup>
      </form>
    </div>
  );
};

export default FormUserProfile;
