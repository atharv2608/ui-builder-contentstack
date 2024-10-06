import { Save } from "lucide-react"
import { Button } from "../ui/button"

function SaveButton() {
  return (
   <Button variant={"outline"} className="gap-2">
    <Save className="h-4 w-4" /> Save
   </Button>
  )
}

export default SaveButton