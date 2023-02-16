import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Snackbar from '@mui/material/Snackbar';

import { auth } from '../../firebase'
import { useNavigate } from 'react-router-dom'
import { Alert } from '@mui/material';

// const pages = ['Tab1', 'Tab2', 'Tab3', 'Tab4'];

const Nav = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const handleClick = () => { setOpen(true); };
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') return;
        setOpen(false);
    };

    const userName = auth.currentUser.displayName.split(' ')[0];
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenNavMenu = (event) => { setAnchorElNav(event.currentTarget); };
    const handleOpenUserMenu = (event) => { setAnchorElUser(event.currentTarget); };
    const handleCloseNavMenu = () => { setAnchorElNav(null); };
    const handleCloseUserMenu = () => { setAnchorElUser(null); };

    return (
        <>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Self Notification
                </Alert>
            </Snackbar>
            <AppBar position="fixed" sx={{ px: { xs: 0, md: '10%' }, backgroundColor: '#fff', color: '#000', }}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Typography
                            variant="h6" noWrap component="a" href="/login" sx={{
                                mr: 2, display: { xs: 'none', md: 'flex' }, fontFamily: 'Poppins', fontWeight: 700, color: 'inherit', textDecoration: 'none'
                            }}
                        >
                            Nordstone
                        </Typography>

                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                                keepMounted
                                transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{ display: { xs: 'block', md: 'none' }, }}
                            >
                                <MenuItem key='tab1' onClick={handleClick}><Typography textAlign="center">Tab1</Typography></MenuItem>
                                <MenuItem key='tab2'><Typography textAlign="center">Tab2</Typography></MenuItem>
                                <MenuItem key='tab3'><Typography textAlign="center">Tab3</Typography></MenuItem>
                                <MenuItem key='tab4'><Typography textAlign="center">Tab4</Typography></MenuItem>
                            </Menu>
                        </Box>
                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href=""
                            sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 1,
                                fontFamily: 'Poppins',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            Nordstone
                        </Typography>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            <Button key='tab1' sx={{ my: 2, color: 'black', }} onClick={handleClick}>Tab1</Button>
                            <Button key='tab2' sx={{ my: 2, color: 'black', }} onClick={() => navigate('/login/tab2')}>Tab2</Button>
                            <Button key='tab3' sx={{ my: 2, color: 'black', }} onClick={() => navigate('/login/tab3')}>Tab3</Button>
                            <Button key='tab4' sx={{ my: 2, color: 'black', }} onClick={() => navigate('/login/tab4')}>Tab4</Button>
                        </Box>

                        <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center' }}>
                            <Typography
                                variant="h6"
                                noWrap
                                sx={{ fontSize: '1rem', mr: 2, display: { xs: 'none', md: 'flex' }, flexGrow: 1, fontFamily: 'Poppins', }}
                            >
                                Welcome, {userName}
                            </Typography>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt="Profile_Pic" src={auth.currentUser.photoURL} />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                                keepMounted
                                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                <MenuItem key='logout' onClick={handleCloseUserMenu}>
                                    <Typography textAlign="center"
                                        onClick={() => { auth.signOut(); navigate('/login'); }}
                                    >Logout</Typography>
                                </MenuItem>
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </>
    );
}
export default Nav;