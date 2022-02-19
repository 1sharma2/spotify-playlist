import {setupInterceptorsTo} from "../interceptors/HttpInterceptor";
import axios from "axios";
setupInterceptorsTo(axios);
export default axios;