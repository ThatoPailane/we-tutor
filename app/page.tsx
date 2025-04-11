import { useAuth } from "@/lib/useAuth";

export default function Home() {
  const user = useAuth()
  const router = useRouter()

  if (user) {

  }
  return (
    <>

    </>
  );
}
