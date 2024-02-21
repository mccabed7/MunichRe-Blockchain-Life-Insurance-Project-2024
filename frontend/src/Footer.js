import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
            <footerBox>
                <row>
                    <column>
                        <heading>
                            SmartAssurance
                        </heading>
                    </column>
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
