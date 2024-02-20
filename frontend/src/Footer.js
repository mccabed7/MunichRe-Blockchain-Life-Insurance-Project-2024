import React from "react";
import { Link } from "react-router-dom";
import {
    footerBox,
    row,
    column,
    footerLink,
} from "./Footer.css";

const Footer = () => {
    return (
            <footerBox>
                <row>
                    <h1
                        style={{
                                   color: "white",
                                   textAlign: "left",
                                   marginTop: "10px",
                                   marginLeft: "320px",
                                   fontSize: "45px",
                                   fontWeight: "bold"
                                 }}
                        >
                        BlockchainAssure
                    </h1>
                    <column>
                        <footerLink>
                            About us
                        </footerLink>
                        <footerLink>
                            How it works
                        </footerLink>
                    </column>
                    <column>
                        <footerLink>
                            Contact Us
                        </footerLink>
                        <footerLink>
                            Login/Register
                        </footerLink>
                    </column>
                </row>
            </footerBox>
    );
};

export default Footer;
