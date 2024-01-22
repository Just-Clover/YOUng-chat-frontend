import {Box, Paper} from "@mui/material";
import Profile from "./mainbody/Profile.jsx";
import EditPassword from "./mainbody/EditPassword.jsx";
import EditProfile from "./mainbody/EditProfile.jsx";
import Chatroom from "./mainbody/Chatroom.jsx";
import mainBodyStore from "../store/main/MainBodyStore.js";
import FriendSearch from "./mainbody/friend/FriendSearch.jsx";
import FriendAdd from "./mainbody/friend/FriendAdd.jsx";

// eslint-disable-next-line react/prop-types
const MainBody = () => {

    const {mainBody} = mainBodyStore();
    const renderMainBodyComponent = () => {
        switch (mainBody) {
            case 'profile' :
                return <Profile/>
            case 'editPassword' :
                return <EditPassword/>
            case 'editProfile' :
                return <EditProfile/>
            case 'chatRoom' :
                return <Chatroom/>
            case 'friendSearch':
                return <FriendSearch/>
            case 'friendAdd':
                return <FriendAdd/>
            default:
                return null;
        }
    };

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
