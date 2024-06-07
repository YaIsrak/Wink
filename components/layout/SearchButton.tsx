import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";

export default function SearchButton() {
  return (
    <Button
      variant={"outline"}
      className="hidden w-12 gap-2 rounded-2xl text-muted-foreground shadow-none md:flex md:w-96"
      onClick={() => {
        //   TODO: search
      }}
    >
      <MagnifyingGlassIcon className="h-5 w-5" />
      <span className="hidden md:block">Search</span>
    </Button>
  );
}
