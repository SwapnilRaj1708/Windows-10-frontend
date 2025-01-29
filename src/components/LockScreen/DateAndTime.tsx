import React from "react";

const DateAndTime = () => {
  const [date, setDate] = React.useState(new Date());
  React.useEffect(() => {
    const interval = setInterval(() => {
      setDate(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="absolute bottom-[7.75rem] left-[1.6875rem]">
      <p className="text-9xl font-light">
        {date.getHours().toString().padStart(2, "0")}:
        {date.getMinutes().toString().padStart(2, "0")}
      </p>
      <p className="text-[52px] tracking-wide">
        {`${Intl.DateTimeFormat("en-IN", {
          weekday: "long",
        }).format(date)}, ${Intl.DateTimeFormat("en-IN", {
          month: "long",
          day: "numeric",
        }).format(date)}`}
      </p>
    </div>
  );
};

export default DateAndTime;
