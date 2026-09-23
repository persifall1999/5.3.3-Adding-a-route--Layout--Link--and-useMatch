import { Button, Container, Group, Paper, Stack, Text, useMantineTheme } from "@mantine/core";
import { Link } from "react-router-dom";
import styles from "./NotFound.module.scss";

export const NotFound = () => {
    const theme = useMantineTheme();

    return (
        <Container p={24} className={styles.containerNotFound}>
            <Paper p={30} radius={12} className={styles.paperNotFound} >
                <Stack gap="xl">
                    <Group justify="space-between" align="center" wrap="nowrap">
                        <Stack gap={10}>
                            <Text 
                                size="34px" 
                                fw={700} 
                                className={styles.titleText}
                                style={{ color: theme.colors.black1[0] }}
                            >
                                Упс! Такой страницы<br />не существует
                            </Text>
                            <Text size="18px" fw={400} style={{ color: theme.colors.black1[0] }}>
                                Давайте перейдём к началу.
                            </Text>
                        </Stack>

                        <Button 
                            component={Link} 
                            to="/vacancies" 
                            size="md" 
                            radius="sm"
                            className={styles.buttonHome}
                            style={{ backgroundColor: theme.colors.indigo[6] }}
                        >
                            На главную
                        </Button>
                    </Group>

                    <div className={styles.gifWrapper}>
                        <img 
                            src={`${import.meta.env.BASE_URL}sad-cat.gif`}
                            alt="Печальный кот плачет" 
                            className={styles.gifImg}
                        />
                    </div>
                </Stack>
            </Paper>
        </Container>
    );
};