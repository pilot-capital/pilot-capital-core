import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { airlineApi } from "../api/airlineApi";
import type { Airline, AirlineReview } from "../api/airlineApi";
import {
    Container,
    Title,
    Text,
    Button,
    Group,
    Grid,
    Card,
    ThemeIcon,
    rem,
    Box,
    Stack,
    SimpleGrid,
    Badge,
    Tabs,
    List,
    Avatar,
    Rating,
    Progress,
    Paper,
    Loader,
    Alert,
    Overlay,
    ActionIcon,
    Divider,
} from "@mantine/core";
import {
    IconPlane,
    IconMapPin,
    IconBuildingSkyscraper,
    IconWorld,
    IconUsers,
    IconCheck,
    IconExternalLink,
    IconArrowLeft,
    IconAlertCircle,
    IconBriefcase,
    IconStar,
    IconCalendar,
} from "@tabler/icons-react";

export const AirlineDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [airline, setAirline] = useState<Airline | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (id) {
            loadAirline(parseInt(id));
        }
    }, [id]);

    const loadAirline = async (airlineId: number) => {
        try {
            setLoading(true);
            const data = await airlineApi.getAirline(airlineId);
            setAirline(data);
        } catch (err) {
            setError("Failed to load airline details");
            console.error("Error loading airline:", err);
        } finally {
            setLoading(false);
        }
    };

    const formatSalary = (min?: number, max?: number) => {
        if (!min && !max) return "Not specified";
        if (min && max)
            return `$${min.toLocaleString()} - $${max.toLocaleString()}`;
        if (min) return `From $${min.toLocaleString()}`;
        if (max) return `Up to $${max.toLocaleString()}`;
    };

    if (loading) {
        return (
            <Box py={100} style={{ textAlign: "center" }}>
                <Loader size="xl" type="dots" />
                <Text c="dimmed" mt="md">
                    Loading airline details...
                </Text>
            </Box>
        );
    }

    if (error || !airline) {
        return (
            <Container size="md" py={100}>
                <Alert
                    icon={<IconAlertCircle size={16} />}
                    title="Airline Not Found"
                    color="red"
                    variant="filled"
                >
                    {error || "The requested airline could not be found."}
                    <Button
                        component={Link}
                        to="/airlines"
                        variant="white"
                        color="red"
                        size="xs"
                        mt="sm"
                        leftSection={<IconArrowLeft size={16} />}
                    >
                        Back to Airlines
                    </Button>
                </Alert>
            </Container>
        );
    }

    return (
        <Box>
            {/* Hero Section */}
            <Box
                style={{
                    position: "relative",
                    paddingTop: rem(80),
                    paddingBottom: rem(80),
                    background:
                        "url(https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop) center/cover no-repeat",
                    backgroundAttachment: "fixed",
                }}
            >
                <Overlay
                    gradient="linear-gradient(180deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.8) 100%)"
                    opacity={1}
                    zIndex={1}
                />
                <Container
                    size="xl"
                    style={{ position: "relative", zIndex: 2 }}
                >
                    <Button
                        component={Link}
                        to="/airlines"
                        variant="subtle"
                        color="white"
                        leftSection={<IconArrowLeft size={16} />}
                        mb="xl"
                        style={{ opacity: 0.8 }}
                    >
                        Back to Airlines
                    </Button>

                    <Group align="flex-end" gap="xl">
                        <Box
                            style={{
                                width: 120,
                                height: 120,
                                borderRadius: 16,
                                background: "white",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                overflow: "hidden",
                                border: "4px solid rgba(255, 255, 255, 0.2)",
                                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
                            }}
                        >
                            {airline.logo_url ? (
                                <img
                                    src={airline.logo_url}
                                    alt={airline.name}
                                    style={{
                                        width: "90%",
                                        height: "90%",
                                        objectFit: "contain",
                                    }}
                                />
                            ) : (
                                <Text size={rem(48)}>✈️</Text>
                            )}
                        </Box>
                        <Stack gap="xs" style={{ flex: 1 }}>
                            <Group>
                                <Title
                                    style={{
                                        fontSize: rem(48),
                                        color: "white",
                                        fontWeight: 900,
                                        textShadow:
                                            "0 2px 4px rgba(0,0,0,0.3)",
                                    }}
                                >
                                    {airline.name}
                                </Title>
                                {airline.is_hiring && (
                                    <Badge
                                        size="xl"
                                        color="green"
                                        variant="filled"
                                        leftSection={<IconCheck size={16} />}
                                    >
                                        HIRING NOW
                                    </Badge>
                                )}
                            </Group>
                            <Group gap="lg">
                                <Group gap={8}>
                                    <Badge
                                        size="lg"
                                        variant="outline"
                                        color="white"
                                    >
                                        {airline.iata_code}
                                    </Badge>
                                    <Badge
                                        size="lg"
                                        variant="outline"
                                        color="white"
                                    >
                                        {airline.icao_code}
                                    </Badge>
                                </Group>
                                <Group gap={6}>
                                    <IconMapPin
                                        size={20}
                                        style={{ color: "rgba(255,255,255,0.8)" }}
                                    />
                                    <Text c="white" size="lg">
                                        {airline.headquarters},{" "}
                                        {airline.country_name}
                                    </Text>
                                </Group>
                                {airline.callsign && (
                                    <Text c="dimmed" size="lg">
                                        Callsign: "{airline.callsign}"
                                    </Text>
                                )}
                            </Group>
                        </Stack>
                    </Group>

                    <SimpleGrid
                        cols={{ base: 2, sm: 4 }}
                        mt={50}
                        spacing="lg"
                        style={{
                            borderTop: "1px solid rgba(255, 255, 255, 0.2)",
                            paddingTop: rem(30),
                        }}
                    >
                        {[
                            {
                                label: "Fleet Size",
                                value: airline.fleet_size,
                                icon: IconPlane,
                            },
                            {
                                label: "Destinations",
                                value: airline.destinations,
                                icon: IconWorld,
                            },
                            {
                                label: "Founded",
                                value: airline.founded_year,
                                icon: IconBuildingSkyscraper,
                            },
                            {
                                label: "Reviews",
                                value: airline.review_count || 0,
                                icon: IconStar,
                            },
                        ].map((stat) => (
                            <Group key={stat.label}>
                                <ThemeIcon
                                    size="lg"
                                    radius="md"
                                    variant="light"
                                    color="white"
                                    style={{ background: "rgba(255,255,255,0.1)" }}
                                >
                                    <stat.icon size={20} />
                                </ThemeIcon>
                                <div>
                                    <Text size="xs" c="dimmed" tt="uppercase" fw={700}>
                                        {stat.label}
                                    </Text>
                                    <Text c="white" fw={700} size="xl">
                                        {stat.value}
                                    </Text>
                                </div>
                            </Group>
                        ))}
                    </SimpleGrid>
                </Container>
            </Box>

            <Container size="xl" py="xl">
                <Tabs defaultValue="overview" variant="pills" radius="md">
                    <Tabs.List mb="xl">
                        <Tabs.Tab
                            value="overview"
                            leftSection={<IconBuildingSkyscraper size={16} />}
                        >
                            Overview
                        </Tabs.Tab>
                        <Tabs.Tab
                            value="careers"
                            leftSection={<IconBriefcase size={16} />}
                        >
                            Careers
                        </Tabs.Tab>
                        <Tabs.Tab
                            value="reviews"
                            leftSection={<IconStar size={16} />}
                        >
                            Reviews
                        </Tabs.Tab>
                    </Tabs.List>

                    <Tabs.Panel value="overview">
                        <SimpleGrid cols={{ base: 1, md: 3 }} spacing="lg">
                            <Card shadow="sm" padding="lg" radius="md" withBorder>
                                <Group mb="md">
                                    <ThemeIcon variant="light" size="lg">
                                        <IconPlane size={20} />
                                    </ThemeIcon>
                                    <Text fw={700} size="lg">
                                        Fleet Information
                                    </Text>
                                </Group>
                                <Stack gap="md">
                                    <Group justify="space-between">
                                        <Text c="dimmed">Total Aircraft</Text>
                                        <Text fw={600}>{airline.fleet_size}</Text>
                                    </Group>
                                    <Box>
                                        <Text c="dimmed" size="sm" mb="xs">
                                            Aircraft Types
                                        </Text>
                                        <Group gap="xs">
                                            {airline.fleet_types_list.map(
                                                (type, index) => (
                                                    <Badge
                                                        key={index}
                                                        variant="light"
                                                        color="gray"
                                                    >
                                                        {type}
                                                    </Badge>
                                                )
                                            )}
                                        </Group>
                                    </Box>
                                </Stack>
                            </Card>

                            <Card shadow="sm" padding="lg" radius="md" withBorder>
                                <Group mb="md">
                                    <ThemeIcon variant="light" size="lg" color="cyan">
                                        <IconWorld size={20} />
                                    </ThemeIcon>
                                    <Text fw={700} size="lg">
                                        Operations
                                    </Text>
                                </Group>
                                <Stack gap="md">
                                    <Group justify="space-between">
                                        <Text c="dimmed">Destinations</Text>
                                        <Text fw={600}>{airline.destinations}</Text>
                                    </Group>
                                    <Box>
                                        <Text c="dimmed" size="sm" mb="xs">
                                            Hub Airports
                                        </Text>
                                        <Group gap="xs">
                                            {airline.hub_airports_list.map(
                                                (hub, index) => (
                                                    <Badge
                                                        key={index}
                                                        variant="outline"
                                                    >
                                                        {hub}
                                                    </Badge>
                                                )
                                            )}
                                        </Group>
                                    </Box>
                                </Stack>
                            </Card>

                            <Card shadow="sm" padding="lg" radius="md" withBorder>
                                <Group mb="md">
                                    <ThemeIcon
                                        variant="light"
                                        size="lg"
                                        color="violet"
                                    >
                                        <IconBuildingSkyscraper size={20} />
                                    </ThemeIcon>
                                    <Text fw={700} size="lg">
                                        Company Info
                                    </Text>
                                </Group>
                                <Stack gap="md">
                                    <Group justify="space-between">
                                        <Text c="dimmed">Founded</Text>
                                        <Text fw={600}>{airline.founded_year}</Text>
                                    </Group>
                                    <Group justify="space-between">
                                        <Text c="dimmed">Headquarters</Text>
                                        <Text fw={600} style={{ textAlign: "right" }}>
                                            {airline.headquarters}
                                        </Text>
                                    </Group>
                                    {airline.website && (
                                        <Button
                                            component="a"
                                            href={airline.website}
                                            target="_blank"
                                            variant="light"
                                            fullWidth
                                            rightSection={
                                                <IconExternalLink size={16} />
                                            }
                                            mt="auto"
                                        >
                                            Visit Website
                                        </Button>
                                    )}
                                </Stack>
                            </Card>
                        </SimpleGrid>
                    </Tabs.Panel>

                    <Tabs.Panel value="careers">
                        <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg" mb="xl">
                            <Card shadow="sm" padding="xl" radius="md" withBorder>
                                <Group mb="xl">
                                    <ThemeIcon
                                        size={50}
                                        radius="md"
                                        variant="light"
                                        color="blue"
                                    >
                                        <IconPlane size={30} />
                                    </ThemeIcon>
                                    <div>
                                        <Text size="xl" fw={700}>
                                            Pilot Positions
                                        </Text>
                                        <Text c="dimmed">Flight Deck Crew</Text>
                                    </div>
                                </Group>
                                <Stack gap="md">
                                    <Paper p="md" bg="gray.0" radius="md">
                                        <Text size="xs" c="dimmed" tt="uppercase" fw={700}>
                                            Salary Range
                                        </Text>
                                        <Text size="xl" fw={700} c="blue">
                                            {formatSalary(
                                                airline.pilot_salary_min,
                                                airline.pilot_salary_max
                                            )}
                                        </Text>
                                    </Paper>
                                    {airline.pilot_requirements && (
                                        <Box>
                                            <Text fw={600} mb="xs">
                                                Requirements
                                            </Text>
                                            <List
                                                spacing="xs"
                                                size="sm"
                                                center
                                                icon={
                                                    <ThemeIcon
                                                        color="blue"
                                                        size={20}
                                                        radius="xl"
                                                    >
                                                        <IconCheck
                                                            style={{
                                                                width: rem(12),
                                                                height: rem(12),
                                                            }}
                                                        />
                                                    </ThemeIcon>
                                                }
                                            >
                                                {airline.pilot_requirements
                                                    .split("\n")
                                                    .map((req, index) => (
                                                        <List.Item key={index}>
                                                            {req}
                                                        </List.Item>
                                                    ))}
                                            </List>
                                        </Box>
                                    )}
                                </Stack>
                            </Card>

                            <Card shadow="sm" padding="xl" radius="md" withBorder>
                                <Group mb="xl">
                                    <ThemeIcon
                                        size={50}
                                        radius="md"
                                        variant="light"
                                        color="pink"
                                    >
                                        <IconUsers size={30} />
                                    </ThemeIcon>
                                    <div>
                                        <Text size="xl" fw={700}>
                                            Cabin Crew
                                        </Text>
                                        <Text c="dimmed">Service & Safety</Text>
                                    </div>
                                </Group>
                                <Stack gap="md">
                                    <Paper p="md" bg="gray.0" radius="md">
                                        <Text size="xs" c="dimmed" tt="uppercase" fw={700}>
                                            Salary Range
                                        </Text>
                                        <Text size="xl" fw={700} c="pink">
                                            {formatSalary(
                                                airline.cabin_crew_salary_min,
                                                airline.cabin_crew_salary_max
                                            )}
                                        </Text>
                                    </Paper>
                                    {airline.cabin_crew_requirements && (
                                        <Box>
                                            <Text fw={600} mb="xs">
                                                Requirements
                                            </Text>
                                            <List
                                                spacing="xs"
                                                size="sm"
                                                center
                                                icon={
                                                    <ThemeIcon
                                                        color="pink"
                                                        size={20}
                                                        radius="xl"
                                                    >
                                                        <IconCheck
                                                            style={{
                                                                width: rem(12),
                                                                height: rem(12),
                                                            }}
                                                        />
                                                    </ThemeIcon>
                                                }
                                            >
                                                {airline.cabin_crew_requirements
                                                    .split("\n")
                                                    .map((req, index) => (
                                                        <List.Item key={index}>
                                                            {req}
                                                        </List.Item>
                                                    ))}
                                            </List>
                                        </Box>
                                    )}
                                </Stack>
                            </Card>
                        </SimpleGrid>

                        <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg">
                            {airline.benefits && (
                                <Card shadow="sm" padding="lg" radius="md" withBorder>
                                    <Group mb="md">
                                        <ThemeIcon
                                            variant="light"
                                            size="lg"
                                            color="teal"
                                        >
                                            <IconBriefcase size={20} />
                                        </ThemeIcon>
                                        <Text fw={700} size="lg">
                                            Benefits & Perks
                                        </Text>
                                    </Group>
                                    <List
                                        spacing="sm"
                                        icon={
                                            <ThemeIcon
                                                color="teal"
                                                size={20}
                                                radius="xl"
                                            >
                                                <IconCheck
                                                    style={{
                                                        width: rem(12),
                                                        height: rem(12),
                                                    }}
                                                />
                                            </ThemeIcon>
                                        }
                                    >
                                        {airline.benefits
                                            .split("\n")
                                            .map((benefit, index) => (
                                                <List.Item key={index}>
                                                    {benefit}
                                                </List.Item>
                                            ))}
                                    </List>
                                </Card>
                            )}

                            {airline.contact_hr && (
                                <Card
                                    shadow="sm"
                                    padding="lg"
                                    radius="md"
                                    withBorder
                                    bg="blue.0"
                                >
                                    <Text fw={700} size="lg" mb="md">
                                        Ready to Apply?
                                    </Text>
                                    <Text mb="xl">
                                        Contact the HR department directly to start
                                        your application process.
                                    </Text>
                                    <Button
                                        component="a"
                                        href={`mailto:${airline.contact_hr}`}
                                        fullWidth
                                        size="lg"
                                    >
                                        Contact HR
                                    </Button>
                                </Card>
                            )}
                        </SimpleGrid>
                    </Tabs.Panel>

                    <Tabs.Panel value="reviews">
                        <Grid gutter="xl">
                            <Grid.Col span={{ base: 12, md: 4 }}>
                                <Card shadow="sm" padding="xl" radius="md" withBorder>
                                    <Stack align="center" gap="xs">
                                        <Text size={rem(64)} fw={900} lh={1} c="blue">
                                            {airline.average_rating || "0.0"}
                                        </Text>
                                        <Rating
                                            value={airline.average_rating || 0}
                                            readOnly
                                            size="lg"
                                        />
                                        <Text c="dimmed">
                                            Based on {airline.review_count || 0}{" "}
                                            reviews
                                        </Text>
                                    </Stack>
                                </Card>
                            </Grid.Col>
                            <Grid.Col span={{ base: 12, md: 8 }}>
                                <Stack gap="md">
                                    {airline.reviews &&
                                        airline.reviews.length > 0 ? (
                                        airline.reviews.map(
                                            (review: AirlineReview) => (
                                                <Card
                                                    key={review.id}
                                                    shadow="sm"
                                                    padding="lg"
                                                    radius="md"
                                                    withBorder
                                                >
                                                    <Group
                                                        justify="space-between"
                                                        mb="xs"
                                                    >
                                                        <Text fw={700} size="lg">
                                                            {review.title}
                                                        </Text>
                                                        <Rating
                                                            value={
                                                                review.overall_rating
                                                            }
                                                            readOnly
                                                        />
                                                    </Group>
                                                    <Group gap="xs" mb="md">
                                                        <Badge
                                                            variant="dot"
                                                            color={
                                                                review.employment_status ===
                                                                    "Current Employee"
                                                                    ? "green"
                                                                    : "gray"
                                                            }
                                                        >
                                                            {review.employment_status}
                                                        </Badge>
                                                        <Text size="sm" c="dimmed">
                                                            • {review.position}
                                                        </Text>
                                                        <Text size="sm" c="dimmed">
                                                            •{" "}
                                                            {review.years_experience}{" "}
                                                            years exp
                                                        </Text>
                                                    </Group>
                                                    <Text mb="md">
                                                        {review.content}
                                                    </Text>
                                                    <Text size="xs" c="dimmed">
                                                        Posted on{" "}
                                                        {new Date(
                                                            review.created_at
                                                        ).toLocaleDateString()}
                                                    </Text>
                                                </Card>
                                            )
                                        )
                                    ) : (
                                        <Alert
                                            icon={<IconBriefcase size={16} />}
                                            title="No Reviews Yet"
                                            color="blue"
                                        >
                                            Be the first to share your experience
                                            working with {airline.name}.
                                        </Alert>
                                    )}
                                </Stack>
                            </Grid.Col>
                        </Grid>
                    </Tabs.Panel>
                </Tabs>
            </Container>
        </Box>
    );
};
