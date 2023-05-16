import {z} from 'zod';

const schema  = z.object({
    DB_CONNECTION_STRING: z.string().min(1),
    TIMEOUT: z.coerce.number().positive()
})

type ENV = z.infer<typeof schema>;

declare global{
    var ENV: ENV;
    interface Window{
        ENV: ENV;
    }
}

export function getEnv() {
    return schema.parse(process.env)
}