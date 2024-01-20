import {Divider, List, ListItemText, Typography} from "@mui/material";
import ListItemButton from "@mui/material/ListItemButton";
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccounts';
import PasswordOutlinedIcon from '@mui/icons-material/PasswordOutlined';
import mainBodyStore from "../../store/main/MainBodyStore.js";

export const MyPage = () => {
    const {setMainBody} = mainBodyStore();
    return (
        <List component="nav" aria-label="mailbox folders" sx={{ml: 2}}>
            <Typography variant="h6"
                        sx={{
                            fontWeight: 'bold',
                            mb: 1
                        }}>
                My Page
            </Typography>
            <Divider/>
            <ListItemButton onClick={() => setMainBody('profile')}>
                <ManageAccountsOutlinedIcon/>
                <ListItemText primary="사용자 정보 변경" sx={{
                    ml: 2
                }}/>
            </ListItemButton>
            <Divider/>
            <ListItemButton onClick={() => setMainBody('editPassword')}>
                <PasswordOutlinedIcon/>
                <ListItemText primary="비밀번호 변경" sx={{
                    ml: 2
                }}/>
            </ListItemButton>
        </List>
    )
}
