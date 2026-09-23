import { Outlet } from "react-router-dom";
import { Box } from "@mantine/core";
import { Header } from "../Header/Header";

export const Layout = () => {
    return (
        <>
            <Header />
            <Box style={{ minHeight: 'calc(100vh - 80px)', paddingBottom: '40px' }}>
                <Outlet />
            </Box>
        </>
    );
};