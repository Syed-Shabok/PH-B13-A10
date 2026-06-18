import { Button } from "@heroui/react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col gap-2 justify-center items-center bg-green-50">
      <h2 className="text-3xl text-green-500 font-semibold">
        Project Initialized.
      </h2>
      <Button
        variant="secondary"
        className="border-2 bg-green-100 border-green-300 text-green-600 hover:bg-green-200"
      >
        Click Me!
      </Button>
    </div>
  );
}
