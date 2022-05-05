import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Calendar from "react-calendar";
import { ApplicationState } from "resources/js/store";
import AppointmentModal from "./AppointmentModal";
// import moment, { duration, Moment } from "moment";
import moment, { Moment } from "moment-timezone";
import TimezoneSelect from "react-timezone-select";
import ConfirmModal from "./ConfirmModal";

interface Duration {
    duration: number;
    name: string;
}
interface IAppointmentCalendarProps {
    data: any;
    slug: string;
    hs_version: string;
}

const AppointmentCalendar: React.FC<IAppointmentCalendarProps> = (props) => {
    const user = useSelector((state: ApplicationState) => state.auth.user);
    const [timezone, setTimezone] = useState<string>(
        Intl.DateTimeFormat().resolvedOptions().timeZone
    );
    const [modalActive, setModalActive] = useState<boolean>(false);
    const [confirmAcive, setConfirmActive] = useState<boolean>(false);
    const [dateActive, setDateActive] = useState<Date>(new Date());
    const [availableDays, setAvailableDays] = useState<Array<Moment>>([]);
    const [appStp, setAppStp] = useState<number>(0);
    const [appDuration, setAppDuration] = useState<string>("");

    const handleDateChange = (selectedDate: Date) => {
        if (
            availableDays.find(
                (d) =>
                    d.format("YYYY-MM-DD") ==
                    moment(selectedDate).format("YYYY-MM-DD")
            )
        ) {
            setDateActive(selectedDate);
            setModalActive(true);
        }
    };

    const handleAppointment = (appointmentHour: number, duration: string) => {
        setAppStp(appointmentHour);
        setAppDuration(duration);
        setModalActive(false);
        setConfirmActive(true);
    };

    const calculateAvailabelDays = () => {
        let tempDays: Array<Moment> = [];
        let ad = props.data.linkAvailability.linkAvailabilityByDuration;
        let stamps = ad[Object.keys(ad)[0]].availabilities;

        stamps.forEach((t, i) => {
            if (i == 0) {
                tempDays.push(moment(t.startMillisUtc).tz(timezone));
            } else {
                if (
                    !tempDays[tempDays.length - 1].isSame(
                        moment(t.startMillisUtc).tz(timezone),
                        "day"
                    )
                ) {
                    tempDays.push(moment(t.startMillisUtc).tz(timezone));
                }
            }
        });
        setAvailableDays(tempDays);
    };

    useEffect(() => {
        if (props.data) {
            calculateAvailabelDays();
        }
    }, [props.data]);

    useEffect(() => {
        if (props.data) {
            console.log("timezone=>", timezone);
            calculateAvailabelDays();
        }
    }, [timezone]);

    return (
        <div className="w-full relative">
            <TimezoneSelect
                className="w-full text-[16px] md:text-[18px] mb-4"
                value={timezone}
                onChange={(tz) => setTimezone(tz.value)}
            />
            <div className="bg-white px-[20px] py-[20px] border border-[#DDE3F0] rounded-[12px] w-full">
                <Calendar
                    minDate={new Date()}
                    tileClassName={({ date, view }) => {
                        if (
                            availableDays.find(
                                (x) =>
                                    x.format("YYYY-MM-DD") ==
                                    moment(date).format("YYYY-MM-DD")
                            )
                        ) {
                            return "highlight";
                        }
                    }}
                    onChange={(value: Date, _) => handleDateChange(value)}
                />
            </div>

            {modalActive && (
                <AppointmentModal
                    dateActive={dateActive}
                    onAppointment={handleAppointment}
                    data={props.data}
                    timeZone={timezone}
                    onClose={() => {
                        setModalActive(false);
                    }}
                />
            )}

            {confirmAcive && (
                <ConfirmModal
                    tsp={appStp}
                    tz={timezone}
                    duration={appDuration}
                    slug={props.slug}
                    hs_version={props.hs_version}
                    data={props.data}
                    onClose={() => {
                        setConfirmActive(false);
                    }}
                    onBack={() => {
                        setConfirmActive(false);
                        setModalActive(true);
                    }}
                />
            )}
        </div>
    );
};

export default AppointmentCalendar;
