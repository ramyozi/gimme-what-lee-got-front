import {useState} from 'react';
import {Avatar, Box, Button, Grid, Image, Menu, UnstyledButton} from '@mantine/core';
import {useNavigate} from 'react-router-dom';
import {useAuth} from '../../../lib/plugin/auth-provider.tsx';
import {ChevronDown, LogOut, Settings} from 'lucide-react';
import ThemeSwitch from "../ThemeSwitch.tsx";

export default function AuthenticatedAppHeader() {
    const {user, logout} = useAuth();
    const navigate = useNavigate();
    const [menuOpened, setMenuOpened] = useState(false);

    return (
        <Box px="md" py="sm" style={{borderBottom: '1px solid #e0e0e0'}}>
            <Grid align="center" gutter="md">
                <Grid.Col span="auto">
                    <Box style={{display: 'flex', justifyContent: 'flex-start'}}>
                        <Image
                            src="/logo.png"
                            alt="Logo"
                            style={{cursor: 'pointer', maxHeight: 36, width: 'auto'}}
                            onClick={() => navigate('/')}
                        />
                    </Box>
                </Grid.Col>
                <Grid.Col span="auto" style={{display: 'flex', justifyContent: 'center', gap: 12}}>
                    <Button variant="subtle" onClick={() => navigate('/')}>
                        Home
                    </Button>
                    <Button variant="subtle" onClick={() => navigate('/search')}>
                        Search
                    </Button>
                </Grid.Col>
                <Grid.Col span="auto" style={{display: 'flex', justifyContent: 'flex-end', gap: 8}}>
                    <ThemeSwitch/>
                    <Menu
                        opened={menuOpened}
                        onOpen={() => setMenuOpened(true)}
                        onClose={() => setMenuOpened(false)}
                        transitionProps={{transition: 'rotate-right', duration: 150}}
                    >
                        <Menu.Target>
                            <UnstyledButton>
                                <Box style={{display: 'flex', alignItems: 'center', gap: 5}}>
                                    <Avatar radius="xl" size={30} color="blue">
                                        {user?.username?.[0]?.toUpperCase() ?? '?'}
                                    </Avatar>
                                    <ChevronDown size={14}/>
                                </Box>
                            </UnstyledButton>
                        </Menu.Target>

                        <Menu.Dropdown>
                            <Menu.Item leftSection={<Settings size={16}/>} onClick={() => navigate('/settings')}>
                                Settings
                            </Menu.Item>

                            <Menu.Item leftSection={<LogOut size={16}/>} onClick={logout} color="red">
                                Logout
                            </Menu.Item>
                        </Menu.Dropdown>
                    </Menu>
                </Grid.Col>

            </Grid>
        </Box>
    );
}
