import { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Stepper, Step, StepLabel, Button, TextField, Grid } from '@mui/material';
import zxcvbn from 'zxcvbn-typescript';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { styled } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/authContext';

const SignUpForm = () => {
    const { t } = useTranslation();
    const authContext = useAuth();
    if (!authContext) {
        throw new Error("Auth context is not available");
    }
    const { signup } = authContext;

    const [activeStep, setActiveStep] = useState(0);
    const steps = [t('forms.signUp.steps.accountSetup'), t('forms.signUp.steps.personalDetails')];

    const validationSchema = [
        Yup.object({
        email: Yup.string().email(t('forms.signUp.steps.invalidEmailAddress')).required(t('forms.signUp.steps.required')),
        password: Yup.string()
            .required(t('forms.signUp.steps.required'))
            .min(8, t('forms.signUp.steps.passwordTooShort'))
            .test('password-strength', t('forms.signUp.steps.passwordIsTooWeak'), value => zxcvbn(value).score >= 2),
        confirmPassword: Yup.string()
            .required(t('forms.signUp.steps.required'))
            .oneOf([Yup.ref('password')], t('forms.signUp.steps.passwordsMustMatch'))
        }),
        Yup.object({
            username: Yup.string().required(t('forms.signUp.steps.required')).min(2, t('forms.signUp.steps.usernameTooShort')),
            lastname: Yup.string().required(t('forms.signUp.steps.required')).min(2, t('forms.signUp.steps.lastNameTooShort'))
        })
    ];

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const QontoConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 10,
      left: 'calc(-50% + 16px)',
      right: 'calc(50% + 16px)',
    },
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        borderColor: 'rgb(82, 95, 127)',
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        borderColor: 'rgb(82, 95, 127)',
      },
    },
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
      borderTopWidth: 3,
      borderRadius: 1,
    },
  }));

  return (
    <div>
      <Stepper activeStep={activeStep} alternativeLabel connector={<QontoConnector />}>
        {steps.map(label => (
          <Step key={label}sx={{
            '& .MuiStepLabel-root .Mui-completed': {
                color: 'rgb(82, 95, 127)',
            },
            '& .MuiStepLabel-root .Mui-active': {
                color: 'rgb(82, 95, 127)',
            },
            '& .MuiStepLabel-root ': {
                color: 'lightgray',
            },
            }}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Formik
        initialValues={{
          email: '',
          password: '',
          confirmPassword: '',
          username: '',
          lastname: ''
        }}
        validationSchema={validationSchema[activeStep]}
        onSubmit={values => {
          if (activeStep === steps.length - 1) {
            console.log('Form values:', values);
            signup(values); // Call signUp on submit
          } else {
            handleNext();
          }
        }}
      >
        {formik => (
          <Form className='sm:w-3/4 md:w-3/5 lg:w-3/6 m-auto py-10'>
            <Grid container direction="column" spacing={2}>
              {activeStep === 0 && (
                <>
                  <Grid item>
                    <TextField
                        fullWidth
                        name="email"
                        type="email"
                        label={t('forms.signUp.steps.email')}
                        placeholder={t('forms.signUp.steps.email')}
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                        required
                        InputLabelProps={{
                            style: { color: 'rgb(62, 75, 107)' },
                        }}
                        InputProps={{
                            sx: {
                                "&.Mui-focused": {
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor:'rgb(62, 75, 107)',
                                        border: 'solid 1px'
                                    }
                                },    
                                color: 'rgb(62, 75, 107)',
                            },
                        }}
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                        fullWidth
                        name="password"
                        type="password"
                        label={t('forms.signUp.steps.password')}
                        placeholder={t('forms.signUp.steps.password')}
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                        required
                        InputLabelProps={{
                            style: { color: 'rgb(62, 75, 107)' },
                        }}
                        InputProps={{
                            sx: {
                                "&.Mui-focused": {
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor:'rgb(62, 75, 107)',
                                        border: 'solid 1px'
                                    }
                                },    
                                color: 'rgb(62, 75, 107)',
                            },
                        }}
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                        fullWidth
                        name="confirmPassword"
                        type="password"
                        label={t('forms.signUp.steps.confirmPassword')}
                        placeholder={t('forms.signUp.steps.confirmPassword')}
                        value={formik.values.confirmPassword}
                        onChange={formik.handleChange}
                        error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                        helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                        required
                        InputLabelProps={{
                            style: { color: 'rgb(62, 75, 107)' },
                        }}
                        InputProps={{
                            sx: {
                                "&.Mui-focused": {
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor:'rgb(62, 75, 107)',
                                        border: 'solid 1px'
                                    }
                                },    
                                color: 'rgb(62, 75, 107)',
                            },
                        }}
                    />
                  </Grid>
                </>
              )}
              {activeStep === 1 && (
                <>
                  <Grid item>
                    <TextField
                        fullWidth
                        name="username"
                        type="text"
                        label="Username"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        error={formik.touched.username && Boolean(formik.errors.username)}
                        helperText={formik.touched.username && formik.errors.username}
                        required
                        InputLabelProps={{
                            style: { color: 'rgb(62, 75, 107)' },
                        }}
                        InputProps={{
                            sx: {
                                "&.Mui-focused": {
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor:'rgb(62, 75, 107)',
                                        border: 'solid 1px'
                                    }
                                },    
                                color: 'rgb(62, 75, 107)',
                            },
                        }}
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                        fullWidth
                        name="lastname"
                        type="text"
                        label="Last Name"
                        value={formik.values.lastname}
                        onChange={formik.handleChange}
                        error={formik.touched.lastname && Boolean(formik.errors.lastname)}
                        helperText={formik.touched.lastname && formik.errors.lastname}
                        required
                        InputLabelProps={{
                            style: { color: 'rgb(62, 75, 107)' },
                        }}
                        InputProps={{
                            sx: {
                                "&.Mui-focused": {
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor:'rgb(62, 75, 107)',
                                        border: 'solid 1px'
                                    }
                                },    
                                color: 'rgb(62, 75, 107)',
                            },
                        }}
                    />
                  </Grid>
                </>
              )}
              <Grid item container spacing={2} justifyContent="flex-end">
                <Grid item>
                  <Button 
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{
                        color: 'rgb(62, 75, 107)',
                    }}
                  >
                    Back
                  </Button>
                </Grid>
                <Grid item>
                  <Button type="submit" sx={{
                    color: 'rgb(62, 75, 107)',
                  }}>
                    {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignUpForm;
