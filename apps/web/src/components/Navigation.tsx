import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Group, Button, Container, Paper } from "@mantine/core";
import {
    IconHome,
    IconWorld,
    IconNews,
    IconPlane,
    IconMessages,
    IconLogin,
    IconDashboard,
} from "@tabler/icons-react";
import { useAuth } from "../hooks/authContext";
import { CompassLogo } from "./CompassLogo";

export const Navigation: React.FC = () => {
    const location = useLocation();
    const { isAuthenticated } = useAuth();

    const isActive = (path: string) => location.pathname === path;

    const navItems = [
        { path: "/", label: "Home", icon: IconHome },
        { path: "/globe", label: "Globe", icon: IconWorld },
        { path: "/blog", label: "Blog", icon: IconNews },
        { path: "/airlines", label: "Airlines", icon: IconPlane },
    ];

    if (isAuthenticated) {
        navItems.push({ path: "/forum", label: "Forum", icon: IconMessages });
    }

    return (
        <Paper
            shadow="sm"
            style={{
                background: "linear-gradient(135deg, #0a0a0a 0%, #2d1b4e 100%)",
                borderBottom: "2px solid #9d4edd",
                boxShadow: "0 2px 20px rgba(157,78,221,0.2)",
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                zIndex: 1000,
                borderRadius: 0,
            }}
        >
            <Container size="xl">
                <Group h={60} justify="space-between">
                    {/* Logo */}
                    <Link
                        to="/"
                        style={{
                            textDecoration: "none",
                            color: "#c77dff",
                            fontSize: "1.5rem",
                            fontWeight: "bold",
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem",
                        }}
                    >
                        <CompassLogo size={32} variant="light" />
                        Pilot Capital
                    </Link>

                    {/* Navigation Items */}
                    <Group gap="xs" visibleFrom="sm">
                        {navItems.map((item) => (
                            <Button
                                key={item.path}
                                component={Link}
                                to={item.path}
                                variant={
                                    isActive(item.path) ? "light" : "subtle"
                                }
                                color={isActive(item.path) ? "violet" : "gray"}
                                leftSection={<item.icon size={16} />}
                                size="sm"
                            >
                                {item.label}
                            </Button>
                        ))}
                    </Group>

                    {/* Auth Button */}
                    <Group gap="xs">
                        {!isAuthenticated ? (
                            <Button
                                component={Link}
                                to="/login"
                                variant="gradient"
                                gradient={{ from: "violet", to: "cyan" }}
                                leftSection={<IconLogin size={16} />}
                                size="sm"
                            >
                                Login
                            </Button>
                        ) : (
                            <Button
                                component={Link}
                                to="/dashboard"
                                variant="outline"
                                color="violet"
                                leftSection={<IconDashboard size={16} />}
                                size="sm"
                            >
                                Dashboard
                            </Button>
                        )}
                    </Group>
                </Group>
            </Container>
        </Paper>
    );
};
