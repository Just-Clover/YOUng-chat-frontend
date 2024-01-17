import {Box, Paper} from "@mui/material";
import Profile from "./mainbody/Profile.jsx";
import EditPassword from "./mainbody/EditPassword.jsx";
import EditProfile from "./mainbody/EditProfile.jsx";

const MainBody = ({mainbody, setMainbody}) => {

    const renderMainbodyComponent = () => {
        switch (mainbody) {
            case 'profile' :
                return <Profile setMainbody={setMainbody}/>
            case 'editPassword' :
                return <EditPassword setMainbody={setMainbody}/>
            case 'editProfile' :
                return <EditProfile setMainbody={setMainbody}/>
            default:
                return null;
        }
    }

    return (
        <Box
            component="main" s
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
                {renderMainbodyComponent()}
                {/*<Profile/>*/}
                {/*<EditProfile/>*/}
                {/*<EditPassword/>*/}
                {/*<Chatroom/>*/}
            </Paper>
        </Box>
    )
};

export default MainBody;
