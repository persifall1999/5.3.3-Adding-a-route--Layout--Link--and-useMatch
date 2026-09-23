import { Box, Container, Group, Text, useMantineTheme } from "@mantine/core";
import { NavLink } from "react-router-dom";
import { ProfileIcon } from "../../components/SvgIcons";
import styles from './Header.module.scss';

export const Header = () => {
    const theme = useMantineTheme();
    return (
        <Box className={styles.headerBox}>
            <Container fluid p={24} className={styles.headerContainer}>
                <Group justify="space-between" align="center" wrap="nowrap">

                    <Group gap={10} className={styles.logoGroup}>
                        <img
                            src={`${import.meta.env.BASE_URL}logo.png`}
                            alt="hh logo"
                            className={styles.logoImg}
                        />
                        <Text fw={700} size="16px" style={{ color: theme.colors.black1[0] }}>
                            .FrontEnd
                        </Text>
                    </Group>

                    <Group gap={24} justify="center" className={styles.groupPages}>

                        <NavLink to="/vacancies" className={styles.navLinkWrapper}>
                            {({ isActive }) => (
                                <Group gap={8} className={styles.pageItem}>
                                    <Text fw={500} className={styles.vacancyText}>
                                        Вакансии FE
                                    </Text>
                                    {isActive && <Box className={styles.pageIndicator} />}
                                </Group>
                            )}
                        </NavLink>

                        <NavLink to="/about" className={styles.navLinkWrapper}>
                            {({ isActive }) => (
                                <Group gap={8} className={styles.pageItem}>
                                    <ProfileIcon size={18} />
                                    <Text fw={500} className={styles.aboutText}>
                                        Обо мне
                                    </Text>
                                    {isActive && <Box className={styles.pageIndicator} />}
                                </Group>
                            )}
                        </NavLink>

                    </Group>

                    <Box className={styles.plug} />

                </Group>
            </Container>
        </Box>
    );
};
