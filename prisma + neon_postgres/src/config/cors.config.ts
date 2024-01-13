
import { CorsOptions } from "@nestjs/common/interfaces/external/cors-options.interface"

const frontEndUrls = [
    'http://localhost:5173',
    'http://localhost:3000',
]

export const corsOptions: CorsOptions = {
    origin: (origin, callback) => {
        if (frontEndUrls.includes(origin) || !origin) {
            callback(null, true)
        } else {
            callback(new Error(`${origin} blocked by CORS policy`))
        }
    },
    credentials: true,
    optionsSuccessStatus: 200,
    methods: ['get', 'post', 'patch', 'delete',],
}