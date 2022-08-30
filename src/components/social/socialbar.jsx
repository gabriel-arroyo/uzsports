import React from "react";
import { styled } from "@mui/material/styles";
import facebook from "../../assets/images/facebook.png";
import instagram from "../../assets/images/instagram.png";
import whatsapp from "../../assets/images/whatsapp.png";
import email from "../../assets/images/email.png";
import { PropTypes } from "prop-types";
import { IconButton, Tooltip } from "@mui/material";

const SocialImg = styled("img")(({ theme }) => ({
  padding: theme.spacing(1),
  width: "35px",
  heigth: "35px",
}));

const SocialButton = ({ src, to }) => {
  return (
    <Tooltip title={to}>
      <IconButton>
        <a href={to} target="_blanc">
          <SocialImg src={src} alt={to} />
        </a>
      </IconButton>
    </Tooltip>
  );
};

SocialButton.propTypes = {
  src: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

const SocialBar = () => {
  return (
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <SocialButton src={facebook} to="https://www.facebook.com/" />
      <SocialButton src={instagram} to="https://www.instagram.com/" />
      <SocialButton src={whatsapp} to="https://wa.me/" />
      <SocialButton src={email} to="mailto:test@test.com" />
    </div>
  );
};

export default SocialBar;
