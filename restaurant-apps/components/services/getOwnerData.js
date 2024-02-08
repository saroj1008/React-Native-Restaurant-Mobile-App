import axios from "./axios";

// const URL = "http://localhost:4000/owners/6467cf154362eecd9bf9de98";
const getOwnerData = async (currentOwnerId) => {
    try {
        const URL = `http://localhost:4000/owners/${currentOwnerId}`;
        console.log('finalurl testing',URL);
        const response = await axios.get(URL);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export default getOwnerData;
