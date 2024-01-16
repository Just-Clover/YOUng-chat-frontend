import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Container from "@mui/material/Container";

const Footer = () => {
    return (
        <Container maxWidth={false} position="fixed" sx={{bgcolor: '#ffffff', zIndex: (theme) => theme.zIndex.tooltip}}>
            <Typography sx={{mt: 2, mb: 2}} color="text.secondary" align="center">
                {'Corp © '}
                <Link color="inherit">
                    Just Clover
                </Link>{' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
        </Container>
    )
}

export default Footer;
