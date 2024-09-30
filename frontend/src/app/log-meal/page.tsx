'use client'

import { FoodList } from "@/components/FoodList"
import WithAuth from '@/components/auth/WithAuth'

const LogMealPage = () : JSX.Element => {
    return (
        <div>
            <h1>Log meal</h1>
            <FoodList />
        </div>
    )
}

export default WithAuth(LogMealPage)