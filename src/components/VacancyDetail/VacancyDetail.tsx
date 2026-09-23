import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { singleVacancyFetch } from "../../store/jobsSlice";
import { Container, Paper, Stack, Text, Group, Badge, Loader, Center, Button, useMantineTheme } from "@mantine/core";
import styles from "./VacancyDetail.module.scss"; 

const spaceLabels: Record<string, string> = {
    office: 'Офис',
    remote: 'Можно удалённо',
    hybrid: 'Гибрид',
};

export const VacancyDetail = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const theme = useMantineTheme();
    
    const { currentVacancy, vacancyLoading, vacancyError } = useAppSelector((state) => state.jobs);

    useEffect(() => {
        if (id) {
            dispatch(singleVacancyFetch(id));
        }
    }, [dispatch, id]);

    if (vacancyLoading) {
        return (
            <Center style={{ height: '60vh' }}>
                <Loader color="indigo" size="md" />
            </Center>
        );
    }

    if (vacancyError || !currentVacancy) {
        return (
            <Container p={24}>
                <Paper p={24} radius={12} withBorder style={{ backgroundColor: '#FFFFFF' }}>
                    <Stack align="center" gap="md">
                        <Text size="lg" fw={600} c="red">
                            {vacancyError || "Вакансия не найдена"}
                        </Text>
                        <Button component={Link} to="/vacancies" variant="light" color="indigo">
                            Вернуться к списку вакансий
                        </Button>
                    </Stack>
                </Paper>
            </Container>
        );
    }

    const formatSalary = (salaryStr: string) => {
        const num = parseInt(salaryStr, 10);
        if (isNaN(num)) return 'Зарплата не указана';
        return `${num.toLocaleString('ru-RU')} ₽`;
    };

    return (
        <Container p={24} style={{ maxWidth: '800px', margin: '0 auto' }}>
            <Stack gap="md">
                
                <Paper className={styles.paperVacancy}>
                    <Stack gap={6}>
                        <Text size="20px" fw={600} className={styles.vacancyText} style={{ color: theme.colors.indigo[6] }}>
                            {currentVacancy.name}
                        </Text>

                        <Group gap={16} className={styles.experiencePrice}>
                            <Text fw={400} size="16px" style={{ color: theme.colors.black1[0] }}>
                                {formatSalary(currentVacancy.salary)}
                            </Text>
                            <Text size="14px" fw={400} className={styles.vacancyExperience}>
                                Опыт {currentVacancy.experience}
                            </Text>
                        </Group>

                        <Text size="14px" fw={400} className={styles.companyVacancy}>
                            {currentVacancy.company_name}
                        </Text>

                        <Group mt={6}>
                            <Badge 
                                variant="filled" 
                                size="xs" 
                                radius="xs" 
                                className={styles.vacancySpace} 
                                style={{ backgroundColor: theme.colors.indigo[6] }}
                            >
                                {spaceLabels[currentVacancy.space] || currentVacancy.space}
                            </Badge>
                        </Group>

                        <Text size="16px" fw={400} className={styles.vacancyCity}>
                            {currentVacancy.city}
                        </Text>
                    </Stack>
                </Paper>

                <Paper className={styles.paperDescription}>
                    <Stack gap="xl">
                        
                        {currentVacancy.about_company && (
                            <Stack gap={12}>
                                <Text size="20px" fw={600} className={styles.sectionTitle}>
                                    Компания
                                </Text>
                                <Text size="16px" fw={400} className={styles.sectionText}>
                                    {currentVacancy.about_company}
                                </Text>
                            </Stack>
                        )}

                        {currentVacancy.description && (
                            <Stack gap={12}>
                                <Text size="16px" fw={600} className={styles.sectionTitle}>
                                    О вакансии:
                                </Text>
                                <Text size="16px" fw={400} className={styles.sectionText}>
                                    {currentVacancy.description}
                                </Text>
                            </Stack>
                        )}
                        
                    </Stack>
                </Paper>

            </Stack>
        </Container>
    );
};