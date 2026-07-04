import { Suspense } from "react"
import Loader from "../components/loader/Loader"


export const WithSuspense = (Component) => {
    return (
        <Suspense fallback={<Loader />}>
            <Component />
        </Suspense>
    )
}
