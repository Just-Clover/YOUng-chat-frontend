import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import * as React from "react";

const Footer = () => {
  return (
    <Typography sx={{mt: 5}} color="text.secondary" align="center">
      {'Corp © '}
      <Link color="inherit">
        Just Clover
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

export default Footer;
