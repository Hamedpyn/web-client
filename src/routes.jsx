import AllCourses from "./Pages/AllCourses/AllCourses";
import Blog from "./Pages/AllArticles/Blog";
import Categories from "./Pages/Categories/Categories";
import CoursesPage from "./Pages/CoursesPage/CoursesPage";
import Home from "./Pages/Home/Home";
import LoginPage from "./Pages/LoginPage/LoginPage";
import Terms from "./Pages/Terms/Terms";
import ArticlesPage from "./Pages/ArticlesPage/ArticlesPage";
import Search from "./Pages/Search/Search";

import CMS from "./Pages/CMS/CMS";
import Users from "./Pages/CMS/Users/Users";
import Courses from "./Pages/CMS/Courses/Courses";
import Sessions from "./Pages/CMS/Sessions/Sessions";
import Articles from "./Pages/CMS/Articles/Articles";
import DisCounts from "./Pages/CMS/DisCounts/DisCounts";
import Category from "./Pages/CMS/Categories/Categories";
import Index from "./Pages/CMS/Index/Index";
import SessionPage from "./Pages/SessionPage/SessionPage";
import Comments from "./Pages/CMS/Comments/Comments";
import CMSTickets from "./Pages/CMS/Tickets/Tickets";
import Campaign from "./Pages/CMS/Campaign/Campaign";

import UserAccount from "./Pages/userAccount/userAccount";
import UserIndex from "./Pages/userAccount/Index/Index";
import TransActions from "./Pages/userAccount/TransActions/TransActions";
import UserCourses from "./Pages/userAccount/Courses/Courses";
import Tickets from "./Pages/userAccount/Tickets/Tickets";
import AddTicket from "./Pages/userAccount/AddTicket/AddTicket";
import TicketsAnswer from "./Pages/userAccount/TicketsAnswer/TicketsAnswer";
import EditAccount from "./Pages/userAccount/EditAccount/EditAccount";
import NotFound from "./Pages/NotFound/NotFound";
 
const routes = [
    { path: "/", element: <Home /> },
    { path: "*", element: <NotFound /> },
    { path: "/course-cat/:cat", element: <Categories /> },
    { path: "/course/:id", element: <CoursesPage /> },
    { path: "/course/:id/:session", element: <SessionPage /> },
    { path: "/blog", element: <Blog /> },
    { path: "/blog/:blog", element: <ArticlesPage /> },
    { path: "/courses", element: <AllCourses /> },
    { path: "/LoginPage", element: <LoginPage /> },
    { path: "/Terms-conditions", element: <Terms /> },
    { path: "/Search/:search", element: <Search /> },
    {
        path: "/CMS/*", element: <CMS />
        , children: [
            { path: '', element: <Index /> },
            { path: "*", element: <NotFound /> },
            { path: 'Users', element: <Users /> },
            { path: 'Courses', element: <Courses /> },
            { path: 'Sessions', element: <Sessions /> },
            { path: 'Articles', element: <Articles /> },
            { path: 'DisCounts', element: <DisCounts /> },
            { path: 'Categories', element: <Category /> },
            { path: 'Comments', element: <Comments /> },
            { path: 'Tickets', element: <CMSTickets /> },
            { path: 'Campaign', element: <Campaign /> },
        ]
    },
    {
        path: "/my-account/*", element: <UserAccount />
        , children: [
            { path: '', element: <UserIndex /> },
            { path: "*", element: <NotFound /> },
            { path: 'TransActions', element: <TransActions /> },
            { path: 'Courses', element: <UserCourses /> },
            { path: 'Tickets', element: <Tickets /> },
            { path: 'Tickets/:id', element: <TicketsAnswer /> },
            { path: 'Add-Tickets', element: <AddTicket /> },
            { path: 'Edit-Account', element: <EditAccount /> },
        ]
    },
]

export default routes