import { Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "../modules/Layout/Layout";
import { ListVacancy } from "../modules/ListVacancy/ListVacancy";
import { VacancyDetail } from "../components/VacancyDetail/VacancyDetail";
import { About } from "../components/About/About";
import { NotFound } from "../components/NotFound/NotFound";

export const MainPage = () => {
    return (
        <Routes>
            
            <Route path="/" element={<Layout />}>

                <Route index element={<Navigate to="/vacancies" replace />} />
                
                <Route path="vacancies">
                    <Route index element={<ListVacancy />} />
                    <Route path="moscow" element={<ListVacancy />} />
                    <Route path="petersburg" element={<ListVacancy />} />
                    <Route path=":id" element={<VacancyDetail />} />
                </Route>

                <Route path="about" element={<About />} />

                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    );
};