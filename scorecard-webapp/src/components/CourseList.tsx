type CourseListProps = {
  onSelectDemoGolfClub: () => void;
  onSelectDemoChampionship: () => void;
};

export default function CourseList({
  onSelectDemoGolfClub,
  onSelectDemoChampionship,
}: CourseListProps) {
  return (
    <div className="space-y-3">
      <button
        onClick={onSelectDemoGolfClub}
        className="w-full cursor-pointer rounded-lg border-2 border-blue-500 bg-blue-500 px-4 py-3 font-medium text-white transition-colors hover:border-blue-600 hover:bg-blue-600"
      >
        Demo Golf Club (9 Holes)
      </button>
      <button
        onClick={onSelectDemoChampionship}
        className="w-full cursor-pointer rounded-lg border-2 border-green-500 bg-green-500 px-4 py-3 font-medium text-white transition-colors hover:border-green-600 hover:bg-green-600"
      >
        Demo Championship (18 Holes)
      </button>
    </div>
  );
}
