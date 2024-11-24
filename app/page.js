"use client"
import { api } from "@/convex/_generated/api";
import { UserButton, useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { useEffect } from "react";

export default function Home() {
  const {user} = useUser()
  const createUser = useMutation(api.user.createUser)

  useEffect(()=>{
    user && CheckUser()
  }, [user])

  const CheckUser = async () =>{
    const result = await createUser({
      userName: user?.fullName,
      email: user?.primaryEmailAddress?.emailAddress,
      imageUrl: user?.imageUrl,
    })
  }

  return (
    <div>
      AI PDF NOT TAKER
      <UserButton/>
    </div>
  );
}
