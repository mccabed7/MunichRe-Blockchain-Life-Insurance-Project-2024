import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
            <footerBox>
                <row>
                    <column>
                        <Link to= '/landingpage'>
                        <a href= '#'>
                        <heading>
                            SmartAssurance
                        </heading>
                        </a>
                        </Link>
                    </column>
                    <column>
                        <Link to= '/aboutus'>
                            <a href='#'>
                                <footerLink>
                                    About us
                                </footerLink>
                            </a>
                        </Link>
                        <Link to= '/howitworks'>
                            <a href='#'>
                                <footerLink>
                                    How it works
                                </footerLink>
                             </a>
                        </Link>
                    </column>
                    <column>
                        <Link to= '/contactus'>
                            <a href='#'>
                                <footerLink>
                                    Contact us
                                </footerLink>
                            </a>
                        </Link>
                        <Link to= '/registration'>
                            <a href='#'>
                                <footerLink>
                                    Login/Register
                                </footerLink>
                            </a>
                        </Link>
                    </column>
                </row>
            </footerBox>
    );
};

export default Footer;
