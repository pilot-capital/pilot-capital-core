import React from "react";
import { Link } from "react-router-dom";
import { CompassLogo } from "../components/CompassLogo";
import {
    Container,
    Title,
    Text,
    Button,
    Group,
    Grid,
    Card,
    ThemeIcon,
    Overlay,
    Box,
    Stack,
    SimpleGrid,
    Badge,
} from "@mantine/core";
import {
    IconPlane,
    IconWorld,
    IconUsers,
    IconArrowRight,
    IconShieldCheck,
    IconChartDots,
    IconMapPin,
} from "@tabler/icons-react";

export default function LandingPage() {
    return (
        <Box>
            {/* Hero Section */}
            <Box
                style={{
                    position: "relative",
                    height: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background:
                        "linear-gradient(135deg, #0B1C3E 0%, #4A90E2 100%)",
                    overflow: "hidden",
                }}
            >
                {/* World Map SVG Overlay */}
                <svg
                    viewBox="0 0 1440 320"
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        opacity: 0.15,
                        zIndex: 1,
                    }}
                >
                    <path
                        fill="#fff"
                        fillOpacity="0.3"
                        d="M0,160L60,165.3C120,171,240,181,360,165.3C480,149,600,107,720,117.3C840,128,960,192,1080,218.7C1200,245,1320,235,1380,229.3L1440,224L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
                    ></path>
                </svg>
                {/* Animated Airplane */}
                <div
                    style={{
                        position: "absolute",
                        left: "10%",
                        top: "30%",
                        zIndex: 2,
                        animation: "fly 8s linear infinite",
                    }}
                >
                    <IconPlane
                        size={80}
                        color="#fff"
                        style={{
                            filter: "drop-shadow(0 4px 16px #4A90E2)",
                        }}
                    />
                </div>
                <style>{`
                    @keyframes fly {
                        0% { left: 10%; top: 30%; }
                        50% { left: 80%; top: 10%; }
                        100% { left: 10%; top: 30%; }
                    }
                `}</style>
                <Container
                    size="xl"
                    style={{ position: "relative", zIndex: 3, width: "100%" }}
                >
                    <Stack align="center" gap="xl">
                        <Box
                            style={{
                                background: "rgba(255, 255, 255, 0.1)",
                                backdropFilter: "blur(10px)",
                                padding: "2rem",
                                borderRadius: "50%",
                                border: "1px solid rgba(255, 255, 255, 0.2)",
                            }}
                        >
                            <CompassLogo size="80" />
                        </Box>
                        <Title
                            style={{
                                fontSize: 64,
                                fontWeight: 900,
                                lineHeight: 1.1,
                                color: "white",
                                textAlign: "center",
                                textShadow: "0 2px 10px rgba(0,0,0,0.3)",
                            }}
                        >
                            Take Flight with
                            <Text
                                component="span"
                                variant="gradient"
                                gradient={{ from: "#4facfe", to: "#00f2fe" }}
                                inherit
                            >
                                Pilot Capital
                            </Text>
                        </Title>
                        <Text
                            size="xl"
                            c="dimmed"
                            style={{
                                color: "rgba(255, 255, 255, 0.9)",
                                maxWidth: 600,
                                textAlign: "center",
                            }}
                        >
                            The global hub for pilots, airlines, and aviation
                            professionals. Discover opportunities, connect
                            worldwide, and elevate your career.
                        </Text>
                        <Group gap="md">
                            <Button
                                component={Link}
                                to="/airlines"
                                size="xl"
                                radius="md"
                                variant="gradient"
                                gradient={{ from: "#0B1C3E", to: "#4A90E2" }}
                                leftSection={<IconPlane size={20} />}
                            >
                                Explore Airlines
                            </Button>
                            <Button
                                component={Link}
                                to="/globe"
                                size="xl"
                                radius="md"
                                variant="outline"
                                color="white"
                                style={{
                                    borderWidth: 2,
                                    backdropFilter: "blur(5px)",
                                }}
                                leftSection={<IconWorld size={20} />}
                            >
                                Global Map
                            </Button>
                        </Group>
                    </Stack>
                </Container>
            </Box>

            {/* Stats Section */}
            <Box bg="#0B1C3E" py={60}>
                <Container size="xl">
                    <SimpleGrid cols={{ base: 1, sm: 3 }} spacing={50}>
                        {[
                            {
                                label: "Active Pilots",
                                value: "10,000+",
                                icon: IconUsers,
                            },
                            {
                                label: "Partner Airlines",
                                value: "500+",
                                icon: IconPlane,
                            },
                            {
                                label: "Countries",
                                value: "120+",
                                icon: IconWorld,
                            },
                        ].map((stat) => (
                            <Stack key={stat.label} align="center" gap="xs">
                                <ThemeIcon
                                    size={60}
                                    radius="xl"
                                    variant="light"
                                    color="blue.4"
                                >
                                    <stat.icon size={32} />
                                </ThemeIcon>
                                <Text
                                    c="white"
                                    fw={900}
                                    style={{ fontSize: 36 }}
                                >
                                    {stat.value}
                                </Text>
                                <Text c="blue.2" size="lg" fw={500}>
                                    {stat.label}
                                </Text>
                            </Stack>
                        ))}
                    </SimpleGrid>
                </Container>
            </Box>

            {/* Features Section */}
            <Box py={100} bg="gray.0">
                <Container size="xl">
                    <Stack align="center" mb={60}>
                        <Badge
                            variant="light"
                            size="lg"
                            color="blue"
                            style={{ textTransform: "uppercase" }}
                        >
                            Why Pilot Capital
                        </Badge>
                        <Title
                            order={2}
                            style={{ fontSize: 42, color: "#0B1C3E" }}
                            ta="center"
                        >
                            Everything You Need to Fly Higher
                        </Title>
                        <Text c="dimmed" ta="center" maw={600} size="lg">
                            Comprehensive tools and resources designed for the
                            modern aviation industry.
                        </Text>
                    </Stack>

                    <SimpleGrid cols={{ base: 1, md: 3 }} spacing={30}>
                        {[
                            {
                                title: "Airline Careers",
                                description:
                                    "Access detailed data on airline requirements, pay scales, and hiring trends worldwide.",
                                icon: IconChartDots,
                                color: "blue",
                            },
                            {
                                title: "Global Network",
                                description:
                                    "Connect with a verified community of pilots and industry leaders across the globe.",
                                icon: IconWorld,
                                color: "cyan",
                            },
                            {
                                title: "Verified Destinations",
                                description:
                                    "Explore top destinations and airlines with our interactive aviation map.",
                                icon: IconMapPin,
                                color: "indigo",
                            },
                        ].map((feature) => (
                            <Card
                                key={feature.title}
                                shadow="sm"
                                padding="xl"
                                radius="md"
                                withBorder
                                style={{
                                    transition:
                                        "transform 0.2s, box-shadow 0.2s",
                                }}
                            >
                                <ThemeIcon
                                    size={50}
                                    radius="md"
                                    variant="light"
                                    color={feature.color}
                                    mb="md"
                                >
                                    <feature.icon size={28} />
                                </ThemeIcon>
                                <Text
                                    fw={700}
                                    size="xl"
                                    mb="xs"
                                    c="dark"
                                    style={{ fontSize: 24 }}
                                >
                                    {feature.title}
                                </Text>
                                <Text size="md" c="dimmed" mb="xl">
                                    {feature.description}
                                </Text>
                            </Card>
                        ))}
                    </SimpleGrid>
                </Container>
            </Box>

            {/* Testimonials Section */}
            <Box py={80} bg="#eaf6fb">
                <Container size="xl">
                    <Stack align="center" mb={40}>
                        <Title order={3} style={{ color: "#0B1C3E" }}>
                            What Pilots Say
                        </Title>
                    </Stack>
                    <SimpleGrid cols={{ base: 1, md: 2 }} spacing={40}>
                        <Card radius="md" shadow="sm" p="xl" bg="white">
                            <Text size="lg" fw={600} mb="md" c="#0B1C3E">
                                "Pilot Capital helped me land my dream job with
                                a major airline. The global network is
                                unmatched!"
                            </Text>
                            <Group gap="sm">
                                <Box
                                    w={40}
                                    h={40}
                                    bg="blue.4"
                                    style={{ borderRadius: "50%" }}
                                />
                                <Box>
                                    <Text fw={600} c="#0B1C3E">
                                        Capt. Sarah Lee
                                    </Text>
                                    <Text c="dimmed" size="sm">
                                        A320 Captain
                                    </Text>
                                </Box>
                            </Group>
                        </Card>
                        <Card radius="md" shadow="sm" p="xl" bg="white">
                            <Text size="lg" fw={600} mb="md" c="#0B1C3E">
                                "The airline data and interactive map make it
                                easy to plan my next career move. Highly
                                recommended!"
                            </Text>
                            <Group gap="sm">
                                <Box
                                    w={40}
                                    h={40}
                                    bg="cyan.4"
                                    style={{ borderRadius: "50%" }}
                                />
                                <Box>
                                    <Text fw={600} c="#0B1C3E">
                                        FO. Michael Tan
                                    </Text>
                                    <Text c="dimmed" size="sm">
                                        First Officer
                                    </Text>
                                </Box>
                            </Group>
                        </Card>
                    </SimpleGrid>
                </Container>
            </Box>

            {/* CTA Section */}
            <Box
                py={100}
                style={{
                    background:
                        "linear-gradient(135deg, #0B1C3E 0%, #1a365d 100%)",
                    position: "relative",
                    overflow: "hidden",
                }}
            >
                <Overlay
                    gradient="linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.2) 100%)"
                    opacity={1}
                    zIndex={1}
                />
                <Container
                    size="xl"
                    style={{ position: "relative", zIndex: 2 }}
                >
                    <Grid align="center" gutter={50}>
                        <Grid.Col span={{ base: 12, md: 7 }}>
                            <Title
                                order={2}
                                style={{
                                    fontSize: 48,
                                    color: "white",
                                    lineHeight: 1.2,
                                }}
                                mb="md"
                            >
                                Ready for Takeoff?
                            </Title>
                            <Text c="blue.1" size="xl" mb="xl" maw={500}>
                                Join thousands of aviation professionals who
                                trust Pilot Capital for their career
                                development.
                            </Text>
                            <Button
                                component={Link}
                                to="/login"
                                size="xl"
                                radius="md"
                                variant="white"
                                color="dark"
                                rightSection={<IconArrowRight size={20} />}
                            >
                                Get Started Now
                            </Button>
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, md: 5 }}>
                            <Card
                                radius="lg"
                                p="xl"
                                bg="rgba(255, 255, 255, 0.05)"
                                style={{
                                    backdropFilter: "blur(10px)",
                                    border: "1px solid rgba(255, 255, 255, 0.1)",
                                }}
                            >
                                <Stack gap="md">
                                    <Text c="white" fw={700} size="lg">
                                        "Pilot Capital has been instrumental in
                                        connecting me with the right
                                        opportunities in my aviation career."
                                    </Text>
                                    <Group>
                                        <Box
                                            w={40}
                                            h={40}
                                            bg="blue.4"
                                            style={{ borderRadius: "50%" }}
                                        />
                                        <Box>
                                            <Text c="white" fw={600}>
                                                Capt. James Wilson
                                            </Text>
                                            <Text c="dimmed" size="sm">
                                                B777 Captain
                                            </Text>
                                        </Box>
                                    </Group>
                                </Stack>
                            </Card>
                        </Grid.Col>
                    </Grid>
                </Container>
            </Box>

            {/* Footer */}
            <Box
                bg="#050e1f"
                py="xl"
                style={{ borderTop: "1px solid #1f2937" }}
            >
                <Container size="xl">
                    <Group justify="space-between" align="center">
                        <Group gap="xs">
                            <CompassLogo size="30" />
                            <Text c="white" fw={700} size="lg">
                                Pilot Capital
                            </Text>
                        </Group>
                        <Text c="dimmed" size="sm">
                            © {new Date().getFullYear()} Pilot Capital. All
                            rights reserved.
                        </Text>
                        <Text c="dimmed" size="sm">
                            🇰🇾 Proudly headquartered in the Cayman Islands
                        </Text>
                    </Group>
                </Container>
            </Box>
        </Box>
    );
}
