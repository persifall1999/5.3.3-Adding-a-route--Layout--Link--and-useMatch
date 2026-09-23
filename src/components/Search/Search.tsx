import { Button, Group, TextInput, useMantineTheme } from "@mantine/core"
import { useAppDispatch, useAppSelector } from "../../store/store";
import { applySearch, setSearchInputValue } from "../../store/jobsSlice";
import { SearchIcon } from "../SvgIcons";
import styles from './Search.module.scss'

export const Search = () => {
    const theme = useMantineTheme();
    const dispatch = useAppDispatch();

    const searchInputValue = useAppSelector((state) => state.jobs.searchInputValue);

    const handleSearchClick = () => {
        dispatch(applySearch());
    };

    return (
        <Group gap={10} className={styles.groupSearch}>

            <TextInput 
                placeholder="Должность или название компании"
                value={searchInputValue}
                onChange={(e) => dispatch(setSearchInputValue(e.target.value))}
                leftSection={<SearchIcon size={16}/>}
                size="md"
                className={styles.searchInput}
                styles={{
                    input: {
                        className: styles.customInput,
                        color: theme.colors.black1[0],
                        backgroundColor: theme.colors.appBackground[0],
                    }
                }}
            />

            <Button size="md" radius="sm" onClick={handleSearchClick}  className={styles.searchButton} styles={{
                root: {
                    className: styles.buttonRoot,
                    fontWeight: 400,
                    backgroundColor: theme.colors.indigo[6],
                }
            }}>
                Найти
            </Button>
        </Group>
    )
}