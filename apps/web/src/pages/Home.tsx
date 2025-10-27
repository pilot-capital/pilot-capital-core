import React from "react";
import { SampleButton } from "../components/SampleButton";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

const Home: React.FC = () => {
    const { t, i18n } = useTranslation();
    return (
        <div>
            <Helmet>
                <title>{t("welcome")}</title>
                <meta
                    name="description"
                    content="Home page of Pilot Capital application"
                />
            </Helmet>
            <div style={{ marginBottom: 16 }}>
                <button onClick={() => i18n.changeLanguage("en")}>
                    English
                </button>
                <button
                    onClick={() => i18n.changeLanguage("fr")}
                    style={{ marginLeft: 8 }}
                >
                    Français
                </button>
            </div>
            <h1>{t("welcome")}</h1>
            <SampleButton label={t("click_me")} />
            <h2>{t("test_home")}</h2>
            <p>
                We are proudly based in the tax haven of 🇰🇾 the Cayman Islands.
            </p>
        </div>
    );
};

export default Home;
