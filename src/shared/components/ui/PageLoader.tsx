import { Spinner } from "@/shared/components/ui/spinner"


const PageLoader = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Spinner className="stroke-[0.2] stroke-blue-950 size-42"/>
    </div>
  )
}

export { PageLoader }