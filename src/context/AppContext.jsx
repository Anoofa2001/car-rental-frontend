
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL || "http://localhost:3000";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const navigate = useNavigate();
    // Set currency to Dirhams (AED)
    const currency = 'AED ';

    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);
    const [isOwner, setIsOwner] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [pickupDate, setPickupDate] = useState('');
    const [returnDate, setReturnDate] = useState('');

    const [cars, setCars] = useState([]);

    //functions to check if user is logged in 
    const fetchUser = async () => {
        try {
            const { data } = await axios.get("/api/user/data")
            if (data.success) {
                setUser(data.user);
                setIsOwner(data.user.role === "owner");
            } else {
              navigate("/");
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
            toast.error("Failed to fetch user data. Please try again.");
        }
    };
    // function to fetch all cars from the server
    const fetchCars = async () => {
        try {
            const { data } = await axios.get("/api/user/cars");
            data.success ? setCars(data.cars) : toast.error("Failed to fetch cars. Please try again.");
        } catch (error) {
            console.error("Error fetching cars:", error);
            toast.error("Failed to fetch cars. Please try again.");
        }
    };
    //  function to handle user logout
    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
        setIsOwner(false);
        axios.defaults.headers.common["Authorization"] = "";
        toast.success("Logged out successfully.");
        
    }



    //  useEffect to retrieve the token from localStorage 
    useEffect(() => {
       const token = localStorage.getItem("token");
       setToken(token);
       fetchCars();
    }, []);

    // useEffect to fetch user data when token is available
    useEffect(() => {
        if (token) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            fetchUser();
        }
    }, [token]);


  const value = {
    navigate, currency ,axios, user, setUser,token, setToken, isOwner, setIsOwner, fetchUser,showLogin, setShowLogin,fetchCars, pickupDate, setPickupDate, returnDate, setReturnDate, cars, setCars, logout
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};
