//formLogin.js
//The formLogin.js file is a simple form that allows users to log in to their account. The form is built using the Formik library, which is a popular form library for React applications. The form includes fields for the user's email and password, as well as a submit button that triggers the handleSubmit function when clicked. The handleSubmit function logs the form data to the console and resets the form fields.
import { useFormik } from 'formik';
import * as Yup from 'yup';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface FormLoginProps {
    formAction: (values: { email: string; password: string }) => void;
}

const FormSignIn  = ({formAction }: FormLoginProps) => {
    const { t } = useTranslation();
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().email(t("forms.logIn.invalidEmail")).required(t("forms.logIn.required")),
            password: Yup.string().required(t("forms.logIn.noPasswordProvided"))
        }),
        onSubmit: (values, { resetForm }) => {
            console.log(values);
            formAction(values);
            resetForm(); // Réinitialisation du formulaire
        },
    });
    
    return (
        <div>
            <h1>Log In</h1>
            <form onSubmit={formik.handleSubmit}  style={{gap:"1em", display:"grid", width:"90%", margin:"auto"}}>
                <TextField
                    fullWidth
                    id="login-email"
                    placeholder={t("forms.logIn.email")}
                    name="email"
                    label={t("forms.logIn.email")}
                    type="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
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
                
                {formik.touched.email && formik.errors.email ? (
                    <div>{formik.errors.email}</div>
                ) : null}
                <TextField
                    fullWidth
                    id="login-password"
                    name="password"
                    label={t("forms.logIn.password")}
                    placeholder={t("forms.logIn.password")}
                    type="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
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
                      required
                />
                {formik.touched.password && formik.errors.password ? (
                    <div>{formik.errors.password}</div>
                ) : null}
                <Button type="submit" variant="contained" color="primary"
                    sx={{
                        backgroundColor: 'rgb(82, 95, 127)', 
                        color: 'white',
                        '&:hover': {
                            backgroundColor: 'rgb(62, 75, 107)',
                        }
                    }}
                >
                    Submit
                </Button>
            </form>
        </div>
    );
}

export default FormSignIn;