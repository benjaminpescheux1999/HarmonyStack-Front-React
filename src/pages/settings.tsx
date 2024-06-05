import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import SecurityIcon from '@mui/icons-material/Security';
import GTranslateIcon from '@mui/icons-material/GTranslate';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
  className?: string;
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
          <Typography>{children}</Typography>
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

function SwitchOption({ label, checked, onChange, helpText }: { label: string, checked: boolean, onChange: () => void, helpText: string }) {
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
        <>
        <FormControlLabel
        control={<Switch checked={checked} onChange={onChange} />}
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
        </>
    );
}

export default function VerticalTabs() {
  const [value, setValue] = React.useState(0);
  const [notifEnabled, setNotifEnabled] = React.useState(false);
  const [emailNotifEnabled, setEmailNotifEnabled] = React.useState(false);
  const [smsNotifEnabled, setSmsNotifEnabled] = React.useState(false);
  const [smsNumber, setSmsNumber] = React.useState('');
  const [desktopAlertsEnabled, setDesktopAlertsEnabled] = React.useState(false);
  const [appearanceDarkMode, setAppearanceDarkMode] = React.useState(false);
  const [securityLock, setSecurityLock] = React.useState(false);
  const [languageFrench, setLanguageFrench] = React.useState(true);
  const [integrationAPI, setIntegrationAPI] = React.useState(false);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

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

    return (
        <Box
            className="min-h-screen-minus-395 py-10"
            sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex' }}
        >
        <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Paramètres"
            sx={{ borderRight: 1, borderColor: 'rgb(62, 75, 107)' }}
            TabIndicatorProps={{ style: { backgroundColor: 'rgb(62, 75, 107)' } }}
        >
            {tabs.map((tab: ITab, index: number) => (
            <Tab
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
                label={tab.label}
                {...a11yProps(index)}
            />
            ))}
        </Tabs>
        <TabPanel className="w-full" value={value} index={0} >
            <Grid container justifyContent="space-between">
                <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                    <SwitchOption label="Activer les notifications" checked={notifEnabled} onChange={() => setNotifEnabled(!notifEnabled)} helpText='Activer les notifications'/>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                    <SwitchOption label="Notifications par e-mail" checked={emailNotifEnabled} onChange={() => setEmailNotifEnabled(!emailNotifEnabled)} helpText='Activer les notifications par e-mail'/>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                    <SwitchOption label="Notification par SMS" checked={smsNotifEnabled} onChange={() => setSmsNotifEnabled(!smsNotifEnabled)} helpText='Activer les notifications par SMS'/>
                    {smsNotifEnabled && (
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
            <SwitchOption label="Alertes de bureau" checked={desktopAlertsEnabled} onChange={() => setDesktopAlertsEnabled(!desktopAlertsEnabled)} helpText='Activer les alertes de bureau'/>
        </TabPanel>
        <TabPanel value={value} index={1}>
            <SwitchOption label="Mode sombre" checked={appearanceDarkMode} onChange={() => setAppearanceDarkMode(!appearanceDarkMode)} helpText='Activer le mode sombre'/>
        </TabPanel>
        <TabPanel value={value} index={2}>
            <SwitchOption label="Verrouillage de sécurité" checked={securityLock} onChange={() => setSecurityLock(!securityLock)} helpText='Activer le verrouillage de sécurité'/>
        </TabPanel>
        <TabPanel value={value} index={3}>
            <SwitchOption label="Français par défaut" checked={languageFrench} onChange={() => setLanguageFrench(!languageFrench)} helpText='Activer le mode sombre'/>
        </TabPanel>
        <TabPanel value={value} index={4}>
            <SwitchOption label="API d'intégration activée" checked={integrationAPI} onChange={() => setIntegrationAPI(!integrationAPI)} helpText={`Activer l'API d'intégration`}/>
        </TabPanel>
        </Box>
    );
}