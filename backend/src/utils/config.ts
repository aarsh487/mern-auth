const getEnv = (key: string, defaultValue?: string): string => {
    const value = process.env[key] || defaultValue;
    if(value === undefined){
        throw Error("Missing String enviroment variable for" + key);
    }

    return value;
};


export const MONGO_URI = getEnv("MONGO_URI");
export const PORT = getEnv("PORT");
export const JWT_SECRET = getEnv("JWT_SECRET");
export const MAILTRAP_TOKEN = getEnv("MAILTRAP_TOKEN");