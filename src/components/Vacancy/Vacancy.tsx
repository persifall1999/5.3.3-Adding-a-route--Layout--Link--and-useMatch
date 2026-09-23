import { Badge, Button, Group, Paper, Stack, Text, useMantineTheme } from "@mantine/core"
import type { ITVacancy } from "../../store/jobsSlice";
import styles from './Vacancy.module.scss'
import { Link } from "react-router-dom";


interface VacancyProps {
    vacancy: ITVacancy;
}

const spaceLabels: Record<ITVacancy['space'], string> = {
    office: 'Офис',
    remote: 'Можно удалённо',
    hybrid: 'Гибрид',
};

export const Vacancy = ({vacancy}: VacancyProps) => {
    const theme = useMantineTheme();

    const formatSalary = (salaryStr: string) => {
        const num = parseInt(salaryStr, 10);
        if (isNaN(num)) return 'Зарплата не указана'
        return `${num.toLocaleString('ru-RU')} ₽`
    }

    return (
        <Paper className={styles.paperVacancy} >
            
            <Stack gap={6}>

                <Text size="20px" fw={600} className={styles.vacancyText} style={{
                    color: theme.colors.indigo[6]
                }} component={Link} to={`/vacancies/${vacancy.id}`} >
                    {vacancy.name}
                </Text>

                <Group gap={16} className={styles.experiencePrice} >
                    <Text fw={400} size="16px" style={{color: theme.colors.black1[0]}}>
                        {formatSalary(vacancy.salary)}
                    </Text>
                    <Text size="14px" fw={400} className={styles.vacancyExperience} >
                        Опыт {vacancy.experience}
                    </Text>
                </Group>

                <Text size="14px" fw={400} className={styles.companyVacancy} >
                    {vacancy.company_name}
                </Text>

                <Group mt={6}>
                    <Badge variant="filled" size="xs" radius="xs" className={styles.vacancySpace} style={{
                        backgroundColor: theme.colors.indigo[6],
                    }}>
                        {spaceLabels[vacancy.space] || vacancy.space}
                    </Badge>
                </Group>

                <Text size="16px" fw={400} className={styles.vacancyCity} >
                    {vacancy.city}
                </Text>

                <Group mt="md">
                    <Button component={Link} to={`/vacancies/${vacancy.id}`} radius="sm" size="sm" className={styles.buttonWatchVacancy} style={{
                        backgroundColor: theme.colors.black1[0],
                    }} >
                        Смотреть вакансию
                    </Button>
                </Group>
            </Stack>
        </Paper>
    )
}