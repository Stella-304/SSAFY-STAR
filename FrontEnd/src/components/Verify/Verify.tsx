import companyIcon from "@/assets/icons/company.png";
import verifyIcon from "@/assets/icons/verified.png";

export default function Verify() {
  return (
    <div className="relative flex h-70 w-70 items-center justify-center">
      <img src={companyIcon} className="h-70 w-70 rounded-50 " />
      <img
        src={verifyIcon}
        className="absolute right-0 top-5 h-20 w-20 rounded-50 bg-black"
      />
    </div>
  );
}
