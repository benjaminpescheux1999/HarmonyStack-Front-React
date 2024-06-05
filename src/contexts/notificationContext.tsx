import React, { useState, useCallback, createContext, useContext } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { AlertProps, AlertColor } from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>((props, ref) => {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

export interface SnackbarContextType {
    notification: (type?: AlertColor, message?: string) => void;
}

export const SnackbarContext = createContext<SnackbarContextType | null>(null); // Export the SnackbarContext directly

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error('useSnackbar must be used within a SnackbarProvider');
  }
  return context;
};

interface SnackbarProviderProps {
  children: React.ReactNode;
}


export const SnackbarProvider = ({ children }: SnackbarProviderProps) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [type, setType] = useState<AlertColor>('info'); // Specify AlertColor type here

  const notification = useCallback((type: AlertColor = 'info', message = '') => {
    setType(type);
    setMessage(message);
    setOpen(true);
  }, []);

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    event?.preventDefault();
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <SnackbarContext.Provider value={{ notification }}>
      {children}
      <Snackbar open={open} autoHideDuration={6000} onClose={(e) => handleClose(e)}>
        <Alert onClose={(e) => handleClose(e)} severity={type} sx={{ width: '100%' }}>
          {message || 'Aucun message spécifié'}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};
