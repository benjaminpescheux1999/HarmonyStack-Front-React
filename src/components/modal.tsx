import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useMediaQuery, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';

interface ModalProps {
    children: React.ReactNode;
    buttonTitle: string;
    buttonColor?: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
    buttonVariant?: 'text' | 'outlined' | 'contained';
    component: React.ElementType | 'Link';
    className?: string;
}

export default function ModalCustom({ children, buttonTitle, buttonColor, buttonVariant, component, className }: ModalProps) {
    
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    
    const handleClose = () => setOpen(false);

    const theme = useTheme();
    const isMdDown = useMediaQuery(theme.breakpoints.down('md'))
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        // border: '2px solid #000',
        boxShadow: 24,
        width: !isMdDown ? "50%" : "90%",
        p: 5,
        borderRadius: '10px',
        alignItems: 'center',
        justifyContent: 'center',
    };

    // Cloner les enfants en leur passant la fonction handleClose comme prop
    const childrenWithProps = React.Children.map(children, child =>
        React.cloneElement(child as React.ReactElement, { onClose: handleClose, onOpen: handleOpen})
    );

    return (
        <>
        {component === 'Link' ? (
            <Link
                to="/"
                onClick={() => {handleOpen()}}
                className={className}
            >
                {buttonTitle}
            </Link>
        ) : (
            <Button 
                fullWidth
                onClick={() => {handleOpen()}}
                color={buttonColor}
                variant={buttonVariant}
                component={component}
                className={className}
            >
                {buttonTitle}
            </Button>
        )}
            <div>
                <Modal
                    keepMounted
                    open={open}
                    onClose={() => {handleClose()}}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style} className="shadow-lg">
                        {childrenWithProps}
                    </Box>
                </Modal>
            </div>
        </>
    );
}
