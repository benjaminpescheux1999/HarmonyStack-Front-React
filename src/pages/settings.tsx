import * as React from 'react';
import { instance } from '../contexts/authContext';

import { Tabs, Tab, Box, Typography, Grid, TextField, Popover, Button } from '@mui/material';

import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import SecurityIcon from '@mui/icons-material/Security';
import GTranslateIcon from '@mui/icons-material/GTranslate';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import { 
    requestNotificationPermission, 
} from '../utils/notification';

import { useSnackbar } from '../contexts/notificationContext';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
  className?: string;
}

interface INotificationPreferences {
    pushEnabled: boolean;
    emailEnabled: boolean;
    smsEnabled: boolean;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

function SwitchOption({ name, label, checked, onChange, helpText }: { name: string, label: string, checked: boolean, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, helpText: string }) {
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    return (
        <div className='flex'>
            <FormControlLabel
                control={<Switch checked={checked} onChange={onChange} name={name} />}
                label={label}
            />
            <Button onClick={handleClick} sx={{ color:'rgb(62, 75, 107)' }}>
                <HelpOutlineIcon />
            </Button>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <Typography sx={{ p: 2 }}>{helpText}</Typography>
            </Popover>
        </div>
    );
}

export default function VerticalTabs() {
    const { notification } = useSnackbar();
    const [value, setValue] = React.useState(0);
    const [smsNumber, setSmsNumber] = React.useState('');
    // const [appearanceDarkMode, setAppearanceDarkMode] = React.useState(false);
    // const [securityLock, setSecurityLock] = React.useState(false);
    // const [languageFrench, setLanguageFrench] = React.useState(true);
    // const [integrationAPI, setIntegrationAPI] = React.useState(false);
    const [notificationPreferences, setNotificationPreferences] = React.useState<INotificationPreferences>({
        pushEnabled: false,
        emailEnabled: false,
        smsEnabled: false
    });
    const theme = useTheme();
    const isBelowMd = useMediaQuery(theme.breakpoints.down('md'));
    const isBelowSm = useMediaQuery(theme.breakpoints.down('sm'));

    React.useEffect(() => {
        instance.get('/notifications').then((res) => {
            setNotificationPreferences(res.data);
        });
    }, []);

    interface ITab {
        label: string;
        icon: React.ReactElement; // Change from React.ReactNode to React.ReactElement
    }

    const tabs: ITab[] = [
        { label: 'Notifications', icon: <NotificationsIcon /> },
        { label: 'Apparence', icon: <SettingsIcon /> },
        { label: 'Sécurité', icon: <SecurityIcon /> },
        { label: 'Langue', icon: <GTranslateIcon /> },
        { label: 'Intégrations', icon: <IntegrationInstructionsIcon /> },
    ];

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const handleNotifPreferencesUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {


        const updatedPreferences = {
            ...notificationPreferences,
            [e.target.name]: e.target.checked
        };

        setNotificationPreferences(updatedPreferences);

        instance.put('/notifications', updatedPreferences).then((res) => {
            notification('success', 'Notification mise à jour');
            setNotificationPreferences(res.data);
            //Si notification push était false et passe à true, alors on demande la permission
            if(e.target.name === "pushEnabled" && e.target.checked) {
                requestNotificationPermission();
            }
        }).catch((error: unknown) => {
            if(error instanceof Error) {
                notification('error', 'Error lors de la mise à jour des préférences de notification');
            }
        });
    }

    return (
        <Box
            className="min-h-screen-minus-395 py-10 break-all"
            sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex' }}
        >
        <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Paramètres"
            sx={isBelowSm ? { borderRight: 1, borderColor: 'rgb(62, 75, 107)', width: '100%' } : { borderRight: 1, borderColor: 'rgb(62, 75, 107)' }}
            TabIndicatorProps={{ style: { backgroundColor: 'rgb(62, 75, 107)' } }}
        >
            {tabs.map((tab: ITab, index: number) => (
            <Tab
                key={index}
                sx={{
                    width: "100%",
                    justifyContent: 'flex-start',
                    '&.Mui-selected': {
                        color: 'rgb(62, 75, 107)'
                    },
                    '&.MuiTabs-indicator': {
                        backgroundColor: 'rgb(62, 75, 107)'
                    }
                }}
                icon={tab.icon}
                iconPosition="start"
                label={isBelowMd?null:tab.label}
                {...a11yProps(index)}
            />
            ))}
        </Tabs>
        <TabPanel value={value} index={0} >
            <Grid container justifyContent="space-between" alignContent={'center'}>
                <Grid item xs={12} sm={6} md={4} lg={3} >
                    <SwitchOption name="pushEnabled" label="Activer les notifications" checked={notificationPreferences.pushEnabled} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleNotifPreferencesUpdate(e)} helpText='Activer les notifications push'/>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <SwitchOption name="emailEnabled" label="Notifications par e-mail" checked={notificationPreferences.emailEnabled} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleNotifPreferencesUpdate(e)} helpText='Activer les notifications par e-mail'/>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <SwitchOption name="smsEnabled" label="Notification par SMS" checked={notificationPreferences.smsEnabled} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleNotifPreferencesUpdate(e)} helpText='Activer les notifications par SMS'/>
                    {notificationPreferences.smsEnabled && (
                        <TextField
                            name="smsNumber"
                            label="Numéro de téléphone"
                            variant="outlined"
                            value={smsNumber}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSmsNumber(e.target.value)}
                            fullWidth
                        />
                    )}
                </Grid>
            </Grid>
        </TabPanel>
        {/* <TabPanel value={value} index={1}>
            <SwitchOption name="appearanceDarkMode" label="Mode sombre" checked={appearanceDarkMode} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleNotifPreferencesUpdate(e)} helpText='Activer le mode sombre'/>
        </TabPanel>
        <TabPanel value={value} index={2}>
            <SwitchOption name="securityLock" label="Verrouillage de sécurité" checked={securityLock} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleNotifPreferencesUpdate(e)} helpText='Activer le verrouillage de sécurité'/>
        </TabPanel>
        <TabPanel value={value} index={3}>
            <SwitchOption name="languageFrench" label="Français par défaut" checked={languageFrench} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleNotifPreferencesUpdate(e)} helpText='Activer le mode sombre'/>
        </TabPanel>
        <TabPanel value={value} index={4}>
            <SwitchOption name="integrationAPI" label="API d'intégration activée" checked={integrationAPI} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleNotifPreferencesUpdate(e)} helpText={`Activer l'API d'intégration`}/>
        </TabPanel> */}
        </Box>
    );
}