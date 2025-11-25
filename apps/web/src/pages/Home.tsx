import React from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
    Container,
    Title,
    Text,
    Button,
    Group,
    Grid,
    Card,
    Stack,
    Box,
    ThemeIcon,
    SimpleGrid,
    Paper,
    ActionIcon,
    Divider,
} from "@mantine/core";
import {
    IconPlane,
    IconGlobe,
    IconUsers,
    IconBriefcase,
    IconCertificate,
    IconWorld,
} from "@tabler/icons-react";
import { CompassLogo } from "../components/CompassLogo";

const Home: React.FC = () => {
    const { t, i18n } = useTranslation();

    const features = [
        {
            icon: IconPlane,
            title: "Airline Careers",
            description:
                "Discover opportunities with major airlines worldwide. Access salary data, requirements, and hiring information.",
            color: "violet",
        },
        {
            icon: IconGlobe,
            title: "Global Network",
            description:
                "Connect with aviation professionals across the globe. Share experiences and build your network.",
            color: "blue",
        },
        {
            icon: IconUsers,
            title: "Community Forum",
            description:
                "Join discussions with pilots, cabin crew, and aviation enthusiasts. Share knowledge and experiences.",
            color: "cyan",
        },
        {
            icon: IconBriefcase,
            title: "Resource Library",
            description:
                "Access curated resources for aviation professionals. From training materials to career guides.",
            color: "teal",
        },
    ];

    const stats = [
        { label: "Airlines", value: "500+", icon: IconPlane },
        { label: "Countries", value: "150+", icon: IconWorld },
        { label: "Active Users", value: "10K+", icon: IconUsers },
        { label: "Resources", value: "2.5K+", icon: IconCertificate },
    ];

    return (
        <Box>
            <Helmet>
                <title>{t("welcome")} - Pilot Capital</title>
                <meta
                    name="description"
                    content="The premier aviation resource platform for pilots, cabin crew, and aviation professionals worldwide"
                />
            </Helmet>

            {/* Hero Section */}
            <Box
                style={{
                    background:
                        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    minHeight: "70vh",
                    display: "flex",
                    alignItems: "center",
                    position: "relative",
                    overflow: "hidden",
                }}
            >
                <Container
                    size="lg"
                    style={{ position: "relative", zIndex: 2 }}
                >
                    <Grid align="center">
                        <Grid.Col span={{ base: 12, md: 8 }}>
                            <Stack gap="xl">
                                <Title
                                    order={1}
                                    size="4rem"
                                    fw={900}
                                    c="white"
                                    style={{
                                        textShadow:
                                            "2px 2px 4px rgba(0,0,0,0.3)",
                                        lineHeight: 1.2,
                                    }}
                                >
                                    Welcome to{" "}
                                    <Text
                                        component="span"
                                        variant="gradient"
                                        gradient={{
                                            from: "cyan",
                                            to: "violet",
                                            deg: 45,
                                        }}
                                    >
                                        Pilot Capital
                                    </Text>
                                </Title>

                                <Text size="xl" c="gray.0" fw={500}>
                                    Your ultimate aviation resource hub. Connect
                                    with airlines, explore career opportunities,
                                    and join a global community of aviation
                                    professionals.
                                </Text>

                                <Group>
                                    <Button
                                        component={Link}
                                        to="/airlines"
                                        size="lg"
                                        variant="gradient"
                                        gradient={{
                                            from: "violet",
                                            to: "cyan",
                                        }}
                                        leftSection={<IconPlane size={20} />}
                                    >
                                        Explore Airlines
                                    </Button>
                                    <Button
                                        component={Link}
                                        to="/globe"
                                        size="lg"
                                        variant="white"
                                        c="violet"
                                        leftSection={<IconGlobe size={20} />}
                                    >
                                        View Global Map
                                    </Button>
                                </Group>
                            </Stack>
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, md: 4 }}>
                            <Box style={{ textAlign: "center" }}>
                                <Box
                                    style={{
                                        display: "inline-block",
                                        padding: "2rem",
                                        borderRadius: "50%",
                                        background: "rgba(255, 255, 255, 0.1)",
                                        backdropFilter: "blur(10px)",
                                        border: "2px solid rgba(255, 255, 255, 0.2)",
                                    }}
                                >
                                    <CompassLogo size="8rem" />
                                </Box>
                            </Box>
                        </Grid.Col>
                    </Grid>
                </Container>

                {/* Language Toggle */}
                <Group
                    style={{
                        position: "absolute",
                        top: 20,
                        right: 20,
                        zIndex: 3,
                    }}
                >
                    <ActionIcon
                        variant="subtle"
                        c="white"
                        onClick={() => i18n.changeLanguage("en")}
                        title="English"
                    >
                        EN
                    </ActionIcon>
                    <ActionIcon
                        variant="subtle"
                        c="white"
                        onClick={() => i18n.changeLanguage("fr")}
                        title="Français"
                    >
                        FR
                    </ActionIcon>
                </Group>
            </Box>

            {/* Stats Section */}
            <Container size="lg" py="xl">
                <SimpleGrid cols={{ base: 2, md: 4 }} spacing="lg">
                    {stats.map((stat, index) => (
                        <Paper
                            key={index}
                            p="md"
                            radius="md"
                            shadow="sm"
                            style={{ textAlign: "center" }}
                        >
                            <ThemeIcon
                                size="xl"
                                radius="md"
                                variant="light"
                                color="violet"
                                mx="auto"
                                mb="sm"
                            >
                                <stat.icon size={24} />
                            </ThemeIcon>
                            <Text size="xl" fw={700} c="violet">
                                {stat.value}
                            </Text>
                            <Text size="sm" c="dimmed">
                                {stat.label}
                            </Text>
                        </Paper>
                    ))}
                </SimpleGrid>
            </Container>

            <Divider />

            {/* Features Section */}
            <Container size="lg" py="xl">
                <Stack gap="xl">
                    <Box style={{ textAlign: "center" }}>
                        <Title order={2} size="h1" mb="md">
                            Everything You Need for Your Aviation Career
                        </Title>
                        <Text size="lg" c="dimmed" maw={600} mx="auto">
                            From career opportunities to professional
                            networking, we provide comprehensive resources for
                            aviation professionals at every stage of their
                            journey.
                        </Text>
                    </Box>

                    <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl">
                        {features.map((feature, index) => (
                            <Card
                                key={index}
                                shadow="sm"
                                padding="lg"
                                radius="md"
                                withBorder
                            >
                                <Group mb="md">
                                    <ThemeIcon
                                        size="lg"
                                        radius="md"
                                        variant="light"
                                        color={feature.color}
                                    >
                                        <feature.icon size={24} />
                                    </ThemeIcon>
                                    <Title order={3} size="h3">
                                        {feature.title}
                                    </Title>
                                </Group>
                                <Text c="dimmed">{feature.description}</Text>
                            </Card>
                        ))}
                    </SimpleGrid>
                </Stack>
            </Container>

            <Divider />

            {/* CTA Section */}
            <Box
                style={{
                    background:
                        "linear-gradient(45deg, #f093fb 0%, #f5576c 100%)",
                    padding: "4rem 0",
                }}
            >
                <Container size="lg">
                    <Stack
                        gap="xl"
                        align="center"
                        style={{ textAlign: "center" }}
                    >
                        <Title order={2} c="white" size="h1">
                            Ready to Take Off?
                        </Title>
                        <Text size="lg" c="gray.0" maw={500}>
                            Join thousands of aviation professionals who trust
                            Pilot Capital for their career development and
                            networking needs.
                        </Text>
                        <Group>
                            <Button
                                size="lg"
                                variant="white"
                                c="pink"
                                component={Link}
                                to="/airlines"
                            >
                                Get Started
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                c="white"
                                style={{ borderColor: "white" }}
                            >
                                Learn More
                            </Button>
                        </Group>

                        <Text size="sm" c="gray.2" mt="xl">
                            🇰🇾 Proudly headquartered in the Cayman Islands
                        </Text>
                    </Stack>
                </Container>
            </Box>
        </Box>
    );
};

export default Home;
