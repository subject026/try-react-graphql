import { useDispatch, useSelector } from "react-redux";

// These are the functions that can be imported to interact with the store

export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;
