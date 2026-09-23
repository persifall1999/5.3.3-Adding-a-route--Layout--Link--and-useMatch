import { Container, Paper, Stack, Text, useMantineTheme } from "@mantine/core";
import styles from "./About.module.scss";

export const About = () => {
    const theme = useMantineTheme();

    return (
        <Container p={24} className={styles.aboutContainer}>
            <Paper p={24} radius={12} className={styles.aboutPaper}>
                <Stack gap="md"> 
                    <Text 
                        size="26px" 
                        fw={700} 
                        style={{ color: theme.colors.black1[0] }}
                    >
                        Дмитрий Волков
                    </Text>
                    <Text 
                        size="16px" 
                        fw={400} 
                        className={styles.aboutText}
                        style={{ color: theme.colors.black1[0] }}
                    >
                        Привет! Я - Frontend-разработчик. Пишу приложения на React + TypeScript + Redux Toolkit.
                    </Text>
                </Stack>
            </Paper>
        </Container>
    );
};