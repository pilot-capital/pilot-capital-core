import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { airlineApi } from "../api/airlineApi";
import type { Airline, AirlineFilters, AirlineStats } from "../api/airlineApi";
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
    TextInput,
    Select,
    NumberInput,
    Paper,
    Loader,
    Alert,
    Overlay,
    ActionIcon,
    Collapse,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
    IconPlane,
    IconWorld,
    IconUsers,
    IconSearch,
    IconFilter,
    IconMapPin,
    IconBuildingSkyscraper,
    IconCash,
    IconExternalLink,
    IconAlertCircle,
    IconX,
} from "@tabler/icons-react";

export const AirlinesPage: React.FC = () => {
    const [airlines, setAirlines] = useState<Airline[]>([]);
    const [stats, setStats] = useState<AirlineStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [filters, setFilters] = useState<AirlineFilters>({});
    const [searchTerm, setSearchTerm] = useState("");
    const [opened, { toggle }] = useDisclosure(false);

    useEffect(() => {
        loadData();
    }, [filters]);

    const loadData = async () => {
        try {
            setLoading(true);
            setError(null);

            const [airlinesData, statsData] = await Promise.all([
                airlineApi.getAirlines(filters),
                airlineApi.getAirlineStats(),
            ]);

            const airlinesList = airlinesData?.results || airlinesData || [];
            setAirlines(airlinesList);
            setStats(statsData || null);
        } catch (err) {
            const errorMessage =
                err instanceof Error
                    ? err.message
                    : "Failed to load airlines data";
            setError(`Failed to load airlines data: ${errorMessage}`);
            setAirlines([]);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setFilters({ ...filters, search: searchTerm });
    };

    const handleFilterChange = (key: keyof AirlineFilters, value: any) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
    };

    const clearFilters = () => {
        setFilters({});
        setSearchTerm("");
    };

    const formatSalary = (min?: number, max?: number) => {
        if (!min && !max) return "Not specified";
        if (min && max)
            return `$${min.toLocaleString()} - $${max.toLocaleString()}`;
        if (min) return `From $${min.toLocaleString()}`;
        if (max) return `Up to $${max.toLocaleString()}`;
    };

    return (
        <Box>
            {/* Header Section */}
            <Box
                style={{
                    position: "relative",
                    paddingTop: rem(80),
                    paddingBottom: rem(80),
                    background:
                        "url(https://images.unsplash.com/photo-1559075452-6742d325d28b?q=80&w=2070&auto=format&fit=crop) center/cover no-repeat",
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
                    <Stack align="center" gap="md">
                        <Badge
                            variant="filled"
                            color="blue"
                            size="lg"
                            style={{ textTransform: "uppercase" }}
                        >
                            Career Opportunities
                        </Badge>
                        <Title
                            style={{
                                fontSize: rem(48),
                                fontWeight: 900,
                                color: "white",
                                textAlign: "center",
                                textShadow: "0 2px 4px rgba(0,0,0,0.3)",
                            }}
                        >
                            Aviation Careers Hub
                        </Title>
                        <Text
                            size="xl"
                            c="gray.2"
                            style={{ maxWidth: 600, textAlign: "center" }}
                        >
                            Discover opportunities with airlines worldwide.
                            Compare fleets, salaries, and requirements to find
                            your perfect match.
                        </Text>
                    </Stack>
                </Container>
            </Box>

            <Container size="xl" style={{ marginTop: rem(-40), position: 'relative', zIndex: 3 }}>
                {/* Stats Grid */}
                {stats && (
                    <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="md" mb={40}>
                        {[
                            {
                                label: "Total Airlines",
                                value: stats.total_airlines,
                                icon: IconPlane,
                                color: "blue",
                            },
                            {
                                label: "Currently Hiring",
                                value: stats.hiring_airlines,
                                icon: IconUsers,
                                color: "green",
                            },
                            {
                                label: "Countries",
                                value: stats.countries,
                                icon: IconWorld,
                                color: "cyan",
                            },
                            {
                                label: "Avg Fleet Size",
                                value: Math.round(stats.average_fleet_size || 0),
                                icon: IconBuildingSkyscraper,
                                color: "violet",
                            },
                        ].map((stat) => (
                            <Paper
                                key={stat.label}
                                p="md"
                                radius="md"
                                shadow="sm"
                                withBorder
                                style={{ display: "flex", alignItems: "center", gap: "1rem" }}
                            >
                                <ThemeIcon
                                    size={50}
                                    radius="md"
                                    variant="light"
                                    color={stat.color}
                                >
                                    <stat.icon size={28} />
                                </ThemeIcon>
                                <div>
                                    <Text size="xs" c="dimmed" fw={700} tt="uppercase">
                                        {stat.label}
                                    </Text>
                                    <Text fw={900} size="xl">
                                        {stat.value}
                                    </Text>
                                </div>
                            </Paper>
                        ))}
                    </SimpleGrid>
                )}

                {/* Filters & Search */}
                <Paper p="md" radius="md" shadow="sm" withBorder mb="xl">
                    <form onSubmit={handleSearch}>
                        <Grid align="flex-end">
                            <Grid.Col span={{ base: 12, md: 5 }}>
                                <TextInput
                                    placeholder="Search airlines, codes, or locations..."
                                    leftSection={<IconSearch size={16} />}
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    label="Search"
                                />
                            </Grid.Col>
                            <Grid.Col span={{ base: 12, md: 3 }}>
                                <Select
                                    label="Hiring Status"
                                    placeholder="All Airlines"
                                    value={filters.is_hiring?.toString() || ""}
                                    onChange={(value) =>
                                        handleFilterChange(
                                            "is_hiring",
                                            value === "true"
                                                ? true
                                                : value === "false"
                                                    ? false
                                                    : undefined
                                        )
                                    }
                                    data={[
                                        { value: "", label: "All Airlines" },
                                        { value: "true", label: "Currently Hiring" },
                                        { value: "false", label: "Not Hiring" },
                                    ]}
                                />
                            </Grid.Col>
                            <Grid.Col span={{ base: 12, md: 2 }}>
                                <Button
                                    variant="light"
                                    fullWidth
                                    onClick={toggle}
                                    leftSection={<IconFilter size={16} />}
                                >
                                    Filters
                                </Button>
                            </Grid.Col>
                            <Grid.Col span={{ base: 12, md: 2 }}>
                                <Button type="submit" fullWidth>
                                    Search
                                </Button>
                            </Grid.Col>
                        </Grid>
                    </form>

                    <Collapse in={opened}>
                        <Box pt="md">
                            <Grid>
                                <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                                    <Select
                                        label="Sort By"
                                        placeholder="Sort by..."
                                        value={filters.ordering || ""}
                                        onChange={(value) =>
                                            handleFilterChange("ordering", value)
                                        }
                                        data={[
                                            { value: "", label: "Name (A-Z)" },
                                            { value: "fleet_size", label: "Fleet Size (Asc)" },
                                            { value: "-fleet_size", label: "Fleet Size (Desc)" },
                                            { value: "destinations", label: "Destinations (Asc)" },
                                            { value: "-destinations", label: "Destinations (Desc)" },
                                            { value: "founded_year", label: "Founded Year (Asc)" },
                                            { value: "-founded_year", label: "Founded Year (Desc)" },
                                        ]}
                                    />
                                </Grid.Col>
                                <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                                    <NumberInput
                                        label="Min Fleet Size"
                                        placeholder="0"
                                        value={filters.min_fleet_size}
                                        onChange={(value) =>
                                            handleFilterChange("min_fleet_size", value)
                                        }
                                    />
                                </Grid.Col>
                                <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                                    <NumberInput
                                        label="Min Salary (USD)"
                                        placeholder="0"
                                        value={filters.min_pilot_salary}
                                        onChange={(value) =>
                                            handleFilterChange("min_pilot_salary", value)
                                        }
                                        leftSection="$"
                                    />
                                </Grid.Col>
                                <Grid.Col span={{ base: 12, sm: 6, md: 3 }} style={{ display: 'flex', alignItems: 'flex-end' }}>
                                    <Button
                                        variant="subtle"
                                        color="red"
                                        fullWidth
                                        onClick={clearFilters}
                                        leftSection={<IconX size={16} />}
                                    >
                                        Clear All Filters
                                    </Button>
                                </Grid.Col>
                            </Grid>
                        </Box>
                    </Collapse>
                </Paper>

                {/* Content Area */}
                {loading ? (
                    <Box py={100} style={{ textAlign: "center" }}>
                        <Loader size="xl" type="dots" />
                        <Text c="dimmed" mt="md">Loading airlines data...</Text>
                    </Box>
                ) : error ? (
                    <Alert icon={<IconAlertCircle size={16} />} title="Error" color="red" variant="filled">
                        {error}
                        <Button
                            variant="white"
                            color="red"
                            size="xs"
                            mt="sm"
                            onClick={loadData}
                        >
                            Retry
                        </Button>
                    </Alert>
                ) : airlines.length === 0 ? (
                    <Box py={100} style={{ textAlign: "center" }}>
                        <ThemeIcon size={80} radius="xl" color="gray" variant="light" mb="md">
                            <IconSearch size={40} />
                        </ThemeIcon>
                        <Title order={3} c="dimmed">No airlines found</Title>
                        <Text c="dimmed">Try adjusting your filters or search terms</Text>
                    </Box>
                ) : (
                    <SimpleGrid cols={{ base: 1, md: 2, lg: 3 }} spacing="lg">
                        {airlines.map((airline) => (
                            <Card
                                key={airline.id}
                                shadow="sm"
                                padding="lg"
                                radius="md"
                                withBorder
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    transition: "transform 0.2s, box-shadow 0.2s",
                                }}
                            >
                                <Card.Section p="lg" style={{ borderBottom: '1px solid var(--mantine-color-gray-2)' }}>
                                    <Group justify="space-between" align="flex-start">
                                        <Group>
                                            <Box
                                                style={{
                                                    width: 60,
                                                    height: 60,
                                                    borderRadius: 8,
                                                    background: "#f8f9fa",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    overflow: "hidden",
                                                    border: "1px solid #e9ecef",
                                                }}
                                            >
                                                {airline.logo_url ? (
                                                    <img
                                                        src={airline.logo_url}
                                                        alt={airline.name}
                                                        style={{ width: "100%", height: "100%", objectFit: "contain" }}
                                                    />
                                                ) : (
                                                    <Text size="xl">✈️</Text>
                                                )}
                                            </Box>
                                            <div>
                                                <Text fw={700} size="lg" lineClamp={1}>
                                                    {airline.name}
                                                </Text>
                                                <Group gap={6}>
                                                    <Badge size="sm" variant="outline" color="gray">
                                                        {airline.iata_code}
                                                    </Badge>
                                                    <Badge size="sm" variant="outline" color="gray">
                                                        {airline.icao_code}
                                                    </Badge>
                                                </Group>
                                            </div>
                                        </Group>
                                        {airline.is_hiring && (
                                            <Badge color="green" variant="light">
                                                HIRING
                                            </Badge>
                                        )}
                                    </Group>
                                </Card.Section>

                                <Stack gap="sm" mt="md" style={{ flex: 1 }}>
                                    <Group gap="xs">
                                        <IconMapPin size={16} style={{ color: "var(--mantine-color-dimmed)" }} />
                                        <Text size="sm" c="dimmed" lineClamp={1}>
                                            {airline.headquarters}, {airline.country_name}
                                        </Text>
                                    </Group>

                                    <SimpleGrid cols={2} spacing="xs">
                                        <Box p="xs" bg="gray.0" style={{ borderRadius: 8 }}>
                                            <Text size="xs" c="dimmed">Fleet Size</Text>
                                            <Text fw={600}>{airline.fleet_size}</Text>
                                        </Box>
                                        <Box p="xs" bg="gray.0" style={{ borderRadius: 8 }}>
                                            <Text size="xs" c="dimmed">Destinations</Text>
                                            <Text fw={600}>{airline.destinations}</Text>
                                        </Box>
                                    </SimpleGrid>

                                    <Box>
                                        <Group gap="xs" mb={4}>
                                            <IconCash size={16} style={{ color: "var(--mantine-color-dimmed)" }} />
                                            <Text size="xs" c="dimmed">Pilot Salary Range</Text>
                                        </Group>
                                        <Text fw={600} size="sm">
                                            {formatSalary(airline.pilot_salary_min, airline.pilot_salary_max)}
                                        </Text>
                                    </Box>
                                </Stack>

                                <Group mt="xl">
                                    <Button
                                        component={Link}
                                        to={`/airlines/${airline.id}`}
                                        variant="light"
                                        color="blue"
                                        fullWidth
                                    >
                                        View Details
                                    </Button>
                                    {airline.website && (
                                        <ActionIcon
                                            component="a"
                                            href={airline.website}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            variant="default"
                                            size="lg"
                                            aria-label="Visit Website"
                                        >
                                            <IconExternalLink size={18} />
                                        </ActionIcon>
                                    )}
                                </Group>
                            </Card>
                        ))}
                    </SimpleGrid>
                )}
            </Container>
        </Box>
    );
};
