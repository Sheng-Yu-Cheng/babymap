import { CalendarClock, MapPin } from "lucide-react";

import { bookingServiceTypes } from "@/data/babymap";
import { cn } from "@/lib/utils";

type BookingControlsProps = {
  location: string;
  onLocationChange: (value: string) => void;
  time: string;
  onTimeChange: (value: string) => void;
  serviceType: string;
  onServiceTypeChange: (value: string) => void;
  childAge: string;
  onChildAgeChange: (value: string) => void;
};

const childAgeOptions = ["0-1 歲", "1-3 歲", "3-6 歲"];

export function BookingControls({
  location,
  onLocationChange,
  time,
  onTimeChange,
  serviceType,
  onServiceTypeChange,
  childAge,
  onChildAgeChange,
}: BookingControlsProps) {
  return (
    <div className="rounded-[1.75rem] border border-border bg-white p-5 shadow-sm">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="text-sm font-medium">
          地點
          <span className="mt-2 flex items-center gap-2 rounded-2xl border border-border px-4 py-3">
            <MapPin className="h-4 w-4 text-primary" aria-hidden="true" />
            <input
              value={location}
              onChange={(event) => onLocationChange(event.target.value)}
              className="min-w-0 flex-1 outline-none"
            />
          </span>
        </label>
        <label className="text-sm font-medium">
          時間
          <span className="mt-2 flex items-center gap-2 rounded-2xl border border-border px-4 py-3">
            <CalendarClock className="h-4 w-4 text-primary" aria-hidden="true" />
            <input
              value={time}
              onChange={(event) => onTimeChange(event.target.value)}
              className="min-w-0 flex-1 outline-none"
            />
          </span>
        </label>
      </div>

      <div className="mt-5">
        <p className="text-sm font-medium">服務類型</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {bookingServiceTypes.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => onServiceTypeChange(type)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-medium transition",
                serviceType === type
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-white text-foreground hover:border-primary",
              )}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5">
        <p className="text-sm font-medium">孩子年齡</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {childAgeOptions.map((age) => (
            <button
              key={age}
              type="button"
              onClick={() => onChildAgeChange(age)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-medium transition",
                childAge === age
                  ? "border-secondary bg-secondary text-secondary-foreground"
                  : "border-border bg-white text-foreground hover:border-secondary",
              )}
            >
              {age}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
