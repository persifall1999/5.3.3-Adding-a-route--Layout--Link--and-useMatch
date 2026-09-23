import { Tabs } from "@mantine/core"
import { useLocation, useNavigate } from "react-router-dom";
import styles from './TownTabs.module.scss'; 

export const TownTabs = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const getCurrentTab = () => {
        if (location.pathname.endsWith('/petersburg')) return 'petersburg';
        return 'moscow';
    };

    const handleTabChange = (value: string | null) => {
        const searchString = location.search; 
        
        if (value === 'petersburg') {
            navigate(`/vacancies/petersburg${searchString}`);
        } else {
            navigate(`/vacancies/moscow${searchString}`);
        }
    };

    return (
        <Tabs 
            value={getCurrentTab()} 
            onChange={handleTabChange}
            variant="unstyled"
            classNames={{
                root: styles.tabsRoot,
                list: styles.tabsList,
                tab: styles.tabsControl
            }}
        >
            <Tabs.List>
                <Tabs.Tab value="moscow">Москва</Tabs.Tab>
                <Tabs.Tab value="petersburg">Санкт-Петербург</Tabs.Tab>
            </Tabs.List>
        </Tabs>
    );
};