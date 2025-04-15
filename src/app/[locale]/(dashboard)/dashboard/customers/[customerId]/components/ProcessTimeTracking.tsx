import { ProcessTimeOriginal } from "@/entities/dashboard";

interface ProcessTimeTrackingProps {
  processTime: ProcessTimeOriginal;
}

export default function ProcessTimeTracking({
  processTime,
}: ProcessTimeTrackingProps) {
  const processTimes = [
    { name: "Data Entry", ...processTime.dataEntry },
    { name: "Expert Verification", ...processTime.expertVerification },
    { name: "Supervisor Approval", ...processTime.supervisorApproval },
  ];

  return (
    <div className="overflow-hidden rounded-lg">
      {/* Header Row */}
      <div className="grid grid-cols-4 bg-[#f2f7f5] p-4 font-medium text-gray-700">
        <div>Stage</div>
        <div>Start Time</div>
        <div>End Time</div>
        <div>Time Taken</div>
      </div>

      {/* Data Rows */}
      {processTimes.map((process, index) => (
        <div
          key={index}
          className={`grid grid-cols-4 p-4 border-t ${
            index % 2 === 0 ? "bg-white" : "bg-[#f9fafb]"
          }`}
        >
          <div className="font-medium text-gray-800">{process.name}</div>
          <div className="text-gray-600">{process.start}</div>
          <div className="text-gray-600">{process.end}</div>
          <div className="text-gray-800">{process.total}</div>
        </div>
      ))}

      {/* Summary Row */}
      <div className="grid grid-cols-4 p-4 bg-[#fff8f0] border-t">
        <div className="font-medium text-gray-700">Total Verification Time</div>
        <div></div>
        <div></div>
        <div className="font-medium text-amber-500">
          {processTime.totalVerification}
        </div>
      </div>
    </div>
  );
}
