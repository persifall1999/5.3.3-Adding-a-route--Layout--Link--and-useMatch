import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store"
import { jobsFetch, setCurrentPage, setCity } from "../../store/jobsSlice";
import { Center, Container, Grid, Loader, Box, Pagination, Stack, Text, useMantineTheme } from "@mantine/core";
import { Search } from "../../components/Search/Search";
import { Skills } from "../../components/Skills/Skills";
import { TownTabs } from "../../components/Towns/TownTabs";
import { Vacancy } from "../../components/Vacancy/Vacancy";
import styles from './ListVacancy.module.scss'
import { useSearchParams } from "react-router-dom";

export const ListVacancy = () => {
    const dispatch = useAppDispatch();
    const theme = useMantineTheme();
    const [, setSearchParams] = useSearchParams();

    const { list, pagination, loading, error, currentPage, search, city, skills } = useAppSelector((state) => state.jobs);

    useEffect(() => {
        if (location.pathname.endsWith('/petersburg')) {
            dispatch(setCity('Санкт-Петербург'));
        } else {
            dispatch(setCity('Москва'));
        }
    }, [location.pathname, dispatch]);

    useEffect(() => {
        const params: Record<string, string> = {};
        if (search.trim()) params.search = search.trim();
        
        if (skills.length > 0) {
            params.skills = encodeURIComponent(skills.join(","));
        }
        if (currentPage > 1) params.page = currentPage.toString();

        setSearchParams(params);
        dispatch(jobsFetch());
    }, [dispatch, currentPage, search, city, skills, setSearchParams]);

    const handlePageChange = (page: number) => {
        dispatch(setCurrentPage(page));
    };

    return (
        <Box className={styles.listBox} >

            <Box className={styles.titleSearch} >

                <Container className={styles.upperContainer} p={{ base: 'md', md: 'xl' }}>
                    <Box className={styles.upperBox} >
                        <Box className={styles.titleBox} > 
                            <Text
                              size="26px"
                              fw={700}
                              className={styles.titleText}
                              style={{
                                  color: theme.colors.black1[0],
                              }}
                            >
                                Список вакансий
                            </Text>
                            <Text
                              size="20px"
                              fw={500}
                              className={styles.underTitleText}
                            >
                                по профессии Frontend-разработчик
                            </Text>
                        </Box>

                        <Box className={styles.inputBox} >
                            <Search />
                        </Box>
                    </Box>
                </Container>
            </Box>

            <Container className={styles.lowerContainer} p={{ base: 'md', md: 'xl' }}>
                <Grid gap="24px">

                    <Grid.Col span={{base: 12, md: 4, lg: 4}}>
                        <Stack gap="12px">
                            <Skills />
                        </Stack>
                    </Grid.Col>

                    <Grid.Col span={{base: 12, md: 8, lg: 8}}>
                        <Stack gap="md">

                            <TownTabs />
                            
                            {error && (
                                <Center className={styles.centerError} >
                                    <Text className={styles.textError} >An error occurred: {error}</Text>
                                </Center>
                            )}

                            {loading && (
                                <Center className={styles.centerLoading} >
                                    <Loader color="indigo" size="md"></Loader>
                                </Center>
                            )}

                            <Stack gap="md">
                                {list.length > 0 ? (list.map((vacancy) =>
                                    <Vacancy key={vacancy.id} vacancy={vacancy}/>
                                )) : (
                                    !loading && (
                                    <Text className={styles.noFindVacancy} size="24px">
                                        Вакансий по вашему запросу не найдено.
                                    </Text>
                                    )
                                )}
                            </Stack>

                            {Boolean(pagination) && pagination!.totalPages > 1 && !loading && (
                                <Center mt="xl">
                                    <Pagination
                                      value={currentPage}
                                      onChange={handlePageChange}
                                      total={pagination!.totalPages} 
                                      radius="sm"
                                      withEdges
                                      styles={{
                                        control: {
                                          border: '1px solid #0F0F1015',
                                          backgroundColor: '#FFFFFF',
                                          fontWeight: 500,
                                          width: '36px',
                                          height: '36px',
                                          color: theme.colors.black1[0],
                                        },
                                        dots: {
                                          color: theme.colors.black1[0],
                                          transform: 'translateY(7px)'
                                        }
                                      }}
                                    />
                                </Center>
                            )}
                        </Stack>
                    </Grid.Col>
                </Grid>
            </Container>

        </Box>
    );
};