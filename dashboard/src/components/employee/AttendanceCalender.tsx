
import { useState, type JSX } from "react";

import "react-datepicker/dist/react-datepicker.css";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import {type DateClickArg } from "@fullcalendar/interaction"
function AttendanceCalendar(): JSX.Element {

    const [selectedDate, setSelectedDate] = useState<string | null>(null)

    const handleDateClick = (info: DateClickArg) => {
        setSelectedDate(info.dateStr)
    }

    return (
        <div className="bg-white p-6 rounded-xl shadow">

            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                height="auto"
                headerToolbar={{
                    left: "prev",
                    center: "title",
                    right: "next"
                }}
                dateClick={handleDateClick}
                dayCellClassNames={(arg) =>
                    arg.dateStr === selectedDate ? "selected-date" : ""
                }
            />

        </div>
    )
}

export default AttendanceCalendar;