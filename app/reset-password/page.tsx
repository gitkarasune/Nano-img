import { Suspense } from "react"
import { ResetPasswordForm } from "@/components/auth/reset-password-form"

export default function LoginPage() {
  return (
    <div className="bg-white dark:bg-black">
      <Suspense fallback={<div>        <div className="w-6 h-6 rounded-full border-4 border-primary border-t-blue-700 animate-spin" />
      </div>}>
        <ResetPasswordForm />
      </Suspense>
    </div>
  )
}
