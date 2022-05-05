import React, { useEffect, useState } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import { TextNormal, TextGradient } from "../Typographies";
import { SharedFillButton } from "..//Buttons/SharedFillButton";
import { cx, humanizeDate } from "../../util/helpers";
// import moment, { Moment } from "moment";
import moment from "moment-timezone";

interface IAppointmentModalProps {
    dateActive: Date;
    data: any;
    timeZone: string;
    onAppointment: (appointmentHour: number, duration: string) => void;
    onClose: () => void;
}
interface Duration {
    duration: string;
    name: string;
}
interface AvailabelTime {
    timeStamp: number;
    str: string;
}

const AppointmentModal: React.FC<IAppointmentModalProps> = (props) => {
    const { dateActive, onAppointment, onClose, data, timeZone } = props;

    const [duration, setDuration] = useState<string>("");
    const [appointmentHour, setAppointmentHour] = useState<number>(0);

    const [durations, setDurations] = useState<Array<Duration>>([]);
    const [availableTimes, setAvaiableTimes] = useState<Array<AvailabelTime>>(
        []
    );

    const calculateAvailableTimes = (d: string, tz: string) => {
        let tmp: Array<AvailabelTime> = [];
        const alltimes =
            data.linkAvailability.linkAvailabilityByDuration[d].availabilities;
        for (let i = 0; i < alltimes.length; i++) {
            if (
                moment(dateActive).format("YYYY-MM-DD") ==
                moment(alltimes[i].startMillisUtc).tz(tz).format("YYYY-MM-DD")
            ) {
                tmp.push({
                    timeStamp: alltimes[i].startMillisUtc,
                    str: moment(alltimes[i].startMillisUtc)
                        .tz(tz)
                        .format("hh:mm a"),
                });
            }
        }
        setAvaiableTimes(tmp);
        if (tmp.length) setAppointmentHour(tmp[0].timeStamp);
    };

    useEffect(() => {
        if (duration !== "") {
            calculateAvailableTimes(duration, timeZone);
        }
    }, [duration]);

    useEffect(() => {
        let tmp: Array<Duration> = [];
        let ds = Object.keys(data.linkAvailability.linkAvailabilityByDuration);
        for (let i = 0; i < ds.length; i++) {
            switch (ds[i]) {
                case "900000":
                    tmp.push({ duration: "900000", name: "15 min" });
                    break;
                case "1800000":
                    tmp.push({ duration: "1800000", name: "30 min" });
                    break;
                case "2700000":
                    tmp.push({ duration: "2700000", name: "45 min" });
                    break;
                case "3600000":
                    tmp.push({ duration: "3600000", name: "1 hr" });
                    break;
                case "4500000":
                    tmp.push({ duration: "4500000", name: "1 hr 15 min" });
                    break;
                case "5400000":
                    tmp.push({ duration: "5400000", name: "1 hr 30 min" });
                    break;
                case "6300000":
                    tmp.push({ duration: "6300000", name: "1 hr 45 min" });
                    break;
                case "7200000":
                    tmp.push({ duration: "7200000", name: "2 hr" });
                    break;
            }
        }
        setDurations(tmp);
        setDuration(tmp[0].duration);
    }, []);

    return (
        <div className="fixed top-0 left-0 w-full min-h-screen flex items-center justify-center bg-black/[.3] transition duration-500 p-[24px] z-[100]">
            <div className="w-full max-w-[528px] p-[20px] md:p-[40px] bg-white rounded-[20px] relative">
                <div
                    className="absolute w-[24px] h-[24px] right-[16px] top-[16px] cursor-pointer"
                    onClick={() => {
                        onClose();
                    }}
                >
                    <img
                        src="assets/images/ico-close.svg"
                        className="w-full"
                        alt="ico-close"
                    />
                </div>

                <TextGradient className="text-[23px] font-bold mb-[32px]">
                    {humanizeDate(dateActive)}
                </TextGradient>

                <TextNormal className="font-bold mb-[16px]">
                    How long do you need?
                </TextNormal>

                <div className="flex flex-wrap border border-[#DDE3F0] rounded-[8px] mb-[32px]">
                    {durations.map((d) => (
                        <div
                            key={d.duration}
                            className={`p-[8px] min-w-[33.333%] flex-grow text-center cursor-pointer transition duration-300 rounded-[8px]
                                    ${
                                        duration === d.duration
                                            ? "bg-[#EEF1F8]"
                                            : "bg-white"
                                    }`}
                            onClick={() => setDuration(d.duration)}
                        >
                            <TextNormal grayed={duration !== d.duration}>
                                {d.name}
                            </TextNormal>
                        </div>
                    ))}
                </div>

                <div className="flex flex-wrap items-center justify-between mb-[16px]">
                    <TextNormal className="font-bold">
                        What time works best?
                    </TextNormal>
                </div>

                <Scrollbars style={{ height: 200 }}>
                    {availableTimes.map((ts) => (
                        <button
                            key={ts.timeStamp}
                            className={cx(
                                "w-full h-[40px] text-center text-[16px] text-[#434A59] border border-[#DDE3F0] rounded-[8px] mb-[6px]",
                                ts.timeStamp === appointmentHour
                                    ? "bg-[#EEF1F8]"
                                    : "bg-white"
                            )}
                            onClick={() => setAppointmentHour(ts.timeStamp)}
                        >
                            {ts.str}
                        </button>
                    ))}
                </Scrollbars>

                <SharedFillButton
                    className="w-full flex items-center justify-center text-[18px] font-bold mt-[32px] px-[24px] py-[12px]"
                    pill={true}
                    onClick={() => onAppointment(appointmentHour, duration)}
                    disabled={availableTimes.length < 1}
                >
                    Book meeting&nbsp;&nbsp;&#183;&#183;
                </SharedFillButton>
            </div>
        </div>
    );
};

export default AppointmentModal;
