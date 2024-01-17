import {Box, Paper} from "@mui/material";
import Profile from "./mainbody/Profile.jsx";
import EditPassword from "./mainbody/EditPassword.jsx";
import EditProfile from "./mainbody/EditProfile.jsx";
import Chatroom from "./mainbody/Chatroom.jsx";

// eslint-disable-next-line react/prop-types
const MainBody = ({mainBody, setMainBody}) => {

    const renderMainBodyComponent = () => {
        switch (mainBody) {
            case 'profile' :
                return <Profile setMainBody={setMainBody}/>
            case 'editPassword' :
                return <EditPassword setMainBody={setMainBody}/>
            case 'editProfile' :
                return <EditProfile setMainBody={setMainBody}/>
            case 'chatRoom' :
                return <Chatroom/>
            default:
                return null;
        }
    }

    return (
        <Box
            component="main"
            sx={{
                flexGrow: 1,
                p: 3,
                flexBasis: '67%'
            }}
        >
            <Paper sx={{
                height: '100%',
                my: 'auto',
                mx: 'auto',
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                {renderMainBodyComponent()}
            </Paper>
        </Box>
    )
};

export default MainBody;
