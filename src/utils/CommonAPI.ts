import axios from "axios";


const CommonAPI = async({url, method, parameters, inputs} : {url: string, method: string, parameters: string, inputs?: object}) => {
    try {
        let data : object = {};
        const text : string = `${url}/${(parameters && parameters)}`;
        
        switch (method) {
            case "GET":
                const gres = await axios.get(text);
                data = gres.data;
                break;
            case "POST":
                const pres = await axios.post(text, inputs);
                data = pres.data;
                break;
            case "DELETE":
                const dres = await axios.delete(text);
                data = dres.data;
                break;
            case "EDIT":
                const eres = await axios.post(text, inputs);
                data = eres.data;
                break;
            default:
                return data;
        }
        
        return data;
    } catch (error) {
        console.log(error);
    }
}

export default CommonAPI;