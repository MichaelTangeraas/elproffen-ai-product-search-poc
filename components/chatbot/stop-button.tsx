interface StopButtonProps {
  onStop: (e: React.MouseEvent) => void;
}

export const StopButton = ({ onStop }: StopButtonProps) => (
  <button
    onClick={onStop}
    type="button"
    className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
  >
    Stop Generating
  </button>
);
