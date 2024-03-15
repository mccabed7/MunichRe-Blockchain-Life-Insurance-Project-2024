import { render, screen, cleanup } from "@testing-library/react";
import SummaryPage from './SummaryPage.js';
import LandingPage from "./LandingPage.js";
import Dashboard from "./Dashboard.js";
//import App from './App.jsx';
import renderer from "react-test-renderer";

afterEach(() => {
    cleanup();
});

/*test( "test if landing page div renders", () => {
    render( <LandingPage/> );
    const landingPageReturn = screen.getByTestId( "landing page main div" );
    expect( landingPageReturn ).toBeInTheDocument();

})

test( "test if landing page has selected text", () => {
    render( <LandingPage/> );
    const landingPageReturn = screen.getByTestId( "landing page main div" );
    expect( landingPageReturn ).toHaveTextContent("How It Works");
}) */

test( "test if dashboard page div renders", () => {
    render( <Dashboard/> );
    const dashboardReturn = screen.getByTestId( "dashboard main div" );
    expect( dashboardReturn ).toBeInTheDocument();

})

test( "test if dashboard page has selected text", () => {
    render( <Dashboard/> );
    const dashboardReturn = screen.getByTestId( "dashboard main div" );
    expect( dashboardReturn ).toHaveTextContent("Personal Information");
})

test( "test if registration has a html button element", () => {
    render( <SummaryPage/> );
    const summaryPageReturn = screen.getByTestId( "summary page main div" );
    expect( summaryPageReturn ).toContainHTML( "strong" );

}) 
