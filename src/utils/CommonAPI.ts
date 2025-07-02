import axios from "axios";

const CommonAPI =async({url, method, parameters, inputs} : {url: string, method: string, parameters: string, inputs?: object}) => {
    
    let data : object = {};
    const text : string = `${url}/${(parameters && parameters)}`;
    switch (method) {
        case "GET":
            const res = await axios.get(text);
            data = res.data;
            break;
        case "POST":
            const response = await axios.post(text, inputs);
            data = response.data;
            break;
        default:
            return data;
    }
    return data;
}

export default CommonAPI;