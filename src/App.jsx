import { useRoutes } from 'react-router-dom'
import './App.css'
import routes from './routes'
import SabzLearnContext from './Contexts/SabzlearnContext'
import { Suspense, useCallback, useEffect, useState } from 'react'
import ScrollToTop from "./Components/ScrollToTop/ScrollToTop"
import CircleSpinner from './Components/CircleSpinner/CircleSpinner'
import 'react-toastify/dist/ReactToastify.css';
import 'ckeditor5/ckeditor5.css';

function App() {
  const [isSideBar, setIsSideBar] = useState(false)
  const [isBoxHref, setIsBoxHref] = useState(true)
  const [courses, setCourses] = useState([]);
  const [isValue, setIsValue] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    fetch('https://educational-web-site.vercel.app/v1/courses',{
      method:"GET",
      credentials: 'include'
    })
      .then(res => res.json())
      .then(result => setCourses(result));
  }, []);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfos, setUserInfos] = useState({});
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [openUserMenu, setOpenUserMenu] = useState(false)


  // Logout function
  const logout = useCallback(() => {
    setToken(null);
    setUserInfos({});
    setIsLoggedIn(false);
    localStorage.removeItem('user');
  }, []);
  useEffect(() => {
    const fetchUserData = async () => {
      if (token) {
        try {
          const res = await fetch('https://educational-web-site.vercel.app/v1/auth/me', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            credentials: "include"
          });

          if (!res.ok) {
            throw new Error('Failed to authenticate user');
          }

          const userData = await res.json();
          setIsLoggedIn(true);
          setUserInfos(userData);
        } catch (err) {
          console.error(err);
          setIsLoggedIn(false);
        } finally {
          setIsLoading(false);
        }
      } else {
        // Clear user data when token is not present
        setIsLoggedIn(false);
        setUserInfos(null);
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [token]); // Add `token` as a dependency

  // Login function
  const login = useCallback((token, userInfos) => {
    setToken(token);
    setIsLoggedIn(true);
    setUserInfos(userInfos);

    // Persist token and user information in localStorage
    localStorage.setItem('user', JSON.stringify({ token }));
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Initialize token and user state on app load
  useEffect(() => {
    const localStorageData = JSON.parse(localStorage.getItem('user'));
    if (localStorageData?.token) {
      setToken(localStorageData.token); // This triggers the token-dependent useEffect
    } else {
      setIsLoading(false); // No user in localStorage
    }
  }, []);


  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark'); // Save preference to localStorage
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light'); // Save preference to localStorage
    }
  }, [darkMode]);

  const router = useRoutes(routes)

  if (isLoading) {
    // Render a loading spinner or animation
    return (
      <div className="flex items-center justify-center h-screen bg-[#242A38]">
        <CircleSpinner />
      </div>
    )
  }


  return (
    <SabzLearnContext.Provider
      value={{
        setIsSideBar,
        isSideBar,
        isBoxHref,
        setIsBoxHref,
        courses,
        isLoggedIn,
        userInfos,
        token,
        login,
        logout,
        isValue,
        setIsValue,
        openUserMenu,
        setOpenUserMenu,
        darkMode,
        setDarkMode
      }}
    >
      <ScrollToTop />
      <Suspense fallback={
          <div className="flex items-center justify-center h-screen bg-[#242A38]">
            <CircleSpinner />
          </div>
        } >
      <div className="flex flex-col items-center bg-[#F3F4F6] dark:bg-[#111827]">
        {router}
      </div>
        </Suspense>
    </SabzLearnContext.Provider>
  )
}

export default App
