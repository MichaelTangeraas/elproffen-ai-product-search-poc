import { Button } from "../ui/button";

interface StopButtonProps {
  onStop: (e: React.MouseEvent) => void;
}

export const StopButton = ({ onStop }: StopButtonProps) => (
  <Button
    onClick={onStop}
    type="button"
    className="w-full hover:opacity-80 text-white font-medium py-2 px-4 rounded-lg transition-colors"
  >
    Stop Generating
  </Button>
);
