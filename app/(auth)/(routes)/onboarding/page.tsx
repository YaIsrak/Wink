import OnBoardingForm from "@/components/form/onBoardingForm"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { currentProfile } from "@/lib/current-profile"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"



export default async function OnBoardingPage() {
    const user = await currentUser()

    if (!user) {
        return redirect('/sign-in')
    }

    const profile = await currentProfile()

    if (profile) {
        return redirect('/')
    }

    return (
        <div className="w-full container mx-auto py-4 space-y-6 max-w-screen-sm">
            {/* Heading */}
            <div>
                <h2 className="text-base font-semibold leading-7 text-gray-900">Create Profile</h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                    This information will be displayed publicly so be careful what you share.
                </p>

                <div className="mt-6">
                    <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">
                        Photo
                    </label>
                    <div className="mt-2 flex items-center gap-x-3">
                        <Avatar className="h-24 w-24">
                            <AvatarImage src={user?.imageUrl} />
                        </Avatar>
                    </div>
                </div>
            </div>

            {/* Form */}
            <OnBoardingForm />
        </div>
    )
}