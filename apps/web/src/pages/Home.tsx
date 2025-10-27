import React from "react";
import { SampleButton } from "../components/SampleButton";
import { Helmet } from "react-helmet-async";

const Home: React.FC = () => (
    <div>
        <Helmet>
            <title>Pilot Capital Home</title>
            <meta
                name="description"
                content="Home page of Pilot Capital application"
            />
        </Helmet>
        <h1>Welcome to Pilot Capital</h1>
        <SampleButton label="Click Me" />
        <h2>Test home page here! Vite + React + Typescript + Django</h2>
    </div>
);

export default Home;
